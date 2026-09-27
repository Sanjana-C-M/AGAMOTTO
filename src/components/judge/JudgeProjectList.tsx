import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Scale,
  Lock,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const JudgeProjectList: React.FC = () => {
  const {
    projects,
    judges,
    currentJudgeId,
    setCurrentJudgeId,
    navigate
  } = useApp();

  const currentJudge = judges.find(j => j.id === currentJudgeId) || judges[0];

  const assignedProjects = projects.filter(p =>
    p.assignedJudges.includes(currentJudge.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#08080E] shadow-sm">
        <div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Assigned Submissions ({assignedProjects.length})
          </h2>
        </div>

        {/* Evaluator Selector */}
        <div className="flex items-center gap-2 font-mono-tech text-xs bg-neutral-50 dark:bg-[#12121E] p-2 rounded-md border border-neutral-200 dark:border-neutral-800">
          <span className="text-neutral-500">Evaluator:</span>
          <select
            value={currentJudge.id}
            onChange={e => setCurrentJudgeId(e.target.value)}
            className="bg-transparent font-semibold text-neutral-900 dark:text-white focus:outline-none cursor-pointer"
          >
            {judges.map(j => (
              <option key={j.id} value={j.id} className="dark:bg-[#0A0A10]">
                {j.name} ({j.title})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Anonymized Cards per user spec */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignedProjects.map(proj => {
          const myScore = proj.scores.find(s => s.judgeId === currentJudge.id);
          const status = myScore ? myScore.status : 'pending';

          return (
            <div
              key={proj.id}
              className="p-5 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] flex flex-col justify-between hover:border-[#2F5CFF] dark:hover:border-[#00F0FF] transition-all space-y-4 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-xs font-bold text-neutral-400">
                      {proj.id}
                    </span>
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold uppercase">
                      BLIND
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono-tech px-2.5 py-0.5 rounded font-bold uppercase ${
                    status === 'locked'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : status === 'finalized'
                      ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30'
                      : status === 'draft'
                      ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                      : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                  }`}>
                    {status}
                  </span>
                </div>

                {/* SHOWS ONLY ANONYMIZED CODENAME */}
                <h3 className="text-lg font-heading font-bold text-neutral-900 dark:text-white">
                  {proj.codeName}
                </h3>

                <p className="text-xs text-neutral-500 font-mono-tech">
                  Category: <strong>{proj.track}</strong>
                </p>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {proj.problem}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map(t => (
                    <span
                      key={t}
                      className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#12121E] text-neutral-600 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <span className="text-xs font-mono-tech text-neutral-400">
                  {myScore ? `Score: ${myScore.totalRaw}/10.0` : 'Not yet evaluated'}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/judge/projects/[projectId]', { projectId: proj.id })}
                    className="text-xs"
                  >
                    Inspect
                  </Button>

                  <Button
                    variant={status === 'locked' ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => navigate('/judge/reviews/[reviewId]', { reviewId: proj.id })}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    {status === 'locked' ? 'View Review' : 'Score Project'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
