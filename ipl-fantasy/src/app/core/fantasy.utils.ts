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

export function getMatchStatus(
  match: MatchRecord,
  now: Date,
  results: Record<number, MatchResult>,
  userSelections: Record<number, SelectionRecord>,
): 'completed' | 'locked' | 'submitted' | 'open' {
  if (results[match.id]) {
    return 'completed';
  }

  if (now >= new Date(match.lock_time)) {
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
): ScoreBreakdown {
  if (!selection) {
    return { breakdown: {}, total: 0 };
  }

  const scoreForBatsman = (name: string) => playerScores[name]?.batsman_score ?? 0;
  const scoreForBowler = (name: string) => playerScores[name]?.bowler_score ?? 0;
  const scoreForDotBall = (name: string) => playerScores[name]?.dot_ball_score ?? 0;

  const currentResult = result ?? ({} as MatchResult);
  const breakdown: Record<string, number | string> = {
    winningTeam:
      selection.winningTeam === currentResult.winningTeam
        ? 50 + Math.round((currentResult.runMargin || 0) / (((currentResult.wicketMargin || 1) || 1) * 5))
        : 0,
    bestBatsman:
      scoreForBatsman(selection.bestBatsman) +
      (selection.bestBatsman === currentResult.topScorer ? (currentResult.topScorerRuns || 0) + 50 : 0),
    bestBowler:
      scoreForBowler(selection.bestBowler) +
      (selection.bestBowler === currentResult.bestBowler ? (currentResult.bestBowlerPoints || 0) + 50 : 0),
    powerplayWinner:
      selection.powerplayWinner === currentResult.powerplayWinner
        ? (currentResult.powerplayScore || 0) + (currentResult.powerplayDiff || 0)
        : 0,
    dotBallBowler:
      scoreForDotBall(selection.dotBallBowler) +
      (selection.dotBallBowler === currentResult.dotBallLeader ? 50 + (currentResult.dotBalls || 0) * 5 : 0),
    totalWickets:
      selection.totalWickets === currentResult.wicketsRange ? (currentResult.totalWickets || 0) * 5 : 0,
    duckBatsman: (currentResult.duckBatsmen || []).includes(selection.duckBatsman) ? 100 : 0,
    winningHorse:
      selection.winningHorse && currentResult.matchTopPlayer && selection.winningHorse === currentResult.matchTopPlayer ? 100 : 0,
    losingHorse:
      selection.losingHorse && currentResult.matchBottomPlayer && selection.losingHorse === currentResult.matchBottomPlayer ? 100 : 0,
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
): Array<{ name: string; total: number; breakdown: Record<string, number | string> }> {
  return FANTASY_PLAYERS.map((name) => {
    const normalized = name.toLowerCase().replace(/\s/g, '_');
    const selection = selections[normalized]?.[matchId];
    if (!selection) {
      return null;
    }

    const calculated = calculateScore(selection, results[matchId], playerScores[matchId] ?? {});
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
  const lockedMatches = matches.filter((match) => new Date() >= new Date(match.lock_time));

  return FANTASY_PLAYERS.map((name) => {
    const normalized = name.toLowerCase().replace(/\s/g, '_');
    const picks = selections[normalized] ?? {};
    let total = 0;
    let matchCount = 0;

    for (const match of lockedMatches) {
      if (!picks[match.id]) {
        continue;
      }

      total += calculateScore(picks[match.id], results[match.id], playerScores[match.id] ?? {}).total;
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
  const lockedMatches = matches.filter((match) => new Date() >= new Date(match.lock_time));
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
      const total = calculateScore(selections[normalized]?.[match.id], results[match.id], playerScores[match.id] ?? {}).total;
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
        first.forEach((row) => (winningsByPlayer[row.player][match.id] = 18.5));
      } else if (first.length > 2) {
        const split = Number((37 / first.length).toFixed(2));
        first.forEach((row) => (winningsByPlayer[row.player][match.id] = split));
      } else if (first.length === 1) {
        winningsByPlayer[first[0].player][match.id] = 25;
        if (second.length) {
          const split = Number((12 / second.length).toFixed(2));
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
