import { Injectable } from '@angular/core';
import { EMPTY_SELECTION, normalizeFantasyUsername } from './ipl-data';
import {
  InsightMap,
  MatchRecord,
  MatchResult,
  PlayerScore,
  PlayerScoresMap,
  ResultMap,
  SelectionMap,
  SelectionRecord,
  SessionUser,
} from './models';
import { seedMatches, seedUsers } from './seed-data';
import { SQLiteService } from './sqlite.service';
import { SupabaseService } from './supabase.service';

interface DashboardPayload {
  matches: MatchRecord[];
  results: ResultMap;
  selections: SelectionMap;
  insights: InsightMap;
  playerScores: PlayerScoresMap;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private bootstrapPromise?: Promise<void>;

  constructor(
    private readonly sqlite: SQLiteService,
    private readonly supabase: SupabaseService,
  ) {}

  async login(username: string, password: string): Promise<SessionUser> {
    const normalizedUsername = normalizeFantasyUsername(username.trim());
    await this.ensureRemoteSeedData().catch(() => undefined);

    let user = await this.loadRemoteUser(normalizedUsername).catch(() => null);
    if (!user) {
      const users = await this.sqlite.all<ArrayUserRow>('SELECT * FROM users WHERE username = ?', [normalizedUsername]);
      user = users[0] ?? null;
    }

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) {
      throw new Error('Incorrect password');
    }

    return {
      username: user.username,
      displayName: user.display_name,
      isAdmin: this.flagToBoolean(user.is_admin),
    };
  }

  async loadDashboard(): Promise<DashboardPayload> {
    await this.ensureRemoteSeedData().catch(() => undefined);

    try {
      const [matches, resultRows, selectionRows, insightRows, playerScoreRows] = await Promise.all([
        this.loadMatches(),
        this.loadRemoteResults(),
        this.loadRemoteSelections(),
        this.loadRemoteInsights(),
        this.loadRemotePlayerScores(),
      ]);

      await Promise.all([
        this.cacheResults(resultRows),
        this.cacheSelections(selectionRows),
        this.cacheInsights(insightRows),
        this.cachePlayerScores(playerScoreRows),
      ]);

      return {
        matches,
        results: this.mapResults(resultRows),
        selections: this.mapSelections(selectionRows),
        insights: this.mapInsights(insightRows),
        playerScores: this.mapPlayerScores(playerScoreRows),
      };
    } catch {
      return this.loadDashboardFromCache();
    }
  }

  async loadMatches(): Promise<MatchRecord[]> {
    const fallbackMatches = await this.sqlite.all<MatchRow>('SELECT * FROM matches ORDER BY id ASC');

    try {
      await this.ensureRemoteSeedData();
      const remoteMatches = await this.supabase.query<MatchRow>('matches', {
        select: 'id,home,away,date,time_label,lock_time,manual_lock_state',
        order: 'id.asc',
      });

      if (!remoteMatches?.length) {
        return fallbackMatches.map((row) => this.mapMatchRow(row));
      }

      await this.cacheMatches(remoteMatches);
      return remoteMatches.map((row) => this.mapMatchRow(row));
    } catch {
      return fallbackMatches.map((row) => this.mapMatchRow(row));
    }
  }

  async saveUserSelection(user: SessionUser, matchId: number, selection: SelectionRecord): Promise<void> {
    await this.upsertSelection(user.username, matchId, selection);
  }

  async saveAdminSelection(username: string, matchId: number, selection: SelectionRecord): Promise<void> {
    await this.upsertSelection(username, matchId, selection);
  }

  async saveResult(matchId: number, result: MatchResult): Promise<void> {
    const row = this.resultToRow(matchId, result);
    await this.supabase.upsert('results', row, 'match_id');
    await this.cacheResults([row]);
  }

  async savePlayerScores(matchId: number, playerScores: PlayerScore[]): Promise<void> {
    await Promise.all(playerScores.map((playerScore) => this.supabase.upsert('player_scores', playerScore, 'match_id,player_name')));
    await this.cachePlayerScores(playerScores);
  }

  async loadUsers(): Promise<ArrayUserRow[]> {
    await this.ensureRemoteSeedData().catch(() => undefined);

    try {
      const users = await this.supabase.query<ArrayUserRow>('users', {
        select: 'username,display_name,password,is_admin,created_at',
        order: 'display_name.asc',
      });
      const normalizedUsers = users.map((user) => ({ ...user, is_admin: this.flagToBoolean(user.is_admin) }));
      await this.cacheUsers(normalizedUsers);
      return normalizedUsers;
    } catch {
      const localUsers = await this.sqlite.all<ArrayUserRow>('SELECT * FROM users ORDER BY display_name ASC');
      return localUsers.map((user) => ({ ...user, is_admin: this.flagToBoolean(user.is_admin) }));
    }
  }

  async resetPassword(username: string, password: string): Promise<void> {
    const normalizedUsername = normalizeFantasyUsername(username.trim());
    await this.supabase.update('users', { password }, { username: normalizedUsername });
    await this.sqlite.run('UPDATE users SET password = ? WHERE username = ?', [password, normalizedUsername]);
  }

  async setMatchManualLockState(matchId: number, manualLockState: number | null): Promise<void> {
    await this.ensureRemoteSeedData().catch(() => undefined);
    await this.supabase.update('matches', { manual_lock_state: manualLockState }, { id: matchId });
    await this.sqlite.run('UPDATE matches SET manual_lock_state = ? WHERE id = ?', [manualLockState, matchId]);
  }

  emptySelection() {
    return { ...EMPTY_SELECTION };
  }

  private async loadDashboardFromCache(): Promise<DashboardPayload> {
    const [matches, resultsRows, selectionsRows, insightsRows, playerScoreRows] = await Promise.all([
      this.sqlite.all<MatchRow>('SELECT * FROM matches ORDER BY id ASC'),
      this.sqlite.all<ResultRow>('SELECT * FROM results'),
      this.sqlite.all<SelectionRow>('SELECT * FROM selections'),
      this.sqlite.all<InsightRow>('SELECT * FROM match_insights').catch(() => []),
      this.sqlite.all<PlayerScore>('SELECT * FROM player_scores').catch(() => []),
    ]);

    return {
      matches: matches.map((row) => this.mapMatchRow(row)),
      results: this.mapResults(resultsRows),
      selections: this.mapSelections(selectionsRows),
      insights: this.mapInsights(insightsRows),
      playerScores: this.mapPlayerScores(playerScoreRows),
    };
  }

  private async loadRemoteUser(username: string): Promise<ArrayUserRow | null> {
    const users = await this.supabase.query<ArrayUserRow>('users', {
      select: 'username,display_name,password,is_admin,created_at',
      eq: { username },
    });

    if (!users[0]) {
      return null;
    }

    await this.cacheUsers([users[0]]);
    return users[0];
  }

  private loadRemoteResults(): Promise<ResultRow[]> {
    return this.supabase.query<ResultRow>('results', { select: '*' });
  }

  private loadRemoteSelections(): Promise<SelectionRow[]> {
    return this.supabase.query<SelectionRow>('selections', { select: '*' });
  }

  private loadRemoteInsights(): Promise<InsightRow[]> {
    return this.supabase.query<InsightRow>('match_insights', { select: '*' }).catch(() => []);
  }

  private loadRemotePlayerScores(): Promise<PlayerScore[]> {
    return this.supabase.query<PlayerScore>('player_scores', { select: '*' }).catch(() => []);
  }

  private async ensureRemoteSeedData(): Promise<void> {
    if (!this.bootstrapPromise) {
      this.bootstrapPromise = this.bootstrapRemoteSeedData();
    }

    try {
      await this.bootstrapPromise;
    } catch (error) {
      this.bootstrapPromise = undefined;
      throw error;
    }
  }

  private async bootstrapRemoteSeedData(): Promise<void> {
    const [remoteUsers, remoteMatches] = await Promise.all([
      this.supabase.query<Pick<ArrayUserRow, 'username'>>('users', { select: 'username' }),
      this.supabase.query<Pick<MatchRow, 'id'>>('matches', { select: 'id', order: 'id.asc' }),
    ]);

    if (!remoteUsers.length) {
      await this.supabase.upsert(
        'users',
        seedUsers.map((user) => ({
          username: user.username,
          display_name: user.display_name,
          password: user.password,
          is_admin: user.is_admin,
          created_at: user.created_at,
        })),
        'username',
      );
    }

    if (!remoteMatches.length) {
      await this.supabase.upsert(
        'matches',
        seedMatches.map((match) => ({
          id: match.id,
          home: match.home,
          away: match.away,
          date: match.date,
          time_label: match.time_label,
          lock_time: match.lock_time,
          manual_lock_state: match.manual_lock_state,
        })),
        'id',
      );
    }

    await this.migrateLegacyFantasyUser('pa1', 'pavan', 'Pavan');
  }

  private async migrateLegacyFantasyUser(fromUsername: string, toUsername: string, displayName: string): Promise<void> {
    await this.migrateLocalLegacyFantasyUser(fromUsername, toUsername, displayName);

    try {
      const [legacyUsers, canonicalUsers, legacySelections] = await Promise.all([
        this.supabase.query<ArrayUserRow>('users', {
          select: 'username,display_name,password,is_admin,created_at',
          eq: { username: fromUsername },
        }),
        this.supabase.query<ArrayUserRow>('users', {
          select: 'username,display_name,password,is_admin,created_at',
          eq: { username: toUsername },
        }),
        this.supabase.query<SelectionRow>('selections', {
          select: '*',
          eq: { username: fromUsername },
        }),
      ]);

      const legacyUser = legacyUsers[0];
      const canonicalUser = canonicalUsers[0];

      if (!legacyUser && !legacySelections.length && !canonicalUser) {
        return;
      }

      if (legacyUser && !canonicalUser) {
        await this.supabase.upsert(
          'users',
          {
            username: toUsername,
            display_name: displayName,
            password: legacyUser.password,
            is_admin: this.flagToBoolean(legacyUser.is_admin),
            created_at: legacyUser.created_at,
          },
          'username',
        );
      }

      if (legacySelections.length) {
        await this.supabase.upsert(
          'selections',
          legacySelections.map((selection) => ({ ...selection, username: toUsername })),
          'username,match_id',
        );
        await this.supabase.delete('selections', { username: fromUsername });
      }

      if (legacyUser) {
        await this.supabase.delete('users', { username: fromUsername });
      }
    } catch {}
  }

  private async migrateLocalLegacyFantasyUser(fromUsername: string, toUsername: string, displayName: string): Promise<void> {
    const [legacyUsers, canonicalUsers, legacySelections] = await Promise.all([
      this.sqlite.all<ArrayUserRow>('SELECT * FROM users WHERE username = ?', [fromUsername]),
      this.sqlite.all<ArrayUserRow>('SELECT * FROM users WHERE username = ?', [toUsername]),
      this.sqlite.all<SelectionRow>('SELECT * FROM selections WHERE username = ?', [fromUsername]),
    ]);

    const legacyUser = legacyUsers[0];
    const canonicalUser = canonicalUsers[0];

    if (!legacyUser && !legacySelections.length && !canonicalUser) {
      return;
    }

    if (legacyUser && !canonicalUser) {
      await this.cacheUsers([
        {
          username: toUsername,
          display_name: displayName,
          password: legacyUser.password,
          is_admin: legacyUser.is_admin,
          created_at: legacyUser.created_at,
        },
      ]);
    }

    if (legacySelections.length) {
      await this.cacheSelections(legacySelections.map((selection) => ({ ...selection, username: toUsername })));
      await this.sqlite.run('DELETE FROM selections WHERE username = ?', [fromUsername]);
    }

    if (legacyUser) {
      await this.sqlite.run('DELETE FROM users WHERE username = ?', [fromUsername]);
    }
  }

  private async upsertSelection(username: string, matchId: number, selection: SelectionRecord): Promise<void> {
    const payload = {
      username,
      match_id: matchId,
      winning_team: selection.winningTeam,
      best_batsman: selection.bestBatsman,
      best_bowler: selection.bestBowler,
      powerplay_winner: selection.powerplayWinner,
      dot_ball_bowler: selection.dotBallBowler,
      total_wickets: selection.totalWickets,
      duck_batsman: selection.duckBatsman,
      double_category: selection.doubleCategory,
      winning_horse: selection.winningHorse,
      losing_horse: selection.losingHorse,
      saved_at: new Date().toISOString(),
    };

    await this.supabase.upsert('selections', payload, 'username,match_id');
    await this.cacheSelections([payload]);
  }

  private async cacheUsers(users: ArrayUserRow[]): Promise<void> {
    if (!users.length) {
      return;
    }

    await this.sqlite.batch(
      users.map((user) => ({
        sql: `INSERT INTO users (username, display_name, password, is_admin, created_at)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(username) DO UPDATE SET
            display_name = excluded.display_name,
            password = excluded.password,
            is_admin = excluded.is_admin,
            created_at = excluded.created_at`,
        params: [user.username, user.display_name, user.password, this.booleanToFlag(user.is_admin), user.created_at ?? new Date().toISOString()],
      })),
    );
  }

  private async cacheMatches(matches: MatchRow[]): Promise<void> {
    if (!matches.length) {
      return;
    }

    await this.sqlite.batch(
      matches.map((match) => ({
        sql: `INSERT INTO matches (id, home, away, date, time_label, lock_time, manual_lock_state)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            home = excluded.home,
            away = excluded.away,
            date = excluded.date,
            time_label = excluded.time_label,
            lock_time = excluded.lock_time,
            manual_lock_state = excluded.manual_lock_state`,
        params: [match.id, match.home, match.away, match.date, match.time_label, match.lock_time, this.nullableFlag(match.manual_lock_state)],
      })),
    );
  }

  private async cacheResults(results: ResultRow[]): Promise<void> {
    if (!results.length) {
      return;
    }

    await this.sqlite.batch(
      results.map((row) => ({
        sql: `INSERT INTO results (
          match_id, winning_team, win_by_runs, run_margin, wicket_margin, top_scorer,
          top_scorer_runs, best_bowler, best_bowler_points, powerplay_winner, powerplay_score,
          powerplay_diff, powerplay_home_score, powerplay_away_score, powerplay_home_wickets,
          powerplay_away_wickets, dot_ball_leader, dot_balls, total_wickets, wickets_range,
          duck_batsmen, match_top_player, match_bottom_player
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(match_id) DO UPDATE SET
          winning_team = excluded.winning_team,
          win_by_runs = excluded.win_by_runs,
          run_margin = excluded.run_margin,
          wicket_margin = excluded.wicket_margin,
          top_scorer = excluded.top_scorer,
          top_scorer_runs = excluded.top_scorer_runs,
          best_bowler = excluded.best_bowler,
          best_bowler_points = excluded.best_bowler_points,
          powerplay_winner = excluded.powerplay_winner,
          powerplay_score = excluded.powerplay_score,
          powerplay_diff = excluded.powerplay_diff,
          powerplay_home_score = excluded.powerplay_home_score,
          powerplay_away_score = excluded.powerplay_away_score,
          powerplay_home_wickets = excluded.powerplay_home_wickets,
          powerplay_away_wickets = excluded.powerplay_away_wickets,
          dot_ball_leader = excluded.dot_ball_leader,
          dot_balls = excluded.dot_balls,
          total_wickets = excluded.total_wickets,
          wickets_range = excluded.wickets_range,
          duck_batsmen = excluded.duck_batsmen,
          match_top_player = excluded.match_top_player,
          match_bottom_player = excluded.match_bottom_player`,
        params: [
          row.match_id,
          row.winning_team,
          this.booleanToFlag(row.win_by_runs),
          row.run_margin,
          row.wicket_margin,
          row.top_scorer,
          row.top_scorer_runs,
          row.best_bowler,
          row.best_bowler_points,
          row.powerplay_winner,
          row.powerplay_score,
          row.powerplay_diff,
          row.powerplay_home_score,
          row.powerplay_away_score,
          row.powerplay_home_wickets,
          row.powerplay_away_wickets,
          row.dot_ball_leader,
          row.dot_balls,
          row.total_wickets,
          row.wickets_range,
          JSON.stringify(this.toStringArray(row.duck_batsmen)),
          row.match_top_player,
          row.match_bottom_player,
        ],
      })),
    );
  }

  private async cacheSelections(selections: SelectionRow[]): Promise<void> {
    if (!selections.length) {
      return;
    }

    await this.sqlite.batch(
      selections.map((row) => ({
        sql: `INSERT INTO selections (
          username, match_id, winning_team, best_batsman, best_bowler, powerplay_winner,
          dot_ball_bowler, total_wickets, duck_batsman, double_category, winning_horse,
          losing_horse, saved_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(username, match_id) DO UPDATE SET
          winning_team = excluded.winning_team,
          best_batsman = excluded.best_batsman,
          best_bowler = excluded.best_bowler,
          powerplay_winner = excluded.powerplay_winner,
          dot_ball_bowler = excluded.dot_ball_bowler,
          total_wickets = excluded.total_wickets,
          duck_batsman = excluded.duck_batsman,
          double_category = excluded.double_category,
          winning_horse = excluded.winning_horse,
          losing_horse = excluded.losing_horse,
          saved_at = excluded.saved_at`,
        params: [
          row.username,
          row.match_id,
          row.winning_team,
          row.best_batsman,
          row.best_bowler,
          row.powerplay_winner,
          row.dot_ball_bowler,
          row.total_wickets,
          row.duck_batsman,
          row.double_category,
          row.winning_horse,
          row.losing_horse,
          row.saved_at ?? new Date().toISOString(),
        ],
      })),
    );
  }

  private async cacheInsights(insights: InsightRow[]): Promise<void> {
    if (!insights.length) {
      return;
    }

    await this.sqlite.batch(
      insights.map((row) => ({
        sql: `INSERT INTO match_insights (
          match_id, generated_at, home_probable_xi, away_probable_xi, home_form_batsmen,
          away_form_batsmen, home_form_bowlers, away_form_bowlers, pitch_report,
          head_to_head, key_matchups, prediction_summary
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(match_id) DO UPDATE SET
          generated_at = excluded.generated_at,
          home_probable_xi = excluded.home_probable_xi,
          away_probable_xi = excluded.away_probable_xi,
          home_form_batsmen = excluded.home_form_batsmen,
          away_form_batsmen = excluded.away_form_batsmen,
          home_form_bowlers = excluded.home_form_bowlers,
          away_form_bowlers = excluded.away_form_bowlers,
          pitch_report = excluded.pitch_report,
          head_to_head = excluded.head_to_head,
          key_matchups = excluded.key_matchups,
          prediction_summary = excluded.prediction_summary`,
        params: [
          row.match_id,
          row.generated_at ?? null,
          JSON.stringify(this.toStringArray(row.home_probable_xi)),
          JSON.stringify(this.toStringArray(row.away_probable_xi)),
          row.home_form_batsmen ?? null,
          row.away_form_batsmen ?? null,
          row.home_form_bowlers ?? null,
          row.away_form_bowlers ?? null,
          row.pitch_report ?? null,
          row.head_to_head ?? null,
          row.key_matchups ?? null,
          row.prediction_summary ?? null,
        ],
      })),
    );
  }

  private async cachePlayerScores(playerScores: PlayerScore[]): Promise<void> {
    if (!playerScores.length) {
      return;
    }

    await this.sqlite.batch(
      playerScores.map((playerScore) => ({
        sql: `INSERT INTO player_scores (
          match_id, player_name, runs, fours, sixes, wickets, maidens, dot_balls,
          batsman_score, bowler_score, dot_ball_score
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(match_id, player_name) DO UPDATE SET
          runs = excluded.runs,
          fours = excluded.fours,
          sixes = excluded.sixes,
          wickets = excluded.wickets,
          maidens = excluded.maidens,
          dot_balls = excluded.dot_balls,
          batsman_score = excluded.batsman_score,
          bowler_score = excluded.bowler_score,
          dot_ball_score = excluded.dot_ball_score`,
        params: [
          playerScore.match_id,
          playerScore.player_name,
          playerScore.runs,
          playerScore.fours,
          playerScore.sixes,
          playerScore.wickets,
          playerScore.maidens,
          playerScore.dot_balls,
          playerScore.batsman_score,
          playerScore.bowler_score,
          playerScore.dot_ball_score,
        ],
      })),
    );
  }

  private mapResults(rows: ResultRow[]): ResultMap {
    const results: ResultMap = {};
    for (const row of rows || []) {
      results[row.match_id] = {
        winningTeam: row.winning_team,
        winByRuns: this.flagToBoolean(row.win_by_runs),
        runMargin: row.run_margin,
        wicketMargin: row.wicket_margin,
        topScorer: row.top_scorer,
        topScorerRuns: row.top_scorer_runs,
        bestBowler: row.best_bowler,
        bestBowlerPoints: row.best_bowler_points,
        powerplayWinner: row.powerplay_winner,
        powerplayScore: row.powerplay_score,
        powerplayDiff: row.powerplay_diff,
        powerplayHomeScore: row.powerplay_home_score ?? 0,
        powerplayAwayScore: row.powerplay_away_score ?? 0,
        powerplayHomeWickets: row.powerplay_home_wickets ?? 0,
        powerplayAwayWickets: row.powerplay_away_wickets ?? 0,
        dotBallLeader: row.dot_ball_leader,
        dotBalls: row.dot_balls,
        totalWickets: row.total_wickets,
        wicketsRange: row.wickets_range,
        duckBatsmen: this.toStringArray(row.duck_batsmen),
        matchTopPlayer: row.match_top_player,
        matchBottomPlayer: row.match_bottom_player,
      };
    }
    return results;
  }

  private mapSelections(rows: SelectionRow[]): SelectionMap {
    const selections: SelectionMap = {};
    for (const row of rows || []) {
      selections[row.username] ??= {};
      selections[row.username][row.match_id] = {
        winningTeam: row.winning_team,
        bestBatsman: row.best_batsman,
        bestBowler: row.best_bowler,
        powerplayWinner: row.powerplay_winner,
        dotBallBowler: row.dot_ball_bowler,
        totalWickets: row.total_wickets,
        duckBatsman: row.duck_batsman,
        doubleCategory: row.double_category,
        winningHorse: row.winning_horse,
        losingHorse: row.losing_horse,
      };
    }
    return selections;
  }

  private mapInsights(rows: InsightRow[]): InsightMap {
    const insights: InsightMap = {};
    for (const row of rows || []) {
      insights[row.match_id] = {
        generated_at: row.generated_at,
        home_probable_xi: this.toStringArray(row.home_probable_xi),
        away_probable_xi: this.toStringArray(row.away_probable_xi),
        home_form_batsmen: row.home_form_batsmen,
        away_form_batsmen: row.away_form_batsmen,
        home_form_bowlers: row.home_form_bowlers,
        away_form_bowlers: row.away_form_bowlers,
        pitch_report: row.pitch_report,
        head_to_head: row.head_to_head,
        key_matchups: row.key_matchups,
        prediction_summary: row.prediction_summary,
      };
    }
    return insights;
  }

  private mapPlayerScores(rows: PlayerScore[]): PlayerScoresMap {
    const playerScores: PlayerScoresMap = {};
    for (const row of rows || []) {
      playerScores[row.match_id] ??= {};
      playerScores[row.match_id][row.player_name] = row;
    }
    return playerScores;
  }

  private mapMatchRow(row: MatchRow): MatchRecord {
    return {
      id: row.id,
      home: row.home,
      away: row.away,
      date: row.date,
      time_label: row.time_label,
      lock_time: row.lock_time,
      manual_lock_state: this.nullableFlag(row.manual_lock_state),
    };
  }

  private resultToRow(matchId: number, result: MatchResult): ResultRow {
    return {
      match_id: matchId,
      winning_team: result.winningTeam,
      win_by_runs: !!result.winByRuns,
      run_margin: result.runMargin,
      wicket_margin: result.wicketMargin,
      top_scorer: result.topScorer,
      top_scorer_runs: result.topScorerRuns,
      best_bowler: result.bestBowler,
      best_bowler_points: result.bestBowlerPoints,
      powerplay_winner: result.powerplayWinner,
      powerplay_score: result.powerplayScore,
      powerplay_diff: result.powerplayDiff,
      powerplay_home_score: result.powerplayHomeScore,
      powerplay_away_score: result.powerplayAwayScore,
      powerplay_home_wickets: result.powerplayHomeWickets,
      powerplay_away_wickets: result.powerplayAwayWickets,
      dot_ball_leader: result.dotBallLeader,
      dot_balls: result.dotBalls,
      total_wickets: result.totalWickets,
      wickets_range: result.wicketsRange,
      duck_batsmen: result.duckBatsmen || [],
      match_top_player: result.matchTopPlayer,
      match_bottom_player: result.matchBottomPlayer,
    };
  }

  private flagToBoolean(value: boolean | number | null | undefined): boolean {
    return value === true || value === 1;
  }

  private booleanToFlag(value: boolean | number | null | undefined): number {
    return this.flagToBoolean(value) ? 1 : 0;
  }

  private nullableFlag(value: boolean | number | null | undefined): number | null {
    if (value === null || value === undefined) {
      return null;
    }
    return this.flagToBoolean(value) ? 1 : 0;
  }

  private toStringArray(value: string[] | string | null | undefined): string[] {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.filter((entry): entry is string => typeof entry === 'string');
    }

    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter((entry): entry is string => typeof entry === 'string') : [];
    } catch {
      return [];
    }
  }
}

interface ArrayUserRow {
  username: string;
  display_name: string;
  password: string;
  is_admin: boolean | number;
  created_at?: string;
}

interface MatchRow {
  id: number;
  home: string;
  away: string;
  date: string;
  time_label: string;
  lock_time: string;
  manual_lock_state: boolean | number | null;
}

interface ResultRow {
  match_id: number;
  winning_team: string;
  win_by_runs: boolean | number;
  run_margin: number;
  wicket_margin: number;
  top_scorer: string;
  top_scorer_runs: number;
  best_bowler: string;
  best_bowler_points: number;
  powerplay_winner: string;
  powerplay_score: number;
  powerplay_diff: number;
  powerplay_home_score: number;
  powerplay_away_score: number;
  powerplay_home_wickets: number;
  powerplay_away_wickets: number;
  dot_ball_leader: string;
  dot_balls: number;
  total_wickets: number;
  wickets_range: string;
  duck_batsmen: string[] | string | null;
  match_top_player: string;
  match_bottom_player: string;
}

interface SelectionRow {
  username: string;
  match_id: number;
  winning_team: string;
  best_batsman: string;
  best_bowler: string;
  powerplay_winner: string;
  dot_ball_bowler: string;
  total_wickets: string;
  duck_batsman: string;
  double_category: string;
  winning_horse: string;
  losing_horse: string;
  saved_at?: string;
}

interface InsightRow {
  match_id: number;
  generated_at?: string;
  home_probable_xi: string[] | string | null;
  away_probable_xi: string[] | string | null;
  home_form_batsmen?: string;
  away_form_batsmen?: string;
  home_form_bowlers?: string;
  away_form_bowlers?: string;
  pitch_report?: string;
  head_to_head?: string;
  key_matchups?: string;
  prediction_summary?: string;
}

