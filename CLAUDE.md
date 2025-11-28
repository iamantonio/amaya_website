# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a premium sports editorial portfolio website for a youth soccer player. It's a single-page site built with Tailwind CSS and vanilla JavaScript.

## Development Commands

```bash
# Start development server with live reload and CSS watch
npm run dev

# Build CSS for production (minified)
npm run build

# Start simple static server
npm run start
```

The dev server runs on port 3000 with live reload via `live-server`.

## Architecture

**Static Site Structure:**
- `index.html` - Single-page layout with semantic sections (hero, marquee, about, stats, highlights, achievements, gallery, testimonials, contact)
- `src/input.css` - Tailwind CSS source with custom components and utilities
- `css/styles.css` - Compiled Tailwind CSS output (generated, do not edit directly)
- `js/main.js` - Vanilla JS with IIFE pattern for animations, counters, and interactions
- `tailwind.config.js` - Tailwind configuration with custom colors, fonts, and animations

**Design System (Tailwind CSS):**
- Colors: Navy (primary dark), Warm White/Cream (light backgrounds), Accent Red (#e63946), Gold (#f4a261)
- Typography: Bebas Neue (display/headlines), Plus Jakarta Sans (headings/UI), Cormorant (body/editorial)
- Custom animations: fade-up, float, glow, slide-in, scale-in, blur-in, marquee
- Utility classes: `.reveal`, `.reveal-left`, `.reveal-right`, `.stat-counter`, `.glass-card`, `.hover-lift`, `.noise-overlay`

**JavaScript Features:**
- Scroll progress indicator bar
- IntersectionObserver-based reveal animations
- Animated stat counters with easing functions
- Title underline animations on scroll
- Dynamic navigation background on scroll
- Mobile hamburger toggle with animated transform
- Contact form validation with toast notifications
- Gallery hover effects

## Content Placeholders

The site contains placeholder images marked with SVG icons and `.placeholder` class. When adding real images:
1. Place them in `assets/images/`
2. Replace the placeholder `<div>` elements with actual `<img>` tags
3. The hero image section is hidden on mobile via CSS

## Key Conventions

- Use Tailwind utility classes, extending via `src/input.css` for reusable components
- Custom component classes: `.btn-primary`, `.btn-secondary`, `.section-eyebrow`, `.section-title`, `.glass-card`, `.achievement-badge`
- Animation timing uses `ease-smooth` (cubic-bezier(0.16, 1, 0.3, 1))
- Responsive breakpoints: lg (1024px), md (768px), sm (640px)
- Run `npm run build` after modifying `src/input.css` or `tailwind.config.js`
