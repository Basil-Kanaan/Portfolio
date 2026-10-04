import { gsap } from 'gsap';
import { q, qa, reduceMotion } from '../env';
import { enhanceVideo, playWhenVisible } from '../ui/media';

/**
 * Selected work: a plain stack at every size, scrolled natively. Each recording plays once
 * as it comes into view, and its frame wipes up into place the first time it arrives.
 */
export function initWork() {
  const projects = qa('[data-project]');
  projects.forEach((p) => playWhenVisible(enhanceVideo(q<HTMLVideoElement>('video', p)), !reduceMotion));
  if (reduceMotion) return;
  projects.forEach((p) => {
    const box = q('.project__media', p);
    gsap.fromTo(
      box,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'expo.out', scrollTrigger: { trigger: box, start: 'top 88%', once: true } },
    );
  });
}
