import { destroyDOM } from './destroy-dom'
import { Dispatcher } from './dispatcher'
import { mountDOM } from './mount-dom'
import { patchDOM } from './patch-dom'

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
    const newVdom = view(state, emit)        // Вычисляем новый виртуальный DOM
    vdom = patchDOM(vdom, newVdom, parentEl) // Обновляет DOM при изменении состояния
  }

  return {
    mount(_parentEl) {        // метод для монтирования приложения в DOM
      vdom = view(state, emit)
      mountDOM(vdom, parentEl) // Монтирует DOM только один раз
    },

    unmount() {               // метод для демонтирования приложения из DOM
      destroyDOM(vdom)
      vdom = null
      subscriptions.forEach((unsubscribe) => unsubscribe())
    }
  }
}
