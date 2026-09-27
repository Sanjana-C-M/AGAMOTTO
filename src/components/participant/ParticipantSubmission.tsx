import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  FileText,
  Github,
  ExternalLink,
  UploadCloud,
  CheckCircle2,
  Lock,
  Save,
  Send,
  Sparkles,
  AlertCircle,
  ArrowLeft,
  History,
  Users
} from 'lucide-react';

export const ParticipantSubmission: React.FC = () => {
  const {
    activeEvent,
    projects,
    currentUser,
    submitProject,
    updateProjectSubmission,
    navigate,
    setToast
  } = useApp();

  // Find existing project or create new
  const existingProject = projects.find(p => p.teamName === 'Nova Dynamics') || projects[0];

  const [title, setTitle] = useState(existingProject.title);
  const [tagline, setTagline] = useState(existingProject.tagline);
  const [track, setTrack] = useState(existingProject.track);
  const [problem, setProblem] = useState(existingProject.problem);
  const [solution, setSolution] = useState(existingProject.solution);
  const [techStackInput, setTechStackInput] = useState(existingProject.techStack.join(', '));
  const [githubUrl, setGithubUrl] = useState(existingProject.githubUrl);
  const [demoUrl, setDemoUrl] = useState(existingProject.demoUrl);
  const [fileName, setFileName] = useState(existingProject.presentationFileName || 'Aetheria_Whitepaper_v2.pdf');
  const [submissionState, setSubmissionState] = useState<'draft' | 'submitted' | 'locked'>(existingProject.status);

  const isLocked = submissionState === 'locked' || activeEvent.editingPolicy === 'locked';

  const handleSave = (targetState: 'draft' | 'submitted' | 'locked') => {
    updateProjectSubmission(existingProject.id, {
      title,
      tagline,
      track,
      problem,
      solution,
      techStack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl,
      demoUrl,
      presentationFileName: fileName,
      status: targetState
    });
    setSubmissionState(targetState);
    setToast(`Submission state updated to ${targetState.toUpperCase()}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setToast(`Attached file: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#08080E] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono-tech text-xs">
            <span className="text-[#2F5CFF] dark:text-[#C6FF1A] font-bold uppercase">
              SUBMISSION DOSSIER & VERSIONING
            </span>
            <span>·</span>
            <span className="text-neutral-500">{activeEvent.title}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-black text-neutral-900 dark:text-white">
            Project Deliverables & Artifacts
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Editing Policy: <strong>{activeEvent.editingPolicy || 'Allow Until Deadline'}</strong>. Double-blind masking applied automatically upon freeze.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono-tech uppercase font-bold px-3 py-1 rounded ${
            submissionState === 'locked'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              : submissionState === 'submitted'
              ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30'
              : 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
          }`}>
            STATUS: {submissionState}
          </span>
        </div>
      </div>

      {/* Main Submission Form */}
      <div className="bg-white dark:bg-[#08080E] border border-neutral-200 dark:border-[#1A1A28] rounded-md p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Project Name / Title
            </label>
            <input
              type="text"
              disabled={isLocked}
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-base font-semibold bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF] disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Elevator Tagline
            </label>
            <input
              type="text"
              disabled={isLocked}
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF] disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Category Track
            </label>
            <select
              disabled={isLocked}
              value={track}
              onChange={e => setTrack(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF] disabled:opacity-60"
            >
              {activeEvent.tracks.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Problem Statement
            </label>
            <textarea
              rows={3}
              disabled={isLocked}
              value={problem}
              onChange={e => setProblem(e.target.value)}
              className="w-full text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md p-3 focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF] disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Technical Solution & Core Architectural Insights
            </label>
            <textarea
              rows={4}
              disabled={isLocked}
              value={solution}
              onChange={e => setSolution(e.target.value)}
              className="w-full text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md p-3 focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF] disabled:opacity-60"
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
            Tech Stack Tags (Comma-separated)
          </label>
          <input
            type="text"
            disabled={isLocked}
            value={techStackInput}
            onChange={e => setTechStackInput(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF] disabled:opacity-60"
          />
        </div>

        {/* Deliverables URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>Public GitHub Repository URL</span>
            </label>
            <input
              type="url"
              disabled={isLocked}
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF] disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Benchmark Demo Sandbox URL</span>
            </label>
            <input
              type="url"
              disabled={isLocked}
              value={demoUrl}
              onChange={e => setDemoUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF] disabled:opacity-60"
            />
          </div>
        </div>

        {/* Presentation Upload */}
        <div>
          <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Presentation / Whitepaper Artifact (PDF)
          </label>
          <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-md p-6 text-center hover:border-[#2F5CFF] dark:hover:border-[#00F0FF] transition-colors">
            <UploadCloud className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              <label className="font-semibold text-[#2F5CFF] dark:text-[#00F0FF] cursor-pointer hover:underline">
                Upload new revision
                <input
                  type="file"
                  accept=".pdf"
                  disabled={isLocked}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>{' '}
              or drag & drop
            </div>
            <p className="text-[11px] text-neutral-400 mt-1 font-mono-tech">
              Active file: <strong>{fileName}</strong>
            </p>
          </div>
        </div>

        {/* Team Members List per user spec */}
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Attached Team Contributors ({existingProject.members.length})
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {existingProject.members.map((m, idx) => (
              <div key={idx} className="p-2.5 rounded bg-neutral-50 dark:bg-[#12121E] text-xs">
                <span className="font-semibold text-neutral-900 dark:text-white block">{m.name}</span>
                <span className="text-[11px] text-neutral-500 font-mono-tech">{m.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-neutral-500 font-mono-tech">
            {isLocked ? 'Submission is frozen for double-blind judging.' : 'Save changes as draft or submit for live judging.'}
          </span>

          <div className="flex flex-wrap items-center gap-3">
            {!isLocked ? (
              <>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => handleSave('draft')}
                  icon={<Save className="w-4 h-4" />}
                >
                  Save Draft
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleSave('submitted')}
                  icon={<Send className="w-4 h-4" />}
                >
                  Submit for Evaluation
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleSave('locked')}
                  icon={<Lock className="w-4 h-4" />}
                >
                  Freeze & Lock Submission
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="md"
                onClick={() => setSubmissionState('submitted')}
              >
                Request Edit Unlock
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Version History Component per user spec */}
      <div className="p-6 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#00F0FF]" />
            <h4 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Submission Version History
            </h4>
          </div>
          <span className="text-xs font-mono-tech text-neutral-500">
            {existingProject.versions?.length || 2} Revisions Recorded
          </span>
        </div>

        <div className="space-y-2">
          {(existingProject.versions || [
            { version: 1, timestamp: '2026-09-26 14:10 UTC', summary: 'Initial spec and draft repository linked', editedBy: 'Kiran Patel' },
            { version: 2, timestamp: '2026-09-26 18:42 UTC', summary: 'Finalized whitepaper and benchmark sandbox URL', editedBy: 'Clara Weber' }
          ]).map((v, i) => (
            <div
              key={i}
              className="p-3 rounded bg-neutral-50 dark:bg-[#12121E] text-xs font-mono-tech flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-[#2F5CFF] dark:text-[#C6FF1A] mr-2">
                  v{v.version}.0
                </span>
                <span className="text-neutral-700 dark:text-neutral-300 font-sans">
                  {v.summary}
                </span>
              </div>
              <div className="text-neutral-500 text-[11px]">
                {v.timestamp} · {v.editedBy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
