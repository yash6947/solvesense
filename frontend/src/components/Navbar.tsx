'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Flame,
  BarChart2,
  Trophy,
  Building2,
  Menu,
  X,
  LogOut,
  User,
  GraduationCap,
  Layers,
  ArrowRight,
  BookOpen,
  Code2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, logout } = useAuth();

  const navLinks = [
    { href: '/solve', label: 'Problems' },
    { href: '/contests', label: 'Contest' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/institutes', label: 'Institutes' },
    { href: '/scholarships', label: 'Scholarships' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#242424] bg-[#0a0a0a]/95 backdrop-blur-md select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-13 py-2">
          {/* Brand Logo & Main Nav */}
          <div className="flex items-center gap-7">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2E5BFF] to-[#00e1ab] p-[1px] shadow-glow-primary group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#121212] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#00e1ab]" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline font-bold text-lg text-white tracking-tight">
                  Solve<span className="text-[#00e1ab]">Sense</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#181818] text-[#8c8c8c] border border-[#262626]">
                  JEE Physics
                </span>
              </div>
            </Link>

            {/* Desktop Nav Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-headline tracking-wide uppercase transition-all ${
                      isActive
                        ? 'text-white font-semibold bg-[#1a1a1a] border border-[#2e2e2e] shadow-sm'
                        : 'text-[#8c8c8c] hover:text-[#eff1f6] hover:bg-[#141414]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center gap-3">
            {/* Target Exam Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141414] border border-[#262626] text-xs">
              <GraduationCap className="w-3.5 h-3.5 text-[#2E5BFF]" />
              <span className="font-mono text-[11px] text-[#eff1f6]">
                {profile?.targetExam?.replace('_', ' ') || 'JEE ADVANCED'} &apos;26
              </span>
            </div>

            {/* Streak Flame Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1c160b] border border-[#3d2a0c] text-xs font-semibold text-[#ffa116]">
              <Flame className="w-3.5 h-3.5 fill-[#ffa116] animate-pulse" />
              <span className="font-mono text-xs">{profile?.currentStreak || 7}d Streak</span>
            </div>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-[#262626]">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs text-[#eff1f6] hover:text-white group px-2 py-1 rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#181818] border border-[#2e2e2e] flex items-center justify-center font-bold text-xs text-[#00e1ab] group-hover:border-[#00e1ab]/50 transition-colors">
                    {user.fullName ? user.fullName[0].toUpperCase() : 'A'}
                  </div>
                  <span className="hidden xl:inline font-medium">{user.fullName?.split(' ')[0]}</span>
                </Link>

                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-[#8c8c8c] hover:text-[#ff525c] hover:bg-[#1a1a1a] transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2">
                <Link
                  href="/auth/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#8c8c8c] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#00e1ab] hover:bg-[#00c596] text-black shadow-sm transition-all"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#8c8c8c] hover:text-white hover:bg-[#141414] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#242424] space-y-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-xs font-headline uppercase ${
                      isActive
                        ? 'text-white font-semibold bg-[#1a1a1a]'
                        : 'text-[#8c8c8c] hover:text-white hover:bg-[#141414]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#242424] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-[#ffa116] fill-[#ffa116]" />
                <span className="font-mono">{profile?.currentStreak || 7}d Streak</span>
              </div>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-[#ff525c] flex items-center gap-1 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#00e1ab] font-bold"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
