# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website for a youth soccer player. It's a single-page site built with vanilla HTML, CSS, and JavaScript—no build tools or frameworks required.

## Development Commands

```bash
# Start development server with live reload
npm run dev

# Start simple static server
npm run start
```

The dev server runs on port 3000 with live reload via `live-server`.

## Architecture

**Static Site Structure:**
- `index.html` - Single-page layout with semantic sections (hero, about, stats, highlights, achievements, gallery, testimonials, contact)
- `css/styles.css` - All styling using CSS custom properties for theming
- `js/main.js` - Vanilla JS with IIFE pattern for scroll animations, smooth scrolling, mobile nav, and form handling

**Design System (CSS Variables):**
- Colors: `--color-ink`, `--color-paper`, `--color-accent` (red), `--color-gold`
- Typography: Archivo (display), Crimson Pro (body)
- Spacing scale: `--space-xs` through `--space-xl`

**JavaScript Modules:**
- Scroll reveal animations (`.reveal` class)
- Navigation state changes on scroll
- Mobile hamburger toggle
- Contact form with client-side validation (currently logs to console—no backend)

## Content Placeholders

The site contains placeholder images marked with `.placeholder-img` class and SVG icons. When adding real images:
1. Place them in `assets/images/`
2. Replace the placeholder `<div>` elements with actual `<img>` tags
3. The hero image section is hidden on mobile via CSS

## Key Conventions

- CSS follows BEM-like naming within component sections
- All animations use the custom `--transition-smooth` timing function
- Responsive breakpoints: 1024px, 768px, 480px
