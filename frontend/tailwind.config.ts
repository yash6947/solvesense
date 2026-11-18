import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0b0f19',
        card: '#111827',
        'card-border': '#1f2a3e',
        surface: '#151f32',
        'surface-elevated': '#1a263d',
        'surface-muted': '#0e1524',
        border: '#1f293d',
        'border-strong': '#2e3d57',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        electric: '#38bdf8',
        flow: {
          blue: '#3b82f6',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          purple: '#8b5cf6',
          slate: '#64748b',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#f43f5e',
      },
      boxShadow: {
        'flow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'flow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'flow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
        'flow-glow': '0 0 20px -3px rgba(59, 130, 246, 0.25)',
        'flow-glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.25)',
        'flow-glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.25)',
      },
      borderRadius: {
        'flow-pill': '9999px',
        'flow-card': '0.75rem',
      },
    },
  },
  plugins: [],
};

export default config;
