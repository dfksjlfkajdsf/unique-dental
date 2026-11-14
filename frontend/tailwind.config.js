/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        // Hero entrance
        'hero-fade': {
          '0%':   { opacity: '0', transform: 'translateY(28px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        // Subtle shimmer across text/cards
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        // Floating badge / pill
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        // Stat counter pop
        'count-in': {
          '0%':   { opacity: '0', transform: 'scale(0.7) translateY(12px)' },
          '70%':  { transform: 'scale(1.08) translateY(-2px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        // Underline grow
        'underline-grow': {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
        // Spin slow (for decorative rings)
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Ping glow
        'ping-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%':       { transform: 'scale(1.3)', opacity: '0' },
        },
        // Slide in from left
        'slide-left': {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // Slide in from right
        'slide-right': {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // Stagger card reveal
        'card-pop': {
          '0%':   { opacity: '0', transform: 'translateY(24px) scale(0.95)' },
          '60%':  { transform: 'translateY(-4px) scale(1.01)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        // Pulse slow
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.5' },
        },
        // Gradient shift (for CTA backgrounds)
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'hero-fade':      'hero-fade 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'hero-fade-slow': 'hero-fade 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
        'shimmer':        'shimmer 2s linear infinite',
        'float':          'float 3.5s ease-in-out infinite',
        'float-slow':     'float 5s ease-in-out infinite',
        'count-in':       'count-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'underline-grow': 'underline-grow 0.5s ease-out both',
        'spin-slow':      'spin-slow 12s linear infinite',
        'ping-slow':      'ping-slow 2.5s ease-in-out infinite',
        'slide-left':     'slide-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-right':    'slide-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'card-pop':       'card-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-slow':     'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x':     'gradient-x 4s ease infinite',
      },
    },
  },
  plugins: [],
};
