/*
 * Generate metric-matched fallback @font-face rules so swapping in the real web font
 * causes no layout shift (CLS). Pairs each web font with a system fallback and emits
 * size-adjust + ascent/descent/line-gap overrides computed by capsize.
 *
 * One-off authoring tool. Run with capsize installed:
 *   npm i -D @capsizecss/core @capsizecss/metrics
 *   node scripts/gen-font-fallbacks.mjs
 * then paste the output into src/input.css (and the family stacks into tailwind.config.js).
 */
import { createFontStack } from '@capsizecss/core';
import bebasNeue from '@capsizecss/metrics/bebasNeue';
import plusJakartaSans from '@capsizecss/metrics/plusJakartaSans';
import cormorant from '@capsizecss/metrics/cormorant';
import arial from '@capsizecss/metrics/arial';
import timesNewRoman from '@capsizecss/metrics/timesNewRoman';

const stacks = {
  display: createFontStack([bebasNeue, arial]),         // big headings
  heading: createFontStack([plusJakartaSans, arial]),   // labels / UI
  body: createFontStack([cormorant, timesNewRoman]),    // serif tagline
};

console.log('/* ============ GENERATED: paste @font-face into src/input.css ============ */');
for (const k of Object.keys(stacks)) console.log(stacks[k].fontFaces);
console.log('\n/* ============ font-family stacks (for tailwind.config.js) ============ */');
for (const k of Object.keys(stacks)) console.log(k + ': ' + JSON.stringify(stacks[k].fontFamily));
