// Desktop-only work-section enhancements: scroll-driven project activation
// (so scrolling through the work section cinematically advances the active
// project) and a pointer-driven 3D tilt + glare on the phone showcase.
//
// Both are gated to hover-capable, fine-pointer devices and respect
// reduced-motion. If GSAP/ScrollTrigger never load, the existing hover/click
// behavior in work.js still works — this module only adds, never replaces.

import { isHover, prefersReducedMotion } from './utils.js';
import { activateProject } from './work.js';

function waitForGsap(timeoutMs = 2500) {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      if (window.gsap && window.ScrollTrigger) return resolve(true);
      if (performance.now() - start > timeoutMs) return resolve(false);
      setTimeout(tick, 50);
    };
    tick();
  });
}

function initScrollScrub() {
  const stage = document.querySelector('.work-stage');
  const rows = Array.from(document.querySelectorAll('.work-row'));
  if (!stage || rows.length < 2) return;

  let lastIdx = -1;
  window.ScrollTrigger.create({
    trigger: stage,
    start: 'top 40%',
    end: 'bottom 70%',
    onUpdate: (st) => {
      // Map progress (0..1) to a project index.
      const idx = Math.min(rows.length - 1, Math.floor(st.progress * rows.length));
      if (idx === lastIdx) return;
      lastIdx = idx;
      const id = rows[idx].dataset.project;
      activateProject(id);
    },
  });
}

function initPhoneTilt() {
  const showcase = document.querySelector('.showcase');
  if (!showcase) return;
  const stage = showcase.closest('.phone-stage') || showcase.parentElement;
  if (!stage) return;

  // Add a glare layer once. Sits above images, below the inset rim.
  let glare = showcase.querySelector('.showcase-glare');
  if (!glare) {
    glare = document.createElement('span');
    glare.className = 'showcase-glare';
    glare.setAttribute('aria-hidden', 'true');
    showcase.appendChild(glare);
  }

  let raf = 0;
  let tx = 0, ty = 0; // current rotation
  let dx = 0, dy = 0; // desired rotation
  let gx = 50, gy = 30;

  const damp = 0.12;
  const tick = () => {
    tx += (dx - tx) * damp;
    ty += (dy - ty) * damp;
    showcase.style.transform =
      `rotateY(${(-6 + tx).toFixed(2)}deg) rotateX(${(2 + ty).toFixed(2)}deg)`;
    glare.style.setProperty('--gx', gx.toFixed(1) + '%');
    glare.style.setProperty('--gy', gy.toFixed(1) + '%');
    if (Math.abs(dx - tx) > 0.05 || Math.abs(dy - ty) > 0.05) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };

  stage.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const r = showcase.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    dx = (px - 0.5) * 14; // ±7deg Y
    dy = -(py - 0.5) * 10; // ±5deg X (inverted for natural feel)
    gx = px * 100;
    gy = py * 100;
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });

  stage.addEventListener('pointerleave', () => {
    dx = 0; dy = 0;
    if (!raf) raf = requestAnimationFrame(tick);
  });
}

export async function init() {
  if (!isHover()) return;
  if (prefersReducedMotion()) return;

  initPhoneTilt();

  // ScrollTrigger work — only if GSAP is available.
  const ok = await waitForGsap();
  if (!ok) return;
  initScrollScrub();
}
