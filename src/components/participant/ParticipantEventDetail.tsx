import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  ArrowLeft,
  Calendar,
  Trophy,
  Users,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Key,
  X
} from 'lucide-react';

export const ParticipantEventDetail: React.FC = () => {
  const { activeEvent, currentUser, navigate, joinEventWithCode, register, setToast } = useApp();
  const [isJoined, setIsJoined] = useState(false);
  const [codeModal, setCodeModal] = useState(false);
  const [codeVal, setCodeVal] = useState('');
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  const [enrollForm, setEnrollForm] = useState({
    name: currentUser?.name || 'Kiran Patel',
    email: currentUser?.email || 'kiran@stanford.edu',
    college: currentUser?.college || 'Stanford University',
    track: activeEvent.tracks[0] || 'General',
    roleSpecialization: 'Distributed Systems & Architecture',
    agreeBlindPolicy: true
  });

  const handleOpenEnroll = () => {
    if (!activeEvent.isPublic && !isJoined) {
      setCodeModal(true);
      return;
    }
    setEnrollModalOpen(true);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = joinEventWithCode(codeVal);
    if (ok) {
      setCodeModal(false);
      setEnrollModalOpen(true);
    } else {
      setToast('Invalid event code.');
    }
  };

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollForm.agreeBlindPolicy) {
      setToast('Please accept the double-blind policy.');
      return;
    }

    register({
      name: enrollForm.name,
      email: enrollForm.email,
      college: enrollForm.college,
      role: 'participant'
    });

    setIsJoined(true);
    setEnrollModalOpen(false);
    setToast(`Enrolled in ${activeEvent.title}! Proceed to team formation.`);
    navigate('/participant/events/[eventId]/team', { eventId: activeEvent.id });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <button
          onClick={() => navigate('/participant/events')}
          className="flex items-center gap-1.5 text-xs font-mono-tech text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Competitions</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono-tech text-xs text-[#00F0FF] dark:text-[#C6FF1A] font-bold">
            {activeEvent.eventCode}
          </span>
          <span className="text-xs font-mono-tech text-neutral-400">·</span>
          <span className="text-xs font-mono-tech text-emerald-500 uppercase font-semibold">
            {activeEvent.status}
          </span>
        </div>

        <h1 className="text-3xl font-heading font-black text-neutral-900 dark:text-white">
          {activeEvent.title}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          {activeEvent.tagline}
        </p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#0A0A10] flex items-center gap-3">
          <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="text-[10px] font-mono-tech uppercase text-neutral-500 block">Prize Purse</span>
            <span className="font-bold text-sm text-neutral-900 dark:text-white">{activeEvent.prizes}</span>
          </div>
        </div>

        <div className="p-4 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#0A0A10] flex items-center gap-3">
          <Calendar className="w-5 h-5 text-[#00F0FF] shrink-0" />
          <div>
            <span className="text-[10px] font-mono-tech uppercase text-neutral-500 block">Competition Window</span>
            <span className="font-bold text-sm text-neutral-900 dark:text-white">{activeEvent.startDate} — {activeEvent.endDate}</span>
          </div>
        </div>

        <div className="p-4 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#0A0A10] flex items-center gap-3">
          <Users className="w-5 h-5 text-[#C6FF1A] shrink-0" />
          <div>
            <span className="text-[10px] font-mono-tech uppercase text-neutral-500 block">Squad Constraints</span>
            <span className="font-bold text-sm text-neutral-900 dark:text-white">{activeEvent.minTeamSize} min — {activeEvent.maxTeamSize} max members</span>
          </div>
        </div>
      </div>

      {/* Description & Rules */}
      <div className="p-6 rounded-[8px] border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white">
          About this Competition
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
          {activeEvent.description || 'Welcome to this AGAMOTTO verified tournament. Submissions will be subject to double-blind rubric scoring with Z-score normalized variance reduction.'}
        </p>

        <div className="pt-2">
          <h4 className="font-mono-tech text-xs uppercase font-bold text-neutral-400 mb-2">
            Target Domain Tracks
          </h4>
          <div className="flex flex-wrap gap-2">
            {activeEvent.tracks.map(t => (
              <span
                key={t}
                className="font-mono-tech text-xs px-3 py-1 rounded-[6px] bg-neutral-100 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Double-Blind Guarantee */}
        <div className="p-4 rounded-[6px] bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 flex items-start gap-3 text-xs text-neutral-600 dark:text-neutral-400">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-neutral-900 dark:text-white block font-mono-tech">
              GUARANTEED DOUBLE-BLIND EVALUATION POLICY
            </strong>
            <span className="font-sans">
              All submissions are cryptographically stripped of personal identifiers, author names, GitHub user profiles, and university affiliations during the judging phase.
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <span className="text-xs font-mono-tech text-neutral-500">
            Registration Mode: <strong>{activeEvent.registrationMode?.toUpperCase()}</strong>
          </span>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/participant/events/[eventId]/team', { eventId: activeEvent.id })}
            >
              Squad Roster
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleOpenEnroll}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {isJoined ? 'Enrolled ✓ Go to Team' : 'Enroll in Competition'}
            </Button>
          </div>
        </div>
      </div>

      {/* ENROLLMENT MODAL TO COLLECT PARTICIPANT DETAILS */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#080912] border-2 border-[#00F0FF] dark:border-[#C6FF1A] rounded-[8px] max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-start justify-between border-b border-neutral-200 dark:border-[#1E2032] pb-3">
              <div>
                <span className="text-[10px] font-mono-tech uppercase font-bold text-[#00F0FF] dark:text-[#C6FF1A]">
                  COLLECT ENROLLMENT DETAILS
                </span>
                <h3 className="text-xl font-heading font-black text-neutral-900 dark:text-white">
                  {activeEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setEnrollModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEnrollment} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={enrollForm.name}
                  onChange={e => setEnrollForm({ ...enrollForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={enrollForm.email}
                    onChange={e => setEnrollForm({ ...enrollForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    College / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={enrollForm.college}
                    onChange={e => setEnrollForm({ ...enrollForm, college: e.target.value })}
                    placeholder="e.g. Stanford University"
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Target Domain Track *
                </label>
                <select
                  value={enrollForm.track}
                  onChange={e => setEnrollForm({ ...enrollForm, track: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                >
                  {activeEvent.tracks.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="p-3 rounded-[6px] bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="agreeBlindDetail"
                  checked={enrollForm.agreeBlindPolicy}
                  onChange={e => setEnrollForm({ ...enrollForm, agreeBlindPolicy: e.target.checked })}
                  className="mt-1 cursor-pointer"
                />
                <label htmlFor="agreeBlindDetail" className="text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer font-sans">
                  I agree to the <strong>Double-Blind Evaluation Agreement</strong>. I understand that all institutional names, GitHub profiles, and author tags will be stripped from evaluating judges until official publication.
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-[#1E2032]">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setEnrollModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Confirm & Join Competition
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Code Modal if private */}
      {codeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0C0D16] border-2 border-[#00F0FF] dark:border-[#C6FF1A] rounded-[8px] max-w-md w-full p-6 space-y-4">
            <h3 className="font-heading font-black text-lg text-neutral-900 dark:text-white">
              Private Event Passcode Required
            </h3>
            <p className="text-xs text-neutral-500 font-mono-tech">
              This tournament is restricted. Enter your event access token.
            </p>
            <form onSubmit={handleVerifyCode} className="space-y-3">
              <input
                type="text"
                required
                value={codeVal}
                onChange={e => setCodeVal(e.target.value.toUpperCase())}
                placeholder={activeEvent.eventCode}
                className="w-full px-3 py-2 text-sm font-mono-tech uppercase bg-neutral-50 dark:bg-[#151522] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setCodeModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Verify & Enter
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
