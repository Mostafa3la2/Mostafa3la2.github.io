// Smooth-scroll core. Lenis owns smoothing; GSAP ScrollTrigger gets bridged so
// scroll-driven scenes (Phase 2) update on Lenis frames instead of the native
// scroll event. Anchor links are re-routed through lenis.scrollTo.
//
// CDN libraries (gsap, ScrollTrigger, Lenis) load with `defer`; this module
// loads as `type="module"` which is also implicitly deferred. Their relative
// execution order isn't strictly guaranteed, so we poll briefly. If a CDN
// outage means the libs never arrive, we fall back to the vanilla scroll
// progress writer (the original behavior) and the site degrades cleanly.

import { rafThrottle, prefersReducedMotion } from './utils.js';

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

function vanillaProgress() {
  const progress = document.querySelector('.progress');
  if (!progress) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.transform = `scaleX(${pct})`;
  };
  window.addEventListener('scroll', rafThrottle(update), { passive: true });
  update();
}

function initLenis() {
  const Lenis = window.Lenis;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!Lenis) return false;

  const reduced = prefersReducedMotion();

  lenisInstance = new Lenis({
    duration: reduced ? 0 : 1.2,
    lerp: reduced ? 1 : 0.1,
    smoothWheel: !reduced,
    syncTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  // Bridge to GSAP ticker if available, otherwise drive a plain rAF loop.
  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (time) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  // Scroll-progress hairline reads from Lenis's scroll event (cheaper than the
  // native scroll listener now that Lenis is the source of truth).
  const progress = document.querySelector('.progress');
  if (progress) {
    const updateProgress = ({ scroll, limit }) => {
      const pct = limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0;
      progress.style.transform = `scaleX(${pct})`;
    };
    lenisInstance.on('scroll', updateProgress);
    updateProgress({ scroll: 0, limit: 0 });
  }

  // Anchor links — let Lenis handle the smooth jump so it doesn't fight the
  // browser's instant jump or the (now-removed) CSS scroll-behavior.
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    lenisInstance.scrollTo(target, { duration: reduced ? 0 : 1.1, offset: -80 });
  });

  // Visual viewport (mobile keyboard, browser UI changes) → recompute scroll.
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      lenisInstance.resize();
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  }

  return true;
}

function whenReady(check, then, fallback, { timeoutMs = 2500, pollMs = 50 } = {}) {
  if (check()) { then(); return; }
  const start = performance.now();
  const tick = () => {
    if (check()) { then(); return; }
    if (performance.now() - start > timeoutMs) { fallback(); return; }
    setTimeout(tick, pollMs);
  };
  setTimeout(tick, pollMs);
}

export function init() {
  whenReady(
    () => !!window.Lenis,
    () => { if (!initLenis()) vanillaProgress(); },
    () => vanillaProgress(),
  );
}
