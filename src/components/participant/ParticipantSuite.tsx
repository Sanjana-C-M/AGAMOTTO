import React from 'react';
import { useApp } from '../../context/AppContext';
import { ParticipantBrowse } from './ParticipantBrowse';
import { ParticipantTeamView } from './ParticipantTeamView';
import { ParticipantSubmission } from './ParticipantSubmission';
import { ParticipantResultsView } from './ParticipantResultsView';
import {
  Compass,
  Users,
  FileCode2,
  Trophy
} from 'lucide-react';

export const ParticipantSuite: React.FC = () => {
  const { currentView, navigateTo } = useApp();

  const tabs = [
    { id: 'participant-browse', label: 'Browse & Join', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'participant-team', label: 'Team Roster', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'participant-submit', label: 'My Submission', icon: <FileCode2 className="w-3.5 h-3.5" /> },
    { id: 'participant-results', label: 'Results & Standings', icon: <Trophy className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Sub Navigation Horizontal Bar */}
      <div className="border-b border-neutral-200 dark:border-[#222436] pb-1 overflow-x-auto">
        <nav className="flex items-center gap-1 min-w-max">
          {tabs.map(item => {
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

      <main className="min-h-[600px]">
        {currentView === 'participant-browse' && <ParticipantBrowse />}
        {currentView === 'participant-team' && <ParticipantTeamView />}
        {currentView === 'participant-submit' && <ParticipantSubmission />}
        {currentView === 'participant-results' && <ParticipantResultsView />}
      </main>
    </div>
  );
};
