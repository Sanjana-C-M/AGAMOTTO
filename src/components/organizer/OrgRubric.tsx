import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { RubricCriterion } from '../../types';
import { Plus, Trash2, CheckCircle2, AlertTriangle, Save, RefreshCw } from 'lucide-react';

export const OrgRubric: React.FC = () => {
  const { eventConfig, updateRubric } = useApp();
  const [rubricList, setRubricList] = useState<RubricCriterion[]>(eventConfig.rubric);

  const totalWeight = rubricList.reduce((acc, curr) => acc + curr.weight, 0);
  const isValid = totalWeight === 100;

  const handleWeightChange = (index: number, val: number) => {
    const updated = [...rubricList];
    updated[index].weight = val;
    setRubricList(updated);
  };

  const handleNameChange = (index: number, val: string) => {
    const updated = [...rubricList];
    updated[index].name = val;
    setRubricList(updated);
  };

  const handleDescChange = (index: number, val: string) => {
    const updated = [...rubricList];
    updated[index].description = val;
    setRubricList(updated);
  };

  const addCriterion = () => {
    const remaining = Math.max(5, 100 - totalWeight);
    const newCrit: RubricCriterion = {
      id: `crit-${Date.now()}`,
      name: 'New Evaluation Criterion',
      description: 'Define clear expectations for judges to anchor their numeric evaluation.',
      weight: remaining,
      maxScore: 10,
      anchors: [
        { score: 2, label: 'Superficial execution' },
        { score: 6, label: 'Meets high bar requirements' },
        { score: 10, label: 'World-class breakthrough' }
      ]
    };
    setRubricList([...rubricList, newCrit]);
  };

  const removeCriterion = (id: string) => {
    if (rubricList.length <= 1) return;
    setRubricList(rubricList.filter(c => c.id !== id));
  };

  const handleSave = () => {
    if (!isValid) return;
    updateRubric(eventConfig.id, rubricList);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Rubric & Weighting Architecture
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Configure criteria definitions, percentage weightings, and descriptive score calibration anchors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded font-mono-tech text-xs font-bold flex items-center gap-1.5 ${
            isValid
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
          }`}>
            {isValid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>Sum: {totalWeight}% {isValid ? '(Valid)' : '(Must equal 100%)'}</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            disabled={!isValid}
            onClick={handleSave}
            icon={<Save className="w-3.5 h-3.5" />}
          >
            Save Rubric
          </Button>
        </div>
      </div>

      {/* Criteria Cards */}
      <div className="space-y-4">
        {rubricList.map((crit, index) => (
          <div
            key={crit.id}
            className="p-5 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14] shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <span className="w-6 h-6 rounded bg-neutral-100 dark:bg-[#15151F] font-mono-tech text-xs font-bold flex items-center justify-center text-neutral-500">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={crit.name}
                  onChange={e => handleNameChange(index, e.target.value)}
                  className="font-heading font-bold text-base text-neutral-900 dark:text-white bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A] flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-mono-tech text-xs bg-neutral-100 dark:bg-[#15151F] px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-500">Weight:</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={crit.weight}
                    onChange={e => handleWeightChange(index, parseInt(e.target.value) || 0)}
                    className="w-12 bg-transparent text-center font-bold text-neutral-900 dark:text-white focus:outline-none"
                  />
                  <span>%</span>
                </div>

                <button
                  onClick={() => removeCriterion(crit.id)}
                  disabled={rubricList.length <= 1}
                  className="text-neutral-400 hover:text-red-500 p-1 disabled:opacity-30 cursor-pointer"
                  title="Delete criterion"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-tech uppercase text-neutral-500 mb-1">
                Guideline & Evaluation Scope
              </label>
              <textarea
                value={crit.description}
                onChange={e => handleDescChange(index, e.target.value)}
                rows={2}
                className="w-full text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded p-2.5 focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
              />
            </div>

            {/* Score Calibration Anchors */}
            <div>
              <div className="text-xs font-mono-tech uppercase text-neutral-500 mb-2">
                Descriptive Scoring Calibration Anchors (Out of {crit.maxScore})
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {crit.anchors.map((anchor, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-2.5 rounded bg-neutral-50/70 dark:bg-[#12121A] border border-neutral-200 dark:border-neutral-800 text-xs"
                  >
                    <div className="font-mono-tech font-bold text-[#2F5CFF] dark:text-[#C6FF1A] mb-1">
                      Score {anchor.score} / {crit.maxScore}:
                    </div>
                    <span className="text-neutral-600 dark:text-neutral-400 leading-snug block">
                      {anchor.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={addCriterion}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add New Criterion
          </Button>

          <Button
            variant="primary"
            size="md"
            disabled={!isValid}
            onClick={handleSave}
            icon={<Save className="w-4 h-4" />}
          >
            Save All Rubric Criteria
          </Button>
        </div>
      </div>
    </div>
  );
};
