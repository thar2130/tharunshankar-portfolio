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
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

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
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast('Incomplete Form', 'Please provide your name, email, and message.');
      return;
    }

    const targetEmail = PORTFOLIO_CONTENT.personal.contact.email;
    const subject = `Portfolio Inquiry from ${formData.name} (tharunprof.dev)`;
    const body = `Hi Tharun,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nTransmitted via tharunprof.dev`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Confetti celebration
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#C6FF3D', '#7C5CFF', '#38BDF8']
    });

    // Instant execution: open Gmail Web composer in a new tab
    const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // If popup blocker intercepted, seamlessly trigger system mailto
      window.location.href = mailtoUrl;
    }

    setFormStatus('success');
    onShowToast('Email Composer Ready!', `Ready to dispatch to ${targetEmail}`);

    setFormData({ name: '', email: '', message: '' });
  };

  const handleDirectGmail = () => {
    const targetEmail = PORTFOLIO_CONTENT.personal.contact.email;
    const name = formData.name.trim() || 'Visitor';
    const subject = `Portfolio Inquiry from ${name} (tharunprof.dev)`;
    const body = formData.message.trim()
      ? `Hi Tharun,\n\nName: ${name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nTransmitted via tharunprof.dev`
      : `Hi Tharun,\n\nI was reviewing your portfolio on tharunprof.dev and would love to connect regarding an opportunity.\n\nBest regards,\n${name}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    onShowToast('Opening Gmail', `Composing to ${targetEmail}`);
  };

  const handleDirectMailer = () => {
    const targetEmail = PORTFOLIO_CONTENT.personal.contact.email;
    const name = formData.name.trim() || 'Visitor';
    const subject = `Portfolio Inquiry from ${name} (tharunprof.dev)`;
    const body = formData.message.trim()
      ? `Hi Tharun,\n\nName: ${name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nTransmitted via tharunprof.dev`
      : `Hi Tharun,\n\nI was reviewing your portfolio on tharunprof.dev and would love to connect.\n\nBest regards,\n${name}`;

    const mailtoUrl = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    onShowToast('Opening Mail Client', `Composing to ${targetEmail}`);
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

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        {/* Section Code Badge (No serial numbers) */}
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-typography-muted uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
          <span>// INITIATE CONNECTION</span>
          <span className="h-[1px] w-8 bg-dark-border inline-block ml-2" />
        </div>

        {/* Giant Kinetic Headline */}
        <h2 className="font-display font-extrabold text-[clamp(1.9rem,6.8vw,7.2rem)] text-white uppercase tracking-tight leading-[0.95] mt-4 select-none max-w-full">
          LET'S BUILD <br />
          <span className="text-electric-lime electric-glow inline-block">SOMETHING</span>
        </h2>

        <p className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-typography-dim font-sans max-w-2xl leading-relaxed">
          {PORTFOLIO_CONTENT.contact.subheadline}
        </p>

        {/* Interactive Magnetic Email CTA Box */}
        <div className="my-10 sm:my-14 p-5 sm:p-8 md:p-12 rounded-3xl bg-dark-card border border-dark-border/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="z-10">
            <span className="font-mono text-xs text-electric-lime tracking-widest uppercase block mb-1">
              DIRECT INBOX
            </span>
            <span className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-white block select-all break-all sm:break-normal">
              {PORTFOLIO_CONTENT.contact.email}
            </span>
            <span className="text-xs font-mono text-typography-muted mt-2 block">
              Typical response time: &lt; 24 hours · Worldwide &amp; Remote Friendly
            </span>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <MagneticButton
              onClick={handleCopyEmail}
              data-cursor="copy"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-electric-lime text-black font-mono text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
            </MagneticButton>

            <a
              href={`mailto:${PORTFOLIO_CONTENT.contact.email}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-dark-surface border border-dark-border hover:border-electric-lime text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
              data-cursor="hover"
            >
              <Mail size={16} className="text-electric-lime" />
              <span>Launch Mailer</span>
            </a>
          </div>
        </div>

        {/* Contact Form & Social Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 my-12 sm:my-16">
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
          <div className="lg:col-span-7 p-5 sm:p-8 rounded-3xl bg-dark-card border border-dark-border/90 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider">
                Direct Dispatch Transmission
              </h3>
              <span className="font-mono text-xs text-electric-lime"> </span>
            </div>

            {/* Status Feedback Notice */}
            {formStatus === 'success' && (
              <div className="mb-5 p-4 rounded-xl bg-electric-lime/15 border border-electric-lime/50 text-electric-lime text-xs font-mono space-y-2.5 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2">
                  <Check size={16} className="shrink-0" />
                  <span className="font-bold">Email composer launched for {PORTFOLIO_CONTENT.personal.contact.email}!</span>
                </div>
                <p className="text-[11px] text-typography-light font-sans">
                  Hit <strong className="text-white">Send</strong> in your mail window to complete transmission. If the window did not open, click below:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleDirectGmail}
                    className="px-3.5 py-1.5 rounded-lg bg-electric-lime text-black font-bold font-mono text-xs flex items-center gap-1.5 hover:bg-white transition-colors"
                  >
                    <span>Launch Gmail ↗</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDirectMailer}
                    className="px-3.5 py-1.5 rounded-lg bg-dark-surface border border-dark-border text-white font-mono text-xs hover:border-electric-lime transition-colors"
                  >
                    <span>Launch System Mail App</span>
                  </button>
                </div>
              </div>
            )}

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

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] font-mono text-typography-muted justify-center sm:justify-start">
                  <span className="w-2 h-2 rounded-full bg-electric-lime animate-pulse shrink-0" />
                  <span>DIRECT TO THARUND2108@GMAIL.COM</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDirectGmail}
                    className="px-4 py-2.5 rounded-full bg-dark-surface border border-dark-border hover:border-electric-lime text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Send via Gmail ↗</span>
                  </button>

                  <MagneticButton
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-electric-lime text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send size={14} />
                    <span>Transmit Message</span>
                  </MagneticButton>
                </div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-typography-muted text-center sm:text-left">
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
