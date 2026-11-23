import React from 'react';
import Link from 'next/link';
import { Sparkles, Terminal, Award, BookOpen, Layers, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1f1f1f] bg-[#090909] text-[#8c8c8c] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gradient-to-br from-[#2E5BFF] to-[#00e1ab] p-[1px]">
                <div className="w-full h-full bg-[#121212] rounded flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#00e1ab]" />
                </div>
              </div>
              <span className="font-headline font-bold text-base text-white">
                Solve<span className="text-[#00e1ab]">Sense</span>
              </span>
            </div>
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              Diagnostic AI problem-solving platform engineered for JEE Main & Advanced Physics aspirants. Understand root-cause concept dependencies with zero guesswork.
            </p>
            <div className="text-[11px] font-mono text-[#00e1ab]/80">
              Deterministic Engine • KaTeX Math Verified
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-headline font-bold text-white uppercase tracking-wider mb-3">
              Practice & Compete
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/solve" className="hover:text-white transition-colors">
                  JEE Advanced Question Bank
                </Link>
              </li>
              <li>
                <Link href="/solve?difficulty=HARD" className="hover:text-white transition-colors">
                  Challenging Mechanics Drills
                </Link>
              </li>
              <li>
                <Link href="/solve?isPYQ=true" className="hover:text-white transition-colors">
                  Official PYQ Archive (2020-2024)
                </Link>
              </li>
              <li>
                <Link href="/contests" className="hover:text-white transition-colors">
                  All-India Proctored Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Architecture */}
          <div>
            <h4 className="text-xs font-headline font-bold text-white uppercase tracking-wider mb-3">
              AI Pedagogical Engine
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-[#eff1f6]">
                <Sparkles className="w-3.5 h-3.5 text-[#2E5BFF]" />
                <span>Dual Mode Socratic Copilot</span>
              </li>
              <li className="flex items-center gap-2 text-[#eff1f6]">
                <Layers className="w-3.5 h-3.5 text-[#00e1ab]" />
                <span>Prerequisite DAG Gap Detection</span>
              </li>
              <li className="flex items-center gap-2 text-[#eff1f6]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff525c]" />
                <span>9-Class Mistake Taxonomy</span>
              </li>
              <li className="flex items-center gap-2 text-[#eff1f6]">
                <Award className="w-3.5 h-3.5 text-[#ffa116]" />
                <span>Problem-Solving Index (PSI)</span>
              </li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-xs font-headline font-bold text-white uppercase tracking-wider mb-3">
              Institutes & Scholars
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/institutes" className="hover:text-white transition-colors">
                  Coaching Institute Management
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-white transition-colors">
                  Kota Super-30 Talent Discovery
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white transition-colors">
                  National Physics Index Rankings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#666666]">
          <div>
            © {new Date().getFullYear()} SolveSense EdTech. Engineered for JEE Main & Advanced Aspirants.
          </div>
          <div className="flex items-center gap-3">
            <span>Deterministic Scoring (+4/-1)</span>
            <span>•</span>
            <span>Socratic AI Mentoring</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
