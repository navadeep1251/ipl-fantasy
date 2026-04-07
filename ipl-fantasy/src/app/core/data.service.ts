import { Injectable } from '@angular/core';
import { EMPTY_SELECTION } from './ipl-data';
import {
  InsightMap,
  MatchInsights,
  MatchRecord,
  MatchResult,
  PlayerScore,
  PlayerScoresMap,
  ResultMap,
  SelectionMap,
  SelectionRecord,
  SessionUser,
} from './models';
import { SQLiteService } from './sqlite.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private readonly sqlite: SQLiteService) {}

  async login(username: string, password: string): Promise<SessionUser> {
    const users = await this.sqlite.all<ArrayUserRow>('SELECT * FROM users WHERE username = ?', [username.toLowerCase().trim()]);

    const user = users[0];
    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) {
      throw new Error('Incorrect password');
    }

    return {
      username: user.username,
      displayName: user.display_name,
      isAdmin: user.is_admin,
    };
  }

  async loadDashboard() {
    const [matches, resultsRows, selectionsRows, insightsRows, playerScoreRows] = await Promise.all([
      this.sqlite.all<MatchRecord>('SELECT * FROM matches ORDER BY id ASC'),
      this.sqlite.all<ResultRow>('SELECT * FROM results'),
      this.sqlite.all<SelectionRow>('SELECT * FROM selections'),
      this.sqlite.all<InsightRow>('SELECT * FROM match_insights').catch(() => []),
      this.sqlite.all<PlayerScore>('SELECT * FROM player_scores').catch(() => []),
    ]);

    const results: ResultMap = {};
    for (const row of resultsRows || []) {
      results[row.match_id] = {
        winningTeam: row.winning_team,
        winByRuns: (row.run_margin || 0) > 0,
        runMargin: row.run_margin,
        wicketMargin: row.wicket_margin,
        topScorer: row.top_scorer,
        topScorerRuns: row.top_scorer_runs,
        bestBowler: row.best_bowler,
        bestBowlerPoints: row.best_bowler_points,
        powerplayWinner: row.powerplay_winner,
        powerplayScore: row.powerplay_score,
        powerplayDiff: row.powerplay_diff,
        dotBallLeader: row.dot_ball_leader,
        dotBalls: row.dot_balls,
        totalWickets: row.total_wickets,
        wicketsRange: row.wickets_range,
        duckBatsmen: row.duck_batsmen ? JSON.parse(row.duck_batsmen) : [],
        matchTopPlayer: row.match_top_player,
        matchBottomPlayer: row.match_bottom_player,
      };
    }

    const selections: SelectionMap = {};
    for (const row of selectionsRows || []) {
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

    const insights: InsightMap = {};
    for (const row of insightsRows || []) {
      insights[row.match_id] = {
        generated_at: row.generated_at,
        home_probable_xi: row.home_probable_xi ? JSON.parse(row.home_probable_xi) : [],
        away_probable_xi: row.away_probable_xi ? JSON.parse(row.away_probable_xi) : [],
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

    const playerScores: PlayerScoresMap = {};
    for (const row of playerScoreRows || []) {
      playerScores[row.match_id] ??= {};
      playerScores[row.match_id][row.player_name] = row;
    }

    return {
      matches: matches || [],
      results,
      selections,
      insights,
      playerScores,
    };
  }

  async saveUserSelection(user: SessionUser, matchId: number, selection: SelectionRecord): Promise<void> {
    await this.upsertSelection(user.username, matchId, selection);
  }

  async saveAdminSelection(username: string, matchId: number, selection: SelectionRecord): Promise<void> {
    await this.upsertSelection(username, matchId, selection);
  }

  async saveResult(matchId: number, result: MatchResult): Promise<void> {
    await this.sqlite.run(
      `INSERT INTO results (
        match_id, winning_team, win_by_runs, run_margin, wicket_margin, top_scorer,
        top_scorer_runs, best_bowler, best_bowler_points, powerplay_winner, powerplay_score,
        powerplay_diff, dot_ball_leader, dot_balls, total_wickets, wickets_range,
        duck_batsmen, match_top_player, match_bottom_player
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        dot_ball_leader = excluded.dot_ball_leader,
        dot_balls = excluded.dot_balls,
        total_wickets = excluded.total_wickets,
        wickets_range = excluded.wickets_range,
        duck_batsmen = excluded.duck_batsmen,
        match_top_player = excluded.match_top_player,
        match_bottom_player = excluded.match_bottom_player`,
      [
        matchId,
        result.winningTeam,
        result.winByRuns ? 1 : 0,
        result.runMargin,
        result.wicketMargin,
        result.topScorer,
        result.topScorerRuns,
        result.bestBowler,
        result.bestBowlerPoints,
        result.powerplayWinner,
        result.powerplayScore,
        result.powerplayDiff,
        result.dotBallLeader,
        result.dotBalls,
        result.totalWickets,
        result.wicketsRange,
        JSON.stringify(result.duckBatsmen || []),
        result.matchTopPlayer,
        result.matchBottomPlayer,
      ],
    );
  }

  async savePlayerScores(matchId: number, playerScores: PlayerScore[]): Promise<void> {
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
          matchId,
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

  async loadUsers() {
    return this.sqlite.all<ArrayUserRow>('SELECT * FROM users ORDER BY display_name ASC');
  }

  async resetPassword(username: string, password: string): Promise<void> {
    await this.sqlite.run('UPDATE users SET password = ? WHERE username = ?', [password, username]);
  }

  emptySelection() {
    return { ...EMPTY_SELECTION };
  }

  private async upsertSelection(username: string, matchId: number, selection: SelectionRecord): Promise<void> {
    await this.sqlite.run(
      `INSERT INTO selections (
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
      [
        username,
        matchId,
        selection.winningTeam,
        selection.bestBatsman,
        selection.bestBowler,
        selection.powerplayWinner,
        selection.dotBallBowler,
        selection.totalWickets,
        selection.duckBatsman,
        selection.doubleCategory,
        selection.winningHorse,
        selection.losingHorse,
        new Date().toISOString(),
      ],
    );
  }
}

interface ArrayUserRow {
  username: string;
  display_name: string;
  password: string;
  is_admin: boolean;
}

interface ResultRow {
  match_id: number;
  winning_team: string;
  win_by_runs: number;
  run_margin: number;
  wicket_margin: number;
  top_scorer: string;
  top_scorer_runs: number;
  best_bowler: string;
  best_bowler_points: number;
  powerplay_winner: string;
  powerplay_score: number;
  powerplay_diff: number;
  dot_ball_leader: string;
  dot_balls: number;
  total_wickets: number;
  wickets_range: string;
  duck_batsmen: string;
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
}

interface InsightRow {
  match_id: number;
  generated_at?: string;
  home_probable_xi: string;
  away_probable_xi: string;
  home_form_batsmen?: string;
  away_form_batsmen?: string;
  home_form_bowlers?: string;
  away_form_bowlers?: string;
  pitch_report?: string;
  head_to_head?: string;
  key_matchups?: string;
  prediction_summary?: string;
}

