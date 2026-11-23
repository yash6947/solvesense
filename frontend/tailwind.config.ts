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
        // Stitch Design System Dark Palette
        background: '#0e0e0e',
        surface: '#141414',
        'surface-subtle': '#181818',
        'surface-elevated': '#1f1f1f',
        'surface-hover': '#262626',
        card: '#181818',
        'card-border': '#282828',
        border: '#282828',
        'border-subtle': '#222222',
        'border-strong': '#383838',

        // Brand & System Accents from Stitch
        brand: {
          primary: '#2E5BFF',
          secondary: '#6d88ff',
          tertiary: '#b8c3ff',
          emerald: '#00e1ab',
          mint: '#10b981',
          rose: '#ff525c',
          gold: '#ffa116',
          amber: '#ffc01e',
        },

        // Status & Evaluation Colors
        eval: {
          correct: '#00e1ab',
          incorrect: '#ff525c',
          partial: '#ffc01e',
          unattempted: '#8c8c8c',
        },

        // LeetCode / Competitive Compatibility Palette
        lc: {
          bg: '#0e0e0e',
          card: '#161616',
          border: '#282828',
          easy: '#00e1ab',
          medium: '#ffc01e',
          hard: '#ff525c',
          green: '#00e1ab',
          orange: '#ffa116',
          blue: '#2E5BFF',
          text: '#eff1f6',
          muted: '#8c8c8c',
          dark: '#0a0a0a',
        },
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 24px -4px rgba(46, 91, 255, 0.35)',
        'glow-emerald': '0 0 24px -4px rgba(0, 225, 171, 0.35)',
        'glow-rose': '0 0 24px -4px rgba(255, 82, 92, 0.35)',
        'glow-gold': '0 0 24px -4px rgba(255, 161, 22, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
