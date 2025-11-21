import React, { useState, useRef, useEffect } from 'react';
import { consultAkasha } from '../services/geminiService';
import { Language, TranslationKeys } from '../types';

interface AkashaProps {
  lang: Language;
  t: TranslationKeys['akasha'];
}

export const AkashaTerminal: React.FC<AkashaProps> = ({ lang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleConsult = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse(null);
    
    const result = await consultAkasha(query, lang);
    setResponse(result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (response && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-80 sm:w-96 glass-panel rounded-3xl shadow-[0_10px_40px_rgba(30,71,40,0.15)] overflow-hidden animate-fade-in flex flex-col border border-nahida-gold/40 relative">
          
          {/* Decorative "Skill Hold" Corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-nahida-primary opacity-50 rounded-tl-md"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-nahida-primary opacity-50 rounded-tr-md"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-nahida-primary opacity-50 rounded-bl-md"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-nahida-primary opacity-50 rounded-br-md"></div>

          {/* Header */}
          <div className="bg-gradient-to-r from-nahida-primary/90 to-nahida-accent/90 p-4 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-nahida-primary text-xs font-bold shadow-inner">
                 🍃
               </div>
               <h3 className="text-white font-serif font-bold tracking-wide text-sm shadow-sm">
                 {t.title}
               </h3>
            </div>
            <button onClick={toggleOpen} className="text-white/80 hover:text-white transition hover:rotate-90 duration-300">
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-5 overflow-y-auto min-h-[250px] max-h-[350px] text-sm text-nahida-text/90 relative bg-white/40">
            {!response && !isLoading && (
               <div className="flex flex-col items-center justify-center h-full text-nahida-muted/70 gap-3">
                  <svg className="w-10 h-10 animate-pulse-slow opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                  </svg>
                  <p className="italic font-serif">{lang === Language.EN ? "Connect to the Irminsul..." : "连接世界树..."}</p>
               </div>
            )}
            
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-nahida-primary gap-4">
                {/* Custom Dendro Loading Spinner */}
                <div className="relative w-12 h-12">
                   <div className="absolute inset-0 border-2 border-nahida-primary/20 rounded-full"></div>
                   <div className="absolute inset-0 border-t-2 border-nahida-primary rounded-full animate-spin"></div>
                   <div className="absolute inset-3 bg-nahida-primary/10 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xs tracking-widest uppercase font-bold opacity-80">{t.thinking}</span>
              </div>
            )}

            {response && (
              <div className="animate-fade-in">
                <div className="flex items-start gap-3 mb-4">
                   <div className="w-8 h-8 rounded-full bg-nahida-primary/10 flex-shrink-0 flex items-center justify-center text-lg border border-nahida-primary/20">
                     🥦
                   </div>
                   <div className="bg-white/80 p-4 rounded-2xl rounded-tl-none border border-nahida-gold/10 shadow-sm text-nahida-dark leading-relaxed">
                     {response}
                   </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white/60 border-t border-nahida-gold/10 backdrop-blur-sm">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConsult()}
                placeholder={t.placeholder}
                className="flex-1 pl-4 pr-10 py-3 rounded-xl bg-white/80 border border-nahida-accent/30 focus:outline-none focus:border-nahida-primary focus:ring-2 focus:ring-nahida-primary/20 text-sm transition-all placeholder:text-nahida-muted/60"
              />
              <button
                onClick={handleConsult}
                disabled={isLoading}
                className="absolute right-1 top-1 bottom-1 aspect-square bg-gradient-to-br from-nahida-primary to-nahida-accent text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">➤</span>
              </button>
            </div>
            <div className="text-[9px] text-nahida-muted mt-2 text-center uppercase tracking-widest opacity-60">{t.disclaimer}</div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={toggleOpen}
        className={`group relative w-16 h-16 rounded-full shadow-[0_4px_20px_rgba(88,182,117,0.4)] flex items-center justify-center transition-all duration-500 hover:scale-110 ${
          isOpen ? 'bg-nahida-dark rotate-90' : 'bg-[#fdfcf8]'
        }`}
      >
        {/* Rotating Ring around button */}
        {!isOpen && (
           <div className="absolute -inset-1 border border-nahida-primary/30 rounded-full animate-spin-slow border-dashed"></div>
        )}
        
        <div className={`w-full h-full rounded-full flex items-center justify-center ${isOpen ? 'text-white' : 'text-nahida-primary'}`}>
          {isOpen ? (
            <span className="text-2xl">✕</span>
          ) : (
            // Custom leaf icon
            <svg width="32" height="32" viewBox="0 0 24 24" className="drop-shadow-sm animate-float">
               <path fill="currentColor" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};