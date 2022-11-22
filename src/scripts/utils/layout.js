import BREAKPOINTS from '@/breakpoint.json';
import { $canFixed } from '@/utils/doms';

const { body, documentElement: html } = document;

const freezeClass = '--freeze';
const addBorderClass = '--add-fixed-border';

let lockTimeout;
let lastScroll;
let $header = $('.header');

function calculateScrollWidth() {
  const div = document.createElement('div');

  div.style.position = 'absolute';
  div.style.top = '0px';
  div.style.left = '0px';
  div.style.width = '100%';
  div.style.height = '50px';

  body.appendChild(div);

  const fullWidth = div.offsetWidth;

  div.style.overflowY = 'scroll';

  const limitWidth = div.clientWidth;

  body.removeChild(div);

  const scrollWidth = fullWidth - limitWidth;

  html.classList.add(`--scroll-${scrollWidth}`);

  return scrollWidth;
}

export const scrollWidth = calculateScrollWidth();
export const lang = html.getAttribute('lang') || '';
export const isRTL = html.getAttribute('dir') === 'rtl';
export const isIOS = html.classList.contains('ios');
export const isIE = html.classList.contains('ie')
  || html.classList.contains('edge');

export default {
  scrollWidth,
  lang,
  isRTL,
  isIOS,
  isIE,

  get screenWidth() {
    return window.innerWidth;
  },

  get width() {
    return body.clientWidth;
  },

  get height() {
    return window.innerHeight;
  },

  get bodyHeight() {
    return body.offsetHeight;
  },

  get isFrozen() {
    return body.classList.contains(freezeClass);
  },

  get isDesktop() {
    return this.screenWidth >= BREAKPOINTS.LG;
  },

  get isTablet() {
    return this.screenWidth >= BREAKPOINTS.MD;
  },

  get isMobile() {
    return !this.isDesktop;
  },

  get isSmallScreen() {
    return this.screenWidth < BREAKPOINTS.LG;
  },

  get scroll() {
    return document.documentElement.scrollTop
      || document.body.scrollTop
      || window.pageYOffset;
  },

  set scroll(top) {
    window.scrollTo({
      top,
      left: 0,
      behavior: 'smooth',
    });
  },

  scrollImmediate(top) {
    window.scrollTo(0, top);
  },

  scrollToElement($element, immediately) {
    if (!$element[0]) {
      return;
    }

    if (!$header[0]) {
      $header = $('.header');
    }

    const scrollTo = $element.offset().top - ($header.outerHeight() || 0);

    if (immediately) {
      this.scrollImmediate(scrollTo);
    } else {
      this.scroll = $element.offset().top - ($header.outerHeight() || 0);
    }
  },

  freeze(callback) {
    clearTimeout(lockTimeout);
    setTimeout(() => {
      window.isFreezing = true;

      const willBeFrozen = !this.isFrozen;

      if (!willBeFrozen) {
        if (typeof callback === 'function') {
          callback();
        }

        return;
      }

      if (this.isIOS) {
        lastScroll = this.scroll;
        body.style.top = `${-lastScroll}px`;
      }

      body.classList.add(freezeClass);

      if (this.bodyHeight > this.height) {
        body.classList.add(addBorderClass);
        $canFixed.each((_, element) => {
          if (window.getComputedStyle(element).position === 'fixed') {
            element.classList.add(addBorderClass);
          }
        });
      }

      if (this.isIOS) {
        this.scrollImmediate(0);
      }

      if (typeof callback === 'function') {
        callback();
      }
    });
  },

  unfreeze(callback) {
    clearTimeout(lockTimeout);
    lockTimeout = setTimeout(() => {
      window.isFreezing = false;

      if (!this.isFrozen) {
        if (typeof callback === 'function') {
          callback();
        }

        return;
      }

      body.classList.remove(freezeClass);
      body.classList.remove(addBorderClass);
      $canFixed.removeClass(addBorderClass);

      if (this.isIOS) {
        body.style.top = '';
        this.scrollImmediate(lastScroll);

        if (typeof callback === 'function') {
          setTimeout(() => {
            callback();
          }, 50);
        }
      } else if (typeof callback === 'function') {
        callback();
      }
    });
  },
};
