// Pointer Events primitives shared by mobile interactions.
//
// - longPress(el, handler, opts): fires after a hold; cancels on movement or
//   pointer release. Works on touch + mouse, but is gated to coarse pointers
//   in callers (mouse users get hover, not hold).
// - swipe(el, handler, opts): horizontal swipe with directional lock. If the
//   user starts dragging more vertical than horizontal, the gesture releases
//   so native vertical scroll wins.
// - haptic(ms): wraps navigator.vibrate with a no-op fallback.

export function haptic(ms = 8) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(ms); } catch (_) {}
  }
}

export function longPress(el, handler, { holdMs = 450, moveTolerance = 10 } = {}) {
  let timer = 0;
  let startX = 0, startY = 0;
  let active = false;

  const cancel = () => {
    if (timer) { clearTimeout(timer); timer = 0; }
    active = false;
  };

  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    cancel();
    startX = e.clientX; startY = e.clientY;
    active = true;
    timer = window.setTimeout(() => {
      if (!active) return;
      timer = 0;
      handler(e);
    }, holdMs);
  });

  el.addEventListener('pointermove', (e) => {
    if (!active) return;
    if (Math.abs(e.clientX - startX) > moveTolerance ||
        Math.abs(e.clientY - startY) > moveTolerance) {
      cancel();
    }
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => {
    el.addEventListener(ev, cancel);
  });

  // Suppress iOS native context menu on long-press.
  el.addEventListener('contextmenu', (e) => {
    if (active || timer) e.preventDefault();
  });
}

export function swipe(el, handler, {
  threshold = 40,
  maxOffAxisRatio = 0.6,
  timeoutMs = 600,
} = {}) {
  let startX = 0, startY = 0, startT = 0;
  let tracking = false;
  let locked = null; // 'x' | 'y' | null

  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startX = e.clientX; startY = e.clientY;
    startT = performance.now();
    tracking = true;
    locked = null;
  });

  el.addEventListener('pointermove', (e) => {
    if (!tracking) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (locked === null) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
    }
    if (locked === 'y') tracking = false;
  });

  const finish = (e) => {
    if (!tracking) return;
    tracking = false;
    if (locked !== 'x') return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const dt = performance.now() - startT;
    if (dt > timeoutMs) return;
    if (Math.abs(dx) < threshold) return;
    if (Math.abs(dy) > Math.abs(dx) * maxOffAxisRatio) return;
    handler(dx > 0 ? 'right' : 'left', { dx, dy, dt });
  };

  el.addEventListener('pointerup', finish);
  el.addEventListener('pointercancel', () => { tracking = false; });
}
