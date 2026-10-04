import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';
import { reduceMotion } from './env';
import { initHeader } from './ui/header';
import { initContact } from './ui/contact';
import { initFooter } from './ui/footer';
import { initHero } from './motion/hero';
import { initParallax, initReveals } from './motion/reveals';
import { initAbout } from './motion/about';
import { initWork } from './motion/work';
import { initSystems } from './motion/systems';
import { initCareer } from './motion/career';
import { loadTextFont } from './fonts';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
loadTextFont();

const root = document.documentElement;
// Smooth scrolling drives ScrollTrigger from one ticker. Off entirely with reduced motion.
let lenis: Lenis | null = null;
if (!reduceMotion) {
  root.classList.add('motion');
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

initHeader(lenis);
initContact();
initFooter();

initHero();
initWork(lenis);
initSystems();
initCareer();

if (!reduceMotion) {
  initReveals();
  initParallax();
  initAbout();
}

// Line breaks and pin lengths depend on the web fonts; measure again once they are in.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
