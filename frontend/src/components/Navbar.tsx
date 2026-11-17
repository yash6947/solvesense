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
  User as UserIcon,
  TrendingUp,
  Award
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
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-electric flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Atom className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                Zenith<span className="text-electric">Physics</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-electric border border-blue-500/20">
                  AI JEE
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-surface text-electric border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-surface/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-electric" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center gap-3">
            {/* Active Streak Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{profile?.currentStreak || 0}-Day Streak</span>
            </div>

            {/* AI Status Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini AI Active</span>
            </div>

            {user ? (
              <div className="flex items-center gap-3 ml-2 pl-3 border-l border-card-border">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm text-slate-200 hover:text-white"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-electric">
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="font-medium text-xs max-w-[100px] truncate">
                    {user.fullName}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-surface transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-surface transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md shadow-blue-600/20 transition-all"
                >
                  Start Learning
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-card-border bg-background px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:bg-surface hover:text-white font-medium text-sm"
              >
                <Icon className="w-5 h-5 text-slate-400" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-card-border flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-slate-200">{user.fullName}</span>
                <button
                  onClick={logout}
                  className="text-xs text-red-400 flex items-center gap-1 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg text-slate-200 hover:bg-surface text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-md shadow-blue-600/20"
                >
                  Start Learning
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
