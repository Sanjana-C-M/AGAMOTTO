import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Code2,
  Scale,
  Shield,
  CheckCircle2,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface RoleOverviewPageProps {
  role: 'participant' | 'judge' | 'organizer';
}

export const RoleOverviewPage: React.FC<RoleOverviewPageProps> = ({ role }) => {
  const { navigate, login } = useApp();

  const roleDetails = {
    participant: {
      badge: 'COMPETITOR SUITE',
      title: 'Participant Portal',
      tagline: 'Build bold ideas. Submit cleanly. Get evaluated purely on merit without pedigree bias.',
      accentColor: '#00F0FF',
      icon: <Code2 className="w-8 h-8 text-black dark:text-[#00F0FF]" />,
      demoUser: {
        email: 'kiran@stanford.edu',
        name: 'Kiran Patel',
        roleHint: 'participant' as const
      },
      overview:
        'As a competitor in AGAMOTTO, your work is judged strictly for what it is. Personal profiles, university affiliations, author names, and social links are cryptographically stripped before evaluators access the scoring rubric.',
      responsibilities: [
        'Register with verified university or institutional credentials',
        'Enroll in open research tournaments and select a specialized domain track',
        'Collaborate with teammates and freeze project code prior to the deadline',
        'Adhere to the anti-collusion agreement and double-blind policy'
      ]
    },
    judge: {
      badge: 'EVALUATOR PORTAL',
      title: 'Judge Blind Portal',
      tagline: 'Rigorous, multi-criteria rubric evaluation with zero collegiate favoritism or halo bias.',
      accentColor: '#C6FF1A',
      icon: <Scale className="w-8 h-8 text-black dark:text-[#C6FF1A]" />,
      demoUser: {
        email: 'aris.thorne@vertex-systems.io',
        name: 'Dr. Aris Thorne',
        roleHint: 'judge' as const
      },
      overview:
        'Judges evaluate anonymized project dossiers through structured multi-criteria rubrics. Automated conflict fencing prevents assignments involving former advisees, students, or lab colleagues.',
      responsibilities: [
        'Declare institutional and academic conflicts of interest upon joining',
        'Review assigned project codebases, architecture diagrams, and benchmark outputs',
        'Submit granular numerical scores with detailed qualitative justifications',
        'Finalize and lock evaluation scorecards before the judging window closes'
      ]
    },
    organizer: {
      badge: 'DIRECTOR ARCHITECTURE',
      title: 'Organizer Command Suite',
      tagline: 'Orchestrate high-stakes competitions with deterministic fairness, live telemetry, and auditability.',
      accentColor: '#00F0FF',
      icon: <Shield className="w-8 h-8 text-black dark:text-[#00F0FF]" />,
      demoUser: {
        email: 'director@agamotto.systems',
        name: 'Event Director',
        roleHint: 'organizer' as const
      },
      overview:
        'Event organizers configure tournament rules, define weighted rubric architectures, monitor real-time judging completion quotas, and control cryptographic unmasking of winners for the awards ceremony.',
      responsibilities: [
        'Set up event parameters, tracks, prize pools, and deadline milestones',
        'Invite and assign expert judge panels across domain tracks',
        'Review participant registration requests and squad allocations',
        'Audit integrity pulse, review normalized score distributions, and publish results'
      ]
    }
  };

  const current = roleDetails[role];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Role Hero Card */}
      <div className="p-8 sm:p-10 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-white dark:bg-[#07080E] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[8px] bg-[#00F0FF]/15 dark:bg-[#C6FF1A]/15 border border-[#00F0FF] dark:border-[#C6FF1A] flex items-center justify-center shrink-0">
              {current.icon}
            </div>
            <div>
              <span className="text-xs font-mono-tech uppercase font-bold tracking-widest text-[#00F0FF] dark:text-[#C6FF1A]">
                {current.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl font-heading font-black text-neutral-900 dark:text-white mt-1">
                {current.title}
              </h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans mt-1">
                {current.tagline}
              </p>
            </div>
          </div>

          {/* Sign Up / Sign In Buttons Right in the Top Hero */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/signin')}
              className="text-xs font-mono-tech"
            >
              Sign In to {role.toUpperCase()}
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/signup')}
              icon={<ArrowRight className="w-4 h-4" />}
              className="text-xs font-mono-tech font-bold"
            >
              Sign Up as {role.toUpperCase()}
            </Button>
          </div>
        </div>

        {/* Overview Text */}
        <p className="text-base sm:text-lg text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed">
          {current.overview}
        </p>

        {/* Quick Demo Access Bar */}
        <div className="p-4 rounded-[6px] bg-neutral-50 dark:bg-[#0D0F18] border border-neutral-200 dark:border-[#1E2032] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono-tech text-xs">
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <UserCheck className="w-4 h-4 text-[#00F0FF] dark:text-[#C6FF1A]" />
            <span>
              Evaluating without creating an account? Use the <strong>{current.demoUser.name}</strong> preview.
            </span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => login(current.demoUser.email, current.demoUser.roleHint)}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Launch {current.demoUser.name} Portal
          </Button>
        </div>
      </div>

      {/* Role Responsibilities & Workflow Checklist */}
      <div className="p-6 sm:p-8 rounded-[8px] border border-neutral-200 dark:border-[#1E2032] bg-neutral-50 dark:bg-[#090A12] space-y-4">
        <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white">
          Role Workflow & Checklist
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {current.responsibilities.map((resp, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{resp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
