import React from 'react';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcf8] via-[#f4fbf6] to-[#fdfcf8] opacity-80"></div>

      {/* Pattern Layer */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="leaf-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
           <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z" fill="currentColor" className="text-nahida-dark"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
      </svg>

      {/* Akasha Tech Rings - Top Right */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-20">
         <div className="absolute inset-0 border border-nahida-primary rounded-full animate-spin-slow border-dashed"></div>
         <div className="absolute inset-[50px] border border-nahida-gold rounded-full animate-spin-reverse-slow opacity-50"></div>
      </div>

      {/* Akasha Tech Rings - Bottom Left */}
      <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] opacity-10">
         <div className="absolute inset-0 border border-nahida-dark rounded-full animate-[spin_30s_linear_infinite]"></div>
      </div>

      {/* Floating Particles (Static CSS implementation for performance) */}
      <div className="absolute top-[20%] left-[10%] w-3 h-3 bg-nahida-primary/40 rounded-full blur-[1px] animate-float"></div>
      <div className="absolute top-[15%] left-[80%] w-2 h-2 bg-nahida-gold/40 rounded-full blur-[1px] animate-float-delayed"></div>
      <div className="absolute top-[70%] left-[20%] w-4 h-4 bg-nahida-accent/30 rounded-full blur-[2px] animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-nahida-primary/30 rounded-full blur-[0px] animate-[float_5s_ease-in-out_1s_infinite]"></div>
      
      {/* Glowing Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0)_60%,rgba(88,182,117,0.05)_100%)]"></div>
    </div>
  );
};