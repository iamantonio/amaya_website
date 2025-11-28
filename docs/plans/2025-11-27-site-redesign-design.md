# Amaya Vargas Website Redesign

**Date:** 2025-11-27
**Status:** Approved
**Tech Stack:** Tailwind CSS + Vanilla HTML/JS

## Goals

- Make the site less generic/template-like
- Add more polish and refinement
- Better engage college recruiters
- Modernize the overall aesthetic

## Target Audiences

1. **College recruiters** - Need quick access to stats, video, contact
2. **Family** - Want to celebrate the journey and share accomplishments

## Design Direction

**Bold & Athletic** meets **Warm & Personal** - Energetic and dynamic, but still human and approachable. Not cold corporate sports branding.

---

## Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Deep Navy | `#0a1628` | Primary backgrounds |
| Warm White | `#faf8f5` | Text, light backgrounds |
| Electric Red | `#e63946` | Primary accent |
| Gold | `#f4a261` | Achievements, highlights, warmth |
| Sky Blue | `#4cc9f0` | Secondary accent (sparingly) |
| Slate | `#64748b` | Secondary text, subtle UI |

**Gradients:**
- Hero: Subtle navy-to-darker-navy
- CTAs: Red-to-gold gradient
- Images: Overlay gradients for text readability

### Typography

**Archivo (Headlines):**
- Hero name: 900 weight, clamp(4rem, 10vw, 8rem)
- Section titles: 800 weight
- Stat numbers: 900 weight, oversized
- Eyebrows: 600 weight, all caps, wide letter-spacing

**Crimson Pro (Body):**
- Base size: 18px
- Line height: 1.7
- Italic for testimonial quotes

**Hierarchy Principle:** Dramatic contrast between levels. Massive headlines, confident subheads, quiet supporting text.

### Layout & Spacing

**Grid:**
- 12-column grid
- Max content width: 1400px
- Asymmetric layouts where appropriate

**Spacing:**
- Section padding: py-24 to py-32
- Principle: "Generous between, tight within"

**Visual Dynamism:**
- Overlapping elements (images breaking containers)
- Alternating section backgrounds (navy / warm white)
- Angled dividers between sections
- Subtle shadows and depth layering

**Mobile:**
- Stack gracefully, maintain bold typography
- Intentionally designed for thumb-scrolling

---

## Section Designs

### 1. Hero

**Left Side (Content):**
- Eyebrow: "FORWARD • CHICAGO INTER • #9" - all caps, letter-spaced, gold
- Name: Two-line treatment. "Amaya" warm white, "Vargas" red with offset
- Tagline: Crimson Pro italic
- Stats row: Three oversized numerals (24 goals, 12 assists, 78% accuracy)

**Right Side (Image):**
- Large player photo breaking out of container
- Subtle red/gold gradient overlay
- Placeholder: Stylized silhouette with jersey #9

**Background:**
- Deep navy with radial gradient
- Abstract geometric shapes (hexagon pattern) at low opacity

**Animation:**
- Name staggers in
- Stats count up on load
- Subtle parallax on background elements

### 2. About

**Layout:**
- Warm white background
- Asymmetric: Image 45% left, content right
- Image overlaps upward into hero

**Image:**
- Rounded corners
- Subtle shadow
- Placeholder: Geometric pattern with "Action Shot" label

**Content:**
- Eyebrow in gold: "GET TO KNOW"
- Headline "About Amaya" in navy
- Two short bio paragraphs
- Player details as 2x3 card grid (Position, Club, Foot, Grade, Height, GPA)

### 3. Stats

**Background:**
- Deep navy
- Subtle hexagon pattern at low opacity

**Layout:**
- 4-column grid (2x2 tablet, stacked mobile)
- Cards with generous padding

**Stat Cards:**
- Glass-morphism effect (semi-transparent, blur, light border)
- Oversized numbers (5-6rem), Archivo 900
- Numbers in warm white with subtle red glow
- Label beneath in slate
- Season indicator small at bottom

**Animation:**
- Cards stagger in on scroll
- Numbers count up from 0
- Hover: Card lifts, glow intensifies

### 4. Highlights

**Background:**
- Warm white
- Angled divider from stats section

**Layout:**
- Main video 65% left, thumbnail sidebar 35% right
- Mobile: Main video full width, thumbnails as horizontal scroll

**Main Video:**
- 16:9 container, rounded corners
- Dark overlay, animated pulse play button
- Title overlay at bottom with duration
- Placeholder: Navy + pattern + "Highlight Reel Coming Soon"

**Thumbnails:**
- Three videos: Goals, Skills, Full Game
- Mini play icon, title overlay
- Hover: Red border, slight lift
- Numbered 01, 02, 03 in corner

**Interaction:**
- Click opens centered modal with video
- Dark backdrop blur

### 5. Achievements

**Background:**
- Deep navy
- Subtle gold accent shapes

**Layout:**
- Featured achievement: Full-width card at top
- Secondary: 2x3 grid below

**Featured Card:**
- Horizontal: Icon left, content right
- Gold icon with glow
- Gradient border (red to gold)

**Standard Cards:**
- Vertical: Icon top, content below
- Gold outline icons
- Glass-morphism background
- Year badge in corner

**Animation:**
- Featured fades in first
- Grid staggers after
- Icons shimmer on reveal

### 6. Gallery

**Background:**
- Warm white
- Section title offset left

**Layout:**
- Masonry-style grid (varied heights)
- 3 columns desktop, 2 tablet, 1 mobile
- Small gaps (8-12px)

**Images:**
- Rounded corners
- Hover: Slight zoom, label overlay appears
- Placeholders: Different patterns, numbered, "Add Photo" text

**Interaction:**
- Click opens lightbox gallery
- Swipe/arrow navigation

### 7. Testimonials

**Background:**
- Deep navy
- Large quotation mark graphic at low opacity

**Layout:**
- Two cards side by side (stack on mobile)
- Generous card sizing

**Cards:**
- Warm white background
- Large red/gold opening quote mark
- Quote in Crimson Pro italic, 20-22px
- Author: Avatar circle + name/title
- Red accent line above author

**Animation:**
- Cards slide in from left/right
- Quote marks fade in with delay

### 8. Contact

**Background:**
- Warm white
- Angled divider from testimonials

**Layout:**
- Two-column: Info 40% left, form 60% right
- Mobile: Info stacks above form

**Left (Info):**
- Eyebrow in gold: "GET IN TOUCH"
- Headline: "Let's Connect"
- Contact details with icons (email, location)
- Social links row

**Right (Form):**
- Card with subtle shadow
- Floating label inputs
- Fields: Name, Email, Subject (dropdown), Message
- Navy border, red on focus
- Submit: Red-to-gold gradient button

**Success State:**
- Form replaced with confirmation + checkmark animation

### 9. Navigation

**Initial (at top):**
- Transparent background
- Logo: "Amaya" warm white, "Vargas" red
- Links warm white, underline hover
- Contact CTA: Outlined button

**Scrolled:**
- Navy glass-morphism background
- Slight shadow
- Smooth transition

**Mobile:**
- Animated hamburger (lines to X)
- Full-screen navy overlay
- Links large and centered
- Social icons at bottom

### 10. Footer

**Background:**
- Deepest navy
- Red/gold gradient top border

**Layout:**
- Compact, single section
- Logo centered
- Social icons row
- Copyright text small, muted

---

## Animations & Interactions

### Scroll Reveal
- Fade in + slide up on viewport entry
- Staggered timing for grouped elements
- Intersection Observer for performance
- Subtle, not distracting

### Micro-interactions
- Buttons: Lift + shadow hover, scale on click
- Cards: translateY + shadow on hover
- Links: Underline slides from left
- Inputs: Border transition, label float

### Number Counting
- Stats count from 0 on viewport entry
- ~1.5s duration, eased
- Triggers once only

### Page Load
- Hero content staggers: Eyebrow > Name > Tagline > Stats > CTAs
- ~800ms total sequence

### Performance
- Transform/opacity only (GPU-accelerated)
- Respect `prefers-reduced-motion`
- No heavy libraries

---

## Technical Implementation

### Stack
- **HTML:** Semantic structure
- **Tailwind CSS:** Utility-first styling via CDN or build
- **Vanilla JS:** Animations, interactions, form handling

### Build Approach
- Tailwind CLI for production build
- PostCSS for autoprefixer
- No framework overhead

### File Structure
```
/
├── index.html
├── css/
│   └── styles.css (Tailwind imports + custom)
├── js/
│   └── main.js
├── assets/
│   └── images/
├── tailwind.config.js
├── package.json
└── docs/
    └── plans/
```

### Performance Targets
- Lighthouse score: 90+ across all metrics
- First contentful paint: <1.5s
- Total page weight: <500KB (excluding videos)
