function withoutNulls(arr) {
  return arr.filter((item) => item != null)
}

const DOM_TYPES = {
  TEXT: 'text',
  ELEMENT: 'element',
  FRAGMENT: 'fragment',
};
function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  }
}
function hString(str) {
  return {
    value: str,
    type: DOM_TYPES.TEXT,
  }
}
function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === 'string' ? hString(child) : child
  )
}

function setAttributes(el, attrs) {
  const { class: className, style, ...otherAttrs } = attrs;
  if (className) {
    setClass(el, className);
  }
  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(el, prop, value);
    });
  }
  for (const [name, value] of Object.entries(otherAttrs)) {
    setAttribute(el, name, value);
  }
}
function setClass(el, className) {
  el.className = '';
  if (typeof className === 'string') {
    el.className = className;
  }
  if (Array.isArray(className)) {
    el.classList.add(...className);
  }
}
function setStyle(el, name, value) {
  el.style[name] = value;
}
function setAttribute(el, name, value) {
  if (value == null) {
    removeAttribute(el, name);
  } else if (name.startsWith('data-')) {
    el.setAttribute(name, value);
  } else {
    el[name] = value;
  }
}
function removeAttribute(el, name) {
  el[name] = null;
  el.removeAttribute(name);
}

function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler);
  return handler
}
function addEventListeners(listeners = {}, el) {
  const addedListeners = {};
  Object.entries(listeners).forEach(([eventName, handler]) => {
    const listener = addEventListener(eventName, handler, el);
    addedListeners[eventName] = listener;
  });
  return addedListeners
}
function removeEventListeners(listeners, el) {
  Object.entries(listeners).forEach(([eventName, handler]) => {
    el.removeEventListener(eventName, handler);
  });
}

function mountDOM(vdom, parentEl) {
  switch(vdom.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl);
      break
    }
    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl);
      break
    }
    case DOM_TYPES.FRAGMENT: {
      createFragmentNode(vdom, parentEl);
      break
    }
    default: {
      throw new Error(`Can't mount DOM of type: ${vdom.type}`)
    }
  }
}
function createTextNode(vdom, parentEl) {
  const { value } = vdom;
  const textNode = document.createTextNode(value);
  vdom.el = textNode;
  parentEl.append(textNode);
}
function createFragmentNode(vdom, parentEl) {
  const { children } = vdom;
  vdom.el = parentEl;
  children.forEach((child) => mountDOM(child, parentEl));
}
function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom;
  const element = document.createElement(tag);
  addProps(element, props, vdom);
  vdom.el = element;
  children.forEach((child) => mountDOM(child, element));
  parentEl.append(element);
}
function addProps(el, props, vdom) {
  const { on: events, ...attrs } = props;
  vdom.listeners = addEventListeners(events, el);
  setAttributes(el, attrs);
}

function destroyDOM(vdom) {
  const { type } = vdom;
  switch (type) {
    case DOM_TYPES.TEXT: {
      removeTextNode(vdom);
      break
    }
    case DOM_TYPES.ELEMENT: {
      removeElementNode(vdom);
      break
    }
    case DOM_TYPES.FRAGMENT: {
      removeFragmentNodes(vdom);
      break
    }
    default: {
      throw new Error(`Can't destroy DOM of type: ${type}`)
    }
  }
  delete vdom.el;
}
function removeTextNode(vdom) {
  const { el } = vdom;
  el.remove();
}
function removeElementNode(vdom) {
  const { el, children, listeners } = vdom;
  el.remove();
  children.forEach(destroyDOM);
  if (listeners) {
    removeEventListeners(listeners, el);
    delete vdom.listeners;
  }
}
function removeFragmentNodes(vdom) {
  const { children } = vdom;
  children.forEach(destroyDOM);
}

const vdom = h('main', {}, [
  h('section', {}, [
    h('h1', {}, ['My Blog']),
    h('p', {}, ['Welcome to my Blog']),
  ]),
  h('section', {}, [
    h('form', { class: 'login-form', action: 'login' }, [
      h('input', { type: 'text', name: 'user' }),
      h('input', { type: 'password', name: 'pass' }),
      h('button', { on: { click: () => {} } }, ['Login'])
    ])
  ])
]);
console.log(vdom);
mountDOM(vdom, document.body);
setTimeout(() => {
  destroyDOM(vdom);
}, 10000);
