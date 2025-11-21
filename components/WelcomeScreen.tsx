import React, { useState, useEffect } from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [isFading, setIsFading] = useState(false);

  const handleEnter = () => {
    setIsFading(true);
    setTimeout(onEnter, 1000); // Wait for animation
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-nahida-base transition-opacity duration-1000 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Background rotating rings mimicking Akasha/Wisdom orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1px] border-nahida-primary/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[1px] border-dashed border-nahida-gold/30 rounded-full animate-spin-reverse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-nahida-glow/30 rounded-full blur-[100px] animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="mb-8 animate-float">
             {/* Nahida Symbol / Flower Icon */}
             <svg width="80" height="80" viewBox="0 0 100 100" className="text-nahida-primary drop-shadow-[0_0_15px_rgba(88,182,117,0.5)]">
                <path d="M50 20 Q65 5 80 20 T80 50 Q65 65 50 50 Q35 65 20 50 T20 20 Q35 5 50 20" fill="currentColor" opacity="0.9" />
                <circle cx="50" cy="35" r="5" fill="#fff" />
             </svg>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-nahida-dark mb-4 tracking-wide opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
          Sanctuary of Wisdom
        </h1>
        
        <p className="font-script text-2xl md:text-3xl text-nahida-muted mb-12 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          "Share your dreams with me..."
        </p>

        <button 
          onClick={handleEnter}
          className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full transition-all duration-300 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards] hover:scale-105"
        >
           <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-nahida-primary to-nahida-accent opacity-10 group-hover:opacity-20 transition-opacity"></span>
           <span className="absolute inset-0 border border-nahida-primary/50 rounded-full"></span>
           <span className="relative flex items-center gap-3 text-nahida-dark font-serif tracking-widest uppercase text-sm">
             Enter Dream
             <span className="text-lg animate-pulse">✧</span>
           </span>
        </button>
      </div>
    </div>
  );
};