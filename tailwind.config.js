/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parikalp: {
          primary: '#1456A0',
          navy: '#102C50',
          bg: '#F4F7FB',
          surface: '#FFFFFF',
          lightblue: '#E5F0FA',
          subtle: '#F0F5FA',
          green: '#16A36A',
          amber: '#E9A126',
          red: '#DC3545',
          text: '#172B45',
          muted: '#64748B',
          border: '#DDE5EE',
          darkborder: '#1E3E68',
          accent: '#5C8F6A',
          warm: '#C97B4B',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(16, 44, 80, 0.05)',
        card: '0 1px 3px rgba(16, 44, 80, 0.06), 0 1px 2px rgba(16, 44, 80, 0.04)',
        elevated: '0 10px 25px -5px rgba(16, 44, 80, 0.08), 0 8px 10px -6px rgba(16, 44, 80, 0.04)',
        modal: '0 25px 50px -12px rgba(16, 44, 80, 0.25)',
        glow: '0 0 25px rgba(20, 86, 160, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        scan: 'scan 3s linear infinite',
        pulseSlow: 'pulseSlow 2.5s ease-in-out infinite',
        ticker: 'ticker 25s linear infinite',
      }
    },
  },
  plugins: [],
}
