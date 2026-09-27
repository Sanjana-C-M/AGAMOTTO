import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Trophy,
  FileCode2,
  Calendar,
  Users,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Plus,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const ParticipantDashboardView: React.FC = () => {
  const { currentUser, activeEvent, projects, teams, navigate, setToast } = useApp();

  // 4 Accordion / expandable sections state (default all open or toggled)
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    enrolled: true,
    projects: true,
    achievements: true,
    skillset: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Skillset management
  const [skills, setSkills] = useState<string[]>([
    'Distributed Systems',
    'Rust',
    'TypeScript',
    'Zero-Knowledge Proofs',
    'PyTorch & AI Agents',
    'Smart Contracts',
    'PostgreSQL & Drizzle',
    'Next.js & Tailwind CSS'
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (skills.includes(newSkillInput.trim())) {
      setToast('Skill already in your profile list.');
      return;
    }
    setSkills([...skills, newSkillInput.trim()]);
    setNewSkillInput('');
    setToast('Skill added to verified profile!');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // Current user's project and team
  const myProject = projects.find(p => p.teamName === 'Nova Dynamics') || projects[0];
  const myTeam = teams[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-[#1E2032]">
        <div>
          <h1 className="text-3xl font-heading font-black text-neutral-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-xs text-neutral-500 font-mono-tech mt-1">
            Overview of your enrolled competitions, submitted projects, achievements, and technical skillset.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/participant/events')}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Explore Competitions
          </Button>
        </div>
      </div>

      {/* 4 EXPANDABLE SECTIONS */}
      <div className="space-y-4">
        {/* SECTION 1: ENROLLED COMPETITIONS */}
        <div className="rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#06070E] overflow-hidden shadow-xs transition-all">
          <button
            onClick={() => toggleSection('enrolled')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-[#0A0C16] transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[6px] bg-[#00F0FF]/15 text-black dark:text-[#00F0FF] flex items-center justify-center font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-heading font-black text-neutral-900 dark:text-white tracking-wide">
                  ENROLLED COMPETITIONS
                </h3>
                <span className="text-xs font-mono-tech text-neutral-500">
                  1 Active Tournament · 2 Upcoming
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-xs font-mono-tech hidden sm:inline">
                {openSections.enrolled ? 'Collapse' : 'Expand'}
              </span>
              {openSections.enrolled ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {openSections.enrolled && (
            <div className="p-5 pt-0 border-t border-neutral-100 dark:border-[#141524] space-y-4 mt-2">
              {/* Active Enrolled Event */}
              <div className="p-4 rounded-[6px] border border-neutral-200 dark:border-[#1C1E30] bg-neutral-50 dark:bg-[#0A0C16] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-[#00F0FF] text-black">
                        ACTIVE · ENROLLED
                      </span>
                      <span className="text-xs font-mono-tech text-neutral-500">
                        Code: {activeEvent.eventCode}
                      </span>
                    </div>
                    <h4 className="text-lg font-heading font-bold text-neutral-900 dark:text-white mt-1">
                      {activeEvent.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-sans mt-0.5">
                      {activeEvent.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/participant/events/[eventId]/team', { eventId: activeEvent.id })}
                      icon={<Users className="w-3.5 h-3.5" />}
                    >
                      Manage Squad
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/participant/events/[eventId]/submission', { eventId: activeEvent.id })}
                      icon={<FileCode2 className="w-3.5 h-3.5" />}
                    >
                      Project Submission
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono-tech">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">PRIZE POOL</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{activeEvent.prizes}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">EVALUATION WINDOW</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{activeEvent.startDate} — {activeEvent.endDate}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">MY SQUAD</span>
                    <span className="font-bold text-[#00F0FF]">{myTeam?.name || 'Nova Dynamics'} ({myTeam?.members.length || 3} members)</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">DOUBLE-BLIND POLICY</span>
                    <span className="font-bold text-emerald-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Shield Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Other Open Events to Explore */}
              <div className="flex items-center justify-between p-3 rounded-[6px] bg-neutral-100/60 dark:bg-[#0B0D18] text-xs font-mono-tech">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Ready to compete in more categories? 2 other open tournaments available.
                </span>
                <button
                  onClick={() => navigate('/participant/events')}
                  className="text-[#00F0FF] dark:text-[#C6FF1A] font-bold hover:underline cursor-pointer"
                >
                  Explore All Competitions →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: PROJECTS SUBMITTED */}
        <div className="rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#06070E] overflow-hidden shadow-xs transition-all">
          <button
            onClick={() => toggleSection('projects')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-[#0A0C16] transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[6px] bg-[#C6FF1A]/15 text-black dark:text-[#C6FF1A] flex items-center justify-center font-bold">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-heading font-black text-neutral-900 dark:text-white tracking-wide">
                  PROJECTS SUBMITTED
                </h3>
                <span className="text-xs font-mono-tech text-neutral-500">
                  1 Project Submitted · Verified Sandbox & Repository
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-xs font-mono-tech hidden sm:inline">
                {openSections.projects ? 'Collapse' : 'Expand'}
              </span>
              {openSections.projects ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {openSections.projects && (
            <div className="p-5 pt-0 border-t border-neutral-100 dark:border-[#141524] space-y-4 mt-2">
              <div className="p-4 rounded-[6px] border border-neutral-200 dark:border-[#1C1E30] bg-neutral-50 dark:bg-[#0A0C16] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech text-xs font-bold text-amber-500">
                        {myProject.id} (BLIND CODENAME: {myProject.codeName})
                      </span>
                      <span className="text-neutral-400">·</span>
                      <span className="font-mono-tech text-xs text-neutral-500">
                        Track: {myProject.track}
                      </span>
                    </div>
                    <h4 className="text-lg font-heading font-black text-neutral-900 dark:text-white mt-1">
                      {myProject.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-0.5">
                      {myProject.tagline || myProject.problem}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/participant/events/[eventId]/submission', { eventId: activeEvent.id })}
                    >
                      Edit Submission
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/participant/events/[eventId]/results', { eventId: activeEvent.id })}
                      icon={<Trophy className="w-3.5 h-3.5" />}
                    >
                      View Live Standing
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono-tech">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">SUBMISSION STATE</span>
                    <span className="font-bold text-emerald-500 uppercase">
                      LOCKED (v6.0 FROZEN)
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">EVALUATORS COMPLETED</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      3 / 3 Panels Scored
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">REPOSITORY</span>
                    <span className="font-bold text-[#00F0FF] truncate block">
                      {myProject.githubUrl}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">NORMALIZED SCORE</span>
                    <span className="font-bold text-[#C6FF1A]">
                      {myProject.normalizedScore.toFixed(1)} / 100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: ACHIEVEMENTS */}
        <div className="rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#06070E] overflow-hidden shadow-xs transition-all">
          <button
            onClick={() => toggleSection('achievements')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-[#0A0C16] transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[6px] bg-amber-400/15 text-amber-500 flex items-center justify-center font-bold">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-heading font-black text-neutral-900 dark:text-white tracking-wide">
                  ACHIEVEMENTS
                </h3>
                <span className="text-xs font-mono-tech text-neutral-500">
                  4 Verified Accreditations & Double-Blind Badges
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-xs font-mono-tech hidden sm:inline">
                {openSections.achievements ? 'Collapse' : 'Expand'}
              </span>
              {openSections.achievements ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {openSections.achievements && (
            <div className="p-5 pt-0 border-t border-neutral-100 dark:border-[#141524] space-y-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-[6px] bg-neutral-50 dark:bg-[#0A0C16] border border-neutral-200 dark:border-[#1C1E30] space-y-2">
                  <div className="w-8 h-8 rounded-[6px] bg-amber-400/20 text-amber-500 flex items-center justify-center font-bold">
                    🏆
                  </div>
                  <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white">
                    Top 5% Normalized Performance
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Awarded for projects achieving &gt;+1.5σ on standardized Z-score distributions across harsh and lenient judge panels.
                  </p>
                  <span className="text-[10px] font-mono-tech text-emerald-500 block font-bold">VERIFIED ON-CHAIN</span>
                </div>

                <div className="p-4 rounded-[6px] bg-neutral-50 dark:bg-[#0A0C16] border border-neutral-200 dark:border-[#1C1E30] space-y-2">
                  <div className="w-8 h-8 rounded-[6px] bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center font-bold">
                    🛡️
                  </div>
                  <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white">
                    Zero-Conflict Verified Competitor
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Cryptographic confirmation that team members have passed automated university and mentor conflict fences.
                  </p>
                  <span className="text-[10px] font-mono-tech text-emerald-500 block font-bold">PASSED AUDIT</span>
                </div>

                <div className="p-4 rounded-[6px] bg-neutral-50 dark:bg-[#0A0C16] border border-neutral-200 dark:border-[#1C1E30] space-y-2">
                  <div className="w-8 h-8 rounded-[6px] bg-[#C6FF1A]/20 text-[#C6FF1A] flex items-center justify-center font-bold">
                    ⚡
                  </div>
                  <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white">
                    Submission Freeze Honor
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Project repository and benchmark sandbox committed prior to deadline freeze with complete cryptographic SHA-256 integrity.
                  </p>
                  <span className="text-[10px] font-mono-tech text-emerald-500 block font-bold">LOCKED v6.0</span>
                </div>

                <div className="p-4 rounded-[6px] bg-neutral-50 dark:bg-[#0A0C16] border border-neutral-200 dark:border-[#1C1E30] space-y-2">
                  <div className="w-8 h-8 rounded-[6px] bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    🎖️
                  </div>
                  <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white">
                    Grand Prix Track Finalist
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Selected into official ceremony unmasking round for Autonomous Agents & Scalable Verification.
                  </p>
                  <span className="text-[10px] font-mono-tech text-amber-500 block font-bold">FINAL ROUND</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: SKILLSET */}
        <div className="rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#06070E] overflow-hidden shadow-xs transition-all">
          <button
            onClick={() => toggleSection('skillset')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-[#0A0C16] transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[6px] bg-[#00F0FF]/15 text-black dark:text-[#00F0FF] flex items-center justify-center font-bold">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-heading font-black text-neutral-900 dark:text-white tracking-wide">
                  SKILLSET
                </h3>
                <span className="text-xs font-mono-tech text-neutral-500">
                  {skills.length} Technical Proficiencies & Specialized Domains
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-xs font-mono-tech hidden sm:inline">
                {openSections.skillset ? 'Collapse' : 'Expand'}
              </span>
              {openSections.skillset ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {openSections.skillset && (
            <div className="p-5 pt-0 border-t border-neutral-100 dark:border-[#141524] space-y-4 mt-2">
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono-tech bg-neutral-100 dark:bg-[#101220] border border-neutral-200 dark:border-[#222538] text-neutral-800 dark:text-neutral-200 group"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-neutral-400 hover:text-red-500 ml-1 transition-colors cursor-pointer"
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Skill Form */}
              <form onSubmit={handleAddSkill} className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add a new technical skill (e.g. CUDA, Solidity, WebAssembly)..."
                  value={newSkillInput}
                  onChange={e => setNewSkillInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono-tech bg-neutral-50 dark:bg-[#0D0E18] border border-neutral-200 dark:border-[#1C1F30] rounded-[6px] focus:outline-none focus:border-[#00F0FF]"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add Skill
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
