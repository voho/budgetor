export const getLocalStorageValue = <T>(key: string, fallback: T): T => {
  const storedValue = window.localStorage.getItem(key);
  if (storedValue === null || storedValue === undefined) {
    return fallback;
  }
  return JSON.parse(storedValue) as T;
};

export const setLocalStorageValue = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
