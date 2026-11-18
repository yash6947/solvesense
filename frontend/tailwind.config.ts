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
        // LeetCode / GFG Professional Dark Mode Palette
        background: '#1a1a1a',
        surface: '#262626',
        'surface-subtle': '#202020',
        'surface-elevated': '#2c2c2c',
        'surface-hover': '#323232',
        card: '#262626',
        'card-border': '#333333',
        border: '#333333',
        'border-subtle': '#2a2a2a',
        'border-strong': '#404040',
        
        // LeetCode Standard Difficulty and State Colors
        lc: {
          bg: '#1a1a1a',
          card: '#262626',
          border: '#333333',
          easy: '#00b8a3',
          medium: '#ffc01e',
          hard: '#ff375f',
          green: '#2cbb5d',
          orange: '#ffa116',
          blue: '#3b82f6',
          text: '#eff1f6',
          muted: '#8c8c8c',
          dark: '#141414',
        },

        // GeeksforGeeks green accent
        gfg: {
          green: '#2f9e44',
          lightGreen: '#40c057',
          dark: '#1e1e1e',
          border: '#2e2e2e',
        },

        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
