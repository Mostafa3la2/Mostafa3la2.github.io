// Colophon as terminal:
//   - The Swift code block reveals via a left-to-right mask animation when it
//     scrolls into view (preserves syntax highlighting; doesn't manually
//     re-type). A blinking caret rides the leading edge during reveal and
//     parks at the end after.
//   - Click anywhere on the block to copy its plain text. A small "Copied"
//     pill rises bottom-right and fades.

import { prefersReducedMotion } from './utils.js';

function scheduleReveal(block) {
  if (prefersReducedMotion()) {
    block.classList.add('reveal-done');
    return;
  }
  if (!('IntersectionObserver' in window)) {
    block.classList.add('reveal-done');
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      block.classList.add('typing');
      io.unobserve(e.target);
      // After the CSS animation completes (~1500ms), park the caret at end.
      setTimeout(() => {
        block.classList.add('reveal-done');
        block.classList.remove('typing');
      }, 1600);
    }
  }, { threshold: 0.35 });
  io.observe(block);
}

function showToast(text) {
  let toast = document.querySelector('.copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.remove('show');
  // Re-trigger animation on rapid re-clicks.
  void toast.offsetWidth;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 1700);
}

function wireCopy(block) {
  block.style.cursor = 'pointer';
  block.setAttribute('title', 'Click to copy');
  block.addEventListener('click', async () => {
    const pre = block.querySelector('pre');
    if (!pre) return;
    const text = pre.textContent || '';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback: textarea + execCommand (deprecated but reliable on http).
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showToast('Copied');
    } catch (_) {
      showToast('Copy failed');
    }
  });
}

export function init() {
  const block = document.querySelector('.swift-block');
  if (!block) return;

  // Append the caret element once.
  if (!block.querySelector('.colophon-caret')) {
    const caret = document.createElement('span');
    caret.className = 'colophon-caret';
    caret.setAttribute('aria-hidden', 'true');
    caret.textContent = '▌';
    block.appendChild(caret);
  }

  scheduleReveal(block);
  wireCopy(block);
}
