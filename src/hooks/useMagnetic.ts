import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface UseMagneticOptions {
  strength?: number;
  textStrength?: number;
  ease?: string;
  duration?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(options: UseMagneticOptions = {}) {
  const ref = useRef<T | null>(null);
  const textRef = useRef<HTMLElement | null>(null);

  const {
    strength = 0.35,
    textStrength = 0.2,
    ease = 'power2.out',
    duration = 0.4
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check touch device or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration,
        ease,
        overwrite: 'auto'
      });

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: deltaX * textStrength,
          y: deltaY * textStrength,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto'
      });

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto'
        });
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, textStrength, ease, duration]);

  return { ref, textRef };
}
