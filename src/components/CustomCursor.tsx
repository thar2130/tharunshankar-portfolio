import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export interface CursorState {
  text: string;
  variant: 'default' | 'hover' | 'drag' | 'view' | 'copy' | 'hidden';
}

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    text: '',
    variant: 'default'
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Detect touch device or reduced motion
    const touchCheck = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Use gsap quickTo for optimal 60fps tracking
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });

    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for data-cursor attributes
    const handleElementHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        const cursorType = target.getAttribute('data-cursor') || 'hover';
        const cursorText = target.getAttribute('data-cursor-text') || '';

        setCursorState({
          variant: cursorType as CursorState['variant'],
          text: cursorText || (cursorType === 'view' ? 'VIEW' : cursorType === 'drag' ? 'DRAG' : cursorType === 'copy' ? 'COPY' : '')
        });
      } else {
        const isClickable = (e.target as HTMLElement).closest('a, button, input, [role="button"]');
        if (isClickable) {
          setCursorState({ variant: 'hover', text: '' });
        } else {
          setCursorState({ variant: 'default', text: '' });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  const isExpanded = cursorState.variant === 'view' || cursorState.variant === 'drag' || cursorState.variant === 'copy';
  const isHovered = cursorState.variant === 'hover';

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200 pointer-events-none ${
          isExpanded
            ? 'w-0 h-0 opacity-0'
            : isHovered
            ? 'w-2 h-2 bg-electric-lime'
            : 'w-2 h-2 bg-white'
        }`}
      />

      {/* Lagging Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none flex items-center justify-center transition-all duration-300 ${
          isExpanded
            ? 'w-24 h-24 bg-electric-lime/90 text-black border border-electric-lime backdrop-blur-sm'
            : isHovered
            ? 'w-14 h-14 bg-electric-lime/15 border-2 border-electric-lime'
            : 'w-9 h-9 border border-white/40'
        }`}
      >
        {isExpanded && (
          <span
            ref={textRef}
            className="font-mono text-[11px] font-bold tracking-widest uppercase select-none text-black"
          >
            {cursorState.text}
          </span>
        )}
      </div>
    </div>
  );
};
