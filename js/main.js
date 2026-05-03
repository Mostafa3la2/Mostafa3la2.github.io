// Entry point. Imports each module and boots it in DOM-ready order.

import * as clock from './clock.js';
import * as reveal from './reveal.js';
import * as count from './count.js';
import * as hero from './hero.js';
import * as scroll from './scroll.js';
import * as work from './work.js';
import * as workMobile from './work-mobile.js';
import * as workDesktop from './work-desktop.js';
import * as scenes from './scenes.js';
import * as cursor from './cursor.js';
import * as ripples from './ripples.js';
import * as career from './career.js';
import * as colophon from './colophon.js';
import * as easter from './easter.js';
import * as theme from './theme.js';

function boot() {
  clock.init();
  reveal.init();
  count.init();
  hero.init();
  scroll.init();
  work.init();
  workMobile.init();
  workDesktop.init();
  scenes.init();
  cursor.init();
  ripples.init();
  career.init();
  colophon.init();
  easter.init();
  theme.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
