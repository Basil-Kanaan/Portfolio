import { gsap } from 'gsap';
import { q, qa, reduceMotion } from '../env';

/**
 * Hero motion after the CSS intro (the drawing of the name runs in CSS: see .draft).
 *  - Pointer: a loupe. Near the name, the fill falls away under the pointer and the
 *    construction shows through it: outlines, points, handles.
 *  - Scroll: the details leave first, then the name drains back to its outlines and
 *    drifts up out of view.
 */
export function initHero() {
  if (reduceMotion) return;
  const hero = q('[data-hero-section]');
  const details = qa('[data-hero-fade]', hero);
  const svg = q<SVGSVGElement>('[data-draft]', hero);
  const guides = q<SVGGElement>('[data-draft-guides]', svg);
  const fill = q<SVGGElement>('[data-draft-fill]', svg);
  const build = q<SVGGElement>('[data-draft-build]', svg);

  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })
    .to(details, { y: -40, autoAlpha: 0, duration: 0.45, stagger: 0.03 }, 0)
    .to(svg, { yPercent: -24, duration: 1 }, 0)
    .to(guides, { opacity: 0.24, duration: 0.25 }, 0.08)
    .fromTo(build, { opacity: 0 }, { opacity: 1, duration: 0.25, immediateRender: false }, 0.1)
    .to(fill, { opacity: 0, duration: 0.35 }, 0.14)
    .to(svg, { autoAlpha: 0, duration: 0.3 }, 0.62);

  if (matchMedia('(hover: hover) and (pointer: fine)').matches) initLoupe(svg, fill);
}

/**
 * Two masks share one feathered circle: one cuts it out of the fill, the other shows the
 * construction through it. Both are attached only while the loupe is open, and the loupe
 * opens only once the intro has finished drawing.
 */
function initLoupe(svg: SVGSVGElement, fill: SVGGElement) {
  const loupe = q<SVGGElement>('[data-draft-loupe]', svg);
  const lenses = qa<SVGCircleElement>('.draft__lens', svg);
  const [, , width, height] = svg.getAttribute('viewBox')!.split(' ').map(Number);
  const R = 520; // font units: about half the cap height, and a little more
  const lens = { x: 0, y: 0, r: 0 };
  const target = { x: 0, y: 0, r: 0 };
  const point = new DOMPoint();
  let ready = false;
  let open = false;
  let raf = 0;

  const intro = svg.querySelector('[data-draft-build]')!.getAnimations();
  Promise.all(intro.map((a) => a.finished.catch(() => undefined))).then(() => (ready = true));

  const setOpen = (value: boolean) => {
    if (open === value) return;
    open = value;
    if (open) {
      fill.setAttribute('mask', 'url(#draft-hide)');
      loupe.setAttribute('mask', 'url(#draft-show)');
      loupe.style.visibility = 'visible';
    } else {
      fill.removeAttribute('mask');
      loupe.removeAttribute('mask');
      loupe.style.visibility = '';
    }
  };

  const tick = () => {
    raf = 0;
    const k = lens.r < 1 ? 1 : 0.28; // jump to the pointer when opening from nothing
    lens.x += (target.x - lens.x) * k;
    lens.y += (target.y - lens.y) * k;
    lens.r += (target.r - lens.r) * (target.r > lens.r ? 0.16 : 0.2);
    if (Math.abs(target.r - lens.r) < 1) lens.r = target.r;
    for (const c of lenses) {
      c.setAttribute('cx', lens.x.toFixed(1));
      c.setAttribute('cy', lens.y.toFixed(1));
      c.setAttribute('r', lens.r.toFixed(1));
    }
    setOpen(lens.r > 0);
    const settled = lens.r === target.r && Math.abs(target.x - lens.x) < 0.5 && Math.abs(target.y - lens.y) < 0.5;
    if (!settled) raf = requestAnimationFrame(tick);
  };
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  addEventListener(
    'pointermove',
    (e) => {
      if (!ready || e.pointerType === 'touch') return;
      point.x = e.clientX;
      point.y = e.clientY;
      const p = point.matrixTransform(svg.getScreenCTM()!.inverse());
      const near = p.x > -R * 0.4 && p.x < width + R * 0.4 && p.y > -R * 0.2 && p.y < height + R * 0.2;
      // Only at the top of the page: once the hero scrolls, the name is on its way out.
      target.r = near && scrollY < 40 ? R : 0;
      target.x = p.x;
      target.y = p.y;
      wake();
    },
    { passive: true },
  );
  addEventListener(
    'scroll',
    () => {
      if (scrollY >= 40 && target.r) {
        target.r = 0;
        wake();
      }
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => {
    target.r = 0;
    wake();
  });
}
