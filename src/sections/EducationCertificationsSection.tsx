import React, { useRef, useState } from 'react';
import { PORTFOLIO_CONTENT, CertificationItem } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { GraduationCap, Award } from 'lucide-react';

export const EducationCertificationsSection: React.FC = () => {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  return (
    <section
      id="credentials"
      className="relative w-full bg-dark-bg py-24 sm:py-32 border-t border-dark-border/40"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        <SectionHeading
          number={PORTFOLIO_CONTENT.educationAndCerts.sectionNumber}
          title={PORTFOLIO_CONTENT.educationAndCerts.sectionTitle}
          heading={PORTFOLIO_CONTENT.educationAndCerts.heading}
          subheading={PORTFOLIO_CONTENT.educationAndCerts.subheading}
        />

        {/* Education Highlight with Line-Draw Accents */}
        <div className="my-16">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-typography-muted mb-6">
            <GraduationCap size={18} className="text-electric-lime" />
            <span>ACADEMIC FOUNDATION</span>
          </div>

          <div className="relative p-8 sm:p-12 rounded-3xl bg-dark-card border border-dark-border/90 shadow-xl overflow-hidden">
            {/* Animated SVG Line Drawing Divider */}
            <svg
              className="absolute top-0 left-0 w-full h-[2px] pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 100 2"
            >
              <line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="#C6FF3D"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset="0"
                className="opacity-70"
              />
            </svg>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-dark-border/60">
              <div>
                <span className="font-mono text-xs text-electric-lime tracking-wider uppercase font-semibold">
                  {PORTFOLIO_CONTENT.educationAndCerts.education.period}
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white mt-1">
                  {PORTFOLIO_CONTENT.educationAndCerts.education.degree}
                </h3>
                <p className="font-sans text-base sm:text-lg text-typography-dim font-medium mt-1">
                  {PORTFOLIO_CONTENT.educationAndCerts.education.field}
                </p>
              </div>

              <div className="flex flex-col lg:items-end">
                <span className="font-display font-bold text-lg sm:text-xl text-white">
                  {PORTFOLIO_CONTENT.educationAndCerts.education.institution}
                </span>
                <span className="font-mono text-xs text-typography-muted mt-1">
                  {PORTFOLIO_CONTENT.educationAndCerts.education.location}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {PORTFOLIO_CONTENT.educationAndCerts.education.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-3 text-sm text-typography-dim font-sans leading-relaxed">
                  <span className="text-electric-lime font-mono mt-0.5">▹</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications: Interactive 3D Tilt & Holographic Badges */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-typography-muted">
              <Award size={18} className="text-electric-lime" />
              <span>INDUSTRY CERTIFICATIONS ({PORTFOLIO_CONTENT.educationAndCerts.certifications.length})</span>
            </div>
            <span className="font-mono text-xs text-electric-lime hidden sm:inline-block">
              // 3D TILT INTERACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_CONTENT.educationAndCerts.certifications.map((cert) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                isHovered={hoveredCert === cert.id}
                onHover={() => setHoveredCert(cert.id)}
                onLeave={() => setHoveredCert(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface CertificationCardProps {
  cert: CertificationItem;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  cert,
  isHovered,
  onHover,
  onLeave
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    onLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      className="perspective-text select-none"
    >
      <div
        className={`relative p-7 rounded-3xl bg-dark-card border transition-all duration-200 shadow-xl flex flex-col justify-between min-h-[220px] overflow-hidden ${
          cert.featured
            ? 'border-electric-lime/60 bg-gradient-to-br from-dark-card via-dark-surface to-dark-card shadow-[0_10px_35px_rgba(198,255,61,0.12)]'
            : 'border-dark-border hover:border-white/40'
        }`}
        style={{
          transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${
            isHovered ? 1.03 : 1
          }, ${isHovered ? 1.03 : 1}, 1)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Holographic Sheen on hover */}
        {isHovered && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-20 hologram-sheen animate-pulse"
          />
        )}

        {/* Top Header Badge */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase ${
                cert.featured
                  ? 'bg-electric-lime text-black'
                  : 'bg-dark-surface border border-dark-border text-typography-muted'
              }`}
            >
              {cert.badge}
            </span>
            <span className="font-mono text-[11px] text-typography-muted">
              {cert.code}
            </span>
          </div>

          <h4 className="font-display font-extrabold text-xl text-white mt-2 leading-snug">
            {cert.title}
          </h4>
          <span className="font-mono text-xs text-electric-lime mt-1 block">
            {cert.issuer}
          </span>
        </div>

        {/* Skills Tag Pills */}
        <div className="mt-6 pt-4 border-t border-dark-border/60">
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="px-2 py-0.5 rounded bg-dark-surface text-[10px] font-mono text-typography-dim"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
