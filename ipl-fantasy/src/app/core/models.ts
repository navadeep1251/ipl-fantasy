export interface SessionUser {
  username: string;
  displayName: string;
  isAdmin: boolean;
}

export interface MatchRecord {
  id: number;
  home: string;
  away: string;
  date: string;
  time_label: string;
  lock_time: string;
}

export interface MatchResult {
  winningTeam: string;
  winByRuns?: boolean;
  runMargin: number;
  wicketMargin: number;
  topScorer: string;
  topScorerRuns: number;
  bestBowler: string;
  bestBowlerPoints: number;
  powerplayWinner: string;
  powerplayScore: number;
  powerplayDiff: number;
  dotBallLeader: string;
  dotBalls: number;
  totalWickets: number;
  wicketsRange: string;
  duckBatsmen: string[];
  matchTopPlayer: string;
  matchBottomPlayer: string;
}

export interface MatchInsights {
  generated_at?: string;
  home_probable_xi?: string[];
  away_probable_xi?: string[];
  home_form_batsmen?: string;
  away_form_batsmen?: string;
  home_form_bowlers?: string;
  away_form_bowlers?: string;
  pitch_report?: string;
  head_to_head?: string;
  key_matchups?: string;
  prediction_summary?: string;
}

export interface SelectionRecord {
  winningTeam: string;
  bestBatsman: string;
  bestBowler: string;
  powerplayWinner: string;
  dotBallBowler: string;
  totalWickets: string;
  duckBatsman: string;
  doubleCategory: string;
  winningHorse: string;
  losingHorse: string;
}

export interface PlayerScore {
  match_id: number;
  player_name: string;
  runs: number | null;
  fours: number | null;
  sixes: number | null;
  wickets: number | null;
  maidens: number | null;
  dot_balls: number | null;
  batsman_score: number | null;
  bowler_score: number | null;
  dot_ball_score: number | null;
}

export interface PlayerScoreDraft {
  runs: string;
  fours: string;
  sixes: string;
  wickets: string;
  maidens: string;
  dot_balls: string;
}

export interface TeamMeta {
  name: string;
  color: string;
  accent: string;
  logoUrl: string;
}

export interface ScoreBreakdown {
  breakdown: Record<string, number | string>;
  total: number;
}

export type ResultMap = Record<number, MatchResult>;
export type SelectionMap = Record<string, Record<number, SelectionRecord>>;
export type InsightMap = Record<number, MatchInsights>;
export type PlayerScoresMap = Record<number, Record<string, PlayerScore>>;

export type MainTab = 'matches' | 'selections' | 'live' | 'leaderboard' | 'admin';
export type LeaderboardTab = 'board' | 'consolidated' | 'stats';
export type LiveTab = 'grid' | 'update';
export type AdminTab = 'results' | 'scores' | 'selections' | 'insights' | 'users';
export type MatchFilter = 'all' | 'open' | 'locked' | 'completed';
