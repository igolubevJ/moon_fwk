function withoutNulls(arr) {
  return arr.filter((item) => item != null)
}

const DOM_TYPES = {
  TEXT: 'text',
  ELEMENT: 'element'};
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

const vdom = h('form', { class: 'login-form', action: 'login' }, [
  h('input', { type: 'text', name: 'user' }),
  h('input', { type: 'password', name: 'pass' }),
  h('button', { on: { click: () => {} } }, ['Login'])
]);
console.log(vdom);
