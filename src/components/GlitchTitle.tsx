import React from 'react';
import { Theme } from '../types/game';

interface GlitchTitleProps {
  subtitle?: string;
  size?: 'lg' | 'xl' | '2xl';
  theme?: Theme;
}

export const GlitchTitle: React.FC<GlitchTitleProps> = ({ 
  subtitle = "Live a life. Make terrible decisions. See what happens.",
  size = '2xl',
  theme = 'light'
}) => {
  const isLight = theme === 'light';
  const sizeClasses = {
    lg: 'text-2xl sm:text-4xl',
    xl: 'text-3xl sm:text-5xl',
    '2xl': 'text-4xl sm:text-7xl tracking-tight'
  }[size];

  return (
    <div className="text-center select-none py-1 sm:py-2">
      <div className="relative inline-block group">
        <h1 className={`${sizeClasses} font-display font-extrabold uppercase tracking-widest transition-colors ${
          isLight 
            ? 'text-[#0f172a] drop-shadow-[0_2px_10px_rgba(5,150,105,0.25)]' 
            : 'text-white drop-shadow-[0_0_15px_rgba(0,230,118,0.4)]'
        }`}>
          LIFE <span className={`${isLight ? 'text-[#059669] group-hover:text-[#0284c7]' : 'text-[#00e676] group-hover:text-[#00f0ff]'} transition-colors`}>GLITCH</span>
        </h1>
        <span 
          aria-hidden="true" 
          className={`absolute top-0 left-0 ${sizeClasses} font-display font-extrabold uppercase ${
            isLight ? 'text-[#dc2626] opacity-15' : 'text-[#ff1744] opacity-20'
          } -translate-x-[2px] translate-y-[1px] pointer-events-none group-hover:opacity-35 transition-opacity`}
        >
          LIFE GLITCH
        </span>
      </div>
      {subtitle && (
        <p className={`text-[16px] sm:text-lg mt-2 sm:mt-3 font-semibold tracking-normal leading-relaxed max-w-md mx-auto px-2 ${
          isLight ? 'text-slate-700' : 'text-slate-200'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
