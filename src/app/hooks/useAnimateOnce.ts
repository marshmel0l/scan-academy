/**
 * useAnimateOnce — triggers a section animation only the first time it enters
 * the viewport, even across page navigations (component remounts).
 *
 * Usage:
 *   const { ref, shown } = useAnimateOnce('my-section-id');
 *   <motion.div ref={ref} animate={shown ? 'show' : 'hidden'} variants={...}>
 */
import { useEffect, useRef, useState } from 'react';
import { hasAnimated, markAnimated } from '../utils/animationTracker';

export function useAnimateOnce(id: string, threshold = 0.2) {
  const alreadyDone = hasAnimated(id);
  const [shown, setShown] = useState(alreadyDone);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (alreadyDone) return; // already fired in a previous mount — skip
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markAnimated(id);
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, alreadyDone, threshold]);

  return { ref, shown };
}
