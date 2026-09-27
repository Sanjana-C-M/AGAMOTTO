import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { UserRole } from '../../types';
import {
  Shield,
  Scale,
  Code2,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Building,
  GraduationCap,
  Briefcase,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'signin' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'signin' }) => {
  const { login, register, navigate, setToast } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  // Common credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Role selector (ONLY in SignUp per spec)
  const [selectedRole, setSelectedRole] = useState<UserRole>('participant');

  // Role-specific fields
  // Participant
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [graduationYear, setGraduationYear] = useState('2027');
  const [githubUrl, setGithubUrl] = useState('');

  // Judge
  const [title, setTitle] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [specialization, setSpecialization] = useState('Infrastructure & Systems');

  // Organizer
  const [organization, setOrganization] = useState('');
  const [orgType, setOrgType] = useState('Research University');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (!email.trim() || !password.trim()) {
      setValidationError('Please enter both institutional email and password.');
      return;
    }
    // Spec: Role should NOT be selected here — backend determines it after login and redirects accordingly.
    login(email);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setValidationError('Please fill in all mandatory account credentials.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match. Please verify and retry.');
      return;
    }

    if (!termsAccepted) {
      setValidationError('You must accept the Double-Blind Judging & Anti-Collusion Terms.');
      return;
    }

    // Register with role-specific metadata
    register({
      name,
      email,
      role: selectedRole,
      college: selectedRole === 'participant' ? college : undefined,
      degree: selectedRole === 'participant' ? degree : undefined,
      graduationYear: selectedRole === 'participant' ? graduationYear : undefined,
      githubUrl: selectedRole === 'participant' ? githubUrl : undefined,
      title: selectedRole === 'judge' ? title : undefined,
      affiliation: selectedRole === 'judge' ? affiliation : undefined,
      specialization: selectedRole === 'judge' ? specialization : undefined,
      organization: selectedRole === 'organizer' ? organization : undefined,
      orgType: selectedRole === 'organizer' ? orgType : undefined
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-[#2F5CFF] dark:bg-[#C6FF1A] text-white dark:text-black font-heading font-black text-2xl mb-4 shadow-sm">
            A
          </div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-neutral-900 dark:text-white">
            {mode === 'signin' ? 'Sign in to AGAMOTTO' : 'Create Your AGAMOTTO Account'}
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {mode === 'signin'
              ? 'Enter your credentials. System automatically routes you to your authorized portal.'
              : 'Register your institutional profile with role-specific credentials.'}
          </p>
        </div>

        {/* Quick Demo Access Shortcuts */}
        <div className="mb-6 p-4 rounded-md border border-dashed border-neutral-300 dark:border-[#222436] bg-neutral-50/70 dark:bg-[#090910]">
          <div className="text-[11px] font-mono-tech uppercase font-bold text-neutral-500 dark:text-[#00F0FF] mb-2 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Instant Demo Access (Click to test role directly)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => login('kiran@stanford.edu', 'participant')}
              className="p-2.5 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0F101A] hover:border-[#2F5CFF] dark:hover:border-[#C6FF1A] text-left transition-colors text-xs cursor-pointer group"
            >
              <div className="font-bold text-neutral-900 dark:text-white">Participant</div>
              <div className="text-[10px] text-neutral-500 truncate">Kiran (Stanford)</div>
            </button>

            <button
              type="button"
              onClick={() => login('aris.thorne@vertex-systems.io', 'judge')}
              className="p-2.5 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0F101A] hover:border-[#2F5CFF] dark:hover:border-[#C6FF1A] text-left transition-colors text-xs cursor-pointer group"
            >
              <div className="font-bold text-neutral-900 dark:text-white">Judge Portal</div>
              <div className="text-[10px] text-neutral-500 truncate">Dr. Thorne (Blind)</div>
            </button>

            <button
              type="button"
              onClick={() => login('director@agamotto.systems', 'organizer')}
              className="p-2.5 rounded-md border border-neutral-200 dark:border-[#1E1E2C] bg-white dark:bg-[#0F101A] hover:border-[#2F5CFF] dark:hover:border-[#C6FF1A] text-left transition-colors text-xs cursor-pointer group"
            >
              <div className="font-bold text-neutral-900 dark:text-white">Organizer</div>
              <div className="text-[10px] text-neutral-500 truncate">Director Suite</div>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-[#08080E] border border-neutral-200 dark:border-[#1A1A28] rounded-md shadow-sm p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setValidationError(null);
              }}
              className={`pb-3 text-sm font-semibold border-b-2 mr-6 transition-colors ${
                mode === 'signin'
                  ? 'border-[#2F5CFF] text-[#2F5CFF] dark:border-[#C6FF1A] dark:text-[#C6FF1A]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setValidationError(null);
              }}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                mode === 'signup'
                  ? 'border-[#2F5CFF] text-[#2F5CFF] dark:border-[#C6FF1A] dark:text-[#C6FF1A]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Create Account (Sign Up)
            </button>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="mb-4 p-3 rounded bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-xs text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* 1. SIGN IN FORM: ONLY EMAIL + PASSWORD PER SPEC */}
          {mode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121D] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setToast('Password reset link sent to your registered email.')}
                    className="text-xs text-[#2F5CFF] dark:text-[#00F0FF] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121D] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div className="text-xs text-neutral-500 font-mono-tech">
                Role is determined automatically based on your authenticated permissions.
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In & Open Portal
              </Button>
            </form>
          ) : (
            /* 2. SIGN UP FORM: WITH ROLE SELECTOR & DETAILED ROLE FIELDS */
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Jordan Hayes"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121D] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121D] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121D] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#12121D] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-[#2F5CFF] dark:focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              {/* Role Selector per spec */}
              <div className="pt-2">
                <label className="block text-xs font-mono-tech uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Select User Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('participant')}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-md border text-center transition-all cursor-pointer ${
                      selectedRole === 'participant'
                        ? 'border-[#2F5CFF] bg-[#2F5CFF]/10 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Code2 className="w-4 h-4 text-[#2F5CFF] dark:text-[#C6FF1A]" />
                    <span className="text-xs">Participant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('judge')}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-md border text-center transition-all cursor-pointer ${
                      selectedRole === 'judge'
                        ? 'border-[#2F5CFF] bg-[#2F5CFF]/10 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Scale className="w-4 h-4 text-[#2F5CFF] dark:text-[#C6FF1A]" />
                    <span className="text-xs">Judge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('organizer')}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-md border text-center transition-all cursor-pointer ${
                      selectedRole === 'organizer'
                        ? 'border-[#2F5CFF] bg-[#2F5CFF]/10 dark:border-[#C6FF1A] dark:bg-[#C6FF1A]/10 text-neutral-900 dark:text-white font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-[#2F5CFF] dark:text-[#C6FF1A]" />
                    <span className="text-xs">Organizer</span>
                  </button>
                </div>
              </div>

              {/* Role-Specific Extra Fields per spec */}
              <div className="p-3.5 rounded-md bg-neutral-50 dark:bg-[#12121E] border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="text-[10px] font-mono-tech uppercase font-bold text-neutral-500">
                  {selectedRole.toUpperCase()} REGISTRATION DETAILS
                </div>

                {selectedRole === 'participant' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          College / University
                        </label>
                        <input
                          type="text"
                          required
                          value={college}
                          onChange={e => setCollege(e.target.value)}
                          placeholder="e.g. Stanford University"
                          className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Degree & Major
                        </label>
                        <input
                          type="text"
                          required
                          value={degree}
                          onChange={e => setDegree(e.target.value)}
                          placeholder="B.S. Computer Science"
                          className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Graduation Year
                        </label>
                        <input
                          type="text"
                          value={graduationYear}
                          onChange={e => setGraduationYear(e.target.value)}
                          placeholder="2027"
                          className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          GitHub Profile URL
                        </label>
                        <input
                          type="url"
                          value={githubUrl}
                          onChange={e => setGithubUrl(e.target.value)}
                          placeholder="https://github.com/handle"
                          className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedRole === 'judge' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Professional Title
                        </label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          placeholder="e.g. Principal Systems Architect"
                          className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Institution / Company Affiliation
                        </label>
                        <input
                          type="text"
                          required
                          value={affiliation}
                          onChange={e => setAffiliation(e.target.value)}
                          placeholder="e.g. Vertex Systems / MIT CSAIL"
                          className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Domain Specialization Track
                      </label>
                      <select
                        value={specialization}
                        onChange={e => setSpecialization(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none"
                      >
                        <option value="Infrastructure & Systems">Infrastructure & Systems</option>
                        <option value="Privacy & Cryptography">Privacy & Cryptography</option>
                        <option value="AI & Autonomous Systems">AI & Autonomous Systems</option>
                        <option value="BioTech & Health">BioTech & Health</option>
                      </select>
                    </div>
                  </>
                )}

                {selectedRole === 'organizer' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Organization / Foundation Name
                        </label>
                        <input
                          type="text"
                          required
                          value={organization}
                          onChange={e => setOrganization(e.target.value)}
                          placeholder="e.g. ACM / IEEE Student Branch"
                          className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Organization Entity Type
                        </label>
                        <select
                          value={orgType}
                          onChange={e => setOrgType(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#0A0A10] border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none"
                        >
                          <option value="Research University">Research University</option>
                          <option value="Industry Consortium">Industry Consortium</option>
                          <option value="Venture / Incubator">Venture / Incubator</option>
                          <option value="Non-Profit Foundation">Non-Profit Foundation</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={e => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#2F5CFF] dark:accent-[#C6FF1A] cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                  I agree to the AGAMOTTO Platform Rules, Double-Blind Integrity Policy, and Conflict-of-Interest Disclosure requirements.
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Complete Registration as {selectedRole}
              </Button>
            </form>
          )}

          {/* Switch link at bottom */}
          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center text-xs text-neutral-500">
            {mode === 'signin' ? (
              <span>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#2F5CFF] dark:text-[#00F0FF] font-semibold hover:underline"
                >
                  Create one now
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-[#2F5CFF] dark:text-[#00F0FF] font-semibold hover:underline"
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
