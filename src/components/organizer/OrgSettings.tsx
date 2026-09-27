import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Sliders, Save, Archive, Shield, RefreshCw } from 'lucide-react';

export const OrgSettings: React.FC = () => {
  const { eventConfig, recalculateScores, setToast } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'z_score' | 'trimmed_mean' | 'borda'>(eventConfig.normalizationMethod);
  const [judgesPerProj, setJudgesPerProj] = useState(eventConfig.judgesPerProject);

  const handleSaveSettings = () => {
    recalculateScores(selectedMethod);
    setToast('Event parameters and normalization algorithm successfully updated.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
          Competition Settings & Engine Configuration
        </h2>
        <p className="text-sm text-neutral-500 mt-0.5">
          Tune the algorithmic normalization mechanics and governing lifecycle states.
        </p>
      </div>

      {/* Normalization Algorithm Section */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Scoring Normalization Engine
        </h3>
        <p className="text-xs text-neutral-500">
          Select which statistical model standardizes raw scores into the final leaderboard index.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setSelectedMethod('z_score')}
            className={`p-4 rounded-md border text-left transition-all ${
              selectedMethod === 'z_score'
                ? 'border-[#2F5CFF] bg-[#2F5CFF]/5 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <div className="font-mono-tech text-xs font-bold uppercase mb-1">Standard Z-Score</div>
            <p className="text-xs text-neutral-500 leading-snug">
              Standardizes variance based on each judge’s distribution. Highest statistical fairness.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('trimmed_mean')}
            className={`p-4 rounded-md border text-left transition-all ${
              selectedMethod === 'trimmed_mean'
                ? 'border-[#2F5CFF] bg-[#2F5CFF]/5 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <div className="font-mono-tech text-xs font-bold uppercase mb-1">Olympic Trimmed Mean</div>
            <p className="text-xs text-neutral-500 leading-snug">
              Discards the highest and lowest outlying score per submission.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('borda')}
            className={`p-4 rounded-md border text-left transition-all ${
              selectedMethod === 'borda'
                ? 'border-[#2F5CFF] bg-[#2F5CFF]/5 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <div className="font-mono-tech text-xs font-bold uppercase mb-1">Borda Ranking</div>
            <p className="text-xs text-neutral-500 leading-snug">
              Positional scoring calculated across each judge’s assigned batch.
            </p>
          </button>
        </div>
      </div>

      {/* Lifecycle Phase Controller */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Event Lifecycle State
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {['registration', 'submission', 'judging', 'results', 'archived'].map(phase => (
            <button
              key={phase}
              className={`p-2.5 rounded-md font-mono-tech text-xs font-bold uppercase border transition-colors ${
                eventConfig.status === phase
                  ? 'border-[#2F5CFF] bg-[#2F5CFF] text-white dark:border-[#C6FF1A] dark:bg-[#C6FF1A] dark:text-black'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="md"
          onClick={handleSaveSettings}
          icon={<Save className="w-4 h-4" />}
        >
          Save & Apply Configuration
        </Button>
      </div>
    </div>
  );
};
