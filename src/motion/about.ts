import { q } from '../env';
import { lineReveal } from './reveals';

/** The statement's lines rise once as the section arrives; the rose behind it drifts with the scroll (see initParallax). */
export function initAbout() {
  lineReveal(q('[data-statement]', q('[data-about]')), { start: 'top 80%', delay: 0.1, stagger: 0.06 });
}
