import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from './Button';
import {
  Sun,
  Moon,
  Shield,
  Layers,
  Scale,
  Lock,
  Eye,
  LogOut,
  Compass,
  FileCode2,
  Trophy,
  Users,
  LayoutDashboard,
  User,
  CheckCircle2,
  Building,
  Mail,
  Award,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeRole,
    currentPath,
    isDarkMode,
    activeEventId,
    activeEvent,
    toggleDarkMode,
    navigate,
    logout,
    toggleIdentityReveal
  } = useApp();

  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-3 z-40 w-full flex justify-center px-3 sm:px-6 transition-colors pointer-events-none">
        <div className="flex items-center gap-2.5 max-w-full pointer-events-auto">
          {/* 1. Theme Mode Toggle Placed on the Far Left BEFORE the floating navbar */}
          <button
            onClick={toggleDarkMode}
            className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[8px] bg-white dark:bg-[#07080F] border-2 border-[#00F0FF] dark:border-[#C6FF1A] text-neutral-800 dark:text-[#C6FF1A] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-[#C6FF1A] animate-in spin-in-180 duration-200" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-900 animate-in spin-in-180 duration-200" />
            )}
          </button>

          {/* 2. Floating Navbar: Adjusts to its content with neat padding and no unnecessary empty space */}
          <div
            className={`w-fit max-w-[calc(100vw-5rem)] h-11 sm:h-12 rounded-[8px] px-2.5 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 shadow-lg transition-all border ${
              isDarkMode
                ? 'bg-[#080B03] border-[#C6FF1A] text-[#C6FF1A] shadow-[#C6FF1A]/10'
                : 'bg-[#00F0FF] border-[#00d2e0] text-black shadow-[#00F0FF]/25'
            }`}
          >
            {/* Center / Navigation Links (No logo or app name at top-left per prompt instructions) */}
            <nav className="flex items-center gap-1 font-mono-tech text-xs overflow-x-auto py-1">
              {/* GUEST / PUBLIC NAVIGATION */}
              {activeRole === 'guest' && (
                <div className="flex items-center gap-1 font-mono-tech text-xs">
                  <button
                    onClick={() => navigate('/')}
                    className={`px-3 py-1.5 rounded-[6px] transition-colors font-bold cursor-pointer ${
                      currentPath === '/'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-black shadow-xs'
                          : 'bg-black text-[#00F0FF] shadow-xs'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigate('/roles/participant')}
                    className={`px-3 py-1.5 rounded-[6px] transition-colors font-bold cursor-pointer ${
                      currentPath === '/roles/participant'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-black shadow-xs'
                          : 'bg-black text-[#00F0FF] shadow-xs'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    Participant
                  </button>
                  <button
                    onClick={() => navigate('/roles/judge')}
                    className={`px-3 py-1.5 rounded-[6px] transition-colors font-bold cursor-pointer ${
                      currentPath === '/roles/judge'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-black shadow-xs'
                          : 'bg-black text-[#00F0FF] shadow-xs'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    Judge
                  </button>
                  <button
                    onClick={() => navigate('/roles/organizer')}
                    className={`px-3 py-1.5 rounded-[6px] transition-colors font-bold cursor-pointer ${
                      currentPath === '/roles/organizer'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-black shadow-xs'
                          : 'bg-black text-[#00F0FF] shadow-xs'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    Organizer
                  </button>
                </div>
              )}

              {/* PARTICIPANT NAVIGATION: Explore Events placed BEFORE Dashboard per request */}
              {activeRole === 'participant' && (
                <div className="flex items-center gap-1">
                  {/* Explore Events placed FIRST */}
                  <button
                    onClick={() => navigate('/participant/events')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold transition-colors cursor-pointer ${
                      currentPath === '/participant/events'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204] shadow-xs'
                          : 'bg-black text-[#00F0FF] shadow-xs'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Explore Events</span>
                  </button>

                  {/* Dashboard placed SECOND */}
                  <button
                    onClick={() => navigate('/participant/dashboard')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold transition-colors cursor-pointer ${
                      currentPath === '/participant/dashboard'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204] shadow-xs'
                          : 'bg-black text-[#00F0FF] shadow-xs'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </button>

                  {/* Team */}
                  <button
                    onClick={() => navigate('/participant/events/[eventId]/team', { eventId: activeEventId })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold transition-colors cursor-pointer ${
                      currentPath.includes('/team')
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204] shadow-xs'
                          : 'bg-black text-[#00F0FF] shadow-xs'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Team</span>
                  </button>

                  {/* Submission */}
                  <button
                    onClick={() => navigate('/participant/events/[eventId]/submission', { eventId: activeEventId })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold transition-colors cursor-pointer ${
                      currentPath.includes('/submission') || currentPath.includes('/submit')
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204] shadow-xs'
                          : 'bg-black text-[#00F0FF] shadow-xs'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>Submission</span>
                  </button>

                  {/* Results */}
                  <button
                    onClick={() => navigate('/participant/events/[eventId]/results', { eventId: activeEventId })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold transition-colors cursor-pointer ${
                      currentPath.includes('/results')
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204] shadow-xs'
                          : 'bg-black text-[#00F0FF] shadow-xs'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Results</span>
                  </button>
                </div>
              )}

              {/* JUDGE NAVIGATION */}
              {activeRole === 'judge' && (
                <div className="flex items-center gap-1 font-mono-tech text-xs">
                  <button
                    onClick={() => navigate('/judge/dashboard')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-bold transition-colors cursor-pointer ${
                      currentPath === '/judge/dashboard'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204]'
                          : 'bg-black text-[#00F0FF]'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Judge Dashboard</span>
                  </button>

                  <button
                    onClick={() => navigate('/judge/projects')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-bold transition-colors cursor-pointer ${
                      currentPath === '/judge/projects' || currentPath.startsWith('/judge/projects/')
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204]'
                          : 'bg-black text-[#00F0FF]'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Assigned Projects</span>
                  </button>

                  <button
                    onClick={() => navigate('/judge/reviews/[reviewId]', { reviewId: 'PRJ-024' })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-bold transition-colors cursor-pointer ${
                      currentPath.startsWith('/judge/reviews/')
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204]'
                          : 'bg-black text-[#00F0FF]'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Blind Evaluation</span>
                  </button>
                </div>
              )}

              {/* ORGANIZER NAVIGATION */}
              {activeRole === 'organizer' && (
                <div className="flex items-center gap-1 font-mono-tech text-xs">
                  <button
                    onClick={() => navigate('/organizer')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-bold transition-colors cursor-pointer ${
                      currentPath === '/organizer'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204]'
                          : 'bg-black text-[#00F0FF]'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Overview</span>
                  </button>

                  <button
                    onClick={() => navigate('/organizer/events')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-bold transition-colors cursor-pointer ${
                      currentPath === '/organizer/events'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204]'
                          : 'bg-black text-[#00F0FF]'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Events</span>
                  </button>

                  <button
                    onClick={() => navigate('/organizer/events/new')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-bold transition-colors cursor-pointer ${
                      currentPath === '/organizer/events/new'
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204]'
                          : 'bg-black text-[#00F0FF]'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <span>+ Wizard</span>
                  </button>

                  <button
                    onClick={() => navigate('/organizer/events/[eventId]', { eventId: activeEventId })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-bold transition-colors cursor-pointer ${
                      currentPath.startsWith('/organizer/events/[eventId]')
                        ? isDarkMode
                          ? 'bg-[#C6FF1A] text-[#020204]'
                          : 'bg-black text-[#00F0FF]'
                        : isDarkMode
                        ? 'text-white hover:bg-[#C6FF1A]/20'
                        : 'text-black hover:bg-black/10'
                    }`}
                  >
                    <span>Manage Event</span>
                  </button>
                </div>
              )}
            </nav>

            {/* Right Action Area */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Organizer Identity Reveal Action */}
              {activeRole === 'organizer' && (
                <button
                  onClick={() => toggleIdentityReveal()}
                  className={`hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-mono-tech font-bold border transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'border-[#C6FF1A] bg-[#C6FF1A]/10 text-[#C6FF1A] hover:bg-[#C6FF1A]/20'
                      : 'border-black bg-black/10 text-black hover:bg-black/20'
                  }`}
                  title="Toggle Double Blind Mask"
                >
                  {activeEvent.identityRevealed ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden xl:inline">REVEALED</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span className="hidden xl:inline">BLIND MASK</span>
                    </>
                  )}
                </button>
              )}

              {/* Guest Actions */}
              {activeRole === 'guest' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/signin')}
                    className={`px-3 py-1 rounded-[6px] font-mono-tech text-xs font-bold border transition-colors cursor-pointer ${
                      isDarkMode
                        ? 'border-[#C6FF1A] text-[#C6FF1A] hover:bg-[#C6FF1A]/20'
                        : 'border-black text-black hover:bg-black/15'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className={`px-3 py-1 rounded-[6px] font-mono-tech text-xs font-bold transition-colors cursor-pointer ${
                      isDarkMode
                        ? 'bg-[#C6FF1A] text-black hover:bg-[#d5ff45]'
                        : 'bg-black text-[#00F0FF] hover:bg-neutral-800'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {/* PROFILE ICON in place of "Kiran Patel PARTICIPANT" showing all registered details */}
                  <button
                    onClick={() => setProfileModalOpen(true)}
                    className={`p-1.5 rounded-[6px] border flex items-center justify-center transition-all cursor-pointer group shadow-xs ${
                      isDarkMode
                        ? 'border-[#C6FF1A] bg-[#C6FF1A]/10 text-[#C6FF1A] hover:bg-[#C6FF1A] hover:text-black'
                        : 'border-black bg-black/10 text-black hover:bg-black hover:text-[#00F0FF]'
                    }`}
                    title="View My Registered Details"
                    aria-label="View Profile"
                  >
                    <User className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </button>

                  {/* "Log Out" button rather than "Exit Portal" */}
                  <button
                    onClick={logout}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-[6px] font-mono-tech text-xs font-bold border transition-colors cursor-pointer shadow-xs ${
                      isDarkMode
                        ? 'border-[#C6FF1A] text-[#C6FF1A] hover:bg-[#C6FF1A]/20 active:bg-[#C6FF1A]/30'
                        : 'border-black text-black hover:bg-black/15 active:bg-black/25'
                    }`}
                    title="Log Out of Portal"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* REGISTERED DETAILS MODAL */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#07080E] border-2 border-[#00F0FF] dark:border-[#C6FF1A] rounded-[8px] max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-neutral-900 dark:text-neutral-100 font-sans">
            <div className="flex items-start justify-between border-b border-neutral-200 dark:border-[#1E2032] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[8px] bg-[#00F0FF]/15 dark:bg-[#C6FF1A]/15 border border-[#00F0FF] dark:border-[#C6FF1A] text-black dark:text-[#C6FF1A] flex items-center justify-center font-heading font-black text-xl">
                  {currentUser?.name?.slice(0, 1) || 'U'}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-black leading-tight text-neutral-900 dark:text-white">
                    {currentUser?.name || (activeRole === 'participant' ? 'Kiran Patel' : activeRole === 'judge' ? 'Dr. Aris Thorne' : 'Event Director')}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono-tech text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#00F0FF]/20 dark:bg-[#C6FF1A]/20 text-neutral-900 dark:text-[#C6FF1A]">
                      {activeRole.toUpperCase()} PORTAL
                    </span>
                    <span className="text-xs text-neutral-500 font-mono-tech">ID: {currentUser?.id || 'USR-8821'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setProfileModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white p-1 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Registered Metadata */}
            <div className="space-y-3 font-mono-tech text-xs">
              <div className="p-3 rounded-[6px] bg-neutral-50 dark:bg-[#0D0F18] border border-neutral-200 dark:border-[#1E2032] space-y-2">
                <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#00F0FF]" /> Registered Email:
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {currentUser?.email || (activeRole === 'participant' ? 'kiran@stanford.edu' : 'aris.thorne@vertex-systems.io')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#C6FF1A]" /> Institution / Affiliation:
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {currentUser?.college || 'Stanford University'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Active Competition:
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-white truncate max-w-[200px]">
                    {activeEvent.title}
                  </span>
                </div>

                {activeRole === 'participant' && (
                  <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#00F0FF]" /> Squad / Team:
                    </span>
                    <span className="font-bold text-[#00F0FF]">
                      Nova Dynamics (ID: PRJ-024)
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-[6px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                <div className="text-[11px] leading-relaxed">
                  <strong>Double-Blind Status: VERIFIED & ACTIVE</strong>
                  <p className="mt-0.5 text-neutral-600 dark:text-neutral-300 font-sans">
                    Identities are cryptographically salted and masked to all evaluating panels during rubric scoring.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-[#1E2032]">
              <button
                onClick={logout}
                className="text-xs font-mono-tech text-red-500 hover:text-red-600 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Account</span>
              </button>

              <button
                onClick={() => setProfileModalOpen(false)}
                className="px-4 py-2 rounded-[6px] bg-[#00F0FF] text-black dark:bg-[#C6FF1A] dark:text-black font-bold font-mono-tech text-xs cursor-pointer shadow-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
