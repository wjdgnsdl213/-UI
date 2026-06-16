import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Segoe UI',
          'Noto Sans KR',
          'Apple SD Gothic Neo',
          'sans-serif',
        ],
      },
      colors: {
        diagnosis: {
          blue: '#1297F5',
          blue2: '#006DFF',
          red: '#FF4B67',
          green: '#17B978',
          orange: '#FF9C2A',
          purple: '#7C4DFF',
          ink: '#111827',
          muted: '#667085',
          line: '#E8EDF5',
          bg: '#F4F7FB',
        },
      },
      boxShadow: {
        soft: '0 14px 40px rgba(15, 23, 42, 0.08)',
        card: '0 10px 30px rgba(15, 23, 42, 0.05)',
      },
      keyframes: {
        targetPulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(18, 151, 245, 0.45)' },
          '45%': { boxShadow: '0 0 0 8px rgba(18, 151, 245, 0.12)' },
          '100%': { boxShadow: '0 0 0 0 rgba(18, 151, 245, 0)' },
        },
      },
      animation: {
        targetPulse: 'targetPulse 1.2s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
