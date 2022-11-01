import { useEffect, useRef } from "react";

export default function useInterval(callback, timeout = 5000) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let interval = setInterval(() => {
      callbackRef.current();
    }, timeout);
    return () => clearInterval(interval);
  }, [timeout]);
}
