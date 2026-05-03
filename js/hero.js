// Hero typography flourishes:
//   1. Letter splitter — wraps each character of [data-letters] in a <span>
//      with --i so CSS staggers the entrance animation.
//   2. Variable-weight scrub — eases the hero name's font-weight from a
//      lighter rest weight up to a bolder one across the first viewport of
//      scroll, using the variable axis on Fraunces.
//   3. Letter trail — on hover-capable devices, mousemove over the hero name
//      spawns short-lived ghost copies of letters that decay and fade. Capped
//      to 8 in flight so we don't leak DOM nodes.
//   4. Avatar dot breathe — sets up an idle animation on the brand squircle
//      via class toggle (CSS owns the keyframe).

import { isHover, prefersReducedMotion, rafThrottle } from './utils.js';

const REST_WEIGHT = 320;
const PEAK_WEIGHT = 720;

function splitLetters() {
  document.querySelectorAll('[data-letters]').forEach((el) => {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    for (const ch of text) {
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? ' ' : ch;
      span.style.setProperty('--i', i++);
      el.appendChild(span);
    }
  });
}

function variableWeightScrub() {
  if (prefersReducedMotion()) return;
  const name = document.querySelector('h1.name');
  if (!name) return;
  const heroSection = name.closest('section.hero') || document.querySelector('section.hero');
  if (!heroSection) return;

  const update = () => {
    const r = heroSection.getBoundingClientRect();
    // Progress 0..1 as the hero scrolls through the top viewport.
    const vh = window.innerHeight || 800;
    const start = -vh * 0.1;
    const end = r.height + vh * 0.4;
    const passed = -r.top + r.height * 0.4;
    const t = Math.min(1, Math.max(0, (passed - start) / (end - start)));
    const w = Math.round(REST_WEIGHT + (PEAK_WEIGHT - REST_WEIGHT) * t);
    name.style.setProperty('--hero-w', w);
  };

  const onScroll = rafThrottle(update);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

function letterTrail() {
  // Reactive letters: instead of spawning short-lived ghost copies of letters
  // (which is heavy at the 144px hero size — every spawn touched layout, and
  // the overlapping animations stuttered on weak GPUs), we toggle a single
  // class on the existing letter spans as the cursor passes over them.
  //
  // CSS owns the visual reaction (color shift + tiny lift + glow) via a
  // `.lit` class with cheap transform/opacity transitions. JS only swaps the
  // class to whichever letter is currently closest to the cursor — typically
  // ~6 reads per frame max. No DOM creation, no animation churn.
  if (!isHover() || prefersReducedMotion()) return;
  const name = document.querySelector('h1.name');
  if (!name) return;

  const spans = Array.from(name.querySelectorAll('[data-letters] > span'));
  if (!spans.length) return;

  // Cache each letter's {x, y} center in viewport coordinates. We need both
  // axes because the hero name occupies two lines (one [data-letters] block
  // per line: "Mostafa" italic on line 1, "Alaa." normal on line 2). With
  // X-only nearest-neighbor, a letter on the OTHER line that shared the same
  // X column would win — that was the wrong-letter-lights-up bug. Euclidean
  // distance fixes it.
  const cx = new Float32Array(spans.length);
  const cy = new Float32Array(spans.length);
  let nameRect = null;
  let pendingMeasure = 0;
  const measure = () => {
    pendingMeasure = 0;
    nameRect = name.getBoundingClientRect();
    spans.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      cx[i] = r.left + r.width / 2;
      cy[i] = r.top + r.height / 2;
    });
  };
  const scheduleMeasure = () => {
    if (pendingMeasure) return;
    pendingMeasure = requestAnimationFrame(measure);
  };
  requestAnimationFrame(() => requestAnimationFrame(measure));
  window.addEventListener('resize', scheduleMeasure, { passive: true });
  let scrollSettleTimer = 0;
  window.addEventListener('scroll', () => {
    if (scrollSettleTimer) clearTimeout(scrollSettleTimer);
    scrollSettleTimer = window.setTimeout(scheduleMeasure, 140);
  }, { passive: true });

  let currentIdx = -1;
  const setLit = (idx) => {
    if (idx === currentIdx) return;
    if (currentIdx !== -1) spans[currentIdx].classList.remove('lit');
    if (idx !== -1) spans[idx].classList.add('lit');
    currentIdx = idx;
  };

  name.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    if (!nameRect || !cx.length) return;
    // Early-exit: cursor far above/below the entire name.
    if (e.clientY < nameRect.top || e.clientY > nameRect.bottom) {
      setLit(-1);
      return;
    }
    // Squared Euclidean distance per letter; no sqrt needed for comparison.
    // Linear scan — only ~12 letters, branch-predictable, well under 1µs.
    const px = e.clientX;
    const py = e.clientY;
    let best = 0;
    const dx0 = px - cx[0];
    const dy0 = py - cy[0];
    let bestDist = dx0 * dx0 + dy0 * dy0;
    for (let i = 1; i < cx.length; i++) {
      const dx = px - cx[i];
      const dy = py - cy[i];
      const d = dx * dx + dy * dy;
      if (d < bestDist) { bestDist = d; best = i; }
    }
    setLit(best);
  }, { passive: true });

  name.addEventListener('pointerleave', () => setLit(-1));
}

function avatarBreathe() {
  if (prefersReducedMotion()) return;
  const sq = document.querySelector('.brand .squircle');
  if (sq) sq.classList.add('breathe');
}

export function init() {
  splitLetters();
  variableWeightScrub();
  letterTrail();
  avatarBreathe();
}
