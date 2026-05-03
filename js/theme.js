// Theme toggle. Uses the View Transitions API for a circular wipe from the
// toggle button position when supported (Chrome/Edge/Safari 18+). Falls back
// to the existing cross-fade transition (.theme-transitioning) on Firefox or
// older Safari. Reduced-motion users get an instant swap with no animation.

import { prefersReducedMotion } from './utils.js';

const THEME_KEY = 'mostafa-theme';
const MONO_KEY = 'mostafa-mono';

function setMeta(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f5f3fa' : '#110828');
}

function persist(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
}

function applyImmediate(next) {
  const root = document.documentElement;
  root.classList.add('theme-transitioning');
  root.setAttribute('data-theme', next);
  setMeta(next);
  setTimeout(() => root.classList.remove('theme-transitioning'), 500);
}

function applyWithViewTransition(next, originX, originY) {
  const root = document.documentElement;
  root.style.setProperty('--vt-x', `${originX}px`);
  root.style.setProperty('--vt-y', `${originY}px`);
  // Tag the kind of transition so CSS can target the wipe specifically.
  root.classList.add('vt-theme-wipe');
  const transition = document.startViewTransition(() => {
    root.setAttribute('data-theme', next);
    setMeta(next);
  });
  transition.finished.finally(() => {
    root.classList.remove('vt-theme-wipe');
    root.style.removeProperty('--vt-x');
    root.style.removeProperty('--vt-y');
  });
}

function applyMono(on) {
  document.body.classList.toggle('mono', !!on);
}

export function init() {
  setMeta(document.documentElement.getAttribute('data-theme') || 'dark');

  // Restore monochrome preference if previously enabled.
  try {
    if (localStorage.getItem(MONO_KEY) === '1') applyMono(true);
  } catch (_) {}

  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    let clickCount = 0;
    let clickTimer = 0;

    btn.addEventListener('click', (e) => {
      // Always fire the normal toggle immediately — never delay single click.
      const root = document.documentElement;
      const current = root.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      persist(next);

      if (prefersReducedMotion() || !document.startViewTransition) {
        applyImmediate(next);
      } else {
        const r = btn.getBoundingClientRect();
        const cx = e.clientX || (r.left + r.width / 2);
        const cy = e.clientY || (r.top + r.height / 2);
        applyWithViewTransition(next, cx, cy);
      }

      // Triple-click within 400ms toggles monochrome on top of the theme.
      clickCount += 1;
      if (clickTimer) clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => { clickCount = 0; }, 400);
      if (clickCount >= 3) {
        clickCount = 0;
        const monoNext = !document.body.classList.contains('mono');
        applyMono(monoNext);
        try { localStorage.setItem(MONO_KEY, monoNext ? '1' : '0'); } catch (_) {}
      }
    });
  }

  if (window.matchMedia) {
    matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      let saved = null;
      try { saved = localStorage.getItem(THEME_KEY); } catch (_) {}
      if (saved) return; // user choice wins
      const next = e.matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      setMeta(next);
    });
  }
}
