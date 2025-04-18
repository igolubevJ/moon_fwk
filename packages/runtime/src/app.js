import { destroyDOM } from './destroy-dom'
import { mountDOM } from './mount-dom'

/// Функция которая создает объект приложения
export function createApp({ state, view }) {
  let parentEl = null
  let vdom = null

  function renderApp() {
    if (vdom) {
      // Если предыдущее представление существует, 
      // оно демонтируется.
      destroyDOM(vdom)
    }

    vdom = view(state)
    mountDOM(vdom, parentEl)  // монтируем новое представление
  }

  return {
    mount(_parentEl) {        // метод для монтирования приложения в DOM
      parentEl = _parentEl
      renderApp()
    }
  }
}
