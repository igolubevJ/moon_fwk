export class Dispatcher {
  #subs = new Map()
  #afterHandlers = []

  dispatch(commandName, payload) {
    if (this.#subs.has(commandName)) {
      // Проверяет что обработчики зарегистрированы и вызывает их
      this.#subs.get(commandName).forEach((handler) => handler(payload))
    } else {
      console.warn(`No handlers for command: ${commandName}`)
    }

    // Выполняет послекомандные обработки
    this.#afterHandlers.forEach((handler) => handler())
  }

  subscribe(commandName, handler) {
    if (!this.#subs.has(commandName)) {
      // Создать массив подписок для заданного имени команды,
      // если он еще не существует.
      this.#subs.set(commandName, [])
    }

    const handlers = this.#subs.get(commandName)
    if (handlers.includes(handler)) {
      // Проверяет, зарегистрирован ли обработчик
      return () => {}
    }

    handlers.push(handler) // Регистрирует обработчик
    
    // Возвращает функцию для отмены регистрации обработчика
    return () => {
      const idx = handlers.indexOf(handler)
      handlers.splice(idx, 1)
    }
  }

  afterEveryCommand(handler) {
    this.#afterHandlers.push(handler)  // Регистрирует обработчик

    // Возвращает функцию для отмены регистрации обработчика
    return () => {
      const idx = this.#afterHandlers.indexOf(handler)
      this.#afterHandlers.splice(idx, 1)
    }
  }
}