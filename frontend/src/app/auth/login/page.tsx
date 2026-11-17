'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Atom, Lock, Mail, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <div className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-surface/30 to-background">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4">
            <Atom className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, Aspirant
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to resume your JEE Physics problem-solving session
          </p>
        </div>

        {/* Demo Account Quick-Fill Card */}
        <div className="p-4 rounded-xl bg-surface/70 border border-blue-500/30 flex items-center justify-between">
          <div className="text-xs space-y-0.5">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-electric" />
              <span>Demonstration Account</span>
            </div>
            <div className="text-slate-400 font-mono">arjun@jee.zenith.edu • JEE Adv &apos;26</div>
          </div>
          <button
            type="button"
            onClick={fillDemoStudent}
            className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-electric border border-blue-500/40 text-xs font-semibold transition-colors"
          >
            Auto-Fill
          </button>
        </div>

        {/* Form Card */}
        <div className="p-8 rounded-2xl bg-card border border-card-border shadow-xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="student@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-card-border focus:border-electric focus:ring-1 focus:ring-electric text-white placeholder-slate-500 text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-electric hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-card-border focus:border-electric focus:ring-1 focus:ring-electric text-white placeholder-slate-500 text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Verifying Credentials...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-card-border text-center text-xs text-slate-400">
            Don&apos;t have an account yet?{' '}
            <Link href="/auth/register" className="text-electric font-semibold hover:underline">
              Create student account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
