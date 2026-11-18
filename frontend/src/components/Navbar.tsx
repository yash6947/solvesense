'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Atom, 
  Flame, 
  BarChart3, 
  BookOpen, 
  Trophy, 
  Building2, 
  Menu, 
  X,
  Sparkles,
  LogOut,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, logout } = useAuth();

  const navLinks = [
    { href: '/solve', label: 'Problems', icon: BookOpen },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/analytics', label: 'Analytics', icon: TrendingUp },
    { href: '/contests', label: 'Contests', icon: Trophy },
    { href: '/institutes', label: 'Institutes', icon: Building2 },
    { href: '/scholarships', label: 'Scholarships', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Atom className="w-5 h-5 text-blue-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
                  Zenith<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Physics</span>
                </span>
                <span className="flow-pill flow-pill-blue text-[10px] py-0.5 px-2 font-mono">
                  PRO
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation (Flowbite-style pill bar) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/60">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center gap-3">
            {/* Active Streak Badge */}
            <div className="flow-pill flow-pill-amber">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{profile?.currentStreak || 0}d Streak</span>
            </div>

            {/* AI Status Badge */}
            <div className="flow-pill flow-pill-emerald hidden lg:inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gemini Mentor</span>
            </div>

            {user ? (
              <div className="flex items-center gap-2.5 ml-2 pl-3 border-l border-slate-800">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white group px-2 py-1 rounded-lg hover:bg-slate-900 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-sm shadow-blue-500/20">
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate group-hover:text-blue-300 transition-colors">
                    {user.fullName}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/register"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-600/30 transition-all flex items-center gap-1.5"
                >
                  <span>Start Learning</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between py-2 px-2">
                <span className="text-sm font-medium text-slate-200">{user.fullName}</span>
                <button
                  onClick={logout}
                  className="text-xs text-rose-400 flex items-center gap-1 font-medium hover:underline"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl text-slate-200 bg-slate-900 hover:bg-slate-800 text-xs font-semibold border border-slate-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20"
                >
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
