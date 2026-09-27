import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { EventConfig } from '../../types';
import {
  Layers,
  Plus,
  ArrowRight,
  Calendar,
  Users,
  Trophy,
  CheckCircle2,
  Lock,
  MoreVertical,
  ExternalLink
} from 'lucide-react';

export const OrgEventsList: React.FC = () => {
  const { events, navigate, setActiveEventId } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Managed Competitions Registry
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Overview of all hackathons and competitions managed under your organizer credentials.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/organizer/events/new')}
          icon={<Plus className="w-4 h-4" />}
        >
          Create New Competition
        </Button>
      </div>

      {/* Events Table / Grid */}
      <div className="bg-white dark:bg-[#08080E] border border-neutral-200 dark:border-[#1A1A28] rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-[#12121E] border-b border-neutral-200 dark:border-[#1E1E2C] font-mono-tech text-xs uppercase text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">Event Title & Identifier</th>
                <th className="py-3.5 px-4">Access Code</th>
                <th className="py-3.5 px-4">Timeline</th>
                <th className="py-3.5 px-4">Current Phase</th>
                <th className="py-3.5 px-4">Participants</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-[#1A1A28]">
              {events.map(ev => {
                return (
                  <tr
                    key={ev.id}
                    className="hover:bg-neutral-50/70 dark:hover:bg-[#0F101A] transition-colors"
                  >
                    {/* Title */}
                    <td className="py-4 px-4">
                      <div className="font-heading font-bold text-neutral-900 dark:text-white text-base">
                        {ev.title}
                      </div>
                      <div className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                        {ev.tagline}
                      </div>
                    </td>

                    {/* Code */}
                    <td className="py-4 px-4 font-mono-tech text-xs">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#151522] text-[#2F5CFF] dark:text-[#00F0FF] font-bold">
                        {ev.eventCode}
                      </span>
                    </td>

                    {/* Timeline */}
                    <td className="py-4 px-4 font-mono-tech text-xs text-neutral-600 dark:text-neutral-400">
                      {ev.startDate || 'Sep 20'} — {ev.endDate || 'Oct 02, 2026'}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono-tech font-bold uppercase ${
                        ev.status === 'judging'
                          ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30'
                          : ev.status === 'registration' || ev.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                      }`}>
                        {ev.status}
                      </span>
                    </td>

                    {/* Participants */}
                    <td className="py-4 px-4 font-mono-tech text-xs text-neutral-700 dark:text-neutral-300">
                      {ev.participantsCount || 240} registered
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setActiveEventId(ev.id);
                            navigate('/organizer/events/[eventId]', { eventId: ev.id });
                          }}
                          icon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          Manage Portal
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
