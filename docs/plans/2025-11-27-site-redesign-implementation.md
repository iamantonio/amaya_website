# Amaya Vargas Website Redesign - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the portfolio site with Tailwind CSS, implementing the Bold & Athletic + Warm & Personal design system across all sections.

**Architecture:** Replace custom CSS with Tailwind utility classes. Keep vanilla JS for interactions. Use Tailwind CLI for build process with custom configuration for the design system.

**Tech Stack:** Tailwind CSS 3.x, Vanilla HTML, Vanilla JavaScript

---

## Phase 1: Tailwind Setup

### Task 1: Initialize Tailwind CSS

**Files:**
- Modify: `package.json`
- Create: `tailwind.config.js`
- Create: `src/input.css`
- Create: `postcss.config.js`

**Step 1: Install Tailwind CSS and dependencies**

Run:
```bash
npm install -D tailwindcss postcss autoprefixer
```

**Step 2: Initialize Tailwind config**

Run:
```bash
npx tailwindcss init
```

**Step 3: Update package.json scripts**

Replace the scripts section in `package.json`:

```json
{
  "scripts": {
    "dev": "npx tailwindcss -i ./src/input.css -o ./css/styles.css --watch & npx live-server --port=3000",
    "build": "npx tailwindcss -i ./src/input.css -o ./css/styles.css --minify",
    "start": "npx serve ."
  }
}
```

**Step 4: Verify package.json is correct**

Run: `cat package.json`
Expected: Scripts section shows new dev/build commands

---

### Task 2: Configure Tailwind Design System

**Files:**
- Modify: `tailwind.config.js`

**Step 1: Write the complete Tailwind configuration**

Replace `tailwind.config.js` with:

```javascript
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
```

**Step 2: Verify config syntax**

Run: `node -e "require('./tailwind.config.js')"`
Expected: No error output

---

### Task 3: Create Base CSS Input File

**Files:**
- Create: `src/input.css`

**Step 1: Create src directory**

Run: `mkdir -p src`

**Step 2: Create the input CSS file**

Write to `src/input.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base layer customizations */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-body text-navy bg-warm-white overflow-x-hidden;
    font-size: 18px;
    line-height: 1.7;
  }

  h1, h2, h3, h4 {
    @apply font-display font-extrabold;
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* Component layer for reusable patterns */
@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 px-8 py-4
           bg-gradient-cta text-warm-white font-display font-bold
           text-xs uppercase tracking-widest
           transition-all duration-400 ease-smooth
           hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-red/30;
  }

  .btn-secondary {
    @apply inline-flex items-center gap-2 px-8 py-4
           bg-transparent text-warm-white font-display font-bold
           text-xs uppercase tracking-widest
           border-2 border-warm-white/50
           transition-all duration-400 ease-smooth
           hover:bg-warm-white hover:text-navy hover:-translate-y-0.5;
  }

  .section-eyebrow {
    @apply font-display text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2;
  }

  .section-title {
    @apply text-section font-extrabold;
  }

  .glass-card {
    @apply bg-white/5 backdrop-blur-sm border border-white/10
           transition-all duration-400 ease-smooth;
  }

  .glass-card:hover {
    @apply bg-white/10 -translate-y-1;
  }
}

/* Utility layer for one-off utilities */
@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-warm-white to-gold;
  }

  .reveal {
    @apply opacity-0 translate-y-10 transition-all duration-700 ease-smooth;
  }

  .reveal.active {
    @apply opacity-100 translate-y-0;
  }
}
```

**Step 3: Build CSS to verify setup**

Run: `npx tailwindcss -i ./src/input.css -o ./css/styles.css`
Expected: CSS file generated without errors

---

### Task 4: Verify Development Environment

**Step 1: Run the build process**

Run: `npm run build`
Expected: `css/styles.css` file is created/updated

**Step 2: Check generated CSS includes Tailwind**

Run: `head -20 css/styles.css`
Expected: Output shows Tailwind's CSS reset/base styles

**Step 3: Start dev server to verify hot reload works**

Run: `npm run dev` (run in background, then check localhost:3000)
Expected: Site loads (may look broken until HTML is updated - that's expected)

---

## Phase 2: Navigation Rebuild

### Task 5: Rebuild Navigation HTML Structure

**Files:**
- Modify: `index.html` (lines 21-39, navigation section)

**Step 1: Replace the navigation HTML**

Replace the `<nav class="nav">...</nav>` section with:

```html
<!-- Navigation -->
<nav id="nav" class="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-400 ease-smooth">
    <div class="max-w-content mx-auto flex justify-between items-center">
        <a href="#" class="font-display text-sm font-extrabold tracking-[0.15em] uppercase text-warm-white no-underline">
            Amaya <span class="text-accent-red">Vargas</span>
        </a>
        <ul id="nav-links" class="hidden lg:flex gap-8 list-none">
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#stats" class="nav-link">Stats</a></li>
            <li><a href="#highlights" class="nav-link">Highlights</a></li>
            <li><a href="#achievements" class="nav-link">Achievements</a></li>
            <li><a href="#gallery" class="nav-link">Gallery</a></li>
        </ul>
        <a href="#contact" class="hidden lg:inline-flex btn-secondary py-3 px-6 text-[0.65rem]">Contact</a>
        <button id="nav-toggle" class="lg:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer" aria-label="Menu" aria-expanded="false">
            <span class="block w-6 h-0.5 bg-warm-white transition-all duration-400 ease-smooth"></span>
            <span class="block w-6 h-0.5 bg-warm-white transition-all duration-400 ease-smooth"></span>
            <span class="block w-6 h-0.5 bg-warm-white transition-all duration-400 ease-smooth"></span>
        </button>
    </div>
    <!-- Mobile Menu -->
    <div id="mobile-menu" class="lg:hidden hidden fixed inset-0 top-[72px] bg-navy z-40">
        <div class="flex flex-col items-center justify-center h-full gap-8">
            <a href="#about" class="mobile-nav-link">About</a>
            <a href="#stats" class="mobile-nav-link">Stats</a>
            <a href="#highlights" class="mobile-nav-link">Highlights</a>
            <a href="#achievements" class="mobile-nav-link">Achievements</a>
            <a href="#gallery" class="mobile-nav-link">Gallery</a>
            <a href="#contact" class="btn-primary mt-4">Contact</a>
        </div>
    </div>
</nav>
```

**Step 2: Add nav link styles to input.css**

Add to the `@layer components` section in `src/input.css`:

```css
  .nav-link {
    @apply font-display text-xs font-semibold uppercase tracking-[0.1em]
           text-warm-white/70 no-underline relative
           transition-colors duration-400 ease-smooth
           hover:text-warm-white;
  }

  .nav-link::after {
    content: '';
    @apply absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-red
           transition-all duration-400 ease-smooth;
  }

  .nav-link:hover::after {
    @apply w-full;
  }

  .mobile-nav-link {
    @apply font-display text-2xl font-bold text-warm-white no-underline
           transition-colors duration-400 ease-smooth
           hover:text-gold;
  }
```

**Step 3: Rebuild CSS**

Run: `npm run build`
Expected: No errors

**Step 4: Visual verification**

Open localhost:3000 - navigation should show transparent with white text
Expected: Logo visible, links visible on desktop, hamburger on mobile

---

### Task 6: Update Navigation JavaScript

**Files:**
- Modify: `js/main.js`

**Step 1: Replace the navigation-related code in main.js**

Replace the entire `js/main.js` with the updated version (we'll do this incrementally, starting with nav):

Find the `elements` object and `initNavScroll` function, replace with:

```javascript
const elements = {
    nav: document.getElementById('nav'),
    navToggle: document.getElementById('nav-toggle'),
    navLinks: document.getElementById('nav-links'),
    mobileMenu: document.getElementById('mobile-menu'),
    reveals: document.querySelectorAll('.reveal'),
    contactForm: document.querySelector('.contact-form'),
    smoothScrollLinks: document.querySelectorAll('a[href^="#"]'),
    statValues: document.querySelectorAll('[data-count]')
};
```

Replace `initNavScroll` function:

```javascript
function initNavScroll() {
    function updateNavStyle() {
        if (window.scrollY > 100) {
            elements.nav.classList.add('bg-navy/95', 'backdrop-blur-md', 'shadow-lg');
        } else {
            elements.nav.classList.remove('bg-navy/95', 'backdrop-blur-md', 'shadow-lg');
        }
    }

    window.addEventListener('scroll', updateNavStyle, { passive: true });
    updateNavStyle();
}
```

Replace `initMobileNav` function:

```javascript
function initMobileNav() {
    if (elements.navToggle && elements.mobileMenu) {
        elements.navToggle.addEventListener('click', () => {
            const isOpen = elements.mobileMenu.classList.contains('hidden');
            elements.mobileMenu.classList.toggle('hidden');
            elements.navToggle.setAttribute('aria-expanded', isOpen);

            // Animate hamburger to X
            const spans = elements.navToggle.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close menu when clicking a link
        elements.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                elements.mobileMenu.classList.add('hidden');
                const spans = elements.navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }
}
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Open localhost:3000, scroll down - nav should get background
Click hamburger on mobile - menu should appear

---

## Phase 3: Hero Section Rebuild

### Task 7: Rebuild Hero HTML Structure

**Files:**
- Modify: `index.html` (hero section)

**Step 1: Replace the hero section HTML**

Replace `<section class="hero">...</section>` with:

```html
<!-- Hero Section -->
<section class="relative min-h-screen bg-navy overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-gradient-radial from-navy-light via-navy to-navy-dark"></div>
    <div class="absolute top-1/4 right-0 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-2xl"></div>

    <!-- Hexagon Pattern (decorative) -->
    <div class="absolute inset-0 opacity-5" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2728%27 height=%2749%27 viewBox=%270 0 28 49%27%3E%3Cg fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%271%27%3E%3Cpath d=%27M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>

    <div class="relative z-10 max-w-content mx-auto px-6 lg:px-12 min-h-screen grid lg:grid-cols-2 gap-8 items-center">
        <!-- Content -->
        <div class="pt-24 lg:pt-0">
            <span class="section-eyebrow opacity-0 animate-fade-up-delay-1">
                Forward &bull; Chicago Inter &bull; #9
            </span>
            <h1 class="text-hero text-warm-white mb-4 opacity-0 animate-fade-up-delay-2">
                Amaya
                <span class="block text-accent-red" style="margin-top: -0.1em;">Vargas</span>
            </h1>
            <p class="font-body text-xl italic text-slate-light max-w-md mb-8 opacity-0 animate-fade-up-delay-3">
                Driven by passion, defined by dedication. Building excellence one match at a time.
            </p>

            <!-- Hero Stats -->
            <div class="flex flex-wrap gap-8 lg:gap-12 mb-8 opacity-0 animate-fade-up-delay-4">
                <div>
                    <div class="font-display text-5xl lg:text-6xl font-black text-warm-white" data-count="24">24</div>
                    <div class="font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate mt-1">Goals This Season</div>
                </div>
                <div>
                    <div class="font-display text-5xl lg:text-6xl font-black text-warm-white" data-count="12">12</div>
                    <div class="font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate mt-1">Assists</div>
                </div>
                <div>
                    <div class="font-display text-5xl lg:text-6xl font-black text-warm-white">#9</div>
                    <div class="font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate mt-1">Jersey Number</div>
                </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up-delay-5">
                <a href="#highlights" class="btn-primary">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    Watch Highlights
                </a>
                <a href="#contact" class="btn-secondary">Get In Touch</a>
            </div>
        </div>

        <!-- Hero Image -->
        <div class="hidden lg:block relative">
            <div class="relative aspect-[3/4] bg-navy-light rounded-lg overflow-hidden">
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent z-10"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-accent-red/20 to-gold/10"></div>

                <!-- Placeholder -->
                <div class="absolute inset-0 flex flex-col items-center justify-center text-slate z-20">
                    <div class="text-[12rem] font-display font-black text-warm-white/5">#9</div>
                    <div class="absolute bottom-12 font-display text-xs uppercase tracking-[0.2em] text-slate-light">
                        Add Player Photo
                    </div>
                </div>
            </div>

            <!-- Decorative elements -->
            <div class="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-accent-red/20 rounded-lg -z-10"></div>
            <div class="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-lg -z-10"></div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-up-delay-5">
        <span class="font-display text-[0.6rem] uppercase tracking-[0.2em] text-slate">Scroll</span>
        <div class="w-px h-12 bg-gradient-to-b from-slate to-transparent animate-pulse-slow"></div>
    </div>
</section>
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Open localhost:3000 - hero should show navy background with large name, stats, and CTAs

---

## Phase 4: About Section Rebuild

### Task 8: Rebuild About Section

**Files:**
- Modify: `index.html` (about section)

**Step 1: Replace the about section HTML**

Replace `<section class="about" id="about">...</section>` with:

```html
<!-- About Section -->
<section id="about" class="relative py-24 lg:py-32 bg-warm-white overflow-hidden">
    <!-- Background accent -->
    <div class="absolute top-0 right-0 w-1/3 h-full bg-warm-cream -skew-x-12 origin-top-right"></div>

    <div class="relative max-w-content mx-auto px-6 lg:px-12">
        <div class="text-left mb-12">
            <span class="section-eyebrow text-gold">Get To Know</span>
            <h2 class="section-title text-navy">About Amaya</h2>
        </div>

        <div class="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-center">
            <!-- Image -->
            <div class="relative reveal">
                <div class="aspect-[3/4] bg-warm-cream rounded-2xl overflow-hidden shadow-xl">
                    <!-- Placeholder -->
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-slate">
                        <svg class="w-16 h-16 mb-4 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                        <span class="font-display text-xs uppercase tracking-[0.1em]">Action Shot</span>
                    </div>
                </div>
                <!-- Decorative -->
                <div class="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent-red/20 rounded-2xl -z-10"></div>
            </div>

            <!-- Content -->
            <div class="reveal">
                <h3 class="font-display text-2xl lg:text-3xl font-bold text-navy mb-6">
                    A Rising Star on the Pitch
                </h3>
                <p class="text-slate text-lg mb-4 leading-relaxed">
                    Amaya is a dynamic forward with an eye for goal and the speed to match. Her technical skills, combined with an unwavering work ethic, make her a formidable presence in any match.
                </p>
                <p class="text-slate text-lg mb-8 leading-relaxed">
                    Off the field, she maintains strong academic performance while dedicating herself to becoming the best player she can be. Her coaches describe her as coachable, focused, and a natural leader among her teammates.
                </p>

                <!-- Player Details Grid -->
                <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="bg-warm-cream p-4 rounded-lg">
                        <span class="block font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate mb-1">Position</span>
                        <span class="font-display text-lg font-bold text-navy">Forward / Striker</span>
                    </div>
                    <div class="bg-warm-cream p-4 rounded-lg">
                        <span class="block font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate mb-1">Club Team</span>
                        <span class="font-display text-lg font-bold text-navy">Chicago Inter</span>
                    </div>
                    <div class="bg-warm-cream p-4 rounded-lg">
                        <span class="block font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate mb-1">Dominant Foot</span>
                        <span class="font-display text-lg font-bold text-navy">Right</span>
                    </div>
                    <div class="bg-warm-cream p-4 rounded-lg">
                        <span class="block font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate mb-1">Grade</span>
                        <span class="font-display text-lg font-bold text-navy">Middle School</span>
                    </div>
                    <div class="bg-warm-cream p-4 rounded-lg">
                        <span class="block font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate mb-1">Height</span>
                        <span class="font-display text-lg font-bold text-navy">5'4"</span>
                    </div>
                    <div class="bg-warm-cream p-4 rounded-lg">
                        <span class="block font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate mb-1">GPA</span>
                        <span class="font-display text-lg font-bold text-navy">3.8</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Expected: About section shows warm white background, asymmetric layout

---

## Phase 5: Stats Section Rebuild

### Task 9: Rebuild Stats Section

**Files:**
- Modify: `index.html` (stats section)

**Step 1: Replace the stats section HTML**

Replace `<section class="stats" id="stats">...</section>` with:

```html
<!-- Stats Section -->
<section id="stats" class="relative py-24 lg:py-32 bg-navy overflow-hidden">
    <!-- Background elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl"></div>

    <!-- Hexagon pattern -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2728%27 height=%2749%27 viewBox=%270 0 28 49%27%3E%3Cg fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27%3E%3Cpath d=%27M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>

    <div class="relative max-w-content mx-auto px-6 lg:px-12">
        <div class="text-center mb-16">
            <span class="section-eyebrow">Performance</span>
            <h2 class="section-title text-warm-white">Season Statistics</h2>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <!-- Stat Card 1 -->
            <div class="glass-card p-6 lg:p-8 text-center reveal group">
                <div class="font-display text-5xl lg:text-7xl font-black text-gradient mb-2" data-count="24">
                    24
                </div>
                <div class="font-display text-xs font-semibold uppercase tracking-[0.15em] text-slate mb-1">
                    Goals Scored
                </div>
                <div class="font-body text-sm italic text-warm-white/40">
                    2024-25 Season
                </div>
                <!-- Accent line -->
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-cta scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-smooth"></div>
            </div>

            <!-- Stat Card 2 -->
            <div class="glass-card p-6 lg:p-8 text-center reveal group" style="transition-delay: 0.1s;">
                <div class="font-display text-5xl lg:text-7xl font-black text-gradient mb-2" data-count="12">
                    12
                </div>
                <div class="font-display text-xs font-semibold uppercase tracking-[0.15em] text-slate mb-1">
                    Assists
                </div>
                <div class="font-body text-sm italic text-warm-white/40">
                    2024-25 Season
                </div>
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-cta scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-smooth"></div>
            </div>

            <!-- Stat Card 3 -->
            <div class="glass-card p-6 lg:p-8 text-center reveal group" style="transition-delay: 0.2s;">
                <div class="font-display text-5xl lg:text-7xl font-black text-gradient mb-2" data-count="18">
                    18
                </div>
                <div class="font-display text-xs font-semibold uppercase tracking-[0.15em] text-slate mb-1">
                    Games Played
                </div>
                <div class="font-body text-sm italic text-warm-white/40">
                    2024-25 Season
                </div>
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-cta scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-smooth"></div>
            </div>

            <!-- Stat Card 4 -->
            <div class="glass-card p-6 lg:p-8 text-center reveal group" style="transition-delay: 0.3s;">
                <div class="font-display text-5xl lg:text-7xl font-black text-gradient mb-2">
                    78<span class="text-3xl lg:text-5xl">%</span>
                </div>
                <div class="font-display text-xs font-semibold uppercase tracking-[0.15em] text-slate mb-1">
                    Shot Accuracy
                </div>
                <div class="font-body text-sm italic text-warm-white/40">
                    2024-25 Season
                </div>
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-cta scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-smooth"></div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Expected: Stats section shows navy background with glass cards and gradient text

---

## Phase 6: Highlights Section Rebuild

### Task 10: Rebuild Highlights Section

**Files:**
- Modify: `index.html` (highlights section)

**Step 1: Replace the highlights section HTML**

Replace `<section class="highlights" id="highlights">...</section>` with:

```html
<!-- Highlights Section -->
<section id="highlights" class="relative py-24 lg:py-32 bg-warm-white overflow-hidden">
    <!-- Angled top border -->
    <div class="absolute top-0 left-0 right-0 h-24 bg-navy" style="clip-path: polygon(0 0, 100% 0, 100% 0%, 0 100%);"></div>

    <div class="relative max-w-content mx-auto px-6 lg:px-12 pt-8">
        <div class="text-left mb-12">
            <span class="section-eyebrow text-gold">Watch</span>
            <h2 class="section-title text-navy">Highlight Reel</h2>
        </div>

        <div class="grid lg:grid-cols-[2fr_1fr] gap-6">
            <!-- Main Video -->
            <div class="relative aspect-video bg-navy rounded-xl overflow-hidden cursor-pointer group reveal">
                <!-- Placeholder -->
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <div class="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent"></div>
                    <div class="relative z-10 text-[8rem] font-display font-black text-warm-white/5">#9</div>
                    <span class="relative z-10 font-display text-xs uppercase tracking-[0.2em] text-slate-light">
                        Highlight Reel Coming Soon
                    </span>
                </div>

                <!-- Play button -->
                <div class="absolute inset-0 flex items-center justify-center z-20">
                    <div class="w-20 h-20 bg-accent-red rounded-full flex items-center justify-center transition-all duration-400 ease-smooth group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-accent-red/30">
                        <svg class="w-6 h-6 text-warm-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    <!-- Pulse ring -->
                    <div class="absolute w-20 h-20 bg-accent-red/20 rounded-full animate-ping"></div>
                </div>

                <!-- Label -->
                <div class="absolute bottom-4 left-4 z-20">
                    <span class="font-display text-xs font-bold uppercase tracking-[0.1em] text-warm-white">
                        Full Season Highlights
                    </span>
                </div>
            </div>

            <!-- Thumbnail Sidebar -->
            <div class="flex lg:flex-col gap-4">
                <!-- Thumb 1 -->
                <div class="relative flex-1 aspect-video bg-warm-cream rounded-lg overflow-hidden cursor-pointer group reveal" style="transition-delay: 0.1s;">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-10 h-10 bg-navy/80 rounded-full flex items-center justify-center transition-all duration-400 group-hover:bg-accent-red">
                            <svg class="w-4 h-4 text-warm-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="absolute top-2 left-2 font-display text-[0.6rem] font-bold text-navy/30">01</div>
                    <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy/80 to-transparent">
                        <span class="font-display text-[0.65rem] font-semibold uppercase tracking-[0.05em] text-warm-white">
                            Goals Compilation
                        </span>
                    </div>
                    <!-- Hover border -->
                    <div class="absolute inset-0 border-2 border-transparent group-hover:border-accent-red rounded-lg transition-colors duration-400"></div>
                </div>

                <!-- Thumb 2 -->
                <div class="relative flex-1 aspect-video bg-warm-cream rounded-lg overflow-hidden cursor-pointer group reveal" style="transition-delay: 0.2s;">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-10 h-10 bg-navy/80 rounded-full flex items-center justify-center transition-all duration-400 group-hover:bg-accent-red">
                            <svg class="w-4 h-4 text-warm-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="absolute top-2 left-2 font-display text-[0.6rem] font-bold text-navy/30">02</div>
                    <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy/80 to-transparent">
                        <span class="font-display text-[0.65rem] font-semibold uppercase tracking-[0.05em] text-warm-white">
                            Skills & Footwork
                        </span>
                    </div>
                    <div class="absolute inset-0 border-2 border-transparent group-hover:border-accent-red rounded-lg transition-colors duration-400"></div>
                </div>

                <!-- Thumb 3 -->
                <div class="relative flex-1 aspect-video bg-warm-cream rounded-lg overflow-hidden cursor-pointer group reveal" style="transition-delay: 0.3s;">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-10 h-10 bg-navy/80 rounded-full flex items-center justify-center transition-all duration-400 group-hover:bg-accent-red">
                            <svg class="w-4 h-4 text-warm-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="absolute top-2 left-2 font-display text-[0.6rem] font-bold text-navy/30">03</div>
                    <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy/80 to-transparent">
                        <span class="font-display text-[0.65rem] font-semibold uppercase tracking-[0.05em] text-warm-white">
                            Full Game Film
                        </span>
                    </div>
                    <div class="absolute inset-0 border-2 border-transparent group-hover:border-accent-red rounded-lg transition-colors duration-400"></div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Expected: Highlights section shows angled top, main video with play button, thumbnail sidebar

---

## Phase 7: Achievements Section Rebuild

### Task 11: Rebuild Achievements Section

**Files:**
- Modify: `index.html` (achievements section)

**Step 1: Replace the achievements section HTML**

Replace `<section class="achievements" id="achievements">...</section>` with:

```html
<!-- Achievements Section -->
<section id="achievements" class="relative py-24 lg:py-32 bg-navy overflow-hidden">
    <!-- Background accents -->
    <div class="absolute top-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl"></div>

    <div class="relative max-w-content mx-auto px-6 lg:px-12">
        <div class="text-center mb-16">
            <span class="section-eyebrow">Recognition</span>
            <h2 class="section-title text-warm-white">Achievements & Awards</h2>
        </div>

        <!-- Featured Achievement -->
        <div class="glass-card p-8 lg:p-12 mb-8 reveal group">
            <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
                <div class="w-16 h-16 lg:w-20 lg:h-20 bg-gold rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
                    <svg class="w-8 h-8 lg:w-10 lg:h-10 text-navy" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                </div>
                <div class="flex-1">
                    <span class="font-display text-xs font-bold uppercase tracking-[0.15em] text-accent-red">2024</span>
                    <h4 class="font-display text-2xl lg:text-3xl font-bold text-warm-white mt-1 mb-2">Tournament MVP</h4>
                    <p class="text-slate-light text-lg">Most Valuable Player at the Regional Spring Classic, leading the team to victory with outstanding performance.</p>
                </div>
            </div>
            <!-- Gradient border effect -->
            <div class="absolute inset-0 rounded-lg bg-gradient-cta opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10 blur-xl"></div>
        </div>

        <!-- Achievement Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Achievement 1 -->
            <div class="glass-card p-6 reveal group" style="transition-delay: 0.1s;">
                <div class="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
                    </svg>
                </div>
                <span class="font-display text-xs font-bold uppercase tracking-[0.15em] text-accent-red">2024</span>
                <h4 class="font-display text-xl font-bold text-warm-white mt-1 mb-2">League Champions</h4>
                <p class="text-slate text-sm">Led team to first place in the competitive spring league.</p>
            </div>

            <!-- Achievement 2 -->
            <div class="glass-card p-6 reveal group" style="transition-delay: 0.15s;">
                <div class="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <span class="font-display text-xs font-bold uppercase tracking-[0.15em] text-accent-red">2023-24</span>
                <h4 class="font-display text-xl font-bold text-warm-white mt-1 mb-2">Golden Boot</h4>
                <p class="text-slate text-sm">Top scorer of the season with 24 goals.</p>
            </div>

            <!-- Achievement 3 -->
            <div class="glass-card p-6 reveal group" style="transition-delay: 0.2s;">
                <div class="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9z"/>
                    </svg>
                </div>
                <span class="font-display text-xs font-bold uppercase tracking-[0.15em] text-accent-red">2024</span>
                <h4 class="font-display text-xl font-bold text-warm-white mt-1 mb-2">Honor Roll</h4>
                <p class="text-slate text-sm">Maintained academic excellence while excelling on the field.</p>
            </div>

            <!-- Achievement 4 -->
            <div class="glass-card p-6 reveal group" style="transition-delay: 0.25s;">
                <div class="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                </div>
                <span class="font-display text-xs font-bold uppercase tracking-[0.15em] text-accent-red">2024</span>
                <h4 class="font-display text-xl font-bold text-warm-white mt-1 mb-2">Team Captain</h4>
                <p class="text-slate text-sm">Selected by coaches to lead the team as captain.</p>
            </div>

            <!-- Achievement 5 -->
            <div class="glass-card p-6 reveal group" style="transition-delay: 0.3s;">
                <div class="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                </div>
                <span class="font-display text-xs font-bold uppercase tracking-[0.15em] text-accent-red">2023</span>
                <h4 class="font-display text-xl font-bold text-warm-white mt-1 mb-2">All-Star Selection</h4>
                <p class="text-slate text-sm">Selected for the regional all-star team.</p>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Expected: Achievements shows featured card at top, grid below with gold icons

---

## Phase 8: Gallery Section Rebuild

### Task 12: Rebuild Gallery Section

**Files:**
- Modify: `index.html` (gallery section)

**Step 1: Replace the gallery section HTML**

Replace `<section class="gallery" id="gallery">...</section>` with:

```html
<!-- Gallery Section -->
<section id="gallery" class="relative py-24 lg:py-32 bg-warm-white overflow-hidden">
    <div class="max-w-content mx-auto px-6 lg:px-12">
        <div class="text-left mb-12">
            <span class="section-eyebrow text-gold">In Action</span>
            <h2 class="section-title text-navy">Photo Gallery</h2>
        </div>

        <!-- Masonry-style Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <!-- Large Feature Image -->
            <div class="col-span-2 row-span-2 relative aspect-square lg:aspect-auto bg-warm-cream rounded-xl overflow-hidden cursor-pointer group reveal">
                <div class="absolute inset-0 flex flex-col items-center justify-center text-slate">
                    <div class="font-display text-6xl font-black text-navy/5">01</div>
                    <svg class="w-12 h-12 opacity-30 mb-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    <span class="font-display text-xs uppercase tracking-[0.1em]">Add Photo</span>
                </div>
                <!-- Hover overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <span class="absolute bottom-4 left-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                    Match Day
                </span>
            </div>

            <!-- Image 2 -->
            <div class="relative aspect-square bg-warm-cream rounded-xl overflow-hidden cursor-pointer group reveal" style="transition-delay: 0.1s;">
                <div class="absolute inset-0 flex flex-col items-center justify-center text-slate">
                    <div class="font-display text-4xl font-black text-navy/5">02</div>
                    <svg class="w-8 h-8 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <span class="absolute bottom-3 left-3 font-display text-xs font-bold uppercase tracking-[0.1em] text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                    Training
                </span>
            </div>

            <!-- Image 3 -->
            <div class="relative aspect-square bg-warm-cream rounded-xl overflow-hidden cursor-pointer group reveal" style="transition-delay: 0.15s;">
                <div class="absolute inset-0 flex flex-col items-center justify-center text-slate">
                    <div class="font-display text-4xl font-black text-navy/5">03</div>
                    <svg class="w-8 h-8 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <span class="absolute bottom-3 left-3 font-display text-xs font-bold uppercase tracking-[0.1em] text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                    Celebration
                </span>
            </div>

            <!-- Image 4 -->
            <div class="relative aspect-square bg-warm-cream rounded-xl overflow-hidden cursor-pointer group reveal" style="transition-delay: 0.2s;">
                <div class="absolute inset-0 flex flex-col items-center justify-center text-slate">
                    <div class="font-display text-4xl font-black text-navy/5">04</div>
                    <svg class="w-8 h-8 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <span class="absolute bottom-3 left-3 font-display text-xs font-bold uppercase tracking-[0.1em] text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                    Tournament
                </span>
            </div>

            <!-- Image 5 -->
            <div class="relative aspect-square bg-warm-cream rounded-xl overflow-hidden cursor-pointer group reveal" style="transition-delay: 0.25s;">
                <div class="absolute inset-0 flex flex-col items-center justify-center text-slate">
                    <div class="font-display text-4xl font-black text-navy/5">05</div>
                    <svg class="w-8 h-8 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <span class="absolute bottom-3 left-3 font-display text-xs font-bold uppercase tracking-[0.1em] text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                    Team Spirit
                </span>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Expected: Gallery shows masonry-style grid with numbered placeholders

---

## Phase 9: Testimonials Section Rebuild

### Task 13: Rebuild Testimonials Section

**Files:**
- Modify: `index.html` (testimonials section)

**Step 1: Replace the testimonials section HTML**

Replace `<section class="testimonials">...</section>` with:

```html
<!-- Testimonials Section -->
<section class="relative py-24 lg:py-32 bg-navy overflow-hidden">
    <!-- Large quote mark background -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20rem] lg:text-[30rem] font-black text-warm-white/[0.02] leading-none select-none">
        "
    </div>

    <div class="relative max-w-content mx-auto px-6 lg:px-12">
        <div class="text-center mb-16">
            <span class="section-eyebrow">What They Say</span>
            <h2 class="section-title text-warm-white">Coach Testimonials</h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
            <!-- Testimonial 1 -->
            <div class="bg-warm-white p-8 lg:p-10 rounded-2xl reveal">
                <div class="relative mb-6">
                    <span class="absolute -top-4 -left-2 font-display text-6xl text-accent-red/20 leading-none">"</span>
                    <p class="font-body text-xl lg:text-2xl italic text-navy leading-relaxed pl-6">
                        Amaya has exceptional game intelligence for her age. Her ability to read plays and position herself is outstanding. She's the kind of player every coach wants on their team.
                    </p>
                </div>
                <div class="flex items-center gap-4 pt-6 border-t border-warm-cream">
                    <div class="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center">
                        <span class="font-display text-lg font-bold text-gold">JD</span>
                    </div>
                    <div>
                        <h4 class="font-display text-lg font-bold text-navy">Coach Name</h4>
                        <p class="font-display text-sm text-slate">Chicago Inter • Head Coach</p>
                    </div>
                </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="bg-warm-white p-8 lg:p-10 rounded-2xl reveal" style="transition-delay: 0.1s;">
                <div class="relative mb-6">
                    <span class="absolute -top-4 -left-2 font-display text-6xl text-accent-red/20 leading-none">"</span>
                    <p class="font-body text-xl lg:text-2xl italic text-navy leading-relaxed pl-6">
                        Her work ethic is unmatched. First to arrive at practice, last to leave. Amaya leads by example and elevates everyone around her. A true team player with elite individual skills.
                    </p>
                </div>
                <div class="flex items-center gap-4 pt-6 border-t border-warm-cream">
                    <div class="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center">
                        <span class="font-display text-lg font-bold text-gold">MS</span>
                    </div>
                    <div>
                        <h4 class="font-display text-lg font-bold text-navy">Coach Name</h4>
                        <p class="font-display text-sm text-slate">Chicago Inter • Assistant Coach</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Expected: Testimonials show white cards on navy background with large quote marks

---

## Phase 10: Contact Section Rebuild

### Task 14: Rebuild Contact Section

**Files:**
- Modify: `index.html` (contact section)

**Step 1: Replace the contact section HTML**

Replace `<section class="contact" id="contact">...</section>` with:

```html
<!-- Contact Section -->
<section id="contact" class="relative py-24 lg:py-32 bg-warm-white overflow-hidden">
    <!-- Angled top -->
    <div class="absolute top-0 left-0 right-0 h-24 bg-navy" style="clip-path: polygon(0 0, 100% 0, 100% 0%, 0 100%);"></div>

    <div class="relative max-w-content mx-auto px-6 lg:px-12 pt-8">
        <div class="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
            <!-- Contact Info -->
            <div class="reveal">
                <span class="section-eyebrow text-gold">Get In Touch</span>
                <h3 class="font-display text-4xl lg:text-5xl font-bold text-navy mb-6">Let's Connect</h3>
                <p class="text-slate text-lg mb-8 leading-relaxed">
                    Interested in learning more about Amaya? Reach out for recruitment inquiries, showcase events, or any questions.
                </p>

                <div class="space-y-4 mb-8">
                    <a href="mailto:contact@amayavargas.com" class="flex items-center gap-4 group">
                        <div class="w-12 h-12 bg-warm-cream rounded-lg flex items-center justify-center transition-colors duration-400 group-hover:bg-accent-red">
                            <svg class="w-5 h-5 text-accent-red transition-colors duration-400 group-hover:text-warm-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                        </div>
                        <span class="font-display text-sm font-medium text-navy group-hover:text-accent-red transition-colors">
                            contact@amayavargas.com
                        </span>
                    </a>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-warm-cream rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-accent-red" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                        </div>
                        <span class="font-display text-sm font-medium text-navy">
                            Chicago, Illinois
                        </span>
                    </div>
                </div>

                <!-- Social Links -->
                <div class="flex gap-3">
                    <a href="#" class="w-11 h-11 bg-navy rounded-lg flex items-center justify-center transition-all duration-400 hover:bg-accent-red hover:-translate-y-1" aria-label="Instagram">
                        <svg class="w-5 h-5 text-warm-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    <a href="#" class="w-11 h-11 bg-navy rounded-lg flex items-center justify-center transition-all duration-400 hover:bg-accent-red hover:-translate-y-1" aria-label="Twitter">
                        <svg class="w-5 h-5 text-warm-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </a>
                    <a href="#" class="w-11 h-11 bg-navy rounded-lg flex items-center justify-center transition-all duration-400 hover:bg-accent-red hover:-translate-y-1" aria-label="YouTube">
                        <svg class="w-5 h-5 text-warm-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Contact Form -->
            <form id="contact-form" class="bg-warm-cream p-8 lg:p-10 rounded-2xl reveal" style="transition-delay: 0.1s;">
                <div class="grid gap-6">
                    <div class="grid sm:grid-cols-2 gap-6">
                        <div class="form-group">
                            <label for="name" class="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-navy mb-2">Your Name</label>
                            <input type="text" id="name" name="name" required
                                   class="w-full px-4 py-3 bg-warm-white border-2 border-transparent rounded-lg font-body text-navy
                                          focus:outline-none focus:border-accent-red transition-colors duration-400">
                        </div>
                        <div class="form-group">
                            <label for="email" class="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-navy mb-2">Email Address</label>
                            <input type="email" id="email" name="email" required
                                   class="w-full px-4 py-3 bg-warm-white border-2 border-transparent rounded-lg font-body text-navy
                                          focus:outline-none focus:border-accent-red transition-colors duration-400">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="subject" class="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-navy mb-2">Subject</label>
                        <select id="subject" name="subject" required
                                class="w-full px-4 py-3 bg-warm-white border-2 border-transparent rounded-lg font-body text-navy
                                       focus:outline-none focus:border-accent-red transition-colors duration-400 cursor-pointer">
                            <option value="">Select a topic...</option>
                            <option value="recruitment">Recruitment Inquiry</option>
                            <option value="showcase">Showcase/Tournament</option>
                            <option value="general">General Question</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message" class="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-navy mb-2">Message</label>
                        <textarea id="message" name="message" rows="5" required
                                  class="w-full px-4 py-3 bg-warm-white border-2 border-transparent rounded-lg font-body text-navy resize-y min-h-[120px]
                                         focus:outline-none focus:border-accent-red transition-colors duration-400"></textarea>
                    </div>
                    <button type="submit" class="btn-primary justify-center py-4 rounded-lg">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Expected: Contact section shows two-column layout with form and contact info

---

## Phase 11: Footer Rebuild

### Task 15: Rebuild Footer

**Files:**
- Modify: `index.html` (footer section)

**Step 1: Replace the footer HTML**

Replace `<footer class="footer">...</footer>` with:

```html
<!-- Footer -->
<footer class="bg-navy-dark py-12 relative">
    <!-- Gradient top border -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-cta"></div>

    <div class="max-w-content mx-auto px-6 lg:px-12">
        <div class="flex flex-col items-center text-center">
            <!-- Logo -->
            <div class="font-display text-xl font-extrabold tracking-[0.1em] text-warm-white mb-6">
                Amaya <span class="text-accent-red">Vargas</span>
            </div>

            <!-- Social Links -->
            <div class="flex gap-4 mb-8">
                <a href="#" class="w-10 h-10 border border-warm-white/20 rounded-lg flex items-center justify-center transition-all duration-400 hover:bg-gold hover:border-gold" aria-label="Instagram">
                    <svg class="w-4 h-4 text-warm-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </a>
                <a href="#" class="w-10 h-10 border border-warm-white/20 rounded-lg flex items-center justify-center transition-all duration-400 hover:bg-gold hover:border-gold" aria-label="Twitter">
                    <svg class="w-4 h-4 text-warm-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>
                <a href="#" class="w-10 h-10 border border-warm-white/20 rounded-lg flex items-center justify-center transition-all duration-400 hover:bg-gold hover:border-gold" aria-label="YouTube">
                    <svg class="w-4 h-4 text-warm-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                </a>
            </div>

            <!-- Copyright -->
            <p class="font-display text-xs text-slate tracking-wide">
                &copy; 2024 Amaya Vargas. All rights reserved.
            </p>
        </div>
    </div>
</footer>
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Expected: Footer shows centered logo, social icons, copyright

---

## Phase 12: JavaScript Updates

### Task 16: Update Main JavaScript

**Files:**
- Modify: `js/main.js`

**Step 1: Replace the entire main.js file**

Write to `js/main.js`:

```javascript
/**
 * Amaya Vargas - Youth Soccer Player Portfolio
 * Main JavaScript (Redesigned)
 */

(function() {
    'use strict';

    const elements = {
        nav: document.getElementById('nav'),
        navToggle: document.getElementById('nav-toggle'),
        mobileMenu: document.getElementById('mobile-menu'),
        reveals: document.querySelectorAll('.reveal'),
        contactForm: document.getElementById('contact-form'),
        smoothScrollLinks: document.querySelectorAll('a[href^="#"]'),
        statValues: document.querySelectorAll('[data-count]')
    };

    /**
     * Scroll Reveal using Intersection Observer
     */
    function initScrollReveal() {
        if (!('IntersectionObserver' in window)) {
            elements.reveals.forEach(el => el.classList.add('active'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.reveals.forEach(el => observer.observe(el));
    }

    /**
     * Number Counter Animation
     */
    function initNumberCounter() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.dataset.count, 10);
                    animateCount(target, countTo);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        elements.statValues.forEach(el => observer.observe(el));
    }

    function animateCount(element, target) {
        const duration = 1500;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    /**
     * Navigation Scroll Effect
     */
    function initNavScroll() {
        function updateNavStyle() {
            if (window.scrollY > 100) {
                elements.nav.classList.add('bg-navy/95', 'backdrop-blur-md', 'shadow-lg');
            } else {
                elements.nav.classList.remove('bg-navy/95', 'backdrop-blur-md', 'shadow-lg');
            }
        }

        window.addEventListener('scroll', updateNavStyle, { passive: true });
        updateNavStyle();
    }

    /**
     * Mobile Navigation
     */
    function initMobileNav() {
        if (!elements.navToggle || !elements.mobileMenu) return;

        elements.navToggle.addEventListener('click', () => {
            const isOpen = elements.mobileMenu.classList.contains('hidden');
            elements.mobileMenu.classList.toggle('hidden');
            elements.navToggle.setAttribute('aria-expanded', isOpen);

            // Animate hamburger
            const spans = elements.navToggle.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
                document.body.style.overflow = '';
            }
        });

        // Close on link click
        elements.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                elements.mobileMenu.classList.add('hidden');
                const spans = elements.navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
                document.body.style.overflow = '';
            });
        });
    }

    /**
     * Smooth Scroll
     */
    function initSmoothScroll() {
        elements.smoothScrollLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (!href.startsWith('#') || href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (!target) return;

                const navHeight = elements.nav?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Contact Form
     */
    function initContactForm() {
        if (!elements.contactForm) return;

        elements.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate submission
            const button = e.target.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Form submitted:', data);
                showNotification('Thank you! We\'ll be in touch soon.', 'success');
                e.target.reset();
            } catch (error) {
                showNotification('Something went wrong. Please try again.', 'error');
            } finally {
                button.textContent = originalText;
                button.disabled = false;
            }
        });
    }

    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg z-50 font-display text-sm font-medium transform translate-y-full opacity-0 transition-all duration-400 ${
            type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-accent-red text-white'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        });

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateY(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }

    /**
     * Initialize
     */
    function init() {
        initScrollReveal();
        initNumberCounter();
        initNavScroll();
        initMobileNav();
        initSmoothScroll();
        initContactForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
```

**Step 2: Rebuild and verify**

Run: `npm run build`
Test: Scroll reveals, nav changes, stat counting all work

---

## Phase 13: Final Polish

### Task 17: Build and Test Complete Site

**Step 1: Full production build**

Run: `npm run build`
Expected: No errors, CSS file generated

**Step 2: Start dev server**

Run: `npm run dev`
Open: http://localhost:3000

**Step 3: Manual verification checklist**

- [ ] Hero loads with animations
- [ ] Nav becomes solid on scroll
- [ ] Mobile menu works (hamburger animation)
- [ ] All sections have correct backgrounds (alternating navy/white)
- [ ] Stats count up when scrolling into view
- [ ] Scroll reveal animations work
- [ ] Contact form validates and shows notifications
- [ ] Responsive layout works at all breakpoints
- [ ] All hover states work (buttons, cards, links)

---

## Summary

**Total Tasks:** 17 tasks across 13 phases

**Files Modified/Created:**
- `package.json` - Updated scripts
- `tailwind.config.js` - Created with design system
- `src/input.css` - Created with Tailwind directives
- `index.html` - Complete HTML rebuild
- `js/main.js` - Updated JavaScript
- `css/styles.css` - Generated by Tailwind

**To Execute:** Use `/superpowers:execute-plan` or run tasks manually in sequence.
