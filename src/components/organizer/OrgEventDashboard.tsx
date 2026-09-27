import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Users,
  FolderGit2,
  Scale,
  ShieldCheck,
  Activity,
  ArrowRight,
  Eye,
  Lock,
  Edit3,
  Sliders,
  FileCheck2,
  Trophy,
  History,
  Settings,
  AlertTriangle
} from 'lucide-react';

export const OrgEventDashboard: React.FC = () => {
  const {
    activeEvent,
    projects,
    judges,
    participants,
    teams,
    navigate,
    toggleIdentityReveal,
    autoAssignJudges
  } = useApp();

  const eventProjects = projects.filter(p => p.eventId === activeEvent.id);
  const totalSlots = eventProjects.length * activeEvent.judgesPerProject;
  const totalCompleted = eventProjects.reduce(
    (acc, p) => acc + p.scores.filter(s => s.status === 'locked' || s.status === 'finalized').length,
    0
  );
  const completionPercentage = totalSlots > 0 ? Math.round((totalCompleted / totalSlots) * 100) : 0;

  const incompleteProjects = eventProjects.filter(p => p.scores.length < activeEvent.judgesPerProject);

  const subPages = [
    { title: 'Participants & Approval', desc: `${participants.length} registered applicants`, path: '/organizer/events/[eventId]/participants', icon: <Users className="w-5 h-5 text-[#00F0FF]" /> },
    { title: 'Team Roster Registry', desc: `${teams.length} registered squads`, path: '/organizer/events/[eventId]/teams', icon: <Users className="w-5 h-5 text-emerald-400" /> },
    { title: 'Submissions & Projects', desc: `${eventProjects.length} projects filed`, path: '/organizer/events/[eventId]/projects', icon: <FolderGit2 className="w-5 h-5 text-[#C6FF1A]" /> },
    { title: 'Judges Roster', desc: `${judges.length} verified panel evaluators`, path: '/organizer/events/[eventId]/judges', icon: <Scale className="w-5 h-5 text-amber-400" /> },
    { title: 'Conflict-Aware Assignments', desc: 'Manual & auto workload balancing', path: '/organizer/events/[eventId]/assignments', icon: <ShieldCheck className="w-5 h-5 text-[#2F5CFF]" /> },
    { title: 'Rubric & Tie-Breakers', desc: `${activeEvent.rubric.length} weighted criteria`, path: '/organizer/events/[eventId]/rubric', icon: <Sliders className="w-5 h-5 text-[#FF2ED1]" /> },
    { title: 'Judging Throughput', desc: `${completionPercentage}% total evaluations sealed`, path: '/organizer/events/[eventId]/judging', icon: <Activity className="w-5 h-5 text-[#00F0FF]" /> },
    { title: 'Deterministic Integrity Pulse', desc: '0 active conflict bypasses', path: '/organizer/events/[eventId]/integrity', icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
    { title: 'Official Results & Reveal', desc: 'Leaderboard & identity unmasking', path: '/organizer/events/[eventId]/results', icon: <Trophy className="w-5 h-5 text-amber-500" /> },
    { title: 'Chronological Audit Ledger', desc: 'Immutable cryptographically signed logs', path: '/organizer/events/[eventId]/audit', icon: <History className="w-5 h-5 text-neutral-400" /> },
    { title: 'Event Configuration & Settings', desc: 'Lifecycle phases, rules & danger zone', path: '/organizer/events/[eventId]/settings', icon: <Settings className="w-5 h-5 text-neutral-400" /> },
    { title: 'Edit Event Specification', desc: 'Modify dates, policy & visibility', path: '/organizer/events/[eventId]/edit', icon: <Edit3 className="w-5 h-5 text-neutral-400" /> }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#08080E] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono-tech text-xs">
            <span className="text-[#2F5CFF] dark:text-[#C6FF1A] font-bold uppercase">
              SINGLE EVENT COMMAND CENTER
            </span>
            <span>·</span>
            <span className="text-neutral-500">EVENT CODE: {activeEvent.eventCode}</span>
            <span>·</span>
            <span className="text-emerald-500 uppercase font-semibold">PHASE: {activeEvent.status}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-black text-neutral-900 dark:text-white">
            {activeEvent.title}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            {activeEvent.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/organizer/events/[eventId]/edit')}
            icon={<Edit3 className="w-3.5 h-3.5" />}
          >
            Edit Event
          </Button>

          <Button
            variant={activeEvent.identityRevealed ? 'accent-magenta' : 'primary'}
            size="sm"
            onClick={() => toggleIdentityReveal(activeEvent.id)}
            icon={activeEvent.identityRevealed ? <Eye className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          >
            {activeEvent.identityRevealed ? 'Identities Public' : 'Reveal Identities'}
          </Button>

          <Button
            variant="accent-cyan"
            size="sm"
            onClick={() => autoAssignJudges(activeEvent.id)}
            icon={<Scale className="w-3.5 h-3.5" />}
          >
            Auto-Balance Judges
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0A0A10]">
          <span className="text-[11px] font-mono-tech uppercase text-neutral-500 block">Participants</span>
          <div className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mt-1">
            {participants.length}
          </div>
          <span className="text-xs text-neutral-400 font-mono-tech">Across {teams.length} teams</span>
        </div>

        <div className="p-4 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0A0A10]">
          <span className="text-[11px] font-mono-tech uppercase text-neutral-500 block">Projects Submitted</span>
          <div className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mt-1">
            {eventProjects.length}
          </div>
          <span className="text-xs text-neutral-400 font-mono-tech">100% Blind-Masked</span>
        </div>

        <div className="p-4 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0A0A10]">
          <span className="text-[11px] font-mono-tech uppercase text-neutral-500 block">Review Progress</span>
          <div className="text-2xl font-heading font-bold text-[#00F0FF] mt-1">
            {completionPercentage}%
          </div>
          <span className="text-xs text-neutral-400 font-mono-tech">{totalCompleted} of {totalSlots} completed</span>
        </div>

        <div className="p-4 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0A0A10]">
          <span className="text-[11px] font-mono-tech uppercase text-neutral-500 block">Integrity State</span>
          <div className="text-2xl font-heading font-bold text-emerald-500 mt-1">
            Deterministic PASS
          </div>
          <span className="text-xs text-neutral-400 font-mono-tech">Z-Score pipeline active</span>
        </div>
      </div>

      {/* Critical Incomplete Review Alert */}
      {incompleteProjects.length > 0 && (
        <div className="p-4 rounded-md border border-amber-300 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/20 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                Incomplete Evaluation Coverage Detected
              </h4>
              <p className="text-xs text-amber-800 dark:text-amber-400 mt-1">
                {incompleteProjects.length} submission(s) require additional judge reviews before final normalization seal:
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono-tech">
                {incompleteProjects.map(p => (
                  <span
                    key={p.id}
                    className="px-2 py-0.5 rounded bg-white dark:bg-[#0A0A10] border border-amber-300 dark:border-amber-800 font-bold"
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
            Review Quotas
          </Button>
        </div>
      )}

      {/* Grid of Sub-Page Links per user specification */}
      <div>
        <h3 className="text-lg font-heading font-bold text-neutral-900 dark:text-white mb-4">
          Event Management Sub-Pages
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subPages.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="p-5 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#0A0A10] hover:border-[#2F5CFF] dark:hover:border-[#00F0FF] text-left transition-all group cursor-pointer shadow-xs"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded bg-neutral-100 dark:bg-[#12121E]">
                  {item.icon}
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#2F5CFF] dark:group-hover:text-[#00F0FF] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-heading font-bold text-base text-neutral-900 dark:text-white group-hover:text-[#2F5CFF] dark:group-hover:text-[#00F0FF] transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
