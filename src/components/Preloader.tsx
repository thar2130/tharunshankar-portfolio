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

  // Concentric HTML layer refs (guarantees 100% center alignment across all browsers)
  const outerRingRef = useRef<HTMLDivElement | null>(null);
  const innerRingRef = useRef<HTMLDivElement | null>(null);
  const monogramRef = useRef<HTMLDivElement | null>(null);
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
          scale: 1.12,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.45,
          ease: 'power3.in'
        });

        exitTl.to(
          [curtainTopRef.current, curtainBottomRef.current],
          {
            scaleY: 0,
            duration: 0.85,
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

    // 1. Initial State Setup
    gsap.set([monogramPath1.current, monogramPath2.current], {
      strokeDasharray: 240,
      strokeDashoffset: 240
    });

    // 2. Animated Sequence (~1.85s)
    // Animates HTML layer transforms - 100% centered with transform-origin: 50% 50%
    masterTl
      .fromTo(
        outerRingRef.current,
        { rotation: 0, scale: 0.85, opacity: 0 },
        {
          rotation: 360,
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: 'power2.out'
        }
      )
      .fromTo(
        innerRingRef.current,
        { rotation: 0, scale: 0.85, opacity: 0 },
        {
          rotation: -360,
          scale: 1,
          opacity: 0.85,
          duration: 1.3,
          ease: 'power2.out'
        },
        '<0.05'
      )
      .fromTo(
        monogramRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.8)'
        },
        '<0.1'
      )
      .to(
        [monogramPath1.current, monogramPath2.current],
        {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: 'power3.inOut',
          stagger: 0.12
        },
        '<0.15'
      )
      .fromTo(
        titleLettersRef.current?.querySelectorAll('.preload-char') || [],
        { y: 25, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.022,
          duration: 0.7,
          ease: 'back.out(1.6)'
        },
        '<0.25'
      )
      .to(
        '.preload-equalizer-bar',
        {
          scaleY: 'random(0.3, 1.8)',
          repeat: 3,
          yoyo: true,
          duration: 0.22,
          stagger: 0.04,
          ease: 'sine.inOut'
        },
        '<0.2'
      )
      .to(centerContentRef.current, {
        scale: 1.04,
        duration: 0.35,
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
        {/* Concentric Double Circle Emblem (100% Mathematically Locked to Center) */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-8">
          {/* Ambient Core Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-electric-lime/20 rounded-full blur-2xl animate-pulse"
          />

          {/* 1. Outer Rotating Orbital Ring */}
          <div
            ref={outerRingRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
              <circle
                cx="80"
                cy="80"
                r="72"
                stroke="#C6FF3D"
                strokeWidth="2"
                strokeDasharray="16 10"
                strokeOpacity="0.85"
              />
              {/* Synchronized Orbiting Nodes on Outer Ring */}
              <circle cx="80" cy="8" r="4.5" fill="#C6FF3D" />
              <circle cx="80" cy="152" r="3.5" fill="#38BDF8" />
              <circle cx="8" cy="80" r="3" fill="#C6FF3D" opacity="0.6" />
              <circle cx="152" cy="80" r="3" fill="#C6FF3D" opacity="0.6" />
            </svg>
          </div>

          {/* 2. Inner Counter-Rotating Ring (Concentric Inset) */}
          <div
            ref={innerRingRef}
            className="absolute inset-3 sm:inset-4 flex items-center justify-center pointer-events-none"
          >
            <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="#7C5CFF"
                strokeWidth="1.8"
                strokeDasharray="10 8"
                strokeOpacity="0.8"
              />
              {/* Synchronized Orbiting Nodes on Inner Ring */}
              <circle cx="6" cy="60" r="3.5" fill="#7C5CFF" />
              <circle cx="114" cy="60" r="3.5" fill="#C6FF3D" />
              <circle cx="60" cy="6" r="2.5" fill="#38BDF8" />
              <circle cx="60" cy="114" r="2.5" fill="#7C5CFF" />
            </svg>
          </div>

          {/* 3. Center Monogram & Target (Pinned Dead-Center at 50% 50%) */}
          <div
            ref={monogramRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              {/* Center Target Dash Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/25" />

              {/* Symmetrical Vector TS Monogram */}
              <svg viewBox="0 0 80 80" className="w-14 h-14 sm:w-16 sm:h-16" fill="none">
                {/* T Monogram */}
                <path
                  ref={monogramPath1}
                  d="M 18 24 L 62 24 M 40 24 L 40 58"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* S Monogram */}
                <path
                  ref={monogramPath2}
                  d="M 58 33 C 58 26 50 26 40 26 C 28 26 25 33 25 40 C 25 52 55 50 55 61 C 55 70 47 71 37 71 C 25 71 22 64 22 59"
                  stroke="#C6FF3D"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
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
