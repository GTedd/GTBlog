import React, { useEffect, useState, useCallback, useRef } from 'react';

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export const ClickEffects: React.FC = () => {
  const [clicks, setClicks] = useState<ClickEffect[]>([]);
  
  // Use a ref to store the AudioContext so it persists between renders
  const audioContextRef = useRef<AudioContext | null>(null);

  const playBellSound = useCallback(() => {
    try {
      // Initialize AudioContext on first interaction
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
        }
      }

      const ctx = audioContextRef.current;
      if (!ctx) return;

      // Resume if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Bell sound configuration
      // High pitch sine wave
      oscillator.type = 'sine';
      // Slight randomization for natural feel: 2200Hz +/- 100Hz
      const frequency = 2200 + (Math.random() * 200 - 100); 
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      // Amplitude envelope (fast attack, exponential decay)
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01); // Very quiet (0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8); // Decay over 0.8s

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.8);

    } catch (e) {
      console.error("Audio playback failed", e);
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      const x = e.pageX; // Use pageX/Y to account for scrolling
      const y = e.pageY;
      
      setClicks(prev => [...prev, { id, x, y }]);
      playBellSound();

      // Remove the visual effect after the animation completes
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== id));
      }, 600); // Matches the animation duration (0.6s)
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [playBellSound]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[9999] overflow-hidden">
      {clicks.map(click => (
        <div
          key={click.id}
          style={{ left: click.x, top: click.y }}
          className="absolute w-8 h-8 -ml-4 -mt-4 animate-click-expand"
        >
             {/* Nahida/Dendro 4-leaf symbol shape */}
             <svg viewBox="0 0 24 24" className="w-full h-full text-nahida-primary drop-shadow-[0_0_8px_rgba(88,182,117,0.8)]">
                <path d="M12,2 C14.5,7 19,9.5 22,12 C19,14.5 14.5,17 12,22 C9.5,17 5,14.5 2,12 C5,9.5 9.5,7 12,2 Z" fill="currentColor" />
                {/* Inner detail */}
                <path d="M12,7 C13.5,9.5 15.5,10.5 17,12 C15.5,13.5 13.5,14.5 12,17 C10.5,14.5 8.5,13.5 7,12 C8.5,10.5 10.5,9.5 12,7 Z" fill="#cfffd9" opacity="0.9" />
             </svg>
             {/* Sparkles */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-1 bg-nahida-gold rounded-full opacity-80"></div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-1 h-1 bg-nahida-gold rounded-full opacity-80"></div>
             <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-1 h-1 bg-nahida-gold rounded-full opacity-80"></div>
             <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 w-1 h-1 bg-nahida-gold rounded-full opacity-80"></div>
        </div>
      ))}
    </div>
  );
};
