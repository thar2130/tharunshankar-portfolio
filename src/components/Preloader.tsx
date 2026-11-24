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

  // Group refs for concentric orbital rings
  const outerRingGroupRef = useRef<SVGGElement | null>(null);
  const innerRingGroupRef = useRef<SVGGElement | null>(null);
  const coreMonogramGroupRef = useRef<SVGGElement | null>(null);
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

    // 2. Animated Sequence (Duration ~1.85s)
    // Both rings scale smoothly together from 0.85 to 1.0 around the EXACT same SVG origin (60, 60)
    masterTl
      .fromTo(
        outerRingGroupRef.current,
        { rotation: 0, scale: 0.85, opacity: 0 },
        {
          rotation: 360,
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: 'power2.out',
          svgOrigin: '60 60',
          transformOrigin: '60px 60px'
        }
      )
      .fromTo(
        innerRingGroupRef.current,
        { rotation: 0, scale: 0.85, opacity: 0 },
        {
          rotation: -360,
          scale: 1,
          opacity: 0.85,
          duration: 1.3,
          ease: 'power2.out',
          svgOrigin: '60 60',
          transformOrigin: '60px 60px'
        },
        '<0.05'
      )
      .fromTo(
        coreMonogramGroupRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.8)',
          svgOrigin: '60 60',
          transformOrigin: '60px 60px'
        },
        '<0.1'
      )
      .to(
        [monogramPath1.current, monogramPath2.current],
        {
          strokeDashoffset: 0,
          duration: 0.9,
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
        {/* Animated Concentric Vector Emblem (Mathematically Centered at 60, 60) */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-8">
          {/* Ambient Radial Core Glow */}
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
            {/* Outer Orbital Ring Group (Radius: 50, Center: 60,60) */}
            <g
              ref={outerRingGroupRef}
              style={{ transformOrigin: '60px 60px' }}
            >
              {/* Outer Dashed Ring */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#C6FF3D"
                strokeWidth="1.8"
                strokeDasharray="14 8"
                strokeOpacity="0.85"
              />
              {/* Synchronized Orbiting Nodes on the Outer Ring */}
              <circle cx="60" cy="10" r="3.5" fill="#C6FF3D" />
              <circle cx="60" cy="110" r="2.5" fill="#38BDF8" />
              <circle cx="10" cy="60" r="2" fill="#C6FF3D" opacity="0.6" />
              <circle cx="110" cy="60" r="2" fill="#C6FF3D" opacity="0.6" />
            </g>

            {/* Inner Counter-Rotating Ring Group (Radius: 38, Center: 60,60) */}
            <g
              ref={innerRingGroupRef}
              style={{ transformOrigin: '60px 60px' }}
            >
              {/* Inner Dashed Ring */}
              <circle
                cx="60"
                cy="60"
                r="38"
                stroke="#7C5CFF"
                strokeWidth="1.5"
                strokeDasharray="8 6"
                strokeOpacity="0.75"
              />
              {/* Synchronized Orbiting Nodes on the Inner Ring */}
              <circle cx="22" cy="60" r="2.8" fill="#7C5CFF" />
              <circle cx="98" cy="60" r="2.8" fill="#C6FF3D" />
              <circle cx="60" cy="22" r="1.8" fill="#38BDF8" opacity="0.8" />
              <circle cx="60" cy="98" r="1.8" fill="#7C5CFF" opacity="0.8" />
            </g>

            {/* Center Monogram Core Group (Optically Centered at 60, 60) */}
            <g
              ref={coreMonogramGroupRef}
              style={{ transformOrigin: '60px 60px' }}
            >
              {/* Subtle Center Target Ring */}
              <circle
                cx="60"
                cy="60"
                r="26"
                stroke="#FFFFFF"
                strokeWidth="0.75"
                strokeDasharray="3 3"
                strokeOpacity="0.25"
              />

              {/* T Monogram Vector: Top Crossbar + Stem */}
              <path
                ref={monogramPath1}
                d="M 42 47 L 78 47 M 60 47 L 60 75"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* S Monogram Vector: Fluid Intertwining Cyber Curve */}
              <path
                ref={monogramPath2}
                d="M 74 54 C 74 49 68 49 60 49 C 50 49 48 54 48 59 C 48 68 72 67 72 75 C 72 82 66 83 58 83 C 48 83 46 78 46 74"
                stroke="#C6FF3D"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
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
