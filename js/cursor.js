// Custom cursor (dot + ring) plus the cursor-driven flourishes that only make
// sense on hover-capable, fine-pointer devices: aurora mouse parallax, glass
// shine tracking, magnetic BabySteps CTA.

import { isHover } from './utils.js';

export function init() {
  if (!isHover()) return;

  // ----- Custom cursor (dot + ring) -----
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  cursorDot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursorDot);

  const cursorRing = document.createElement('div');
  cursorRing.className = 'cursor-ring';
  cursorRing.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursorRing);

  let cmx = -100, cmy = -100;
  let crx = -100, cry = -100;

  const cursorLoop = () => {
    crx += (cmx - crx) * 0.18;
    cry += (cmy - cry) * 0.18;
    cursorDot.style.transform = `translate3d(${cmx}px, ${cmy}px, 0) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate3d(${crx.toFixed(1)}px, ${cry.toFixed(1)}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(cursorLoop);
  };
  cursorLoop();

  window.addEventListener('mousemove', (e) => {
    cmx = e.clientX;
    cmy = e.clientY;
  }, { passive: true });

  const interactiveSel = 'a[href], button:not([disabled]), [role="button"], input, textarea, label, [tabindex]:not([tabindex="-1"])';
  document.body.addEventListener('mouseover', (e) => {
    const interactive = e.target.closest(interactiveSel);
    document.body.classList.toggle('cursor-active', !!interactive);
  });

  document.addEventListener('mousedown', () => document.body.classList.add('cursor-pressed'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cursor-pressed'));
  document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));

  // ----- Context-aware cursor variants -----
  // Magnify ring over the phone showcase + project rows; I-beam-style caret
  // over text-heavy regions (Swift block, lede). Variants are mutually
  // exclusive — a single body class drives the look via cursor.css.
  const variants = [
    { sel: '.showcase, .row-showcase, .mc-card', cls: 'cursor-magnify' },
    { sel: '.swift-block, .lede',                 cls: 'cursor-caret' },
  ];
  const allClasses = variants.map((v) => v.cls);

  document.body.addEventListener('mouseover', (e) => {
    let matched = null;
    for (const { sel, cls } of variants) {
      if (e.target.closest(sel)) { matched = cls; break; }
    }
    allClasses.forEach((c) => {
      document.body.classList.toggle(c, c === matched);
    });
  });

  // ----- Aurora mouse parallax -----
  let auroraRaf = 0, auroraTx = 0, auroraTy = 0;
  window.addEventListener('mousemove', (e) => {
    auroraTx = (e.clientX / window.innerWidth - 0.5) * 30;
    auroraTy = (e.clientY / window.innerHeight - 0.5) * 30;
    if (auroraRaf) return;
    auroraRaf = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--px', auroraTx.toFixed(1) + 'px');
      document.documentElement.style.setProperty('--py', auroraTy.toFixed(1) + 'px');
      auroraRaf = 0;
    });
  }, { passive: true });

  // ----- Cursor-tracking shine on every glass surface -----
  document.querySelectorAll('.glass').forEach((el) => {
    const shine = document.createElement('span');
    shine.className = 'shine';
    shine.setAttribute('aria-hidden', 'true');
    el.insertBefore(shine, el.firstChild);

    let shineRaf = 0;
    el.addEventListener('mousemove', (e) => {
      if (shineRaf) return;
      shineRaf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        shine.style.setProperty('--mx', mx.toFixed(1) + '%');
        shine.style.setProperty('--my', my.toFixed(1) + '%');
        shineRaf = 0;
      });
    }, { passive: true });
  });

  // ----- Magnetic BabySteps CTA -----
  const cta = document.querySelector('.bs-cta');
  if (cta) {
    let ctaRaf = 0;
    cta.addEventListener('mousemove', (e) => {
      if (ctaRaf) return;
      ctaRaf = requestAnimationFrame(() => {
        const r = cta.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.4;
        cta.style.transform = `translate(${x.toFixed(1)}px, ${(y - 2).toFixed(1)}px)`;
        ctaRaf = 0;
      });
    }, { passive: true });
    cta.addEventListener('mouseleave', () => {
      cta.style.transform = '';
    });
  }
}
