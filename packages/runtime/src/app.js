import { destroyDOM } from './destroy-dom'
import { Dispatcher } from './dispatcher'
import { mountDOM } from './mount-dom'

/// Функция которая создает объект приложения
export function createApp({ state, view, reducers = {} }) {
  let parentEl = null
  let vdom = null

  const dispatcher = new Dispatcher()
  const subscriptions = [                   // Присоединение к родительскому элементу
    dispatcher.afterEveryCommand(renderApp)
  ]

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload)
  }

  for (const actionName in reducers) {
    const reducer = reducers[actionName]

    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload)       // Обновление состояния вызовом функции редьюсера
    })
    subscriptions.push(subs)                // Добавляет подписку на команду в массив подписок
  }

  function renderApp() {
    if (vdom) {
      // Если предыдущее представление существует, 
      // оно демонтируется.
      destroyDOM(vdom)
    }

    vdom = view(state, emit)
    mountDOM(vdom, parentEl)  // монтируем новое представление
  }

  return {
    mount(_parentEl) {        // метод для монтирования приложения в DOM
      parentEl = _parentEl
      renderApp()
    }
  }
}
