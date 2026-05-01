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
  computeTrophies,
  getMatchStatus,
  isMatchLocked,
  getUniqueMatchPlayers,
  TROPHY_DEFS,
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
import { SupabaseService, SupabaseSyncState } from '../core/supabase.service';

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
  private readonly supabaseService = inject(SupabaseService);
  private readonly clockInterval = window.setInterval(() => {
    this.now.set(new Date());
    this.checkPickReminders();
  }, 30_000);
  private readonly sharedRefreshInterval = window.setInterval(() => void this.refreshSharedData(), 15_000);
  private readonly notifiedKeys = new Set<string>();

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
  readonly supabaseSyncState = signal<SupabaseSyncState>('connecting');
  readonly supabaseSyncMessage = signal('Connecting to live sync...');

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
  readonly adminMatchFilter = signal<'all' | 'open' | 'locked' | 'completed'>('all');

  readonly users = signal<UserRow[]>([]);
  readonly usersLoading = signal(false);
  readonly passwordResetInfo = signal<{ username: string; newPwd: string } | null>(null);

  readonly insightsUpdating = signal(false);
  readonly insightsUpdateResult = signal<any | null>(null);
  readonly insightsUpdateError = signal('');
  readonly notificationPermission = signal<string>('Notification' in window ? Notification.permission : 'denied');

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
    const filtered = this.matches().filter((match) => {
      const status = this.getStatus(match, now);
      if (filter === 'all') {
        return true;
      }
      if (filter === 'open') {
        return status === 'open' || status === 'submitted';
      }
      return status === filter;
    });
    return filtered.sort((a, b) => {
      const statusA = this.getStatus(a, now);
      const statusB = this.getStatus(b, now);
      const isOpenA = statusA === 'open' || statusA === 'submitted';
      const isOpenB = statusB === 'open' || statusB === 'submitted';
      if (isOpenA !== isOpenB) return isOpenA ? -1 : 1;
      if (isOpenA) return a.id - b.id;
      return b.id - a.id;
    });
  });

  readonly lockedMatches = computed(() =>
    this.matches()
      .filter((match) => !!this.results()[match.id] || isMatchLocked(match, this.now()))
      .sort((a, b) => b.id - a.id),
  );
  readonly adminSortedMatches = computed(() => {
    const now = this.now();
    const filter = this.adminMatchFilter();
    const results = this.results();
    
    let filtered = [...this.matches()];
    
    if (filter !== 'all') {
      filtered = filtered.filter((match) => {
        if (results[match.id]) return filter === 'completed';
        if (isMatchLocked(match, now)) return filter === 'locked';
        return filter === 'open';
      });
    }
    
    // Sort by filter type: completed/locked latest first (descending), open earliest first (ascending)
    if (filter === 'completed' || filter === 'locked') {
      return filtered.sort((a, b) => b.id - a.id);
    }
    
    return filtered.sort((a, b) => a.id - b.id);
  });
  readonly picksVisibleMatches = computed(() => {
    const now = this.now();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const upcoming = this.matches()
      .filter((match) => {
        if (this.results()[match.id] || isMatchLocked(match, now)) return false;
        const lockTime = new Date(match.lock_time);
        return lockTime > now && lockTime <= next24h;
      })
      .sort((a, b) => new Date(a.lock_time).getTime() - new Date(b.lock_time).getTime());
    return [...upcoming, ...this.lockedMatches()];
  });
  readonly currentMatchPlayers = computed(() => (this.selectedMatch() ? getUniqueMatchPlayers(this.selectedMatch()!) : []));
  readonly selectedMatchScore = computed(() => {
    const match = this.selectedMatch();
    if (!match || !this.results()[match.id]) {
      return null;
    }
    return calculateScore(this.selectionDraft(), this.results()[match.id], this.playerScores()[match.id] ?? {}, match.lock_time);
  });

  readonly picksMatchLocked = computed(() => {
    const match = this.picksMatch();
    if (!match) return false;
    if (this.results()[match.id]) return true;
    return isMatchLocked(match, this.now());
  });

  readonly liveLeaderboardRows = computed(() => {
    const matchId = this.liveUpdateMatchId();
    if (!matchId) {
      return [];
    }
    const match = this.liveUpdateMatch();
    return buildLiveLeaderboard(matchId, this.selections(), this.results(), this.playerScores(), match?.lock_time);
  });

  readonly overallLeaderboard = computed(() => buildOverallLeaderboard(this.matches(), this.selections(), this.results(), this.playerScores()));
  readonly consolidated = computed(() => buildConsolidatedTable(this.matches(), this.selections(), this.results(), this.playerScores()));

  readonly trophyDefs = TROPHY_DEFS;
  readonly selectedTrophyPlayer = signal<string>('');

  readonly allTrophyCabinets = computed(() => {
    const board = this.overallLeaderboard();
    const total = board.length;
    return FANTASY_PLAYERS.map((name) => {
      const rank = board.findIndex((e) => e.name === name) + 1 || total;
      const trophies = computeTrophies(
        name,
        this.matches(),
        this.results(),
        this.selections(),
        this.playerScores(),
        rank,
        total,
      );
      return { name, rank, trophies };
    });
  });

  readonly activeTrophyPlayer = computed(() => {
    const selected = this.selectedTrophyPlayer();
    const entries = this.allTrophyCabinets();
    if (selected) return entries.find((e) => e.name === selected) ?? entries[0] ?? null;
    const currentUser = this.user();
    if (currentUser) return entries.find((e) => e.name === currentUser.displayName) ?? entries[0] ?? null;
    return entries[0] ?? null;
  });

  private static readonly PIE_COLORS = [
    '#00e5a0', '#ff6b6b', '#4dabf7', '#ffd43b', '#cc5de8',
    '#ff922b', '#51cf66', '#f783ac', '#20c997', '#748ffc',
    '#e64d4d', '#9b59b6', '#1abc9c', '#e67e22', '#3498db',
  ];

  readonly livePickDistributions = computed(() => {
    const matchId = this.liveUpdateMatchId();
    if (!matchId) return null;

    const allSelections = this.selections();

    const categories: { key: keyof SelectionRecord; label: string; isTeam: boolean }[] = [
      { key: 'winningTeam', label: 'Winning Team', isTeam: true },
      { key: 'bestBatsman', label: 'Best Batsman', isTeam: false },
      { key: 'bestBowler', label: 'Best Bowler', isTeam: false },
      { key: 'doubleCategory', label: 'Double Category', isTeam: false },
      { key: 'winningHorse', label: '🏆 Winning Horse', isTeam: false },
      { key: 'losingHorse', label: '💀 Losing Horse', isTeam: false },
    ];

    return categories.map(({ key, label, isTeam }) => {
      const counts: Record<string, number> = {};
      Object.values(allSelections).forEach((userSelections) => {
        const pick = userSelections[matchId]?.[key];
        if (pick && typeof pick === 'string') {
          counts[pick] = (counts[pick] ?? 0) + 1;
        }
      });

      const entries: [string, number][] = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const total = entries.reduce((sum, [, n]) => sum + n, 0);
      const slices = this.buildPieSlices(entries, total, isTeam);

      return { key, label, entries, total, slices };
    });
  });

  readonly myStats = computed(() => {
    const currentUser = this.user();
    if (!currentUser) {
      return { lockedMatches: [], totalPoints: 0, averagePoints: 0 };
    }

    const lockedMatches = this.lockedMatches().filter((match) => this.currentUserSelections()[match.id]);
    const totalPoints = lockedMatches.reduce(
      (sum, match) => sum + calculateScore(this.currentUserSelections()[match.id], this.results()[match.id], this.playerScores()[match.id] ?? {}, match.lock_time).total,
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
    const scoringPlayers = new Set<string>();
    const duckOnlyPlayers = new Set<string>();
    Object.values(this.selections()).forEach((userSelections) => {
      const pick = userSelections[match.id];
      if (!pick) {
        return;
      }
      [pick.bestBatsman, pick.bestBowler, pick.dotBallBowler].filter(Boolean).forEach((name) => scoringPlayers.add(name));
      if (pick.duckBatsman && !scoringPlayers.has(pick.duckBatsman)) {
        duckOnlyPlayers.add(pick.duckBatsman);
      }
    });
    // Include duck picks only if they also appear in a scoring category
    duckOnlyPlayers.forEach((name) => {
      if (scoringPlayers.has(name)) {
        duckOnlyPlayers.delete(name);
      }
    });
    return Array.from(scoringPlayers).sort();
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

    effect((onCleanup) => {
      const currentUser = this.user();
      if (!currentUser) {
        this.setSyncState('offline');
        return;
      }

      this.setSyncState('connecting');
      const unsubscribe = this.supabaseService.subscribeToSharedChanges({
        onChange: () => void this.refreshSharedData(),
        onStatus: (status) => this.setSyncState(status),
      });

      onCleanup(() => {
        unsubscribe();
      });
    });

    effect(() => {
      if (this.adminTab() === 'users' && this.user()?.isAdmin && this.users().length === 0 && !this.usersLoading()) {
        this.loadUsers();
      }
    });
  }

  ngOnDestroy(): void {
    window.clearInterval(this.clockInterval);
    window.clearInterval(this.sharedRefreshInterval);
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
      this.persistSession(currentUser);
      this.user.set(currentUser);
    } catch (error) {
      this.loginError.set(error instanceof Error ? error.message : 'Connection error. Please try again.');
    } finally {
      this.signingIn.set(false);
    }
  }

  logout() {
    localStorage.removeItem('ipl_session');
    this.user.set(null);
    this.activeTab.set('matches');
    this.selectedMatchId.set(null);
    this.setSyncState('offline');
  }

  async loadDashboard() {
    this.loading.set(true);
    try {
      this.applyDashboard(await this.dataService.loadDashboard());
      if (this.user()) {
        this.setSyncState(this.supabaseSyncState() === 'offline' ? 'offline' : 'connecting');
        this.checkPickReminders();
      }
    } finally {
      this.loading.set(false);
    }
  }

  async refreshSharedData() {
    if (!this.user()) {
      return;
    }

    try {
      this.applyDashboard(await this.dataService.loadDashboard());
      this.touchSession();
    } catch {}
  }

  syncBadgeClass() {
    return this.supabaseSyncState();
  }

  syncBadgeLabel() {
    return this.supabaseSyncMessage();
  }

  setActiveTab(tab: MainTab) {
    this.activeTab.set(tab);
    this.selectedMatchId.set(null);
    this.touchSession();
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
      const selectionWithTimestamp = {
        ...this.selectionDraft(),
        created_at: this.selectionDraft().created_at || new Date().toISOString(),
      };
      await this.dataService.saveUserSelection(currentUser, match.id, selectionWithTimestamp);
      this.selections.update((allSelections) => ({
        ...allSelections,
        [currentUser.username]: {
          ...(allSelections[currentUser.username] ?? {}),
          [match.id]: selectionWithTimestamp,
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
    const suffix = status === 'completed' ? 'Completed' : status === 'locked' ? 'Locked' : 'Next 24h';
    return `M${match.id}: ${match.home} vs ${match.away} — ${match.date} (${suffix})`;
  }

  getSubmittedPlayersForMatch(matchId: number) {
    return this.fantasyPlayers.filter((name) => !!this.selections()[normalizeFantasyUsername(name)]?.[matchId]);
  }

  getMissingPlayersForMatch(matchId: number) {
    const submitted = new Set(this.getSubmittedPlayersForMatch(matchId));
    return this.fantasyPlayers.filter((name) => !submitted.has(name));
  }

  getEntryBannerSummary(matchId: number) {
    const submittedCount = this.getSubmittedPlayersForMatch(matchId).length;
    return `${submittedCount}/${this.fantasyPlayers.length} picks submitted`;
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

  getSelectionTimestamp(playerName: string, matchId: number): string | null {
    const username = normalizeFantasyUsername(playerName);
    const selection = this.selections()[username]?.[matchId];
    return selection?.created_at || null;
  }

  formatTimestamp(timestamp: string | null | undefined): string {
    if (!timestamp) return 'Not submitted';
    const date = new Date(timestamp);
    const now = this.now();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) {
      return `${minutes}m ago`;
    }
    if (hours < 24) {
      return `${hours}h ${minutes}m ago`;
    }

    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  isSelectionMade(playerName: string, matchId: number): boolean {
    const username = normalizeFantasyUsername(playerName);
    return !!this.selections()[username]?.[matchId];
  }

  checkMatchLocked(match: MatchRecord): boolean {
    if (this.results()[match.id]) return true;
    return isMatchLocked(match, this.now());
  }

  private applyDashboard(dashboard: Awaited<ReturnType<DataService['loadDashboard']>>) {
    this.matches.set(dashboard.matches);
    this.results.set(dashboard.results);
    this.selections.set(dashboard.selections);
    this.insights.set(dashboard.insights);
    this.playerScores.set(dashboard.playerScores);
  }

  async enableNotifications(): Promise<void> {
    if (!('Notification' in window)) return;
    const result = await Notification.requestPermission();
    this.notificationPermission.set(result);
    if (result === 'granted') {
      this.checkPickReminders();
    }
  }

  private checkPickReminders(): void {
    if (!this.user()) return;
    const now = new Date();
    const results = this.results();
    const userSelections = this.currentUserSelections();

    for (const match of this.matches()) {
      const status = getMatchStatus(match, now, results, userSelections);
      if (status !== 'open') continue;

      const msUntilLock = new Date(match.lock_time).getTime() - now.getTime();
      if (msUntilLock <= 0) continue;

      const label = `M${match.id}: ${match.home} vs ${match.away}`;

      if (msUntilLock <= 60 * 60 * 1000) {
        const key = `${match.id}-1hr`;
        if (!this.notifiedKeys.has(key)) {
          this.notifiedKeys.add(key);
          this.sendPickReminder('⏰ 1 hour left!', `${label} – submit your picks before the deadline.`);
        }
      }

      if (msUntilLock <= 20 * 60 * 1000) {
        const key = `${match.id}-20min`;
        if (!this.notifiedKeys.has(key)) {
          this.notifiedKeys.add(key);
          this.sendPickReminder('🚨 20 minutes left!', `${label} locks very soon — last chance to pick!`);
        }
      }
    }
  }

  private sendPickReminder(title: string, body: string): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/logos/RCB.png', tag: 'ipl-pick-reminder' });
    }
  }

  private setSyncState(state: SupabaseSyncState) {
    this.supabaseSyncState.set(state);

    if (state === 'live') {
      this.supabaseSyncMessage.set('Live sync active');
      return;
    }

    if (state === 'connecting') {
      this.supabaseSyncMessage.set('Connecting to live sync...');
      return;
    }

    this.supabaseSyncMessage.set('Offline cache mode');
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
    const match = this.matches().find((m) => m.id === matchId);
    return Object.entries(calculateScore(selection, this.results()[matchId], this.playerScores()[matchId] ?? {}, match?.lock_time).breakdown).filter(
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
      const draftWithTimestamp = {
        ...this.picksDraft(),
        created_at: this.picksDraft().created_at || new Date().toISOString(),
      };
      await this.dataService.saveAdminSelection(username, matchId, draftWithTimestamp);
      this.selections.update((allSelections) => ({
        ...allSelections,
        [username]: {
          ...(allSelections[username] ?? {}),
          [matchId]: draftWithTimestamp,
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
      const powerplayResult = this.derivePowerplayOutcome(match, draft);
      const payload: MatchResult = {
        ...draft,
        runMargin: Number(draft.runMargin) || 0,
        wicketMargin: Number(draft.wicketMargin) || 0,
        topScorerRuns: Number(draft.topScorerRuns) || 0,
        bestBowlerPoints: Number(draft.bestBowlerPoints) || 0,
        powerplayWinner: powerplayResult.winner,
        powerplayScore: powerplayResult.score,
        powerplayDiff: powerplayResult.diff,
        powerplayHomeScore: Number(draft.powerplayHomeScore) || 0,
        powerplayAwayScore: Number(draft.powerplayAwayScore) || 0,
        powerplayHomeWickets: Number(draft.powerplayHomeWickets) || 0,
        powerplayAwayWickets: Number(draft.powerplayAwayWickets) || 0,
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
      this.users.set(rows.filter((row) => !row.is_admin).map((row) => ({ ...row, is_admin: !!row.is_admin })));
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

  getAdminPowerplaySummary() {
    const match = this.adminMatch();
    if (!match) {
      return '';
    }

    const outcome = this.derivePowerplayOutcome(match, this.adminResultDraft());
    if (!outcome.winner) {
      return 'No powerplay winner. Equal runs and wickets means no points awarded.';
    }

    const basis = outcome.tieBreakByWickets ? `fewer wickets lost by ${outcome.diff}` : `${outcome.diff} run lead`;
    return `${outcome.winner} win the powerplay on ${basis}.`;
  }

  getAdminPowerplayWinner() {
    const match = this.adminMatch();
    if (!match) {
      return '';
    }

    return this.derivePowerplayOutcome(match, this.adminResultDraft()).winner;
  }

  getAdminPowerplayMargin() {
    const match = this.adminMatch();
    if (!match) {
      return 0;
    }

    return this.derivePowerplayOutcome(match, this.adminResultDraft()).diff;
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

  getTrophyUnlockedCount(cabinet: ReturnType<typeof computeTrophies>): number {
    return cabinet.filter((t) => t.unlocked).length;
  }

  buildPieSlices(entries: [string, number][], total: number, isTeam: boolean) {
    if (!total) return [];
    const cx = 100, cy = 100, outerR = 80, innerR = 55;
    let angle = -Math.PI / 2;

    return entries.map(([name, count], i) => {
      const fraction = count / total;
      const sweep = entries.length === 1 ? 0.9999 : fraction;
      const startAngle = angle;
      const endAngle = angle + sweep * 2 * Math.PI;
      angle += fraction * 2 * Math.PI;

      const cos = Math.cos, sin = Math.sin;
      const x1 = cx + outerR * cos(startAngle), y1 = cy + outerR * sin(startAngle);
      const x2 = cx + outerR * cos(endAngle),   y2 = cy + outerR * sin(endAngle);
      const ix1 = cx + innerR * cos(endAngle),  iy1 = cy + innerR * sin(endAngle);
      const ix2 = cx + innerR * cos(startAngle), iy2 = cy + innerR * sin(startAngle);
      const large = sweep > 0.5 ? 1 : 0;
      const f = (n: number) => n.toFixed(2);

      const d = `M ${f(x1)} ${f(y1)} A ${outerR} ${outerR} 0 ${large} 1 ${f(x2)} ${f(y2)} L ${f(ix1)} ${f(iy1)} A ${innerR} ${innerR} 0 ${large} 0 ${f(ix2)} ${f(iy2)} Z`;
      const color = isTeam
        ? (this.teamMeta[name]?.color ?? FantasyDashboardComponent.PIE_COLORS[i % FantasyDashboardComponent.PIE_COLORS.length])
        : FantasyDashboardComponent.PIE_COLORS[i % FantasyDashboardComponent.PIE_COLORS.length];

      return { name, count, d, color };
    });
  }

  private restoreSession(): SessionUser | null {
    const SESSION_TTL = 3 * 24 * 60 * 60 * 1000; // 3 days
    try {
      const raw = localStorage.getItem('ipl_session');
      if (!raw) return null;
      const { user, lastActive } = JSON.parse(raw) as { user: SessionUser; lastActive: number };
      if (!user || !lastActive || Date.now() - lastActive > SESSION_TTL) {
        localStorage.removeItem('ipl_session');
        return null;
      }
      const normalizedUsername = normalizeFantasyUsername(user.username);
      return {
        ...user,
        username: normalizedUsername,
        displayName: normalizedUsername === 'pavan' ? 'Pavan' : user.displayName,
      };
    } catch {
      return null;
    }
  }

  private persistSession(user: SessionUser): void {
    localStorage.setItem('ipl_session', JSON.stringify({ user, lastActive: Date.now() }));
  }

  private touchSession(): void {
    const current = this.user();
    if (!current) return;
    try {
      const raw = localStorage.getItem('ipl_session');
      if (!raw) return;
      const parsed = JSON.parse(raw) as { user: SessionUser; lastActive: number };
      parsed.lastActive = Date.now();
      localStorage.setItem('ipl_session', JSON.stringify(parsed));
    } catch {}
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
      powerplayHomeScore: 0,
      powerplayAwayScore: 0,
      powerplayHomeWickets: 0,
      powerplayAwayWickets: 0,
      dotBallLeader: '',
      dotBalls: 0,
      totalWickets: 0,
      wicketsRange: '',
      duckBatsmen: [],
      matchTopPlayer: '',
      matchBottomPlayer: '',
    };
  }

  private derivePowerplayOutcome(match: MatchRecord, draft: MatchResult) {
    const homeScore = Number(draft.powerplayHomeScore) || 0;
    const awayScore = Number(draft.powerplayAwayScore) || 0;
    const homeWickets = Number(draft.powerplayHomeWickets) || 0;
    const awayWickets = Number(draft.powerplayAwayWickets) || 0;

    if (homeScore > awayScore) {
      return { winner: match.home, score: homeScore, diff: homeScore - awayScore, tieBreakByWickets: false };
    }

    if (awayScore > homeScore) {
      return { winner: match.away, score: awayScore, diff: awayScore - homeScore, tieBreakByWickets: false };
    }

    if (homeWickets < awayWickets) {
      return { winner: match.home, score: homeScore, diff: awayWickets - homeWickets, tieBreakByWickets: true };
    }

    if (awayWickets < homeWickets) {
      return { winner: match.away, score: awayScore, diff: homeWickets - awayWickets, tieBreakByWickets: true };
    }

    return { winner: '', score: 0, diff: 0, tieBreakByWickets: false };
  }
}
