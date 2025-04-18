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
  el.className = ''                    // очищаем аттрибут class

  if (typeof className === 'string') {
    el.className = className           // аттрибут className в виде строки 
  }

  if (Array.isArray(className)) {
    el.classList.add(...className)     // аттрибут class в виде массива
  }
}

function setStyle(el, name, value) {
  el.style[name] = value
}

function removeStyle(el, name) {
  el.style[name] = null
}

function setAttribute(el, name, value) {
  if (value == null) {
    removeAttribute(el, name)
  } else if (name.startsWith('data-')) {
    el.setAttribute(name, value)
  } else {
    el[name] = value
  }
}

function removeAttribute(el, name) {
  el[name] = null
  el.removeAttribute(name)
}