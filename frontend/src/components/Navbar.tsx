'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code2,
  Flame,
  BarChart2,
  Terminal,
  Trophy,
  Building2,
  Menu,
  X,
  LogOut,
  User,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, logout } = useAuth();

  const navLinks = [
    { href: '/solve', label: 'Problems' },
    { href: '/contests', label: 'Contest' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/institutes', label: 'Institutes' },
    { href: '/scholarships', label: 'Scholarships' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#282828] bg-[#1a1a1a] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-13 py-2.5">
          {/* Brand Logo & Main Nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded bg-[#ffa116] flex items-center justify-center font-bold text-black text-sm shadow-sm group-hover:opacity-90 transition-opacity">
                <Code2 className="w-4 h-4 text-[#1a1a1a] stroke-[2.5]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-tight">
                  Zenith<span className="text-[#ffa116]">Code</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#282828] text-[#8c8c8c] border border-[#383838]">
                  Physics
                </span>
              </div>
            </Link>

            {/* LeetCode Style Desktop Nav Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded text-sm transition-colors ${
                      isActive
                        ? 'text-white font-medium bg-[#282828]'
                        : 'text-[#8c8c8c] hover:text-[#eff1f6] hover:bg-[#222222]'
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
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#242424] border border-[#333333] text-xs text-[#9ca3af]">
              <GraduationCap className="w-3.5 h-3.5 text-[#00b8a3]" />
              <span className="font-mono text-[11px] text-[#eff1f6]">{profile?.targetExam || 'JEE ADVANCED'} &apos;26</span>
            </div>

            {/* LeetCode Orange Streak Flame */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2b2416] border border-[#4a3b1d] text-xs font-semibold text-[#ffa116]">
              <Flame className="w-3.5 h-3.5 fill-[#ffa116]" />
              <span>{profile?.currentStreak || 7}</span>
            </div>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-[#333333]">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs text-[#eff1f6] hover:text-white group px-2 py-1 rounded hover:bg-[#282828] transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#383838] border border-[#4a4a4a] flex items-center justify-center font-bold text-[10px] text-white">
                    {user.fullName ? user.fullName[0].toUpperCase() : 'A'}
                  </div>
                  <span className="max-w-[100px] truncate font-medium">
                    {user.fullName || 'Arjun'}
                  </span>
                </Link>

                <button
                  onClick={() => logout()}
                  title="Sign out"
                  className="p-1.5 rounded text-[#8c8c8c] hover:text-[#ff375f] hover:bg-[#282828] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2">
                <Link
                  href="/auth/login"
                  className="px-3 py-1.5 text-xs font-medium text-[#eff1f6] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-[#ffa116] hover:bg-[#ff9500] text-black transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#2b2416] text-xs font-semibold text-[#ffa116]">
              <Flame className="w-3 h-3 fill-[#ffa116]" />
              <span>{profile?.currentStreak || 7}</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-[#8c8c8c] hover:text-white hover:bg-[#282828]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#282828] bg-[#1a1a1a] px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded text-sm ${
                  isActive
                    ? 'text-white font-medium bg-[#282828]'
                    : 'text-[#8c8c8c] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {user ? (
            <div className="pt-3 border-t border-[#282828] flex items-center justify-between">
              <span className="text-xs text-[#8c8c8c]">{user.email}</span>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-[#ff375f] font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-[#282828] flex gap-2">
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-1/2 py-2 text-center text-xs font-medium text-white bg-[#282828] rounded"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-1/2 py-2 text-center text-xs font-semibold text-black bg-[#ffa116] rounded"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
