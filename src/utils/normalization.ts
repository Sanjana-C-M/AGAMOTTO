import { Project, Judge } from '../types';

export interface JudgeStats {
  judgeId: string;
  judgeName: string;
  mean: number;
  stdDev: number;
  count: number;
}

export function calculateJudgeStats(projects: Project[], judges: Judge[]): Record<string, JudgeStats> {
  const scoresByJudge: Record<string, number[]> = {};

  judges.forEach(j => {
    scoresByJudge[j.id] = [];
  });

  projects.forEach(p => {
    p.scores.forEach(s => {
      if (!scoresByJudge[s.judgeId]) {
        scoresByJudge[s.judgeId] = [];
      }
      scoresByJudge[s.judgeId].push(s.totalRaw);
    });
  });

  const stats: Record<string, JudgeStats> = {};

  judges.forEach(j => {
    const list = scoresByJudge[j.id] || [];
    const count = list.length;
    if (count === 0) {
      stats[j.id] = { judgeId: j.id, judgeName: j.name, mean: 8.0, stdDev: 1.0, count: 0 };
      return;
    }

    const sum = list.reduce((a, b) => a + b, 0);
    const mean = sum / count;

    const varianceSum = list.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
    const variance = count > 1 ? varianceSum / (count - 1) : 0.64;
    const stdDev = Math.max(Math.sqrt(variance), 0.25); // avoid division by zero or extreme outliers

    stats[j.id] = {
      judgeId: j.id,
      judgeName: j.name,
      mean: Number(mean.toFixed(2)),
      stdDev: Number(stdDev.toFixed(2)),
      count
    };
  });

  return stats;
}

export function recalculateAllScores(
  projects: Project[],
  judges: Judge[],
  method: 'z_score' | 'trimmed_mean' | 'borda' = 'z_score'
): Project[] {
  const judgeStats = calculateJudgeStats(projects, judges);

  const updatedProjects = projects.map(proj => {
    if (proj.scores.length === 0) {
      return {
        ...proj,
        rawAverage: 0,
        normalizedScore: 0,
        zScoreRaw: 0
      };
    }

    // 1. Raw Average
    const rawSum = proj.scores.reduce((acc, curr) => acc + curr.totalRaw, 0);
    const rawAverage = Number((rawSum / proj.scores.length).toFixed(2));

    let zScoreRaw = 0;
    let normalizedScore = 0;

    if (method === 'z_score') {
      const zScores = proj.scores.map(s => {
        const stats = judgeStats[s.judgeId];
        if (!stats || stats.stdDev === 0) return 0;
        return (s.totalRaw - stats.mean) / stats.stdDev;
      });

      const avgZ = zScores.reduce((a, b) => a + b, 0) / zScores.length;
      zScoreRaw = Number(avgZ.toFixed(2));

      // Map Z-Score (-2.5 to +2.5) into a clean 0-100 index: center at 80, 1 std dev = +8 pts
      const mapped = 80 + zScoreRaw * 8.5;
      normalizedScore = Number(Math.min(99.9, Math.max(40, mapped)).toFixed(1));
    } else if (method === 'trimmed_mean') {
      // Trim min and max if >= 3 scores
      const sorted = [...proj.scores.map(s => s.totalRaw)].sort((a, b) => a - b);
      if (sorted.length >= 3) {
        sorted.pop();
        sorted.shift();
      }
      const trimmedAvg = sorted.reduce((a, b) => a + b, 0) / sorted.length;
      normalizedScore = Number((trimmedAvg * 10).toFixed(1));
      zScoreRaw = Number(((trimmedAvg - 7.5) / 1.2).toFixed(2));
    } else {
      // Borda approximation
      normalizedScore = Number((rawAverage * 9.8).toFixed(1));
      zScoreRaw = Number(((rawAverage - 7.5) / 1.0).toFixed(2));
    }

    return {
      ...proj,
      rawAverage,
      normalizedScore,
      zScoreRaw
    };
  });

  // Sort descending by normalized score and assign ranks
  updatedProjects.sort((a, b) => b.normalizedScore - a.normalizedScore);
  return updatedProjects.map((p, idx) => ({
    ...p,
    rank: idx + 1
  }));
}
