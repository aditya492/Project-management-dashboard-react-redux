
// Dynamically set the value in localStorage by callIng function

export const getLocalArray = (key) => JSON.parse(localStorage.getItem(key));

export const setLocalArray = (key, value) => localStorage.setItem(key, JSON.stringify(value));
