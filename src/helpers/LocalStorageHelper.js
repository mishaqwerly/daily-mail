export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log("can't set item to localStorage", error)
  }
}

export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.log("can't get item from localStorage", error)
  }
}
