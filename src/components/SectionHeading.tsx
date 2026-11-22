import React from 'react';

interface SectionHeadingProps {
  number: string;
  title: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  accentColor?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  heading,
  subheading,
  align = 'left',
  accentColor = '#C6FF3D',
  className = 'mb-10 md:mb-16'
}) => {
  return (
    <div className={`${className} ${align === 'center' ? 'text-center mx-auto' : ''}`}>
      {/* Code Badge */}
      <div className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest text-typography-muted uppercase mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
        <span>// {number}. {title}</span>
        <span className="h-[1px] w-8 bg-dark-border inline-block ml-2" />
      </div>

      {/* Main Section Heading */}
      <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.08] max-w-4xl">
        {heading}
      </h2>

      {/* Subheading */}
      {subheading && (
        <p className="mt-4 text-base sm:text-lg text-typography-dim font-sans max-w-2xl leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
};
