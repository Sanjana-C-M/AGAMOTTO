import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Users,
  FileCode2,
  Clock,
  History,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const OrgProjectDetail: React.FC = () => {
  const { projects, activeProjectId, activeEvent, navigate } = useApp();

  const project = projects.find(p => p.id === activeProjectId) || projects[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <button
          onClick={() => navigate('/organizer/events/[eventId]/projects', { eventId: activeEvent.id })}
          className="flex items-center gap-1.5 text-xs font-mono-tech text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Projects Grid</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="font-mono-tech text-xs font-bold text-neutral-500">
            {project.id}
          </span>
          <span className="text-xs font-mono-tech text-neutral-400">·</span>
          <span className="text-xs font-mono-tech text-[#00F0FF] uppercase">
            ORGANIZER UNMASKED VIEW
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-black text-neutral-900 dark:text-white mt-1">
          {project.title}
        </h2>
        <p className="text-sm text-neutral-500 mt-1 italic">
          "{project.tagline}"
        </p>
      </div>

      {/* Team Roster & College (REAL IDENTITY VISIBLE FOR ORGANIZER) */}
      <div className="p-5 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono-tech uppercase font-bold text-neutral-400">
            Competitor Entity & Institution (Organizer Clearance)
          </span>
          <span className="font-mono-tech text-xs text-emerald-500 font-bold">
            STATUS: {project.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <span className="text-xs text-neutral-500 block">Team Squad:</span>
            <span className="font-heading font-bold text-base text-neutral-900 dark:text-white">
              {project.teamName}
            </span>
          </div>

          <div>
            <span className="text-xs text-neutral-500 block">Affiliated Universities:</span>
            <span className="font-medium text-sm text-neutral-800 dark:text-neutral-200">
              {project.college}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <span className="text-[11px] font-mono-tech uppercase font-bold text-neutral-400 block mb-2">
            Team Members:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {project.members.map((m, idx) => (
              <div key={idx} className="p-2.5 rounded bg-neutral-50 dark:bg-[#12121E] text-xs">
                <div className="font-semibold text-neutral-900 dark:text-white">{m.name}</div>
                <div className="text-[11px] text-neutral-500 font-mono-tech">{m.role}</div>
                <div className="text-[10px] text-neutral-400">{m.college}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Problem & Solution */}
      <div className="p-6 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] shadow-sm space-y-4">
        <div>
          <h4 className="font-mono-tech text-xs uppercase font-bold text-neutral-500 mb-1">
            Problem Statement
          </h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-[#12121E] p-3 rounded">
            {project.problem}
          </p>
        </div>

        <div>
          <h4 className="font-mono-tech text-xs uppercase font-bold text-neutral-500 mb-1">
            Technical Solution & Key Innovations
          </h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-[#12121E] p-3 rounded">
            {project.solution}
          </p>
        </div>

        <div>
          <h4 className="font-mono-tech text-xs uppercase font-bold text-neutral-500 mb-2">
            Tech Stack Tags
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map(t => (
              <span key={t} className="font-mono-tech text-xs px-2.5 py-1 rounded bg-neutral-100 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 font-mono-tech text-xs">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#2F5CFF] dark:text-[#00F0FF] hover:underline">
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#2F5CFF] dark:text-[#00F0FF] hover:underline">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Demo Benchmark</span>
          </a>
        </div>
      </div>

      {/* Submission Version History per user spec */}
      <div className="p-6 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <History className="w-4 h-4 text-[#00F0FF]" />
            <span>Submission Version History</span>
          </h4>
          <span className="text-xs font-mono-tech text-neutral-500">
            {project.versions?.length || 1} Revisions Logged
          </span>
        </div>

        <div className="space-y-2">
          {(project.versions || [
            { version: 1, timestamp: project.submittedAt, summary: 'Initial submission of codebase and whitepaper', editedBy: project.members[0]?.name }
          ]).map((ver, vIdx) => (
            <div key={vIdx} className="p-3 rounded bg-neutral-50 dark:bg-[#12121E] text-xs flex items-center justify-between font-mono-tech">
              <div>
                <span className="font-bold text-[#2F5CFF] dark:text-[#C6FF1A] mr-2">
                  v{ver.version}.0
                </span>
                <span className="text-neutral-700 dark:text-neutral-300 font-sans">
                  {ver.summary}
                </span>
              </div>
              <div className="text-neutral-500 text-[11px]">
                {ver.timestamp} by {ver.editedBy}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Judges & Evaluations */}
      <div className="p-6 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] shadow-sm space-y-4">
        <h4 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Evaluations & Raw Scoring Breakdown
        </h4>

        <div className="space-y-3">
          {project.scores.map(s => (
            <div key={s.judgeId} className="p-4 rounded bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 text-xs space-y-2">
              <div className="flex justify-between items-center font-mono-tech">
                <span className="font-bold text-neutral-900 dark:text-white">
                  {s.judgeName} ({s.judgeId})
                </span>
                <span className="font-bold text-[#2F5CFF] dark:text-[#00F0FF]">
                  Weighted Raw: {s.totalRaw}/10.0
                </span>
              </div>
              <div className="space-y-1 text-neutral-600 dark:text-neutral-400">
                {Object.entries(s.justifications).map(([critId, comment]) => (
                  <div key={critId}>
                    <strong className="font-mono-tech uppercase text-[10px] text-neutral-700 dark:text-neutral-300">
                      {critId.replace('crit-', '')}:
                    </strong>{' '}
                    <span>{comment}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
