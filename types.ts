
export enum Language {
  EN = 'en',
  CN = 'cn',
}

export type PageView = 'home' | 'about' | 'posts' | 'contact';

export interface BlogPost {
  id: string;
  title: {
    [key in Language]: string;
  };
  excerpt: {
    [key in Language]: string;
  };
  content: {
    [key in Language]: string[];
  };
  date: string;
  category: string;
  imageUrl: string;
}

export interface TranslationKeys {
  nav: {
    home: string;
    about: string;
    posts: string;
    contact: string;
    akasha: string;
  };
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  akasha: {
    title: string;
    placeholder: string;
    send: string;
    thinking: string;
    disclaimer: string;
  };
  common: {
    readMore: string;
    latestPosts: string;
    footer: string;
    back: string;
    allCategories: string;
    noPosts: string;
  };
  about: {
    title: string;
    description: string[];
    stats: { label: string; value: string }[];
  };
  contact: {
    title: string;
    description: string;
    emailLabel: string;
    socialLabel: string;
  };
}
