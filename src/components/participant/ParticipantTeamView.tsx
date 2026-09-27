import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Users, Copy, Check, UserPlus, Shield, Sparkles } from 'lucide-react';

export const ParticipantTeamView: React.FC = () => {
  const { participantTeam, setToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(participantTeam.inviteCode);
    setCopied(true);
    setToast('Invite code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail) return;
    setToast(`Invitation dispatch queued for ${newMemberEmail}`);
    setNewMemberEmail('');
    setNewMemberRole('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
          Team Roster & Collaborators
        </h2>
        <p className="text-sm text-neutral-500 mt-0.5">
          Manage your squad members. Identities are shielded until official competition completion.
        </p>
      </div>

      {/* Team Profile Banner */}
      <div className="p-6 rounded-md border border-neutral-200 dark:border-[#222436] bg-white dark:bg-[#0E0E14] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-tech text-neutral-400 uppercase">ACTIVE SQUAD</span>
            <span className="text-xs font-mono-tech text-neutral-500">· TRACK: {participantTeam.track}</span>
          </div>
          <h3 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            {participantTeam.name}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            {participantTeam.members.length} verified team contributors
          </p>
        </div>

        {/* Invite Code Widget */}
        <div className="flex items-center gap-3 p-3 rounded-md bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800">
          <div>
            <span className="text-[10px] font-mono-tech uppercase text-neutral-500 block">
              INVITE CODE
            </span>
            <code className="font-mono-tech font-bold text-sm text-[#2F5CFF] dark:text-[#C6FF1A]">
              {participantTeam.inviteCode}
            </code>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyInvite}
            icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied' : 'Share'}
          </Button>
        </div>
      </div>

      {/* Member Roster */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm space-y-4">
        <h4 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Active Members ({participantTeam.members.length})
        </h4>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {participantTeam.members.map((member: { name: string; email?: string; role?: string; isLeader?: boolean }, i: number) => (
            <div
              key={i}
              className="py-3 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-heading font-bold text-sm text-neutral-800 dark:text-white">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                    <span>{member.name}</span>
                    {member.isLeader && (
                      <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#2F5CFF]/10 text-[#2F5CFF] dark:bg-[#C6FF1A]/15 dark:text-[#C6FF1A] font-bold">
                        LEADER
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono-tech">
                    {member.email} · {member.role}
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono-tech text-emerald-600 dark:text-emerald-400">
                VERIFIED
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Collaborator Form */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md p-6 shadow-sm space-y-4">
        <h4 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Invite Teammate via Email
        </h4>
        <form onSubmit={handleInvite} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="email"
            value={newMemberEmail}
            onChange={e => setNewMemberEmail(e.target.value)}
            placeholder="collaborator@domain.edu"
            className="sm:col-span-2 px-3 py-2 text-sm bg-neutral-50 dark:bg-[#15151F] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#C6FF1A]"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={<UserPlus className="w-4 h-4" />}
          >
            Send Invite
          </Button>
        </form>
      </div>
    </div>
  );
};
