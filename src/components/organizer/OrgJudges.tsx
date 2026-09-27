import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Judge, Project } from '../../types';
import {
  Users,
  ShieldAlert,
  Scale,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  X,
  UserCheck
} from 'lucide-react';

export const OrgJudges: React.FC = () => {
  const {
    judges,
    projects,
    eventConfig,
    assignJudge,
    removeJudge,
    autoAssignJudges
  } = useApp();

  const [selectedProjectForAssign, setSelectedProjectForAssign] = useState<string>('PRJ-019');
  const [conflictModalInfo, setConflictModalInfo] = useState<{
    judgeName: string;
    projectId: string;
    reason: string;
  } | null>(null);

  const handleManualAssign = (projectId: string, judgeId: string) => {
    const judge = judges.find(j => j.id === judgeId);
    const result = assignJudge(projectId, judgeId);
    if (!result.success && result.reason) {
      setConflictModalInfo({
        judgeName: judge?.name || 'Judge',
        projectId,
        reason: result.reason // e.g. "Judge is a team member"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Judges & Conflict-Aware Assignment Matrix
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Manage judge workload and enforce deterministic conflict fencing across all submissions.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => autoAssignJudges()}
          icon={<Scale className="w-4 h-4" />}
        >
          Auto-Balance Workload (Conflict-Safe)
        </Button>
      </div>

      {/* Verified Judges Roster */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
            Active Judge Panel ({judges.length} Verified)
          </h3>
          <span className="text-xs font-mono-tech text-neutral-400">TARGET: {eventConfig.judgesPerProject} REVIEWS / PROJECT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {judges.map(judge => (
            <div
              key={judge.id}
              className="p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#15151F] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-neutral-900 dark:text-white">
                      {judge.name}
                    </h4>
                    <p className="text-xs text-neutral-500 font-mono-tech">
                      {judge.title}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-bold">
                    {judge.id}
                  </span>
                </div>

                <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                  <div><strong>Affiliation:</strong> {judge.affiliation}</div>
                  <div><strong>Track:</strong> {judge.track}</div>
                  <div className="font-mono-tech">
                    <strong>Workload:</strong> {judge.completedCount} completed / {judge.assignedCount} assigned
                  </div>
                </div>
              </div>

              {/* Conflict Tags */}
              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800/80">
                <span className="text-[10px] font-mono-tech uppercase font-bold text-neutral-400 block mb-1">
                  Fenced Conflicts ({judge.conflicts.length}):
                </span>
                {judge.conflicts.length === 0 ? (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> None detected
                  </span>
                ) : (
                  <div className="space-y-1">
                    {judge.conflicts.map(c => (
                      <div
                        key={c.projectId}
                        className="text-[11px] font-mono-tech p-1.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                      >
                        <strong>{c.projectId}:</strong> {c.reason}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Assignment Matrix by Project */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Assignment & Conflict Testing Matrix
            </h3>
            <p className="text-xs text-neutral-500">
              Try assigning any judge to a project. If a conflict exists (e.g., Dr. Thorne on PRJ-019), the system will actively reject the assignment with the explicit reason.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map(project => {
            const assignedJudgeObjs = judges.filter(j => project.assignedJudges.includes(j.id));
            const availableJudges = judges.filter(j => !project.assignedJudges.includes(j.id));

            return (
              <div
                key={project.id}
                className="p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-[#12121A] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-xs font-bold text-neutral-500">
                      {project.id}
                    </span>
                    <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                      {project.codeName}
                    </span>
                    <span className="text-xs font-mono-tech text-neutral-400">
                      ({project.track})
                    </span>
                  </div>

                  <div className="text-xs font-mono-tech text-neutral-500">
                    Assigned: {project.assignedJudges.length} / Required {eventConfig.judgesPerProject}
                  </div>
                </div>

                {/* Assigned Judges Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {assignedJudgeObjs.map(j => {
                    const hasScored = project.scores.some(s => s.judgeId === j.id);
                    return (
                      <div
                        key={j.id}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white dark:bg-[#1A1A24] border border-neutral-200 dark:border-neutral-700 text-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-[#2F5CFF] dark:text-[#C6FF1A]" />
                        <span className="font-medium text-neutral-900 dark:text-white">{j.name}</span>
                        {hasScored && (
                          <span className="text-[10px] font-mono-tech text-emerald-500 font-bold">
                            [SCORED]
                          </span>
                        )}
                        <button
                          onClick={() => removeJudge(project.id, j.id)}
                          className="text-neutral-400 hover:text-red-500 ml-1 cursor-pointer"
                          title="Remove assignment"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}

                  {/* Quick Add Dropdown */}
                  {availableJudges.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <select
                        onChange={e => {
                          if (e.target.value) {
                            handleManualAssign(project.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        defaultValue=""
                        className="text-xs px-2.5 py-1 rounded border border-dashed border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-600 dark:text-neutral-300 cursor-pointer focus:outline-none"
                      >
                        <option value="" disabled>+ Assign Judge...</option>
                        {availableJudges.map(j => {
                          const conflict = j.conflicts.find(c => c.projectId === project.id);
                          return (
                            <option key={j.id} value={j.id}>
                              {j.name} {conflict ? '⚠️ [CONFLICT]' : ''}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conflict Alert Modal (Displays explicit conflict rejection reason) */}
      {conflictModalInfo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E0E14] border border-red-500/40 rounded-md max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-mono-tech text-xs uppercase font-bold text-red-600 dark:text-red-400">
                  ASSIGNMENT BLOCKED
                </div>
                <h3 className="text-lg font-heading font-bold text-neutral-900 dark:text-white mt-0.5">
                  Conflict of Interest Detected
                </h3>
              </div>
              <button
                onClick={() => setConflictModalInfo(null)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Cannot assign <strong>{conflictModalInfo.judgeName}</strong> to evaluate{' '}
              <strong>{conflictModalInfo.projectId}</strong> due to an institutional conflict rule.
            </p>

            <div className="p-3 rounded bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 font-mono-tech text-xs text-red-800 dark:text-red-300">
              <strong>REASON:</strong> "{conflictModalInfo.reason}"
            </div>

            <p className="text-xs text-neutral-500">
              This rejection has been logged into the immutable audit trail for compliance verification.
            </p>

            <div className="pt-2 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setConflictModalInfo(null)}
              >
                Acknowledge & Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
