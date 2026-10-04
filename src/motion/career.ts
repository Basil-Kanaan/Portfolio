import { gsap } from 'gsap';
import { q, qa, reduceMotion } from '../env';
import { lineReveal } from './reveals';

/**
 * Experience as a time chart: every role is a bar on one year axis, so overlaps and work
 * that is still going read at a glance. Dates are known to the year, so a bar covers whole
 * years; an ongoing role runs to today and ends in a filled dot; a single event (the
 * degree) is a ring.
 *
 * The motion explains the chart instead of decorating it: the axis and its year guides draw
 * first, then each bar grows left to right across the years it covers as its row arrives.
 * Hovering a row isolates its bar (CSS only).
 */
const START = 2022;

export function initCareer() {
  const chart = q('[data-career]');
  layout(chart);
  if (!reduceMotion) animate(chart);
}

/** Positions for today's date. The HTML carries positions for October 2026 as a fallback. */
function layout(chart: HTMLElement) {
  const today = new Date();
  const year = today.getFullYear();
  const now = year + (today.getMonth() + 0.5) / 12;
  const at = (y: number) => ((y - START) / (now - START)).toFixed(4);

  const axis = q('[data-career-axis]', chart);
  const guides = q('[data-career-guides]', chart);
  for (let y = START; y <= year; y++) {
    let label = axis.querySelector<HTMLElement>(`[data-year="${y}"]`);
    let guide = guides.querySelector<HTMLElement>(`[data-year="${y}"]`);
    if (!label) {
      label = document.createElement('span');
      label.className = 'career__year';
      label.dataset.year = label.textContent = String(y);
      axis.insertBefore(label, q('[data-now]', axis));
    }
    if (!guide) {
      guide = document.createElement('span');
      guide.dataset.year = String(y);
      guides.insertBefore(guide, q('[data-now]', guides));
    }
    label.style.setProperty('--at', at(y));
    guide.style.setProperty('--at', at(y));
  }

  qa('[data-span]', chart).forEach((span) => {
    const from = Number(span.dataset.from);
    if (!span.dataset.to) {
      span.style.setProperty('--from', at(from + 0.5)); // an event: mid-year
      return;
    }
    const to = span.dataset.to === 'now' ? now : Math.min(now, Number(span.dataset.to) + 1);
    span.style.setProperty('--from', at(from));
    span.style.setProperty('--to', at(to));
  });
}

function animate(chart: HTMLElement) {
  const axis = q('[data-career-axis]', chart);
  gsap
    .timeline({ scrollTrigger: { trigger: chart, start: 'top 80%', once: true } })
    .from(q('.career__baseline', axis), { scaleX: 0, duration: 1.1, ease: 'expo.out' }, 0)
    .from(qa('.career__year, .career__now', axis), { autoAlpha: 0, y: 8, duration: 0.7, ease: 'power3.out', stagger: 0.06 }, 0.1)
    .from(qa('span', q('[data-career-guides]', chart)), { scaleY: 0, duration: 1.2, ease: 'expo.out', stagger: 0.05 }, 0.15);

  qa('[data-entry]', chart).forEach((entry) => {
    lineReveal(q('.entry__title', entry), { start: 'top 84%' });
    const bar = entry.querySelector('.entry__bar');
    const dot = entry.querySelector('.entry__dot');
    const tl = gsap.timeline({ scrollTrigger: { trigger: entry, start: 'top 84%', once: true } });
    tl.from(q('.entry__when', entry), { autoAlpha: 0, y: 10, duration: 0.7, ease: 'power3.out' }, 0);
    tl.from(q('.entry__body p', entry), { autoAlpha: 0, y: 12, duration: 0.8, ease: 'power3.out' }, 0.15);
    if (bar) tl.from(bar, { scaleX: 0, duration: 1.1, ease: 'expo.out' }, 0.2);
    if (dot) tl.from(dot, { scale: 0, duration: 0.6, ease: 'expo.out' }, bar ? 0.75 : 0.25);
  });
}
