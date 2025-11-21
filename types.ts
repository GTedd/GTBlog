export enum Language {
  EN = 'en',
  CN = 'cn',
}

export interface BlogPost {
  id: string;
  title: {
    [key in Language]: string;
  };
  excerpt: {
    [key in Language]: string;
  };
  // Added content field: An array of strings, where each string is a paragraph
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
    back: string; // Added back button
  };
}