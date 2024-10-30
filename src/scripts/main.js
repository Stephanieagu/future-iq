'use strict';

// IMPORTS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LocomotiveScroll from 'locomotive-scroll';

// SELECTORS
const SELECTORS = {
  RING: "[data-class='ring']",
  LOGO: "[data-class='logo']",
  NAV_MENU: "[data-class='nav-menu']",
  HEADER_HEADING: "[data-class='header__heading']",
  HEADER_PAR: "[data-class='header__par']",
  HEADER_BTN: "[data-class='header__btn']",
  PRICING_BAR: "[data-class='pricing__bar']",
  PRICING_PLAN: "[data-class='pricing__plan']",
  PRICING_VALUE: "[data-class='pricing__value']",
  HEADER_MANIFESTO: "[data-class='header__manifesto']",
  HEADER_CARD: "[data-class='header__card']",
};

gsap.registerPlugin(ScrollTrigger);

// const scroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   smartphone: {
//     smooth: true,
//   },
//   tablet: {
//     smooth: true,
//   },
// });

// TIMELINE CREATION
const heroTl = gsap.timeline({
  defaults: {
    duration: 0.475,
    ease: 'power2.out',
  },
});

const matchMedia = gsap.matchMedia();

const pricingDetailsTl = gsap.timeline({
  scrollTrigger: {
    trigger: SELECTORS.PRICING_BAR,
    start: 'top 90%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
    once: true,
    markers: true,
  },
  defaults: {
    duration: 0.475,
    ease: 'power2.out',
  },
});

// HERO ANIMATION TIMELINE
heroTl
  .from(SELECTORS.RING, { y: '-70' })
  .from(SELECTORS.LOGO, { opacity: 0, xPercent: '-20' })
  .from(SELECTORS.NAV_MENU, { opacity: 0, xPercent: '20' }, '<')
  .from(SELECTORS.HEADER_HEADING, { opacity: 0, y: '20' }, '<')
  .from(SELECTORS.HEADER_PAR, { opacity: 0, y: '20', stagger: 0.05 })
  .from(SELECTORS.HEADER_BTN, { opacity: 0 });

matchMedia.add(
  {
    isMobile: '(max-width: 640px)',
    isDesktop: '(min-width: 640px)',
  },
  (context) => {
    const { isMobile, isDesktop } = context.conditions;

    if (isMobile) {
      heroTl
        .add(pricingDetailsTl)
        .from(SELECTORS.PRICING_BAR, { opacity: 0 })
        .from(SELECTORS.PRICING_PLAN, { opacity: 0, x: '20' }, '<')
        .from(SELECTORS.PRICING_VALUE, { opacity: 0, x: '-20' }, '<');
    }

    if (isDesktop) {
      pricingDetailsTl
        .from(SELECTORS.PRICING_BAR, { opacity: 0 })
        .from(SELECTORS.PRICING_PLAN, { opacity: 0, x: '20' }, '<')
        .from(SELECTORS.PRICING_VALUE, { opacity: 0, x: '-20' }, '<');
    }
  },
);

gsap.from(SELECTORS.HEADER_MANIFESTO, {
  opacity: 0,
  y: 50,
  duration: 0.5,
  scrollTrigger: {
    trigger: SELECTORS.HEADER_MANIFESTO,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none', // Play once on first enter
    once: true, // Ensure animation happens only once
    markers: true, // Enable markers for debugging
  },
});

gsap.from(SELECTORS.HEADER_CARD, {
  y: 30,
  opacity: 0,
  stagger: 0.25,
  scrollTrigger: {
    trigger: SELECTORS.HEADER_CARD,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none', // Play once on first enter
    once: true, // Ensure animation happens only once
    markers: true, // Enable markers for debugging
  },
});
