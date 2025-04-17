import { h } from './h'

const vdom = h('form', { class: 'login-form', action: 'login' }, [
  h('input', { type: 'text', name: 'user' }),
  h('input', { type: 'password', name: 'pass' }),
  h('button', { on: { click: () => {} } }, ['Login'])
])

console.log(vdom)
