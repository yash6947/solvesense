'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Code2, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoStudent = () => {
    setEmail('arjun@jee.zenith.edu');
    setPassword('Student@123');
    setError(null);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16 bg-[#1a1a1a]">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-10 h-10 rounded bg-[#ffa116] flex items-center justify-center mb-3">
            <Code2 className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Sign In to Solve Sense
          </h2>
          <p className="mt-1 text-xs text-[#8c8c8c]">
            Resume your competitive physics practice session
          </p>
        </div>

        {/* Demo Account Quick-Fill Card */}
        <div className="p-3 rounded bg-[#262626] border border-[#333333] flex items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00b8a3]" />
              <span>Demo Student Account</span>
            </div>
            <div className="text-[#8c8c8c] font-mono text-[11px]">arjun@jee.zenith.edu</div>
          </div>
          <button
            type="button"
            onClick={fillDemoStudent}
            className="px-2.5 py-1 rounded bg-[#333333] hover:bg-[#3d3d3d] text-white text-[11px] font-semibold border border-[#404040] transition-colors"
          >
            Auto-Fill
          </button>
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
            <div>
              <label className="block text-xs font-medium text-[#8c8c8c] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8c8c8c] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded bg-[#1f1f1f] border border-[#383838] focus:border-[#ffa116] text-white placeholder-[#6b7280] text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#8c8c8c]">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-[#ffa116] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8c8c8c] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded bg-[#1f1f1f] border border-[#383838] focus:border-[#ffa116] text-white placeholder-[#6b7280] text-xs outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded bg-[#ffa116] hover:bg-[#ff9500] text-black font-bold text-xs shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Verifying...' : 'Sign In'}
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </form>

          <div className="pt-3 border-t border-[#333333] text-center text-xs text-[#8c8c8c]">
            Don&apos;t have an account yet?{' '}
            <Link href="/auth/register" className="text-[#ffa116] font-semibold hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
