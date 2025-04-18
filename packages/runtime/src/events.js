
/// Возвращает зарегистрированную функцию необходимую для 
/// реализации метода destoryDOM - обработчики событий нужно
/// будет удалять для предотвращения утечек памяти.
export function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler)
  return handler
}

/// Позволяет добавлять несколько обработчиков событий
export function addEventListeners(listeners = {}, el) {
  const addedListeners = {}

  Object.entries(listeners).forEach(([eventName, handler]) => {
    const listener = addEventListener(eventName, handler, el)
    addedListeners[eventName] = listener
  })

  return addedListeners
}

export function removeEventListeners(listeners, el) {
  Object.entries(listeners).forEach(([eventName, handler]) => {
    el.removeEventListener(eventName, handler)
  })
}
