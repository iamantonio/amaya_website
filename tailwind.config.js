/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a1628',
          dark: '#060d17',
          light: '#0f2035',
        },
        warm: {
          white: '#faf8f5',
          cream: '#f5f0e8',
        },
        accent: {
          red: '#e63946',
          'red-dark': '#c42f3b',
        },
        gold: {
          DEFAULT: '#f4a261',
          light: '#f7b77d',
        },
        sky: '#4cc9f0',
        slate: {
          DEFAULT: '#64748b',
          light: '#94a3b8',
        },
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        body: ['Crimson Pro', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(4rem, 10vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'section': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'content': '1400px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cta': 'linear-gradient(135deg, #e63946 0%, #f4a261 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-up-delay-1': 'fadeUp 0.8s ease forwards 0.2s',
        'fade-up-delay-2': 'fadeUp 0.8s ease forwards 0.4s',
        'fade-up-delay-3': 'fadeUp 0.8s ease forwards 0.6s',
        'fade-up-delay-4': 'fadeUp 0.8s ease forwards 0.8s',
        'fade-up-delay-5': 'fadeUp 0.8s ease forwards 1s',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'count-up': 'countUp 1.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
