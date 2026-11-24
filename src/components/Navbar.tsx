import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onShowToast: (title: string, message?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
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


  const navLinks = [
    { label: 'Overview', href: '#bento', external: false },
    { label: 'Stack', href: '#skills', external: false },
    { label: 'Works (GitHub)', href: 'https://github.com/thar2130', external: true },
    { label: 'Contact', href: '#contact', external: false }
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
        <div className="hidden lg:flex items-center gap-1 bg-dark-bg/60 border border-dark-border/60 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="px-3.5 py-1 text-xs font-mono text-typography-dim hover:text-electric-lime transition-colors duration-200 flex items-center gap-1.5 group focus:outline-none focus:text-electric-lime"
              data-cursor="hover"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-electric-lime/40 group-hover:bg-electric-lime transition-colors" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-electric-lime/10 border border-electric-lime/20 text-electric-lime text-[10px] sm:text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
            <span className="hidden sm:inline">Open to Relocation</span>
            <span className="sm:hidden">Available</span>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-white hover:text-electric-lime focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto mt-2 sm:mt-3 bg-dark-card/95 border border-dark-border backdrop-blur-2xl rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3.5 rounded-xl text-sm font-mono text-white hover:bg-dark-hover hover:text-electric-lime transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-electric-lime font-mono">↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
