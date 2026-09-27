import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Trophy,
  Eye,
  Lock,
  Download,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BarChart2
} from 'lucide-react';

export const OrgResults: React.FC = () => {
  const {
    projects,
    eventConfig,
    toggleIdentityReveal,
    recalculateScores,
    setToast
  } = useApp();

  const handleExportCsv = () => {
    const headers = ['Rank', 'Project ID', 'Project Title', 'Team Name', 'College', 'Track', 'Raw Score Avg', 'Normalized Score', 'Z-Deviation'];
    const rows = projects.map(p => [
      p.rank,
      p.id,
      eventConfig.identityRevealed ? `"${p.title}"` : `"${p.codeName}"`,
      eventConfig.identityRevealed ? `"${p.teamName}"` : '"MASKED"',
      eventConfig.identityRevealed ? `"${p.college}"` : '"MASKED"',
      `"${p.track}"`,
      p.rawAverage,
      p.normalizedScore,
      p.zScoreRaw
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AGAMOTTO_LEADERBOARD_${eventConfig.identityRevealed ? 'UNMASKED' : 'CLASSIFIED'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast('Leaderboard exported to CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Header & Reveal Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-tech uppercase font-bold text-[#00F0FF] dark:text-[#C6FF1A]">
              OFFICIAL LEADERBOARD & RESULTS
            </span>
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs font-mono-tech text-neutral-500">
              ALGO: {eventConfig.normalizationMethod.toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            {eventConfig.identityRevealed ? 'Public Unmasked Leaderboard' : 'Pre-Publish Blind Standings'}
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            {eventConfig.identityRevealed
              ? 'Identities unmasked! All project titles, team members, and university affiliations are visible.'
              : 'Double-blind shield active. Pre-publish identity shown as classified codename.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>

          {/* Reveal Identities Button */}
          <Button
            variant={eventConfig.identityRevealed ? 'accent-magenta' : 'primary'}
            size="md"
            onClick={() => toggleIdentityReveal()}
            icon={eventConfig.identityRevealed ? <Lock className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          >
            {eventConfig.identityRevealed ? 'Revert to Classified Codenames' : 'Reveal Identities (Publish)'}
          </Button>
        </div>
      </div>

      {/* Leaderboard Table showing Raw Score AND Normalized Score AND Rank Side by Side */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-[#15151F] border-b border-neutral-200 dark:border-[#222436] font-mono-tech text-xs uppercase text-neutral-500">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Project Entity</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4">Judging Coverage</th>
                <th className="py-3.5 px-4 font-bold text-neutral-700 dark:text-neutral-300">
                  Raw Score
                </th>
                <th className="py-3.5 px-4 font-bold text-[#2F5CFF] dark:text-[#00F0FF]">
                  Normalized Score
                </th>
                <th className="py-3.5 px-4 font-mono-tech text-right">Z-Deviation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-[#222436]">
              {projects.map(proj => {
                const required = eventConfig.judgesPerProject;
                const completed = proj.scores.length;
                const isComplete = completed >= required;
                const isTop3 = proj.rank <= 3;

                return (
                  <tr
                    key={proj.id}
                    className={`hover:bg-neutral-50/70 dark:hover:bg-[#12121A] transition-colors ${
                      isTop3 ? 'bg-amber-500/[0.02] dark:bg-amber-500/[0.03]' : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-4 px-4 text-center">
                      <div className={`w-8 h-8 rounded-md font-mono-tech font-bold text-sm mx-auto flex items-center justify-center ${
                        proj.rank === 1
                          ? 'bg-amber-400 text-black shadow-sm'
                          : proj.rank === 2
                          ? 'bg-slate-300 text-neutral-900 shadow-sm'
                          : proj.rank === 3
                          ? 'bg-amber-700/80 text-white shadow-sm'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}>
                        #{proj.rank}
                      </div>
                    </td>

                    {/* Project Entity: Shows PRE-PUBLISH "PROJECT #024 — CLASSIFIED" or REAL NAME POST-PUBLISH */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech text-xs font-bold text-neutral-400">
                          {proj.id}
                        </span>
                        {!eventConfig.identityRevealed && (
                          <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-bold uppercase">
                            CLASSIFIED
                          </span>
                        )}
                      </div>

                      <div className="font-heading font-bold text-base text-neutral-900 dark:text-white mt-0.5">
                        {eventConfig.identityRevealed ? proj.title : proj.codeName}
                      </div>

                      {eventConfig.identityRevealed ? (
                        <div className="text-xs text-neutral-500 flex items-center gap-2 mt-1">
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                            Team: {proj.teamName}
                          </span>
                          <span>·</span>
                          <span>{proj.college}</span>
                        </div>
                      ) : (
                        <div className="text-xs font-mono-tech text-neutral-400 mt-1">
                          Identity locked behind double-blind shield
                        </div>
                      )}
                    </td>

                    {/* Track */}
                    <td className="py-4 px-4 font-mono-tech text-xs text-neutral-600 dark:text-neutral-400">
                      {proj.track}
                    </td>

                    {/* Explicit Coverage: "Required 3 / Completed 2 / Missing 1" */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 font-mono-tech text-xs px-2 py-0.5 rounded font-semibold ${
                        isComplete
                          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                          : 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
                      }`}>
                        {isComplete ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        )}
                        Required {required} / Completed {completed} / Missing {Math.max(0, required - completed)}
                      </span>
                    </td>

                    {/* RAW SCORE */}
                    <td className="py-4 px-4 font-mono-tech text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      {proj.rawAverage.toFixed(2)} / 10.0
                    </td>

                    {/* NORMALIZED SCORE */}
                    <td className="py-4 px-4 font-mono-tech text-sm font-bold text-[#2F5CFF] dark:text-[#00F0FF]">
                      {proj.normalizedScore.toFixed(1)}
                      <span className="text-[10px] text-neutral-400 ml-1">/ 100</span>
                    </td>

                    {/* Z-Deviation */}
                    <td className="py-4 px-4 font-mono-tech text-xs text-right">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        proj.zScoreRaw >= 1.0
                          ? 'bg-[#C6FF1A]/20 text-emerald-800 dark:text-[#C6FF1A]'
                          : proj.zScoreRaw >= 0
                          ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        {proj.zScoreRaw > 0 ? `+${proj.zScoreRaw}` : proj.zScoreRaw}σ
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Normalization Explanation Card */}
      <div className="p-5 rounded-md border border-neutral-200 dark:border-[#222436] bg-neutral-50 dark:bg-[#0E0E14] text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
        <div className="font-mono-tech font-bold uppercase text-neutral-900 dark:text-white">
          Why Normalized Score Differs From Raw Score:
        </div>
        <p className="leading-relaxed">
          The <strong>Raw Score</strong> is the unadjusted weighted average of numbers entered by judges. The <strong>Normalized Score</strong> accounts for the individual statistical curve of each assigned judge. A 8.5 awarded by a strict judge who rarely gives above 7.0 carries a higher standard deviation weight (+σ) than a 9.0 awarded by a lenient judge whose median score is 9.2. This ensures competitive fairness across disparate evaluation panels.
        </p>
      </div>
    </div>
  );
};
