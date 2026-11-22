import React from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  textStrength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  textStrength = 0.2,
  ...props
}) => {
  const { ref, textRef } = useMagnetic<HTMLButtonElement>({ strength, textStrength });

  return (
    <button
      ref={ref}
      className={`relative inline-flex items-center justify-center transition-shadow duration-300 ${className}`}
      {...props}
    >
      <span ref={textRef} className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </span>
    </button>
  );
};
