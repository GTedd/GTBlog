import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, MOCK_POSTS } from './constants';
import { Language, BlogPost, PageView } from './types';
import { AkashaTerminal } from './components/AkashaTerminal';
import { BackgroundEffects } from './components/BackgroundEffects';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ClickEffects } from './components/ClickEffects';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const t = TRANSLATIONS[lang];

  // Extract unique categories from posts
  const categories = ['All', ...new Set(MOCK_POSTS.map(post => post.category))];

  const toggleLang = () => {
    setLang(prev => prev === Language.EN ? Language.CN : Language.EN);
  };

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock scroll when reading a post
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPost]);

  // --- View Components ---

  const PostCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <article 
      className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(88,182,117,0.15)] transition-all duration-500 border border-white flex flex-col hover:-translate-y-2 cursor-pointer h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={(e) => {
        e.stopPropagation(); // Let the card click handler run but also bubble for effect if desired, 
        // but here we specifically want to open the post.
        setSelectedPost(post);
      }}
    >
      <div className="relative overflow-hidden h-64 shrink-0">
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
  );

  const HomeView = () => (
    <>
      <header className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/60 backdrop-blur-sm border border-nahida-primary/20 rounded-full text-nahida-dark text-sm font-semibold animate-fade-in shadow-sm">
            <span className="text-nahida-primary">🌿</span> {t.hero.greeting}
          </div>
          <h1 className="font-serif text-6xl md:text-8xl text-nahida-dark mb-8 leading-tight animate-fade-in drop-shadow-sm">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-nahida-text/80 max-w-2xl mx-auto mb-12 font-serif italic animate-fade-in">
            {t.hero.subtitle}
          </p>
          <div className="animate-fade-in flex justify-center">
            <button 
              onClick={(e) => { e.stopPropagation(); handleNavClick('posts'); }}
              className="group relative bg-nahida-dark text-white px-10 py-4 rounded-full font-bold shadow-[0_10px_20px_rgba(30,71,40,0.2)] hover:shadow-[0_15px_30px_rgba(30,71,40,0.3)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t.hero.cta} 
                <span className="group-hover:rotate-180 transition-transform duration-500">❖</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-nahida-primary to-nahida-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex items-center gap-6 mb-16">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-nahida-gold/50 to-transparent flex-grow"></div>
          <div className="w-2 h-2 rotate-45 bg-nahida-gold/50"></div>
          <h2 className="font-serif text-3xl text-nahida-dark">{t.common.latestPosts}</h2>
          <div className="w-2 h-2 rotate-45 bg-nahida-gold/50"></div>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-nahida-gold/50 to-transparent flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MOCK_POSTS.slice(0, 3).map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>
    </>
  );

  const PostsView = () => {
    const filteredPosts = selectedCategory === 'All' || selectedCategory === t.common.allCategories
      ? MOCK_POSTS 
      : MOCK_POSTS.filter(p => p.category === selectedCategory);

    return (
      <div className="max-w-7xl mx-auto px-4 py-32 min-h-screen">
         <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-serif text-5xl text-nahida-dark mb-6">{t.nav.posts}</h1>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(cat => {
                 const label = cat === 'All' ? t.common.allCategories : cat;
                 const isActive = (cat === 'All' && (selectedCategory === 'All' || selectedCategory === t.common.allCategories)) || cat === selectedCategory;
                 return (
                  <button
                    key={cat}
                    onClick={(e) => { e.stopPropagation(); setSelectedCategory(cat); }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                      isActive 
                        ? 'bg-nahida-primary text-white border-nahida-primary shadow-lg scale-105' 
                        : 'bg-white/50 text-nahida-text border-nahida-gold/30 hover:bg-white hover:border-nahida-primary'
                    }`}
                  >
                    {label}
                  </button>
                 )
              })}
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-nahida-muted font-serif italic">
                {t.common.noPosts}
              </div>
            )}
         </div>
      </div>
    );
  };

  const AboutView = () => (
    <div className="max-w-5xl mx-auto px-4 py-32 min-h-screen flex flex-col md:flex-row items-center gap-16 animate-fade-in">
       <div className="w-full md:w-1/2 relative">
          <div className="aspect-[3/4] rounded-[3rem] overflow-hidden border-[8px] border-white shadow-2xl relative z-10">
             <img src="https://picsum.photos/id/64/800/1200" alt="Profile" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-nahida-dark/10"></div>
          </div>
          {/* Decorative Elements behind image */}
          <div className="absolute top-10 -right-10 w-full h-full border-2 border-nahida-gold/30 rounded-[3rem] z-0"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-nahida-primary/20 rounded-full blur-3xl"></div>
       </div>

       <div className="w-full md:w-1/2">
          <h1 className="font-serif text-5xl text-nahida-dark mb-8 leading-tight">
            {t.about.title}
          </h1>
          <div className="space-y-6 text-lg text-nahida-text/80 font-serif leading-relaxed mb-10">
            {t.about.description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {t.about.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/60 p-4 rounded-2xl text-center border border-nahida-gold/10 shadow-sm">
                 <div className="text-2xl font-bold text-nahida-primary mb-1">{stat.value}</div>
                 <div className="text-xs text-nahida-muted uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
       </div>
    </div>
  );

  const ContactView = () => (
    <div className="max-w-3xl mx-auto px-4 py-32 min-h-screen flex flex-col justify-center animate-fade-in">
       <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-10 md:p-16 shadow-xl border border-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-nahida-primary/10 to-transparent rounded-bl-[100%]"></div>
          
          <div className="relative z-10 text-center">
             <div className="w-20 h-20 bg-nahida-base rounded-full mx-auto mb-8 flex items-center justify-center text-4xl shadow-md border border-nahida-gold/20">
                🕊️
             </div>
             <h1 className="font-serif text-4xl md:text-5xl text-nahida-dark mb-6">{t.contact.title}</h1>
             <p className="text-xl text-nahida-text/70 mb-12 font-serif italic max-w-xl mx-auto">
               {t.contact.description}
             </p>

             <div className="space-y-8 max-w-md mx-auto">
                <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-nahida-gold/10 cursor-pointer">
                   <div className="text-xs text-nahida-muted uppercase tracking-widest mb-2">{t.contact.emailLabel}</div>
                   <div className="text-xl font-bold text-nahida-dark group-hover:text-nahida-primary transition-colors">
                     nahida@sanctuary.wisdom
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                   {['Twitter', 'Instagram', 'GitHub'].map(social => (
                     <button key={social} className="py-4 rounded-xl bg-nahida-primary/5 hover:bg-nahida-primary hover:text-white transition-all text-nahida-dark font-bold text-sm">
                       {social}
                     </button>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <>
      <ClickEffects />
      {!hasEntered && <WelcomeScreen onEnter={() => setHasEntered(true)} />}
      
      <div className={`min-h-screen relative overflow-x-hidden flex flex-col transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        
        <BackgroundEffects />
        
        {/* Top Navigation */}
        <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/60 border-b border-white/40 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              {/* Logo */}
              <div className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.stopPropagation(); handleNavClick('home'); }}>
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
                {[
                  { label: t.nav.home, view: 'home' },
                  { label: t.nav.about, view: 'about' },
                  { label: t.nav.posts, view: 'posts' },
                  { label: t.nav.contact, view: 'contact' }
                ].map((item) => (
                  <button 
                    key={item.label} 
                    onClick={(e) => { e.stopPropagation(); handleNavClick(item.view as PageView); }}
                    className={`text-sm font-serif font-medium transition-colors relative group py-2 ${
                      currentView === item.view ? 'text-nahida-primary' : 'text-nahida-text hover:text-nahida-primary'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-nahida-gold transition-all duration-300 ${
                      currentView === item.view ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleLang(); }}
                  className="px-4 py-1.5 rounded-full border border-nahida-gold/30 bg-white/50 text-nahida-dark text-xs font-bold hover:bg-nahida-gold/10 hover:border-nahida-gold transition-all"
                >
                  {lang === Language.EN ? 'EN / 中文' : '中文 / EN'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow">
          {currentView === 'home' && <HomeView />}
          {currentView === 'posts' && <PostsView />}
          {currentView === 'about' && <AboutView />}
          {currentView === 'contact' && <ContactView />}
        </main>

        {/* Reading Mode Overlay */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
            <div 
              className="absolute inset-0 bg-nahida-dark/30 backdrop-blur-sm"
              onClick={(e) => { e.stopPropagation(); setSelectedPost(null); }}
            ></div>
            
            <div className="relative bg-nahida-base w-full max-w-4xl h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/50">
               {/* Decorative background inside modal */}
               <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-nahida-primary/10 to-transparent pointer-events-none"></div>
               
               {/* Controls */}
               <div className="absolute top-6 right-8 z-10 flex gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedPost(null); }}
                    className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-nahida-primary hover:text-white transition-all shadow-md group"
                  >
                    <span className="group-hover:rotate-90 transition-transform duration-300 text-xl">✕</span>
                  </button>
               </div>

               {/* Content Scrollable Area */}
               <div className="overflow-y-auto h-full custom-scrollbar">
                 {/* Hero Image */}
                 <div className="h-72 md:h-96 relative w-full shrink-0">
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

        {/* Footer */}
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

        {/* Akasha Chatbot - Always visible */}
        <AkashaTerminal lang={lang} t={t.akasha} />
      </div>
    </>
  );
};

export default App;