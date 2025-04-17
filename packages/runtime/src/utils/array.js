

export function withoutNulls(arr) {
  // Используем != для удаление null и undefined
  return arr.filter((item) => item != null)
}
