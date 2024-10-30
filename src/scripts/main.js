'use strict';

// IMPORTS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// SELECTORS?
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Create a function to handle ScrollTrigger configuration
const scrollTriggerObj = (selector) => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`ScrollTrigger: Element not found for selector "${selector}"`);
    return null; // Return null if the element isn't found
  }
  return {
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
    once: true,
  };
};

// Initialize animations after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create timelines for animations
  const heroTl = gsap.timeline({
    defaults: {
      duration: 0.475,
      ease: 'power2.out',
    },
  });

  const pricingDetailsTl = gsap.timeline({
    scrollTrigger: scrollTriggerObj(SELECTORS?.PRICING_BAR), // Use the scrollTriggerObj function
    defaults: {
      duration: 0.475,
      ease: 'power2.out',
    },
  });

  const footerContactTl = gsap.timeline({
    scrollTrigger: scrollTriggerObj(SELECTORS?.FOOTER_CONTACT), // Use the scrollTriggerObj function
  });

  // HERO ANIMATION TIMELINE
  heroTl
    .from(SELECTORS?.RING, { y: '-70' })
    .from(SELECTORS?.LOGO, { opacity: 0, xPercent: '-20' })
    .from(SELECTORS?.NAV_MENU, { opacity: 0, xPercent: '20' }, '<')
    .from(SELECTORS?.HEADER_CONTENT, { opacity: 0, y: '20' }, '<')
    .from(SELECTORS?.HEADER_BTN, { opacity: 0 });

  // Match media queries for different screen sizes
  const matchMedia = gsap.matchMedia();
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
          .from(SELECTORS?.PRICING_BAR, { opacity: 0 })
          .from(SELECTORS?.PRICING_PLAN, { opacity: 0, x: '20' }, '<')
          .from(SELECTORS?.PRICING_VALUE, { opacity: 0, x: '-20' }, '<');
      }

      if (isDesktop) {
        pricingDetailsTl
          .from(SELECTORS?.PRICING_BAR, { opacity: 0 })
          .from(SELECTORS?.PRICING_PLAN, { opacity: 0, x: '20' }, '<')
          .from(SELECTORS?.PRICING_VALUE, { opacity: 0, x: '-20' }, '<');
      }
    },
  );

  // GSAP animations for different sections
  const animations = [
    {
      selector: SELECTORS?.HEADER_MANIFESTO,
      params: { opacity: 0, y: 50, duration: 0.5 },
    },
    {
      selector: SELECTORS?.HEADER_CARD,
      params: { y: 30, opacity: 0, stagger: 0.25 },
    },
    { selector: SELECTORS?.MAIN_HEADING, params: { y: 30, opacity: 0 } },
    { selector: SELECTORS?.MAIN_CARD_SECTION, params: { y: 30, opacity: 0 } },
    { selector: SELECTORS?.FOOTER_HEADING, params: { y: 30, opacity: 0 } },
    { selector: SELECTORS?.FOOTER_JOURNEY, params: { y: 30, opacity: 0 } },
  ];

  // Loop through each animation and create GSAP from animations
  animations.forEach(({ selector, params }) => {
    const trigger = scrollTriggerObj(selector);
    if (trigger) {
      gsap.from(selector, { ...params, scrollTrigger: trigger });
    }
  });

  // Footer contact animations
  footerContactTl
    .from(SELECTORS?.FOOTER_CONTACT__BTN, {
      y: 30,
      opacity: 0,
    })
    .from(SELECTORS?.FOOTER_CONTACT__LINK, {
      y: 30,
      opacity: 0,
      stagger: 0.125,
    })
    .from(SELECTORS?.FOOTER_CONTACT__COPY, {
      opacity: 0,
    });
});
