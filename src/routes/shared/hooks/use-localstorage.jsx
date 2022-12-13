import { useState } from 'react';

function readLocalStorage(key) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log('Error reading from localStorage');
    console.error(error);
    return null;
  }
}

function saveLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error saving to localStorage');
    console.error(error);
  }
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return readLocalStorage(key) || initialValue;
  });

  const setValue = (value) => {
    saveLocalStorage(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
