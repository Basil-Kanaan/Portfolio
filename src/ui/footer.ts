import { q } from '../env';

/** The time in Brampton, in the footer, kept to the minute. Hidden without JavaScript. */
export function initFooter() {
  const wrap = q('[data-local-time]');
  const time = q<HTMLTimeElement>('time', wrap);
  const format = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Toronto', hour: 'numeric', minute: '2-digit' });
  const iso = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

  const render = () => {
    const now = new Date();
    time.textContent = format.format(now);
    time.dateTime = iso.format(now);
  };
  render();
  wrap.hidden = false;
  // Tick on the minute, not on a fixed interval from load.
  const sync = () => {
    render();
    setTimeout(sync, 60_000 - (Date.now() % 60_000) + 50);
  };
  setTimeout(sync, 60_000 - (Date.now() % 60_000) + 50);
}
