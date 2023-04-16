// Запись данных в localStorage
const setStore = (key: string, value: string): void => {
  localStorage.setItem(key, value)
}

// Забор данных из localStorage
const getStore = (key: string): string | null => {
  return localStorage.getItem(key)
}

// Удаление данных из localStorage
const removeItemStore = (key: string): void => {
  localStorage.removeItem(key)
}

export { setStore, getStore, removeItemStore }
