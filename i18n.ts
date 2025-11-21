import { Language, TranslationKeys } from './types';

export const TRANSLATIONS: Record<Language, TranslationKeys> = {
  [Language.EN]: {
    nav: {
      home: "Home",
      about: "About",
      posts: "Journal",
      contact: "Contact",
      akasha: "Akasha Terminal",
    },
    hero: {
      greeting: "Welcome, Traveler",
      title: "Sanctuary of Wisdom",
      subtitle: "A place to share dreams, knowledge, and the little wonders of the world.",
      cta: "Explore Entries",
    },
    akasha: {
      title: "Ask the Akasha",
      placeholder: "What knowledge do you seek?",
      send: "Consult",
      thinking: "Accessing Irminsul...",
      disclaimer: "The Akasha is powered by Gemini 2.5 Flash.",
    },
    common: {
      readMore: "Read Story",
      latestPosts: "Recent Dreams",
      footer: "© 2024 Sanctuary of Wisdom. Designed with Dendro energy.",
      back: "Close Dream",
      allCategories: "All Dreams",
      noPosts: "No dreams found in this category yet.",
    },
    about: {
      title: "About the Gardener",
      description: [
        "Welcome to my small corner of the internet. Like Nahida tending to the Sanctuary of Surasthana, I tend to this garden of thoughts and memories.",
        "I am a traveler exploring the intersection of technology and art, seeking wisdom in everyday life. This blog is a collection of my observations, tutorials, and whimsical musings.",
        "Here, knowledge is not a resource to be managed, but a song to be shared."
      ],
      stats: [
        { label: "Dreams Recorded", value: "100+" },
        { label: "Coffee Consumed", value: "∞" },
        { label: "World Level", value: "8" },
      ]
    },
    contact: {
      title: "Send a Bird",
      description: "Have a question or just want to say hello? You can reach me through the ley lines.",
      emailLabel: "Email Address",
      socialLabel: "Social Networks",
    }
  },
  [Language.CN]: {
    nav: {
      home: "首页",
      about: "关于",
      posts: "日志",
      contact: "联系",
      akasha: "虚空终端",
    },
    hero: {
      greeting: "欢迎，旅行者",
      title: "智慧的净善宫",
      subtitle: "分享梦境、知识与世间微小奇迹之地。",
      cta: "探索记录",
    },
    akasha: {
      title: "虚空终端",
      placeholder: "你寻求什么知识？",
      send: "咨询",
      thinking: "正在连接世界树...",
      disclaimer: "虚空终端已接入 Gemini 2.5 Flash 模型",
    },
    common: {
      readMore: "阅读故事",
      latestPosts: "最近的梦",
      footer: "© 2025 智慧的净善宫. 蕴含草元素之力.",
      back: "关闭梦境",
      allCategories: "所有梦境",
      noPosts: "该分类下暂无梦境",
    },
    about: {
      title: "关于园丁",
      description: [
        "欢迎来到我这互联网的一隅。就像纳西妲照料净善宫一样，我在此照料这片思想与记忆的花园。",
        "我是一名探索科技与艺术交汇点的旅行者，在日常生活中寻找智慧。这个博客汇集了我的观察、教程和一些异想天开的随想。",
        "在这里，知识不是需要被管理的资源，而是需要被分享的歌谣。"
      ],
      stats: [
        { label: "记录的梦", value: "100+" },
        { label: "消耗的咖啡", value: "∞" },
        { label: "世界等级", value: "8" },
      ]
    },
    contact: {
      title: "寄送暝彩鸟",
      description: "有问题或者只想打个招呼？你可以通过以下方式联系我",
      emailLabel: "电子邮箱",
      socialLabel: "社交网络",
    }
  },
};
