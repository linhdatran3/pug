import { throttle } from '../utils';
import { $win } from '../utils/doms';
import layout from '../utils/layout';

let passiveIfSupported = false;
let lastWinScroll = layout.scroll;
let resizeTimeout;
let lastWinWidth = layout.width;
let lastWinHeight = layout.height;
let lastBreakpointIsDesktop = layout.isDesktop;

const RESIZE_TIME = 180;

try {
  const passive = Object.defineProperty({}, 'passive', {
    get() {
      passiveIfSupported = { passive: true };

      return true;
    },
  });

  window.addEventListener('test', null, passive);
} catch (err) { /**/ }

window.addEventListener('scroll', throttle(() => {
  const currentWinScroll = layout.scroll;

  if (currentWinScroll === lastWinScroll) {
    return;
  }

  const name = currentWinScroll < lastWinScroll ? 'up' : 'down';

  $win.trigger('scrolling', currentWinScroll);
  $win.trigger(`scroll:${name}`, currentWinScroll);

  lastWinScroll = currentWinScroll;
}), passiveIfSupported);

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  setTimeout(() => {
    const currentWinWidth = layout.width;
    const currentWinHeight = layout.height;
    const isWidthChanged = lastWinWidth !== currentWinWidth;
    const isHeightChanged = lastWinHeight !== currentWinHeight;

    $win.trigger('resized', [currentWinWidth, currentWinHeight]);

    if (isWidthChanged) {
      $win.trigger('width-change', currentWinWidth);

      const currentBreakpointIsDesktop = layout.isDesktop;

      if (lastBreakpointIsDesktop !== currentBreakpointIsDesktop) {
        // Prevent conflict event name with slick
        $win.trigger('breakpoint:change', currentWinWidth);

        const breakpointEvtName = currentBreakpointIsDesktop
          ? 'desktop'
          : 'mobile';

        $win.trigger(`breakpoint:${breakpointEvtName}`, currentWinWidth);

        lastBreakpointIsDesktop = currentBreakpointIsDesktop;
      }

      lastWinWidth = currentWinWidth;
    }

    if (isHeightChanged) {
      $win.trigger('height-change', currentWinHeight);

      lastWinHeight = currentWinHeight;
    }

    if (isWidthChanged && isHeightChanged) {
      $win.trigger('size-change', currentWinWidth, currentWinHeight);
    }
  }, RESIZE_TIME);
}, passiveIfSupported);
