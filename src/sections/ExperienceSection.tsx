import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_CONTENT } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { Calendar, MapPin, CheckCircle, ArrowRight, Zap, Code2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    if (prefersReducedMotion || !isDesktop) {
      return;
    }

    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    // Calculate how far to translate horizontally
    const scrollAmount = track.scrollWidth - window.innerWidth + 120;

    const horizontalTween = gsap.to(track, {
      x: -scrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${scrollAmount + 300}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    return () => {
      horizontalTween.kill();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-dark-bg border-t border-dark-border/40 overflow-hidden lg:min-h-screen lg:flex lg:flex-col lg:justify-start pt-24 pb-16 lg:pt-28 lg:pb-12"
    >
      {/* Top Banner on Desktop */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 mb-4 lg:mb-6">
        <SectionHeading
          number={PORTFOLIO_CONTENT.experience.sectionNumber}
          title={PORTFOLIO_CONTENT.experience.sectionTitle}
          heading={PORTFOLIO_CONTENT.experience.heading}
          subheading={PORTFOLIO_CONTENT.experience.subheading}
          className="mb-2 lg:mb-3"
        />
      </div>

      {/* Horizontal Scroll Track on Desktop / Vertical Stack on Mobile */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row items-stretch lg:items-center gap-8 px-6 sm:px-12 md:px-16 w-full lg:w-max will-change-transform"
      >
        {/* Intro Card */}
        <div className="w-full lg:w-[360px] shrink-0 p-6 sm:p-8 rounded-3xl bg-dark-surface/70 border border-dark-border flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-electric-lime/10 border border-electric-lime/30 flex items-center justify-center text-electric-lime mb-5">
              <Zap size={24} />
            </div>
            <span className="font-mono text-xs text-electric-lime uppercase tracking-widest">
              // PRODUCTION TRACK RECORD
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-2 leading-tight">
              Enterprise Scalability at UST
            </h3>
            <p className="mt-3 text-sm text-typography-dim leading-relaxed font-sans">
              From front-facing React performance to low-level EDI transaction exchanges between global banking and enterprise partners.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-dark-border font-mono text-xs text-typography-muted flex items-center justify-between">
            <span>2024 — PRESENT</span>
            <span className="text-electric-lime">2+ YEARS TOTAL</span>
          </div>
        </div>

        {/* Experience Item Cards */}
        {PORTFOLIO_CONTENT.experience.items.map((exp, index) => (
          <div
            key={exp.id}
            data-cursor="drag"
            className="w-full lg:w-[580px] shrink-0 p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border hover:border-electric-lime/40 transition-all duration-300 shadow-2xl flex flex-col justify-between relative group"
          >
            {/* Ambient Corner Glow */}
            <div
              className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-40 ${
                index === 0 ? 'bg-electric-lime' : 'bg-electric-violet'
              }`}
            />

            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-dark-surface border border-dark-border text-xs font-mono text-white font-semibold">
                    {exp.company}
                  </span>
                  {exp.current && (
                    <span className="px-2.5 py-0.5 rounded-full bg-electric-lime/15 border border-electric-lime/30 text-electric-lime text-[11px] font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-ping" />
                      CURRENT ROLE
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-typography-muted">
                  <Calendar size={13} className="text-electric-lime" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Role Title */}
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-electric-lime transition-colors">
                {exp.role}
              </h3>

              {/* Location & Type */}
              <div className="mt-2 flex items-center gap-4 text-xs font-mono text-typography-dim">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-typography-muted" />
                  {exp.location}
                </span>
                <span>•</span>
                <span>{exp.type}</span>
              </div>

              {/* Summary Highlight */}
              <div className="mt-6 p-4 rounded-xl bg-dark-surface/80 border-l-2 border-electric-lime text-sm text-typography-light font-sans leading-relaxed">
                {exp.highlight}
              </div>

              {/* Staggered Bullet Points */}
              <ul className="mt-6 space-y-3">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 text-sm text-typography-dim font-sans leading-relaxed">
                    <CheckCircle
                      size={16}
                      className="text-electric-lime shrink-0 mt-0.5"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Pills Footer */}
            <div className="mt-8 pt-6 border-t border-dark-border flex flex-wrap gap-2">
              {exp.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-1 rounded-md bg-dark-surface border border-dark-border text-[11px] font-mono text-typography-muted group-hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Future Impact Next Steps Card */}
        <div className="w-full lg:w-[360px] shrink-0 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-dark-card to-dark-surface border border-electric-lime/30 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-electric-lime/10 border border-electric-lime/30 flex items-center justify-center text-electric-lime mb-5">
              <Code2 size={24} />
            </div>
            <span className="font-mono text-xs text-electric-lime uppercase tracking-widest">
              // NEXT HORIZON
            </span>
            <h3 className="font-display font-bold text-2xl text-white mt-3">
              Ready to Accelerate Your Stack
            </h3>
            <p className="mt-4 text-sm text-typography-dim leading-relaxed font-sans">
              Eager to bring distributed systems discipline, TypeScript precision, and modern agentic AI speed to high-velocity product teams.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-dark-border">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-electric-lime hover:underline uppercase tracking-wider"
            >
              <span>Initiate Conversation</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
