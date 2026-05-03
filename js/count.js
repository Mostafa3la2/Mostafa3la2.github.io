// Animated count-up for [data-count] elements when they enter the viewport.

import { prefersReducedMotion } from './utils.js';

export function init() {
  const targets = document.querySelectorAll('[data-count]');
  if (!targets.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => {
      el.textContent = el.dataset.count;
    });
    return;
  }

  const dur = 1100;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * eased);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    }
  }, { threshold: 0.5 });

  targets.forEach((el) => io.observe(el));
}
