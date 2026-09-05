import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  History,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';

import {blogArticles} from './blog/articles';
import {BlogArticlePage, BlogPage} from './blog/BlogPages';

const startWritingUrl = 'https://ink-frontend.suoxya.com';
const repositoryUrl = 'https://github.com/glide-the/ink-and-memory';
const blogUrl = '/blog/';

type Locale = 'zh' | 'en';

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

type PreviewItem = {
  label: string;
  title: string;
  meta: string;
  state?: 'accent' | 'success';
};

type HowStep = {
  shortLabel: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  previewTitle: string;
  previewItems: PreviewItem[];
  result: string;
};

type ProductExample = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  steps: string[];
  mode: 'library' | 'team' | 'character';
  media: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
};

type UseCase = {
  label: string;
  title: string;
  description: string;
  result: string;
};

type HomeCopy = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  homeHref: string;
  languageHref: string;
  languageLabel: string;
  skipLabel: string;
  nav: {
    how: string;
    memory: string;
    blog: string;
    write: string;
    open: string;
    close: string;
    label: string;
  };
  hero: {
    eyebrow: string;
    title: [string, string];
    lead: string;
    primaryAction: string;
    secondaryAction: string;
    trustNote: string;
  };
  platform: {
    sources: string[];
  };
  useCases: {
    eyebrow: string;
    title: string;
    description: string;
    items: UseCase[];
  };
  examples: {
    tabLabel: string;
    cases: ProductExample[];
  };
  topology: {
    eyebrow: string;
    nodes: Array<{label: string; meta: string}>;
    feedback: string;
  };
  how: {
    eyebrow: string;
    tabLabel: string;
    steps: HowStep[];
  };
  final: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
};

const homeCopy: Record<Locale, HomeCopy> = {
  zh: {
    metaTitle: 'Ink & Memory | 写作、回看与长期思维整理',
    metaDescription:
      'Ink & Memory 为持续写日记、做长期创作、整理复杂想法的人提供每日写作、历史检索、AI 深入建议、Reflections 分析和可复用 Deck。',
    canonicalUrl: 'https://suoxya.com/',
    homeHref: '/',
    languageHref: '/en/',
    languageLabel: 'English',
    skipLabel: '跳到主要内容',
    nav: {
      how: '怎么使用',
      memory: '使用场景',
      blog: 'Blog',
      write: '打开工作台',
      open: '打开导航',
      close: '关闭导航',
      label: '主导航',
    },
    hero: {
      eyebrow: 'AI 写作陪伴 · 个人记忆',
      title: ['写下来，', '听见自己'],
      lead: '写日记、做长期创作、整理复杂想法。Ink & Memory 会保存你的文字，结合历史内容提供反馈，并整理反复出现的主题与思维模式。',
      primaryAction: '开始今天的书写',
      secondaryAction: '查看使用场景',
      trustNote: '自动保存 · 历史检索 · 操作确认',
    },
    platform: {
      sources: ['Notion', '飞书', 'Obsidian', 'Flomo'],
    },
    useCases: {
      eyebrow: 'Use cases',
      title: '从今天的问题开始。',
      description: '写下内容，调用记忆，获得反馈，保存长期结果。',
      items: [
        {
          label: '每日书写',
          title: '把今天写下来',
          description: '按日期进入当天页面。文字自动保存，语音也可转成正文。',
          result: '日记 · 随笔 · 灵感',
        },
        {
          label: '深入一句话',
          title: '继续想清楚',
          description: '在当前段落点“深入一下”。建议流式出现，你可以同时继续写。',
          result: '手动触发 · 保留历史',
        },
        {
          label: '找回旧内容',
          title: '回到过去写过的主题',
          description: '按日期、标签和关键词检索旧记录，把相关片段带入当前对话。',
          result: '最近三天 · 更早记录按需检索',
        },
        {
          label: '长期回看',
          title: '识别反复出现的模式',
          description: '生成回响、性格特质和行为模式分析，并保存每次报告。',
          result: 'Echoes · Traits · Patterns',
        },
      ],
    },
    examples: {
      tabLabel: 'Ink & Memory 实际使用场景',
      cases: [
        {
          label: 'Deck 库',
          eyebrow: '场景 01 · 常用工作方式',
          title: '把常用写作方式保存成 Deck',
          description: '把 Agent、提示词、资源链接和插件放进同一个 Deck。写日记、做复盘或开始创作时，直接打开继续。',
          outcome: '可用 Deck · 内容版本',
          steps: ['搜索', '选择', '开始'],
          mode: 'library',
          media: [
            {
              src: '/product-examples/deck-library.webp',
              alt: 'Ink Memory Deck 库界面，展示搜索、分类和可用 Deck 列表',
              caption: 'Deck 库',
            },
          ],
        },
        {
          label: '创作团队',
          eyebrow: '场景 02 · 长篇创作',
          title: '让多个创作角色处理同一个目标',
          description: '编剧推进剧情，结构师检查节奏，人物塑造师维护角色一致性。每个角色保留职责和对话。',
          outcome: 'Dream · 多智能体协作',
          steps: ['创作目标', '角色分工', '结果审阅'],
          mode: 'team',
          media: [
            {
              src: '/product-examples/deck-team.webp',
              alt: '剧本创作团队 Deck，包含编剧、戏剧结构师和人物塑造师',
              caption: '剧本创作团队',
            },
          ],
        },
        {
          label: '角色资料',
          eyebrow: '场景 03 · 人物档案',
          title: '把人物设定、关系和修订记录放在一起',
          description: '角色资料、人物弧光、关系图谱和视觉结果同步查看。继续创作时直接调用已有事实。',
          outcome: '人物档案 · 创作连续性',
          steps: ['资料', '关系', '版本'],
          mode: 'character',
          media: [
            {
              src: '/product-examples/character-record.webp',
              alt: 'Ink Memory 中沈清音角色的结构化资产资料表',
              caption: '沈清音 · 结构化资料',
            },
            {
              src: '/product-examples/shen-qingyin.webp',
              alt: '沈清音角色小传、关系图谱、人物弧光和造型设定图',
              caption: '主角 · 沈清音',
            },
            {
              src: '/product-examples/ruan-xiaoying.webp',
              alt: '阮小萤角色外形、服装、性格和表情设定图',
              caption: '配角 · 阮小萤',
            },
          ],
        },
      ],
    },
    topology: {
      eyebrow: '从书写到长期记忆',
      nodes: [
        {label: '写下内容', meta: '日记 · 灵感 · 项目'},
        {label: '调用记忆', meta: '近期内容 · 历史检索'},
        {label: '选择帮助', meta: '深入一下 · Chat · Dream'},
        {label: '分工处理', meta: '写作 · 结构 · 人物'},
        {label: '检查结果', meta: '证据 · 版本 · 确认'},
        {label: '保存 Deck', meta: '下次继续使用'},
      ],
      feedback: '写作历史 → 下一次对话',
    },
    how: {
      eyebrow: 'How it works',
      tabLabel: 'Ink & Memory 使用流程',
      steps: [
        {
          shortLabel: '书写',
          label: '开始书写',
          title: '打开今天的页面',
          description: '日期自动建立 · 文字持续保存 · 语音可输入',
          bullets: ['日记', '随笔', '灵感'],
          previewTitle: '今日书写',
          previewItems: [
            {label: '今日页面', title: '2026-09-05', meta: '自动建立', state: 'success'},
            {label: '保存', title: '输入后持续保存', meta: '已落地'},
            {label: '语音', title: '转成可编辑正文', meta: '可用'},
          ],
          result: '文字已保存',
        },
        {
          shortLabel: '深入',
          label: '深入一下',
          title: '点一下，继续想清楚',
          description: '当前段落 · 手动触发 · 流式建议',
          bullets: ['不打断输入', '建议保留', '可重新生成'],
          previewTitle: '写作建议',
          previewItems: [
            {label: '锚点', title: '当前段落', meta: '点击时快照', state: 'accent'},
            {label: '建议', title: '流式返回', meta: '可继续写'},
            {label: '历史', title: '旧建议', meta: '只读保留', state: 'success'},
          ],
          result: '建议已保存',
        },
        {
          shortLabel: '检索',
          label: '调用记忆',
          title: '找回相关记录',
          description: '日期 · 标签 · 关键词',
          bullets: ['最近三天', '更早记录', '相关片段'],
          previewTitle: '历史记忆',
          previewItems: [
            {label: '近期', title: '最近三天', meta: '自动带入'},
            {label: '历史', title: '关键词检索', meta: '按需读取'},
            {label: '标签', title: '主题筛选', meta: '可组合', state: 'accent'},
          ],
          result: '相关内容已找到',
        },
        {
          shortLabel: '回看',
          label: '生成回响',
          title: '查看长期模式',
          description: '回响 · 性格特质 · 行为模式',
          bullets: ['选择日记', '生成分析', '保存报告'],
          previewTitle: 'Reflections',
          previewItems: [
            {label: '回响', title: '反复主题', meta: '已生成', state: 'accent'},
            {label: '特质', title: '稳定倾向', meta: '有证据'},
            {label: '模式', title: '节奏与应对', meta: '等待确认', state: 'success'},
          ],
          result: '报告已保存',
        },
      ],
    },
    final: {
      eyebrow: 'Write · Recall · Reflect',
      title: '开始今天的书写',
      description: '适合持续写日记、做长期创作、整理复杂想法的人。写下第一句话，IM 会自动保存、结合你的历史内容提供反馈，并逐步整理出反复出现的主题与思维模式。',
      primaryAction: '开始今天的书写',
      secondaryAction: '查看真实 Deck',
    },
  },
  en: {
    metaTitle: 'Ink & Memory | Write, recall, and understand your patterns',
    metaDescription:
      'Ink & Memory gives journalers, long-form creators, and deep thinkers a daily writing space, memory retrieval, focused AI suggestions, Reflections, and reusable Decks.',
    canonicalUrl: 'https://suoxya.com/en/',
    homeHref: '/en/',
    languageHref: '/',
    languageLabel: '中文',
    skipLabel: 'Skip to main content',
    nav: {
      how: 'How it works',
      memory: 'Use cases',
      blog: 'Blog',
      write: 'Open workbench',
      open: 'Open navigation',
      close: 'Close navigation',
      label: 'Primary navigation',
    },
    hero: {
      eyebrow: 'AI writing companion · Personal memory',
      title: ['Write it down.', 'Hear yourself.'],
      lead: 'Journal, build long-form stories, and work through complex thoughts. Ink & Memory saves your words, recalls useful context, and surfaces the themes and patterns you return to.',
      primaryAction: 'Start writing today',
      secondaryAction: 'See use cases',
      trustNote: 'Autosave · Memory retrieval · User approval',
    },
    platform: {
      sources: ['Notion', 'Feishu', 'Obsidian', 'Flomo'],
    },
    useCases: {
      eyebrow: 'Use cases',
      title: 'Start with today’s question.',
      description: 'Write. Recall. Get focused feedback. Keep what matters.',
      items: [
        {
          label: 'Daily writing',
          title: 'Put today into words',
          description: 'Open today’s dated page. Your text saves continuously, and voice can become editable prose.',
          result: 'Journal · Notes · Ideas',
        },
        {
          label: 'Go deeper',
          title: 'Stay with one important line',
          description: 'Select “Go deeper” on the current paragraph. A suggestion streams in while you keep writing.',
          result: 'Manual trigger · Saved history',
        },
        {
          label: 'Recall',
          title: 'Return to an older theme',
          description: 'Find past entries by date, label, and keyword, then bring the relevant passages into the conversation.',
          result: 'Recent three days · Older entries on demand',
        },
        {
          label: 'Reflect',
          title: 'See recurring patterns',
          description: 'Generate and save analyses of recurring themes, stable traits, and behavioral patterns.',
          result: 'Echoes · Traits · Patterns',
        },
      ],
    },
    examples: {
      tabLabel: 'Real Ink & Memory use cases',
      cases: [
        {
          label: 'Deck library',
          eyebrow: 'Use case 01 · Saved ways of working',
          title: 'Keep a repeatable writing setup as a Deck',
          description: 'Place agents, prompts, resource links, and plugins in one Deck. Open it when you journal, review, or begin a creative session.',
          outcome: 'Available Deck · Versioned content',
          steps: ['Search', 'Choose', 'Start'],
          mode: 'library',
          media: [
            {
              src: '/product-examples/deck-library.webp',
              alt: 'Ink Memory Deck library with search, filters, and available Decks',
              caption: 'Deck library',
            },
          ],
        },
        {
          label: 'Creative team',
          eyebrow: 'Use case 02 · Long-form creation',
          title: 'Give one creative goal to several roles',
          description: 'A writer advances the story, a structure agent checks rhythm, and a character agent protects continuity. Each role keeps a clear responsibility and thread.',
          outcome: 'Dream · Multi-agent collaboration',
          steps: ['Creative goal', 'Role assignment', 'Review'],
          mode: 'team',
          media: [
            {
              src: '/product-examples/deck-team.webp',
              alt: 'Screenwriting Deck with writer, dramatic structure, and character agents',
              caption: 'Screenwriting team',
            },
          ],
        },
        {
          label: 'Character bible',
          eyebrow: 'Use case 03 · Character record',
          title: 'Keep character facts, relationships, and revisions together',
          description: 'Review structured facts, character arcs, relationship maps, and visual outputs in one place. Reuse those facts in the next writing session.',
          outcome: 'Character record · Creative continuity',
          steps: ['Facts', 'Relationships', 'Versions'],
          mode: 'character',
          media: [
            {
              src: '/product-examples/character-record.webp',
              alt: 'Structured character record for Shen Qingyin in Ink Memory',
              caption: 'Shen Qingyin · structured record',
            },
            {
              src: '/product-examples/shen-qingyin.webp',
              alt: 'Shen Qingyin character biography, relationship map, arc, and visual sheet',
              caption: 'Lead · Shen Qingyin',
            },
            {
              src: '/product-examples/ruan-xiaoying.webp',
              alt: 'Ruan Xiaoying appearance, wardrobe, traits, and expression sheet',
              caption: 'Support · Ruan Xiaoying',
            },
          ],
        },
      ],
    },
    topology: {
      eyebrow: 'From writing to long-term memory',
      nodes: [
        {label: 'Write', meta: 'Journal · Idea · Project'},
        {label: 'Recall', meta: 'Recent context · Search'},
        {label: 'Choose help', meta: 'Go deeper · Chat · Dream'},
        {label: 'Assign roles', meta: 'Writing · Structure · Character'},
        {label: 'Review', meta: 'Evidence · Version · Approval'},
        {label: 'Save Deck', meta: 'Reuse next time'},
      ],
      feedback: 'Writing history → Next conversation',
    },
    how: {
      eyebrow: 'Workflow',
      tabLabel: 'Ink & Memory workflow',
      steps: [
        {
          shortLabel: 'Write',
          label: 'Start writing',
          title: 'Open today’s page',
          description: 'Dated automatically · Continuously saved · Voice ready',
          bullets: ['Journal', 'Notes', 'Ideas'],
          previewTitle: 'Today’s writing',
          previewItems: [
            {label: 'Today', title: '2026-09-05', meta: 'Created automatically', state: 'success'},
            {label: 'Save', title: 'Continuous autosave', meta: 'Stored'},
            {label: 'Voice', title: 'Editable transcript', meta: 'Available'},
          ],
          result: 'Writing saved',
        },
        {
          shortLabel: 'Deepen',
          label: 'Go deeper',
          title: 'Stay with one important line',
          description: 'Current paragraph · Manual trigger · Streaming suggestion',
          bullets: ['Keep typing', 'Saved history', 'Regenerate'],
          previewTitle: 'Writing suggestion',
          previewItems: [
            {label: 'Anchor', title: 'Current paragraph', meta: 'Snapshot on click', state: 'accent'},
            {label: 'Suggestion', title: 'Streaming response', meta: 'Keep writing'},
            {label: 'History', title: 'Earlier suggestions', meta: 'Read only', state: 'success'},
          ],
          result: 'Suggestion saved',
        },
        {
          shortLabel: 'Recall',
          label: 'Recall memory',
          title: 'Find related writing',
          description: 'Date · Label · Keyword',
          bullets: ['Recent three days', 'Older entries', 'Relevant passages'],
          previewTitle: 'Writing memory',
          previewItems: [
            {label: 'Recent', title: 'Latest three days', meta: 'Included automatically'},
            {label: 'Archive', title: 'Keyword retrieval', meta: 'Read on demand'},
            {label: 'Labels', title: 'Topic filter', meta: 'Composable', state: 'accent'},
          ],
          result: 'Related writing found',
        },
        {
          shortLabel: 'Reflect',
          label: 'Generate reflections',
          title: 'Review long-term patterns',
          description: 'Echoes · Traits · Behavioral patterns',
          bullets: ['Select entries', 'Generate analysis', 'Save report'],
          previewTitle: 'Reflections',
          previewItems: [
            {label: 'Echoes', title: 'Recurring themes', meta: 'Generated', state: 'accent'},
            {label: 'Traits', title: 'Stable tendencies', meta: 'Evidence linked'},
            {label: 'Patterns', title: 'Rhythms and responses', meta: 'Awaiting review', state: 'success'},
          ],
          result: 'Report saved',
        },
      ],
    },
    final: {
      eyebrow: 'Write · Recall · Reflect',
      title: 'Start writing today',
      description: 'Built for people who journal consistently, create over time, or work through complex thoughts. Write the first line; IM saves it, recalls relevant history, and helps you see recurring themes and patterns.',
      primaryAction: 'Start writing today',
      secondaryAction: 'See real Decks',
    },
  },
};

type ExternalAwareLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  external?: boolean;
  onClick?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'children' | 'onClick'>;

function ExternalAwareLink({children, className, href, external, onClick, ...anchorProps}: ExternalAwareLinkProps) {
  return (
    <a
      className={className}
      href={href}
      onClick={onClick}
      rel={external ? 'noreferrer' : undefined}
      target={external ? '_blank' : undefined}
      {...anchorProps}
    >
      {children}
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerCompact, setHeaderCompact] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const normalizedPath =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/';
  const currentArticle =
    normalizedPath.startsWith('/blog/') ?
      blogArticles.find((article) => normalizedPath === `/blog/${article.slug}`)
    : undefined;
  const isBlogPage = normalizedPath === '/blog' || Boolean(currentArticle);
  const locale: Locale =
    normalizedPath === '/en' || normalizedPath.startsWith('/en/') || currentArticle?.language === 'English' ? 'en' : 'zh';
  const copy = homeCopy[locale];

  const navItems: NavItem[] = [
    {label: copy.nav.how, href: `${copy.homeHref}#how-it-works`},
    {label: copy.nav.memory, href: `${copy.homeHref}#use-cases`},
    {label: copy.nav.blog, href: blogUrl},
  ];

  useEffect(() => {
    if (!currentArticle) {
      setHeaderCompact(false);
      return;
    }

    let animationFrame = 0;
    const updateHeader = () => {
      const articleHeader = document.querySelector<HTMLElement>('.blog-detail-header');
      setHeaderCompact(Boolean(articleHeader && articleHeader.getBoundingClientRect().bottom <= 0));
      animationFrame = 0;
    };
    const requestHeaderUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateHeader);
      }
    };

    updateHeader();
    window.addEventListener('scroll', requestHeaderUpdate, {passive: true});
    window.addEventListener('resize', requestHeaderUpdate);
    return () => {
      window.removeEventListener('scroll', requestHeaderUpdate);
      window.removeEventListener('resize', requestHeaderUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [currentArticle]);

  useEffect(() => {
    if (headerCompact) setMenuOpen(false);
  }, [headerCompact]);

  useEffect(() => {
    if (!menuOpen) return;

    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>('main, .site-footer, .brand-link, .header-actions'),
    );
    const previousInert = inertTargets.map((target) => target.inert);
    const previousOverflow = document.body.style.overflow;
    inertTargets.forEach((target) => {
      target.inert = true;
    });
    document.body.style.overflow = 'hidden';

    const links: HTMLElement[] = navRef.current
      ? Array.from(navRef.current.querySelectorAll<HTMLElement>('a[href]'))
      : [];
    const focusTimer = window.setTimeout(() => links[0]?.focus(), 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = [menuButtonRef.current, ...links].filter((item): item is HTMLElement => Boolean(item));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach((target, index) => {
        target.inert = previousInert[index];
      });
    };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.lang =
      currentArticle?.language === 'English' ? 'en'
      : isBlogPage ? 'zh-CN'
      : locale === 'en' ? 'en'
      : 'zh-CN';
    document.body.dataset.page = isBlogPage ? 'portal-blog' : 'portal-home';
    document.title =
      currentArticle ? `${currentArticle.title} | Ink & Memory Blog`
      : isBlogPage ? 'Ink & Memory Blog | AI 写作记忆与工作空间设计'
      : copy.metaTitle;

    const description =
      currentArticle?.summary ??
      (isBlogPage ? 'Ink & Memory Blog 收录 AI 写作、长期记忆、Workspace 状态管理和交互设计文章。' : copy.metaDescription);
    const canonicalUrl =
      currentArticle ? currentArticle.canonicalHref
      : isBlogPage ? 'https://suoxya.com/blog/'
      : copy.canonicalUrl;
    const socialImageUrl = 'https://suoxya.com/og-image.png';

    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    if (canonicalUrl) {
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    }
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', socialImageUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', socialImageUrl);
  }, [currentArticle, isBlogPage, locale, copy]);

  return (
    <>
      <a className="skip-link" href="#main">
        {copy.skipLabel}
      </a>

      <header
        className={`site-header${headerCompact ? ' is-compact' : ''}${currentArticle ? ' is-article' : ''}`}
        aria-label="Ink & Memory navigation"
      >
        <a className="brand-link" href={copy.homeHref} aria-label="Ink & Memory home" onClick={() => setMenuOpen(false)}>
          <span>Ink</span>
          <span className="brand-amp" aria-hidden="true">&amp;</span>
          <span>Memory</span>
        </a>

        {currentArticle ? (
          <a className="blog-back-link header-back-link" href="/blog/">
            <ArrowRight aria-hidden="true" size={17} />
            <span>Back to Blog</span>
          </a>
        ) : null}

        <button
          ref={menuButtonRef}
          aria-controls="primaryNav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? copy.nav.close : copy.nav.open}
          className="nav-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>

        <nav
          ref={navRef}
          className={menuOpen ? 'site-nav is-open' : 'site-nav'}
          id="primaryNav"
          aria-label={copy.nav.label}
        >
          {navItems.map((item) => (
            <ExternalAwareLink external={item.external} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </ExternalAwareLink>
          ))}
          <a
            className="mobile-nav-product"
            href={startWritingUrl}
            rel="noreferrer"
            target="_blank"
            onClick={() => setMenuOpen(false)}
          >
            {copy.nav.write}<ArrowRight aria-hidden="true" size={19} />
          </a>
        </nav>

        <div className="header-actions">
          <a className="language-link" href={copy.languageHref} aria-label={copy.languageLabel}>
            {copy.languageLabel}
          </a>
          <a className="header-cta" href={startWritingUrl} rel="noreferrer" target="_blank">
            {copy.nav.write}
          </a>
        </div>
      </header>

      {currentArticle ? <BlogArticlePage article={currentArticle} /> : isBlogPage ? <BlogPage /> : <HomePage copy={copy} />}

      <footer className="site-footer" aria-label="Project links">
        <div className="footer-brand">
          <strong>Ink &amp; Memory</strong>
        </div>
        <div className="footer-links">
          <a href={startWritingUrl} rel="noreferrer" target="_blank">{copy.nav.write}</a>
          <a href={blogUrl}>Blog</a>
          <a href={repositoryUrl} rel="noreferrer" target="_blank">GitHub</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href={copy.languageHref}>{copy.languageLabel}</a>
        </div>
      </footer>
    </>
  );
}

function HomePage({copy}: {copy: HomeCopy}) {
  const [activeStep, setActiveStep] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const storyRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const programmaticScrollUntilRef = useRef(0);

  useEffect(() => {
    let animationFrame = 0;
    const updateFromScroll = () => {
      if (window.performance.now() < programmaticScrollUntilRef.current) return;
      const story = storyRef.current;
      if (!story) return;
      const storyRect = story.getBoundingClientRect();
      if (storyRect.bottom < 108 || storyRect.top > window.innerHeight) return;
      const compact = window.matchMedia('(max-width: 900px)').matches;
      const nextStep = panelRefs.current.reduce((current, panel, index) => {
        if (!panel) return current;
        const activationLine = compact ? Math.min(window.innerHeight * 0.34, 260) : 112;
        return panel.getBoundingClientRect().top <= activationLine ? index : current;
      }, 0);
      setActiveStep((current) => current === nextStep ? current : nextStep);
    };
    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        updateFromScroll();
        animationFrame = 0;
      });
    };

    updateFromScroll();
    window.addEventListener('scroll', requestUpdate, {passive: true});
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [copy.how.steps.length]);

  const activateStep = (index: number, focus = false, alignStory = false) => {
    setActiveStep(index);
    const target = tabRefs.current[index];
    if (focus) target?.focus();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const panel = panelRefs.current[index];
    const story = storyRef.current;
    const compact = window.matchMedia('(max-width: 900px)').matches;
    if (alignStory && story && panel && !compact) {
      programmaticScrollUntilRef.current = reducedMotion ? 0 : window.performance.now() + 700;
      let panelTop = 0;
      let offsetNode: HTMLElement | null = panel;
      while (offsetNode) {
        panelTop += offsetNode.offsetTop;
        offsetNode = offsetNode.offsetParent as HTMLElement | null;
      }
      window.scrollTo({
        top: Math.max(0, panelTop - 96),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    } else if (alignStory && panel) {
      window.scrollTo({
        top: window.scrollY + panel.getBoundingClientRect().top - 76,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    } else if (focus) {
      target?.scrollIntoView({behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center'});
    }
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % copy.how.steps.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + copy.how.steps.length) % copy.how.steps.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = copy.how.steps.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    activateStep(nextIndex, true, true);
  };

  useLayoutEffect(() => {
    const reactiveElements = Array.from(document.querySelectorAll<HTMLElement>([
      '.platform-strip > *',
      '.scenario-section > .section-intro',
      '.scenario-item',
      '.how-section > .section-intro',
      '.final-cta',
    ].join(', ')));
    const heroCopy = document.querySelector<HTMLElement>('.hero-copy');
    const topologyMap = document.querySelector<HTMLElement>('.topology-map');
    const topologyNodes = Array.from(document.querySelectorAll<HTMLElement>('.topology-node-wrap'));
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;

    reactiveElements.forEach((element) => element.classList.add('scroll-reactive'));
    topologyNodes.forEach((element) => element.classList.add('scroll-flow-node'));

    const updateScrollMotion = () => {
      const reducedMotion = motionQuery.matches;
      const viewportHeight = window.innerHeight;

      reactiveElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.max(460, Math.min(viewportHeight * 0.78, rect.height + viewportHeight * 0.28));
        const linear = Math.min(1, Math.max(0, (viewportHeight - rect.top) / distance));
        const progress = reducedMotion ? 1 : 1 - Math.pow(1 - linear, 3);
        element.style.setProperty('--scroll-offset', `${(1 - progress) * 34}px`);
        element.style.setProperty('--scroll-opacity', `${0.44 + progress * 0.56}`);
        element.style.setProperty('--scroll-scale', `${0.988 + progress * 0.012}`);
      });

      const heroProgress = reducedMotion ? 0 : Math.min(1, window.scrollY / Math.max(520, viewportHeight * 0.82));
      heroCopy?.style.setProperty('--hero-copy-drift', `${heroProgress * 14}px`);

      if (topologyMap) {
        const rect = topologyMap.getBoundingClientRect();
        const linear = Math.min(1, Math.max(0, (viewportHeight * 0.9 - rect.top) / (viewportHeight * 0.72)));
        const flowProgress = reducedMotion ? 1 : 1 - Math.pow(1 - linear, 2);
        topologyMap.style.setProperty('--topology-progress', `${flowProgress * 100}%`);
        topologyNodes.forEach((node, index) => {
          const nodeLinear = Math.min(1, Math.max(0, (linear - index * 0.095) / 0.38));
          const nodeProgress = 1 - Math.pow(1 - nodeLinear, 3);
          node.style.setProperty('--flow-offset', `${(1 - nodeProgress) * 48}px`);
          node.style.setProperty('--flow-opacity', `${0.08 + nodeProgress * 0.92}`);
          node.style.setProperty('--flow-scale', `${0.965 + nodeProgress * 0.035}`);
        });
      }
      animationFrame = 0;
    };

    const requestScrollMotion = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener('scroll', requestScrollMotion, {passive: true});
    window.addEventListener('resize', requestScrollMotion);
    motionQuery.addEventListener('change', requestScrollMotion);
    return () => {
      window.removeEventListener('scroll', requestScrollMotion);
      window.removeEventListener('resize', requestScrollMotion);
      motionQuery.removeEventListener('change', requestScrollMotion);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      reactiveElements.forEach((element) => element.classList.remove('scroll-reactive'));
      topologyNodes.forEach((element) => element.classList.remove('scroll-flow-node'));
    };
  }, []);

  return (
    <main className="home-page" id="main">
      <section className="landing-hero" aria-labelledby="heroTitle">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><Sparkles aria-hidden="true" size={16} />{copy.hero.eyebrow}</p>
          <h1 id="heroTitle" className="hero-title-brand"><span>{copy.hero.title[0]}</span><span>{copy.hero.title[1]}</span></h1>
          <span className="hero-stroke" aria-hidden="true" />
          <p className="hero-lead">{copy.hero.lead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={startWritingUrl} rel="noreferrer" target="_blank">
              <span>{copy.hero.primaryAction}</span><ArrowRight aria-hidden="true" size={19} />
            </a>
            <a className="button button-secondary" href="#use-cases">
              <span>{copy.hero.secondaryAction}</span>
            </a>
          </div>
          <p className="trust-note"><span>{copy.hero.trustNote}</span></p>
        </div>
      </section>

      <section className="platform-strip" aria-label={copy.platform.sources.join(', ')}>
        <div
          className="platform-marquee"
          role="group"
          tabIndex={0}
          aria-label={copy.platform.sources.join(', ')}
        >
          <div className="platform-track">
            {[false, true].map((duplicate) => (
              <ul className="platform-list" aria-hidden={duplicate || undefined} key={duplicate ? 'duplicate' : 'primary'}>
                {copy.platform.sources.map((source, index) => (
                  <li key={source}><span className="platform-mark"><PlatformGlyph index={index} /></span><span>{source}</span></li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section className="scenario-section" id="use-cases" aria-labelledby="useCaseTitle">
        <header className="section-intro">
          <p className="eyebrow">{copy.useCases.eyebrow}</p>
          <h2 id="useCaseTitle">{copy.useCases.title}</h2>
          <p>{copy.useCases.description}</p>
        </header>
        <div className="scenario-grid">
          {copy.useCases.items.map((item, index) => (
            <article className="scenario-item" key={item.title}>
              <div className="scenario-item-topline">
                <span className="scenario-glyph"><EditorialGlyph index={index} /></span>
                <span className="scenario-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="scenario-label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>{item.result}</small>
            </article>
          ))}
        </div>
      </section>

      <ProductExamples copy={copy.examples} />

      <section className="topology-section" aria-label={copy.topology.eyebrow}>
        <div className="topology-map" aria-label={copy.topology.eyebrow}>
          {copy.topology.nodes.map((node, index) => (
            <div className="topology-node-wrap" key={node.label}>
              <article className={`topology-node topology-node-${index + 1}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{node.label}</strong>
                <small>{node.meta}</small>
              </article>
              {index < copy.topology.nodes.length - 1 ? <ArrowRight aria-hidden="true" className="topology-arrow" size={18} /> : null}
            </div>
          ))}
          <p className="topology-feedback"><History aria-hidden="true" size={17} />{copy.topology.feedback}</p>
        </div>
      </section>

      <section className="how-section" id="how-it-works" aria-label={copy.how.eyebrow}>
        <header className="section-intro">
          <p className="eyebrow">{copy.how.eyebrow}</p>
        </header>
        <div className="how-scroll-story" ref={storyRef}>
          <div className="how-switcher">
          <div
            className="how-tabs"
            aria-label={copy.how.tabLabel}
          >
            {copy.how.steps.map((step, index) => (
              <button
                ref={(element) => {tabRefs.current[index] = element;}}
                aria-controls={`how-panel-${index}`}
                aria-current={activeStep === index ? 'step' : undefined}
                className="how-tab"
                id={`how-tab-${index}`}
                key={step.label}
                type="button"
                onClick={() => activateStep(index, false, true)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong className="tab-label-full">{step.label}</strong>
                <strong className="tab-label-short">{step.shortLabel}</strong>
                <ArrowRight aria-hidden="true" className="tab-arrow" size={17} />
              </button>
            ))}
          </div>
          <div className="how-panels">
            {copy.how.steps.map((step, index) => (
              <HowStepPanel
                active={step}
                current={activeStep === index}
                index={index}
                key={step.label}
                panelRef={(element) => {panelRefs.current[index] = element;}}
              />
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="finalTitle">
        <p className="eyebrow">{copy.final.eyebrow}</p>
        <h2 id="finalTitle">{copy.final.title}</h2>
        <p>{copy.final.description}</p>
        <div className="final-actions">
          <a className="button button-light" href={startWritingUrl} rel="noreferrer" target="_blank">
            {copy.final.primaryAction}<ArrowRight aria-hidden="true" size={19} />
          </a>
          <a className="button button-on-dark" href="#real-decks">{copy.final.secondaryAction}</a>
        </div>
      </section>
    </main>
  );
}

function ProductExamples({copy}: {copy: HomeCopy['examples']}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const storyRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;

    const updateFromScroll = () => {
      const story = storyRef.current;
      const demo = demoRef.current;
      if (!story || !demo) return;
      const stickyTop = window.matchMedia('(max-width: 900px)').matches ? 78 : 96;
      const storyRect = story.getBoundingClientRect();
      const track = Math.max(1, story.offsetHeight - demo.offsetHeight);
      const progress = Math.min(1, Math.max(0, (stickyTop - storyRect.top) / track));
      const lastIndex = Math.max(1, copy.cases.length - 1);
      const nextIndex = Math.min(copy.cases.length - 1, Math.round(progress * lastIndex));

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        let reveal = index === 0 ? 1 : 0;
        if (index > 0) {
          const segment = 1 / lastIndex;
          const start = (index - 1) * segment + segment * 0.16;
          const end = index * segment - segment * 0.08;
          reveal = Math.min(1, Math.max(0, (progress - start) / Math.max(0.01, end - start)));
        }
        if (motionQuery.matches) reveal = index === nextIndex ? 1 : 0;
        panel.style.setProperty('--example-inset', `${(1 - reveal) * 100}%`);
        panel.style.setProperty('--example-shift', `${(1 - reveal) * 34}px`);
        panel.style.setProperty('--example-opacity', `${0.72 + reveal * 0.28}`);
      });

      story.style.setProperty('--example-progress', `${progress * 100}%`);
      setActiveIndex((current) => current === nextIndex ? current : nextIndex);
      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener('scroll', requestUpdate, {passive: true});
    window.addEventListener('resize', requestUpdate);
    motionQuery.addEventListener('change', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      motionQuery.removeEventListener('change', requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [copy.cases.length]);

  return (
    <section className="product-examples" id="real-decks" aria-label={copy.tabLabel}>
      <div className="product-example-story" ref={storyRef}>
        <div className="product-example-demo" ref={demoRef}>
          <div className="product-example-stage-stack" aria-live="polite">
            {copy.cases.map((example, exampleIndex) => (
              <article
                aria-hidden={activeIndex !== exampleIndex}
                aria-label={example.label}
                className={`product-example-panel is-${example.mode}${activeIndex === exampleIndex ? ' is-current' : ''}`}
                key={example.mode}
                ref={(element) => {panelRefs.current[exampleIndex] = element;}}
                role="group"
              >
                <div className="product-example-copy">
                  <p className="eyebrow">{example.eyebrow}</p>
                  <h2>{example.title}</h2>
                  <p>{example.description}</p>
                  <ol aria-label={example.outcome}>
                    {example.steps.map((step, index) => (
                      <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>
                    ))}
                  </ol>
                  <small>{example.outcome}</small>
                </div>
                <div className={`product-example-media product-example-media--${example.mode}`}>
                  {example.media.map((media, mediaIndex) => (
                    <figure className={`product-example-figure product-example-figure--${mediaIndex + 1}`} key={media.src}>
                      <img
                        alt={media.alt}
                        decoding="async"
                        loading="lazy"
                        src={media.src}
                      />
                      <figcaption>{media.caption}</figcaption>
                    </figure>
                  ))}
                </div>

              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowStepPanel({active, current, index, panelRef}: {
  active: HowStep;
  current: boolean;
  index: number;
  key?: string;
  panelRef: (element: HTMLElement | null) => void;
}) {
  return (
    <article
      className={`how-panel${current ? ' is-active' : ''}`}
      id={`how-panel-${index}`}
      aria-labelledby={`how-tab-${index}`}
      ref={panelRef}
    >
      <div className="how-panel-content">
        <div className="how-panel-body">
          <div className="how-panel-body-inner">
            <div className="how-copy">
              <span className="step-icon"><EditorialGlyph index={index} /></span>
              <p>{String(index + 1).padStart(2, '0')} / 04</p>
              <h3>{active.title}</h3>
              <div className="memory-stroke" aria-hidden="true" />
              <p>{active.description}</p>
              <ul>{active.bullets.map((bullet) => <li key={bullet}><Check aria-hidden="true" size={16} />{bullet}</li>)}</ul>
            </div>
            <div className="step-preview" aria-label={active.previewTitle}>
              <div className="preview-header"><span>{active.previewTitle}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
              <StepConcept active={active} index={index} />
              <p className="preview-result"><CheckCircle2 aria-hidden="true" size={18} />{active.result}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function StepConcept({active, index}: {active: HowStep; index: number}) {
  const isChinese = /[\u3400-\u9fff]/.test(active.label);
  const labels = isChinese ? {
    ready: '今日已建立',
    policy: '保存状态',
    policyValue: '持续保存',
    pending: '等待确认',
    keep: '重新选择',
    confirm: '保存报告',
  } : {
    ready: 'today is ready',
    policy: 'save state',
    policyValue: 'continuous save',
    pending: 'awaiting review',
    keep: 'change selection',
    confirm: 'save report',
  };

  return (
    <div className={`step-concept step-concept-${index + 1}`} aria-hidden="true">
      <div className="concept-toolbar">
        <span>Ink &amp; Memory</span>
        <span>{String(index + 1).padStart(2, '0')} / 04</span>
      </div>

      {index === 0 ? (
        <div className="source-concept">
          <div className="source-concept-title">
            <span className="concept-glyph"><EditorialGlyph index={index} /></span>
            <div><small>{active.previewTitle}</small><strong>{active.label}</strong></div>
            <span className="concept-status">● {labels.ready}</span>
          </div>
          <div className="source-policy"><span>{labels.policy}</span><strong>{labels.policyValue}</strong></div>
          <div className="concept-rows">
            {active.previewItems.map((item) => (
              <div className="concept-row" key={item.title}>
                <span className="concept-node" />
                <div><small>{item.label}</small><strong>{item.title}</strong></div>
                <span>{item.meta}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {index === 1 ? (
        <div className="same-page-concept">
          <div className="concept-sidebar">
            <span className="concept-dot is-active" />
            <span className="concept-dot" />
            <span className="concept-dot" />
          </div>
          <div className="concept-page">
            <small>{active.previewTitle}</small>
            <strong>{active.label}</strong>
            <span className="concept-title-line" />
            <span className="concept-text-line is-long" />
            <span className="concept-text-line" />
            <span className="concept-text-line is-highlighted" />
            <span className="concept-text-line is-short" />
          </div>
          <div className="concept-context">
            {active.previewItems.map((item, itemIndex) => (
              <div className={itemIndex === 0 ? 'is-current' : ''} key={item.title}>
                <small>{item.label}</small><strong>{item.title}</strong><span>{item.meta}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {index === 2 ? (
        <div className="memory-concept">
          <div className="memory-concept-heading"><EditorialGlyph index={index} /><strong>{active.previewTitle}</strong></div>
          <div className="memory-stats">
            {active.previewItems.map((item, itemIndex) => (
              <div key={item.title}><strong>{String(itemIndex + 1).padStart(2, '0')}</strong><span>{item.label}</span></div>
            ))}
          </div>
          <div className="memory-concept-thread">
            {active.previewItems.map((item) => (
              <div key={item.title}>
                <span className="concept-node" />
                <div><strong>{item.title}</strong><small>{item.meta}</small></div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {index === 3 ? (
        <div className="confirm-concept">
          <div className="confirm-concept-heading">
            <span className="concept-glyph"><EditorialGlyph index={index} /></span>
            <div><small>{active.previewTitle}</small><strong>{active.label}</strong></div>
            <span className="concept-status is-waiting">● {labels.pending}</span>
          </div>
          <div className="confirm-diff">
            {active.previewItems.map((item, itemIndex) => (
              <div className={itemIndex === 2 ? 'is-approved' : ''} key={item.title}>
                <small>{item.label}</small><strong>{item.title}</strong><span>{item.meta}</span>
              </div>
            ))}
          </div>
          <div className="confirm-actions"><span>{labels.keep}</span><strong>{labels.confirm}</strong></div>
        </div>
      ) : null}
    </div>
  );
}

function EditorialGlyph({index}: {index: number}) {
  const glyph = Math.max(0, Math.min(3, index));
  return (
    <svg aria-hidden="true" className="editorial-glyph" viewBox="0 0 32 32">
      {glyph === 0 ? (
        <>
          <path d="M8 5.5h13.5a2 2 0 0 1 2 2V24a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" />
          <path d="M10.5 2.5H24a2 2 0 0 1 2 2V21" />
          <path className="glyph-accent" d="M10.5 13h8.5M10.5 17h6" />
        </>
      ) : null}
      {glyph === 1 ? (
        <>
          <path d="M4.5 8.5c3.5-1.8 7.2-1.4 11.5 1.2v16c-4.3-2.6-8-3-11.5-1.2v-16ZM27.5 8.5c-3.5-1.8-7.2-1.4-11.5 1.2v16c4.3-2.6 8-3 11.5-1.2v-16Z" />
          <path className="glyph-accent" d="M16 12v9" />
        </>
      ) : null}
      {glyph === 2 ? (
        <>
          <path d="M10 6.5c6.5 0 12 3.2 12 8.7 0 4.1-3 7.2-7.6 7.2-3.8 0-6.4-2.3-6.4-5.2 0-2.3 1.7-4.1 4.2-4.1 2 0 3.5 1.3 3.5 3.1 0 1.4-.9 2.5-2.3 2.9" />
          <circle className="glyph-accent glyph-fill" cx="9.8" cy="6.5" r="2.2" />
          <circle cx="22.2" cy="15.2" r="2" />
          <circle cx="13.4" cy="19.1" r="1.8" />
        </>
      ) : null}
      {glyph === 3 ? (
        <>
          <path d="m6.5 25.5 2.1-7.1L20.8 6.2l5 5-12.2 12.2-7.1 2.1Z" />
          <path d="m17.9 9.1 5 5M8.6 18.4l5 5M6.5 25.5l4-4" />
          <path className="glyph-accent" d="m18.5 22.5 2.4 2.4 5-5.4" />
        </>
      ) : null}
    </svg>
  );
}

function PlatformGlyph({index}: {index: number}) {
  const glyph = index % 4;
  return (
    <svg aria-hidden="true" className="platform-glyph" viewBox="0 0 32 32">
      {glyph === 0 ? (
        <>
          <path d="m6 7.5 3-3 15-1 2 2.5v19L9 27l-3-3.5v-16Z" />
          <path d="M9 4.5 24 7l2-1M10 22V10l10 11V9.5M18 9.5h4M9 10h3" />
        </>
      ) : null}
      {glyph === 1 ? (
        <>
          <path d="M5.5 16.5c2.2-5.8 6.3-9.2 12-10.5l2.1 4.6-5.8 3.2 6.4.2-1 4.9H9c-2.2 0-3.6-.8-3.5-2.4Z" />
          <path d="M26.5 15.5c-2.2 5.8-6.3 9.2-12 10.5l-2.1-4.6 5.8-3.2-6.4-.2 1-4.9H23c2.2 0 3.6.8 3.5 2.4Z" />
        </>
      ) : null}
      {glyph === 2 ? (
        <>
          <path d="m16 3.5 7.5 5 3 10.5-7.2 9.5-10.8-4L5.5 14 11 6l5-2.5Z" />
          <path d="m5.5 14 8.8 3.2 9.2-8.7M8.5 24.5l5.8-7.3 5 11.3M11 6l3.3 11.2L16 3.5M14.3 17.2 26.5 19" />
        </>
      ) : null}
      {glyph === 3 ? (
        <>
          <circle cx="10.5" cy="16" r="5.5" />
          <path d="M10.5 10.5h14M10.5 16h10.5" />
        </>
      ) : null}
    </svg>
  );
}

export default App;
