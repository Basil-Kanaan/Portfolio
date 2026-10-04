import { gsap } from 'gsap';
import { qa, reduceMotion } from '../env';
import { enhanceVideo, playWhenVisible } from '../ui/media';

/** Systems: the capture plays in view; numbers count up once; the diagram draws with scroll. */
export function initSystems() {
  qa<HTMLVideoElement>('[data-inview-video] video').forEach((v) => playWhenVisible(enhanceVideo(v), !reduceMotion));
  if (reduceMotion) return;

  // Count-ups. The real values are in the HTML (and in a screen-reader copy), so JS only
  // animates toward them.
  qa('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const state = { v: 0 };
    const render = () => {
      el.textContent = `${prefix}${Math.round(state.v)}${suffix}`;
    };
    render();
    gsap.to(state, {
      v: target,
      duration: 1.2,
      ease: 'power3.out',
      onUpdate: render,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Architecture diagram: elements carry data-step; each step draws in flow order.
  const mm = gsap.matchMedia();
  const draw = (svg: SVGSVGElement) => {
    const byStep = new Map<number, Element[]>();
    qa('[data-step]', svg).forEach((el) => {
      const s = Number(el.getAttribute('data-step'));
      byStep.set(s, [...(byStep.get(s) ?? []), el]);
    });
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: svg, start: 'top 82%', end: 'bottom 62%', scrub: 0.8 },
    });
    [...byStep.keys()].sort((a, b) => a - b).forEach((step) => {
      const els = byStep.get(step)!;
      const at = step * 0.55;
      els.forEach((el) => {
        if (el.matches('.dg-link:not(.dg-support)')) {
          tl.fromTo(el, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7 }, at);
        } else if (el.matches('.dg-node')) {
          tl.fromTo(q2(el, 'rect'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8 }, at);
          tl.fromTo(el.querySelectorAll('text'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.05 }, at + 0.4);
        } else {
          tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, at);
        }
      });
    });
  };
  mm.add('(min-width: 900px)', () => draw(qa<SVGSVGElement>('.diagram__svg--wide')[0]));
  mm.add('(max-width: 899px)', () => draw(qa<SVGSVGElement>('.diagram__svg--tall')[0]));
}

function q2(scope: Element, selector: string) {
  return scope.querySelector(selector)!;
}
