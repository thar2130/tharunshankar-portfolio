import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Progress Line */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-electric-lime z-[9995] transition-all duration-75 pointer-events-none"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Floating Bottom Right Progress & Back to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        data-cursor="hover"
        className={`fixed bottom-6 right-6 z-[990] flex items-center gap-2 bg-dark-card/90 border border-dark-border/80 backdrop-blur-md px-3.5 py-2.5 rounded-full text-xs font-mono text-typography-muted hover:text-electric-lime hover:border-electric-lime/50 transition-all duration-300 shadow-xl group ${
          isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span className="font-mono text-[11px] text-white group-hover:text-electric-lime transition-colors">
          {Math.round(progress)}%
        </span>
        <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </>
  );
};
