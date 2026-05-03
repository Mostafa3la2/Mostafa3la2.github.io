// Cairo timezone clock in the status pill, plus the footer year.

export function init() {
  const dyn = document.getElementById('dynTime');
  if (dyn) {
    const tick = () => {
      const fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Cairo',
      });
      dyn.textContent = fmt.format(new Date());
    };
    tick();
    setInterval(tick, 1000 * 30);
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}
