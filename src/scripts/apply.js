'use strict';

// IMPORTS
import { gsap } from 'gsap';

// SELECTORS
const SELECTORS = {
  RING: "[data-class='ring']",
  LOGO: "[data-class='logo']",
  NAV_MENU: "[data-class='nav-menu']",
};

// TIMELINE CREATION
const heroTl = gsap.timeline({
  defaults: {
    duration: 0.475,
    ease: 'power2.out',
  },
});

// HERO ANIMATION TIMELINE
heroTl
  .from(SELECTORS.RING, { y: '-70' })
  .from(SELECTORS.LOGO, { opacity: 0, xPercent: '-20' })
  .from(SELECTORS.NAV_MENU, { opacity: 0, xPercent: '20' }, '<');
