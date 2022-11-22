const { documentElement: html } = document;

const isTouch = 'ontouchstart' in window
  || navigator.maxTouchPoints > 0
  || navigator.msMaxTouchPoints > 0;

html.classList.add(isTouch ? 'touch' : 'no-touch');

if (typeof InstallTrigger !== 'undefined') {
  html.classList.add('firefox');
}

const isIOSPlatform = [
  'iPad Simulator',
  'iPhone Simulator',
  'iPod Simulator',
  'iPad',
  'iPhone',
  'iPod',
].includes(navigator.platform);

if (isIOSPlatform || (navigator.userAgent.includes('Mac') && isTouch)) {
  html.classList.add('ios');
}

const isIE = document.documentMode;

if (isIE) {
  html.classList.add('ie');
}

if (!isIE && window.StyleMedia) {
  html.classList.add('edge');
}

const isChrome = !!window.chrome;

if (isChrome) {
  html.classList.add('chrome');
}

if (isChrome && navigator.userAgent.indexOf('Edg') > -1) {
  html.classList.add('edge-chromium');
}

export default null;
