import React, { useState, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import { Preloader } from './components/Preloader';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { Toast, ToastMessage } from './components/Toast';

import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { EducationCertificationsSection } from './sections/EducationCertificationsSection';
import { ContactSection } from './sections/ContactSection';

export const App: React.FC = () => {
  const [, setIsLoaded] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize Lenis smooth scroll
  useLenis();

  const showToast = useCallback((title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message }]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-bg text-typography-light font-sans selection:bg-electric-lime selection:text-black">
      {/* Film Noise Overlay */}
      <NoiseOverlay />

      {/* Lagging Ring Custom Cursor */}
      <CustomCursor />

      {/* Top Scroll Indicator & Back To Top */}
      <ScrollProgress />

      {/* Award-Style Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Toast Notification Layer */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Floating Glassmorphism Navbar */}
      <Navbar onShowToast={showToast} />

      {/* Main Page Content Flow */}
      <main id="main-content" className="relative z-10 w-full overflow-hidden">
        <HeroSection onShowToast={showToast} />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection onShowToast={showToast} />
        <EducationCertificationsSection />
        <ContactSection onShowToast={showToast} />
      </main>
    </div>
  );
};

export default App;
