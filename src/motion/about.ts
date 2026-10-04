import { gsap } from 'gsap';
import { q } from '../env';
import { lineReveal } from './reveals';

/**
 * The statement's lines rise. Beside it the print is laid down: crop marks close in on
 * its corners, the photo rises into the frame the way the hero's fill rises through the
 * letters, and develops from grey to full colour as it settles. Plays once. While the
 * section scrolls, the print drifts a little against the texture behind it.
 */
export function initAbout() {
  const section = q('[data-about]');
  const plate = q('[data-plate]', section);
  const frame = q('picture', plate);
  const img = q('img', plate);

  lineReveal(q('[data-statement]', section), { start: 'top 80%', delay: 0.1, stagger: 0.06 });

  gsap.set(plate, { '--draw': 0 });
  gsap.set(frame, { clipPath: 'inset(100% 0% 0% 0%)' });
  gsap
    .timeline({ scrollTrigger: { trigger: plate, start: 'top 82%', once: true } })
    .to(plate, { '--draw': 1, duration: 0.9, ease: 'power3.out' })
    .to(frame, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out' }, 0.15)
    .fromTo(
      img,
      { scale: 1.08, filter: 'grayscale(1) brightness(0.7)' },
      { scale: 1, filter: 'grayscale(0) brightness(1)', duration: 1.6, ease: 'power3.out', clearProps: 'filter' },
      0.15,
    );

  gsap.fromTo(
    plate,
    { y: 48 },
    { y: -48, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } },
  );
}
