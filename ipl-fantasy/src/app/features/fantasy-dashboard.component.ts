import { CommonModule } from '@angular/common';
import { Component, OnDestroy, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  getDefaultPlayerPassword,
  DOUBLE_CATEGORIES,
  EMPTY_SELECTION,
  FANTASY_PLAYERS,
  TEAM_META,
  WICKET_RANGES,
  normalizeFantasyUsername,
} from '../core/ipl-data';
import { DataService } from '../core/data.service';
import {
  buildConsolidatedTable,
  buildLiveLeaderboard,
  buildOverallLeaderboard,
  calculateScore,
  getMatchStatus,
  isMatchLocked,
  getUniqueMatchPlayers,
  triggerInsightsUpdate,
} from '../core/fantasy.utils';
import {
  AdminTab,
  LeaderboardTab,
  LiveTab,
  MainTab,
  MatchFilter,
  MatchRecord,
  MatchResult,
  PlayerScore,
  PlayerScoreDraft,
  SelectionRecord,
  SessionUser,
} from '../core/models';

interface UserRow {
  username: string;
  display_name: string;
  password: string;
  is_admin: boolean;
}

@Component({
  selector: 'app-fantasy-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fantasy-dashboard.component.html',
  styleUrl: './fantasy-dashboard.component.scss',
})
export class FantasyDashboardComponent {
  private readonly dataService = inject(DataService);
  private readonly clockInterval = window.setInterval(() => this.now.set(new Date()), 30_000);

  readonly teamMeta = TEAM_META;
  readonly fantasyPlayers = FANTASY_PLAYERS;
  readonly wicketRanges = WICKET_RANGES;
  readonly doubleCategories = DOUBLE_CATEGORIES;
  readonly pickColumns = [
    { key: 'winningTeam', label: 'Winner', type: 'team' },
    { key: 'bestBatsman', label: 'Best Bat', type: 'player' },
    { key: 'bestBowler', label: 'Best Bowl', type: 'player' },
    { key: 'powerplayWinner', label: 'PP Winner', type: 'team' },
    { key: 'dotBallBowler', label: 'Dot-Ball', type: 'player' },
    { key: 'totalWickets', label: 'Wickets', type: 'wickets' },
    { key: 'duckBatsman', label: 'Duck', type: 'player' },
    { key: 'doubleCategory', label: 'Double', type: 'double' },
    { key: 'winningHorse', label: '🏆 Horse', type: 'fantasy' },
    { key: 'losingHorse', label: '💀 Horse', type: 'fantasy' },
  ] as const;

  loginUsername = '';
  loginPassword = '';
  loginError = signal('');
  signingIn = signal(false);

  readonly user = signal<SessionUser | null>(this.restoreSession());
  readonly activeTab = signal<MainTab>('matches');
  readonly leaderboardTab = signal<LeaderboardTab>('board');
  readonly liveTab = signal<LiveTab>('grid');
  readonly adminTab = signal<AdminTab>('results');
  readonly matchFilter = signal<MatchFilter>('all');
  readonly loading = signal(false);
  readonly now = signal(new Date());

  readonly matches = signal<MatchRecord[]>([]);
  readonly results = signal<Record<number, MatchResult>>({});
  readonly selections = signal<Record<string, Record<number, SelectionRecord>>>({});
  readonly insights = signal<Record<number, any>>({});
  readonly playerScores = signal<Record<number, Record<string, PlayerScore>>>({});

  readonly selectedMatchId = signal<number | null>(null);
  readonly selectionDraft = signal<SelectionRecord>({ ...EMPTY_SELECTION });
  readonly selectionSavedMessage = signal('');
  readonly selectionSaving = signal(false);
  readonly insightsPanelTab = signal<'xi' | 'form' | 'pitch'>('xi');
  readonly insightsExpanded = signal(true);

  readonly picksMatchId = signal<number | null>(null);
  readonly picksEditingPlayer = signal<string | null>(null);
  readonly picksDraft = signal<SelectionRecord>({ ...EMPTY_SELECTION });
  readonly picksSaving = signal(false);
  readonly picksSavedMessage = signal('');

  readonly liveUpdateMatchId = signal<number | null>(null);
  readonly liveDrafts = signal<Record<string, PlayerScoreDraft>>({});
  readonly liveSaving = signal(false);
  readonly liveSavedMessage = signal('');

  readonly adminMatchId = signal<number | null>(null);
  readonly adminResultDraft = signal<MatchResult>(this.emptyResult());
  readonly adminDuckCandidate = signal('');
  readonly adminSavingResult = signal(false);
  readonly adminSavedResult = signal(false);

  readonly users = signal<UserRow[]>([]);
  readonly usersLoading = signal(false);
  readonly passwordResetInfo = signal<{ username: string; newPwd: string } | null>(null);

  readonly insightsUpdating = signal(false);
  readonly insightsUpdateResult = signal<any | null>(null);
  readonly insightsUpdateError = signal('');

  readonly currentUserSelections = computed(() => {
    const currentUser = this.user();
    if (!currentUser) {
      return {} as Record<number, SelectionRecord>;
    }

    return this.selections()[currentUser.username] ?? {};
  });

  readonly selectedMatch = computed(() => this.matches().find((match) => match.id === this.selectedMatchId()) ?? null);
  readonly picksMatch = computed(() => this.matches().find((match) => match.id === this.picksMatchId()) ?? null);
  readonly liveUpdateMatch = computed(() => this.matches().find((match) => match.id === this.liveUpdateMatchId()) ?? null);
  readonly adminMatch = computed(() => this.matches().find((match) => match.id === this.adminMatchId()) ?? null);

  readonly mainTabs = computed(() => {
    const tabs: Array<{ id: MainTab; icon: string; label: string }> = [
      { id: 'matches', icon: '🏏', label: 'Matches' },
      { id: 'selections', icon: '📋', label: 'Picks' },
      { id: 'live', icon: '🔴', label: 'Live' },
      { id: 'leaderboard', icon: '🏆', label: 'Board' },
    ];

    if (this.user()?.isAdmin) {
      tabs.push({ id: 'admin', icon: '⚙️', label: 'Admin' });
    }

    return tabs;
  });

  readonly filteredMatches = computed(() => {
    const now = this.now();
    const filter = this.matchFilter();
    return this.matches().filter((match) => {
      const status = this.getStatus(match, now);
      if (filter === 'all') {
        return true;
      }
      if (filter === 'open') {
        return status === 'open' || status === 'submitted';
      }
      return status === filter;
    });
  });

  readonly lockedMatches = computed(() => this.matches().filter((match) => !!this.results()[match.id] || isMatchLocked(match, this.now())));
  readonly picksVisibleMatches = computed(() => {
    const now = this.now();
    const windowEnd = now.getTime();
    const visible = new Map<number, MatchRecord>();
    this.lockedMatches().forEach((match) => visible.set(match.id, match));
    this.matches()
      .filter((match) => {
        if (this.results()[match.id] || isMatchLocked(match, now)) {
          return false;
        }

        const lockTime = new Date(match.lock_time).getTime();
        return lockTime >= now.getTime() && lockTime <= windowEnd;
      })
      .forEach((match) => visible.set(match.id, match));

    return Array.from(visible.values()).sort((left, right) => left.id - right.id);
  });
  readonly currentMatchPlayers = computed(() => (this.selectedMatch() ? getUniqueMatchPlayers(this.selectedMatch()!) : []));
  readonly selectedMatchScore = computed(() => {
    const match = this.selectedMatch();
    if (!match || !this.results()[match.id]) {
      return null;
    }
    return calculateScore(this.selectionDraft(), this.results()[match.id], this.playerScores()[match.id] ?? {});
  });

  readonly liveLeaderboardRows = computed(() => {
    const matchId = this.liveUpdateMatchId();
    if (!matchId) {
      return [];
    }
    return buildLiveLeaderboard(matchId, this.selections(), this.results(), this.playerScores());
  });

  readonly overallLeaderboard = computed(() => buildOverallLeaderboard(this.matches(), this.selections(), this.results(), this.playerScores()));
  readonly consolidated = computed(() => buildConsolidatedTable(this.matches(), this.selections(), this.results(), this.playerScores()));

  readonly myStats = computed(() => {
    const currentUser = this.user();
    if (!currentUser) {
      return { lockedMatches: [], totalPoints: 0, averagePoints: 0 };
    }

    const lockedMatches = this.lockedMatches().filter((match) => this.currentUserSelections()[match.id]);
    const totalPoints = lockedMatches.reduce(
      (sum, match) => sum + calculateScore(this.currentUserSelections()[match.id], this.results()[match.id], this.playerScores()[match.id] ?? {}).total,
      0,
    );

    return {
      lockedMatches,
      totalPoints,
      averagePoints: lockedMatches.length ? Math.round(totalPoints / lockedMatches.length) : 0,
    };
  });

  readonly submittedPlayersForPicksMatch = computed(() => {
    const matchId = this.picksMatchId();
    if (!matchId) {
      return [] as string[];
    }
    return this.fantasyPlayers.filter((name) => !!this.selections()[normalizeFantasyUsername(name)]?.[matchId]);
  });

  readonly uniqueLivePlayers = computed(() => {
    const match = this.liveUpdateMatch();
    if (!match) {
      return [] as string[];
    }
    const selected = new Set<string>();
    Object.values(this.selections()).forEach((userSelections) => {
      const pick = userSelections[match.id];
      if (!pick) {
        return;
      }
      [pick.bestBatsman, pick.bestBowler, pick.duckBatsman, pick.dotBallBowler].filter(Boolean).forEach((name) => selected.add(name));
    });
    return Array.from(selected).sort();
  });

  constructor() {
    effect(() => {
      const currentUser = this.user();
      if (!currentUser) {
        return;
      }

      const validUsernames = new Set(['admin', ...this.fantasyPlayers.map((name) => normalizeFantasyUsername(name))]);
      if (!validUsernames.has(currentUser.username)) {
        this.logout();
        this.loginError.set('Please sign in with a valid current user.');
      }
    });

    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.loadDashboard();
      }
    });

    effect(() => {
      if (this.adminTab() === 'users' && this.user()?.isAdmin && this.users().length === 0 && !this.usersLoading()) {
        this.loadUsers();
      }
    });
  }

  ngOnDestroy(): void {
    window.clearInterval(this.clockInterval);
  }

  async login() {
    if (!this.loginUsername || !this.loginPassword) {
      this.loginError.set('Please enter username and password');
      return;
    }

    this.signingIn.set(true);
    this.loginError.set('');

    try {
      const currentUser = await this.dataService.login(this.loginUsername, this.loginPassword);
      sessionStorage.setItem('ipl_user', JSON.stringify(currentUser));
      this.user.set(currentUser);
    } catch (error) {
      this.loginError.set(error instanceof Error ? error.message : 'Connection error. Please try again.');
    } finally {
      this.signingIn.set(false);
    }
  }

  logout() {
    sessionStorage.removeItem('ipl_user');
    this.user.set(null);
    this.activeTab.set('matches');
    this.selectedMatchId.set(null);
  }

  async loadDashboard() {
    this.loading.set(true);
    try {
      const dashboard = await this.dataService.loadDashboard();
      this.matches.set(dashboard.matches);
      this.results.set(dashboard.results);
      this.selections.set(dashboard.selections);
      this.insights.set(dashboard.insights);
      this.playerScores.set(dashboard.playerScores);
    } finally {
      this.loading.set(false);
    }
  }

  setActiveTab(tab: MainTab) {
    this.activeTab.set(tab);
    this.selectedMatchId.set(null);
  }

  openMatch(match: MatchRecord) {
    this.selectedMatchId.set(match.id);
    this.selectionDraft.set({ ...EMPTY_SELECTION, ...(this.currentUserSelections()[match.id] ?? {}) });
    this.selectionSavedMessage.set('');
    this.insightsPanelTab.set('xi');
  }

  closeMatch() {
    this.selectedMatchId.set(null);
  }

  updateSelectionField(field: keyof SelectionRecord, value: string) {
    this.selectionDraft.update((draft) => ({ ...draft, [field]: value }));
  }

  async saveSelection() {
    const match = this.selectedMatch();
    const currentUser = this.user();
    if (!match || !currentUser || isMatchLocked(match, new Date())) {
      return;
    }

    this.selectionSaving.set(true);
    try {
      await this.dataService.saveUserSelection(currentUser, match.id, this.selectionDraft());
      this.selections.update((allSelections) => ({
        ...allSelections,
        [currentUser.username]: {
          ...(allSelections[currentUser.username] ?? {}),
          [match.id]: { ...this.selectionDraft() },
        },
      }));
      this.selectionSavedMessage.set('Selections saved! ✓');
      window.setTimeout(() => this.selectionSavedMessage.set(''), 3000);
    } finally {
      this.selectionSaving.set(false);
    }
  }

  getStatus(match: MatchRecord, now = this.now()) {
    return getMatchStatus(match, now, this.results(), this.currentUserSelections());
  }

  getPicksMatchOptionLabel(match: MatchRecord) {
    const status = this.getStatus(match);
    const suffix = status === 'completed' ? 'Completed' : status === 'locked' ? 'Locked' : 'Next 48h';
    return `M${match.id}: ${match.home} vs ${match.away} — ${match.date} (${suffix})`;
  }

  getAdminLockLabel(match: MatchRecord) {
    if (this.results()[match.id]) {
      return '✓ Completed';
    }

    if (match.manual_lock_state === 1) {
      return '🔒 Admin Locked';
    }

    if (match.manual_lock_state === 0) {
      return '🔓 Admin Unlocked';
    }

    return isMatchLocked(match, this.now()) ? '🔒 Time Locked' : '🕒 Auto';
  }

  async setMatchLockState(match: MatchRecord, shouldLock: boolean, event?: Event) {
    event?.stopPropagation();
    const manualLockState = shouldLock ? 1 : 0;
    await this.dataService.setMatchManualLockState(match.id, manualLockState);
    this.matches.update((rows) => rows.map((row) => (row.id === match.id ? { ...row, manual_lock_state: manualLockState } : row)));
  }

  isTomorrowMatch(match: MatchRecord): boolean {
    const now = this.now();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const lockDate = new Date(match.lock_time);
    return (
      lockDate.getFullYear() === tomorrow.getFullYear() &&
      lockDate.getMonth() === tomorrow.getMonth() &&
      lockDate.getDate() === tomorrow.getDate()
    );
  }

  getTomorrowCountdown(match: MatchRecord): string {
    const remainingMs = new Date(match.lock_time).getTime() - this.now().getTime();
    if (remainingMs <= 0) {
      return 'Locked';
    }

    const totalMinutes = Math.floor(remainingMs / 60_000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours <= 0) {
      return `Locks tomorrow in ${minutes}m`;
    }

    return `Locks tomorrow in ${hours}h ${minutes}m`;
  }

  getSelectionBreakdownEntries(matchId: number, selection: SelectionRecord) {
    return Object.entries(calculateScore(selection, this.results()[matchId], this.playerScores()[matchId] ?? {}).breakdown).filter(
      ([key]) => !key.startsWith('_'),
    );
  }

  getUniquePlayers(match: MatchRecord) {
    return getUniqueMatchPlayers(match);
  }

  getInsightsAgeLabel(generatedAt?: string) {
    if (!generatedAt) {
      return '';
    }
    const hours = Math.round((Date.now() - new Date(generatedAt).getTime()) / 3_600_000);
    return hours < 1 ? 'just now' : `${hours}h ago`;
  }

  openPicksMatch(matchIdText: string) {
    const matchId = Number(matchIdText) || null;
    this.picksMatchId.set(matchId);
    this.picksEditingPlayer.set(null);
    this.picksSavedMessage.set('');
  }

  editPick(playerName: string) {
    const matchId = this.picksMatchId();
    if (!matchId) {
      return;
    }
    this.picksEditingPlayer.set(playerName);
    this.picksDraft.set({
      ...EMPTY_SELECTION,
      ...(this.selections()[normalizeFantasyUsername(playerName)]?.[matchId] ?? {}),
    });
  }

  cancelEditPick() {
    this.picksEditingPlayer.set(null);
    this.picksDraft.set({ ...EMPTY_SELECTION });
  }

  updatePicksDraft(field: keyof SelectionRecord, value: string) {
    this.picksDraft.update((draft) => ({ ...draft, [field]: value }));
  }

  async saveAdminPick(playerName: string) {
    const matchId = this.picksMatchId();
    if (!matchId) {
      return;
    }

    this.picksSaving.set(true);
    try {
      const username = normalizeFantasyUsername(playerName);
      await this.dataService.saveAdminSelection(username, matchId, this.picksDraft());
      this.selections.update((allSelections) => ({
        ...allSelections,
        [username]: {
          ...(allSelections[username] ?? {}),
          [matchId]: { ...this.picksDraft() },
        },
      }));
      this.picksSavedMessage.set(`Saved ${playerName}'s selections`);
      this.cancelEditPick();
      window.setTimeout(() => this.picksSavedMessage.set(''), 3000);
    } finally {
      this.picksSaving.set(false);
    }
  }

  openLiveUpdateMatch(matchIdText: string) {
    const matchId = Number(matchIdText) || null;
    this.liveUpdateMatchId.set(matchId);
    this.liveSavedMessage.set('');
    const drafts: Record<string, PlayerScoreDraft> = {};
    if (matchId) {
      const existingScores = this.playerScores()[matchId] ?? {};
      const tempMatch = this.matches().find((match) => match.id === matchId);
      if (tempMatch) {
        const selectedPlayers = new Set<string>();
        Object.values(this.selections()).forEach((userSelections) => {
          const pick = userSelections[matchId];
          if (!pick) {
            return;
          }
          [pick.bestBatsman, pick.bestBowler, pick.duckBatsman, pick.dotBallBowler].filter(Boolean).forEach((name) => selectedPlayers.add(name));
        });
        Array.from(selectedPlayers).sort().forEach((name) => {
          const current = existingScores[name];
          drafts[name] = {
            runs: current?.runs?.toString() ?? '',
            fours: current?.fours?.toString() ?? '',
            sixes: current?.sixes?.toString() ?? '',
            wickets: current?.wickets?.toString() ?? '',
            maidens: current?.maidens?.toString() ?? '',
            dot_balls: current?.dot_balls?.toString() ?? '',
          };
        });
      }
    }
    this.liveDrafts.set(drafts);
  }

  updateLiveDraft(playerName: string, field: keyof PlayerScoreDraft, value: string) {
    this.liveDrafts.update((drafts) => ({
      ...drafts,
      [playerName]: {
        ...(drafts[playerName] ?? { runs: '', fours: '', sixes: '', wickets: '', maidens: '', dot_balls: '' }),
        [field]: value,
      },
    }));
  }

  calculatePlayerScoreTotals(playerName: string) {
    const current = this.liveDrafts()[playerName] ?? { runs: '', fours: '', sixes: '', wickets: '', maidens: '', dot_balls: '' };
    const runs = Number.parseInt(current.runs, 10) || 0;
    const fours = Number.parseInt(current.fours, 10) || 0;
    const sixes = Number.parseInt(current.sixes, 10) || 0;
    const wickets = Number.parseInt(current.wickets, 10) || 0;
    const maidens = Number.parseInt(current.maidens, 10) || 0;
    const dotBalls = Number.parseInt(current.dot_balls, 10) || 0;
    const bonus = runs >= 100 ? 25 : runs >= 50 ? 15 : 0;
    return {
      batsmanScore: runs + bonus + fours * 2 + sixes * 3,
      bowlerScore: wickets * 25 + maidens * 25,
      dotBallScore: dotBalls * 5,
    };
  }

  async saveLiveScores() {
    const match = this.liveUpdateMatch();
    if (!match) {
      return;
    }

    this.liveSaving.set(true);
    try {
      const payload: PlayerScore[] = this.uniqueLivePlayers().map((name) => {
        const draft = this.liveDrafts()[name] ?? { runs: '', fours: '', sixes: '', wickets: '', maidens: '', dot_balls: '' };
        const totals = this.calculatePlayerScoreTotals(name);
        return {
          match_id: match.id,
          player_name: name,
          runs: draft.runs !== '' ? Number.parseInt(draft.runs, 10) : null,
          fours: draft.fours !== '' ? Number.parseInt(draft.fours, 10) : null,
          sixes: draft.sixes !== '' ? Number.parseInt(draft.sixes, 10) : null,
          wickets: draft.wickets !== '' ? Number.parseInt(draft.wickets, 10) : null,
          maidens: draft.maidens !== '' ? Number.parseInt(draft.maidens, 10) : null,
          dot_balls: draft.dot_balls !== '' ? Number.parseInt(draft.dot_balls, 10) : null,
          batsman_score: totals.batsmanScore || null,
          bowler_score: totals.bowlerScore || null,
          dot_ball_score: totals.dotBallScore || null,
        };
      });

      await this.dataService.savePlayerScores(match.id, payload);
      this.playerScores.update((allScores) => {
        const updated = { ...(allScores[match.id] ?? {}) };
        payload.forEach((score) => {
          updated[score.player_name] = score;
        });
        return { ...allScores, [match.id]: updated };
      });
      this.liveSavedMessage.set('Scores saved successfully ✓');
      window.setTimeout(() => this.liveSavedMessage.set(''), 3000);
    } finally {
      this.liveSaving.set(false);
    }
  }

  openAdminMatch(match: MatchRecord) {
    this.adminMatchId.set(match.id);
    const existing = this.results()[match.id];
    this.adminResultDraft.set(existing ? { ...existing, duckBatsmen: [...(existing.duckBatsmen || [])] } : this.emptyResult());
    this.adminSavedResult.set(false);
    this.adminDuckCandidate.set('');
  }

  updateAdminResult<K extends keyof MatchResult>(field: K, value: MatchResult[K]) {
    this.adminResultDraft.update((draft) => ({ ...draft, [field]: value }));
  }

  addDuckPlayer() {
    const player = this.adminDuckCandidate();
    if (!player) {
      return;
    }
    this.adminResultDraft.update((draft) => ({
      ...draft,
      duckBatsmen: draft.duckBatsmen.includes(player) ? draft.duckBatsmen : [...draft.duckBatsmen, player],
    }));
    this.adminDuckCandidate.set('');
  }

  removeDuckPlayer(player: string) {
    this.adminResultDraft.update((draft) => ({ ...draft, duckBatsmen: draft.duckBatsmen.filter((name) => name !== player) }));
  }

  async saveAdminResult() {
    const match = this.adminMatch();
    if (!match) {
      return;
    }

    this.adminSavingResult.set(true);
    try {
      const draft = this.adminResultDraft();
      const payload: MatchResult = {
        ...draft,
        runMargin: Number(draft.runMargin) || 0,
        wicketMargin: Number(draft.wicketMargin) || 0,
        topScorerRuns: Number(draft.topScorerRuns) || 0,
        bestBowlerPoints: Number(draft.bestBowlerPoints) || 0,
        powerplayScore: Number(draft.powerplayScore) || 0,
        powerplayDiff: Number(draft.powerplayDiff) || 0,
        dotBalls: Number(draft.dotBalls) || 0,
        totalWickets: Number(draft.totalWickets) || 0,
      };
      await this.dataService.saveResult(match.id, payload);
      this.results.update((results) => ({ ...results, [match.id]: payload }));
      this.adminSavedResult.set(true);
      window.setTimeout(() => this.adminSavedResult.set(false), 3000);
    } finally {
      this.adminSavingResult.set(false);
    }
  }

  async loadUsers() {
    this.usersLoading.set(true);
    try {
      const rows = await this.dataService.loadUsers();
      this.users.set(rows.filter((row) => !row.is_admin));
    } finally {
      this.usersLoading.set(false);
    }
  }

  async resetPassword(username: string) {
    const password = getDefaultPlayerPassword(username);
    await this.dataService.resetPassword(username, password);
    this.users.update((rows) => rows.map((row) => (row.username === username ? { ...row, password } : row)));
    this.passwordResetInfo.set({ username, newPwd: password });
  }

  async runInsightsUpdate() {
    this.insightsUpdating.set(true);
    this.insightsUpdateError.set('');
    this.insightsUpdateResult.set(null);
    try {
      const result = await triggerInsightsUpdate();
      this.insightsUpdateResult.set(result);
    } catch (error) {
      this.insightsUpdateError.set(error instanceof Error ? error.message : 'Failed to update insights');
    } finally {
      this.insightsUpdating.set(false);
    }
  }

  getPickOptions(type: string, match: MatchRecord | null) {
    if (!match) {
      return [] as string[];
    }
    if (type === 'team') {
      return [match.home, match.away];
    }
    if (type === 'player') {
      return this.getUniquePlayers(match);
    }
    if (type === 'wickets') {
      return this.wicketRanges;
    }
    if (type === 'double') {
      return this.doubleCategories;
    }
    if (type === 'fantasy') {
      return this.fantasyPlayers;
    }
    return [] as string[];
  }

  hasUserSelection(matchId: number) {
    return !!this.currentUserSelections()[matchId];
  }

  teamBadgeStyle(teamCode: string) {
    const meta = this.teamMeta[teamCode];
    return {
      background: `${meta?.color ?? '#333'}20`,
      color: meta?.accent ?? '#fff',
      borderColor: `${meta?.color ?? '#333'}40`,
    };
  }

  getEntryScore(entry: [string, string | number]) {
    return Number(entry[1]) || 0;
  }

  getHorsePoints(row: { breakdown: Record<string, number | string> }) {
    return (Number(row.breakdown['winningHorse']) || 0) + (Number(row.breakdown['losingHorse']) || 0);
  }

  getCurrentUserScore(matchId: number) {
    return calculateScore(this.currentUserSelections()[matchId], this.results()[matchId], this.playerScores()[matchId] || {});
  }

  availableDuckPlayers() {
    const match = this.adminMatch();
    if (!match) {
      return [] as string[];
    }
    return this.getUniquePlayers(match).filter((player) => !this.adminResultDraft().duckBatsmen.includes(player));
  }

  trackByName = (_: number, name: string) => name;

  private restoreSession(): SessionUser | null {
    try {
      return JSON.parse(sessionStorage.getItem('ipl_user') || 'null');
    } catch {
      return null;
    }
  }

  private emptyResult(): MatchResult {
    return {
      winningTeam: '',
      winByRuns: true,
      runMargin: 0,
      wicketMargin: 0,
      topScorer: '',
      topScorerRuns: 0,
      bestBowler: '',
      bestBowlerPoints: 0,
      powerplayWinner: '',
      powerplayScore: 0,
      powerplayDiff: 0,
      dotBallLeader: '',
      dotBalls: 0,
      totalWickets: 0,
      wicketsRange: '',
      duckBatsmen: [],
      matchTopPlayer: '',
      matchBottomPlayer: '',
    };
  }
}
