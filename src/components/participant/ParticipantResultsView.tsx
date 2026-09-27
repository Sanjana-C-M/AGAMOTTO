import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Star, MessageSquare, BarChart2, ShieldCheck, Flame, Sparkles } from 'lucide-react';

export const ParticipantResultsView: React.FC = () => {
  const { projects, activeEvent } = useApp();

  // Sort projects by normalized score descending for leaderboard
  const sortedProjects = [...projects].sort((a, b) => b.normalizedScore - a.normalizedScore);

  // Collect judge remarks across all projects for moving cards
  const judgeCards = [
    {
      type: 'remark',
      teamId: 'PRJ-024',
      author: 'Judge Panel Alpha (Senior Cryptographer)',
      text: 'Exceptional formal verification of zero-knowledge circuits. The mathematical proofs hold without any edge-case leakage.',
      tag: 'Cryptographic Integrity'
    },
    {
      type: 'raw',
      teamId: 'PRJ-024',
      title: 'Raw Score Average',
      value: '9.20 / 10.0',
      subtitle: 'Evaluator Mean: 8.65 · Harshness Adj: +0.55',
      tag: 'Raw Average'
    },
    {
      type: 'zscore',
      teamId: 'PRJ-024',
      title: 'Normalized Z-Score',
      value: '+1.84σ',
      subtitle: '96.4 Normalized Points · 99.2th Percentile',
      tag: 'Standardized'
    },
    {
      type: 'remark',
      teamId: 'PRJ-019',
      author: 'Judge Panel Beta (Distributed Systems Lead)',
      text: 'Benchmark latency demonstrates 4.2x throughput speedup over standard state machines. Flawless stress testing under synthetic packet loss.',
      tag: 'System Performance'
    },
    {
      type: 'raw',
      teamId: 'PRJ-019',
      title: 'Raw Score Average',
      value: '8.85 / 10.0',
      subtitle: 'Evaluator Mean: 7.90 · Strict Judge Neutralized',
      tag: 'Raw Average'
    },
    {
      type: 'zscore',
      teamId: 'PRJ-019',
      title: 'Normalized Z-Score',
      value: '+1.52σ',
      subtitle: '92.1 Normalized Points · 97.4th Percentile',
      tag: 'Standardized'
    },
    {
      type: 'remark',
      teamId: 'PRJ-008',
      author: 'Judge Panel Gamma (AI Systems Researcher)',
      text: 'Ingenious heuristic for multi-agent negotiation. Robust guardrails prevent infinite deliberation cycles in adversarial states.',
      tag: 'AI Architecture'
    },
    {
      type: 'raw',
      teamId: 'PRJ-008',
      title: 'Raw Score Average',
      value: '8.60 / 10.0',
      subtitle: 'Evaluator Mean: 8.10 · 3-way consensus',
      tag: 'Raw Average'
    },
    {
      type: 'zscore',
      teamId: 'PRJ-008',
      title: 'Normalized Z-Score',
      value: '+1.21σ',
      subtitle: '88.7 Normalized Points · 94.8th Percentile',
      tag: 'Standardized'
    },
    {
      type: 'remark',
      teamId: 'PRJ-014',
      author: 'Judge Panel Delta (Security Specialist)',
      text: 'Very thorough memory safety model in Rust. Sandbox isolation prevented simulated kernel escalation attacks effectively.',
      tag: 'Security & Safety'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* 1. MOVING CARDS: RAW SCORE AVERAGE, NORMALIZED Z-SCORE, AND JUDGE REMARKS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00F0FF] dark:text-[#C6FF1A]" />
            <h2 className="text-xs font-mono-tech uppercase font-bold tracking-widest text-neutral-500">
              TELEMETRY & EVALUATION STREAM (RAW AVERAGE · Z-SCORE · JUDGE REMARKS)
            </h2>
          </div>
          <span className="text-[10px] font-mono-tech text-neutral-400">
            Hover card to pause continuous stream
          </span>
        </div>

        {/* Animated Moving Cards Marquee */}
        <div className="relative w-full overflow-hidden py-2 mask-gradient">
          <div className="animate-marquee flex items-center gap-4">
            {/* Duplicated list to create infinite seamless glide */}
            {[...judgeCards, ...judgeCards].map((card, idx) => (
              <div
                key={idx}
                className="w-72 sm:w-80 shrink-0 p-4 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#07080E] shadow-sm hover:border-[#00F0FF] dark:hover:border-[#C6FF1A] transition-all flex flex-col justify-between h-44 text-left select-none"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 font-mono-tech text-[10px]">
                    <span className="font-bold text-neutral-900 dark:text-white px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#121422]">
                      TEAM ID: {card.teamId}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                      card.type === 'raw'
                        ? 'bg-[#00F0FF]/15 text-neutral-900 dark:text-[#00F0FF]'
                        : card.type === 'zscore'
                        ? 'bg-[#C6FF1A]/15 text-neutral-900 dark:text-[#C6FF1A]'
                        : 'bg-amber-400/15 text-amber-500'
                    }`}>
                      {card.tag}
                    </span>
                  </div>

                  {card.type === 'remark' ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[11px] font-mono-tech text-neutral-400">
                        <MessageSquare className="w-3 h-3 text-[#00F0FF]" />
                        <span>{card.author}</span>
                      </div>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 italic line-clamp-3 font-sans leading-relaxed pt-1">
                        "{card.text}"
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1 pt-1">
                      <span className="text-xs font-mono-tech text-neutral-400 block uppercase">
                        {card.title}
                      </span>
                      <div className={`font-mono-tech text-3xl font-black ${
                        card.type === 'zscore' ? 'text-[#00F0FF] dark:text-[#C6FF1A]' : 'text-neutral-900 dark:text-white'
                      }`}>
                        {card.value}
                      </div>
                      <p className="text-[11px] text-neutral-500 font-mono-tech">
                        {card.subtitle}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[10px] font-mono-tech text-neutral-400 flex items-center justify-between">
                  <span>Double-Blind Verified</span>
                  <span className="text-emerald-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Certified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. THE ACTUAL LEADERBOARD WITH TEAM ID AND POINTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-[#1E2032]">
          <div>
            <h1 className="text-3xl font-heading font-black text-neutral-900 dark:text-white">
              Official Leaderboard
            </h1>
            <p className="text-xs text-neutral-500 font-mono-tech mt-0.5">
              Rankings determined by standardized score normalization.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono-tech text-xs bg-neutral-100 dark:bg-[#0C0E1A] px-3 py-1.5 rounded-[6px] border border-neutral-200 dark:border-[#1E2032]">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-neutral-900 dark:text-white">
              {sortedProjects.length} Competing Squads
            </span>
          </div>
        </div>

        {/* Clean, Focused Leaderboard Table */}
        <div className="rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#07080E] overflow-hidden shadow-xs">
          <div className="grid grid-cols-12 px-6 py-3.5 bg-neutral-50 dark:bg-[#0A0C16] border-b border-neutral-200 dark:border-[#1E2032] font-mono-tech text-xs font-bold text-neutral-500 uppercase tracking-wider">
            <div className="col-span-2 sm:col-span-1">Rank</div>
            <div className="col-span-6 sm:col-span-5">Team ID</div>
            <div className="hidden sm:block sm:col-span-3">Track / Category</div>
            <div className="col-span-4 sm:col-span-3 text-right">Points</div>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {sortedProjects.map((p, index) => {
              const rank = index + 1;
              const isFirst = rank === 1;
              const isSecond = rank === 2;
              const isThird = rank === 3;

              return (
                <div
                  key={p.id}
                  className={`grid grid-cols-12 px-6 py-4 items-center transition-colors font-mono-tech text-sm ${
                    isFirst
                      ? 'bg-amber-400/5 hover:bg-amber-400/10'
                      : 'hover:bg-neutral-50 dark:hover:bg-[#0A0C16]'
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-2 sm:col-span-1 flex items-center">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-[6px] font-black text-xs ${
                      isFirst
                        ? 'bg-amber-400 text-black shadow-xs'
                        : isSecond
                        ? 'bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white'
                        : isThird
                        ? 'bg-amber-700/30 text-amber-500'
                        : 'text-neutral-500'
                    }`}>
                      #{rank}
                    </span>
                  </div>

                  {/* Team ID */}
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                    <div>
                      <span className="font-mono-tech font-black text-base text-neutral-900 dark:text-white tracking-wide block">
                        {p.id}
                      </span>
                      <span className="text-xs text-neutral-500 font-sans block">
                        {activeEvent.identityRevealed ? p.teamName : `Blind Codename: ${p.codeName}`}
                      </span>
                    </div>
                  </div>

                  {/* Track */}
                  <div className="hidden sm:block sm:col-span-3">
                    <span className="text-xs px-2.5 py-1 rounded-[6px] bg-neutral-100 dark:bg-[#121422] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {p.track}
                    </span>
                  </div>

                  {/* Points */}
                  <div className="col-span-4 sm:col-span-3 text-right">
                    <div className="font-heading font-black text-xl text-[#00F0FF] dark:text-[#C6FF1A]">
                      {p.normalizedScore.toFixed(1)} <span className="text-xs font-mono-tech font-normal text-neutral-500">pts</span>
                    </div>
                    <span className="text-[11px] text-neutral-400 block font-mono-tech">
                      Z: {p.zScoreRaw > 0 ? `+${p.zScoreRaw}` : p.zScoreRaw}σ
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
