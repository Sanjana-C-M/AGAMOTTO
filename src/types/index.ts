export type UserRole = 'organizer' | 'judge' | 'participant';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Role-specific extra fields
  organization?: string; // Organizer
  orgType?: string;
  affiliation?: string; // Judge
  title?: string;
  specialization?: string;
  college?: string; // Participant
  degree?: string;
  graduationYear?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

export interface RubricAnchor {
  score: number;
  label: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  weight: number; // percentage (e.g., 30 for 30%)
  maxScore: number; // e.g., 10 or 25
  anchors: RubricAnchor[];
}

export interface ProjectScore {
  judgeId: string;
  judgeName: string;
  criteriaScores: Record<string, number>; // criterionId -> score
  justifications: Record<string, string>; // criterionId -> comment
  totalRaw: number; // weighted sum
  submittedAt: string;
  status: 'draft' | 'finalized' | 'locked';
  isReopened?: boolean;
  reopenedReason?: string;
}

export interface ProjectVersion {
  version: number;
  timestamp: string;
  summary: string;
  editedBy: string;
}

export interface Project {
  id: string; // e.g., 'PRJ-024'
  eventId: string; // References Event
  codeName: string; // e.g., 'PROJECT #024 — CLASSIFIED'
  title: string;
  tagline: string;
  teamName: string;
  members: { name: string; role: string; college: string; email?: string }[];
  college: string;
  track: string;
  problem: string;
  solution: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  presentationFileName?: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'locked';
  assignedJudges: string[]; // Judge IDs
  scores: ProjectScore[];
  rawAverage: number;
  normalizedScore: number; // Z-score normalized (0-100 scale or standardized)
  zScoreRaw: number; // Standard deviations from mean (e.g. +1.42)
  rank: number;
  versions?: ProjectVersion[];
}

export interface JudgeConflict {
  projectId: string;
  reason: string; // e.g. "Judge is a team member", "Conflict of interest: former lab advisor"
}

export interface Judge {
  id: string;
  name: string;
  email: string;
  affiliation: string;
  title: string;
  track: string;
  assignedCount: number;
  completedCount: number;
  conflicts: JudgeConflict[];
  scoringBias: number; // historical mean deviation (e.g. -0.4 strict, +0.5 lenient)
}

export interface ParticipantUser {
  id: string;
  name: string;
  email: string;
  college: string;
  degree: string;
  graduationYear: string;
  teamId?: string;
  teamName?: string;
  status: 'approved' | 'pending';
  registeredAt: string;
  github: string;
}

export interface EventConfig {
  id: string;
  title: string;
  tagline: string;
  description?: string;
  eventCode: string;
  status: 'draft' | 'active' | 'registration' | 'submission' | 'judging' | 'results' | 'closed' | 'archived';
  prizes?: string;
  startDate?: string;
  endDate?: string;
  registrationDeadline?: string;
  submissionDeadline?: string;
  judgingDeadline?: string;
  isPublic?: boolean;
  registrationMode?: 'open' | 'approval-required';
  minTeamSize?: number;
  maxTeamSize?: number;
  editingPolicy?: 'allow-until-deadline' | 'lock-on-first-review' | 'locked';
  versioningEnabled?: boolean;
  judgesPerProject: number; // typically 3
  assignmentMode?: 'manual' | 'auto';
  reopeningPolicy?: 'organizer-only' | 'strict-no-reopen';
  normalizationMethod: 'z_score' | 'trimmed_mean' | 'borda';
  identityRevealed: boolean;
  tracks: string[];
  rubric: RubricCriterion[];
  tieBreakOrder?: string[];
  judgeNotesEnabled?: boolean;
  emailNotifications?: boolean;
  participantsCount?: number;
  bannerGradient?: string;
}

export interface AuditLog {
  id: string;
  eventId?: string;
  timestamp: string;
  actor: string;
  actorRole: UserRole | 'system';
  action: string;
  entity?: string;
  details: string;
  hashSignature: string;
}

export interface TeamMember {
  name: string;
  email: string;
  college?: string;
  role: string;
  isLeader: boolean;
}

export interface ParticipantTeam {
  id: string;
  eventId: string;
  name: string;
  inviteCode: string;
  track: string;
  members: TeamMember[];
}
