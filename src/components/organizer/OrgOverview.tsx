import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  ShieldAlert,
  Users,
  FolderGit2,
  Scale,
  Activity,
  ArrowRight,
  Lock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';

export const OrgOverview: React.FC = () => {
  const {
    projects,
    judges,
    activeEvent,
    navigate,
    toggleIdentityReveal,
    autoAssignJudges
  } = useApp();

  const totalAssignedSlots = projects.length * activeEvent.judgesPerProject;
  const totalCompletedReviews = projects.reduce(
    (acc, p) => acc + p.scores.filter(s => s.status === 'locked' || s.status === 'finalized').length,
    0
  );
  const completionPercentage = Math.round((totalCompletedReviews / totalAssignedSlots) * 100);

  // Check for projects with missing reviews
  const projectsNeedingReviews = projects.filter(
    p => p.scores.length < activeEvent.judgesPerProject
  );

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-tech uppercase font-bold text-[#2F5CFF] dark:text-[#C6FF1A]">
              ORGANIZER CONTROL ROOM
            </span>
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs font-mono-tech text-neutral-500">EVENT CODE: {activeEvent.eventCode}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white">
            {activeEvent.title}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {activeEvent.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/organizer/events/new')}
            icon={<Play className="w-3.5 h-3.5" />}
          >
            Launch Wizard
          </Button>

          <Button
            variant={activeEvent.identityRevealed ? 'accent-magenta' : 'primary'}
            size="sm"
            onClick={() => toggleIdentityReveal()}
            icon={activeEvent.identityRevealed ? <Eye className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          >
            {activeEvent.identityRevealed ? 'Identities Public (Unmask)' : 'Reveal Identities'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => autoAssignJudges()}
            icon={<Scale className="w-3.5 h-3.5" />}
          >
            Balance Workload
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14]">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-mono-tech uppercase font-semibold">Submissions</span>
            <FolderGit2 className="w-4 h-4 text-[#2F5CFF] dark:text-[#C6FF1A]" />
          </div>
          <div className="text-3xl font-heading font-black text-neutral-900 dark:text-white">
            {projects.length}
          </div>
          <div className="mt-2 text-xs text-neutral-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Blind-Masked</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14]">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-mono-tech uppercase font-semibold">Verified Judges</span>
            <Users className="w-4 h-4 text-[#2F5CFF] dark:text-[#C6FF1A]" />
          </div>
          <div className="text-3xl font-heading font-black text-neutral-900 dark:text-white">
            {judges.length}
          </div>
          <div className="mt-2 text-xs text-neutral-500 flex items-center gap-1.5">
            <span className="font-mono-tech text-emerald-500">0</span>
            <span>Unresolved Conflicts</span>
          </div>
        </div>

        {/* Metric 3: Judging Progress explicit counter */}
        <div className="p-5 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14]">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-mono-tech uppercase font-semibold">Review Throughput</span>
            <Activity className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div className="text-3xl font-heading font-black text-neutral-900 dark:text-white">
            {completionPercentage}%
          </div>
          <div className="mt-2 text-xs font-mono-tech text-neutral-500">
            {totalCompletedReviews} of {totalAssignedSlots} evaluations locked
          </div>
        </div>

        {/* Metric 4: Integrity Pulse */}
        <div className="p-5 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14]">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-mono-tech uppercase font-semibold">Integrity Pulse</span>
            <ShieldAlert className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-heading font-bold text-emerald-500">
            Deterministic PASS
          </div>
          <div className="mt-2 text-xs text-neutral-500">
            Z-Score normalizer active
          </div>
        </div>
      </div>

      {/* Critical Incomplete Review Alert if any project has missing judging */}
      {projectsNeedingReviews.length > 0 && (
        <div className="p-4 rounded-md border border-amber-300 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/20 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                Incomplete Evaluation Coverage Detected
              </h4>
              <p className="text-xs text-amber-800 dark:text-amber-400 mt-1">
                {projectsNeedingReviews.length} submission(s) have not yet completed the required {activeEvent.judgesPerProject} judge evaluations. Never finalize the event until all required reviews are submitted.
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono-tech">
                {projectsNeedingReviews.map(p => (
                  <span
                    key={p.id}
                    className="px-2 py-0.5 rounded bg-white dark:bg-[#12121A] border border-amber-200 dark:border-amber-800/80 font-bold"
                  >
                    {p.id}: Required {activeEvent.judgesPerProject} / Completed {p.scores.length} / Missing {activeEvent.judgesPerProject - p.scores.length}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/organizer/events/[eventId]/judging')}
            className="shrink-0 text-xs"
          >
            Review Progress
          </Button>
        </div>
      )}

      {/* Two Column Section: Quick Pipeline & Top Leaderboard Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Lifecycle Progress Tracker */}
        <div className="p-6 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Event Lifecycle Progress
            </h3>
            <span className="text-xs font-mono-tech text-neutral-400">STAGE 6 OF 10</span>
          </div>

          <div className="space-y-3 font-mono-tech text-xs">
            {[
              { name: '1. Registration Phase', status: 'Completed', date: 'Sept 20 - 24' },
              { name: '2. Team Formation & Roster Lock', status: 'Completed', date: 'Sept 25 12:00' },
              { name: '3. Submission Intake & Masking', status: 'Completed', date: 'Sept 26 18:00' },
              { name: '4. Conflict Checking Matrix', status: 'Completed', date: 'Sept 26 19:30' },
              { name: '5. Blind Double Evaluation', status: 'In Progress (94%)', active: true },
              { name: '6. Z-Score Standardization', status: 'Active Pipeline', active: true },
              { name: '7. Results & Identity Unmasking', status: activeEvent.identityRevealed ? 'Published' : 'Locked' },
              { name: '8. Archive & Audit Hash Export', status: 'Pending' }
            ].map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-2.5 rounded border ${
                  step.active
                    ? 'border-[#2F5CFF] bg-[#2F5CFF]/5 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white font-semibold'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <span>{step.name}</span>
                <span className={step.active ? 'text-[#2F5CFF] dark:text-[#C6FF1A]' : 'text-neutral-400'}>
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Real-time Leaderboard Preview */}
        <div className="p-6 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
                Leaderboard Snapshot
              </h3>
              <p className="text-xs text-neutral-500 font-mono-tech">
                {activeEvent.identityRevealed ? 'UNMASKED REAL NAMES' : 'MASKED CLASSIFIED IDS'}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/organizer/events/[eventId]/results')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Full Board
            </Button>
          </div>

          <div className="space-y-2">
            {projects.slice(0, 4).map(proj => (
              <div
                key={proj.id}
                className="flex items-center justify-between p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#12121A]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-neutral-200 dark:bg-neutral-800 font-mono-tech text-xs font-bold flex items-center justify-center text-neutral-800 dark:text-white">
                    #{proj.rank}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white block">
                      {activeEvent.identityRevealed ? proj.title : proj.codeName}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono-tech">
                      {activeEvent.identityRevealed ? proj.teamName : `TRACK: ${proj.track}`}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono-tech text-xs">
                  <div className="font-bold text-[#2F5CFF] dark:text-[#00F0FF]">
                    {proj.normalizedScore} <span className="text-[10px] text-neutral-400">NORM</span>
                  </div>
                  <div className="text-neutral-500 text-[11px]">
                    Raw: {proj.rawAverage}/10.0
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded bg-neutral-100 dark:bg-[#15151F] text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
            <span>Algorithm: Standard Normal Z-Score (Mean=80, SD=8.5)</span>
            <button
              onClick={() => navigate('/organizer/events/[eventId]/settings')}
              className="text-[#2F5CFF] dark:text-[#C6FF1A] font-semibold underline underline-offset-2 cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
