// Career section — sticky horizontal year ribbon above the timeline.
// - Builds the ribbon from each .tl-row[data-year].
// - Highlights the active year as the matching row enters the viewport.
// - Clicking a year scrolls the page to that row (via Lenis if present).

import { prefersReducedMotion } from './utils.js';
import { getLenis } from './scroll.js';

function buildRibbon(rows) {
  const years = rows.map((r) => r.dataset.year).filter(Boolean);
  if (!years.length) return null;

  const ribbon = document.createElement('div');
  ribbon.className = 'career-axis';
  ribbon.setAttribute('aria-label', 'Career timeline scrubber');

  const inner = document.createElement('div');
  inner.className = 'career-axis-inner';

  const buttons = years.map((y) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'career-year';
    btn.dataset.year = y;
    btn.setAttribute('aria-label', `Jump to ${y}`);
    btn.innerHTML = `<span class="career-year-num">'${y.slice(-2)}</span><span class="career-year-tick"></span>`;
    inner.appendChild(btn);
    return btn;
  });

  ribbon.appendChild(inner);
  return { ribbon, buttons };
}

function scrollToRow(row) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(row, { duration: 1.0, offset: -120 });
    return;
  }
  const r = row.getBoundingClientRect();
  window.scrollTo({ top: window.scrollY + r.top - 120, behavior: 'smooth' });
}

function setActive(buttons, year) {
  buttons.forEach((b) => b.classList.toggle('active', b.dataset.year === year));
}

export function init() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  const rows = Array.from(document.querySelectorAll('.tl-row[data-year]'));
  if (!rows.length) return;

  const built = buildRibbon(rows);
  if (!built) return;
  const { ribbon, buttons } = built;
  timeline.parentNode.insertBefore(ribbon, timeline);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = rows.find((r) => r.dataset.year === btn.dataset.year);
      if (row) scrollToRow(row);
    });
  });

  // First row active by default.
  setActive(buttons, rows[0].dataset.year);

  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    let best = null;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
    }
    if (!best) return;
    const y = best.target.dataset.year;
    if (y) setActive(buttons, y);
  }, {
    threshold: prefersReducedMotion() ? 0.1 : [0.4, 0.6, 0.8],
    rootMargin: '-20% 0px -45% 0px',
  });
  rows.forEach((r) => io.observe(r));
}
