'use client';

import { MutableRefObject, useEffect, useRef } from 'react';

export default function useIntersectionObserver(
  callback: () => void,
  observerRef: MutableRefObject<HTMLDivElement | null>,
) {
  const initializeObserver = (callback: () => void) => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 0.1 },
    );
  };

  const observer = useRef(initializeObserver(callback));

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = initializeObserver(callback);

    if (observerRef.current) {
      observer.current.observe(observerRef.current);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [callback]);

  return observer;
}
