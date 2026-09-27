import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Check,
  X,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

export const OrgParticipantsQueue: React.FC = () => {
  const { participants, approveParticipant, navigate, activeEventId } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');

  const filtered = participants.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.college.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  const pendingCount = participants.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/organizer/events/[eventId]', { eventId: activeEventId })}
            className="flex items-center gap-1.5 text-xs font-mono-tech text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Event Dashboard</span>
          </button>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Participants Registry & Approval Queue
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            {participants.length} registered competitors · {pendingCount} awaiting approval review
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by participant name, university, or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-[#1E1E2C] rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
          />
        </div>

        <div className="flex items-center gap-1.5 font-mono-tech text-xs w-full sm:w-auto">
          {['all', 'approved', 'pending'].map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab as any)}
              className={`px-3 py-1.5 rounded-md font-medium uppercase transition-colors ${
                statusFilter === tab
                  ? 'bg-neutral-900 text-white dark:bg-[#00F0FF] dark:text-black font-bold'
                  : 'bg-neutral-100 dark:bg-[#12121E] text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {tab} ({tab === 'all' ? participants.length : participants.filter(p => p.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#08080E] border border-neutral-200 dark:border-[#1A1A28] rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-[#12121E] border-b border-neutral-200 dark:border-[#1E1E2C] font-mono-tech text-xs uppercase text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">Competitor Name</th>
                <th className="py-3.5 px-4">University & Degree</th>
                <th className="py-3.5 px-4">Team Squad</th>
                <th className="py-3.5 px-4">Registered Date</th>
                <th className="py-3.5 px-4">Approval Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-[#1A1A28]">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-neutral-50/70 dark:hover:bg-[#0F101A] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      {p.name}
                    </div>
                    <div className="text-xs text-neutral-500 font-mono-tech">
                      {p.email}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs">
                    <div className="text-neutral-800 dark:text-neutral-200 font-medium">
                      {p.college}
                    </div>
                    <div className="text-neutral-500 font-mono-tech">
                      {p.degree} ({p.graduationYear})
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono-tech text-xs">
                    {p.teamName ? (
                      <span className="font-bold text-[#2F5CFF] dark:text-[#C6FF1A]">
                        {p.teamName}
                      </span>
                    ) : (
                      <span className="text-neutral-400">Solo / Seeking Team</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono-tech text-xs text-neutral-500">
                    {p.registeredAt}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono-tech font-bold uppercase ${
                      p.status === 'approved'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    }`}>
                      {p.status === 'approved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {p.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {p.status === 'pending' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => approveParticipant(p.id)}
                        icon={<Check className="w-3.5 h-3.5" />}
                      >
                        Approve
                      </Button>
                    ) : (
                      <span className="text-xs font-mono-tech text-neutral-400">Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
