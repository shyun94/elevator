import { useEffect } from "react";

export const useInterval = (
  callback: () => void,
  { delay, run }: { delay: number; run: boolean }
) => {
  useEffect(() => {
    if (!run) return;
    const interval = setInterval(callback, delay);

    return () => clearInterval(interval);
  }, [callback, delay, run]);
};
