import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { MagneticButton } from './MagneticButton';
import { Download, Menu, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  onShowToast: (title: string, message?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onShowToast }) => {
  const [time, setTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) + ' IST'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDownloadResume = () => {
    // Confetti burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.15 },
      colors: ['#C6FF3D', '#7C5CFF', '#FFFFFF']
    });

    onShowToast('Resume Download Triggered', 'Viewing Tharunshankar_S_Resume.pdf');
  };

  const navLinks = [
    { label: 'About', href: '#about', num: '01' },
    { label: 'Experience', href: '#experience', num: '02' },
    { label: 'Skills', href: '#skills', num: '03' },
    { label: 'Projects', href: '#projects', num: '04' },
    { label: 'Certs', href: '#credentials', num: '05' },
    { label: 'Contact', href: '#contact', num: '06' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[900] px-4 sm:px-8 py-4 sm:py-6 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-card/85 backdrop-blur-xl border border-dark-border/80 px-4 sm:px-6 py-2.5 rounded-full shadow-2xl'
            : 'bg-transparent px-2 py-1'
        }`}
      >
        {/* Logo / Monogram */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-electric-lime rounded-full p-1"
          aria-label="Tharunshankar S - Back to top"
          data-cursor="hover"
        >
          <div className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center font-display font-extrabold text-white group-hover:border-electric-lime group-hover:text-electric-lime transition-all duration-300">
            {PORTFOLIO_CONTENT.personal.monogram}
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-electric-lime transition-colors">
              {PORTFOLIO_CONTENT.personal.name}
            </span>
            <span className="font-mono text-[10px] text-typography-muted tracking-wider">
              {time || 'LIVE IST'}
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 bg-dark-bg/60 border border-dark-border/60 rounded-full px-3 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1 text-xs font-mono text-typography-dim hover:text-electric-lime transition-colors duration-200 flex items-center gap-1 group focus:outline-none focus:text-electric-lime"
              data-cursor="hover"
            >
              <span className="text-[10px] text-electric-lime/60 group-hover:text-electric-lime">
                {link.num}.
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-electric-lime/10 border border-electric-lime/20 text-electric-lime text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
            <span>Open to Relocation</span>
          </div>

          {/* Download Resume Button */}
          <MagneticButton
            onClick={handleDownloadResume}
            className="px-4 py-2 rounded-full bg-electric-lime text-black font-mono text-xs font-bold tracking-wide hover:bg-white transition-colors duration-300 shadow-md group focus:outline-none focus:ring-2 focus:ring-white"
            data-cursor="hover"
          >
            <a
              href={PORTFOLIO_CONTENT.personal.resumePath}
              download="Tharunshankar_S_Resume.pdf"
              className="flex items-center gap-1.5"
            >
              <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </a>
          </MagneticButton>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-white hover:text-electric-lime focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto mt-3 bg-dark-card/95 border border-dark-border backdrop-blur-2xl rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-mono text-white hover:bg-dark-hover hover:text-electric-lime transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-electric-lime font-mono">{link.num}</span>
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-dark-border flex flex-col gap-2">
            <a
              href={PORTFOLIO_CONTENT.personal.resumePath}
              download="Tharunshankar_S_Resume.pdf"
              onClick={() => {
                handleDownloadResume();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-electric-lime text-black font-mono text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <Download size={14} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
