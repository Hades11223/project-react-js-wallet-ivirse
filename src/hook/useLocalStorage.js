import { useEffect, useState } from "react";

function useLocalStorage(key) {
  const [data, setData] = useState(localStorage.getItem(key));
  useEffect(() => {
    const chanegLocalStorage = () => {
      const item = localStorage.getItem(key);
      setData(item);
    };

    window.addEventListener("storage", chanegLocalStorage);
    return () => {
      window.removeEventListener("storage", chanegLocalStorage);
    };
  }, []);

  return data;
}
export default useLocalStorage;
