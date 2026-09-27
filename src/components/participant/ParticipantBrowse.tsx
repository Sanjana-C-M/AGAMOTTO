import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Calendar,
  Lock,
  ArrowRight,
  ShieldCheck,
  Search,
  Key,
  CheckCircle2,
  Users
} from 'lucide-react';

export const ParticipantBrowse: React.FC = () => {
  const { eventConfig, joinEventWithCode, navigateTo, setToast } = useApp();
  const [eventCodeInput, setEventCodeInput] = useState('');
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventCodeInput.trim()) return;
    const ok = joinEventWithCode(eventCodeInput);
    if (ok) {
      setHasJoined(true);
      setTimeout(() => {
        navigateTo('participant-submit');
      }, 700);
    } else {
      setToast('Invalid event code. Please verify and retry.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
          Competition Portal & Event Discovery
        </h2>
        <p className="text-sm text-neutral-500 mt-0.5">
          Browse public invitation hackathons or enter a confidential private access token.
        </p>
      </div>

      {/* Private Event Code Card */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-md bg-[#2F5CFF]/10 dark:bg-[#C6FF1A]/10 text-[#2F5CFF] dark:text-[#C6FF1A] flex items-center justify-center shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Join Private / Institutional Event
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5 mb-4">
              Enter the event code provided by your hackathon director to unlock team registration and submissions.
            </p>

            <form onSubmit={handleJoinByCode} className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <input
                type="text"
                value={eventCodeInput}
                onChange={e => setEventCodeInput(e.target.value.toUpperCase())}
                placeholder={`Try: ${eventConfig.eventCode}`}
                className="flex-1 px-3 py-2 text-sm font-mono-tech uppercase bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Unlock Event
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Public Event Listing */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Featured Competitions
        </h3>

        <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                {eventConfig.status}
              </span>
              <span className="text-xs font-mono-tech text-neutral-400">
                CODE: {eventConfig.eventCode}
              </span>
            </div>

            <h4 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
              {eventConfig.title}
            </h4>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {eventConfig.tagline}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {eventConfig.tracks.map((t: string) => (
                <span
                  key={t}
                  className="font-mono-tech text-xs px-2.5 py-1 rounded bg-neutral-100 dark:bg-[#15151F] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigateTo('participant-submit')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Enter Submissions
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigateTo('participant-team')}
              icon={<Users className="w-4 h-4" />}
            >
              Manage Team Roster
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
