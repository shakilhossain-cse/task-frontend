const getFromLocalStorage = <T>(key: string): T | null => {
    const storedData = localStorage.getItem(key);
  
    if (storedData) {
      try {
        return JSON.parse(storedData) as T;
      } catch (error) {
        console.error(`Error parsing local storage data for key ${key}:`, error);
      }
    }
  
    return null;
  };
  
  const setLocalStorage = <T>(key: string, data: T): void => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error storing data in local storage for key ${key}:`, error);
    }
  };

  const removeFromLocalStorage = (key:string) => {
    try {
      
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removeing data in local storage for key ${key}:`, error);
    }
  }
  
  export { getFromLocalStorage, setLocalStorage ,removeFromLocalStorage};
  