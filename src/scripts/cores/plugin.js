import { transformToKebabCase } from '@/utils';

const states = {
  loading: 0,
  interactive: 1,
  complete: 2,
};

const READY_STATE = 'DOMContentLoaded';

function getElementData(el) {
  const elDataset = el.dataset;

  return Object.keys(elDataset).reduce((obj, key) => {
    const data = {};

    if (elDataset[key]) {
      data[key] = '';

      try {
        data[key] = JSON.parse(elDataset[key]);
      } catch (err) {
        data[key] = elDataset[key];
      }
    }

    return { ...obj, ...data };
  }, {});
}

function setupClass(Class, name) {
  Class.prototype.$__pluginName = name;

  Class.prototype.addEvent = function (
    $element,
    event,
    trigger,
    { forceOff, delegate, namespace } = {},
  ) {
    const eventNamespace = namespace || name;
    const element = $element[0];
    const isGlobalElement = element === window
      || element === document
      || element === document.body;

    if (forceOff || !isGlobalElement) {
      $element.off(`${event}.${eventNamespace}`, delegate);
    }

    $element.on(`${event}.${eventNamespace}`, delegate, trigger.bind(this));
  };

  Class.prototype.addState = function (stateName, defaultValue, forceUpdate) {
    let state = defaultValue;

    Object.defineProperty(this.state, stateName, {
      enumerable: true,
      configurable: true,
      get: () => state,
      set: (value) => {
        const lastValue = state;

        state = value;

        const shouldUpdate = lastValue !== state;

        if (!forceUpdate && !shouldUpdate) {
          return;
        }

        if (typeof this.watch?.[stateName] === 'function') {
          this.watch[stateName].call(this, state);
        }
      },
    });
  };
}

function setupInstance(Class, element, props, pluginName) {
  const instance = new Class();

  instance.$element = $(element);
  instance.props = $.extend(
    {},
    $.fn[pluginName].defaults,
    getElementData(element),
    props,
  );
  instance.state = {};

  if (typeof instance.init === 'function') {
    instance.init();
  }

  return instance;
}

export default function Plugin(param) {
  function runPlugin(Class) {
    const baseName = Class.name;
    const name = transformToKebabCase(baseName);
    const props = param?.props || {};
    const loadEvent = param?.when || READY_STATE;
    const selector = param?.selector;

    setupClass(Class, name);

    function init() {
      if (typeof selector === 'string') {
        $(selector)[name]();
      } else {
        $(`[data-${name}]`)[name]();
      }
    }

    $.fn[name] = function (opts, params) {
      const instanceName = `${name}-instance`;

      return this.each(function () {
        const instance = $.data(this, instanceName);

        if (!(instance instanceof Class)) {
          $.data(this, instanceName, setupInstance(Class, this, opts, name));

          return;
        }

        if (typeof instance[opts] !== 'function') {
          console.error(`This element has been initialized with plugin ${baseName}, please provide a correct method`);

          return;
        }

        instance[opts](params);
      });
    };

    $.fn[name].defaults = props;

    if (loadEvent === READY_STATE && states[document.readyState] > 0) {
      init();
    } else {
      window.addEventListener(loadEvent, init);
    }

    return Class;
  }

  return typeof param === 'function' ? runPlugin(param) : runPlugin;
}
