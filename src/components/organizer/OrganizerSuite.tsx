import React from 'react';
import { useApp } from '../../context/AppContext';
import { OrgOverview } from './OrgOverview';
import { OrgWizard } from './OrgWizard';
import { OrgProjects } from './OrgProjects';
import { OrgJudges } from './OrgJudges';
import { OrgRubric } from './OrgRubric';
import { OrgJudgingProgress } from './OrgJudgingProgress';
import { OrgIntegrityPulse } from './OrgIntegrityPulse';
import { OrgResults } from './OrgResults';
import { OrgAuditTrail } from './OrgAuditTrail';
import { OrgSettings } from './OrgSettings';
import {
  LayoutDashboard,
  Wand2,
  FolderGit2,
  Scale,
  Sliders,
  Activity,
  ShieldAlert,
  Trophy,
  History,
  Settings
} from 'lucide-react';

export const OrganizerSuite: React.FC = () => {
  const { currentView, navigateTo } = useApp();

  const navItems = [
    { id: 'org-overview', label: 'Overview', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'org-wizard', label: 'Event Wizard', icon: <Wand2 className="w-3.5 h-3.5" /> },
    { id: 'org-projects', label: 'Projects', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
    { id: 'org-judges', label: 'Judges & Assignment', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'org-rubric', label: 'Rubric Builder', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'org-judging', label: 'Judging Progress', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'org-integrity', label: 'Integrity Pulse', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'org-results', label: 'Results & Board', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'org-audit', label: 'Audit Trail', icon: <History className="w-3.5 h-3.5" /> },
    { id: 'org-settings', label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Sub Navigation Horizontal Bar */}
      <div className="border-b border-neutral-200 dark:border-[#222436] pb-1 overflow-x-auto">
        <nav className="flex items-center gap-1 min-w-max">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2F5CFF] text-white dark:bg-[#C6FF1A] dark:text-black font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#15151F]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* View Switcher Container */}
      <main className="min-h-[600px]">
        {currentView === 'org-overview' && <OrgOverview />}
        {currentView === 'org-wizard' && <OrgWizard />}
        {currentView === 'org-projects' && <OrgProjects />}
        {currentView === 'org-judges' && <OrgJudges />}
        {currentView === 'org-rubric' && <OrgRubric />}
        {currentView === 'org-judging' && <OrgJudgingProgress />}
        {currentView === 'org-integrity' && <OrgIntegrityPulse />}
        {currentView === 'org-results' && <OrgResults />}
        {currentView === 'org-audit' && <OrgAuditTrail />}
        {currentView === 'org-settings' && <OrgSettings />}
      </main>
    </div>
  );
};
