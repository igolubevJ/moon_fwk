import { DOM_TYPES } from './h'

export function mountDOM(vdom, parentEl) {
  switch(vdom.type) {
    // Монтирует текстовый узел
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl)
      break
    }

    // Монтирует виртуальный узел элемента
    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl)
      break
    }

    // Монтирует дочернии узлы виртуального узла фрагмента
    case DOM_TYPES.FRAGMENT: {
      createFragmentNode(vdom, parentEl)
      break
    }

    default: {
      throw new Error(`Can't mount DOM of type: ${vdom.type}`)
    }
  }
}

/// После создания текстового DOM-узла нужно выполнить две операции:
/// 1. Сохранить ссылку на реальный DOM узел в свойстве el виртуального узла
/// 2. Присоединить текстовый узел к родительскому элементу.
function createTextNode(vdom, parentEl) {
  const { value } = vdom

  const textNode = document.createTextNode(value) // Создает текстовый узел
  vdom.el = textNode                              // Сохраняет ссылку на узел

  parentEl.append(textNode)                       // Присоединяет к родительскому элементу
}

function createElementNode(vdom, parentEl) {
  throw new Error('[createElementNode] not implemented')
}

function createFragmentNode(vdom, parentEl) {
  throw new Error('[createFragmentNode] not implemented')
}
