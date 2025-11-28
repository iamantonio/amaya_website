/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a1628',
          dark: '#050b14',
          light: '#0f2035',
          lighter: '#162a47',
        },
        warm: {
          white: '#faf8f5',
          cream: '#f5f0e8',
          ivory: '#fffef9',
        },
        accent: {
          red: '#e63946',
          'red-dark': '#c42f3b',
          'red-light': '#ff4d5a',
        },
        gold: {
          DEFAULT: '#f4a261',
          light: '#f7b77d',
          dark: '#e08c4a',
          pale: '#fcd9b6',
        },
        sky: '#4cc9f0',
        slate: {
          DEFAULT: '#64748b',
          light: '#94a3b8',
          dark: '#475569',
        },
      },
      fontFamily: {
        // Premium Sports Editorial Typography
        display: ['Bebas Neue', 'sans-serif'],      // Iconic condensed display
        heading: ['Plus Jakarta Sans', 'sans-serif'], // Modern geometric sans
        body: ['Cormorant', 'serif'],               // Elegant editorial serif
      },
      fontSize: {
        'hero': ['clamp(5rem, 15vw, 12rem)', { lineHeight: '0.85', letterSpacing: '0.02em' }],
        'hero-sub': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1', letterSpacing: '0.05em' }],
        'section': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'stat': ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '0' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content': '1400px',
        'narrow': '1000px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'dramatic': 'cubic-bezier(0.7, 0, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cta': 'linear-gradient(135deg, #e63946 0%, #f4a261 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a1628 0%, #050b14 100%)',
        'gradient-editorial': 'linear-gradient(135deg, #0a1628 0%, #162a47 50%, #0a1628 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-up-delay-1': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s',
        'fade-up-delay-2': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s',
        'fade-up-delay-3': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.3s',
        'fade-up-delay-4': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.4s',
        'fade-up-delay-5': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.5s',
        'fade-up-delay-6': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.6s',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blur-in': 'blurIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'line-grow': 'lineGrow 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(230, 57, 70, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(230, 57, 70, 0.6)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        lineGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      boxShadow: {
        'glow-red': '0 0 40px rgba(230, 57, 70, 0.4)',
        'glow-gold': '0 0 40px rgba(244, 162, 97, 0.4)',
        'inner-glow': 'inset 0 0 60px rgba(255, 255, 255, 0.05)',
        'editorial': '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
      },
      dropShadow: {
        'text': '0 2px 10px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(230, 57, 70, 0.5)',
      },
    },
  },
  plugins: [],
}
