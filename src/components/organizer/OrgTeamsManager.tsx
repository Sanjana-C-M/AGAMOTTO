import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { ParticipantTeam } from '../../types';
import { Users, ArrowLeft, Shield, AlertTriangle, CheckCircle2, UserMinus, Plus, Edit2 } from 'lucide-react';

export const OrgTeamsManager: React.FC = () => {
  const { teams, activeEvent, updateTeamMembers, navigate, setToast } = useApp();
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  const minSize = activeEvent.minTeamSize || 2;
  const maxSize = activeEvent.maxTeamSize || 4;

  const handleRemoveMember = (team: ParticipantTeam, memberIndex: number) => {
    if (team.members.length <= 1) {
      setToast('Cannot remove the sole member of a squad.');
      return;
    }
    const updated = team.members.filter((_, idx) => idx !== memberIndex);
    updateTeamMembers(team.id, updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/organizer/events/[eventId]', { eventId: activeEvent.id })}
            className="flex items-center gap-1.5 text-xs font-mono-tech text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Event Dashboard</span>
          </button>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Team Squads & Roster Governance
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Manage team rosters and enforce team size rules ({minSize} min / {maxSize} max members per squad).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map(team => {
          const count = team.members.length;
          const isUnderMin = count < minSize;
          const isOverMax = count > maxSize;

          return (
            <div
              key={team.id}
              className="p-5 rounded-md border border-neutral-200 dark:border-[#1A1A28] bg-white dark:bg-[#08080E] flex flex-col justify-between shadow-sm space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
                      {team.name}
                    </h3>
                    <span className="text-xs font-mono-tech text-neutral-500">
                      Track: {team.track}
                    </span>
                  </div>
                  <span className="font-mono-tech text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#151522] text-[#2F5CFF] dark:text-[#00F0FF]">
                    {team.inviteCode}
                  </span>
                </div>

                {/* Team size compliance badge */}
                <div className="mt-2">
                  {isUnderMin ? (
                    <span className="text-[11px] font-mono-tech font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Under Min Size ({count}/{minSize})
                    </span>
                  ) : isOverMax ? (
                    <span className="text-[11px] font-mono-tech font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Over Max Size ({count}/{maxSize})
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono-tech font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Size Compliant ({count}/{maxSize})
                    </span>
                  )}
                </div>

                {/* Member Roster List */}
                <div className="mt-4 space-y-2 border-t border-neutral-100 dark:border-neutral-800 pt-3">
                  <div className="text-[10px] font-mono-tech uppercase font-bold text-neutral-400">
                    Roster ({count} members)
                  </div>
                  {team.members.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-2 rounded bg-neutral-50 dark:bg-[#12121E] text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-neutral-900 dark:text-white">
                          {m.name} {m.isLeader && <span className="text-[9px] text-[#2F5CFF] dark:text-[#C6FF1A] font-bold">[LEAD]</span>}
                        </div>
                        <div className="text-[11px] text-neutral-500 font-mono-tech">
                          {m.role} · {m.college || 'University'}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveMember(team, mIdx)}
                        className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer"
                        title="Remove member from team"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-xs font-mono-tech text-neutral-400">
                Squad ID: {team.id}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
