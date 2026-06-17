import { useState, useEffect, useRef, MutableRefObject } from "react";

export function useInView(threshold: number = 0.2): [MutableRefObject<any>, boolean] {
  const [inView, setInView] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Runs only once
        }
      },
      {
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, inView];
}
