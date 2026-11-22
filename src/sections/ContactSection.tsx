import React, { useState } from 'react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { MagneticButton } from '../components/MagneticButton';
import { Mail, Copy, Check, Phone, Linkedin, Github, MapPin, Send, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onShowToast: (title: string, message?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONTENT.personal.contact.email);
    setCopied(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#C6FF3D', '#7C5CFF', '#FFFFFF']
    });

    onShowToast('Email Copied to Clipboard', PORTFOLIO_CONTENT.personal.contact.email);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Incomplete Form', 'Please fill out all fields.');
      return;
    }

    setFormSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#C6FF3D', '#7C5CFF', '#FFFFFF']
    });

    onShowToast('Transmission Sent', `Thank you ${formData.name}! Tharunshankar will respond shortly.`);

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-dark-bg pt-24 sm:pt-36 pb-12 border-t border-dark-border/60 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-electric-lime/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Code Badge */}
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-typography-muted uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
          <span>// 06. INITIATE CONNECTION</span>
          <span className="h-[1px] w-8 bg-dark-border inline-block ml-2" />
        </div>

        {/* Giant Kinetic Headline */}
        <h2 className="font-display font-extrabold text-[clamp(2.2rem,7.2vw,7.2rem)] text-white uppercase tracking-tight leading-[0.95] mt-4 select-none max-w-full">
          LET'S BUILD <br />
          <span className="text-electric-lime electric-glow inline-block">SOMETHING</span>
        </h2>

        <p className="mt-6 text-lg sm:text-2xl text-typography-dim font-sans max-w-2xl leading-relaxed">
          {PORTFOLIO_CONTENT.contact.subheadline}
        </p>

        {/* Interactive Magnetic Email CTA Box */}
        <div className="my-14 p-8 sm:p-12 rounded-3xl bg-dark-card border border-dark-border/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="z-10">
            <span className="font-mono text-xs text-electric-lime tracking-widest uppercase block mb-1">
              DIRECT INBOX
            </span>
            <span className="font-display font-bold text-2xl sm:text-4xl text-white block select-all">
              {PORTFOLIO_CONTENT.contact.email}
            </span>
            <span className="text-xs font-mono text-typography-muted mt-2 block">
              Typical response time: &lt; 24 hours · Worldwide & Remote Friendly
            </span>
          </div>

          <div className="z-10 flex flex-wrap items-center gap-3">
            <MagneticButton
              onClick={handleCopyEmail}
              data-cursor="copy"
              className="px-6 py-3.5 rounded-full bg-electric-lime text-black font-mono text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-xl flex items-center gap-2"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
            </MagneticButton>

            <a
              href={`mailto:${PORTFOLIO_CONTENT.contact.email}`}
              className="px-6 py-3.5 rounded-full bg-dark-surface border border-dark-border hover:border-electric-lime text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
              data-cursor="hover"
            >
              <Mail size={16} className="text-electric-lime" />
              <span>Launch Mailer</span>
            </a>
          </div>
        </div>

        {/* Contact Form & Social Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
          {/* Left Column: Direct Links & Relocation Info */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider mb-2">
              Communication Coordinates
            </h3>

            {/* LinkedIn */}
            <a
              href={PORTFOLIO_CONTENT.personal.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-dark-card border border-dark-border hover:border-electric-lime/40 transition-colors flex items-center justify-between group"
              data-cursor="hover"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-dark-surface flex items-center justify-center text-electric-lime">
                  <Linkedin size={18} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-typography-muted uppercase">LINKEDIN PROFILE</span>
                  <span className="font-mono text-sm text-white group-hover:text-electric-lime transition-colors">
                    {PORTFOLIO_CONTENT.personal.contact.linkedinDisplay}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-electric-lime">CONNECT ▹</span>
            </a>

            {/* GitHub */}
            <a
              href={PORTFOLIO_CONTENT.personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-dark-card border border-dark-border hover:border-electric-lime/40 transition-colors flex items-center justify-between group"
              data-cursor="hover"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-dark-surface flex items-center justify-center text-electric-lime">
                  <Github size={18} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-typography-muted uppercase">GITHUB PROFILE</span>
                  <span className="font-mono text-sm text-white group-hover:text-electric-lime transition-colors">
                    {PORTFOLIO_CONTENT.personal.contact.githubDisplay}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-electric-lime">CODE ▹</span>
            </a>

            {/* Phone */}
            <a
              href={PORTFOLIO_CONTENT.personal.contact.phone ? `tel:${PORTFOLIO_CONTENT.personal.contact.phone.replace(/\s+/g, '')}` : '#'}
              className="p-4 rounded-2xl bg-dark-card border border-dark-border hover:border-electric-lime/40 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-dark-surface flex items-center justify-center text-electric-lime">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-typography-muted uppercase">PHONE / WHATSAPP</span>
                  <span className="font-mono text-sm text-white group-hover:text-electric-lime transition-colors">
                    {PORTFOLIO_CONTENT.personal.contact.phone}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-electric-lime">DIAL ▹</span>
            </a>

            {/* Location & Relocation */}
            <div className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-dark-surface flex items-center justify-center text-electric-lime">
                <MapPin size={18} />
              </div>
              <div>
                <span className="block font-mono text-[10px] text-typography-muted uppercase">LOCATION AVAILABILITY</span>
                <span className="font-mono text-sm text-white">
                  {PORTFOLIO_CONTENT.personal.status.location}
                </span>
                <span className="block text-[11px] font-sans text-electric-lime mt-0.5">
                  ✓ Open to Relocation (Domestic & International)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Transmission Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-dark-card border border-dark-border/90 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider">
                Direct Dispatch Transmission
              </h3>
              <span className="font-mono text-xs text-electric-lime">// DISPATCH PROTOCOL</span>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-typography-muted uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Engineering Lead"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-dark-border text-white placeholder-typography-muted/40 font-mono text-xs focus:outline-none focus:border-electric-lime transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-typography-muted uppercase mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-dark-border text-white placeholder-typography-muted/40 font-mono text-xs focus:outline-none focus:border-electric-lime transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-typography-muted uppercase mb-1.5">
                  Message / Opportunity Brief
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell me about your product, mission, architecture challenges, or role details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-dark-border text-white placeholder-typography-muted/40 font-sans text-sm focus:outline-none focus:border-electric-lime transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-typography-muted">
                  CONFIDENTIAL & SECURE
                </span>

                <MagneticButton
                  type="submit"
                  className="px-6 py-3 rounded-full bg-electric-lime text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2"
                >
                  <Send size={14} />
                  <span>{formSubmitted ? 'Message Dispatched!' : 'Transmit Message'}</span>
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Continuous Footer Kinetic Marquee */}
      <div className="mt-20 py-4 bg-dark-card border-y border-dark-border overflow-hidden select-none">
        <div className="flex w-max animate-marquee-left">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display font-extrabold text-2xl sm:text-4xl text-typography-muted/40 tracking-wider uppercase whitespace-nowrap mx-4"
            >
              {PORTFOLIO_CONTENT.contact.footerMarquee}
            </span>
          ))}
        </div>
      </div>

      {/* Colophon & Sub-Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-typography-muted">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} {PORTFOLIO_CONTENT.personal.name}.</span>
          <span>ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-4">
          <span>DESIGNED FOR HIGH-IMPACT SCALE</span>
          <span>•</span>
          <button
            onClick={scrollToTop}
            className="text-electric-lime hover:underline uppercase flex items-center gap-1"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
