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
  Play,
  Code2,
  HardDrive
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BentoSectionProps {
  onShowToast: (title: string, message?: string) => void;
}

export const BentoSection: React.FC<BentoSectionProps> = ({ onShowToast }) => {
  // Terminal Interactive State
  const [activeCommand, setActiveCommand] = useState<string>('whoami');
  const [simulatedPackets, setSimulatedPackets] = useState<number>(54);
  const [isPulsing, setIsPulsing] = useState<boolean>(false);

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

  // Simulate Fare / Sensor Transaction
  const handleTriggerTelemetry = () => {
    setIsPulsing(true);
    setSimulatedPackets((prev) => prev + 1);
    confetti({
      particleCount: 35,
      spread: 45,
      origin: { y: 0.6 },
      colors: ['#C6FF3D', '#7C5CFF', '#FFFFFF']
    });
    onShowToast('Simulated IoT Packet Dispatched', 'Arduino ➔ PySerial ➔ REST API ➔ PostgreSQL (12ms)');
    setTimeout(() => setIsPulsing(false), 1200);
  };

  const handleGitHubClick = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#C6FF3D', '#7C5CFF', '#38BDF8']
    });
    onShowToast('Navigating to GitHub Works', 'Opening github.com/tharunshankar');
  };

  return (
    <section
      id="bento"
      className="relative w-full bg-dark-bg py-24 sm:py-32 border-t border-dark-border/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-electric-lime/6 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-electric-violet/8 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Heading (No serial numbers) */}
        <SectionHeading
          title="INTERACTIVE OVERVIEW"
          heading="Craft, Systems & AI Runtime"
          subheading="An interactive modular console exploring real-time telemetry, agentic engineering, and enterprise architecture."
        />

        {/* Master Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
          
          {/* ============================================================== */}
          {/* CARD 1: ANIMATED GITHUB WORKS GATEWAY (The Main Featured Showcase) */}
          {/* ============================================================== */}
          <div className="md:col-span-12 lg:col-span-8 relative rounded-3xl p-8 sm:p-10 bg-dark-card border border-dark-border/80 hover:border-electric-lime/50 transition-all duration-300 shadow-2xl overflow-hidden group flex flex-col justify-between">
            {/* Animated Rotating Gradient Glow Border */}
            <div
              aria-hidden="true"
              className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-electric-lime via-electric-violet to-electric-cyan opacity-20 group-hover:opacity-60 blur-sm transition-opacity duration-500 pointer-events-none"
            />

            {/* Inner Content Container */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                {/* Header Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-dark-surface border border-electric-lime/30 text-electric-lime text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-electric-lime animate-ping" />
                    <span>CODEBASE SHOWCASE // REPOSITORIES</span>
                  </div>

                  <span className="font-mono text-xs text-typography-muted flex items-center gap-1.5">
                    <Github size={14} className="text-white" />
                    <span>github.com/tharunshankar</span>
                  </span>
                </div>

                {/* Animated Works Headline */}
                <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.05]">
                  Want to Know <br />
                  <span className="text-electric-lime electric-glow">About My Works?</span>
                </h3>

                <p className="mt-4 text-base sm:text-lg text-typography-dim font-sans max-w-2xl leading-relaxed">
                  Dive into my production repositories, distributed IoT firmware, real-time fare processing engines, and agentic AI tools directly on GitHub.
                </p>
              </div>

              {/* Interactive Features & Callout Bar */}
              <div className="mt-8 pt-6 border-t border-dark-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-typography-dim">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                    <Zap size={13} className="text-electric-lime" />
                    <span>Real-Time Engines</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                    <Cpu size={13} className="text-electric-violet" />
                    <span>Distributed Microservices</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                    <Sparkles size={13} className="text-electric-cyan" />
                    <span>Claude AI Systems</span>
                  </div>
                </div>

                {/* Animated Magnetic GitHub Button */}
                <MagneticButton
                  onClick={handleGitHubClick}
                  data-cursor="view"
                  className="px-6 py-3.5 rounded-full bg-electric-lime text-black font-mono text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-xl flex items-center gap-2 group/btn shrink-0"
                >
                  <a
                    href="https://github.com/tharunshankar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github size={16} />
                    <span>Explore GitHub Codebases</span>
                    <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 2: CLAUDE CERTIFIED DEVELOPER 3D HOLOGRAPHIC BADGE */}
          {/* ============================================================== */}
          <div
            ref={certRef}
            onMouseMove={handleCertMouseMove}
            onMouseLeave={handleCertMouseLeave}
            className="md:col-span-12 lg:col-span-4 rounded-3xl p-8 bg-dark-card border border-electric-lime/40 hover:border-electric-lime transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden select-none perspective-text group"
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
          {/* CARD 3: INTERACTIVE AI & CLAUDE SYSTEM TERMINAL */}
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
                  { id: 'telemetry', label: '$ telemetry.live()' },
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
                    <p className="text-typography-muted">Enterprise Track: EDI Integration Developer @ UST (Trivandrum)</p>
                    <p className="text-electric-cyan">Status: Available for High-Impact Product Teams & Global Relocation</p>
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

                {activeCommand === 'telemetry' && (
                  <div className="space-y-1.5">
                    <p className="text-electric-lime">&gt; telemetry.live()</p>
                    <p className="text-white">Throughput: <span className="text-electric-lime font-bold">50+ transactions/min</span> (Hardware to Cloud PoC)</p>
                    <p className="text-white">Transit Engine: <span className="text-electric-lime font-bold">1,000+ simulated txns/day</span></p>
                    <p className="text-white">PostgreSQL Latency: <span className="text-electric-lime font-bold">-20% optimized</span> via B-tree composite indexing</p>
                    <p className="text-typography-muted">Security: AES-256 payload encryption · 100% fraud simulation pass rate</p>
                  </div>
                )}

                {activeCommand === 'philosophy' && (
                  <div className="space-y-1.5">
                    <p className="text-electric-lime">&gt; philosophy.run()</p>
                    <p className="text-electric-cyan font-bold">"Zero-Downtime Reliability meets High-Velocity AI."</p>
                    <p className="text-white">1. If it breaks at 2 AM, it is an architecture flaw, not bad luck.</p>
                    <p className="text-white">2. Prototyping should be at AI speed; production must be hardened by tests.</p>
                    <p className="text-typography-muted">3. From hardware serial bytes to 60fps React interfaces—everything must feel cohesive.</p>
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
          {/* CARD 4: HARDWARE-TO-CLOUD IoT & ENTERPRISE ENGINE */}
          {/* ============================================================== */}
          <div className="md:col-span-12 lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-dark-card border border-dark-border/90 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-electric-lime uppercase tracking-wider">
                  <HardDrive size={15} />
                  <span>DISTRIBUTED IoT PIPELINE</span>
                </div>
                <span className="font-mono text-[11px] text-typography-muted">{simulatedPackets} PKTS DISPATCHED</span>
              </div>

              <h4 className="font-display font-bold text-xl text-white">
                Hardware to Cloud Real-Time Flow
              </h4>
              <p className="mt-1 text-xs text-typography-dim font-sans leading-relaxed">
                Contactless transit fare processing connecting Arduino sensors via PySerial to Flask & PostgreSQL backends.
              </p>

              {/* Animated Interactive Pipeline Flowchart */}
              <div className="my-6 p-4 rounded-2xl bg-dark-surface/80 border border-dark-border">
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                  <div className={`p-2 rounded-lg border transition-all ${isPulsing ? 'border-electric-lime bg-electric-lime/15 text-electric-lime' : 'border-dark-border text-typography-muted'}`}>
                    <span>ARDUINO</span>
                    <span className="block text-[8px] opacity-75">Sensor PoC</span>
                  </div>
                  <div className={`p-2 rounded-lg border transition-all ${isPulsing ? 'border-electric-cyan bg-electric-cyan/15 text-electric-cyan' : 'border-dark-border text-typography-muted'}`}>
                    <span>PYSERIAL</span>
                    <span className="block text-[8px] opacity-75">&lt;150ms Loop</span>
                  </div>
                  <div className={`p-2 rounded-lg border transition-all ${isPulsing ? 'border-electric-violet bg-electric-violet/15 text-electric-violet' : 'border-dark-border text-typography-muted'}`}>
                    <span>REST API</span>
                    <span className="block text-[8px] opacity-75">Node / Flask</span>
                  </div>
                  <div className={`p-2 rounded-lg border transition-all ${isPulsing ? 'border-electric-lime bg-electric-lime/15 text-electric-lime' : 'border-dark-border text-typography-muted'}`}>
                    <span>POSTGRES</span>
                    <span className="block text-[8px] opacity-75">ACID Safe</span>
                  </div>
                </div>

                {/* Simulated Flow Tracer */}
                <div className="w-full bg-dark-border h-1 rounded-full mt-3 overflow-hidden relative">
                  <div
                    className={`h-full bg-gradient-to-r from-electric-lime via-electric-violet to-electric-cyan transition-all duration-700 ${
                      isPulsing ? 'w-full' : 'w-1/3'
                    }`}
                  />
                </div>
              </div>

              {/* Metrics Pills */}
              <div className="grid grid-cols-2 gap-3 font-mono text-center">
                <div className="p-2.5 rounded-xl bg-dark-surface border border-dark-border">
                  <span className="block text-base font-bold text-electric-lime">50+ / min</span>
                  <span className="text-[10px] text-typography-muted uppercase">Throughput</span>
                </div>
                <div className="p-2.5 rounded-xl bg-dark-surface border border-dark-border">
                  <span className="block text-base font-bold text-electric-cyan">-30% Cut</span>
                  <span className="text-[10px] text-typography-muted uppercase">Wait Latency</span>
                </div>
              </div>
            </div>

            {/* Interactive Simulation Button */}
            <div className="mt-6 pt-4 border-t border-dark-border/70 flex items-center justify-between">
              <span className="font-mono text-[11px] text-typography-muted">TEST LIVE DISPATCH:</span>
              <button
                onClick={handleTriggerTelemetry}
                className="px-3.5 py-1.5 rounded-lg bg-electric-lime/15 border border-electric-lime/40 text-electric-lime hover:bg-electric-lime hover:text-black font-mono text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Play size={12} />
                <span>Trigger Packet</span>
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 5: ENTERPRISE TRAJECTORY (UST Highlights) */}
          {/* ============================================================== */}
          <div className="md:col-span-12 lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-dark-card border border-dark-border/90 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-electric-lime uppercase tracking-wider">
                  <Code2 size={15} />
                  <span>PRODUCTION TRAJECTORY // UST</span>
                </div>
                <span className="font-mono text-xs text-typography-muted">2024 — PRESENT</span>
              </div>

              <h4 className="font-display font-extrabold text-2xl text-white">
                Enterprise EDI & Modern Full-Stack Scalability
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Developer II */}
                <div className="p-5 rounded-2xl bg-dark-surface/80 border border-dark-border hover:border-electric-lime/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-white text-base">Developer II</span>
                    <span className="text-[10px] font-mono text-electric-lime bg-electric-lime/10 px-2 py-0.5 rounded-full">
                      Aug 2026 – Present
                    </span>
                  </div>
                  <p className="text-xs text-typography-dim leading-relaxed font-sans">
                    Design and build backend EDI solutions delivering reliable, secure, scalable data integration between enterprise & financial systems. Modernizing legacy flows with Claude-assisted prototyping.
                  </p>
                </div>

                {/* Developer I */}
                <div className="p-5 rounded-2xl bg-dark-surface/80 border border-dark-border hover:border-white/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-white text-base">Developer I</span>
                    <span className="text-[10px] font-mono text-typography-muted bg-dark-card px-2 py-0.5 rounded-full">
                      Sep 2024 – Aug 2026
                    </span>
                  </div>
                  <p className="text-xs text-typography-dim leading-relaxed font-sans">
                    Built performant React and TypeScript web applications integrated with backend REST APIs. Diagnosed runtime errors, optimized state flow, and upheld Agile code reviews.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-typography-muted">
              <span>SPECIALTIES: EDI · REST APIS · REACT · OBSERVABILITY</span>
              <span className="text-electric-lime">99.9% UPTIME STANDARDS</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 6: AVAILABILITY & GLOBAL RELOCATION BEACON */}
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
