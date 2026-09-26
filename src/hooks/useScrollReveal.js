import { useEffect, useRef } from 'react';

/**
 * Custom hook that uses IntersectionObserver to add/remove
 * 'is-visible' class on a referenced element.
 * Supports both scroll-down and scroll-up triggers.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
        } else {
          // Reverse scroll: remove class so it re-animates
          el.classList.remove('is-visible');
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}
