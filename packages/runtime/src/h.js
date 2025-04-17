import { withoutNulls } from './utils/array'

/*

Три типа узла:

1. Текстовые узлы - представляют текстовое содержимое.
2. Узлы элементов - представляет HTML-элементы с именем тега
3. Узлы фрагментов - представляет коллекцию узлов, не имеющих родительского узла,
                     пока не будет присоединены к DOM. 
*/

export const DOM_TYPES = {
  TEXT: 'text',             // тип для текстового узла
  ELEMENT: 'element',       // тип для узла элемента
  FRAGMENT: 'fragment',     // тип для узла фрагмента
}

export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  }
}

function mapTextNodes(children) {
  throw new Error('[mapTextNodes] not implemented')
}
