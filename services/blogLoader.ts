import type { BlogPost } from '../types';

const parseFrontmatter = (raw: string) => {
  const start = raw.indexOf('---');
  if (start !== 0) return {} as Record<string, string>;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return {} as Record<string, string>;
  const fm = raw.slice(3, end).trim();
  const meta: Record<string, string> = {};
  fm.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2];
  });
  return meta;
};

const extractSection = (raw: string, header: string) => {
  const idx = raw.toLowerCase().indexOf(`## ${header.toLowerCase()}`);
  if (idx === -1) return [] as string[];
  const after = raw.slice(idx).replace(/^.*?\n/, '');
  const nextIdx = after.toLowerCase().indexOf('\n## ');
  const body = nextIdx !== -1 ? after.slice(0, nextIdx) : after;
  return body.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
};

const slugFromPath = (path: string) => {
  const base = path.replace(/\\/g, '/').split('/').pop() || '';
  return base.replace(/\.md$/i, '').replace(/\.json$/i, '');
};

export const loadBlogPosts = (): BlogPost[] => {
  const jsonModules = import.meta.glob('../blogs/**/*.json', { eager: true });
  const mdModules = import.meta.glob('../blogs/**/*.md', { query: '?raw', import: 'default', eager: true });

  const jsonPosts: BlogPost[] = Object.values(jsonModules).map((mod: any) => {
    const data = mod?.default ?? mod;
    return data as BlogPost;
  });

  const mdPosts: BlogPost[] = Object.entries(mdModules).map(([path, raw]) => {
    const text = String(raw);
    const meta = parseFrontmatter(text);
    const bodyStart = text.indexOf('\n---', 3);
    const body = bodyStart !== -1 ? text.slice(bodyStart + 4).trim() : text.trim();
    const enParas = extractSection(body, 'en');
    const cnParas = extractSection(body, 'cn');
    const id = meta.id || slugFromPath(path);
    const titleEn = meta.title_en || enParas[0] || 'Untitled';
    const titleCn = meta.title_cn || cnParas[0] || '未命名';
    const excerptEn = meta.excerpt_en || enParas[1] || enParas[0] || titleEn;
    const excerptCn = meta.excerpt_cn || cnParas[1] || cnParas[0] || titleCn;
    const imageUrl = meta.imageUrl || 'https://picsum.photos/id/28/800/600';
    const date = meta.date || new Date().toISOString().slice(0, 10);
    const category = meta.category || 'General';
    return {
      id,
      title: { en: titleEn, cn: titleCn },
      excerpt: { en: excerptEn, cn: excerptCn },
      content: { en: enParas, cn: cnParas },
      date,
      category,
      imageUrl,
    } as BlogPost;
  });

  const posts = [...jsonPosts, ...mdPosts];
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};
