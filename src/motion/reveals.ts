import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { qa } from '../env';

/**
 * Line reveal from masks, played once when the element scrolls in. SplitText re-splits
 * on resize and font load; after the reveal has played it leaves the lines at rest.
 */
export function lineReveal(el: HTMLElement, { start = 'top 86%', delay = 0, stagger = 0.07 } = {}) {
  let played = false;
  SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'split-line',
    aria: 'none',
    autoSplit: true,
    onSplit(self) {
      if (played) return;
      return gsap.from(self.lines, {
        yPercent: 130,
        duration: 0.95,
        ease: 'expo.out',
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
        onComplete: () => {
          played = true;
        },
      });
    },
  });
}

/**
 * Slow parallax for the toned photo textures: each image is taller than its window and
 * slides through it by data-parallax percent of its height, either way, while the window
 * crosses the viewport.
 */
export function initParallax() {
  qa('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax);
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('picture')!.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

export function initReveals() {
  qa('[data-split]').forEach((el) => lineReveal(el));
  qa('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 16,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}
