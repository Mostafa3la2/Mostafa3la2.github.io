// Tap ripples on [data-ripple] elements. Touch-only by default — mouse users
// already have the custom cursor. Spawns a span sized to the element diagonal
// at the tap point, scales 0→1 and fades over 500ms via CSS animation, then
// removes itself.

import { prefersReducedMotion } from './utils.js';

const ATTR = 'data-ripple';

function spawnRipple(host, e) {
  if (prefersReducedMotion()) return;
  const r = host.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  const size = Math.hypot(r.width, r.height) * 2;

  // Ensure the host clips the ripple to its rounded shape.
  const cs = window.getComputedStyle(host);
  if (cs.position === 'static') host.style.position = 'relative';
  if (cs.overflow === 'visible') host.style.overflow = 'hidden';

  const ripple = document.createElement('span');
  ripple.className = 'tap-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.setAttribute('aria-hidden', 'true');
  host.appendChild(ripple);

  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  // Safety net in case animationend never fires.
  setTimeout(() => ripple.remove(), 800);
}

export function init() {
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    const host = e.target.closest(`[${ATTR}]`);
    if (!host) return;
    spawnRipple(host, e);
  }, { passive: true });
}
