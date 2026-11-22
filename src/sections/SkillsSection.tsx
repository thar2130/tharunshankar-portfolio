import React, { useState } from 'react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { Sparkles, Terminal, Code, Cpu, Database, Server, Wrench } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...PORTFOLIO_CONTENT.skills.categories.map((c) => c.category)];

  const filteredCategories =
    activeCategory === 'All'
      ? PORTFOLIO_CONTENT.skills.categories
      : PORTFOLIO_CONTENT.skills.categories.filter((c) => c.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Code size={18} className="text-electric-lime" />;
      case 'Frontend':
        return <Cpu size={18} className="text-electric-lime" />;
      case 'Backend':
        return <Server size={18} className="text-electric-lime" />;
      case 'Engineering':
        return <Wrench size={18} className="text-electric-lime" />;
      case 'Data & Cloud':
        return <Database size={18} className="text-electric-violet" />;
      case 'AI & Emerging':
        return <Sparkles size={18} className="text-electric-lime" />;
      default:
        return <Terminal size={18} className="text-electric-lime" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative w-full bg-dark-bg py-24 sm:py-32 border-t border-dark-border/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Heading */}
        <SectionHeading
          number={PORTFOLIO_CONTENT.skills.sectionNumber}
          title={PORTFOLIO_CONTENT.skills.sectionTitle}
          heading={PORTFOLIO_CONTENT.skills.heading}
          subheading={PORTFOLIO_CONTENT.skills.subheading}
        />
      </div>

      {/* Infinite Dual-Direction Kinetic Marquees */}
      <div className="my-10 space-y-4 overflow-hidden pointer-events-auto">
        {/* Marquee Row 1 (Left Scrolling) */}
        <div className="relative w-full overflow-hidden py-2 bg-dark-surface/40 border-y border-dark-border/60">
          <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
            {[...PORTFOLIO_CONTENT.skills.marqueeRow1, ...PORTFOLIO_CONTENT.skills.marqueeRow1].map(
              (tech, idx) => (
                <div
                  key={idx}
                  data-cursor="hover"
                  className="mx-4 px-6 py-3 rounded-full bg-dark-card border border-dark-border/80 text-white font-mono text-sm sm:text-base font-semibold tracking-wide whitespace-nowrap transition-all duration-300 hover:scale-110 hover:border-electric-lime hover:text-electric-lime hover:shadow-[0_0_25px_rgba(198,255,61,0.3)] flex items-center gap-3 cursor-pointer select-none"
                >
                  <span className="w-2 h-2 rounded-full bg-electric-lime" />
                  <span>{tech}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Marquee Row 2 (Right Scrolling) */}
        <div className="relative w-full overflow-hidden py-2 bg-dark-surface/40 border-b border-dark-border/60">
          <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
            {[...PORTFOLIO_CONTENT.skills.marqueeRow2, ...PORTFOLIO_CONTENT.skills.marqueeRow2].map(
              (tech, idx) => (
                <div
                  key={idx}
                  data-cursor="hover"
                  className="mx-4 px-6 py-3 rounded-full bg-dark-card border border-dark-border/80 text-white font-mono text-sm sm:text-base font-semibold tracking-wide whitespace-nowrap transition-all duration-300 hover:scale-110 hover:border-electric-violet hover:text-electric-violet hover:shadow-[0_0_25px_rgba(124,92,255,0.3)] flex items-center gap-3 cursor-pointer select-none"
                >
                  <span className="w-2 h-2 rounded-full bg-electric-violet" />
                  <span>{tech}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mt-16">
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-dark-border">
          <span className="font-mono text-xs text-typography-muted mr-2 uppercase tracking-wider">
            FILTER STACK:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-electric-lime text-black font-bold shadow-md'
                  : 'bg-dark-card border border-dark-border text-typography-dim hover:text-white hover:border-white/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredCategories.map((group) => (
            <div
              key={group.category}
              className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border hover:border-electric-lime/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-dark-surface border border-dark-border flex items-center justify-center">
                    {getCategoryIcon(group.category)}
                  </div>
                  <span className="font-mono text-[11px] text-electric-lime uppercase tracking-widest">
                    {group.items.length} SKILLS
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-electric-lime transition-colors">
                  {group.category}
                </h3>
                <p className="mt-1 text-xs text-typography-muted font-sans leading-relaxed">
                  {group.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-all duration-200 ${
                        item.highlight
                          ? 'bg-dark-surface border border-electric-lime/40 text-white font-medium hover:border-electric-lime'
                          : 'bg-dark-surface/60 border border-dark-border text-typography-dim hover:text-white'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.highlight ? 'bg-electric-lime' : 'bg-typography-muted'
                        }`}
                      />
                      <span>{item.name}</span>
                      {item.level && (
                        <span className="text-[10px] text-typography-muted opacity-75">
                          ({item.level})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dark-border/60 font-mono text-[11px] text-typography-muted flex items-center justify-between">
                <span>VERIFIED PROFICIENCY</span>
                <span className="text-electric-lime">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
