import {
  MatchInsights,
  MatchRecord,
  MatchResult,
  PlayerScore,
  PlayerScoresMap,
  ScoreBreakdown,
  SelectionMap,
  SelectionRecord,
} from './models';
import { FANTASY_PLAYERS, TEAM_PLAYERS, scoreKeyFromDoubleCategory } from './ipl-data';

const FIRST_PLACE_PRIZE = 3;
const SECOND_PLACE_PRIZE = 2;

export function isMatchLocked(match: MatchRecord, now: Date): boolean {
  if (match.manual_lock_state === 1) {
    return true;
  }

  if (match.manual_lock_state === 0) {
    return false;
  }

  return now >= new Date(match.lock_time);
}

export function getMatchStatus(
  match: MatchRecord,
  now: Date,
  results: Record<number, MatchResult>,
  userSelections: Record<number, SelectionRecord>,
): 'completed' | 'locked' | 'submitted' | 'open' {
  if (results[match.id]) {
    return 'completed';
  }

  if (isMatchLocked(match, now)) {
    return 'locked';
  }

  if (userSelections[match.id]) {
    return 'submitted';
  }

  return 'open';
}

export function calculateScore(
  selection: SelectionRecord | undefined,
  result: MatchResult | undefined,
  playerScores: Record<string, PlayerScore> = {},
  matchLockTime?: string,
): ScoreBreakdown {
  if (!selection) {
    return { breakdown: {}, total: 0 };
  }

  const scoreForBatsman = (name: string) => playerScores[name]?.batsman_score ?? 0;
  const scoreForBowler = (name: string) => playerScores[name]?.bowler_score ?? 0;
  const scoreForDotBall = (name: string) => playerScores[name]?.dot_ball_score ?? 0;

  const horsePoints = matchLockTime && matchLockTime >= '2026-04-25' ? 50 : 100;
  const currentResult = result ?? ({} as MatchResult);

  // Calculate winning team score based on win type
  let winningTeamScore = 0;
  if (selection.winningTeam === currentResult.winningTeam && currentResult.winningTeam) {
    winningTeamScore = 50; // Base points for correct team
    
    if (currentResult.winByRuns) {
      // Win by runs scoring
      const runMargin = currentResult.runMargin || 0;
      winningTeamScore += runMargin; // Add the run margin
      
      if (runMargin > 50) {
        winningTeamScore += 25; // Bonus for winning by more than 50 runs
      } else if (runMargin >= 25 && runMargin <= 50) {
        winningTeamScore += 10; // Bonus for winning by 25-50 runs
      }
    } else {
      // Win by wickets scoring
      const wicketMargin = currentResult.wicketMargin || 0;
      winningTeamScore += wicketMargin * 5; // Multiply wicket margin by 5
      
      if (wicketMargin > 8) {
        winningTeamScore += 25; // Bonus for winning by more than 8 wickets
      } else if (wicketMargin >= 3 && wicketMargin <= 8) {
        winningTeamScore += 10; // Bonus for winning by 3-8 wickets
      }
    }
  }

  const breakdown: Record<string, number | string> = {
    winningTeam: winningTeamScore,
    bestBatsman:
      scoreForBatsman(selection.bestBatsman) +
      (selection.bestBatsman === currentResult.topScorer ? (currentResult.topScorerRuns || 0) + 50 : 0),
    bestBowler:
      scoreForBowler(selection.bestBowler) +
      (selection.bestBowler === currentResult.bestBowler ? (currentResult.bestBowlerPoints || 0) + 50 : 0),
    powerplayWinner:
      currentResult.powerplayWinner && selection.powerplayWinner === currentResult.powerplayWinner
        ? (currentResult.powerplayScore || 0) + (currentResult.powerplayDiff || 0)
        : 0,
    dotBallBowler:
      scoreForDotBall(selection.dotBallBowler) +
      (selection.dotBallBowler === currentResult.dotBallLeader ? 50 + (currentResult.dotBalls || 0) * 5 : 0),
    totalWickets:
      selection.totalWickets === currentResult.wicketsRange ? 100 : 0,
    duckBatsman: (currentResult.duckBatsmen || []).includes(selection.duckBatsman) ? 100 : 0,
    winningHorse:
      selection.winningHorse && currentResult.matchTopPlayer && selection.winningHorse === currentResult.matchTopPlayer ? horsePoints : 0,
    losingHorse:
      selection.losingHorse && currentResult.matchBottomPlayer && selection.losingHorse === currentResult.matchBottomPlayer ? horsePoints : 0,
  };

  if (selection.doubleCategory) {
    const doubledKey = scoreKeyFromDoubleCategory(selection.doubleCategory);
    if (typeof breakdown[doubledKey] === 'number') {
      breakdown[doubledKey] = Number(breakdown[doubledKey]) * 2;
      breakdown['_doubled'] = selection.doubleCategory;
    }
  }

  const total = Object.entries(breakdown)
    .filter(([key]) => !key.startsWith('_'))
    .reduce((sum, [, value]) => sum + (Number(value) || 0), 0);

  return { breakdown, total };
}

export function getUniqueMatchPlayers(match: MatchRecord): string[] {
  return Array.from(new Set([...(TEAM_PLAYERS[match.home] ?? []), ...(TEAM_PLAYERS[match.away] ?? [])])).sort();
}

export function buildLiveLeaderboard(
  matchId: number,
  selections: SelectionMap,
  results: Record<number, MatchResult>,
  playerScores: PlayerScoresMap,
  matchLockTime?: string,
): Array<{ name: string; total: number; breakdown: Record<string, number | string> }> {
  return FANTASY_PLAYERS.map((name) => {
    const normalized = name.toLowerCase().replace(/\s/g, '_');
    const selection = selections[normalized]?.[matchId];
    if (!selection) {
      return null;
    }

    const calculated = calculateScore(selection, results[matchId], playerScores[matchId] ?? {}, matchLockTime);
    return { name, total: calculated.total, breakdown: calculated.breakdown };
  })
    .filter((row): row is { name: string; total: number; breakdown: Record<string, number | string> } => !!row)
    .sort((left, right) => right.total - left.total);
}

export function buildOverallLeaderboard(
  matches: MatchRecord[],
  selections: SelectionMap,
  results: Record<number, MatchResult>,
  playerScores: PlayerScoresMap,
): Array<{ name: string; total: number; matchCount: number }> {
  const lockedMatches = matches.filter((match) => !!results[match.id] || isMatchLocked(match, new Date()));

  return FANTASY_PLAYERS.map((name) => {
    const normalized = name.toLowerCase().replace(/\s/g, '_');
    const picks = selections[normalized] ?? {};
    let total = 0;
    let matchCount = 0;

    for (const match of lockedMatches) {
      if (!picks[match.id]) {
        continue;
      }

      total += calculateScore(picks[match.id], results[match.id], playerScores[match.id] ?? {}, match.lock_time).total;
      matchCount += 1;
    }

    return { name, total, matchCount };
  }).sort((left, right) => right.total - left.total);
}

export function buildConsolidatedTable(
  matches: MatchRecord[],
  selections: SelectionMap,
  results: Record<number, MatchResult>,
  playerScores: PlayerScoresMap,
) {
  const lockedMatches = matches
    .filter((match) => !!results[match.id] || isMatchLocked(match, new Date()))
    .sort((a, b) => b.id - a.id);
  const pointsByPlayer: Record<string, Record<number, number>> = {};
  const totalPoints: Record<string, number> = {};
  const winningsByPlayer: Record<string, Record<number, number>> = {};
  const totalWinnings: Record<string, number> = {};
  const ranksByPlayer: Record<string, Record<number, number>> = {};

  for (const fantasyPlayer of FANTASY_PLAYERS) {
    pointsByPlayer[fantasyPlayer] = {};
    winningsByPlayer[fantasyPlayer] = {};
    ranksByPlayer[fantasyPlayer] = {};
    totalPoints[fantasyPlayer] = 0;
    totalWinnings[fantasyPlayer] = 0;
  }

  for (const match of lockedMatches) {
    const rows = FANTASY_PLAYERS.map((name) => {
      const normalized = name.toLowerCase().replace(/\s/g, '_');
      const total = calculateScore(selections[normalized]?.[match.id], results[match.id], playerScores[match.id] ?? {}, match.lock_time).total;
      pointsByPlayer[name][match.id] = total;
      totalPoints[name] += total;
      return { player: name, pts: total };
    }).sort((left, right) => right.pts - left.pts);

    let rank = 1;
    rows.forEach((row, index) => {
      if (index > 0 && row.pts < rows[index - 1].pts) {
        rank = index + 1;
      }
      ranksByPlayer[row.player][match.id] = rank;
    });

    const top = rows[0]?.pts ?? 0;
    if (top > 0) {
      const first = rows.filter((row) => row.pts === top);
      let second: Array<{ player: string; pts: number }> = [];
      if (first.length === 1 && rows.length > 1) {
        const next = rows[1].pts;
        if (next > 0) {
          second = rows.filter((row) => row.pts === next);
        }
      }

      if (first.length === 2) {
        const split = Number(((FIRST_PLACE_PRIZE + SECOND_PLACE_PRIZE) / first.length).toFixed(2));
        first.forEach((row) => (winningsByPlayer[row.player][match.id] = split));
      } else if (first.length > 2) {
        const split = Number(((FIRST_PLACE_PRIZE + SECOND_PLACE_PRIZE) / first.length).toFixed(2));
        first.forEach((row) => (winningsByPlayer[row.player][match.id] = split));
      } else if (first.length === 1) {
        winningsByPlayer[first[0].player][match.id] = FIRST_PLACE_PRIZE;
        if (second.length) {
          const split = Number((SECOND_PLACE_PRIZE / second.length).toFixed(2));
          second.forEach((row) => (winningsByPlayer[row.player][match.id] = split));
        }
      }
    }
  }

  for (const fantasyPlayer of FANTASY_PLAYERS) {
    totalWinnings[fantasyPlayer] = Number(
      lockedMatches.reduce((sum, match) => sum + (winningsByPlayer[fantasyPlayer][match.id] ?? 0), 0).toFixed(2),
    );
  }

  return {
    lockedMatches,
    pointsByPlayer,
    totalPoints,
    winningsByPlayer,
    totalWinnings,
    ranksByPlayer,
  };
}

export async function triggerInsightsUpdate(): Promise<unknown> {
  const response = await fetch('/api/manual-update-insights', { method: 'POST' });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Server returned ${response.status}`);
  }

  return response.json();
}

// ── Trophy System ──────────────────────────────────────────────────────────

export interface Trophy {
  id: string;
  label: string;
  desc: string;
  emoji: string;
  color: string;
  unlocked: boolean;
  detail: string;
}

export const TROPHY_DEFS: Array<Omit<Trophy, 'unlocked' | 'detail'>> = [
  { id: 'baahubali',     label: 'Baahubali',        desc: 'Overall Rank #1. Nene Raju, Nene Mantri.',                     emoji: '👑',  color: '#FFD700' },
  { id: 'thaggedhele',  label: 'Thaggedhe Le!',     desc: '4+ Match Win Streak. Unstoppable Pushpa.',                      emoji: '🪓',  color: '#ef4444' },
  { id: 'ironleg',      label: 'Iron Leg',           desc: '4+ Match Loss Streak. Daridram thandavam aaduthundi!',          emoji: '🦶',  color: '#9ca3af' },
  { id: 'akkadaspace',  label: 'Akkada Space Ledu',  desc: 'Picked a unique Horse that scored big.',                        emoji: '🧠',  color: '#8b5cf6' },
  { id: 'mindblock',    label: 'Mind Block',         desc: 'Highest single match score ever recorded.',                     emoji: '🤯',  color: '#ec4899' },
  { id: 'confusion',    label: 'Confusion Master',   desc: 'Coin flip win/loss streak. Naku em kanipistaledu.',             emoji: '🎭',  color: '#f97316' },
  { id: 'bokkaboshnam', label: 'Bokka Boshnam',      desc: 'Picked a duck batsman! Enno anukuntam...',                      emoji: '🦆',  color: '#64748b' },
  { id: 'slowpoison',   label: 'Slow Poison',        desc: 'Zero risk picks. Emito, antha hayiga undi.',                    emoji: '🐢',  color: '#10b981' },
  { id: 'lastbench',    label: 'Last Bench',         desc: 'Dead last in Leaderboard. Naku eem telidu mastaru.',            emoji: '🛡️', color: '#374151' },
  { id: 'dookudu',      label: 'Dookudu',            desc: 'Moved up 3+ ranks at once. Evadu kodithe dimma...',             emoji: '🤫',  color: '#3b82f6' },
  { id: 'sixerking',    label: 'Sixer King',         desc: 'Picked a batsman hitting >8 sixes.',                            emoji: '🏏',  color: '#f43f5e' },
  { id: 'wicketveta',   label: 'Wicket Veta',        desc: 'Picked a 4-wicket haul bowler. Naa kodaka...',                  emoji: '🎳',  color: '#0ea5e9' },
];

export function computeTrophies(
  playerName: string,
  matches: MatchRecord[],
  results: Record<number, MatchResult>,
  allSelections: SelectionMap,
  playerScores: PlayerScoresMap,
  overallRank: number,
  totalPlayers: number,
): Trophy[] {
  const unlocked: { id: string; detail: string }[] = [];
  const award = (id: string, detail: string) => {
    if (!unlocked.some((t) => t.id === id)) unlocked.push({ id, detail });
  };

  const normalized = playerName.toLowerCase().replace(/\s/g, '_');
  const userSelections = allSelections[normalized] ?? {};

  if (overallRank === 1) award('baahubali', 'Currently Top of the Leaderboard!');
  if (overallRank === totalPlayers) award('lastbench', 'Currently Dead Last... yikes.');

  const completedMatches = matches
    .filter((m) => !!results[m.id])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let winStreak = 0, lossStreak = 0, altStreak = 0;
  let lastCorrect: boolean | null = null;

  for (const m of completedMatches) {
    const result = results[m.id];
    const pick = userSelections[m.id];
    if (!pick) continue;

    const correctTeam = pick.winningTeam === result.winningTeam;
    if (correctTeam) { winStreak++; lossStreak = 0; } else { lossStreak++; winStreak = 0; }
    if (winStreak >= 4) award('thaggedhele', `Hit 4+ Win Streak by Match ${m.id}`);
    if (lossStreak >= 4) award('ironleg', `Lost 4 picks in a row by Match ${m.id}`);

    if (lastCorrect !== null && correctTeam !== lastCorrect) altStreak++;
    else altStreak = 0;
    if (altStreak >= 3) award('confusion', `Win/Loss Seesaw across 3 matches (M${m.id})`);
    lastCorrect = correctTeam;

    const score = calculateScore(pick, result, playerScores[m.id] ?? {}, m.lock_time);
    if (score.total >= 280) award('mindblock', `Scored ${score.total} Pts in Match ${m.id}`);

    if ((result.duckBatsmen ?? []).includes(pick.duckBatsman)) {
      award('bokkaboshnam', `Match ${m.id}: ${pick.duckBatsman} got out for a duck!`);
    }

    const batsmanData = (playerScores[m.id] ?? {})[pick.bestBatsman];
    if (batsmanData && (batsmanData.sixes ?? 0) > 8) {
      award('sixerking', `Match ${m.id}: ${pick.bestBatsman} (${batsmanData.sixes} Sixes!)`);
    }

    const bowlerData = (playerScores[m.id] ?? {})[pick.bestBowler];
    if (bowlerData && (bowlerData.wickets ?? 0) >= 4) {
      award('wicketveta', `Match ${m.id}: ${pick.bestBowler} (${bowlerData.wickets} Wickets!)`);
    }

    if (pick.winningHorse && result.matchTopPlayer && pick.winningHorse === result.matchTopPlayer) {
      let count = 0;
      Object.values(allSelections).forEach((playerPicks) => {
        if (playerPicks[m.id]?.winningHorse === pick.winningHorse) count++;
      });
      if (count === 1) award('akkadaspace', `Match ${m.id}: Unique pick — ${pick.winningHorse}`);
    }
  }

  // Dookudu — moved up 3+ ranks in one match
  if (completedMatches.length >= 2) {
    const lastMatch = completedMatches[completedMatches.length - 1];
    const prevTotals: Record<string, number> = {};
    const currTotals: Record<string, number> = {};
    FANTASY_PLAYERS.forEach((p) => {
      const key = p.toLowerCase().replace(/\s/g, '_');
      const picks = allSelections[key] ?? {};
      prevTotals[p] = 0;
      currTotals[p] = 0;
      completedMatches.forEach((m) => {
        const pts = calculateScore(picks[m.id], results[m.id], playerScores[m.id] ?? {}, m.lock_time).total;
        if (m.id !== lastMatch.id) prevTotals[p] += pts;
        currTotals[p] += pts;
      });
    });
    const sortedPrev = [...FANTASY_PLAYERS].sort((a, b) => prevTotals[b] - prevTotals[a]);
    const sortedCurr = [...FANTASY_PLAYERS].sort((a, b) => currTotals[b] - currTotals[a]);
    const prevRank = sortedPrev.indexOf(playerName) + 1;
    const currRank = sortedCurr.indexOf(playerName) + 1;
    if (prevRank - currRank >= 3) {
      award('dookudu', `Jumped ${prevRank - currRank} ranks at once`);
    }
  }

  // Slow Poison — earned if only 0-1 other trophies (not counting itself)
  if (unlocked.length <= 1) award('slowpoison', 'Too Safe: Minimum risk taken.');

  return TROPHY_DEFS.map((def) => ({
    ...def,
    unlocked: unlocked.some((t) => t.id === def.id),
    detail: unlocked.find((t) => t.id === def.id)?.detail ?? '',
  }));
}

