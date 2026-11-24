import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_CONTENT } from '../data/content';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const curtainTopRef = useRef<HTMLDivElement | null>(null);
  const curtainBottomRef = useRef<HTMLDivElement | null>(null);
  const centerContentRef = useRef<HTMLDivElement | null>(null);
  const ring1Ref = useRef<SVGCircleElement | null>(null);
  const ring2Ref = useRef<SVGCircleElement | null>(null);
  const monogramPath1 = useRef<SVGPathElement | null>(null);
  const monogramPath2 = useRef<SVGPathElement | null>(null);
  const titleLettersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const masterTl = gsap.timeline({
      onComplete: () => {
        // Curtain wipe exit reveal
        const exitTl = gsap.timeline({
          onComplete: () => {
            onComplete();
          }
        });

        exitTl.to(centerContentRef.current, {
          scale: 1.15,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.5,
          ease: 'power3.in'
        });

        exitTl.to(
          [curtainTopRef.current, curtainBottomRef.current],
          {
            scaleY: 0,
            duration: 0.9,
            ease: 'expo.inOut',
            stagger: 0.08
          },
          '-=0.15'
        );

        exitTl.to(containerRef.current, {
          display: 'none',
          duration: 0.1
        });
      }
    });

    // 1. Initial State
    gsap.set([monogramPath1.current, monogramPath2.current], {
      strokeDasharray: 200,
      strokeDashoffset: 200
    });

    // 2. Animated Sequence (Duration ~1.9s)
    masterTl
      .fromTo(
        ring1Ref.current,
        { rotation: 0, scale: 0.8, opacity: 0 },
        { rotation: 360, scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out', transformOrigin: 'center' }
      )
      .fromTo(
        ring2Ref.current,
        { rotation: 0, scale: 1.2, opacity: 0 },
        { rotation: -360, scale: 1, opacity: 0.7, duration: 1.2, ease: 'power2.out', transformOrigin: 'center' },
        '<0.1'
      )
      .to(
        [monogramPath1.current, monogramPath2.current],
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'power3.inOut',
          stagger: 0.15
        },
        '<0.2'
      )
      .fromTo(
        titleLettersRef.current?.querySelectorAll('.preload-char') || [],
        { y: 30, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.025,
          duration: 0.7,
          ease: 'back.out(1.7)'
        },
        '<0.3'
      )
      .to('.preload-equalizer-bar', {
        scaleY: 'random(0.3, 1.8)',
        repeat: 3,
        yoyo: true,
        duration: 0.25,
        stagger: 0.05,
        ease: 'sine.inOut'
      }, '<0.2')
      .to(centerContentRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out'
      });

    return () => {
      masterTl.kill();
    };
  }, [onComplete]);

  const nameChars = PORTFOLIO_CONTENT.personal.headline.split('');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col justify-between overflow-hidden select-none bg-dark-bg"
      role="status"
      aria-label="Loading motion experience"
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

      {/* Center Cinematic Motion Mark (NO percentage numbers) */}
      <div
        ref={centerContentRef}
        className="relative z-20 w-full h-full flex flex-col items-center justify-center p-8 text-center my-auto"
      >
        {/* Animated Geometric Vector Emblem */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-8">
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-electric-lime/20 rounded-full blur-2xl animate-pulse"
          />

          <svg
            viewBox="0 0 120 120"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Rotating Dashed Ring */}
            <circle
              ref={ring1Ref}
              cx="60"
              cy="60"
              r="52"
              stroke="#C6FF3D"
              strokeWidth="1.5"
              strokeDasharray="12 8"
              strokeOpacity="0.8"
            />

            {/* Inner Counter-Rotating Ring */}
            <circle
              ref={ring2Ref}
              cx="60"
              cy="60"
              r="44"
              stroke="#7C5CFF"
              strokeWidth="1"
              strokeDasharray="6 6"
              strokeOpacity="0.6"
            />

            {/* Glowing Accent Dots */}
            <circle cx="60" cy="8" r="3" fill="#C6FF3D" />
            <circle cx="60" cy="112" r="2.5" fill="#38BDF8" />

            {/* Vector T & S Monogram Line Draw */}
            {/* T Bar */}
            <path
              ref={monogramPath1}
              d="M 38 46 L 82 46 M 60 46 L 60 84"
              stroke="#F4F4F6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interlocking S Curve */}
            <path
              ref={monogramPath2}
              d="M 76 56 C 76 50 68 48 60 48 C 50 48 48 54 48 58 C 48 68 76 67 76 76 C 76 84 68 85 58 85 C 48 85 46 80 46 76"
              stroke="#C6FF3D"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Animated Letter-by-Letter Typography */}
        <div
          ref={titleLettersRef}
          className="overflow-hidden flex flex-wrap items-center justify-center font-display font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-widest text-white uppercase select-none perspective-text"
        >
          {nameChars.map((char, idx) => (
            <span
              key={idx}
              className="preload-char inline-block"
              style={{ transformOrigin: 'bottom center' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Audio Reactive Waveform Equalizer Line */}
        <div className="flex items-center gap-1.5 h-6 my-6">
          {[4, 8, 14, 18, 12, 16, 22, 15, 9, 13, 20, 10, 6].map((h, i) => (
            <div
              key={i}
              className="preload-equalizer-bar w-1 rounded-full bg-electric-lime"
              style={{ height: `${h}px`, opacity: 0.75 }}
            />
          ))}
        </div>

        {/* Subtitle Badge */}
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-typography-muted uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
          <span>FULL-STACK &amp; AGENTIC AI ARCHITECT</span>
        </div>
      </div>
    </div>
  );
};
