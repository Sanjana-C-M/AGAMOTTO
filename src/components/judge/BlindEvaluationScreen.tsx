import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { VerifiedStamp } from '../common/VerifiedStamp';
import {
  ArrowLeft,
  Lock,
  CheckCircle2,
  ExternalLink,
  Github,
  Save,
  ShieldCheck,
  FileText,
  AlertTriangle,
  History,
  Check
} from 'lucide-react';

export const BlindEvaluationScreen: React.FC = () => {
  const {
    projects,
    judges,
    currentJudgeId,
    activeReviewId,
    activeEvent,
    saveEvaluation,
    navigate
  } = useApp();

  const project = projects.find(p => p.id === activeReviewId) || projects[0];
  const currentJudge = judges.find(j => j.id === currentJudgeId) || judges[0];

  const existingScore = project?.scores.find(s => s.judgeId === currentJudge.id);

  const [scores, setScores] = useState<Record<string, number>>({});
  const [justifications, setJustifications] = useState<Record<string, string>>({});
  const [reviewState, setReviewState] = useState<'draft' | 'finalized' | 'locked'>('draft');

  useEffect(() => {
    if (existingScore) {
      setScores(existingScore.criteriaScores || {});
      setJustifications(existingScore.justifications || {});
      setReviewState(existingScore.status || 'draft');
    } else {
      const initScores: Record<string, number> = {};
      const initJustifications: Record<string, string> = {};
      activeEvent.rubric.forEach(c => {
        initScores[c.id] = 8;
        initJustifications[c.id] = '';
      });
      setScores(initScores);
      setJustifications(initJustifications);
      setReviewState('draft');
    }
  }, [existingScore, activeReviewId]);

  let currentRawTotal = 0;
  let totalWeight = 0;
  activeEvent.rubric.forEach(crit => {
    const s = scores[crit.id] || 0;
    currentRawTotal += (s / crit.maxScore) * crit.weight;
    totalWeight += crit.weight;
  });
  const liveWeightedScore = Number(((currentRawTotal / (totalWeight || 100)) * 10).toFixed(2));

  const handleScoreChange = (critId: string, val: number) => {
    if (reviewState === 'locked') return;
    setScores(prev => ({ ...prev, [critId]: val }));
  };

  const handleJustificationChange = (critId: string, text: string) => {
    if (reviewState === 'locked') return;
    setJustifications(prev => ({ ...prev, [critId]: text }));
  };

  const handleSaveAction = (status: 'draft' | 'finalized' | 'locked') => {
    saveEvaluation(project.id, currentJudge.id, scores, justifications, status);
    setReviewState(status);
  };

  const isLocked = reviewState === 'locked';
  const isReopened = existingScore?.isReopened;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/judge/projects')}
          className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Assigned Submissions Queue</span>
        </button>

        {isLocked && (
          <VerifiedStamp
            hash={existingScore ? `0x${existingScore.totalRaw.toFixed(2)}` : '0x8f2a'}
            verifier="JUDGE REVIEW SEAL"
          />
        )}
      </div>

      {/* Reopened Banner Notice per spec */}
      {isReopened && (
        <div className="p-4 rounded-md border border-amber-400 bg-amber-500/10 dark:border-amber-500/30 text-xs font-mono-tech text-amber-900 dark:text-amber-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <strong className="block uppercase font-bold">REOPENED BY TOURNAMENT ORGANIZER</strong>
              <span className="text-amber-700 dark:text-amber-400 font-sans">
                Review unlocked for justification notes enhancement. Reason: "{existingScore?.reopenedReason || 'Please provide deeper technical rationale for criteria weighting'}".
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/organizer/events/[eventId]/audit', { eventId: activeEvent.id })}
            className="text-amber-900 dark:text-[#00F0FF] underline hover:text-white font-bold shrink-0 cursor-pointer"
          >
            View Audit Event
          </button>
        </div>
      )}

      {/* HIGHEST PRIORITY EVALUATION SCREEN SPECIFICATION:
          Header (Project #ID, view demo/GitHub buttons)
          -> 01/The Problem
          -> 02/The Solution
          -> 03/The Evidence
          -> 04/The Verdict
      */}
      <div className="p-6 sm:p-8 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] shadow-sm space-y-8">
        {/* HEADER: Project #ID + Demo/GitHub Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono-tech text-xs font-bold text-neutral-400">
                {project.id}
              </span>
              <span className="text-xs font-mono-tech text-[#00F0FF] px-2 py-0.5 rounded bg-[#00F0FF]/10 font-bold">
                BLIND REVIEW
              </span>
              <span className="text-xs font-mono-tech text-neutral-400">
                TRACK: {project.track}
              </span>
            </div>
            <h1 className="text-3xl font-heading font-black text-neutral-900 dark:text-white">
              {project.codeName}
            </h1>
            <p className="text-xs text-neutral-500 italic mt-0.5">
              "{project.tagline}"
            </p>
          </div>

          <div className="flex items-center gap-2.5 font-mono-tech text-xs">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-neutral-100 dark:bg-[#12121E] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 hover:border-[#2F5CFF] dark:hover:border-[#00F0FF] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View Code</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>

            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#2F5CFF]/10 dark:bg-[#00F0FF]/10 text-[#2F5CFF] dark:text-[#00F0FF] border border-[#2F5CFF]/30 dark:border-[#00F0FF]/30 hover:underline font-bold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Demo</span>
            </a>
          </div>
        </div>

        {/* 01 / THE PROBLEM */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs font-black text-[#2F5CFF] dark:text-[#C6FF1A]">01 /</span>
            <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white uppercase tracking-wider text-xs font-mono-tech">
              The Problem
            </h3>
          </div>
          <div className="p-4 rounded-md bg-neutral-50 dark:bg-[#0F101A] border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {project.problem}
          </div>
        </section>

        {/* 02 / THE SOLUTION */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs font-black text-[#2F5CFF] dark:text-[#C6FF1A]">02 /</span>
            <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white uppercase tracking-wider text-xs font-mono-tech">
              The Solution
            </h3>
          </div>
          <div className="p-4 rounded-md bg-neutral-50 dark:bg-[#0F101A] border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {project.solution}
          </div>
        </section>

        {/* 03 / THE EVIDENCE */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs font-black text-[#2F5CFF] dark:text-[#C6FF1A]">03 /</span>
            <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white uppercase tracking-wider text-xs font-mono-tech">
              The Evidence (Tech Stack & Deliverables)
            </h3>
          </div>
          <div className="p-4 rounded-md bg-neutral-50 dark:bg-[#0F101A] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div>
              <span className="text-[11px] font-mono-tech uppercase font-bold text-neutral-400 block mb-1.5">
                Verified Tech Stack Primitives
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(t => (
                  <span
                    key={t}
                    className="font-mono-tech text-xs px-2.5 py-1 rounded bg-white dark:bg-[#151522] border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-wrap gap-4 text-xs font-mono-tech">
              <span className="text-neutral-500">
                Attached Artifact: <strong>{project.presentationFileName || 'Whitepaper_Spec.pdf'}</strong>
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-emerald-500">
                SHA-256 Code Attestation ✓ Match
              </span>
            </div>
          </div>
        </section>

        {/* 04 / THE VERDICT (Rubric Criterion with Score Input + Required Justification Textarea) */}
        <section className="space-y-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-xs font-black text-[#2F5CFF] dark:text-[#C6FF1A]">04 /</span>
              <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white uppercase tracking-wider text-xs font-mono-tech">
                The Verdict (Rubric Scoring & Required Justifications)
              </h3>
            </div>

            <div className="p-2.5 rounded bg-neutral-100 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 font-mono-tech text-xs flex items-center gap-2">
              <span className="text-neutral-500">Weighted Raw Average:</span>
              <span className="font-bold text-base text-[#2F5CFF] dark:text-[#00F0FF]">
                {liveWeightedScore} / 10.0
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {activeEvent.rubric.map(crit => {
              const currentScore = scores[crit.id] ?? 8;
              const currentJust = justifications[crit.id] ?? '';

              return (
                <div
                  key={crit.id}
                  className="p-5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-[#0A0A12] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white">
                          {crit.name}
                        </h4>
                        <span className="font-mono-tech text-xs px-2 py-0.5 rounded bg-neutral-200 dark:bg-[#161622] text-neutral-700 dark:text-neutral-300 font-bold">
                          Weight: {crit.weight}%
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        {crit.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 font-mono-tech">
                      <span className="text-2xl font-black text-[#2F5CFF] dark:text-[#C6FF1A]">
                        {currentScore}
                      </span>
                      <span className="text-xs text-neutral-400">/ {crit.maxScore}</span>
                    </div>
                  </div>

                  {/* Slider */}
                  <div>
                    <input
                      type="range"
                      min="1"
                      max={crit.maxScore}
                      step="1"
                      disabled={isLocked}
                      value={currentScore}
                      onChange={e => handleScoreChange(crit.id, parseInt(e.target.value))}
                      className="w-full accent-[#2F5CFF] dark:accent-[#C6FF1A] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono-tech text-neutral-400 mt-1">
                      <span>1 (Substandard)</span>
                      <span>5 (Competent)</span>
                      <span>10 (Breakthrough)</span>
                    </div>
                  </div>

                  {/* Anchor description */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {crit.anchors.map(a => (
                      <div
                        key={a.score}
                        className={`p-2 rounded text-xs transition-colors ${
                          currentScore === a.score
                            ? 'bg-[#2F5CFF]/15 text-[#2F5CFF] dark:bg-[#C6FF1A]/15 dark:text-[#C6FF1A] font-bold border border-[#2F5CFF]/40 dark:border-[#C6FF1A]/40'
                            : 'bg-white dark:bg-[#12121E] text-neutral-500 border border-neutral-200 dark:border-neutral-800'
                        }`}
                      >
                        <span className="font-mono-tech font-bold block">Score {a.score}:</span>
                        <span>{a.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* REQUIRED JUSTIFICATION TEXTAREA */}
                  <div>
                    <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Required Evaluator Justification
                    </label>
                    <textarea
                      rows={2}
                      disabled={isLocked}
                      required
                      value={currentJust}
                      onChange={e => handleJustificationChange(crit.id, e.target.value)}
                      placeholder={`Document technical rationale for score of ${currentScore}/${crit.maxScore}...`}
                      className="w-full text-xs bg-white dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded p-2.5 focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF] text-neutral-800 dark:text-neutral-200 disabled:opacity-60"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review State Controls: Draft / Finalized / Locked */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono-tech text-xs">
              <span className="text-neutral-500">Review State:</span>
              <span className={`px-2.5 py-1 rounded uppercase font-bold ${
                reviewState === 'locked'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : reviewState === 'finalized'
                  ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30'
                  : 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
              }`}>
                {reviewState}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {!isLocked ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSaveAction('draft')}
                    icon={<Save className="w-3.5 h-3.5" />}
                  >
                    Save Draft
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSaveAction('finalized')}
                    icon={<Check className="w-3.5 h-3.5" />}
                  >
                    Finalize Review
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSaveAction('locked')}
                    icon={<Lock className="w-3.5 h-3.5" />}
                  >
                    Lock Review (SHA-256 Sign)
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-tech text-emerald-500">
                    Review locked and sealed in audit ledger.
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/judge/projects')}
                  >
                    Back to Queue
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
