import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { EventConfig } from '../../types';
import {
  Search,
  Calendar,
  Trophy,
  Users,
  ArrowRight,
  Key,
  ShieldCheck,
  CheckCircle2,
  Lock,
  UserCheck,
  X
} from 'lucide-react';

export const ParticipantEventsDevpost: React.FC = () => {
  const { events, activeEventId, currentUser, navigate, joinEventWithCode, register, setToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'open' | 'upcoming'>('all');
  const [privateCodeModalOpen, setPrivateCodeModalOpen] = useState(false);
  const [eventCodeInput, setEventCodeInput] = useState('');

  // Enrollment modal state to collect details
  const [enrollModalEvent, setEnrollModalEvent] = useState<EventConfig | null>(null);
  const [enrollForm, setEnrollForm] = useState({
    name: currentUser?.name || 'Kiran Patel',
    email: currentUser?.email || 'kiran@stanford.edu',
    college: currentUser?.college || 'Stanford University',
    track: '',
    roleSpecialization: 'Distributed Systems & Backend',
    github: 'kiran-patel-sys',
    agreeBlindPolicy: true
  });

  const filteredEvents = events.filter(e => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.tracks.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedFilter === 'open') return e.status === 'active' || e.status === 'registration' || e.status === 'submission';
    if (selectedFilter === 'upcoming') return e.status === 'draft' || e.status === 'registration';
    return true;
  });

  const handleOpenEnrollModal = (event: EventConfig) => {
    setEnrollModalEvent(event);
    setEnrollForm(prev => ({
      ...prev,
      name: currentUser?.name || prev.name,
      email: currentUser?.email || prev.email,
      college: currentUser?.college || prev.college,
      track: event.tracks[0] || 'General'
    }));
  };

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollModalEvent) return;

    if (!enrollForm.agreeBlindPolicy) {
      setToast('Please acknowledge the double-blind judging policy.');
      return;
    }

    // Persist details in profile
    register({
      name: enrollForm.name,
      email: enrollForm.email,
      college: enrollForm.college,
      role: 'participant'
    });

    const enrolledEvent = enrollModalEvent;
    setEnrollModalEvent(null);
    setToast(`Successfully enrolled in ${enrolledEvent.title}! Proceeding to team roster.`);
    navigate('/participant/events/[eventId]/team', { eventId: enrolledEvent.id });
  };

  const handleUnlockPrivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventCodeInput.trim()) return;
    const ok = joinEventWithCode(eventCodeInput);
    if (ok) {
      setPrivateCodeModalOpen(false);
      setEventCodeInput('');
      const matched = events.find(ev => ev.eventCode.toUpperCase() === eventCodeInput.trim().toUpperCase()) || events[0];
      handleOpenEnrollModal(matched);
    } else {
      setToast('Invalid event code. Verify with your event director.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Clean Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-[8px] bg-neutral-50 dark:bg-[#07080E] border border-neutral-200 dark:border-[#1E2032]">
        <div>
          <h2 className="text-2xl font-heading font-black text-neutral-900 dark:text-white">
            Competitions
          </h2>
          <p className="text-xs text-neutral-500 font-mono-tech mt-0.5">
            Select an event to enroll and submit your project for double-blind evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPrivateCodeModalOpen(true)}
            icon={<Key className="w-3.5 h-3.5" />}
          >
            Enter Event Code
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/participant/dashboard')}
            icon={<UserCheck className="w-3.5 h-3.5" />}
          >
            My Dashboard
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search competitions by title, topic, or track..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs font-mono-tech bg-white dark:bg-[#08080E] border border-neutral-200 dark:border-[#1C1F30] rounded-[6px] focus:outline-none focus:border-[#00F0FF] dark:focus:border-[#C6FF1A]"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto font-mono-tech text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'open', label: 'Open Registration' },
            { id: 'upcoming', label: 'Upcoming' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-[6px] font-medium transition-colors shrink-0 cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-neutral-900 text-white dark:bg-[#C6FF1A] dark:text-black font-bold'
                  : 'bg-neutral-100 dark:bg-[#10121C] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEvents.map(event => {
          const isOpen = event.status === 'registration' || event.status === 'active' || event.status === 'submission';
          const isEnrolled = event.id === activeEventId;

          return (
            <div
              key={event.id}
              className="flex flex-col justify-between rounded-[8px] border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#06070C] hover:border-[#00F0FF] dark:hover:border-[#C6FF1A] transition-all overflow-hidden shadow-xs"
            >
              <div>
                {/* Header Strip */}
                <div className={`h-24 bg-gradient-to-r ${event.bannerGradient || 'from-neutral-900 to-black'} p-4 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-black/70 text-white">
                      {event.isPublic ? 'Public' : 'Access Code Required'}
                    </span>

                    <span className={`font-mono-tech text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      isOpen
                        ? 'bg-[#00F0FF] text-black font-bold'
                        : 'bg-neutral-800 text-neutral-300'
                    }`}>
                      {event.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono-tech text-xs text-white">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold">{event.prizes}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-xl font-heading font-black text-neutral-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      {event.tagline}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech py-2 border-y border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{event.startDate} — {event.endDate}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{event.minTeamSize}-{event.maxTeamSize} Members / Squad</span>
                    </div>
                  </div>

                  {/* Tracks */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tracks.map(t => (
                      <span
                        key={t}
                        className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#12121E] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOpenEnrollModal(event)}
                  className="flex-1 font-bold"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {isEnrolled ? 'Enrolled · View Squad' : 'Enroll in Competition'}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/participant/events/[eventId]', { eventId: event.id })}
                >
                  Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ENROLLMENT DETAILS COLLECTION MODAL */}
      {enrollModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#080912] border-2 border-[#00F0FF] dark:border-[#C6FF1A] rounded-[8px] max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-start justify-between border-b border-neutral-200 dark:border-[#1E2032] pb-3">
              <div>
                <span className="text-[10px] font-mono-tech uppercase font-bold text-[#00F0FF] dark:text-[#C6FF1A]">
                  PARTICIPANT ENROLLMENT
                </span>
                <h3 className="text-xl font-heading font-black text-neutral-900 dark:text-white">
                  {enrollModalEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setEnrollModalEvent(null)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Target Track *
                  </label>
                  <select
                    value={enrollForm.track}
                    onChange={e => setEnrollForm({ ...enrollForm, track: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                  >
                    {enrollModalEvent.tracks.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Primary Role / Skill
                  </label>
                  <input
                    type="text"
                    value={enrollForm.roleSpecialization}
                    onChange={e => setEnrollForm({ ...enrollForm, roleSpecialization: e.target.value })}
                    placeholder="e.g. ML, Backend, Smart Contracts"
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  GitHub / Portfolio Handle
                </label>
                <input
                  type="text"
                  value={enrollForm.github}
                  onChange={e => setEnrollForm({ ...enrollForm, github: e.target.value })}
                  placeholder="e.g. kiran-patel-sys"
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div className="p-3 rounded-[6px] bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="agreeBlind"
                  checked={enrollForm.agreeBlindPolicy}
                  onChange={e => setEnrollForm({ ...enrollForm, agreeBlindPolicy: e.target.checked })}
                  className="mt-1 cursor-pointer"
                />
                <label htmlFor="agreeBlind" className="text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                  I agree to the <strong>Double-Blind Evaluation Agreement</strong>. I understand that all institutional names, GitHub profiles, and author tags will be stripped from evaluating judges until official publication.
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-[#1E2032]">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setEnrollModalEvent(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Complete Enrollment & Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Private Code Unlock Modal */}
      {privateCodeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0C0D16] border-2 border-[#00F0FF] dark:border-[#C6FF1A] rounded-[8px] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[6px] bg-[#00F0FF]/15 text-black dark:text-[#00F0FF] flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-black text-neutral-900 dark:text-white">
                    Unlock Private Event
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono-tech">
                    Enter the access pass code from your tournament organizer
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPrivateCodeModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUnlockPrivate} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-mono-tech uppercase font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Private Access Token / Code
                </label>
                <input
                  type="text"
                  required
                  value={eventCodeInput}
                  onChange={e => setEventCodeInput(e.target.value.toUpperCase())}
                  placeholder="e.g. AGAMOTTO-2026 or QUANTUM-2026"
                  className="w-full px-3 py-2 text-sm font-mono-tech uppercase bg-neutral-50 dark:bg-[#151522] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setPrivateCodeModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Unlock & Enroll
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
