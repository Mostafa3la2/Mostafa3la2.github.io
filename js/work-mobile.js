// Mobile work-section carousel.
//
// Builds a horizontal scroll-snap track of phone-style cards from the existing
// .work-row elements (no markup duplication needed). Pagination dots are
// driven by an IntersectionObserver on each card. Tapping a row above scrolls
// the carousel to the matching card. Long-press on a card flips it to reveal
// metadata (uses GSAP Flip if available, otherwise CSS class toggle).
//
// Active on coarse pointers only — desktop keeps the existing pinned-phone
// showcase (Phase 2 will enhance that side).

import { isCoarse, prefersReducedMotion } from './utils.js';
import { activateProject } from './work.js';
import { longPress, haptic } from './gestures.js';

function readRows() {
  return Array.from(document.querySelectorAll('.work-row'));
}

function makeCard(row) {
  const id = row.dataset.project;
  const titleEl = row.querySelector('.row-title');
  const subEl = row.querySelector('.row-sub');
  const bodyEl = row.querySelector('.row-body');
  const stackEl = row.querySelector('.row-stack');
  const showcaseImg = row.querySelector('.row-showcase img');
  const isPast = id === 'past';

  const card = document.createElement('article');
  card.className = 'mc-card glass';
  card.dataset.project = id;
  card.setAttribute('data-ripple', '');
  card.setAttribute('role', 'group');
  card.setAttribute('aria-label', titleEl ? titleEl.textContent.trim() : id);

  const inner = document.createElement('div');
  inner.className = 'mc-inner';

  // Front face
  const front = document.createElement('div');
  front.className = 'mc-face mc-front';

  const media = document.createElement('div');
  media.className = 'mc-media' + (isPast ? ' mc-media-past' : '');
  if (showcaseImg) {
    const img = document.createElement('img');
    img.src = showcaseImg.getAttribute('src');
    img.alt = '';
    img.loading = 'lazy';
    media.appendChild(img);
  } else if (isPast) {
    // Mirror the existing past-inner content (already in DOM elsewhere).
    const past = row.querySelector('.row-showcase .past-inner');
    if (past) media.appendChild(past.cloneNode(true));
  }

  const meta = document.createElement('div');
  meta.className = 'mc-meta';
  if (subEl) {
    const sub = document.createElement('div');
    sub.className = 'mc-sub';
    sub.textContent = subEl.textContent.trim();
    meta.appendChild(sub);
  }
  if (titleEl) {
    const title = document.createElement('h3');
    title.className = 'mc-title';
    title.textContent = titleEl.textContent.trim();
    meta.appendChild(title);
  }
  const flipHint = document.createElement('span');
  flipHint.className = 'mc-flip-hint';
  flipHint.textContent = 'Hold for details';
  meta.appendChild(flipHint);

  front.appendChild(media);
  front.appendChild(meta);

  // Back face
  const back = document.createElement('div');
  back.className = 'mc-face mc-back';
  if (bodyEl) {
    const body = document.createElement('p');
    body.className = 'mc-body';
    body.textContent = bodyEl.textContent.trim();
    back.appendChild(body);
  }
  if (stackEl) {
    const stack = stackEl.cloneNode(true);
    stack.classList.add('mc-stack');
    back.appendChild(stack);
  }
  const backHint = document.createElement('span');
  backHint.className = 'mc-flip-hint';
  backHint.textContent = 'Tap to flip back';
  back.appendChild(backHint);

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);
  return card;
}

function buildCarousel() {
  const stage = document.querySelector('.work-stage');
  if (!stage) return null;

  const rows = readRows();
  if (!rows.length) return null;

  const wrap = document.createElement('div');
  wrap.className = 'mobile-carousel';

  const track = document.createElement('div');
  track.className = 'mc-track';
  track.setAttribute('role', 'list');

  const cards = rows.map((row) => {
    const card = makeCard(row);
    track.appendChild(card);
    return card;
  });

  const dots = document.createElement('div');
  dots.className = 'mc-dots';
  const dotEls = rows.map((row, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'mc-dot';
    dot.setAttribute('aria-label', `Go to project ${i + 1}`);
    dot.dataset.project = row.dataset.project;
    dot.addEventListener('click', () => scrollToCard(track, cards[i]));
    return dot;
  });
  dotEls.forEach((d) => dots.appendChild(d));

  wrap.appendChild(track);
  wrap.appendChild(dots);
  stage.parentNode.insertBefore(wrap, stage.nextSibling);

  return { wrap, track, cards, dotEls };
}

function scrollToCard(track, card) {
  if (!card) return;
  const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
  track.scrollTo({ left, behavior: 'smooth' });
}

function flipCard(card) {
  card.classList.toggle('flipped');
  haptic(8);
}

function wireFlip(cards) {
  cards.forEach((card) => {
    longPress(card, () => flipCard(card), { holdMs: 450 });
    // A normal click flips back if currently flipped.
    card.addEventListener('click', (e) => {
      if (!card.classList.contains('flipped')) return;
      // Don't unflip from clicks on links inside the back face.
      if (e.target.closest('a, button')) return;
      flipCard(card);
    });
  });
}

function wireRowsToCarousel(track, cards) {
  // When user taps a row above, scroll the carousel to match.
  document.querySelectorAll('.work-row').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.dataset.project;
      const target = cards.find((c) => c.dataset.project === id);
      if (target) scrollToCard(track, target);
    });
  });
}

function wireSyncOnSnap(track, cards, dotEls) {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    // Pick the entry with the highest intersection ratio that is intersecting.
    let best = null;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
    }
    if (!best) return;
    const card = best.target;
    const id = card.dataset.project;
    activateProject(id);
    dotEls.forEach((d) => d.classList.toggle('active', d.dataset.project === id));
  }, {
    root: track,
    threshold: [0.55, 0.7, 0.9],
  });
  cards.forEach((c) => io.observe(c));
}

export function init() {
  if (!isCoarse()) return; // Desktop keeps the pinned-phone showcase
  if (prefersReducedMotion()) return; // RM keeps the linear vertical layout

  const carousel = buildCarousel();
  if (!carousel) return;
  document.body.classList.add('mc-active');

  const { track, cards, dotEls } = carousel;
  if (dotEls[0]) dotEls[0].classList.add('active');

  wireFlip(cards);
  wireRowsToCarousel(track, cards);
  wireSyncOnSnap(track, cards, dotEls);
}
