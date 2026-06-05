# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Premium sports editorial portfolio website for Amaya Vargas, a youth soccer player (Chicago Inter, #42). Single-page static site built with Tailwind CSS and vanilla JavaScript — no framework, no bundler, no tests.

## Development Commands

```bash
npm run dev    # Tailwind watch + live-server on port 3000 (live reload)
npm run build  # Compile minified CSS to css/styles.css
npm run start  # Simple static server (npx serve)
```

**Important:** `css/styles.css` is the compiled Tailwind output and is committed to git (the site deploys as plain static files). After changing `src/input.css`, `tailwind.config.js`, or using new Tailwind classes in HTML/JS, run `npm run build` and commit the regenerated CSS. Never edit `css/styles.css` directly.

Tailwind only scans `./*.html` and `./js/**/*.js` (`content` in tailwind.config.js) — classes used anywhere else get purged from the build.

## Architecture

**Three source files:**
- `index.html` — single page in the "Scouting Dossier" editorial design (implemented from a Claude Design handoff, 2026-06-05); numbered sections: hero (`#top`: stroke-outline VARGAS watermark, cutout, credential rail), credential ticker, `#about` (01 Dossier: sticky headshot, quick-facts grid), `#coach` (02 Coach's View: A1–A6 strength cards), `#highlights` (03 The Film: 2 feature cards + 4 compact rows), `#achievements` (04 Selections: ledger rows), `#gallery` (05 In Frame: magazine grid), `#contact` (06 Talk to her parents: Formspree form + dossier PDF), footer, video modal
- `src/input.css` — Tailwind source: legacy component classes in `@layer components`, the Scouting Dossier system at the bottom (`.bebas`, `.label-sm`, `.stroke-cream`, `.grain`, `.rise` transform-only entrance, `.floaty`, `.ticker-track`, `.cta-shine`, `.link-underline`)
- `js/main.js` — single IIFE; each feature is an `init*()` function registered in `init()` at the bottom. Add new behavior as another `initX()` plus a call in `init()`.

**Design rule from the handoff:** entrances are TRANSFORM-ONLY (`.rise` — never animate opacity from 0) so the page can never load blank on throttled connections (stadium cellular).

**Standalone extras (not part of the Tailwind build):**
- `card-print.html` — print sheet for the physical NFC/QR player card (CR80 size, self-contained inline CSS on purpose)
- `assets/card/` — generated QR codes pointing to https://amayavargas.com
- `docs/nfc-card-guide.md` — how to buy/write/lock NFC cards and the pre-tryout test checklist

**JS ↔ HTML contracts** (classes and data attributes wire markup to main.js):
- Reveal animations: add `.reveal`, `.reveal-left`, `.reveal-right`, or `.reveal-scale`; an IntersectionObserver adds `.active` on scroll into view
- Stat counters: `.stat-counter` with `data-count="42"` and optional `data-suffix="+"`
- Video lightbox: `.video-trigger` with `data-video-id` (YouTube ID) and `data-video-title` opens the shared `#video-modal` iframe; closes on backdrop click or Escape
- Parallax: `[data-parallax="0.5"]` (speed factor)
- Section title underline animation: `.title-underline`

**Design system:**
- Colors: navy (dark sections), warm-white/cream (light sections), accent-red (#e63946), gold (#f4a261); dark and light sections alternate, dark ones use `.noise-overlay`
- Typography: Bebas Neue (`font-display`), Plus Jakarta Sans (`font-heading`), Cormorant serif (`font-body`); fluid sizes via `text-hero`, `text-section`, `text-stat`
- Animation timing: `ease-smooth` = cubic-bezier(0.16, 1, 0.3, 1); custom durations 400/600/800/1000ms
- Component classes: `.btn-primary`, `.btn-secondary`, `.section-eyebrow`, `.section-title`, `.glass-card`, `.achievement-badge`, `.form-input`

**Images:** real photos live in `assets/images/` (gallery shots under `assets/images/site_images/`). The hero uses a `<picture>` element with separate desktop (`hero-action.png`) and mobile (`hero-action-mobile.png`) crops. Highlight video thumbnails load from `img.youtube.com`.

## Deployment & Pending Work

- Hosting: self-hosted VPS at 5.161.123.224 (Hetzner, Ubuntu) — Caddy serves `/var/www/amayavargas.com` with automatic HTTPS for amayavargas.com; Caddyfile at `/etc/caddy/Caddyfile` (headers, caching, www→apex redirect live there)
- Deploys: push to `main` → `.github/workflows/deploy.yml` rsyncs the site to the VPS as user `deploy` (key in repo secret `VPS_DEPLOY_KEY`; local copy `~/.ssh/amaya_deploy_ed25519`). Dev-only files (src/, docs/, node_modules, configs) are excluded from the sync.
- Contact form posts to Formspree via AJAX (`submitForm()` in `js/main.js` posts to the form's `action` URL). It only works with a real Formspree endpoint, not locally.
- Privacy rules (she is a minor): no home address, no school name, no phone number, no athlete DMs/socials, contact routes through parents; keep the "managed by parents/guardians" footer line. Testimonials were removed until real coach quotes exist (restore from git history).
- Content policy: no statistics on the site — stats weren't tracked for the 2024-25 season, so any numbers would be unverifiable. The Stats section was removed deliberately (git history has it); don't re-add numbers without real tracked data. The `.stat-counter` JS contract remains in main.js but is currently unused.
- `docs/plans/` holds the original design and implementation plans for historical context.
