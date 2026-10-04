import { q, qa, reduceMotion } from '../env';

/**
 * Header behaviour: solid background once scrolled, hidden while reading downward,
 * a disclosure menu on phones, in-page links that scroll natively (smoothly unless motion
 * is reduced) and move focus to the target, and aria-current on the section in view.
 */
export function initHeader() {
  const header = q('[data-header]');
  const nav = q('[data-nav]');
  const menuButton = q<HTMLButtonElement>('[data-menu-button]');

  // Solid + hide on scroll ---------------------------------------------------------
  let lastY = window.scrollY;
  const onScroll = (y: number) => {
    header.classList.toggle('is-solid', y > 8);
    const down = y > lastY + 2;
    const up = y < lastY - 2;
    if (down && y > window.innerHeight * 0.6 && !nav.classList.contains('is-open')) header.classList.add('is-hidden');
    else if (up || y < 80) header.classList.remove('is-hidden');
    lastY = y;
  };
  addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
  onScroll(window.scrollY);
  // Never hide the header while focus is inside it.
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

  // Mobile menu -------------------------------------------------------------------
  const setMenu = (open: boolean, returnFocus = false) => {
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('span')!.textContent = open ? 'Close' : 'Menu';
    // The page behind the open menu stays put.
    document.documentElement.classList.toggle('menu-open', open);
    if (open) nav.querySelector<HTMLAnchorElement>('a')?.focus();
    else if (returnFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false, true);
  });
  matchMedia('(min-width: 768px)').addEventListener('change', (e) => e.matches && setMenu(false));

  // In-page links -----------------------------------------------------------------
  qa<HTMLAnchorElement>('a[data-scroll-to]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      if (nav.classList.contains('is-open')) setMenu(false);
      const focusTarget = id === 'top' ? q('#main') : target;
      const behavior = reduceMotion ? 'auto' : 'smooth';
      if (id === 'top') window.scrollTo({ top: 0, behavior });
      else target.scrollIntoView({ block: 'start', behavior });
      focusTarget.focus({ preventScroll: true });
      history.replaceState(null, '', id === 'top' ? location.pathname + location.search : `#${id}`);
    });
  });

  // aria-current for the section in view -------------------------------------------
  const links = qa<HTMLAnchorElement>('.site-nav a[data-scroll-to]');
  const sections = links
    .map((a) => document.getElementById(a.getAttribute('href')!.slice(1)))
    .filter((s): s is HTMLElement => !!s);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => io.observe(s));
}
