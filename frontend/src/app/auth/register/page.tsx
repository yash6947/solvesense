'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Atom, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  AlertCircle, 
  GraduationCap, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetExam, setTargetExam] = useState<'JEE_MAIN' | 'JEE_ADVANCED' | 'BOTH_JEE'>('JEE_ADVANCED');
  const [targetYear, setTargetYear] = useState<number>(2026);
  const [academicLevel, setAcademicLevel] = useState<string>('Class 12');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await register({
        fullName,
        email,
        password,
        targetExam,
        targetYear: Number(targetYear),
        academicLevel,
        preferredSubjects: ['Physics'],
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient flow glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl space-y-7 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-transparent border border-blue-500/30 shadow-lg shadow-blue-500/10 mb-4">
            <Atom className="w-8 h-8 text-blue-400" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3 block w-fit mx-auto">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Target Calibration & Profile Setup</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Create Student Profile
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Calibrate your target exam, track conceptual mastery, and unlock AI-guided practice
          </p>
        </div>

        {/* Form Card */}
        <div className="flow-card p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Account Credentials */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-mono">1</span>
                <span>Account Credentials</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Arjun Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="arjun@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 2. Target Examination & Academic Level */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-mono">2</span>
                <span>Target Examination & Prep Timeline</span>
              </h3>

              {/* Target Exam Selection Cards */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Target Examination
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'JEE_MAIN', label: 'JEE Main', desc: 'NTA Standard' },
                    { id: 'JEE_ADVANCED', label: 'JEE Advanced', desc: 'IIT Benchmark' },
                    { id: 'BOTH_JEE', label: 'Main + Adv', desc: 'Full Dual Track' },
                  ].map((exam) => (
                    <button
                      key={exam.id}
                      type="button"
                      onClick={() => setTargetExam(exam.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        targetExam === exam.id
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm ring-1 ring-blue-500/40'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="text-xs font-bold">{exam.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{exam.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Academic Year / Class
                  </label>
                  <select
                    value={academicLevel}
                    onChange={(e) => setAcademicLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Class 11">Class 11 (Foundation)</option>
                    <option value="Class 12">Class 12 (Board + JEE)</option>
                    <option value="Dropper">Dropper / Repeater</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Target Exam Year
                  </label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Creating Your Account...' : 'Complete Registration & Open Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
