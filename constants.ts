
import { Language, BlogPost, TranslationKeys } from './types';

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
      title: "咨询虚空",
      placeholder: "你寻求什么知识？",
      send: "咨询",
      thinking: "正在连接世界树...",
      disclaimer: "虚空终端由 Gemini 2.5 Flash 提供支持。",
    },
    common: {
      readMore: "阅读故事",
      latestPosts: "最近的梦",
      footer: "© 2025 智慧的净善宫. 蕴含草元素之力.",
      back: "关闭梦境",
      allCategories: "所有梦境",
      noPosts: "该分类下暂无梦境。",
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
      description: "有问题或者只想打个招呼？你可以通过地脉联系我。",
      emailLabel: "电子邮箱",
      socialLabel: "社交网络",
    }
  },
};

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: {
      en: 'The Language of Flowers',
      cn: '花语的秘密',
    },
    excerpt: {
      en: 'Understanding what the forest whispers when the wind blows through the leaves.',
      cn: '当风吹过树叶时，森林在低语什么？解读自然的秘密语言。',
    },
    content: {
      en: [
        "Have you ever listened closely to the rustling leaves? In Sumeru, we believe that every plant has a memory, a story to tell. The wind carries these stories across the mountains, whispering secrets to those who know how to listen.",
        "Scientific research shows that plants communicate through chemical signals, but I prefer the romantic interpretation: they are singing a slow, ancient song about the sun, the rain, and the earth.",
        "Next time you see a flower blooming, pause for a moment. It might be greeting you."
      ],
      cn: [
        "你是否曾仔细倾听过树叶的沙沙声？在须弥，我们相信每一株植物都有记忆，都有故事要诉说。风将这些故事带过群山，向懂得倾听的人低语着秘密。",
        "科学研究表明，植物通过化学信号进行交流，但我更喜欢浪漫的解读：它们正在唱着一首关于太阳、雨水和大地古老而缓慢的歌。",
        "下次当你看到花朵盛开时，请停下来片刻。它可能正在向你问好。"
      ]
    },
    date: '2024-05-20',
    category: 'Nature',
    imageUrl: 'https://picsum.photos/id/28/800/600', 
  },
  {
    id: '2',
    title: {
      en: 'Analyzing Dreams',
      cn: '梦境解析',
    },
    excerpt: {
      en: 'Dreams are not just random images; they are the processing of our deepest emotions.',
      cn: '梦不仅仅是随机的图像，它们是我们最深层情感的处理过程。',
    },
    content: {
      en: [
        "The Akasha Terminal once harvested dreams, but now we understand their true value. Dreams are the mind's way of organizing chaos into order.",
        "When we sleep, our subconscious paints with colors we've never seen and speaks in riddles we must decipher. It is a personal domain where the laws of physics do not apply, only the laws of emotion.",
        "Do not fear the nightmare, for it is merely a question your heart is asking. Do not cling to the sweet dream, for it is a fleeting comfort. Observe them all, and you will know yourself."
      ],
      cn: [
        "虚空终端曾经收割梦境，但现在我们明白了它们真正的价值。梦是心灵将混乱整理为秩序的方式。",
        "当我们沉睡时，潜意识用我们从未见过的颜色作画，用我们需要解读的谜语说话。这是一个私人领域，物理定律不适用，适用的只有情感定律。",
        "不要害怕噩梦，因为它只是你内心提出的一个问题。不要执着于美梦，因为那是转瞬即逝的慰藉。观察它们，你将认识你自己。"
      ]
    },
    date: '2024-05-18',
    category: 'Philosophy',
    imageUrl: 'https://picsum.photos/id/104/800/600', 
  },
  {
    id: '3',
    title: {
      en: 'A Guide to Aranara',
      cn: '兰那罗指南',
    },
    excerpt: {
      en: 'Meeting the small spirits of the forest and learning their whimsical songs.',
      cn: '遇见森林中的小精灵，学习它们那异想天开的歌谣。',
    },
    content: {
      en: [
        "If you walk deep enough into the forest and your heart is pure, you might see a small, round figure with a leafy hat. These are the Aranara, the children of the forest.",
        "They love music, so bring a lyre. They love stories, so bring your memories. But most of all, they value kindness.",
        "Remember: the forest remembers everything."
      ],
      cn: [
        "如果你走进森林深处，并且心地纯洁，你可能会看到一个戴着叶子帽子的小圆身影。它们是兰那罗，森林的孩子。",
        "它们喜欢音乐，所以带上你的琴。它们喜欢故事，所以带上你的记忆。但最重要的是，它们珍视善良。",
        "记住：森林会记住一切。"
      ]
    },
    date: '2024-05-15',
    category: 'Guide',
    imageUrl: 'https://picsum.photos/id/88/800/600', 
  },
];

/**
 * =================================================
 *  🆕 NEW POST TEMPLATE / 新文章模板
 * =================================================
 * 
 * Copy the block below and paste it into the MOCK_POSTS array above.
 * 复制下方的代码块并粘贴到上方的 MOCK_POSTS 数组中。
 * 
 * {
 *   id: 'unique_id_here', // e.g., '4'
 *   title: {
 *     en: 'Title in English',
 *     cn: '中文标题',
 *   },
 *   excerpt: {
 *     en: 'Short summary for the card.',
 *     cn: '卡片上显示的简短摘要。',
 *   },
 *   content: {
 *     en: [
 *       "Paragraph 1...",
 *       "Paragraph 2..."
 *     ],
 *     cn: [
 *       "第一段内容...",
 *       "第二段内容..."
 *     ]
 *   },
 *   date: 'YYYY-MM-DD',
 *   category: 'CategoryName', // e.g., 'Tech', 'Life'
 *   imageUrl: 'https://picsum.photos/id/100/800/600',
 * },
 */
