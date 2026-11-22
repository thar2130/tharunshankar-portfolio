import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_CONTENT } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { ShieldCheck, Cpu, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const [counterValues, setCounterValues] = useState<{ [key: string]: number }>({
    'stat-1': 0,
    'stat-2': 0,
    'stat-3': 0,
    'stat-4': 0,
    'stat-5': 0
  });

  const profileWords = PORTFOLIO_CONTENT.about.paragraph.split(' ');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    if (prefersReducedMotion) {
      // Show full text and end numbers directly
      const endValues: { [key: string]: number } = {};
      PORTFOLIO_CONTENT.about.stats.forEach((s) => {
        endValues[s.id] = s.value;
      });
      setCounterValues(endValues);
      return;
    }

    const words = textContainerRef.current?.querySelectorAll('.about-word');
    if (!words || words.length === 0) return;

    // Word by word scroll scrub reveal
    const scrubTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isDesktop ? 'top top' : 'top 70%',
        end: isDesktop ? '+=130%' : 'bottom 80%',
        pin: isDesktop,
        scrub: 0.8,
        anticipatePin: 1
      }
    });

    scrubTimeline.fromTo(
      words,
      {
        opacity: 0.18,
        color: '#52525B',
        y: 4
      },
      {
        opacity: 1,
        color: '#FFFFFF',
        y: 0,
        stagger: 0.04,
        ease: 'none'
      }
    );

    // Count-up stats timeline triggered when stats enter viewport
    const statCounters = {
      'stat-1': 0,
      'stat-2': 0,
      'stat-3': 0,
      'stat-4': 0,
      'stat-5': 0
    };

    const statsTrigger = ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(statCounters, {
          'stat-1': PORTFOLIO_CONTENT.about.stats[0].value,
          'stat-2': PORTFOLIO_CONTENT.about.stats[1].value,
          'stat-3': PORTFOLIO_CONTENT.about.stats[2].value,
          'stat-4': PORTFOLIO_CONTENT.about.stats[3].value,
          'stat-5': PORTFOLIO_CONTENT.about.stats[4].value,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => {
            setCounterValues({
              'stat-1': Math.floor(statCounters['stat-1']),
              'stat-2': Math.floor(statCounters['stat-2']),
              'stat-3': Math.floor(statCounters['stat-3']),
              'stat-4': Math.floor(statCounters['stat-4']),
              'stat-5': Math.floor(statCounters['stat-5'])
            });
          }
        });
      }
    });

    return () => {
      scrubTimeline.kill();
      statsTrigger.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-dark-bg py-24 px-6 sm:px-12 md:px-16 flex flex-col justify-center border-t border-dark-border/40"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <SectionHeading
          number={PORTFOLIO_CONTENT.about.sectionNumber}
          title={PORTFOLIO_CONTENT.about.sectionTitle}
          heading={PORTFOLIO_CONTENT.about.heading}
        />

        {/* Pinned Word-by-Word Scroll Reveal Paragraph */}
        <div
          ref={textContainerRef}
          className="relative max-w-5xl my-8 sm:my-14"
        >
          <div className="text-xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-sans font-semibold leading-[1.38] tracking-tight">
            {profileWords.map((word, idx) => (
              <span
                key={idx}
                className="about-word inline-block mr-2 sm:mr-3 transition-colors duration-100"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-14">
          {PORTFOLIO_CONTENT.about.keyPillars.map((pillar, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-dark-card border border-dark-border/80 hover:border-electric-lime/40 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-electric-lime/10 border border-electric-lime/20 flex items-center justify-center text-electric-lime mb-4 group-hover:scale-110 transition-transform">
                {index === 0 && <ShieldCheck size={20} />}
                {index === 1 && <Cpu size={20} />}
                {index === 2 && <Layers size={20} />}
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-electric-lime transition-colors">
                {pillar.title}
              </h3>
              <p className="text-sm text-typography-dim leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quantitative Count-up Stats Grid */}
        <div
          ref={statsRef}
          className="mt-14 pt-10 border-t border-dark-border grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8"
        >
          {PORTFOLIO_CONTENT.about.stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col p-4 rounded-xl bg-dark-surface/50 border border-dark-border/60 hover:border-electric-lime/30 transition-all duration-200"
            >
              <div className="flex items-baseline gap-1 font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                <span className="text-electric-lime">
                  {counterValues[stat.id] ?? 0}
                </span>
                <span className="text-xl sm:text-2xl text-typography-muted">
                  {stat.suffix}
                </span>
              </div>
              <span className="mt-2 text-xs sm:text-sm font-mono font-semibold text-white tracking-wide uppercase">
                {stat.label}
              </span>
              <span className="text-[11px] font-sans text-typography-muted mt-1 leading-tight">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
