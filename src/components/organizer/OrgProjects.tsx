import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Project } from '../../types';
import {
  Search,
  Filter,
  Eye,
  Lock,
  ExternalLink,
  Github,
  CheckCircle2,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';

export const OrgProjects: React.FC = () => {
  const { projects, eventConfig, toggleIdentityReveal, judges } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [activeDetailProject, setActiveDetailProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.codeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTrack = selectedTrack === 'all' || p.track === selectedTrack;
    return matchesSearch && matchesTrack;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Submissions & Project Registry
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            {projects.length} submissions registered · Masking mode:{' '}
            <strong className="font-mono-tech text-[#2F5CFF] dark:text-[#C6FF1A]">
              {eventConfig.identityRevealed ? 'UNMASKED REAL IDENTITIES' : 'CLASSIFIED DOUBLE-BLIND'}
            </strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={eventConfig.identityRevealed ? 'accent-magenta' : 'outline'}
            size="sm"
            onClick={() => toggleIdentityReveal()}
            icon={eventConfig.identityRevealed ? <Eye className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          >
            {eventConfig.identityRevealed ? 'Mask Identities' : 'Reveal Identities'}
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by ID, codename, title, or tech stack..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
          />
        </div>

        {/* Track selector */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedTrack('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium shrink-0 transition-colors ${
              selectedTrack === 'all'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold'
                : 'bg-neutral-100 dark:bg-[#15151F] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            All Tracks ({projects.length})
          </button>
          {eventConfig.tracks.map((track: string) => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium shrink-0 transition-colors ${
                selectedTrack === track
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold'
                  : 'bg-neutral-100 dark:bg-[#15151F] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-[#15151F] border-b border-neutral-200 dark:border-[#222436] font-mono-tech text-xs uppercase text-neutral-500">
              <tr>
                <th className="py-3 px-4">Identifier / Title</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-4">Judging Coverage</th>
                <th className="py-3 px-4">Raw Avg</th>
                <th className="py-3 px-4">Normalized Score</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-[#222436]">
              {filteredProjects.map(proj => {
                const required = eventConfig.judgesPerProject;
                const completed = proj.scores.length;
                const missing = Math.max(0, required - completed);
                const isComplete = missing === 0;

                return (
                  <tr
                    key={proj.id}
                    className="hover:bg-neutral-50/70 dark:hover:bg-[#12121A] transition-colors"
                  >
                    {/* Identifier & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech text-xs font-bold text-neutral-500 dark:text-neutral-400">
                          {proj.id}
                        </span>
                        {!eventConfig.identityRevealed && (
                          <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
                            BLIND
                          </span>
                        )}
                      </div>
                      <div className="font-semibold text-neutral-900 dark:text-white mt-0.5">
                        {eventConfig.identityRevealed ? proj.title : proj.codeName}
                      </div>
                      {eventConfig.identityRevealed && (
                        <div className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                          <span>Team: {proj.teamName}</span>
                          <span>·</span>
                          <span>{proj.college}</span>
                        </div>
                      )}
                    </td>

                    {/* Track */}
                    <td className="py-3.5 px-4 font-mono-tech text-xs text-neutral-600 dark:text-neutral-400">
                      {proj.track}
                    </td>

                    {/* Judging Coverage: MUST SHOW "Required 3 / Completed 2 / Missing 1" */}
                    <td className="py-3.5 px-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono-tech font-semibold ${
                        isComplete
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      }`}>
                        {isComplete ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5" />
                        )}
                        <span>
                          Required {required} / Completed {completed} / Missing {missing}
                        </span>
                      </div>
                    </td>

                    {/* Raw Avg */}
                    <td className="py-3.5 px-4 font-mono-tech text-xs text-neutral-800 dark:text-neutral-200">
                      {proj.scores.length > 0 ? `${proj.rawAverage}/10.0` : '—'}
                    </td>

                    {/* Normalized Score */}
                    <td className="py-3.5 px-4 font-mono-tech text-xs">
                      {proj.scores.length > 0 ? (
                        <div className="font-bold text-[#2F5CFF] dark:text-[#00F0FF]">
                          {proj.normalizedScore}
                          <span className="text-[10px] text-neutral-500 ml-1">
                            ({proj.zScoreRaw > 0 ? `+${proj.zScoreRaw}` : proj.zScoreRaw}σ)
                          </span>
                        </div>
                      ) : (
                        <span className="text-neutral-400">Pending</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveDetailProject(proj)}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeDetailProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono-tech text-xs text-[#2F5CFF] dark:text-[#C6FF1A] font-bold">
                    {activeDetailProject.id}
                  </span>
                  <span className="text-xs font-mono-tech text-neutral-500">
                    {activeDetailProject.track}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
                  {eventConfig.identityRevealed
                    ? activeDetailProject.title
                    : activeDetailProject.codeName}
                </h3>
              </div>
              <button
                onClick={() => setActiveDetailProject(null)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Problem & Solution */}
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 text-xs uppercase font-mono-tech mb-1">
                  Problem Statement
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed bg-neutral-50 dark:bg-[#15151F] p-3 rounded border border-neutral-200 dark:border-neutral-800">
                  {activeDetailProject.problem}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 text-xs uppercase font-mono-tech mb-1">
                  Proposed Solution Architecture
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed bg-neutral-50 dark:bg-[#15151F] p-3 rounded border border-neutral-200 dark:border-neutral-800">
                  {activeDetailProject.solution}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 text-xs uppercase font-mono-tech mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeDetailProject.techStack.map(t => (
                  <span
                    key={t}
                    className="font-mono-tech text-xs px-2.5 py-1 rounded bg-neutral-100 dark:bg-[#15151F] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={activeDetailProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#2F5CFF] dark:text-[#C6FF1A] hover:underline"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={activeDetailProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#2F5CFF] dark:text-[#C6FF1A] hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Interactive Demo</span>
              </a>
            </div>

            {/* Submitted Judge Scores List */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 text-xs uppercase font-mono-tech mb-2">
                Evaluations Breakdown ({activeDetailProject.scores.length} of {eventConfig.judgesPerProject} received)
              </h4>
              {activeDetailProject.scores.length === 0 ? (
                <div className="text-xs text-neutral-500 py-3">No scores recorded yet.</div>
              ) : (
                <div className="space-y-2">
                  {activeDetailProject.scores.map(s => (
                    <div
                      key={s.judgeId}
                      className="p-3 rounded bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 text-xs space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {s.judgeName}
                        </span>
                        <span className="font-mono-tech font-bold text-[#2F5CFF] dark:text-[#C6FF1A]">
                          Weighted Raw: {s.totalRaw}/10.0
                        </span>
                      </div>
                      <div className="text-neutral-500 text-[11px] font-mono-tech">
                        Submitted: {s.submittedAt} · Status: {s.status.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setActiveDetailProject(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
