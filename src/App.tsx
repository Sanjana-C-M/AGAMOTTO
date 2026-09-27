/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Toast } from './components/common/Toast';
import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { RoleOverviewPage } from './components/roles/RoleOverviewPage';

// Organizer views
import { OrgOverview } from './components/organizer/OrgOverview';
import { OrgEventsList } from './components/organizer/OrgEventsList';
import { OrgWizard } from './components/organizer/OrgWizard';
import { OrgEventDashboard } from './components/organizer/OrgEventDashboard';
import { OrgEventEdit } from './components/organizer/OrgEventEdit';
import { OrgParticipantsQueue } from './components/organizer/OrgParticipantsQueue';
import { OrgTeamsManager } from './components/organizer/OrgTeamsManager';
import { OrgProjects } from './components/organizer/OrgProjects';
import { OrgProjectDetail } from './components/organizer/OrgProjectDetail';
import { OrgJudges } from './components/organizer/OrgJudges';
import { OrgRubric } from './components/organizer/OrgRubric';
import { OrgJudgingProgress } from './components/organizer/OrgJudgingProgress';
import { OrgIntegrityPulse } from './components/organizer/OrgIntegrityPulse';
import { OrgResults } from './components/organizer/OrgResults';
import { OrgAuditTrail } from './components/organizer/OrgAuditTrail';
import { OrgSettings } from './components/organizer/OrgSettings';

// Judge views
import { JudgeDashboardView } from './components/judge/JudgeDashboardView';
import { JudgeProjectList } from './components/judge/JudgeProjectList';
import { JudgeBlindProjectView } from './components/judge/JudgeBlindProjectView';
import { BlindEvaluationScreen } from './components/judge/BlindEvaluationScreen';

// Participant views
import { ParticipantDashboardView } from './components/participant/ParticipantDashboardView';
import { ParticipantEventsDevpost } from './components/participant/ParticipantEventsDevpost';
import { ParticipantEventDetail } from './components/participant/ParticipantEventDetail';
import { ParticipantTeamManager } from './components/participant/ParticipantTeamManager';
import { ParticipantSubmission } from './components/participant/ParticipantSubmission';
import { ParticipantResultsView } from './components/participant/ParticipantResultsView';

import {
  Users,
  FolderGit2,
  Scale,
  ShieldCheck,
  Activity,
  Sliders,
  Trophy,
  History,
  Settings,
  Edit3,
  LayoutDashboard
} from 'lucide-react';

const OrganizerSubNav: React.FC = () => {
  const { currentPath, navigate, activeEventId } = useApp();

  const navLinks = [
    { label: 'Event Hub', path: '/organizer/events/[eventId]', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { label: 'Participants', path: '/organizer/events/[eventId]/participants', icon: <Users className="w-3.5 h-3.5" /> },
    { label: 'Teams', path: '/organizer/events/[eventId]/teams', icon: <Users className="w-3.5 h-3.5" /> },
    { label: 'Projects', path: '/organizer/events/[eventId]/projects', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
    { label: 'Judges', path: '/organizer/events/[eventId]/judges', icon: <Scale className="w-3.5 h-3.5" /> },
    { label: 'Assignments', path: '/organizer/events/[eventId]/assignments', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { label: 'Rubric', path: '/organizer/events/[eventId]/rubric', icon: <Sliders className="w-3.5 h-3.5" /> },
    { label: 'Judging Progress', path: '/organizer/events/[eventId]/judging', icon: <Activity className="w-3.5 h-3.5" /> },
    { label: 'Integrity Pulse', path: '/organizer/events/[eventId]/integrity', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { label: 'Results', path: '/organizer/events/[eventId]/results', icon: <Trophy className="w-3.5 h-3.5" /> },
    { label: 'Audit Log', path: '/organizer/events/[eventId]/audit', icon: <History className="w-3.5 h-3.5" /> },
    { label: 'Settings', path: '/organizer/events/[eventId]/settings', icon: <Settings className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="border-b border-neutral-200 dark:border-[#141420] pb-2 mb-6 overflow-x-auto">
      <nav className="flex items-center gap-1 min-w-max font-mono-tech text-xs">
        {navLinks.map(link => {
          const isActive = currentPath === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path, { eventId: activeEventId })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#2F5CFF] text-white dark:bg-[#C6FF1A] dark:text-[#020204] font-bold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#0E0F1A]'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

const MainRouter: React.FC = () => {
  const { currentPath, activeRole, isDarkMode, navigate, logout } = useApp();

  const isEventSubPage = currentPath.startsWith('/organizer/events/[eventId]') && activeRole === 'organizer';

  // Strict role isolation guard: If user is in one role, prevent viewing other roles' routes
  const isParticipantRestricted =
    activeRole === 'participant' &&
    (currentPath.startsWith('/organizer') || currentPath.startsWith('/judge'));

  const isJudgeRestricted =
    activeRole === 'judge' &&
    (currentPath.startsWith('/organizer') || currentPath.startsWith('/participant'));

  const isOrganizerRestricted =
    activeRole === 'organizer' &&
    (currentPath.startsWith('/judge') || currentPath.startsWith('/participant'));

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-[#020204] text-neutral-900 dark:text-[#F5F5F5] transition-colors ${isDarkMode ? 'dark' : ''}`}>
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role isolation guard banner */}
        {(isParticipantRestricted || isJudgeRestricted || isOrganizerRestricted) && (
          <div className="mb-8 p-6 rounded-[6px] border border-amber-300 dark:border-amber-700/50 bg-amber-50 dark:bg-[#0D0B05] text-amber-900 dark:text-amber-200">
            <h3 className="font-heading font-bold text-lg mb-1">
              Portal Isolation Active
            </h3>
            <p className="text-sm font-sans mb-4">
              You are currently signed in under the <strong className="capitalize">{activeRole} Portal</strong>. The requested route belongs to another portal. Other portals are isolated from this session.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (activeRole === 'participant') navigate('/participant/events');
                  else if (activeRole === 'judge') navigate('/judge/dashboard');
                  else navigate('/organizer');
                }}
                className="px-4 py-2 rounded-[6px] bg-[#00F0FF] text-black dark:bg-[#C6FF1A] dark:text-[#020204] font-semibold text-xs font-mono-tech cursor-pointer"
              >
                Return to My {activeRole.toUpperCase()} Dashboard
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-[6px] border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#151520] text-xs font-mono-tech cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        )}

        {!isParticipantRestricted && !isJudgeRestricted && !isOrganizerRestricted && (
          <>
            {/* Organizer Event Sub-Navigation Bar if on an event-specific page */}
            {isEventSubPage && <OrganizerSubNav />}

            {/* 1. Shared / Public Routes */}
            {currentPath === '/' && <LandingPage />}
            {currentPath === '/roles/participant' && <RoleOverviewPage role="participant" />}
            {currentPath === '/roles/judge' && <RoleOverviewPage role="judge" />}
            {currentPath === '/roles/organizer' && <RoleOverviewPage role="organizer" />}
            {currentPath === '/signin' && <AuthPage initialMode="signin" />}
            {currentPath === '/signup' && <AuthPage initialMode="signup" />}

            {/* 2. Organizer Suite Routes */}
            {currentPath === '/organizer' && <OrgOverview />}
            {currentPath === '/organizer/events' && <OrgEventsList />}
            {currentPath === '/organizer/events/new' && <OrgWizard />}
            {currentPath === '/organizer/events/[eventId]' && <OrgEventDashboard />}
            {currentPath === '/organizer/events/[eventId]/edit' && <OrgEventEdit />}
            {currentPath === '/organizer/events/[eventId]/participants' && <OrgParticipantsQueue />}
            {currentPath === '/organizer/events/[eventId]/teams' && <OrgTeamsManager />}
            {currentPath === '/organizer/events/[eventId]/projects' && <OrgProjects />}
            {currentPath === '/organizer/events/[eventId]/projects/[projectId]' && <OrgProjectDetail />}
            {currentPath === '/organizer/events/[eventId]/judges' && <OrgJudges />}
            {currentPath === '/organizer/events/[eventId]/assignments' && <OrgJudges />}
            {currentPath === '/organizer/events/[eventId]/rubric' && <OrgRubric />}
            {currentPath === '/organizer/events/[eventId]/judging' && <OrgJudgingProgress />}
            {currentPath === '/organizer/events/[eventId]/integrity' && <OrgIntegrityPulse />}
            {currentPath === '/organizer/events/[eventId]/results' && <OrgResults />}
            {currentPath === '/organizer/events/[eventId]/audit' && <OrgAuditTrail />}
            {currentPath === '/organizer/events/[eventId]/settings' && <OrgSettings />}

            {/* 3. Judge Suite Routes */}
            {currentPath === '/judge/dashboard' && <JudgeDashboardView />}
            {currentPath === '/judge/projects' && <JudgeProjectList />}
            {currentPath === '/judge/projects/[projectId]' && <JudgeBlindProjectView />}
            {currentPath === '/judge/reviews/[reviewId]' && <BlindEvaluationScreen />}

            {/* 4. Participant Suite Routes */}
            {currentPath === '/participant/dashboard' && <ParticipantDashboardView />}
            {currentPath === '/participant/events' && <ParticipantEventsDevpost />}
            {currentPath === '/participant/events/[eventId]' && <ParticipantEventDetail />}
            {currentPath === '/participant/events/[eventId]/team' && <ParticipantTeamManager />}
            {currentPath === '/participant/events/[eventId]/submit' && <ParticipantSubmission />}
            {currentPath === '/participant/events/[eventId]/submission' && <ParticipantSubmission />}
            {currentPath === '/participant/events/[eventId]/results' && <ParticipantResultsView />}
          </>
        )}
      </main>

      {/* Persistent Clean Footer */}
      <footer className="border-t border-neutral-200 dark:border-[#141420] bg-white dark:bg-[#020204] py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="font-heading font-black text-neutral-900 dark:text-white tracking-widest text-sm">
              AGAMOTTO
            </span>
          </div>

          <div className="text-neutral-400">
            © 2026 AGAMOTTO. Standardized Z-Score Normalization.
          </div>
        </div>
      </footer>

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
