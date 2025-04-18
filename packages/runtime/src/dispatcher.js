export class Dispatcher {
  #subs = new Map()

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
}