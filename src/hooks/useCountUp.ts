import { useState, useEffect } from "react";

export function useCountUp(target: number, duration: number = 2000, trigger: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }

    const startTime = performance.now();
    let animationFrameId: number;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed >= duration) {
        setCount(target);
      } else {
        const progress = elapsed / duration;
        // Ease out quadratic
        const easeProgress = progress * (2 - progress);
        setCount(Math.floor(easeProgress * target));
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, trigger]);

  return count;
}
