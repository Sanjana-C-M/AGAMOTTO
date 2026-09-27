import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  Project,
  Judge,
  EventConfig,
  AuditLog,
  ParticipantTeam,
  ParticipantUser,
  RubricCriterion
} from '../types';
import {
  initialEvents,
  initialProjects,
  initialJudges,
  initialAuditLogs,
  initialParticipantsList,
  initialParticipantTeams,
  initialRubric
} from '../data/mockData';
import { recalculateAllScores } from '../utils/normalization';
import confetti from 'canvas-confetti';

interface AppContextType {
  currentUser: UserProfile | null;
  activeRole: UserRole | 'guest';
  currentPath: string;
  currentView: string;
  isDarkMode: boolean;
  events: EventConfig[];
  activeEventId: string;
  activeEvent: EventConfig;
  eventConfig: EventConfig;
  projects: Project[];
  judges: Judge[];
  participants: ParticipantUser[];
  teams: ParticipantTeam[];
  participantTeam: ParticipantTeam;
  auditLogs: AuditLog[];
  activeProjectId: string;
  activeReviewId: string;
  toastMessage: string | null;
  currentJudgeId: string;

  // Actions
  toggleDarkMode: () => void;
  navigate: (path: string, params?: { eventId?: string; projectId?: string; reviewId?: string }) => void;
  navigateTo: (path: string, params?: { eventId?: string; projectId?: string; reviewId?: string }) => void;
  login: (email: string, roleHint?: UserRole) => void;
  register: (profile: Partial<UserProfile>) => void;
  logout: () => void;
  setToast: (msg: string) => void;
  setActiveEventId: (id: string) => void;
  setActiveProjectId: (id: string) => void;
  setActiveReviewId: (id: string) => void;
  setCurrentJudgeId: (id: string) => void;
  toggleIdentityReveal: (eventId?: string) => void;
  assignJudge: (projectId: string, judgeId: string) => { success: boolean; reason?: string };
  removeJudge: (projectId: string, judgeId: string) => void;
  autoAssignJudges: (eventId?: string) => void;
  saveEvaluation: (
    projectId: string,
    judgeId: string,
    scores: Record<string, number>,
    justifications: Record<string, string>,
    status: 'draft' | 'finalized' | 'locked',
    isReopened?: boolean
  ) => void;
  reopenEvaluation: (projectId: string, judgeId: string, reason: string) => void;
  updateRubric: (eventId: string, newRubric: RubricCriterion[], tieBreakOrder?: string[]) => void;
  createEvent: (data: Partial<EventConfig>) => string;
  updateEvent: (eventId: string, data: Partial<EventConfig>) => void;
  submitProject: (data: Partial<Project>) => string;
  updateProjectSubmission: (projectId: string, data: Partial<Project>) => void;
  joinEventWithCode: (code: string) => boolean;
  createTeam: (name: string, track: string, eventId: string) => void;
  updateTeamMembers: (teamId: string, members: ParticipantTeam['members']) => void;
  approveParticipant: (participantId: string) => void;
  recalculateScores: (method?: 'z_score' | 'trimmed_mean' | 'borda', eventId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user & role state (starts as guest or can be logged in)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole | 'guest'>('guest');

  // Navigation path
  const [currentPath, setCurrentPath] = useState<string>('/');

  // Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agamotto_theme');
      return saved ? saved === 'dark' : true;
    }
    return true;
  });

  // Data states
  const [events, setEvents] = useState<EventConfig[]>(initialEvents);
  const [activeEventId, setActiveEventId] = useState<string>('evt-agamotto-2026');
  const [projects, setProjects] = useState<Project[]>(() =>
    recalculateAllScores(initialProjects, initialJudges, 'z_score')
  );
  const [judges, setJudges] = useState<Judge[]>(initialJudges);
  const [participants, setParticipants] = useState<ParticipantUser[]>(initialParticipantsList);
  const [teams, setTeams] = useState<ParticipantTeam[]>(initialParticipantTeams);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [activeProjectId, setActiveProjectId] = useState<string>('PRJ-024');
  const [activeReviewId, setActiveReviewId] = useState<string>('PRJ-024');
  const [currentJudgeId, setCurrentJudgeId] = useState<string>('jdg-01');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeEvent = events.find(e => e.id === activeEventId) || events[0];

  // Sync dark mode class on HTML root and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('agamotto_theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.style.colorScheme = 'light';
      localStorage.setItem('agamotto_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(curr => (curr === msg ? null : curr));
    }, 4500);
  };

  const addAuditLog = (action: string, details: string, actor: string, actorRole: UserRole | 'system', entity?: string) => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
    const randomHex = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
    const newEntry: AuditLog = {
      id: `log-${Date.now().toString(36)}`,
      eventId: activeEventId,
      timestamp,
      actor,
      actorRole,
      action,
      entity: entity || activeEventId,
      details,
      hashSignature: `0x${randomHex}`
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const navigate = (path: string, params?: { eventId?: string; projectId?: string; reviewId?: string }) => {
    if (params?.eventId) setActiveEventId(params.eventId);
    if (params?.projectId) setActiveProjectId(params.projectId);
    if (params?.reviewId) setActiveReviewId(params.reviewId);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (email: string, roleHint?: UserRole) => {
    let resolvedRole: UserRole = roleHint || 'participant';
    let profile: UserProfile;

    if (roleHint) {
      resolvedRole = roleHint;
    } else {
      const lower = email.toLowerCase();
      if (lower.includes('organizer') || lower.includes('director') || lower.includes('admin')) {
        resolvedRole = 'organizer';
      } else if (lower.includes('judge') || lower.includes('thorne') || lower.includes('lin') || lower.includes('vance')) {
        resolvedRole = 'judge';
      } else {
        resolvedRole = 'participant';
      }
    }

    if (resolvedRole === 'organizer') {
      profile = {
        id: 'usr-org-01',
        name: 'Elena Rostova (Director)',
        email: email || 'director@agamotto.systems',
        role: 'organizer',
        organization: 'AGAMOTTO Systems Foundation',
        orgType: 'Research Foundation'
      };
      setCurrentUser(profile);
      setActiveRole('organizer');
      navigate('/organizer');
      setToast('Logged in as Competition Organizer');
    } else if (resolvedRole === 'judge') {
      const judgeObj = judges.find(j => j.email.toLowerCase() === email.toLowerCase()) || judges[0];
      setCurrentJudgeId(judgeObj.id);
      profile = {
        id: judgeObj.id,
        name: judgeObj.name,
        email: judgeObj.email,
        role: 'judge',
        affiliation: judgeObj.affiliation,
        title: judgeObj.title,
        specialization: judgeObj.track
      };
      setCurrentUser(profile);
      setActiveRole('judge');
      navigate('/judge/dashboard');
      setToast(`Logged in as Judge: ${judgeObj.name}`);
    } else {
      profile = {
        id: 'usr-part-01',
        name: 'Kiran Patel',
        email: email || 'kiran@stanford.edu',
        role: 'participant',
        college: 'Stanford University',
        degree: 'B.S. Computer Science',
        graduationYear: '2027',
        githubUrl: 'https://github.com/kiranpatel-cs'
      };
      setCurrentUser(profile);
      setActiveRole('participant');
      navigate('/participant/dashboard');
      setToast('Logged in as Participant');
    }
  };

  const register = (profileData: Partial<UserProfile>) => {
    const role = profileData.role || 'participant';
    const profile: UserProfile = {
      id: `usr-${Date.now().toString(36)}`,
      name: profileData.name || 'Anonymous User',
      email: profileData.email || 'user@domain.edu',
      role,
      ...profileData
    };

    setCurrentUser(profile);
    setActiveRole(role);

    if (role === 'participant') {
      const newPart: ParticipantUser = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        college: profile.college || 'Engineering Institute',
        degree: profile.degree || 'Computer Science',
        graduationYear: profile.graduationYear || '2027',
        status: 'approved',
        registeredAt: new Date().toISOString().slice(0, 16) + ' UTC',
        github: profile.githubUrl || 'https://github.com'
      };
      setParticipants(prev => [newPart, ...prev]);
      navigate('/participant/dashboard');
    } else if (role === 'judge') {
      navigate('/judge/dashboard');
    } else {
      navigate('/organizer');
    }

    setToast(`Account created successfully! Welcome, ${profile.name}`);
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveRole('guest');
    navigate('/');
    setToast('Signed out successfully.');
  };

  const toggleIdentityReveal = (eventId = activeEventId) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === eventId) {
          const next = !e.identityRevealed;
          if (next) {
            try {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#2F5CFF', '#C6FF1A', '#FF2ED1', '#00F0FF']
              });
            } catch {
              // no-op
            }
          }
          return { ...e, identityRevealed: next };
        }
        return e;
      })
    );

    const ev = events.find(e => e.id === eventId);
    const nextRevealed = ev ? !ev.identityRevealed : true;

    addAuditLog(
      nextRevealed ? 'IDENTITY_REVEAL_PUBLISHED' : 'IDENTITY_REVEAL_MASKED',
      `Competition identities ${nextRevealed ? 'UNMASKED for public results' : 'RESTORED to classified double-blind shields'}.`,
      currentUser?.name || 'Head Organizer',
      'organizer',
      eventId
    );
    setToast(nextRevealed ? 'Identities revealed on leaderboard!' : 'Identities re-masked to classified codenames.');
  };

  const assignJudge = (projectId: string, judgeId: string): { success: boolean; reason?: string } => {
    const judge = judges.find(j => j.id === judgeId);
    const project = projects.find(p => p.id === projectId);
    if (!judge || !project) return { success: false, reason: 'Invalid judge or project identifier' };

    // Check conflict
    const conflict = judge.conflicts.find(c => c.projectId === projectId);
    if (conflict) {
      addAuditLog(
        'ASSIGNMENT_BLOCKED_CONFLICT',
        `Blocked assignment of ${judge.name} to ${projectId}. Reason: "${conflict.reason}".`,
        'system',
        'system',
        projectId
      );
      return {
        success: false,
        reason: conflict.reason
      };
    }

    if (project.assignedJudges.includes(judgeId)) {
      return { success: false, reason: 'Judge is already assigned to this project' };
    }

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return { ...p, assignedJudges: [...p.assignedJudges, judgeId] };
        }
        return p;
      })
    );

    setJudges(prev =>
      prev.map(j => {
        if (j.id === judgeId) {
          return { ...j, assignedCount: j.assignedCount + 1 };
        }
        return j;
      })
    );

    addAuditLog(
      'JUDGE_ASSIGNED',
      `Manual assignment: ${judge.name} assigned to ${project.id}. Verified zero conflict.`,
      currentUser?.name || 'Organizer',
      'organizer',
      projectId
    );

    setToast(`Assigned ${judge.name} to ${project.id}`);
    return { success: true };
  };

  const removeJudge = (projectId: string, judgeId: string) => {
    const judge = judges.find(j => j.id === judgeId);
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return { ...p, assignedJudges: p.assignedJudges.filter(id => id !== judgeId) };
        }
        return p;
      })
    );

    setJudges(prev =>
      prev.map(j => {
        if (j.id === judgeId) {
          return { ...j, assignedCount: Math.max(0, j.assignedCount - 1) };
        }
        return j;
      })
    );

    addAuditLog(
      'JUDGE_REMOVED',
      `Removed ${judge?.name || judgeId} from ${projectId}.`,
      currentUser?.name || 'Organizer',
      'organizer',
      projectId
    );
    setToast(`Removed ${judge?.name || judgeId} from ${projectId}`);
  };

  const autoAssignJudges = (eventId = activeEventId) => {
    const ev = events.find(e => e.id === eventId) || activeEvent;
    const requiredPerProject = ev.judgesPerProject;
    let count = 0;

    setProjects(prevProjects => {
      const nextProjects = [...prevProjects];
      const nextJudges = [...judges];

      nextProjects
        .filter(p => p.eventId === eventId)
        .forEach(proj => {
          while (proj.assignedJudges.length < requiredPerProject) {
            const eligibleJudges = nextJudges
              .filter(j => {
                if (proj.assignedJudges.includes(j.id)) return false;
                const hasConflict = j.conflicts.some(c => c.projectId === proj.id);
                return !hasConflict;
              })
              .sort((a, b) => a.assignedCount - b.assignedCount);

            if (eligibleJudges.length === 0) break;

            const selected = eligibleJudges[0];
            proj.assignedJudges.push(selected.id);
            selected.assignedCount += 1;
            count++;
          }
        });

      setJudges(nextJudges);
      return nextProjects;
    });

    addAuditLog(
      'AUTO_ASSIGN_EXECUTED',
      `Auto-balanced workload across verified panel. Total pairings created: ${count}. Zero conflict infractions.`,
      'system',
      'system',
      eventId
    );
    setToast(`Auto-assigned ${count} judge pairings safely.`);
  };

  const saveEvaluation = (
    projectId: string,
    judgeId: string,
    scores: Record<string, number>,
    justifications: Record<string, string>,
    status: 'draft' | 'finalized' | 'locked',
    isReopened = false
  ) => {
    const judge = judges.find(j => j.id === judgeId);
    const judgeName = judge ? judge.name : 'Verified Judge';

    let weightedSum = 0;
    let totalWeight = 0;
    activeEvent.rubric.forEach(crit => {
      const val = scores[crit.id] || 0;
      weightedSum += (val / crit.maxScore) * crit.weight;
      totalWeight += crit.weight;
    });
    const totalRaw = Number(((weightedSum / (totalWeight || 100)) * 10).toFixed(2));

    const updatedProjects = projects.map(proj => {
      if (proj.id === projectId) {
        const existingScoreIndex = proj.scores.findIndex(s => s.judgeId === judgeId);
        const newScoreObj = {
          judgeId,
          judgeName,
          criteriaScores: scores,
          justifications,
          totalRaw,
          submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
          status,
          isReopened: isReopened ? false : proj.scores[existingScoreIndex]?.isReopened
        };

        let newScores = [...proj.scores];
        if (existingScoreIndex >= 0) {
          newScores[existingScoreIndex] = newScoreObj;
        } else {
          newScores.push(newScoreObj);
        }

        return { ...proj, scores: newScores };
      }
      return proj;
    });

    const recomputed = recalculateAllScores(updatedProjects, judges, activeEvent.normalizationMethod);
    setProjects(recomputed);

    if (status === 'locked' || status === 'finalized') {
      setJudges(prev =>
        prev.map(j => {
          if (j.id === judgeId) {
            return { ...j, completedCount: j.completedCount + 1 };
          }
          return j;
        })
      );
    }

    addAuditLog(
      status === 'locked' ? 'REVIEW_LOCKED_SEALED' : 'REVIEW_SAVED',
      `Review ${status} by ${judgeName} for ${projectId}. Weighted raw: ${totalRaw}/10.00.`,
      judgeName,
      'judge',
      projectId
    );

    if (status === 'locked') {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {
        // no-op
      }
      setToast(`Review locked and verified! Raw score ${totalRaw}/10 logged.`);
    } else {
      setToast('Review draft saved.');
    }
  };

  const reopenEvaluation = (projectId: string, judgeId: string, reason: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            scores: p.scores.map(s => {
              if (s.judgeId === judgeId) {
                return {
                  ...s,
                  status: 'draft',
                  isReopened: true,
                  reopenedReason: reason
                };
              }
              return s;
            })
          };
        }
        return p;
      })
    );

    addAuditLog(
      'REVIEW_REOPENED_BY_ORGANIZER',
      `Review for ${projectId} by ${judgeId} was unlocked for revisions. Reason: "${reason}".`,
      currentUser?.name || 'Organizer',
      'organizer',
      projectId
    );
    setToast(`Evaluation reopened for revisions. Reason logged in audit trail.`);
  };

  const updateRubric = (eventId: string, newRubric: RubricCriterion[], tieBreakOrder?: string[]) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === eventId) {
          return { ...e, rubric: newRubric, tieBreakOrder: tieBreakOrder || e.tieBreakOrder };
        }
        return e;
      })
    );
    addAuditLog(
      'RUBRIC_CRITERIA_MODIFIED',
      `Rubric updated with ${newRubric.length} weighted criteria. Total weight: ${newRubric.reduce((a, b) => a + b.weight, 0)}%.`,
      currentUser?.name || 'Organizer',
      'organizer',
      eventId
    );
    setToast('Rubric configuration updated.');
  };

  const createEvent = (data: Partial<EventConfig>): string => {
    const id = `evt-${Date.now().toString(36)}`;
    const newEv: EventConfig = {
      id,
      title: data.title || 'Untitled Hackathon',
      tagline: data.tagline || 'High-Integrity Competition',
      description: data.description || '',
      eventCode: (data.eventCode || 'HACK-2026').toUpperCase(),
      status: data.status || 'registration',
      prizes: data.prizes || '$10,000 in Prizes',
      startDate: data.startDate || 'Oct 01, 2026',
      endDate: data.endDate || 'Oct 15, 2026',
      registrationDeadline: data.registrationDeadline || 'Sep 30, 2026',
      submissionDeadline: data.submissionDeadline || 'Oct 12, 2026',
      judgingDeadline: data.judgingDeadline || 'Oct 15, 2026',
      isPublic: data.isPublic ?? true,
      registrationMode: data.registrationMode || 'open',
      minTeamSize: data.minTeamSize || 2,
      maxTeamSize: data.maxTeamSize || 4,
      editingPolicy: data.editingPolicy || 'allow-until-deadline',
      versioningEnabled: data.versioningEnabled ?? true,
      judgesPerProject: data.judgesPerProject || 3,
      assignmentMode: data.assignmentMode || 'auto',
      normalizationMethod: data.normalizationMethod || 'z_score',
      identityRevealed: false,
      tracks: data.tracks || ['General Track', 'Systems', 'AI'],
      rubric: data.rubric || initialRubric,
      tieBreakOrder: data.tieBreakOrder || ['crit-tech', 'crit-innovation'],
      participantsCount: 0,
      bannerGradient: 'from-cyan-700 via-blue-950 to-neutral-950'
    };

    setEvents(prev => [newEv, ...prev]);
    setActiveEventId(id);
    addAuditLog(
      'EVENT_LAUNCHED',
      `New competition "${newEv.title}" initialized with code ${newEv.eventCode}.`,
      currentUser?.name || 'Organizer',
      'organizer',
      id
    );
    setToast(`Event "${newEv.title}" launched successfully!`);
    return id;
  };

  const updateEvent = (eventId: string, data: Partial<EventConfig>) => {
    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, ...data } : e))
    );
    addAuditLog(
      'EVENT_SETTINGS_UPDATED',
      `Configuration revised for event ${eventId}.`,
      currentUser?.name || 'Organizer',
      'organizer',
      eventId
    );
    setToast('Event parameters updated.');
  };

  const submitProject = (data: Partial<Project>): string => {
    const newId = `PRJ-${String(projects.length + 1).padStart(3, '0')}`;
    const newProj: Project = {
      id: newId,
      eventId: activeEventId,
      codeName: `PROJECT #${newId.replace('PRJ-', '')} — CLASSIFIED`,
      title: data.title || 'Untitled Submission',
      tagline: data.tagline || '',
      teamName: data.teamName || 'Nova Dynamics',
      college: data.college || currentUser?.college || 'Participant University',
      members: data.members || [
        { name: currentUser?.name || 'Kiran Patel', role: 'Team Lead', college: currentUser?.college || 'Stanford' }
      ],
      track: data.track || activeEvent.tracks[0],
      problem: data.problem || '',
      solution: data.solution || '',
      techStack: data.techStack || ['TypeScript', 'React'],
      githubUrl: data.githubUrl || '',
      demoUrl: data.demoUrl || '',
      presentationFileName: data.presentationFileName || 'Submission_Deck.pdf',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      status: data.status || 'submitted',
      assignedJudges: ['jdg-01', 'jdg-02', 'jdg-05'],
      scores: [],
      rawAverage: 0,
      normalizedScore: 0,
      zScoreRaw: 0,
      rank: projects.length + 1,
      versions: [
        {
          version: 1,
          timestamp: new Date().toISOString().slice(0, 16) + ' UTC',
          summary: 'Initial submission artifacts uploaded',
          editedBy: currentUser?.name || 'Team Lead'
        }
      ]
    };

    setProjects(prev => [newProj, ...prev]);
    addAuditLog(
      'SUBMISSION_RECORDED',
      `Submission created: ${newProj.id} ("${newProj.codeName}"). Status: ${newProj.status}.`,
      currentUser?.name || 'Participant',
      'participant',
      newProj.id
    );
    setToast(`Submission saved as ${newProj.codeName}!`);
    return newId;
  };

  const updateProjectSubmission = (projectId: string, data: Partial<Project>) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const nextVersion = (p.versions?.length || 1) + 1;
          const updatedVersions = [
            ...(p.versions || []),
            {
              version: nextVersion,
              timestamp: new Date().toISOString().slice(0, 16) + ' UTC',
              summary: 'Submission updated via participant portal',
              editedBy: currentUser?.name || 'Participant'
            }
          ];
          return {
            ...p,
            ...data,
            versions: updatedVersions
          };
        }
        return p;
      })
    );
    addAuditLog(
      'SUBMISSION_REVISED',
      `Submission ${projectId} updated with new version entry.`,
      currentUser?.name || 'Participant',
      'participant',
      projectId
    );
    setToast('Submission updated successfully.');
  };

  const joinEventWithCode = (code: string): boolean => {
    const matched = events.find(e => e.eventCode.toUpperCase() === code.trim().toUpperCase());
    if (matched) {
      setActiveEventId(matched.id);
      setToast(`Joined ${matched.title}!`);
      addAuditLog(
        'PARTICIPANT_JOINED_EVENT',
        `Participant ${currentUser?.name || 'User'} unlocked event via code ${code.toUpperCase()}.`,
        currentUser?.name || 'Participant',
        'participant',
        matched.id
      );
      return true;
    }
    return false;
  };

  const createTeam = (name: string, track: string, eventId: string) => {
    const code = `${name.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTeam: ParticipantTeam = {
      id: `team-${Date.now().toString(36)}`,
      eventId,
      name,
      inviteCode: code,
      track,
      members: [
        {
          name: currentUser?.name || 'Alex Rivera (You)',
          email: currentUser?.email || 'alex@domain.edu',
          college: currentUser?.college || 'Stanford',
          role: 'Team Captain',
          isLeader: true
        }
      ]
    };
    setTeams(prev => [newTeam, ...prev]);
    setToast(`Team "${name}" created! Invite code: ${code}`);
  };

  const updateTeamMembers = (teamId: string, members: ParticipantTeam['members']) => {
    setTeams(prev =>
      prev.map(t => (t.id === teamId ? { ...t, members } : t))
    );
    setToast('Team membership updated.');
  };

  const approveParticipant = (participantId: string) => {
    setParticipants(prev =>
      prev.map(p => (p.id === participantId ? { ...p, status: 'approved' } : p))
    );
    setToast('Participant application approved.');
  };

  const recalculateScores = (method: 'z_score' | 'trimmed_mean' | 'borda' = activeEvent.normalizationMethod, eventId = activeEventId) => {
    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, normalizationMethod: method } : e))
    );
    const recomputed = recalculateAllScores(projects, judges, method);
    setProjects(recomputed);
    addAuditLog(
      'NORMALIZATION_ENGINE_RECALCULATED',
      `Scoring recalculated using ${method.toUpperCase()} algorithm for event ${eventId}.`,
      'system',
      'system',
      eventId
    );
    setToast(`Scores normalized using ${method.replace('_', ' ').toUpperCase()} engine.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole,
        currentPath,
        currentView: currentPath,
        isDarkMode,
        events,
        activeEventId,
        activeEvent,
        eventConfig: activeEvent,
        projects,
        judges,
        participants,
        teams,
        participantTeam: teams[0] || initialParticipantTeams[0],
        auditLogs,
        activeProjectId,
        activeReviewId,
        toastMessage,
        currentJudgeId,
        toggleDarkMode,
        navigate,
        navigateTo: (p: string, params?: { eventId?: string; projectId?: string; reviewId?: string }) => navigate(p, params),
        login,
        register,
        logout,
        setToast,
        setActiveEventId,
        setActiveProjectId,
        setActiveReviewId,
        setCurrentJudgeId,
        toggleIdentityReveal,
        assignJudge,
        removeJudge,
        autoAssignJudges,
        saveEvaluation,
        reopenEvaluation,
        updateRubric,
        createEvent,
        updateEvent,
        submitProject,
        updateProjectSubmission,
        joinEventWithCode,
        createTeam,
        updateTeamMembers,
        approveParticipant,
        recalculateScores
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
