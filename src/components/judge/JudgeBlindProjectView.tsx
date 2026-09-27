import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { ArrowLeft, Lock, Github, ExternalLink, FileText, ArrowRight } from 'lucide-react';

export const JudgeBlindProjectView: React.FC = () => {
  const { projects, activeProjectId, navigate } = useApp();
  const project = projects.find(p => p.id === activeProjectId) || projects[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/judge/projects')}
          className="flex items-center gap-1.5 text-xs font-mono-tech text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Assigned Queue</span>
        </button>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/judge/reviews/[reviewId]', { reviewId: project.id })}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Proceed to Scoring & Rubric
        </Button>
      </div>

      <div className="p-4 rounded-md border border-neutral-200 dark:border-[#222436] bg-neutral-50 dark:bg-[#08080E] flex items-center gap-2 text-xs font-mono-tech text-neutral-700 dark:text-neutral-300">
        <Lock className="w-4 h-4 text-[#00F0FF] shrink-0" />
        <span>
          DOUBLE-BLIND PROTOCOL: Project identity and collegiate branding withheld. Showing technical deliverables only.
        </span>
      </div>

      <div className="p-6 sm:p-8 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] shadow-sm space-y-6">
        <div>
          <span className="font-mono-tech text-xs font-bold text-neutral-500 block mb-1">
            {project.id} · TRACK: {project.track}
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-neutral-900 dark:text-white">
            {project.codeName}
          </h2>
          <p className="text-sm text-neutral-500 mt-1 italic">
            "{project.tagline}"
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-mono-tech text-xs uppercase font-bold text-neutral-400 mb-1">
              01 / The Problem
            </h4>
            <div className="p-4 rounded bg-neutral-50 dark:bg-[#12121E] text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed border border-neutral-200 dark:border-neutral-800">
              {project.problem}
            </div>
          </div>

          <div>
            <h4 className="font-mono-tech text-xs uppercase font-bold text-neutral-400 mb-1">
              02 / The Solution
            </h4>
            <div className="p-4 rounded bg-neutral-50 dark:bg-[#12121E] text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed border border-neutral-200 dark:border-neutral-800">
              {project.solution}
            </div>
          </div>

          <div>
            <h4 className="font-mono-tech text-xs uppercase font-bold text-neutral-400 mb-2">
              03 / Implemented Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(t => (
                <span key={t} className="font-mono-tech text-xs px-2.5 py-1 rounded bg-neutral-100 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-4 text-xs font-mono-tech">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#2F5CFF] dark:text-[#00F0FF] hover:underline font-bold">
            <Github className="w-4 h-4" />
            <span>Open Source Git Repository</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#2F5CFF] dark:text-[#00F0FF] hover:underline font-bold">
            <ExternalLink className="w-4 h-4" />
            <span>Live Sandbox Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
};
