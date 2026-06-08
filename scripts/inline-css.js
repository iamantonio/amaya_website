#!/usr/bin/env node
/*
 * Inline the compiled stylesheet into the HTML <head> as a <style> block, replacing the
 * render-blocking <link rel="stylesheet">. Run at deploy time (see .github/workflows/deploy.yml).
 *
 * Why: on slow connections an external CSS request blocks first paint (the page stays blank
 * until it downloads while competing for bandwidth with fonts + the hero image). Inlining lets
 * the browser paint as soon as the HTML arrives.
 *
 * Usage:
 *   node scripts/inline-css.js                          # in place: index.html  (deploy)
 *   node scripts/inline-css.js index.html out.html      # to a separate file     (local test)
 */
const fs = require('fs');

const input = process.argv[2] || 'index.html';
const output = process.argv[3] || input;
const cssPath = process.argv[4] || 'css/styles.css';

let html = fs.readFileSync(input, 'utf8');
// CSS url()s are authored relative to /css/styles.css (e.g. ../assets/fonts/x.woff2).
// When inlined into /index.html at the site root, rewrite them to be root-relative.
const css = fs.readFileSync(cssPath, 'utf8').split('url(../assets/').join('url(assets/');

const link = '<link rel="stylesheet" href="css/styles.css">';
if (!html.includes(link)) {
  console.error('inline-css: stylesheet <link> not found in ' + input + ' — aborting (no change)');
  process.exit(1);
}

html = html.replace(link, '<style>' + css + '</style>');
fs.writeFileSync(output, html);
console.log('inline-css: inlined ' + css.length + ' bytes of CSS into ' + output);
