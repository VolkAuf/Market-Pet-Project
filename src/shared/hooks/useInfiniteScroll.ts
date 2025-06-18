import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  callback: () => void;
  rootMargin?: string;
  enabled?: boolean;
}

export const useInfiniteScroll = ({ callback, rootMargin = "300px", enabled = true }: UseInfiniteScrollOptions) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    loaderRef.current = node;
  }, []);

  useEffect(() => {
    if (!enabled || !loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { rootMargin },
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, rootMargin, enabled]);

  return { loaderRef: setRef };
};
