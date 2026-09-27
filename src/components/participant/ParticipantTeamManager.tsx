import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Users,
  Copy,
  Check,
  UserPlus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  X,
  Mail,
  Building
} from 'lucide-react';
import { TeamMember } from '../../types';

export const ParticipantTeamManager: React.FC = () => {
  const { teams, activeEvent, currentUser, updateTeamMembers, navigate, setToast } = useApp();
  const [copied, setCopied] = useState(false);

  // Current team
  const currentTeam = teams.find(t => t.members.some(m => m.email === currentUser?.email)) || teams[0];

  // Find leader from team, or default to current user as leader
  const leaderMember = currentTeam?.members.find(m => m.isLeader) || {
    name: currentUser?.name || 'Kiran Patel',
    email: currentUser?.email || 'kiran@stanford.edu',
    college: currentUser?.college || 'Stanford University',
    role: 'Team Lead & Core Architect',
    isLeader: true
  };

  // State to track teammates (showing leader only first per prompt instructions)
  // Non-leader members can be added / removed dynamically
  const initialOtherMembers = currentTeam?.members.filter(m => !m.isLeader) || [];
  const [teammates, setTeammates] = useState<TeamMember[]>(initialOtherMembers);

  // Modal / form for adding a teammate
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTeammate, setNewTeammate] = useState({
    name: '',
    email: '',
    role: 'Systems Engineer',
    college: currentUser?.college || 'Stanford University'
  });

  const totalMembers = 1 + teammates.length; // Leader + teammates
  const minSize = activeEvent.minTeamSize || 2;
  const maxSize = activeEvent.maxTeamSize || 4;

  const isMinMet = totalMembers >= minSize;
  const isMaxReached = totalMembers >= maxSize;

  const handleCopyCode = () => {
    if (!currentTeam) return;
    navigator.clipboard.writeText(currentTeam.inviteCode);
    setCopied(true);
    setToast('Invite code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddTeammate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeammate.name.trim() || !newTeammate.email.trim()) {
      setToast('Please provide both name and email for your teammate.');
      return;
    }

    if (isMaxReached) {
      setToast(`Cannot exceed maximum team size of ${maxSize} for ${activeEvent.title}.`);
      return;
    }

    if (teammates.some(m => m.email.toLowerCase() === newTeammate.email.trim().toLowerCase())) {
      setToast('This teammate is already in your squad list.');
      return;
    }

    const addedMember: TeamMember = {
      name: newTeammate.name.trim(),
      email: newTeammate.email.trim(),
      role: newTeammate.role.trim() || 'Core Contributor',
      college: newTeammate.college.trim() || 'University',
      isLeader: false
    };

    const updatedList = [...teammates, addedMember];
    setTeammates(updatedList);

    // Sync with app context
    if (currentTeam) {
      updateTeamMembers(currentTeam.id, [leaderMember, ...updatedList]);
    }

    setNewTeammate({
      name: '',
      email: '',
      role: 'Systems Engineer',
      college: currentUser?.college || 'Stanford University'
    });
    setAddModalOpen(false);
    setToast(`Added ${addedMember.name} to squad!`);
  };

  const handleRemoveTeammate = (emailToRemove: string) => {
    const updatedList = teammates.filter(m => m.email !== emailToRemove);
    setTeammates(updatedList);

    // Sync with app context
    if (currentTeam) {
      updateTeamMembers(currentTeam.id, [leaderMember, ...updatedList]);
    }
    setToast('Teammate removed from squad.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/participant/dashboard')}
            className="flex items-center gap-1.5 text-xs font-mono-tech text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </button>
          <h1 className="text-3xl font-heading font-black text-neutral-900 dark:text-white">
            Team Squad
          </h1>
          <p className="text-xs text-neutral-500 font-mono-tech mt-0.5">
            {activeEvent.title} · Squad Range: {minSize} min to {maxSize} max participants.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/participant/events/[eventId]/submission', { eventId: activeEvent.id })}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Go to Submission
        </Button>
      </div>

      {/* Constraints Validation Banner */}
      <div className={`p-4 rounded-[8px] border text-xs font-mono-tech flex items-center justify-between gap-4 ${
        isMinMet && !isMaxReached
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-400'
          : isMaxReached
          ? 'bg-neutral-100 dark:bg-[#10121C] border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-400'
      }`}>
        <div className="flex items-center gap-2">
          {isMinMet ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          )}
          <span>
            {isMinMet
              ? `Squad size valid (${totalMembers} members). Meets ${activeEvent.title} requirements.`
              : `Squad requires at least ${minSize} members. Add ${minSize - totalMembers} more teammate(s) before freeze.`}
          </span>
        </div>

        <div className="font-bold shrink-0">
          Capacity: {totalMembers} / {maxSize} Max
        </div>
      </div>

      {/* Main Squad Box */}
      <div className="p-6 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#07080E] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div>
            <span className="text-xs font-mono-tech uppercase text-neutral-500">
              SQUAD NAME · TRACK: {currentTeam?.track || 'Distributed Systems'}
            </span>
            <h2 className="text-2xl font-heading font-black text-neutral-900 dark:text-white mt-0.5">
              {currentTeam?.name || 'Nova Dynamics'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-[6px] bg-neutral-50 dark:bg-[#0E101A] border border-neutral-200 dark:border-neutral-800 text-right font-mono-tech text-xs">
              <span className="text-neutral-400 block text-[10px]">INVITE CODE</span>
              <span className="font-bold text-[#00F0FF] dark:text-[#C6FF1A]">{currentTeam?.inviteCode || 'NOVA-8924'}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied' : 'Share'}
            </Button>
          </div>
        </div>

        {/* Squad Members Area: Show Leader ONLY first, with Add Teammate button */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-heading font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              Squad Members ({totalMembers} of {maxSize} Max)
            </h3>

            {/* ADD TEAMMATE BUTTON */}
            <Button
              variant="primary"
              size="sm"
              disabled={isMaxReached}
              onClick={() => setAddModalOpen(true)}
              icon={<UserPlus className="w-3.5 h-3.5" />}
              title={isMaxReached ? `Maximum squad size of ${maxSize} reached` : 'Add Teammate'}
            >
              Add Teammate
            </Button>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-[8px] overflow-hidden">
            {/* 1. SQUAD LEADER (Shown first) */}
            <div className="p-4 bg-neutral-50/70 dark:bg-[#0A0C16] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[6px] bg-[#00F0FF]/15 text-black dark:text-[#00F0FF] flex items-center justify-center font-heading font-black text-sm border border-[#00F0FF]/30">
                  {leaderMember.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900 dark:text-white">
                      {leaderMember.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-amber-400/20 text-amber-500">
                      LEADER
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 font-mono-tech mt-0.5">
                    {leaderMember.role} · {leaderMember.college}
                  </div>
                </div>
              </div>

              <div className="text-right font-mono-tech text-xs text-neutral-400">
                {leaderMember.email}
              </div>
            </div>

            {/* 2. ADDED TEAMMATES WITH REMOVE BUTTON */}
            {teammates.map((member, idx) => (
              <div key={member.email || idx} className="p-4 bg-white dark:bg-[#06070C] flex items-center justify-between gap-4 transition-colors hover:bg-neutral-50 dark:hover:bg-[#0A0C16]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[6px] bg-[#C6FF1A]/15 text-black dark:text-[#C6FF1A] flex items-center justify-center font-heading font-black text-sm border border-[#C6FF1A]/30">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-neutral-900 dark:text-white block">
                      {member.name}
                    </span>
                    <div className="text-xs text-neutral-500 font-mono-tech mt-0.5">
                      {member.role} · {member.college}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono-tech text-neutral-400 hidden sm:inline">
                    {member.email}
                  </span>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => handleRemoveTeammate(member.email)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 text-xs font-mono-tech font-bold transition-colors cursor-pointer"
                    title={`Remove ${member.name} from squad`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}

            {teammates.length === 0 && (
              <div className="p-6 text-center text-xs font-mono-tech text-neutral-500 bg-white dark:bg-[#06070C]">
                Only the team leader is currently assigned. Click <strong>"+ Add Teammate"</strong> to add squad participants within the {minSize}-{maxSize} tournament range.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADD TEAMMATE MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0A0C16] border-2 border-[#00F0FF] dark:border-[#C6FF1A] rounded-[8px] max-w-md w-full p-6 space-y-4 shadow-2xl font-sans animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="text-lg font-heading font-black text-neutral-900 dark:text-white">
                  Add Squad Teammate
                </h3>
                <p className="text-xs text-neutral-500 font-mono-tech">
                  Tournament limit: up to {maxSize} members allowed.
                </p>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTeammate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Teammate Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={newTeammate.name}
                  onChange={e => setNewTeammate({ ...newTeammate, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@berkeley.edu"
                  value={newTeammate.email}
                  onChange={e => setNewTeammate({ ...newTeammate, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Role in Project
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend / Smart Contracts"
                    value={newTeammate.role}
                    onChange={e => setNewTeammate({ ...newTeammate, role: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    University / Org
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UC Berkeley"
                    value={newTeammate.college}
                    onChange={e => setNewTeammate({ ...newTeammate, college: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<UserPlus className="w-3.5 h-3.5" />}
                >
                  Confirm & Add Teammate
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
