export function setAttributes(el, attrs) {
  const { class: className, style, ...otherAttrs } = attrs

  if (className) {
    setClass(el, className)                                 // Задает аттрибут class 
  }

  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(el, prop, value)                             // Задает аттрибут style
    })
  }

  for (const [name, value] of Object.entries(otherAttrs)) {
    setAttribute(el, name, value)                           // Задает остальные аттрибуты
  }
}

function setClass(el, className) {
  throw new Error('[setClass] not implemented')
}

function setStyle(el, prop, value) {
  throw new Error('[setStyle] not implemented')
}

function setAttribute(el, name, value) {
  throw new Error('[setAttribute] not implemented')
}