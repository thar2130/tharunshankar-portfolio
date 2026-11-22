import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_CONTENT } from '../data/content';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [phaseText, setPhaseText] = useState('BOOTSTRAPPING KERNEL...');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const curtainTopRef = useRef<HTMLDivElement | null>(null);
  const curtainBottomRef = useRef<HTMLDivElement | null>(null);
  const textMaskRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const phases = [
      { at: 15, text: 'LOADING SYSTEM RUNTIME...' },
      { at: 35, text: 'MOUNTING THREE.JS PARTICLES...' },
      { at: 60, text: 'PRE-COMPUTING GSAP TIMELINES...' },
      { at: 85, text: 'ESTABLISHING DISTRIBUTED MESH...' },
      { at: 100, text: 'SYSTEM READY // WELCOME' }
    ];

    const counterObj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Exit curtain wipe
        const exitTl = gsap.timeline({
          onComplete: () => {
            onComplete();
          }
        });

        exitTl.to(textMaskRef.current, {
          y: -40,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in'
        });

        exitTl.to([curtainTopRef.current, curtainBottomRef.current], {
          scaleY: 0,
          duration: 0.85,
          ease: 'expo.inOut',
          stagger: 0.08
        }, '-=0.2');

        exitTl.to(containerRef.current, {
          display: 'none',
          duration: 0.1
        });
      }
    });

    tl.to(counterObj, {
      value: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        setCount(val);
        const currentPhase = phases.find((p) => val <= p.at);
        if (currentPhase) {
          setPhaseText(currentPhase.text);
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col justify-between overflow-hidden select-none"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Top curtain */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-dark-bg origin-top border-b border-dark-border/40 z-10"
      />

      {/* Bottom curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-dark-bg origin-bottom border-t border-dark-border/40 z-10"
      />

      {/* Foreground loader content */}
      <div
        ref={textMaskRef}
        className="relative z-20 w-full h-full flex flex-col justify-between p-8 md:p-14"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-electric-lime animate-ping" />
            <span className="font-mono text-xs tracking-widest text-typography-muted uppercase">
              PORTFOLIO // v2.6
            </span>
          </div>
          <span className="font-mono text-xs text-electric-lime tracking-widest">
            {PORTFOLIO_CONTENT.personal.status.location.toUpperCase()}
          </span>
        </div>

        {/* Center Kinetic Counter & Name */}
        <div className="flex flex-col items-center justify-center my-auto text-center">
          <div className="overflow-hidden mb-2">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase">
              {PORTFOLIO_CONTENT.personal.name}
            </h1>
          </div>

          <div className="flex items-baseline gap-2 font-mono text-electric-lime my-3">
            <span className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter">
              {count.toString().padStart(3, '0')}
            </span>
            <span className="text-2xl sm:text-3xl font-semibold opacity-75">%</span>
          </div>

          <p className="font-mono text-xs sm:text-sm text-typography-muted tracking-widest uppercase h-6">
            {phaseText}
          </p>

          {/* Progress track */}
          <div className="w-48 sm:w-72 h-[2px] bg-dark-border/80 mt-6 relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-electric-lime transition-all duration-75"
              style={{ width: `${count}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-typography-muted">
          <span>{PORTFOLIO_CONTENT.personal.title}</span>
          <span>INITIALIZING SCROLLTIMELINE & LENIS</span>
        </div>
      </div>
    </div>
  );
};
