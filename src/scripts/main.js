'use strict';

// IMPORTS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// SELECTORS
const SELECTORS = {
  RING: "[data-class='ring']",
  LOGO: "[data-class='logo']",
  NAV_MENU: "[data-class='nav-menu']",
  HEADER_CONTENT: "[data-class='header__content']",
  HEADER_HEADING: "[data-class='header__heading']",
  HEADER_PAR: "[data-class='header__par']",
  HEADER_BTN: "[data-class='header__btn']",
  PRICING_BAR: "[data-class='pricing__bar']",
  PRICING_PLAN: "[data-class='pricing__plan']",
  PRICING_VALUE: "[data-class='pricing__value']",
  HEADER_MANIFESTO: "[data-class='header__manifesto']",
  HEADER_CARD: "[data-class='header__card']",
  MAIN_HEADING: "[data-class='main__heading']",
  MAIN_CARD_SECTION: "[data-class='main__card-section']",
  FOOTER_HEADING: "[data-class='footer__heading']",
  FOOTER_JOURNEY: "[data-class='footer__journey']",
  FOOTER_CONTACT: "[data-class='footer__contact']",
  FOOTER_CONTACT__BTN: "[data-class='footer__contact__btn']",
  FOOTER_CONTACT__LINK: "[data-class='footer__contact__link']",
  FOOTER_CONTACT__COPY: "[data-class='footer__contact__copy']",
};

gsap.registerPlugin(ScrollTrigger);

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
  },
  defaults: {
    duration: 0.475,
    ease: 'power2.out',
  },
});

const footerContactTl = gsap.timeline({
  scrollTrigger: {
    trigger: SELECTORS.FOOTER_CONTACT,
    start: 'top 90%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
    once: true,
  },
});

// HERO ANIMATION TIMELINE
heroTl
  .from(SELECTORS.RING, { y: '-70' })
  .from(SELECTORS.LOGO, { opacity: 0, xPercent: '-20' })
  .from(SELECTORS.NAV_MENU, { opacity: 0, xPercent: '20' }, '<')
  .from(SELECTORS.HEADER_CONTENT, { opacity: 0, y: '20' }, '<')
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

const scrollTriggerObj = (selector) => {
  return {
    trigger: selector,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
    once: true,
  };
};

gsap.from(SELECTORS.HEADER_MANIFESTO, {
  opacity: 0,
  y: 50,
  duration: 0.5,
  scrollTrigger: scrollTriggerObj(SELECTORS.HEADER_MANIFESTO),
});

gsap.from(SELECTORS.HEADER_CARD, {
  y: 30,
  opacity: 0,
  stagger: 0.25,
  scrollTrigger: scrollTriggerObj(SELECTORS.HEADER_CARD),
});

gsap.from(SELECTORS.MAIN_HEADING, {
  y: 30,
  opacity: 0,
  scrollTrigger: scrollTriggerObj(SELECTORS.MAIN_HEADING),
});

gsap.from(SELECTORS.MAIN_CARD_SECTION, {
  y: 30,
  opacity: 0,
  scrollTrigger: scrollTriggerObj(SELECTORS.MAIN_CARD_SECTION),
});

gsap.from(SELECTORS.FOOTER_HEADING, {
  y: 30,
  opacity: 0,
  scrollTrigger: scrollTriggerObj(SELECTORS.FOOTER_HEADING),
});
gsap.from(SELECTORS.FOOTER_JOURNEY, {
  y: 30,
  opacity: 0,
  scrollTrigger: scrollTriggerObj(SELECTORS.FOOTER_JOURNEY),
});

footerContactTl
  .from(SELECTORS.FOOTER_CONTACT__BTN, {
    y: 30,
    opacity: 0,
  })
  .from(SELECTORS.FOOTER_CONTACT__LINK, {
    y: 30,
    opacity: 0,
    stagger: 0.125,
  })
  .from(SELECTORS.FOOTER_CONTACT__COPY, {
    opacity: 0,
  });
