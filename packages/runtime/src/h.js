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

/// Функция возвращает объекты виртуального узла с переданным
/// именем тега, свойствами и дочерними узлами, а также со
/// свойством type. 
export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  }
}

function mapTextNodes(children) {
  return children.map((child) => 
    typeof child === 'string' ? hString(child) : child
  )
}

function hString(child) {
  throw new Error('[hString] not implemented')
}