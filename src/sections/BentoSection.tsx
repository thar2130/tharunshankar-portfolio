import React, { useState, useRef } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { MagneticButton } from '../components/MagneticButton';
import {
  Github,
  Cpu,
  Sparkles,
  ArrowUpRight,
  Zap,
  Award,
  GraduationCap,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BentoSectionProps {
  onShowToast: (title: string, message?: string) => void;
}

export const BentoSection: React.FC<BentoSectionProps> = ({ onShowToast }) => {
  // Terminal Interactive State
  const [activeCommand, setActiveCommand] = useState<string>('whoami');

  // 3D Tilt state for certification card
  const [certTilt, setCertTilt] = useState({ x: 0, y: 0 });
  const certRef = useRef<HTMLDivElement | null>(null);

  const handleCertMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!certRef.current) return;
    const rect = certRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setCertTilt({ x: rotateX, y: rotateY });
  };

  const handleCertMouseLeave = () => {
    setCertTilt({ x: 0, y: 0 });
  };

  const handleGitHubClick = () => {
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#C6FF3D', '#7C5CFF', '#38BDF8']
    });
    onShowToast('Navigating to GitHub Works', 'Opening github.com/thar2130');
    window.open('https://github.com/thar2130', '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="bento"
      className="relative w-full bg-dark-bg py-24 sm:py-32 border-t border-dark-border/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-electric-lime/8 rounded-full blur-[150px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-electric-violet/10 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Heading (No serial numbers) */}
        <SectionHeading
          title="INTERACTIVE OVERVIEW"
          heading="Craft, Systems & AI Runtime"
          subheading="An interactive modular console exploring open-source repositories, agentic engineering, and modern architecture."
        />

        {/* Master Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
          
          {/* ============================================================== */}
          {/* CARD 1: ANIMATED GITHUB WORKS GATEWAY (Featured Card) */}
          {/* ============================================================== */}
          <div className="md:col-span-12 relative rounded-3xl p-8 sm:p-12 bg-dark-card border border-dark-border/80 hover:border-electric-lime/50 transition-all duration-300 shadow-2xl overflow-hidden group">
            {/* Animated Multi-Color Rotating Gradient Border */}
            <div
              aria-hidden="true"
              className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-electric-lime via-electric-violet to-electric-cyan opacity-25 group-hover:opacity-75 blur-md transition-opacity duration-500 pointer-events-none"
            />

            {/* Inner Content Container */}
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                {/* Header Tag */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-surface border border-electric-lime/40 text-electric-lime text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-electric-lime animate-ping" />
                    <span>CODEBASE SHOWCASE // REPOSITORIES</span>
                  </div>

                  <span className="font-mono text-xs text-typography-muted flex items-center gap-1.5">
                    <Github size={14} className="text-white" />
                    <span>github.com/thar2130</span>
                  </span>
                </div>

                {/* Animated Works Headline */}
                <h3 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.05]">
                  Want to Know <br />
                  <span className="text-electric-lime electric-glow">About My Works?</span>
                </h3>

                <p className="mt-4 text-base sm:text-lg text-typography-dim font-sans leading-relaxed">
                  Explore my complete open-source repositories, distributed microservices, TypeScript/React full-stack codebases, and autonomous AI tooling directly on GitHub.
                </p>

                {/* Animated Highlights Bar */}
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono text-typography-dim">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                    <Zap size={13} className="text-electric-lime" />
                    <span>Distributed Microservices</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                    <Cpu size={13} className="text-electric-violet" />
                    <span>TypeScript &amp; React 19</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                    <Sparkles size={13} className="text-electric-cyan" />
                    <span>Claude AI Systems</span>
                  </div>
                </div>
              </div>

              {/* Animated Magnetic GitHub Button */}
              <div className="shrink-0 flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
                <MagneticButton
                  onClick={handleGitHubClick}
                  data-cursor="view"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-electric-lime text-black font-mono text-sm font-bold tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 group/btn"
                >
                  <span className="flex items-center gap-2.5">
                    <Github size={18} className="group-hover/btn:rotate-12 transition-transform" />
                    <span>Explore GitHub Codebases</span>
                    <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </span>
                </MagneticButton>
                <span className="text-[11px] font-mono text-typography-muted">
                  LIVE REPOSITORIES // UPDATED CONTINUOUSLY
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 2: INTERACTIVE AI & CLAUDE SYSTEM TERMINAL */}
          {/* ============================================================== */}
          <div className="md:col-span-12 lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-dark-card border border-dark-border/90 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between pb-4 border-b border-dark-border/70 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-typography-muted">
                    bash - tharun@agentic: ~
                  </span>
                </div>
                <span className="font-mono text-[11px] text-electric-lime flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
                  TERMINAL ACTIVE
                </span>
              </div>

              {/* Clickable Quick Command Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-[11px] text-typography-muted mr-1 uppercase">EXECUTE:</span>
                {[
                  { id: 'whoami', label: '$ whoami' },
                  { id: 'claude', label: '$ claude.inspect()' },
                  { id: 'stack', label: '$ stack.audit()' },
                  { id: 'philosophy', label: '$ philosophy.run()' }
                ].map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => setActiveCommand(cmd.id)}
                    className={`px-3 py-1 rounded-md font-mono text-xs tracking-wider transition-all duration-200 ${
                      activeCommand === cmd.id
                        ? 'bg-electric-lime text-black font-bold shadow'
                        : 'bg-dark-surface border border-dark-border text-typography-dim hover:text-white hover:border-electric-lime/40'
                    }`}
                  >
                    {cmd.label}
                  </button>
                ))}
              </div>

              {/* Terminal Display Output Window */}
              <div className="p-4 sm:p-5 rounded-2xl bg-dark-bg/90 border border-dark-border/80 font-mono text-xs leading-relaxed min-h-[190px] overflow-x-auto text-typography-light">
                {activeCommand === 'whoami' && (
                  <div className="space-y-1.5">
                    <p className="text-electric-lime">&gt; whoami</p>
                    <p className="text-white font-bold">Tharunshankar S — Full-Stack Software Engineer</p>
                    <p className="text-typography-muted">Specialization: TypeScript · Node.js · React · Distributed Backends · Agentic AI</p>
                    <p className="text-typography-muted">GitHub: https://github.com/thar2130</p>
                    <p className="text-electric-cyan">Status: Available for High-Impact Product Teams &amp; Global Relocation</p>
                  </div>
                )}

                {activeCommand === 'claude' && (
                  <div className="space-y-1.5">
                    <p className="text-electric-lime">&gt; claude.inspect()</p>
                    <p className="text-electric-violet font-semibold">[CLAUDE CERTIFIED DEVELOPER] verified</p>
                    <p className="text-white">- System Design: Autonomous agent loops, tool calling, multi-agent pipelines</p>
                    <p className="text-white">- Engineering Velocity: AI-assisted rapid prototyping, architecture drafting</p>
                    <p className="text-typography-muted">- Rigor: Automated testing, code review standards, deterministic output validation</p>
                  </div>
                )}

                {activeCommand === 'stack' && (
                  <div className="space-y-1.5">
                    <p className="text-electric-lime">&gt; stack.audit()</p>
                    <p className="text-white">Languages: <span className="text-electric-lime">TypeScript, JavaScript (ESNext), Python, SQL</span></p>
                    <p className="text-white">Frontend: <span className="text-electric-lime">React 18/19, Tailwind CSS, GSAP, Framer Motion</span></p>
                    <p className="text-white">Backend: <span className="text-electric-lime">Node.js, Express, REST APIs, PostgreSQL, Flask</span></p>
                    <p className="text-typography-muted">Cloud &amp; CI/CD: AWS, Docker, GitHub Actions, Terraform</p>
                  </div>
                )}

                {activeCommand === 'philosophy' && (
                  <div className="space-y-1.5">
                    <p className="text-electric-lime">&gt; philosophy.run()</p>
                    <p className="text-electric-cyan font-bold">"Zero-Downtime Reliability meets High-Velocity AI."</p>
                    <p className="text-white">1. If it breaks at 2 AM, it is an architecture flaw, not bad luck.</p>
                    <p className="text-white">2. Prototyping should be at AI speed; production must be hardened by tests.</p>
                    <p className="text-typography-muted">3. From backend REST payloads to 60fps React interfaces—everything must feel cohesive.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dark-border/60 flex items-center justify-between text-[11px] font-mono text-typography-muted">
              <span>SHELL: INTERACTIVE v2.6</span>
              <span className="text-electric-lime">READY FOR PROD</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 3: CLAUDE CERTIFIED DEVELOPER 3D HOLOGRAPHIC BADGE */}
          {/* ============================================================== */}
          <div
            ref={certRef}
            onMouseMove={handleCertMouseMove}
            onMouseLeave={handleCertMouseLeave}
            className="md:col-span-12 lg:col-span-5 rounded-3xl p-8 bg-dark-card border border-electric-lime/40 hover:border-electric-lime transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden select-none perspective-text group"
            style={{
              transform: `perspective(800px) rotateX(${certTilt.x}deg) rotateY(${certTilt.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Holographic Sheen */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-20 hologram-sheen group-hover:opacity-35 transition-opacity"
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-electric-lime text-black">
                  CERTIFIED
                </span>
                <span className="font-mono text-xs text-electric-lime">ANTHROPIC // AI</span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-electric-lime/10 border border-electric-lime/30 flex items-center justify-center text-electric-lime mb-4">
                <Award size={26} />
              </div>

              <h4 className="font-display font-extrabold text-2xl text-white leading-tight">
                Claude Certified Developer
              </h4>
              <p className="font-mono text-xs text-electric-lime mt-1">
                Ecosystem Credential // Agentic AI Specialist
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {['Agentic Loops', 'Prompt Eng', 'Tool Calling', 'LLM Architectures'].map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded bg-dark-surface border border-dark-border text-[11px] font-mono text-typography-light"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Credential Footer */}
            <div className="mt-8 pt-5 border-t border-dark-border/80 flex items-start gap-3">
              <GraduationCap size={18} className="text-electric-lime shrink-0 mt-0.5" />
              <div className="text-xs font-sans text-typography-dim">
                <span className="text-white font-medium block">B.E. Computer Science</span>
                <span>Chennai Institute of Technology (2020–2024)</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 4: CORE ENGINEERING PHILOSOPHY & PILLARS */}
          {/* ============================================================== */}
          <div className="md:col-span-12 lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-dark-card border border-dark-border/90 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-electric-lime uppercase tracking-wider">
                  <ShieldCheck size={15} />
                  <span>CORE ENGINEERING PILLARS</span>
                </div>
                <span className="font-mono text-xs text-typography-muted">STANDARDS &amp; DISCIPLINE</span>
              </div>

              <h4 className="font-display font-extrabold text-2xl text-white">
                How I Design, Architect &amp; Build
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border hover:border-electric-lime/40 transition-colors">
                  <span className="font-display font-bold text-white text-sm block mb-1">
                    Zero-Downtime Reliability
                  </span>
                  <p className="text-xs text-typography-dim font-sans leading-relaxed">
                    Battle-tested backend patterns, atomic database transactions, and resilient distributed data pipelines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border hover:border-electric-cyan/40 transition-colors">
                  <span className="font-display font-bold text-white text-sm block mb-1">
                    AI-Accelerated Velocity
                  </span>
                  <p className="text-xs text-typography-dim font-sans leading-relaxed">
                    Harnessing Claude and agentic loops for lightning-fast prototyping while maintaining strict test suites.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border hover:border-electric-violet/40 transition-colors">
                  <span className="font-display font-bold text-white text-sm block mb-1">
                    60fps Frontend Motion
                  </span>
                  <p className="text-xs text-typography-dim font-sans leading-relaxed">
                    Cinematic, accessible, micro-interactive React applications that delight users without sacrificing performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between text-xs font-mono text-typography-muted">
              <span>AGILE REVIEW STANDARDS</span>
              <span className="text-electric-lime">HIGH OBSERVALITY</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 5: GLOBAL AVAILABILITY & RELOCATION BEACON */}
          {/* ============================================================== */}
          <div className="md:col-span-12 lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-dark-card via-dark-surface to-dark-card border border-dark-border/90 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-electric-lime/10 border border-electric-lime/30 flex items-center justify-center text-electric-lime mb-4">
                <MapPin size={20} />
              </div>

              <span className="font-mono text-xs text-electric-lime uppercase tracking-widest">
                LOCATION STATUS
              </span>

              <h4 className="font-display font-bold text-xl text-white mt-2">
                Open to Global Relocation
              </h4>
              <p className="mt-2 text-xs text-typography-dim leading-relaxed font-sans">
                Currently based in Trivandrum / Chennai, India. Actively exploring high-impact full-stack and distributed backend opportunities worldwide.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-dark-border/80">
              <div className="flex items-center gap-2 font-mono text-xs text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-electric-lime animate-ping" />
                <span>Available for Immediate Interview</span>
              </div>
              <a
                href="#contact"
                className="mt-3 block w-full py-2.5 text-center rounded-xl bg-dark-surface border border-dark-border hover:border-electric-lime text-xs font-mono text-white transition-colors"
              >
                Initiate Conversation ▹
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
