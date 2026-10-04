import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
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

initHeader();
initContact();
initFooter();

initHero();
initWork();
initSystems();
initCareer();

if (!reduceMotion) {
  initReveals();
  initParallax();
  initAbout();
}

// Line breaks and trigger positions depend on the web fonts; measure again once they are in.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
