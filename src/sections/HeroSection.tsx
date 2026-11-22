import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_CONTENT } from '../data/content';
import { ThreeHeroCanvas } from '../components/ThreeHeroCanvas';
import { useMousePosition } from '../hooks/useMousePosition';
import { MagneticButton } from '../components/MagneticButton';
import { ArrowDown, Download, Sparkles, Terminal, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onShowToast: (title: string, message?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShowToast }) => {
  const mousePosition = useMousePosition();
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const roleIndexRef = useRef(0);
  const [currentRole, setCurrentRole] = useState(PORTFOLIO_CONTENT.personal.rotatingRoles[0]);

  // Letter by letter animation
  const nameLetters = PORTFOLIO_CONTENT.personal.headline.split('');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 1. Staggered 3D rotateX letter reveal
    const letters = headlineRef.current?.querySelectorAll('.hero-letter');
    if (letters && letters.length > 0) {
      gsap.fromTo(
        letters,
        {
          rotateX: -100,
          opacity: 0,
          y: 60,
          transformOrigin: 'bottom center'
        },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.035,
          delay: 0.2
        }
      );
    }

    // 2. Cycling role text interval
    const roleInterval = setInterval(() => {
      roleIndexRef.current = (roleIndexRef.current + 1) % PORTFOLIO_CONTENT.personal.rotatingRoles.length;
      setCurrentRole(PORTFOLIO_CONTENT.personal.rotatingRoles[roleIndexRef.current]);
    }, 2800);

    return () => {
      clearInterval(roleInterval);
    };
  }, []);

  const handleResumeClick = () => {
    confetti({
      particleCount: 70,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#C6FF3D', '#7C5CFF', '#FFFFFF']
    });
    onShowToast('Resume Download Triggered', 'Opening Tharunshankar_S_Resume.pdf');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 md:px-16 overflow-hidden bg-dark-bg"
    >
      {/* 3D Background Canvas */}
      <ThreeHeroCanvas mousePosition={mousePosition} />

      {/* Subtle radial ambient gradients */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-electric-lime/8 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/3 right-10 w-[450px] h-[450px] bg-electric-violet/10 rounded-full blur-[150px] pointer-events-none"
      />

      {/* Top Meta Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pt-4">
        {/* Terminal status pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dark-surface/90 border border-dark-border text-xs font-mono backdrop-blur-md">
          <Terminal size={14} className="text-electric-lime" />
          <span className="text-typography-muted">STATUS:</span>
          <span className="text-white font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-electric-lime animate-pulse" />
            {PORTFOLIO_CONTENT.personal.status.text}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 font-mono text-xs text-typography-muted">
          <span>// CLAUDE CERTIFIED DEVELOPER</span>
          <span className="text-electric-lime font-bold">•</span>
          <span>B.E. COMPUTER SCIENCE</span>
        </div>
      </div>

      {/* Center Kinetic Typography & Identity */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
        {/* Monogram tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-electric-lime uppercase tracking-widest mb-4">
          <Sparkles size={14} />
          <span>FULL-STACK SOFTWARE ENGINEER // DISTRIBUTED SYSTEMS</span>
        </div>

        {/* Giant Animated Name - Strictly Single Line */}
        <h1
          ref={headlineRef}
          className="font-display font-extrabold text-[clamp(1.65rem,5.8vw,7.2rem)] whitespace-nowrap text-white uppercase select-none tracking-tight perspective-text w-full overflow-visible"
          aria-label={PORTFOLIO_CONTENT.personal.name}
        >
          {nameLetters.map((char, index) => (
            <span key={index} className="letter-mask">
              <span className="hero-letter letter-inner inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            </span>
          ))}
        </h1>

        {/* Dynamic cycling role subtitle */}
        <div className="mt-6 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-electric-lime hidden sm:inline-block" />
          <div className="overflow-hidden h-9 flex items-center">
            <p
              key={currentRole}
              className="font-mono text-base sm:text-xl md:text-2xl text-typography-light font-medium tracking-wide animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {currentRole}
            </p>
          </div>
        </div>

        {/* Bio summary paragraph */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-typography-dim leading-relaxed font-sans">
          {PORTFOLIO_CONTENT.personal.shortBio}
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            onClick={() => {
              const worksSection = document.getElementById('projects');
              worksSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3.5 rounded-full bg-electric-lime text-black font-mono text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-xl group"
            data-cursor="view"
          >
            <span>Explore Selected Work</span>
            <ArrowDown size={15} className="group-hover:translate-y-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            onClick={handleResumeClick}
            className="px-6 py-3.5 rounded-full bg-dark-card border border-dark-border hover:border-electric-lime/60 text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg group"
            data-cursor="hover"
          >
            <a
              href={PORTFOLIO_CONTENT.personal.resumePath}
              download="Tharunshankar_S_Resume.pdf"
              className="flex items-center gap-2"
            >
              <Download size={15} className="text-electric-lime group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </a>
          </MagneticButton>

          <MagneticButton
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-full bg-dark-card/60 border border-dark-border/60 hover:border-electric-violet/80 text-typography-dim hover:text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
            data-cursor="hover"
          >
            <span className="flex items-center gap-2">
              <Mail size={15} className="text-electric-violet" />
              <span>Contact</span>
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom Scroll Hint & Metrics Preview */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-dark-border/60 pt-6">
        <div className="flex items-center gap-2 text-xs font-mono text-typography-muted">
          <span className="w-2 h-2 rounded-full bg-electric-lime" />
          <span>SCROLL TO ENTER TIMELINE</span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-typography-dim">
          <span>// 50+ TXNS/MIN</span>
          <span>// 1,000+ SIMULATED/DAY</span>
          <span>// 30% FASTER FLOW</span>
        </div>

        <div className="animate-bounce">
          <ArrowDown size={16} className="text-electric-lime" />
        </div>
      </div>
    </section>
  );
};
