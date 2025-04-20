

export function withoutNulls(arr) {
  // Используем != для удаление null и undefined
  return arr.filter((item) => item != null)
}


export function arraysDiff(oldArray, newArray) {
  return {
    added: newArray.filter(
      (newItem) => !oldArray.includes(newItem)  // Элементы нового массива, которых нет в старом массиве, добавлены
    ),
    removed: oldArray.filter(
      (oldItem) => !newArray.includes(oldItem)  // Элементы старого массива, которых нет в новом, удалены
    )
  }
}
