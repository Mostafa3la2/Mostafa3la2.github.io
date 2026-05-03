// Shared helpers used across modules.

const reducedMotionQuery = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;

export function prefersReducedMotion() {
  return !!(reducedMotionQuery && reducedMotionQuery.matches);
}

export function onReducedMotionChange(handler) {
  if (!reducedMotionQuery) return;
  if (reducedMotionQuery.addEventListener) {
    reducedMotionQuery.addEventListener('change', handler);
  } else if (reducedMotionQuery.addListener) {
    reducedMotionQuery.addListener(handler);
  }
}

const hoverQuery = window.matchMedia
  ? window.matchMedia('(hover: hover) and (pointer: fine)')
  : null;

export function isHover() {
  return !!(hoverQuery && hoverQuery.matches);
}

const coarseQuery = window.matchMedia
  ? window.matchMedia('(pointer: coarse)')
  : null;

export function isCoarse() {
  return !!(coarseQuery && coarseQuery.matches);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

// rAF throttle: returns a function that runs at most once per frame.
export function rafThrottle(fn) {
  let scheduled = 0;
  let lastArgs = null;
  return function (...args) {
    lastArgs = args;
    if (scheduled) return;
    scheduled = requestAnimationFrame(() => {
      scheduled = 0;
      fn.apply(this, lastArgs);
    });
  };
}
