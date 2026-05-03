// Cross-section scroll choreography: aurora hue-shift per section, and
// section-heading letter-spacing track-in on viewport enter.
//
// Aurora hue-shift uses ScrollTrigger callbacks if available; otherwise
// IntersectionObserver as a graceful fallback (no scrub, just snap to the
// section's palette on enter). Heading track-in uses IntersectionObserver
// (cheaper than ScrollTrigger for one-shot reveals).

import { prefersReducedMotion } from './utils.js';

// Section → aurora palette (4 stops).
// Tuned to feel like camera-light shifting as the user moves through the
// portfolio rather than abrupt mode changes.
const PALETTES = {
  hero:     ['#5cb8ff', '#7c3aed', '#2a8fd4', '#a458d4'], // current default — blues + violet
  work:     ['#7c3aed', '#5cb8ff', '#a458d4', '#2a8fd4'], // violet-forward
  babysteps:['#a458d4', '#9457bd', '#7c3aed', '#5cb8ff'], // BabySteps purple
  career:   ['#2a8fd4', '#3aa6c9', '#5cb8ff', '#7ed0d8'], // teal
  toolkit:  ['#88ceff', '#5cb8ff', '#a458d4', '#d4476b'], // cool with a warm accent
  contact:  ['#5cb8ff', '#88ceff', '#a458d4', '#7c3aed'], // back toward blue
};

// Map sections in DOM order. Some sections aren't id'd in HTML — pick them up
// by their content ordering.
function findSections() {
  return [
    { key: 'hero',      el: document.querySelector('section.hero') },
    { key: 'work',      el: document.querySelector('section#work') },
    { key: 'babysteps', el: document.querySelector('section#babysteps') },
    { key: 'career',    el: document.querySelector('section#career') },
    { key: 'toolkit',   el: document.querySelector('section#toolkit') },
    { key: 'contact',   el: document.querySelector('section#contact') },
  ].filter((s) => s.el);
}

function applyPalette(key) {
  const palette = PALETTES[key];
  if (!palette) return;
  const root = document.documentElement;
  root.style.setProperty('--aurora-1', palette[0]);
  root.style.setProperty('--aurora-2', palette[1]);
  root.style.setProperty('--aurora-3', palette[2]);
  root.style.setProperty('--aurora-4', palette[3]);
}

function initAuroraHueShift() {
  const sections = findSections();
  if (!sections.length) return;

  if (window.gsap && window.ScrollTrigger) {
    sections.forEach(({ key, el }) => {
      window.ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => applyPalette(key),
        onEnterBack: () => applyPalette(key),
      });
    });
    return;
  }

  // Fallback — IntersectionObserver
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    let best = null;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
    }
    if (!best) return;
    const key = sections.find((s) => s.el === best.target)?.key;
    if (key) applyPalette(key);
  }, { threshold: [0.25, 0.5, 0.75] });
  sections.forEach(({ el }) => io.observe(el));
}

function initHeadingTrackIn() {
  const headings = document.querySelectorAll('.section-h');
  if (!headings.length || !('IntersectionObserver' in window)) return;
  if (prefersReducedMotion()) {
    headings.forEach((h) => h.classList.add('h-tracked'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('h-tracked');
      io.unobserve(e.target);
    }
  }, { threshold: 0.4 });
  headings.forEach((h) => io.observe(h));
}

export function init() {
  initAuroraHueShift();
  initHeadingTrackIn();
}
