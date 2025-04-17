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

function createTextNode(vdom, parentEl) {
  throw new Error('[createTextNode] not implemented')
}

function createElementNode(vdom, parentEl) {
  throw new Error('[createElementNode] not implemented')
}

function createFragmentNode(vdom, parentEl) {
  throw new Error('[createFragmentNode] not implemented')
}
