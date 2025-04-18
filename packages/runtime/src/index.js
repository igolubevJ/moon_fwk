import { h } from './h'
import { mountDOM } from './mount-dom'
import { destroyDOM } from './destroy-dom'

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
])

console.log(vdom)

mountDOM(vdom, document.body)

setTimeout(() => {
  destroyDOM(vdom)
}, 10000)
