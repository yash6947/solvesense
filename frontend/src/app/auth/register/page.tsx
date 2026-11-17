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
    <div className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-surface/30 to-background">
      <div className="w-full max-w-xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4">
            <Atom className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Create Student Profile
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Set up your target competitive exam and calibrate your learning roadmap
          </p>
        </div>

        {/* Form Card */}
        <div className="p-8 rounded-2xl bg-card border border-card-border shadow-xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Account Credentials */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-electric border-b border-card-border pb-2">
                1. Account Details
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-card-border focus:border-electric focus:ring-1 focus:ring-electric text-white placeholder-slate-500 text-sm outline-none transition-colors"
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-card-border focus:border-electric focus:ring-1 focus:ring-electric text-white placeholder-slate-500 text-sm outline-none transition-colors"
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-card-border focus:border-electric focus:ring-1 focus:ring-electric text-white placeholder-slate-500 text-sm outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 2. Target Examination & Academic Level */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-electric border-b border-card-border pb-2">
                2. Target Examination & Level
              </h3>

              {/* Target Exam Selection Cards */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Target Exam
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'JEE_MAIN', label: 'JEE Main', desc: 'NTA Exam' },
                    { id: 'JEE_ADVANCED', label: 'JEE Advanced', desc: 'IIT Entrance' },
                    { id: 'BOTH_JEE', label: 'Main + Adv', desc: 'Comprehensive' },
                  ].map((exam) => (
                    <button
                      key={exam.id}
                      type="button"
                      onClick={() => setTargetExam(exam.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        targetExam === exam.id
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                          : 'bg-surface border-card-border text-slate-300 hover:border-slate-600'
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-card-border text-white text-sm outline-none focus:border-electric"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-card-border text-white text-sm outline-none focus:border-electric"
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
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Creating Your Account...' : 'Complete Registration & Open Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-card-border text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-electric font-semibold hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
