export function throttle(fn, thisArg = window) {
  let scheduledAnimationFrame;

  return () => {
    if (scheduledAnimationFrame) {
      return;
    }

    scheduledAnimationFrame = true;

    requestAnimationFrame(() => {
      fn.call(thisArg);
      scheduledAnimationFrame = false;
    });
  };
}

export function transformToCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export function transformToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function cloneJSON(json) {
  return JSON.parse(JSON.stringify(json));
}

export function transformObjectToParams(obj) {
  return Object
    .keys(obj)
    .reduce((arr, key) => (
      arr.concat(`${key}=${encodeURIComponent(obj[key])}`)
    ), [])
    .join('&');
}
