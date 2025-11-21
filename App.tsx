import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, MOCK_POSTS } from './constants';
import { Language, BlogPost } from './types';
import { AkashaTerminal } from './components/AkashaTerminal';
import { BackgroundEffects } from './components/BackgroundEffects';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const t = TRANSLATIONS[lang];

  const toggleLang = () => {
    setLang(prev => prev === Language.EN ? Language.CN : Language.EN);
  };

  // Lock scroll when reading a post
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPost]);

  return (
    <>
      {!hasEntered && <WelcomeScreen onEnter={() => setHasEntered(true)} />}
      
      <div className={`min-h-screen relative overflow-x-hidden flex flex-col transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        
        <BackgroundEffects />
        
        {/* Top Navigation */}
        <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/60 border-b border-white/40 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              {/* Logo */}
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedPost(null)}>
                <div className="relative w-10 h-10 flex items-center justify-center">
                   <div className="absolute inset-0 bg-nahida-primary/20 rounded-full animate-pulse"></div>
                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-nahida-primary to-nahida-accent flex items-center justify-center text-white shadow-md group-hover:rotate-180 transition-transform duration-700">
                     <span className="text-lg">❀</span>
                   </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl text-nahida-dark tracking-wide leading-none">
                    Sanctuary
                  </span>
                  <span className="text-[10px] text-nahida-muted uppercase tracking-[0.2em]">of Wisdom</span>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-10">
                {[t.nav.home, t.nav.about, t.nav.posts, t.nav.contact].map((item) => (
                  <a key={item} href="#" className="text-nahida-text hover:text-nahida-primary font-serif font-medium text-sm transition-colors relative group py-2">
                    {item}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-nahida-gold transition-all duration-300 group-hover:w-full"></span>
                    <span className="absolute -top-1 right-0 opacity-0 group-hover:opacity-100 text-[8px] text-nahida-primary transition-all duration-300">✦</span>
                  </a>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleLang}
                  className="px-4 py-1.5 rounded-full border border-nahida-gold/30 bg-white/50 text-nahida-dark text-xs font-bold hover:bg-nahida-gold/10 hover:border-nahida-gold transition-all"
                >
                  {lang === Language.EN ? 'EN / 中文' : '中文 / EN'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section (Only show when no post is selected) */}
        {!selectedPost && (
          <header className="relative z-10 pt-32 pb-40 px-4">
            <div className="max-w-4xl mx-auto text-center">
              
              <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/60 backdrop-blur-sm border border-nahida-primary/20 rounded-full text-nahida-dark text-sm font-semibold animate-fade-in shadow-sm">
                <span className="text-nahida-primary">🌿</span> {t.hero.greeting}
              </div>
              
              <h1 className="font-serif text-6xl md:text-8xl text-nahida-dark mb-8 leading-tight animate-fade-in drop-shadow-sm" style={{ animationDelay: '0.1s' }}>
                {t.hero.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-nahida-text/80 max-w-2xl mx-auto mb-12 font-serif italic animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {t.hero.subtitle}
              </p>
              
              <div className="animate-fade-in flex justify-center" style={{ animationDelay: '0.3s' }}>
                <button className="group relative bg-nahida-dark text-white px-10 py-4 rounded-full font-bold shadow-[0_10px_20px_rgba(30,71,40,0.2)] hover:shadow-[0_15px_30px_rgba(30,71,40,0.3)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    {t.hero.cta} 
                    <span className="group-hover:rotate-180 transition-transform duration-500">❖</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-nahida-primary to-nahida-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Blog Grid Section (Only show when no post is selected) */}
        {!selectedPost && (
          <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 flex-grow">
            <div className="flex items-center gap-6 mb-16">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-nahida-gold/50 to-transparent flex-grow"></div>
              <div className="w-2 h-2 rotate-45 bg-nahida-gold/50"></div>
              <h2 className="font-serif text-3xl text-nahida-dark">{t.common.latestPosts}</h2>
              <div className="w-2 h-2 rotate-45 bg-nahida-gold/50"></div>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-nahida-gold/50 to-transparent flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {MOCK_POSTS.map((post, index) => (
                <article 
                  key={post.id} 
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(88,182,117,0.15)] transition-all duration-500 border border-white flex flex-col hover:-translate-y-2 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative overflow-hidden h-64">
                    <div className="absolute inset-0 bg-nahida-dark/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img 
                      src={post.imageUrl} 
                      alt={post.title[lang]} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-nahida-dark uppercase tracking-wider border border-nahida-primary/20">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col relative">
                    {/* Decorative Leaf */}
                    <div className="absolute -top-6 right-8 w-12 h-12 bg-nahida-base rounded-full flex items-center justify-center shadow-sm text-2xl group-hover:scale-110 transition-transform duration-300 z-20 border border-nahida-gold/20">
                       🌱
                    </div>

                    <div className="text-xs text-nahida-muted font-bold uppercase tracking-widest mb-3">{post.date}</div>
                    
                    <h3 className="font-serif text-2xl text-nahida-dark mb-4 font-semibold group-hover:text-nahida-primary transition-colors leading-snug">
                      {post.title[lang]}
                    </h3>
                    
                    <p className="text-nahida-text/70 text-sm leading-relaxed mb-8 flex-grow font-sans line-clamp-3">
                      {post.excerpt[lang]}
                    </p>
                    
                    <button className="text-nahida-primary font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest mt-auto">
                      {t.common.readMore} 
                      <span className="bg-nahida-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">➜</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </main>
        )}

        {/* Reading Mode Overlay */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
            <div 
              className="absolute inset-0 bg-nahida-dark/30 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
            ></div>
            
            <div className="relative bg-nahida-base w-full max-w-4xl h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/50">
               {/* Decorative background inside modal */}
               <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-nahida-primary/10 to-transparent pointer-events-none"></div>
               
               {/* Controls */}
               <div className="absolute top-6 right-8 z-10 flex gap-3">
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-nahida-primary hover:text-white transition-all shadow-md group"
                  >
                    <span className="group-hover:rotate-90 transition-transform duration-300 text-xl">✕</span>
                  </button>
               </div>

               {/* Content Scrollable Area */}
               <div className="overflow-y-auto h-full custom-scrollbar">
                 {/* Hero Image */}
                 <div className="h-72 md:h-96 relative w-full">
                   <img 
                     src={selectedPost.imageUrl} 
                     alt={selectedPost.title[lang]} 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-nahida-base to-transparent"></div>
                   
                   <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 pb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-nahida-primary/90 text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-lg backdrop-blur-md">
                        {selectedPost.category}
                      </span>
                      <h1 className="font-serif text-4xl md:text-6xl text-nahida-dark font-bold drop-shadow-sm leading-tight">
                        {selectedPost.title[lang]}
                      </h1>
                   </div>
                 </div>

                 {/* Body Text */}
                 <div className="px-8 md:px-16 pb-16 max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-10 text-nahida-muted text-sm font-bold uppercase tracking-widest border-b border-nahida-gold/20 pb-4">
                       <span>{selectedPost.date}</span>
                       <span className="w-1 h-1 bg-nahida-gold rounded-full"></span>
                       <span>By Nahida</span>
                    </div>

                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-nahida-dark text-nahida-text/80 leading-loose font-serif">
                       {selectedPost.content[lang].map((paragraph, idx) => (
                         <p key={idx} className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:text-nahida-primary first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                           {paragraph}
                         </p>
                       ))}
                    </div>

                    {/* End Ornament */}
                    <div className="flex justify-center mt-16 opacity-50">
                       <svg width="40" height="40" viewBox="0 0 24 24" className="text-nahida-primary animate-spin-slow">
                          <path fill="currentColor" d="M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5L12,2Z" />
                       </svg>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* Footer (Only show when no post is selected for cleaner UI) */}
        {!selectedPost && (
          <footer className="relative z-10 bg-white/80 border-t border-nahida-gold/20 py-16 backdrop-blur-md mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                
                <div className="mb-8 flex justify-center">
                  <div className="w-12 h-12 bg-nahida-primary/10 rounded-full flex items-center justify-center text-nahida-primary animate-pulse-slow">
                      ❀
                  </div>
                </div>

                <div className="flex justify-center gap-10 mb-10 text-nahida-dark font-serif text-sm tracking-widest uppercase">
                  <span className="hover:text-nahida-primary cursor-pointer transition-colors relative group">
                    Instagram
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-nahida-primary transition-all group-hover:w-full"></span>
                  </span>
                  <span className="hover:text-nahida-primary cursor-pointer transition-colors relative group">
                    Twitter
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-nahida-primary transition-all group-hover:w-full"></span>
                  </span>
                  <span className="hover:text-nahida-primary cursor-pointer transition-colors relative group">
                    HoYoLab
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-nahida-primary transition-all group-hover:w-full"></span>
                  </span>
                </div>
                <p className="text-xs text-nahida-text/50 font-serif">
                  {t.common.footer}
                </p>
            </div>
          </footer>
        )}

        {/* Akasha Chatbot - Always visible */}
        <AkashaTerminal lang={lang} t={t.akasha} />
      </div>
    </>
  );
};

export default App;