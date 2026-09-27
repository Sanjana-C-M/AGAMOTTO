import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Scale,
  Send,
  UserCheck
} from 'lucide-react';

export const OrgJudgingProgress: React.FC = () => {
  const { projects, judges, eventConfig, setToast } = useApp();

  const requiredPerProject = eventConfig.judgesPerProject;
  const totalSlots = projects.length * requiredPerProject;
  const totalFinished = projects.reduce(
    (acc, p) => acc + p.scores.filter(s => s.status === 'locked' || s.status === 'finalized').length,
    0
  );
  const overallPercentage = Math.round((totalFinished / totalSlots) * 100);

  const handleSendReminder = (judgeName: string) => {
    setToast(`Automated reminder notification sent to ${judgeName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Judging Progress & Live Throughput
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Real-time tracking of review quotas, judge turnaround times, and missing evaluations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="font-mono-tech text-xs text-neutral-500">
            Overall Completion: <strong className="text-neutral-900 dark:text-[#00F0FF]">{totalFinished} / {totalSlots} ({overallPercentage}%)</strong>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="p-6 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14] shadow-sm space-y-3">
        <div className="flex justify-between text-xs font-mono-tech">
          <span className="font-bold text-neutral-900 dark:text-white">
            COMPETITION-WIDE EVALUATION COVERAGE
          </span>
          <span className="font-bold text-[#2F5CFF] dark:text-[#C6FF1A]">
            {overallPercentage}% COMPLETE
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2F5CFF] to-[#00F0FF] dark:from-[#C6FF1A] dark:to-[#00F0FF] transition-all duration-500"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* Project-by-Project Coverage: MUST EXPLICITLY SHOW "Required 3 / Completed 2 / Missing 1" */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
            Per-Submission Review Quota Status
          </h3>
          <span className="text-xs font-mono-tech text-neutral-400">
            EXPLICIT COVERAGE ENFORCEMENT
          </span>
        </div>

        <div className="space-y-3">
          {projects.map(project => {
            const completed = project.scores.filter(s => s.status === 'locked' || s.status === 'finalized').length;
            const missing = Math.max(0, requiredPerProject - completed);
            const isFullyGraded = missing === 0;

            return (
              <div
                key={project.id}
                className="p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#12121A] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-xs font-bold text-neutral-500">
                      {project.id}
                    </span>
                    <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                      {eventConfig.identityRevealed ? project.title : project.codeName}
                    </span>
                    <span className="text-xs font-mono-tech text-neutral-400">
                      · {project.track}
                    </span>
                  </div>

                  {/* Explicit Requirement Label */}
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono-tech font-bold ${
                        isFullyGraded
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {isFullyGraded ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      <span>
                        Required {requiredPerProject} / Completed {completed} / Missing {missing}
                      </span>
                    </div>

                    {!isFullyGraded && (
                      <span className="text-xs text-neutral-500 font-mono-tech">
                        Waiting on 1 evaluation before normalization seal
                      </span>
                    )}
                  </div>
                </div>

                {/* Judge progress badges for this project */}
                <div className="flex flex-wrap items-center gap-2">
                  {project.assignedJudges.map(jId => {
                    const judge = judges.find(j => j.id === jId);
                    const score = project.scores.find(s => s.judgeId === jId);
                    const hasScored = !!score;

                    return (
                      <div
                        key={jId}
                        className={`text-xs font-mono-tech px-2.5 py-1 rounded border flex items-center gap-1.5 ${
                          hasScored
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-850'
                            : 'bg-neutral-100 text-neutral-600 border-neutral-300 dark:bg-[#1A1A26] dark:text-neutral-400 dark:border-neutral-700'
                        }`}
                      >
                        <UserCheck className="w-3 h-3" />
                        <span>{judge ? judge.name.split(' ')[1] : jId}:</span>
                        <strong className="uppercase">
                          {hasScored ? `${score.totalRaw}/10` : 'Pending'}
                        </strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Judge Workload & Turnaround Times */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm">
        <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white mb-4">
          Individual Judge Completion Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {judges.map(judge => {
            const isDone = judge.completedCount >= judge.assignedCount;
            return (
              <div
                key={judge.id}
                className="p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#15151F] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                      {judge.name}
                    </span>
                    <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded font-bold ${
                      isDone
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {isDone ? 'COMPLETE' : 'IN PROGRESS'}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-mono-tech">
                    <div>Assigned: {judge.assignedCount} submissions</div>
                    <div>Completed: {judge.completedCount} evaluations</div>
                    <div>Scoring Bias: {judge.scoringBias > 0 ? `+${judge.scoringBias} (Lenient)` : `${judge.scoringBias} (Strict)`}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    {judge.assignedCount - judge.completedCount} remaining
                  </span>
                  {!isDone && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendReminder(judge.name)}
                      icon={<Send className="w-3 h-3" />}
                      className="text-xs py-1 px-2.5"
                    >
                      Remind
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
