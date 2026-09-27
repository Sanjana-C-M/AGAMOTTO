import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Code2,
  Scale,
  Shield,
  ArrowRight,
  Sparkles,
  BarChart3,
  FileCode2,
  Lock,
  Compass,
  Terminal,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, isDarkMode } = useApp();

  // Interactive mouse tracking for colorful gradient on hover over the app name AGAMOTTO
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setHoverPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverPos(null);
  };

  // Interactive mouse tracking for colorful gradient on hover over the tagline
  const [taglineHoverPos, setTaglineHoverPos] = useState<{ x: number; y: number } | null>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  const handleTaglineMouseMove = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (taglineRef.current) {
      const rect = taglineRef.current.getBoundingClientRect();
      setTaglineHoverPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleTaglineMouseLeave = () => {
    setTaglineHoverPos(null);
  };

  // Interactive micro-demonstration of Z-Score normalization
  const [harshJudgeScore, setHarshJudgeScore] = useState<number>(8.0);
  const [lenientJudgeScore, setLenientJudgeScore] = useState<number>(9.2);

  const harshMean = 6.8;
  const harshStd = 0.9;
  const lenientMean = 8.6;
  const lenientStd = 0.8;

  const harshZ = Number(((harshJudgeScore - harshMean) / harshStd).toFixed(2));
  const lenientZ = Number(((lenientJudgeScore - lenientMean) / lenientStd).toFixed(2));

  // ABOUT SECTION TYPEWRITER ENGINE
  const ABOUT_ITEMS = [
    {
      num: '01',
      command: 'agamotto audit --policy=double_blind',
      title: 'Blind by default',
      desc: 'Every project is reviewed without names, colleges, or reputations attached ,judges see the work, nothing else.',
      badge: 'IDENTITY SALTED & STRIPPED',
      accentColor: '#00F0FF'
    },
    {
      num: '02',
      command: 'agamotto audit --host=sovereign_infra',
      title: 'Self-hosted, always yours',
      desc: 'No vendor lock-in, no external cloud dependency. Run it on your own infrastructure and own your data end to end.',
      badge: 'AIR-GAPPED & INDEPENDENT',
      accentColor: '#C6FF1A'
    },
    {
      num: '03',
      command: 'agamotto audit --explain=zscore_consensus',
      title: 'Every verdict, explained',
      desc: 'Scores, conflicts, and normalization are all traceable ,so a result isn\'t just announced, it\'s proven.',
      badge: 'MATHEMATICALLY VERIFIED',
      accentColor: '#FF2ED1'
    }
  ];

  const [activeAboutIndex, setActiveAboutIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDesc, setTypedDesc] = useState('');
  const [typingPhase, setTypingPhase] = useState<'title' | 'desc' | 'done'>('title');
  const [autoPlay, setAutoPlay] = useState(true);

  // Typewriter effect logic
  useEffect(() => {
    const currentItem = ABOUT_ITEMS[activeAboutIndex];
    setTypedTitle('');
    setTypedDesc('');
    setTypingPhase('title');

    let titleIdx = 0;
    let descIdx = 0;
    let timer: NodeJS.Timeout;

    const typeTitle = () => {
      if (titleIdx <= currentItem.title.length) {
        setTypedTitle(currentItem.title.slice(0, titleIdx));
        titleIdx++;
        timer = setTimeout(typeTitle, 30);
      } else {
        setTypingPhase('desc');
        timer = setTimeout(typeDesc, 140);
      }
    };

    const typeDesc = () => {
      if (descIdx <= currentItem.desc.length) {
        setTypedDesc(currentItem.desc.slice(0, descIdx));
        descIdx++;
        timer = setTimeout(typeDesc, 20);
      } else {
        setTypingPhase('done');
        if (autoPlay) {
          timer = setTimeout(() => {
            setActiveAboutIndex(prev => (prev + 1) % ABOUT_ITEMS.length);
          }, 3800);
        }
      }
    };

    timer = setTimeout(typeTitle, 80);

    return () => clearTimeout(timer);
  }, [activeAboutIndex, autoPlay]);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden flex flex-col items-center text-center">
        {/* Subtle ambient light glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00F0FF]/10 dark:bg-[#C6FF1A]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* FLOATING INTERACTIVE ROLE ICONS (PARTICIPANT, JUDGE, ORGANIZER) */}
        {/* Icon 1: Participant (Code2) - Floating Top Left */}
        <div className="hidden sm:block absolute top-14 left-[6%] md:left-[10%] lg:left-[14%] z-20 animate-float-1">
          <button
            onClick={() => navigate('/roles/participant')}
            className="group relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-[8px] bg-white/90 dark:bg-[#08080E]/90 border border-neutral-300 dark:border-[#1E2032] shadow-md hover:border-[#00F0FF] dark:hover:border-[#00F0FF] hover:scale-125 hover:shadow-[#00F0FF]/30 hover:shadow-lg transition-all duration-300 cursor-pointer backdrop-blur-xs"
            title="Participant Portal"
            aria-label="Participant Portal"
          >
            <Code2 className="w-4 h-4 md:w-5 md:h-5 text-neutral-800 dark:text-[#00F0FF] group-hover:rotate-12 group-hover:scale-110 transition-transform" />
            
            {/* Interactive tooltip pill on hover */}
            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 px-2 py-0.5 rounded-[4px] bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-mono-tech text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-md">
              Participant
            </span>
          </button>
        </div>

        {/* Icon 2: Judge (Scale) - Floating Top Right */}
        <div className="hidden sm:block absolute top-16 right-[6%] md:right-[10%] lg:right-[14%] z-20 animate-float-2">
          <button
            onClick={() => navigate('/roles/judge')}
            className="group relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-[8px] bg-white/90 dark:bg-[#08080E]/90 border border-neutral-300 dark:border-[#1E2032] shadow-md hover:border-[#C6FF1A] dark:hover:border-[#C6FF1A] hover:scale-125 hover:shadow-[#C6FF1A]/30 hover:shadow-lg transition-all duration-300 cursor-pointer backdrop-blur-xs"
            title="Judge Blind Portal"
            aria-label="Judge Blind Portal"
          >
            <Scale className="w-4 h-4 md:w-5 md:h-5 text-neutral-800 dark:text-[#C6FF1A] group-hover:-rotate-12 group-hover:scale-110 transition-transform" />

            {/* Interactive tooltip pill on hover */}
            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 px-2 py-0.5 rounded-[4px] bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-mono-tech text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-md">
              Judge
            </span>
          </button>
        </div>

        {/* Icon 3: Organizer (Shield) - Floating Lower Left/Right flank */}
        <div className="hidden sm:block absolute top-72 right-[4%] md:right-[7%] lg:right-[11%] z-20 animate-float-3">
          <button
            onClick={() => navigate('/roles/organizer')}
            className="group relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-[8px] bg-white/90 dark:bg-[#08080E]/90 border border-neutral-300 dark:border-[#1E2032] shadow-md hover:border-[#FF2ED1] dark:hover:border-[#FF2ED1] hover:scale-125 hover:shadow-[#FF2ED1]/30 hover:shadow-lg transition-all duration-300 cursor-pointer backdrop-blur-xs"
            title="Organizer Command Suite"
            aria-label="Organizer Command Suite"
          >
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-neutral-800 dark:text-[#FF2ED1] group-hover:rotate-12 group-hover:scale-110 transition-transform" />

            {/* Interactive tooltip pill on hover */}
            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 px-2 py-0.5 rounded-[4px] bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-mono-tech text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-md">
              Organizer
            </span>
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          {/* APP NAME WITH HAVOC FONT & SMOOTH HOVER GRADIENT */}
          <div className="relative inline-block my-2">
            <h1
              ref={titleRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="select-none text-6xl sm:text-8xl md:text-9xl font-havoc font-black tracking-wider cursor-crosshair inline-block py-2 leading-none"
              style={{
                backgroundImage: hoverPos
                  ? isDarkMode
                    ? `radial-gradient(circle 220px at ${hoverPos.x}px ${hoverPos.y}px, #00F0FF 0%, #FF2ED1 25%, #C6FF1A 50%, #9D4EDD 75%, #FFFFFF 100%)`
                    : `radial-gradient(circle 220px at ${hoverPos.x}px ${hoverPos.y}px, #00F0FF 0%, #FF2ED1 25%, #C6FF1A 50%, #9D4EDD 75%, #000000 100%)`
                  : undefined,
                WebkitBackgroundClip: hoverPos ? 'text' : undefined,
                WebkitTextFillColor: hoverPos ? 'transparent' : undefined,
                color: hoverPos ? 'transparent' : isDarkMode ? '#FFFFFF' : '#000000'
              }}
            >
              AGAMOTTO
            </h1>
          </div>

          {/* EXACT REQUESTED TAGLINE WITH THE SAME COLORFUL SPOTLIGHT HOVER EFFECT (BLACK TEXT, NO ORANGE) */}
          <div className="relative max-w-3xl mx-auto my-3">
            <p
              ref={taglineRef}
              onMouseMove={handleTaglineMouseMove}
              onMouseLeave={handleTaglineMouseLeave}
              className="select-none text-xl sm:text-2xl md:text-3xl font-heading font-medium tracking-tight leading-relaxed cursor-crosshair py-1"
              style={{
                backgroundImage: taglineHoverPos
                  ? isDarkMode
                    ? `radial-gradient(circle 180px at ${taglineHoverPos.x}px ${taglineHoverPos.y}px, #00F0FF 0%, #FF2ED1 25%, #C6FF1A 50%, #9D4EDD 75%, #FFFFFF 100%)`
                    : `radial-gradient(circle 180px at ${taglineHoverPos.x}px ${taglineHoverPos.y}px, #00F0FF 0%, #FF2ED1 25%, #C6FF1A 50%, #9D4EDD 75%, #000000 100%)`
                  : undefined,
                WebkitBackgroundClip: taglineHoverPos ? 'text' : undefined,
                WebkitTextFillColor: taglineHoverPos ? 'transparent' : undefined,
                color: taglineHoverPos ? 'transparent' : isDarkMode ? '#FFFFFF' : '#000000'
              }}
            >
              Submit your idea. Step back. Let it be judged for exactly what it is
            </p>
          </div>

          {/* Role Access Navigation Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
            <button
              onClick={() => navigate('/roles/participant')}
              className="p-4 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#07080E] hover:border-[#00F0FF] dark:hover:border-[#C6FF1A] transition-all text-left group shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-[6px] bg-[#00F0FF]/15 text-black dark:text-[#00F0FF]">
                  <Code2 className="w-4 h-4" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
                Participant
              </h3>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">
                Submit projects with double-blind anonymity & view normalized standings.
              </p>
            </button>

            <button
              onClick={() => navigate('/roles/judge')}
              className="p-4 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#07080E] hover:border-[#00F0FF] dark:hover:border-[#C6FF1A] transition-all text-left group shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-[6px] bg-[#C6FF1A]/15 text-black dark:text-[#C6FF1A]">
                  <Scale className="w-4 h-4" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
                Judge
              </h3>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">
                Evaluate blind queues with multi-criteria rubrics & conflict fencing.
              </p>
            </button>

            <button
              onClick={() => navigate('/roles/organizer')}
              className="p-4 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#07080E] hover:border-[#00F0FF] dark:hover:border-[#C6FF1A] transition-all text-left group shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-[6px] bg-[#00F0FF]/15 text-black dark:text-[#00F0FF]">
                  <Shield className="w-4 h-4" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
                Organizer
              </h3>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">
                Deploy tournaments, rubric weights, real-time telemetry & unmasking.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL NORMALIZATION DEMO */}
      <section className="py-16 bg-neutral-50 dark:bg-[#06070B] border-y border-neutral-200 dark:border-[#141420] rounded-[8px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-mono-tech uppercase font-bold text-[#00F0FF] dark:text-[#C6FF1A] mb-2">
              VARIANCE ELIMINATED
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white">
              Standardized Z-Score Normalization
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-sans">
              Interactive demonstration of how strict versus lenient evaluator distributions are equalized mathematically.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A0C14] border border-neutral-200 dark:border-[#1C1F30] rounded-[8px] shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 font-mono-tech">
                      Strict Evaluator (Historical μ: 6.8, σ: 0.9)
                    </span>
                    <span className="font-mono-tech text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded font-bold text-[#00F0FF]">
                      Raw: {harshJudgeScore.toFixed(1)} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="10"
                    step="0.1"
                    value={harshJudgeScore}
                    onChange={e => setHarshJudgeScore(parseFloat(e.target.value))}
                    className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 font-mono-tech">
                      Lenient Evaluator (Historical μ: 8.6, σ: 0.8)
                    </span>
                    <span className="font-mono-tech text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded font-bold text-[#C6FF1A]">
                      Raw: {lenientJudgeScore.toFixed(1)} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="10"
                    step="0.1"
                    value={lenientJudgeScore}
                    onChange={e => setLenientJudgeScore(parseFloat(e.target.value))}
                    className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#C6FF1A]"
                  />
                </div>
              </div>

              {/* Real-time Math Output Card */}
              <div className="p-5 rounded-[8px] bg-neutral-50 dark:bg-[#07080F] border border-neutral-200 dark:border-[#1E2032] space-y-4">
                <div className="flex items-center justify-between text-xs font-mono-tech border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <span className="text-neutral-500">METRIC</span>
                  <span className="text-neutral-500">STANDARDIZED Z-SCORE</span>
                </div>

                <div className="flex items-center justify-between font-mono-tech">
                  <div>
                    <span className="text-sm font-bold block text-neutral-900 dark:text-white">Strict Judge Output</span>
                    <span className="text-xs text-neutral-500">Raw: {harshJudgeScore.toFixed(1)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#00F0FF]">
                      {harshZ > 0 ? `+${harshZ}` : harshZ}σ
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      Z = ({harshJudgeScore} - {harshMean}) / {harshStd}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono-tech border-t border-neutral-200 dark:border-neutral-800/80 pt-2">
                  <div>
                    <span className="text-sm font-bold block text-neutral-900 dark:text-white">Lenient Judge Output</span>
                    <span className="text-xs text-neutral-500">Raw: {lenientJudgeScore.toFixed(1)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#C6FF1A]">
                      {lenientZ > 0 ? `+${lenientZ}` : lenientZ}σ
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      Z = ({lenientJudgeScore} - {lenientMean}) / {lenientStd}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-400 font-mono-tech">
                  <strong>INTEGRITY GUARANTEE:</strong> Both project outputs are shifted to an identical standard normal distribution. Evaluator harshness penalty is neutralized to 0.00%.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION - INNOVATIVE TYPEWRITER & EDITORIAL PRESENTATION (NO CARD LAYOUT) */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00F0FF]/5 dark:bg-[#C6FF1A]/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Heading and Short Intro */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-neutral-900 dark:text-white">
              Judging shouldn't be a{' '}
              <span className="relative inline-block px-3 py-1 rounded-[6px] bg-neutral-900 text-white dark:bg-white dark:text-black font-mono-tech shadow-md">
                black box.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed pt-2">
              Most hackathon platforms treat judging as an afterthought , a form bolted onto a leaderboard. We built AGAMOTTO to make it the center of the product.
            </p>
          </div>

          {/* INTERACTIVE TYPEWRITER STREAM CONSOLE (Replaces card layout) */}
          <div className="rounded-[8px] border-2 border-neutral-800 dark:border-[#1E2032] bg-neutral-950 text-white shadow-2xl overflow-hidden font-mono-tech">
            {/* Terminal Chrome Bar */}
            <div className="px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="text-neutral-400 font-bold hidden sm:inline">
                  agamotto-kernel // core-architecture.log
                </span>
              </div>

              {/* Console Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] transition-colors cursor-pointer"
                  title={autoPlay ? 'Pause auto-cycling' : 'Resume auto-cycling'}
                >
                  {autoPlay ? <Pause className="w-3 h-3 text-[#C6FF1A]" /> : <Play className="w-3 h-3 text-[#00F0FF]" />}
                  <span>{autoPlay ? 'Auto: ON' : 'Paused'}</span>
                </button>
                <button
                  onClick={() => {
                    const next = (activeAboutIndex + 1) % ABOUT_ITEMS.length;
                    setActiveAboutIndex(next);
                  }}
                  className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                  title="Next principle"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Interactive Principle Selector Tabs */}
            <div className="grid grid-cols-3 border-b border-neutral-800 text-xs">
              {ABOUT_ITEMS.map((item, idx) => (
                <button
                  key={item.num}
                  onClick={() => setActiveAboutIndex(idx)}
                  className={`py-3 px-2 sm:px-4 text-left transition-all cursor-pointer border-b-2 ${
                    activeAboutIndex === idx
                      ? 'border-[#00F0FF] bg-neutral-900/60 text-white font-bold'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                  }`}
                >
                  <span className="truncate block font-mono-tech text-xs sm:text-sm">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Live Typing Execution Area */}
            <div className="p-6 sm:p-8 space-y-5 min-h-[200px] flex flex-col justify-between">
              <div className="space-y-3">
                {/* Command prompt invocation */}
                <div className="text-xs text-neutral-400 flex items-center gap-2">
                  <span className="text-[#C6FF1A] font-bold">root@agamotto:~$</span>
                  <span className="text-neutral-300">{ABOUT_ITEMS[activeAboutIndex].command}</span>
                </div>

                {/* Typed Title */}
                <div className="pt-2">
                  <h3
                    className="text-2xl sm:text-3xl font-heading font-black tracking-tight flex items-center gap-1.5"
                    style={{ color: ABOUT_ITEMS[activeAboutIndex].accentColor }}
                  >
                    <span>{typedTitle}</span>
                    {typingPhase === 'title' && (
                      <span className="inline-block text-[#00F0FF] animate-cursor-blink leading-none font-mono">
                        █
                      </span>
                    )}
                  </h3>
                </div>

                {/* Typed Description Body */}
                <div className="pt-1">
                  <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed min-h-[2.5rem]">
                    <span>{typedDesc}</span>
                    {(typingPhase === 'desc' || typingPhase === 'done') && (
                      <span className="inline-block text-[#C6FF1A] animate-cursor-blink ml-1 leading-none font-mono">
                        █
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Live Telemetry / Verification Stamp */}
              <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-neutral-300">
                    STATUS: {ABOUT_ITEMS[activeAboutIndex].badge}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 font-sans">
                  Click tabs or pause button to inspect each architectural pillar
                </div>
              </div>
            </div>
          </div>

          {/* Closing Line with Text Animation (Sits alone, refined compact size) */}
          <div className="pt-2 text-center max-w-3xl mx-auto">
            <div className="py-5 px-6 rounded-[8px] bg-neutral-50 dark:bg-[#07080E] border border-neutral-300 dark:border-[#1E2032] shadow-xs">
              <p className="text-sm sm:text-base md:text-lg font-heading font-semibold text-neutral-900 dark:text-white tracking-tight leading-relaxed">
                AGAMOTTO doesn't just calculate the winner ,
                <span className="animate-text-shimmer font-bold inline-block ml-1">
                  it can show exactly how the verdict was produced.
                </span>
                <span className="inline-block text-[#00F0FF] dark:text-[#C6FF1A] animate-cursor-blink ml-0.5">
                  _
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
