import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { RubricCriterion } from '../../types';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Shield,
  Layers,
  Users,
  FileText,
  Sliders,
  Scale,
  Rocket,
  Plus,
  Trash2
} from 'lucide-react';

export const OrgWizard: React.FC = () => {
  const { createEvent, navigateTo } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Wizard state across all 7 steps
  // 1. Basics
  const [title, setTitle] = useState('CyberShield Global Hackathon 2026');
  const [tagline, setTagline] = useState('Next-Generation Systems Security & Cryptographic Hardware');
  const [eventCode, setEventCode] = useState('SHIELD-2026');
  const [trackInput, setTrackInput] = useState('Hardware Security, Zero-Knowledge Proofs, Autonomous Defense');

  // 2. Registration
  const [regStartDate, setRegStartDate] = useState('2026-10-01');
  const [regEndDate, setRegEndDate] = useState('2026-10-20');
  const [maxParticipants, setMaxParticipants] = useState('500');

  // 3. Teams
  const [minTeamSize, setMinTeamSize] = useState('2');
  const [maxTeamSize, setMaxTeamSize] = useState('4');
  const [allowCrossInstitution, setAllowCrossInstitution] = useState(true);

  // 4. Submission
  const [requireGithub, setRequireGithub] = useState(true);
  const [requireDemo, setRequireDemo] = useState(true);
  const [requirePdf, setRequirePdf] = useState(true);

  // 5. Rubric
  const [wizardRubric, setWizardRubric] = useState<RubricCriterion[]>([
    {
      id: 'c1',
      name: 'Cryptographic Novelty',
      description: 'Originality of mathematics and resistance to known side-channel vectors.',
      weight: 35,
      maxScore: 10,
      anchors: [
        { score: 2, label: 'Standard wrapper' },
        { score: 6, label: 'Solid applied crypto' },
        { score: 10, label: 'Novel cryptographic primitive' }
      ]
    },
    {
      id: 'c2',
      name: 'Implementation Soundness',
      description: 'Zero memory vulnerabilities, high throughput, and unit test coverage.',
      weight: 35,
      maxScore: 10,
      anchors: [
        { score: 2, label: 'Unstable' },
        { score: 6, label: 'Passing happy path' },
        { score: 10, label: 'Production-grade crate' }
      ]
    },
    {
      id: 'c3',
      name: 'Practical Impact',
      description: 'Measurable vulnerability reduction in deployed ecosystems.',
      weight: 30,
      maxScore: 10,
      anchors: [
        { score: 2, label: 'Negligible demand' },
        { score: 6, label: 'Clear utility' },
        { score: 10, label: 'Universal utility' }
      ]
    }
  ]);

  // 6. Judging
  const [judgesPerProject, setJudgesPerProject] = useState<number>(3);
  const [enableDoubleBlind, setEnableDoubleBlind] = useState<boolean>(true);
  const [normalizationAlgo, setNormalizationAlgo] = useState<'z_score' | 'trimmed_mean' | 'borda'>('z_score');

  const totalWeight = wizardRubric.reduce((acc, c) => acc + c.weight, 0);

  const steps = [
    { num: 1, name: 'Basics', icon: <Layers className="w-4 h-4" /> },
    { num: 2, name: 'Registration', icon: <Users className="w-4 h-4" /> },
    { num: 3, name: 'Teams', icon: <Shield className="w-4 h-4" /> },
    { num: 4, name: 'Submission', icon: <FileText className="w-4 h-4" /> },
    { num: 5, name: 'Rubric', icon: <Sliders className="w-4 h-4" /> },
    { num: 6, name: 'Judging', icon: <Scale className="w-4 h-4" /> },
    { num: 7, name: 'Review & Launch', icon: <Rocket className="w-4 h-4" /> }
  ];

  const handleLaunch = () => {
    createEvent({
      title,
      tagline,
      eventCode: eventCode.toUpperCase(),
      tracks: trackInput.split(',').map(s => s.trim()).filter(Boolean),
      judgesPerProject,
      normalizationMethod: normalizationAlgo,
      identityRevealed: false,
      status: 'registration',
      rubric: wizardRubric
    });
  };

  const addRubricCriterion = () => {
    const nextWeight = Math.max(5, 100 - totalWeight);
    setWizardRubric([
      ...wizardRubric,
      {
        id: `crit-${Date.now()}`,
        name: 'New Custom Criterion',
        description: 'Describe grading rationale and standard indicators.',
        weight: nextWeight,
        maxScore: 10,
        anchors: [
          { score: 2, label: 'Substandard' },
          { score: 6, label: 'Competent' },
          { score: 10, label: 'Exemplary' }
        ]
      }
    ]);
  };

  const removeRubricCriterion = (id: string) => {
    if (wizardRubric.length <= 1) return;
    setWizardRubric(wizardRubric.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigateTo('org-overview')}
            className="flex items-center gap-1.5 text-xs font-mono-tech text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white">
            Event Creation Wizard
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Configure all parameters for your competition lifecycle from intake to blinded scoring.
          </p>
        </div>
      </div>

      {/* Progress Step Bar */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] gap-2">
          {steps.map(step => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-mono-tech transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-[#2F5CFF] text-white dark:bg-[#C6FF1A] dark:text-black font-bold'
                    : isCompleted
                    ? 'text-emerald-600 dark:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-[#15151F]'
                    : 'text-neutral-400 dark:text-neutral-600 hover:text-neutral-700'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  isCurrent ? 'bg-white text-black dark:bg-black dark:text-white' : isCompleted ? 'bg-emerald-500 text-white' : 'bg-neutral-200 dark:bg-neutral-800'
                }`}>
                  {isCompleted ? <Check className="w-3 h-3" /> : step.num}
                </span>
                <span>{step.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 sm:p-8 shadow-sm">
        {/* STEP 1: BASICS */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
                Step 1: Event Fundamentals
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Name your competition, specify the headline tagline, and designate the public event code.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Tagline / Scope
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Unique Event Code (For Participant Access)
                  </label>
                  <input
                    type="text"
                    value={eventCode}
                    onChange={e => setEventCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 text-sm font-mono-tech uppercase bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Tracks / Categories (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={trackInput}
                    onChange={e => setTrackInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: REGISTRATION */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
                Step 2: Registration Windows & Capacity
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Define the participant registration timeline and capacity caps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Registration Start Date
                </label>
                <input
                  type="date"
                  value={regStartDate}
                  onChange={e => setRegStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Registration Close Date
                </label>
                <input
                  type="date"
                  value={regEndDate}
                  onChange={e => setRegEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Maximum Participant Cap
              </label>
              <input
                type="number"
                value={maxParticipants}
                onChange={e => setMaxParticipants(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 text-sm bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
              />
            </div>
          </div>
        )}

        {/* STEP 3: TEAMS */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
                Step 3: Team Governance Rules
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Configure team size boundaries and cross-institutional collaboration policy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Minimum Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={minTeamSize}
                  onChange={e => setMinTeamSize(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Maximum Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={maxTeamSize}
                  onChange={e => setMaxTeamSize(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
                />
              </div>
            </div>

            <div className="p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#15151F]">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowCrossInstitution}
                  onChange={e => setAllowCrossInstitution(e.target.checked)}
                  className="w-4 h-4 accent-[#2F5CFF] dark:accent-[#C6FF1A]"
                />
                <div>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white block">
                    Allow Cross-Institutional Teams
                  </span>
                  <span className="text-xs text-neutral-500">
                    Students from different universities can collaborate on the same roster.
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: SUBMISSION */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
                Step 4: Required Submission Deliverables
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Choose the mandatory artifacts required before a team can finalize submission.
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-[#15151F] cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireGithub}
                  onChange={e => setRequireGithub(e.target.checked)}
                  className="w-4 h-4 accent-[#2F5CFF] dark:accent-[#C6FF1A]"
                />
                <div>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Public GitHub / Git Repository URL
                  </span>
                  <span className="text-xs text-neutral-500 block">
                    Must contain open-source code and commit logs before the deadline timestamp.
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-[#15151F] cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireDemo}
                  onChange={e => setRequireDemo(e.target.checked)}
                  className="w-4 h-4 accent-[#2F5CFF] dark:accent-[#C6FF1A]"
                />
                <div>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Live Demo / Benchmark Sandbox URL
                  </span>
                  <span className="text-xs text-neutral-500 block">
                    Accessible web endpoint, testnet contract, or cloud sandbox for live judge inspection.
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-[#15151F] cursor-pointer">
                <input
                  type="checkbox"
                  checked={requirePdf}
                  onChange={e => setRequirePdf(e.target.checked)}
                  className="w-4 h-4 accent-[#2F5CFF] dark:accent-[#C6FF1A]"
                />
                <div>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Technical Whitepaper or Architecture PDF
                  </span>
                  <span className="text-xs text-neutral-500 block">
                    Maximum 10 pages; must strip identifying university affiliations for double-blind audit.
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 5: RUBRIC */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
                  Step 5: Weighted Rubric Formulation
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Define evaluation criteria. Cumulative weight must equal exactly 100%.
                </p>
              </div>

              <div className={`px-3 py-1.5 rounded font-mono-tech text-xs font-bold ${
                totalWeight === 100
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400'
              }`}>
                Total: {totalWeight}% {totalWeight === 100 ? '✓' : '(Must be 100%)'}
              </div>
            </div>

            <div className="space-y-4">
              {wizardRubric.map((crit, idx) => (
                <div
                  key={crit.id}
                  className="p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#15151F]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono-tech text-xs text-neutral-400">0{idx + 1}.</span>
                        <input
                          type="text"
                          value={crit.name}
                          onChange={e => {
                            const updated = [...wizardRubric];
                            updated[idx].name = e.target.value;
                            setWizardRubric(updated);
                          }}
                          className="font-semibold text-sm bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A] flex-1"
                        />
                        <div className="flex items-center gap-1 font-mono-tech text-xs">
                          <span>Weight:</span>
                          <input
                            type="number"
                            value={crit.weight}
                            onChange={e => {
                              const updated = [...wizardRubric];
                              updated[idx].weight = parseInt(e.target.value) || 0;
                              setWizardRubric(updated);
                            }}
                            className="w-16 px-1.5 py-0.5 rounded bg-white dark:bg-[#0E0E14] border border-neutral-300 dark:border-neutral-700 text-center font-bold"
                          />
                          <span>%</span>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={crit.description}
                        onChange={e => {
                          const updated = [...wizardRubric];
                          updated[idx].description = e.target.value;
                          setWizardRubric(updated);
                        }}
                        className="text-xs text-neutral-600 dark:text-neutral-400 bg-transparent w-full focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={() => removeRubricCriterion(crit.id)}
                      className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer"
                      title="Remove criterion"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={addRubricCriterion}
                icon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Rubric Criterion
              </Button>
            </div>
          </div>
        )}

        {/* STEP 6: JUDGING */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
                Step 6: Blind Evaluation & Normalization Engine
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Configure judge workload, anonymity masking, and mathematical score normalization.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Required Evaluations per Submission
                </label>
                <div className="flex items-center gap-3">
                  {[2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setJudgesPerProject(num)}
                      className={`px-4 py-2 rounded-md font-mono-tech text-sm font-semibold border ${
                        judgesPerProject === num
                          ? 'border-[#2F5CFF] bg-[#2F5CFF] text-white dark:border-[#C6FF1A] dark:bg-[#C6FF1A] dark:text-black'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {num} Judges
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#15151F]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableDoubleBlind}
                    onChange={e => setEnableDoubleBlind(e.target.checked)}
                    className="w-4 h-4 accent-[#2F5CFF] dark:accent-[#C6FF1A]"
                  />
                  <div>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white block">
                      Enforce Strict Double-Blind Evaluation
                    </span>
                    <span className="text-xs text-neutral-500">
                      Hides all team names, member colleges, GitHub handles, and avatars from judges until official unmasking.
                    </span>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Scoring Normalization Algorithm
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setNormalizationAlgo('z_score')}
                    className={`p-3 rounded-md border text-left transition-all ${
                      normalizationAlgo === 'z_score'
                        ? 'border-[#2F5CFF] bg-[#2F5CFF]/5 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <span className="text-xs font-mono-tech font-bold block mb-1">Standard Z-Score</span>
                    <span className="text-[11px] text-neutral-500">
                      Standardizes judge variances and neutralizes harsh vs lenient bias.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNormalizationAlgo('trimmed_mean')}
                    className={`p-3 rounded-md border text-left transition-all ${
                      normalizationAlgo === 'trimmed_mean'
                        ? 'border-[#2F5CFF] bg-[#2F5CFF]/5 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <span className="text-xs font-mono-tech font-bold block mb-1">Olympic Trimmed Mean</span>
                    <span className="text-[11px] text-neutral-500">
                      Drops highest and lowest outlier scores per submission.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNormalizationAlgo('borda')}
                    className={`p-3 rounded-md border text-left transition-all ${
                      normalizationAlgo === 'borda'
                        ? 'border-[#2F5CFF] bg-[#2F5CFF]/5 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <span className="text-xs font-mono-tech font-bold block mb-1">Borda Count</span>
                    <span className="text-[11px] text-neutral-500">
                      Relative rank scoring across each individual judge’s batch.
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: REVIEW & LAUNCH */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
                Step 7: Final Review & Live Initialization
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Verify parameters before deploying the competition configuration.
              </p>
            </div>

            <div className="space-y-3 font-mono-tech text-xs">
              <div className="flex justify-between p-3 rounded bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500">Event Title:</span>
                <span className="font-bold text-neutral-900 dark:text-white">{title}</span>
              </div>

              <div className="flex justify-between p-3 rounded bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500">Event Code:</span>
                <span className="font-bold text-[#2F5CFF] dark:text-[#C6FF1A]">{eventCode}</span>
              </div>

              <div className="flex justify-between p-3 rounded bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500">Evaluation Mode:</span>
                <span className="font-bold text-emerald-500">Double-Blind Active</span>
              </div>

              <div className="flex justify-between p-3 rounded bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500">Coverage Requirement:</span>
                <span className="font-bold text-neutral-900 dark:text-white">{judgesPerProject} Judges per Submission</span>
              </div>

              <div className="flex justify-between p-3 rounded bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500">Scoring Algorithm:</span>
                <span className="font-bold text-neutral-900 dark:text-white uppercase">{normalizationAlgo}</span>
              </div>

              <div className="flex justify-between p-3 rounded bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500">Rubric Criteria Sum:</span>
                <span className="font-bold text-emerald-500">{totalWeight}% (Valid)</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Clicking Launch will broadcast this event configuration to the immutable audit trail.
              </span>
              <Button
                variant="primary"
                size="lg"
                onClick={handleLaunch}
                icon={<Rocket className="w-4 h-4" />}
              >
                Launch Competition
              </Button>
            </div>
          </div>
        )}

        {/* Step Navigation Footer */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <Button
            variant="outline"
            size="md"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          {currentStep < 7 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(prev => Math.min(7, prev + 1))}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Step {currentStep + 1}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleLaunch}
              icon={<Rocket className="w-4 h-4" />}
            >
              Launch Event
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
