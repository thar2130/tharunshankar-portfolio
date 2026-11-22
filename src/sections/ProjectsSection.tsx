import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_CONTENT, ProjectItem } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  onShowToast: (title: string, message?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onShowToast }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = containerRef.current?.querySelectorAll('.project-stack-card');
    if (!cards || cards.length < 2) return;

    // Sticky scaling stacking effect
    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Last card doesn't need to scale down for a next card

      gsap.to(card, {
        scale: 0.9,
        opacity: 0.5,
        filter: 'blur(3px)',
        ease: 'none',
        scrollTrigger: {
          trigger: cards[index + 1],
          start: 'top 80%',
          end: 'top 20%',
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger && (st.vars.trigger as HTMLElement).classList?.contains('project-stack-card')) {
          st.kill();
        }
      });
    };
  }, []);

  const handleOpenModal = (project: ProjectItem) => {
    setSelectedProject(project);
    onShowToast('Specification Opened', `${project.title} Architectural Blueprint`);
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-dark-bg py-24 sm:py-32 border-t border-dark-border/40"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mb-16">
        <SectionHeading
          number={PORTFOLIO_CONTENT.projects.sectionNumber}
          title={PORTFOLIO_CONTENT.projects.sectionTitle}
          heading={PORTFOLIO_CONTENT.projects.heading}
          subheading={PORTFOLIO_CONTENT.projects.subheading}
        />
      </div>

      {/* Stacked Sticky Project Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-24">
        {PORTFOLIO_CONTENT.projects.items.map((project, idx) => (
          <div
            key={project.id}
            data-cursor="view"
            className="project-stack-card sticky top-24 rounded-[2.5rem] bg-dark-card border border-dark-border/90 p-8 sm:p-12 lg:p-16 shadow-2xl transition-all duration-300 overflow-hidden will-change-transform"
            style={{
              boxShadow: `0 25px 60px -20px ${
                idx === 0 ? 'rgba(198, 255, 61, 0.12)' : 'rgba(124, 92, 255, 0.12)'
              }`
            }}
          >
            {/* Ambient Background Gradient */}
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
              style={{ backgroundColor: project.accentColor }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Details & Impact */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Category & Index Header */}
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider mb-4">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="text-typography-muted">PROJECT // 0{idx + 1}</span>
                    <span className="text-dark-border">•</span>
                    <span className="text-white font-semibold">{project.category}</span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-mono text-sm sm:text-base text-electric-lime">
                    {project.tagline}
                  </p>

                  {/* 2-Line Highlight Impact Statement Callout */}
                  <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-dark-surface/90 border-l-4 border-electric-lime text-typography-light text-sm sm:text-base font-sans font-medium leading-relaxed">
                    {project.impactStatement}
                  </div>

                  {/* Description */}
                  <p className="mt-6 text-sm text-typography-dim leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Key Architecture Highlights */}
                  <div className="mt-6 space-y-2.5">
                    {project.architectureHighlights.map((arch, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs font-mono text-typography-light">
                        <CheckCircle2
                          size={14}
                          className="shrink-0 mt-0.5"
                          style={{ color: project.accentColor }}
                        />
                        <span>{arch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="mt-8 pt-6 border-t border-dark-border grid grid-cols-3 gap-4">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex flex-col">
                      <span className="font-mono text-lg sm:text-2xl font-bold text-white">
                        {metric.value}
                      </span>
                      <span className="font-mono text-[10px] text-typography-muted uppercase tracking-wider mt-1">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stack Chips & Actions */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full bg-dark-surface border border-dark-border text-xs font-mono text-typography-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5"
                      data-cursor="hover"
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Abstract Kinetic Visual (SVG / Telemetry Graphic) */}
              <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] rounded-3xl bg-dark-surface/80 border border-dark-border/80 overflow-hidden p-6 flex flex-col justify-between group">
                {/* Visual Header */}
                <div className="flex items-center justify-between z-10 font-mono text-[11px] text-typography-muted">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: project.accentColor }} />
                    TELEMETRY FEED
                  </span>
                  <span>LIVE 60FPS</span>
                </div>

                {/* Center Animated Abstract Graphics */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {idx === 0 ? (
                    /* Tapay: Distributed IoT Waveform & Encryption Grid */
                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                      <svg
                        viewBox="0 0 300 160"
                        className="w-full h-44 overflow-visible"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Grid lines */}
                        <line x1="0" y1="40" x2="300" y2="40" stroke="#23232A" strokeDasharray="3 3" />
                        <line x1="0" y1="80" x2="300" y2="80" stroke="#23232A" strokeDasharray="3 3" />
                        <line x1="0" y1="120" x2="300" y2="120" stroke="#23232A" strokeDasharray="3 3" />

                        {/* Oscilloscope Pulse Waveform */}
                        <path
                          d="M0 80 Q 30 80, 50 80 L 70 20 L 90 140 L 110 50 L 130 95 L 150 80 L 180 80 L 195 40 L 210 110 L 225 80 L 300 80"
                          stroke="#C6FF3D"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="drop-shadow-[0_0_12px_rgba(198,255,61,0.6)]"
                        />

                        {/* Pulse Dot */}
                        <circle cx="110" cy="50" r="4" fill="#FFFFFF" />
                        <circle cx="195" cy="40" r="4" fill="#C6FF3D" />
                      </svg>

                      <div className="w-full px-4 py-2 mt-2 bg-dark-bg/80 border border-dark-border rounded-xl font-mono text-[11px] flex items-center justify-between text-typography-muted">
                        <span>THROUGHPUT: 50+ TXNS/MIN</span>
                        <span className="text-electric-lime">ENCRYPTED // AES-256</span>
                      </div>
                    </div>
                  ) : (
                    /* Smart Ticketing: Database Query Latency & Relational Graph */
                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                      <svg
                        viewBox="0 0 300 160"
                        className="w-full h-44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Database Query Histogram Bars */}
                        <rect x="25" y="85" width="22" height="55" rx="4" fill="#23232A" />
                        <rect x="65" y="60" width="22" height="80" rx="4" fill="#2E2E38" />
                        <rect x="105" y="40" width="22" height="100" rx="4" fill="#7C5CFF" opacity="0.6" />
                        <rect x="145" y="25" width="22" height="115" rx="4" fill="#C6FF3D" />
                        <rect x="185" y="55" width="22" height="85" rx="4" fill="#7C5CFF" opacity="0.8" />
                        <rect x="225" y="70" width="22" height="70" rx="4" fill="#2E2E38" />

                        {/* Latency line curve */}
                        <path
                          d="M36 85 C 75 55, 115 35, 156 25 C 195 35, 236 65, 270 70"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      </svg>

                      <div className="w-full px-4 py-2 mt-2 bg-dark-bg/80 border border-dark-border rounded-xl font-mono text-[11px] flex items-center justify-between text-typography-muted">
                        <span>POSTGRESQL QUERY LATENCY</span>
                        <span className="text-electric-lime">-20% OPTIMIZED</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual Footer */}
                <div className="flex items-center justify-between z-10 font-mono text-[10px] text-typography-muted border-t border-dark-border/60 pt-2">
                  <span>HARDWARE // CLOUD INTEGRATION</span>
                  <span className="text-white">STATUS: NOMINAL</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dive Architecture Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[9990] bg-dark-bg/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-2xl bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <div>
                <span className="font-mono text-xs text-electric-lime uppercase">
                  {selectedProject.category}
                </span>
                <h4 className="font-display font-extrabold text-2xl text-white mt-1">
                  {selectedProject.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center text-typography-muted hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-sm text-typography-light leading-relaxed font-sans">
                {selectedProject.description}
              </p>

              <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                <h5 className="font-mono text-xs font-semibold text-white uppercase mb-2">
                  Architectural Breakthroughs
                </h5>
                <ul className="space-y-2">
                  {selectedProject.architectureHighlights.map((h, i) => (
                    <li key={i} className="text-xs font-mono text-typography-dim flex items-start gap-2">
                      <span className="text-electric-lime">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-dark-surface/60 border border-dark-border text-center">
                    <span className="block font-mono text-lg font-bold text-electric-lime">
                      {m.value}
                    </span>
                    <span className="block font-mono text-[10px] text-typography-muted uppercase">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-dark-border flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-full bg-electric-lime text-black font-mono text-xs font-bold"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
