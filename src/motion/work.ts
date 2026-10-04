import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type Lenis from 'lenis';
import { q, qa, reduceMotion } from '../env';
import { enhanceVideo, playWhenVisible } from '../ui/media';

/**
 * Selected work.
 * Desktop: the stage pins and scroll position steps through the projects. Each step is
 * a triggered transition (not scrubbed), so it always plays at full quality: the next
 * capture wipes up over the last and the title swaps through line masks.
 * Below 1024px, or with reduced motion: a plain stack of cards.
 */
// Line offsets that clear the padded SplitText masks entirely (no glyph edges peeking out).
const HIDDEN_BELOW = 130;
const HIDDEN_ABOVE = -135;

export function initWork(lenis: Lenis | null) {
  const stage = q('[data-work-stage]');
  const projects = qa('[data-project]', stage);
  const buttons = qa<HTMLButtonElement>('[data-work-index] button', stage);
  const counter = q('[data-work-current]', stage);
  const media = projects.map((p) => enhanceVideo(q<HTMLVideoElement>('video', p)));
  const n = projects.length;

  const mm = gsap.matchMedia();
  mm.add(
    {
      pinned: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      stacked: '(max-width: 1023px), (prefers-reduced-motion: reduce)',
    },
    (ctx) => (ctx.conditions?.pinned ? setupPinned() : setupStacked()),
  );

  function setupStacked() {
    const stops = media.map((m) => playWhenVisible(m, !reduceMotion));
    if (!reduceMotion) {
      projects.forEach((p) => {
        const box = q('.project__media', p);
        gsap.fromTo(
          box,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'expo.out', scrollTrigger: { trigger: box, start: 'top 88%', once: true } },
        );
      });
    }
    return () => stops.forEach((stop) => stop());
  }

  function setupPinned() {
    stage.classList.add('is-pinned');
    const parts = projects.map((p) => ({
      box: q('.project__media', p),
      video: q('video', p),
      title: q('.project__title', p),
      rest: qa('.project__num, .project__label, .project__line, .project__link', p),
      lines: [] as Element[],
    }));
    let active = 0;
    let tl: gsap.core.Timeline | null = null;

    parts.forEach((part, i) => {
      SplitText.create(part.title, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        aria: 'none',
        autoSplit: true,
        onSplit(self) {
          part.lines = self.lines;
          gsap.set(self.lines, { yPercent: i === active ? 0 : HIDDEN_BELOW });
        },
      });
      gsap.set(part.box, { clipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', zIndex: i === 0 ? 2 : 1 });
      gsap.set(part.rest, { autoAlpha: i === 0 ? 1 : 0 });
      projects[i].classList.toggle('is-active', i === 0);
    });
    markIndex(0);

    const go = (next: number) => {
      if (next === active) return;
      const dir = next > active ? 1 : -1;
      const prev = active;
      active = next;
      tl?.progress(1);
      const a = parts[prev];
      const b = parts[next];
      projects[prev].classList.remove('is-active');
      projects[next].classList.add('is-active');
      media[prev].pause();
      media[next].play(true);
      markIndex(next);

      tl = gsap
        .timeline()
        .set(b.box, { zIndex: 3 })
        .set(a.box, { zIndex: 2 })
        .fromTo(b.box, { clipPath: dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'expo.out' }, 0)
        .fromTo(b.video, { scale: 1.06 }, { scale: 1, duration: 1.2, ease: 'expo.out' }, 0)
        .to(a.video, { scale: 1.03, duration: 1.0, ease: 'power3.out' }, 0)
        .to(a.lines, { yPercent: dir > 0 ? HIDDEN_ABOVE : HIDDEN_BELOW, duration: 0.45, ease: 'power3.in', stagger: 0.03 }, 0)
        .to(a.rest, { autoAlpha: 0, y: -10 * dir, duration: 0.35, ease: 'power3.in' }, 0)
        .fromTo(b.lines, { yPercent: dir > 0 ? HIDDEN_BELOW : HIDDEN_ABOVE }, { yPercent: 0, duration: 0.85, ease: 'expo.out', stagger: 0.06 }, 0.2)
        .fromTo(b.rest, { autoAlpha: 0, y: 14 * dir }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05 }, 0.3)
        .set(a.box, { clipPath: 'inset(100% 0% 0% 0%)', zIndex: 1 })
        .set(a.video, { scale: 1 });
    };

    const trigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * 0.75 * n)}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => go(Math.min(n - 1, Math.floor(self.progress * n))),
    });

    // The active recording plays when the stage is mostly in view and pauses when it leaves.
    let playedThisVisit = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5 && !playedThisVisit) {
          playedThisVisit = true;
          media[active].play(true);
        } else if (entry.intersectionRatio < 0.1) {
          playedThisVisit = false;
          media[active].pause();
        }
      },
      { threshold: [0, 0.1, 0.5] },
    );
    io.observe(stage);

    const stepY = (i: number) => trigger.start + ((i + 0.5) / n) * (trigger.end - trigger.start);
    const scrollToStep = (i: number, immediate = false) => {
      if (lenis) lenis.scrollTo(stepY(i), { duration: 1.1, immediate });
      else window.scrollTo({ top: stepY(i), behavior: immediate ? 'auto' : 'smooth' });
    };
    const onIndex = (e: Event) => {
      const i = Number((e.currentTarget as HTMLElement).dataset.step);
      scrollToStep(i);
    };
    buttons.forEach((b) => b.addEventListener('click', onIndex));

    // Keyboard users tabbing to a project's link are taken to that project.
    const onFocus = (e: FocusEvent) => {
      const i = projects.findIndex((p) => p.contains(e.target as Node));
      if (i >= 0 && i !== active) scrollToStep(i, true);
    };
    stage.addEventListener('focusin', onFocus);

    return () => {
      tl?.kill();
      io.disconnect();
      buttons.forEach((b) => b.removeEventListener('click', onIndex));
      stage.removeEventListener('focusin', onFocus);
      stage.classList.remove('is-pinned');
      projects.forEach((p) => p.classList.remove('is-active'));
      parts.forEach((part) => gsap.set([part.box, part.video, ...part.rest], { clearProps: 'all' }));
      media.forEach((m) => m.pause());
    };
  }

  function markIndex(i: number) {
    buttons.forEach((b, j) => {
      if (i === j) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    counter.textContent = String(i + 1).padStart(2, '0');
  }
}
