import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { ArrowLeft, Save, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const OrgEventEdit: React.FC = () => {
  const { activeEvent, updateEvent, navigate, setToast } = useApp();

  const [title, setTitle] = useState(activeEvent.title);
  const [tagline, setTagline] = useState(activeEvent.tagline);
  const [description, setDescription] = useState(activeEvent.description || '');
  const [eventCode, setEventCode] = useState(activeEvent.eventCode);
  const [prizes, setPrizes] = useState(activeEvent.prizes || '$50,000 USD');
  const [status, setStatus] = useState(activeEvent.status);
  const [minTeamSize, setMinTeamSize] = useState(activeEvent.minTeamSize || 2);
  const [maxTeamSize, setMaxTeamSize] = useState(activeEvent.maxTeamSize || 4);
  const [judgesPerProject, setJudgesPerProject] = useState(activeEvent.judgesPerProject || 3);
  const [editingPolicy, setEditingPolicy] = useState(activeEvent.editingPolicy || 'allow-until-deadline');
  const [versioningEnabled, setVersioningEnabled] = useState(activeEvent.versioningEnabled ?? true);

  const isJudgingActive = activeEvent.status === 'judging' || activeEvent.status === 'results';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent(activeEvent.id, {
      title,
      tagline,
      description,
      eventCode: eventCode.toUpperCase(),
      prizes,
      status,
      minTeamSize: Number(minTeamSize),
      maxTeamSize: Number(maxTeamSize),
      judgesPerProject: Number(judgesPerProject),
      editingPolicy,
      versioningEnabled
    });
    setToast('Event parameters successfully updated.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/organizer/events/[eventId]', { eventId: activeEvent.id })}
            className="flex items-center gap-1.5 text-xs font-mono-tech text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Event Dashboard</span>
          </button>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Edit Event Parameters: {activeEvent.title}
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Modify event specification. Policy changes are logged into the immutable audit trail.
          </p>
        </div>
      </div>

      {isJudgingActive && (
        <div className="p-4 rounded-md border border-amber-300 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-400 flex items-center gap-2 font-mono-tech">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            POLICY NOTICE: Competition is currently in {activeEvent.status.toUpperCase()} phase. Rubric weightings and blind masking policies are locked to protect tournament integrity.
          </span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white dark:bg-[#08080E] border border-neutral-200 dark:border-[#1A1A28] rounded-md p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Headline Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Event Description & Rules
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Access Pass Code
              </label>
              <input
                type="text"
                required
                value={eventCode}
                onChange={e => setEventCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 text-sm font-mono-tech uppercase bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Prize Pool Display
              </label>
              <input
                type="text"
                value={prizes}
                onChange={e => setPrizes(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Min Team Size
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={minTeamSize}
                onChange={e => setMinTeamSize(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Max Team Size
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={maxTeamSize}
                onChange={e => setMaxTeamSize(parseInt(e.target.value) || 4)}
                className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Judges Per Submission
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={judgesPerProject}
                onChange={e => setJudgesPerProject(parseInt(e.target.value) || 3)}
                className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => navigate('/organizer/events/[eventId]', { eventId: activeEvent.id })}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={<Save className="w-4 h-4" />}
          >
            Save Configuration Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
