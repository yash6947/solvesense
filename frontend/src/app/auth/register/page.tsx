'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Code2, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  AlertCircle, 
  GraduationCap
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
    <div className="flex-1 flex items-center justify-center px-4 py-16 bg-[#1a1a1a]">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-10 h-10 rounded bg-[#ffa116] flex items-center justify-center mb-3">
            <Code2 className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Create Student Profile
          </h2>
          <p className="mt-1 text-xs text-[#8c8c8c]">
            Calibrate your target examination and begin problem solving
          </p>
        </div>

        {/* Form Card */}
        <div className="p-6 rounded-lg bg-[#262626] border border-[#333333] space-y-4">
          {error && (
            <div className="p-3 rounded bg-[#381a1f] border border-[#ff375f] text-[#ff375f] text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Account Credentials */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#8c8c8c] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8c8c8c] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Arjun Sharma"
                    className="w-full pl-9 pr-3 py-2 rounded bg-[#1f1f1f] border border-[#383838] focus:border-[#ffa116] text-white placeholder-[#6b7280] text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8c8c8c] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8c8c8c] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arjun@example.com"
                    className="w-full pl-9 pr-3 py-2 rounded bg-[#1f1f1f] border border-[#383838] focus:border-[#ffa116] text-white placeholder-[#6b7280] text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8c8c8c] mb-1">
                  Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8c8c8c] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 rounded bg-[#1f1f1f] border border-[#383838] focus:border-[#ffa116] text-white placeholder-[#6b7280] text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Target Examination */}
            <div className="pt-2 border-t border-[#333333] space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#8c8c8c] mb-1.5">
                  Target Exam
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'JEE_MAIN', label: 'JEE Main' },
                    { id: 'JEE_ADVANCED', label: 'JEE Advanced' },
                    { id: 'BOTH_JEE', label: 'Main + Adv' },
                  ].map((exam) => (
                    <button
                      key={exam.id}
                      type="button"
                      onClick={() => setTargetExam(exam.id as any)}
                      className={`py-2 px-2 rounded border text-xs font-medium transition-colors ${
                        targetExam === exam.id
                          ? 'bg-[#2b2416] border-[#ffa116] text-[#ffa116]'
                          : 'bg-[#1f1f1f] border-[#383838] text-[#8c8c8c] hover:text-white'
                      }`}
                    >
                      {exam.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#8c8c8c] mb-1">
                    Academic Class
                  </label>
                  <select
                    value={academicLevel}
                    onChange={(e) => setAcademicLevel(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#1f1f1f] border border-[#383838] text-white text-xs outline-none focus:border-[#ffa116]"
                  >
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Dropper">Dropper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8c8c8c] mb-1">
                    Target Year
                  </label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded bg-[#1f1f1f] border border-[#383838] text-white text-xs outline-none focus:border-[#ffa116]"
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
              className="w-full py-2.5 px-4 rounded bg-[#ffa116] hover:bg-[#ff9500] text-black font-bold text-xs shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Creating Account...' : 'Complete Registration'}
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </form>

          <div className="pt-3 border-t border-[#333333] text-center text-xs text-[#8c8c8c]">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#ffa116] font-semibold hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
