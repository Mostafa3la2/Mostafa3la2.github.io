// Easter eggs & ambient delight:
//   1. Konami code (↑↑↓↓←→←→BA) toggles body.playground — aurora cycles
//      through 4 palettes on a 5s loop, ripples become rainbow. Persists.
//   2. 30s idle nudge — gentle pulse on the avatar dot on desktop, a small
//      glow ripple on mobile. Resets on any input.
//   3. DeviceOrientation aurora parallax — opt-in via a tilt button in the
//      status pill (touch devices only). iOS 13+ requires explicit permission
//      from a user gesture.

import { isCoarse, isHover, prefersReducedMotion } from './utils.js';

// ----- Konami -----

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];
const PLAYGROUND_KEY = 'mostafa-playground';

function applyPlayground(on) {
  document.body.classList.toggle('playground', !!on);
}

function initKonami() {
  let seq = [];
  document.addEventListener('keydown', (e) => {
    // Skip while user is typing in a field.
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    seq.push(k);
    if (seq.length > KONAMI.length) seq = seq.slice(seq.length - KONAMI.length);
    if (seq.length !== KONAMI.length) return;
    const match = seq.every((v, i) => v === KONAMI[i]);
    if (!match) return;
    seq = [];
    const next = !document.body.classList.contains('playground');
    applyPlayground(next);
    try { localStorage.setItem(PLAYGROUND_KEY, next ? '1' : '0'); } catch (_) {}
  });

  // Restore previous state.
  try {
    if (localStorage.getItem(PLAYGROUND_KEY) === '1') applyPlayground(true);
  } catch (_) {}
}

// ----- 30s idle nudge -----

function initIdleNudge() {
  if (prefersReducedMotion()) return;
  let timer = 0;
  const target = document.querySelector('.brand .squircle');
  if (!target) return;

  const reset = () => {
    if (timer) clearTimeout(timer);
    target.classList.remove('idle-nudge');
    timer = window.setTimeout(() => {
      target.classList.add('idle-nudge');
      // Auto-clear after one nudge animation cycle so it can fire again on next idle.
      setTimeout(() => target.classList.remove('idle-nudge'), 1800);
    }, 30000);
  };

  ['pointermove', 'pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((ev) => {
    window.addEventListener(ev, reset, { passive: true });
  });
  reset();
}

// ----- DeviceOrientation aurora parallax -----

function initTiltParallax() {
  if (!isCoarse()) return; // Mouse users have hover parallax already.
  if (prefersReducedMotion()) return;
  if (typeof DeviceOrientationEvent === 'undefined') return;

  const pill = document.querySelector('.status-pill');
  if (!pill) return;

  // Build a small "Tilt" toggle inside the pill.
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'pill-tilt';
  btn.setAttribute('aria-label', 'Enable motion parallax');
  btn.setAttribute('data-ripple', '');
  btn.textContent = 'Tilt';
  pill.appendChild(btn);

  let active = false;
  let raf = 0, tx = 0, ty = 0;

  const onOrientation = (e) => {
    // gamma: left/right (-90..90), beta: front/back (-180..180).
    const g = Math.max(-30, Math.min(30, e.gamma || 0));
    const b = Math.max(-30, Math.min(30, (e.beta || 0) - 30));
    tx = (g / 30) * 24;
    ty = (b / 30) * 24;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--px', tx.toFixed(1) + 'px');
      document.documentElement.style.setProperty('--py', ty.toFixed(1) + 'px');
      raf = 0;
    });
  };

  const start = () => {
    if (active) return;
    window.addEventListener('deviceorientation', onOrientation, true);
    active = true;
    btn.classList.add('on');
    btn.setAttribute('aria-label', 'Disable motion parallax');
  };

  const stop = () => {
    if (!active) return;
    window.removeEventListener('deviceorientation', onOrientation, true);
    active = false;
    btn.classList.remove('on');
    btn.setAttribute('aria-label', 'Enable motion parallax');
    document.documentElement.style.removeProperty('--px');
    document.documentElement.style.removeProperty('--py');
  };

  btn.addEventListener('click', async () => {
    if (active) { stop(); return; }
    // iOS 13+ permission gate.
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const result = await DeviceOrientationEvent.requestPermission();
        if (result !== 'granted') return;
      } catch (_) {
        return;
      }
    }
    start();
  });
}

export function init() {
  initKonami();
  initIdleNudge();
  initTiltParallax();
}
