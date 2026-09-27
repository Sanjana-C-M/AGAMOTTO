import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Scale,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export const JudgeDashboardView: React.FC = () => {
  const {
    currentUser,
    currentJudgeId,
    judges,
    projects,
    activeEvent,
    navigate
  } = useApp();

  const currentJudge = judges.find(j => j.id === currentJudgeId) || judges[0];
  const assignedProjects = projects.filter(p => p.assignedJudges.includes(currentJudge.id));

  const draftCount = assignedProjects.filter(p => {
    const s = p.scores.find(sc => sc.judgeId === currentJudge.id);
    return s && s.status === 'draft';
  }).length;

  const finalizedCount = assignedProjects.filter(p => {
    const s = p.scores.find(sc => sc.judgeId === currentJudge.id);
    return s && s.status === 'finalized';
  }).length;

  const lockedCount = assignedProjects.filter(p => {
    const s = p.scores.find(sc => sc.judgeId === currentJudge.id);
    return s && s.status === 'locked';
  }).length;

  const pendingCount = assignedProjects.length - (draftCount + finalizedCount + lockedCount);

  // Check if any review was reopened by organizer
  const reopenedReviews = assignedProjects.filter(p => {
    const s = p.scores.find(sc => sc.judgeId === currentJudge.id);
    return s?.isReopened;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#08080E] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-neutral-900 dark:text-white">
            Evaluation Quota & Status Overview
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            All reviews operate under strict double-blind isolation. Names and collegiate affiliations remain masked.
          </p>
        </div>

        {/* Deadline Reminder per user spec */}
        <div className="flex items-center gap-3 p-3.5 rounded-md bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 font-mono-tech text-xs">
          <Calendar className="w-4 h-4 text-[#00F0FF]" />
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase">JUDGING DEADLINE REMINDER</span>
            <span className="font-bold text-neutral-900 dark:text-white">
              {activeEvent.judgingDeadline || 'Oct 01, 2026 23:59 UTC'}
            </span>
          </div>
        </div>
      </div>

      {/* Reopened Banner Notice if any review reopened by organizer per spec */}
      {reopenedReviews.length > 0 && (
        <div className="p-4 rounded-md border border-amber-300 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-300 flex items-center justify-between gap-4 font-mono-tech">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <span className="font-bold block uppercase">ACTION REQUIRED: Evaluation Reopened by Organizer</span>
              <span className="text-amber-800 dark:text-amber-400">
                Organizer unlocked review for {reopenedReviews[0].id} for justification clarification.
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/judge/reviews/[reviewId]', { reviewId: reopenedReviews[0].id })}
            className="text-xs shrink-0"
          >
            Review Audit Event
          </Button>
        </div>
      )}

      {/* Metrics Row: Assigned count, Draft, Finalized, Locked */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0A0A10]">
          <span className="text-[11px] font-mono-tech uppercase text-neutral-500 block">Total Assigned</span>
          <div className="text-3xl font-heading font-black text-neutral-900 dark:text-white mt-1">
            {assignedProjects.length}
          </div>
          <span className="text-xs text-neutral-400 font-mono-tech">In active event</span>
        </div>

        <div className="p-5 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0A0A10]">
          <span className="text-[11px] font-mono-tech uppercase text-neutral-500 block">Draft Reviews</span>
          <div className="text-3xl font-heading font-black text-amber-500 mt-1">
            {draftCount}
          </div>
          <span className="text-xs text-neutral-400 font-mono-tech">Saved in progress</span>
        </div>

        <div className="p-5 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0A0A10]">
          <span className="text-[11px] font-mono-tech uppercase text-neutral-500 block">Finalized</span>
          <div className="text-3xl font-heading font-black text-[#00F0FF] mt-1">
            {finalizedCount}
          </div>
          <span className="text-xs text-neutral-400 font-mono-tech">Awaiting lock</span>
        </div>

        <div className="p-5 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0A0A10]">
          <span className="text-[11px] font-mono-tech uppercase text-neutral-500 block">Locked & Sealed</span>
          <div className="text-3xl font-heading font-black text-emerald-500 mt-1">
            {lockedCount}
          </div>
          <span className="text-xs text-neutral-400 font-mono-tech">Cryptographically logged</span>
        </div>
      </div>

      {/* Quick Launch Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white">
              Assigned Submissions Queue
            </h3>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/judge/projects')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Open Assigned Projects List
          </Button>
        </div>

        <div className="p-6 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white">
              Resume Active Evaluation
            </h3>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/judge/reviews/[reviewId]', { reviewId: assignedProjects[0]?.id || 'PRJ-024' })}
            icon={<Lock className="w-4 h-4" />}
          >
            Evaluate Next Project ({assignedProjects[0]?.id || 'PRJ-024'})
          </Button>
        </div>
      </div>
    </div>
  );
};
