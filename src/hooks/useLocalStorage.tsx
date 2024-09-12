import { TuseLocalStorage } from "../types/Hooks";

const useLocalStorage = (): TuseLocalStorage => {
  const setItem = (key: string, value: unknown) => {
    try {
      window.localStorage.setItem(
        key,
        typeof value === "string" ? value : JSON.stringify(value)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = (key: string) => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  const clearItem = (key: string) => {
    try {
      return window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  const clearStorage = () => {
    window.localStorage.clear();
  };

  return {
    setItem,
    getItem,
    clearItem,
    clearStorage,
  };
};

export default useLocalStorage;
