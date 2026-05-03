// Project switcher — toggles .active on .work-row + matching .showcase-img/panel.
// Activates on hover, focus, click, and keyboard (Enter/Space).
// Exports activateProject so other modules (mobile carousel, easter eggs) can
// drive the same state.

const workRows = () => document.querySelectorAll('.work-row');
const screens = () => document.querySelectorAll('.showcase-img, .showcase-panel');

export function activateProject(id) {
  workRows().forEach((r) => {
    const on = r.dataset.project === id;
    r.classList.toggle('active', on);
    r.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  screens().forEach((s) => s.classList.toggle('active', s.dataset.project === id));
}

export function init() {
  workRows().forEach((row) => {
    const id = row.dataset.project;
    row.addEventListener('mouseenter', () => activateProject(id));
    row.addEventListener('focus', () => activateProject(id));
    row.addEventListener('click', () => activateProject(id));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateProject(id);
      }
    });
  });
}
