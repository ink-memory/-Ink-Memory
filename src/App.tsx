import {useEffect, useState, type AnchorHTMLAttributes, type ReactNode} from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Database,
  HeartHandshake,
  Import,
  Menu,
  Mic,
  PenLine,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  X,
  type LucideIcon,
} from 'lucide-react';

import heroMimoPortal from './assets/home/hero-mimo-portal.png';
import logoHorizontal from './assets/home/logo-horizontal.png';
import mimoCharacterPortal from './assets/home/mimo-character-portal.png';
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

type QuickEntry = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  anchorId?: string;
  external?: boolean;
};

type ValueCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: 'yellow' | 'green' | 'cream';
};

type PortalCard = {
  title: string;
  subtitle: string;
  description: string;
  action: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

type HomeCopy = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  homeHref: string;
  heroKicker: string;
  heroTitle: [string, string];
  heroLead: [string, string];
  primaryAction: string;
  secondaryAction: string;
  trustNote: string;
  quickEntriesLabel: string;
  quickEntries: QuickEntry[];
  valueEyebrow: string;
  valueTitle: [string, string];
  valueCards: ValueCard[];
  mimoEyebrow: string;
  mimoTitle: string;
  mimoDescription: string;
  mimoTags: string[];
  mimoLink: string;
  portalEyebrow: string;
  portalTitle: string;
  portalCards: PortalCard[];
};

const homeCopy: Record<Locale, HomeCopy> = {
  zh: {
    metaTitle: 'Ink & Memory | 跨平台个人写作记忆层，AI 陪你读你自己',
    metaDescription:
      'Ink & Memory 站在用户一侧，把分散在 Notion、飞书、Obsidian、Flomo 等平台中的个人文字，重新组织成可检索、可对话、可沉淀的写作记忆系统。AI 可协作写作，但关键写入需用户确认。',
    canonicalUrl: 'https://suoxya.com/',
    homeHref: '/',
    heroKicker: '跨平台个人写作记忆层 · AI 陪你读你自己',
    heroTitle: ['Ink & Memory', ''],
    heroLead: [
      ' 站在用户一侧，把分散在 Notion、飞书、Obsidian、Flomo 等平台中的个人文字，',
      '重新组织成一个可检索、可对话、可沉淀的写作记忆系统。',
    ],
    primaryAction: '开始今天的书写',
    secondaryAction: '看看 Mimo',
    trustNote: '它不是替你写，而是带着记忆和你一起写。所有关键写入都需要你确认。',
    quickEntriesLabel: '快速入口',
    quickEntries: [
      {
        title: '开始写作',
        description: '打开一页新的记忆。',
        href: startWritingUrl,
        icon: PenLine,
        external: true,
      },
      {
        title: '统一记忆库',
        description: '可检索、可追问、可长期使用的个人记忆层。',
        href: '#memory',
        icon: BookOpen,
      },
      {
        title: '认识 Mimo',
        description: '你的灵感记录员。',
        href: '#mimo',
        icon: Smile,
      },
      {
        title: '品牌素材',
        description: 'Logo、角色、配色和图标。',
        href: '#brand-kit',
        icon: Star,
        anchorId: 'brand-kit',
      },
    ],
    valueEyebrow: 'Product Value',
    valueTitle: ['这不是一个普通日记工具，', '而是一个有记忆、有边界感的写作搭档。'],
    valueCards: [
      {
        title: '多平台导入',
        description: '连接 Notion、飞书、Obsidian、Flomo，收回散落在各处的文字。',
        icon: Import,
        tone: 'yellow',
      },
      {
        title: '统一记忆库',
        description: '把零散文字整理成可检索、可追问、可长期使用的个人记忆层。',
        icon: Database,
        tone: 'green',
      },
      {
        title: '深度回响',
        description: '识别重复主题、情绪线索与行为模式，帮助你重新看见自己。',
        icon: HeartHandshake,
        tone: 'cream',
      },
      {
        title: 'AI 协作写作',
        description: 'AI 可改写、插入、回复评论，但关键写入必须由你确认。',
        icon: CheckCircle2,
        tone: 'yellow',
      },
    ],
    mimoEyebrow: 'Mimo Character',
    mimoTitle: 'Mimo 是谁？',
    mimoDescription:
      'Mimo 是 Ink & Memory 的记忆小搭子。它不是替你写作的机器人，而是一个陪你记录、整理、回看和轻轻提醒的灵感记录员。',
    mimoTags: ['记录', '陪伴', '回看', '灵感', '克制'],
    mimoLink: '查看角色设定',
    portalEyebrow: 'Portal Cards',
    portalTitle: '导入内容、沉淀记忆、跨平台问答，重新看见自己。',
    portalCards: [
      {
        title: 'Writing Space',
        subtitle: '写作空间',
        description: '开始一篇日记、随笔、灵感或创作草稿。',
        action: '进入写作',
        href: startWritingUrl,
        icon: PenLine,
        external: true,
      },
      {
        title: 'Memory Reports',
        subtitle: '记忆报告',
        description: '查看近期主题、情绪线索和长期反复出现的问题。',
        action: '查看报告',
        href: '#memory',
        icon: BookOpen,
      },
      {
        title: 'Voice Cards',
        subtitle: '声音卡组',
        description: '选择不同的 AI 声音，让它以不同方式阅读你的文字。',
        action: '管理声音',
        href: '#stories',
        icon: Mic,
      },
    ],
  },
  en: {
    metaTitle: 'Ink & Memory | Cross-platform Writing Memory Layer',
    metaDescription:
      'Ink & Memory stands on the writer’s side, reorganizing personal writing scattered across Notion, Feishu, Obsidian, and Flomo into a searchable, conversational, and lasting writing memory system — with consent-based AI writing collaboration.',
    canonicalUrl: 'https://suoxya.com/en/',
    homeHref: '/en/',
    heroKicker: 'Cross-platform writing memory layer · AI reads you, with you',
    heroTitle: ['Ink & Memory', ''],
    heroLead: [
      ' stands on the writer’s side, reorganizing personal writing scattered across Notion, Feishu, Obsidian, and Flomo',
      ' into a searchable, conversational, and lasting writing memory system.',
    ],
    primaryAction: 'Start Writing Today',
    secondaryAction: 'Meet Mimo',
    trustNote: 'It does not write for you — it writes with you, with memory. All key edits require your confirmation.',
    quickEntriesLabel: 'Quick entries',
    quickEntries: [
      {
        title: 'Start Writing',
        description: 'Open a new page of memory.',
        href: startWritingUrl,
        icon: PenLine,
        external: true,
      },
      {
        title: 'Memory Library',
        description: 'A searchable, queryable, long-term personal memory layer.',
        href: '#memory',
        icon: BookOpen,
      },
      {
        title: 'Meet Mimo',
        description: 'Your inspiration recorder.',
        href: '#mimo',
        icon: Smile,
      },
      {
        title: 'Brand Kit',
        description: 'Logo, character, colors, and icons.',
        href: '#brand-kit',
        icon: Star,
        anchorId: 'brand-kit',
      },
    ],
    valueEyebrow: 'Product Value',
    valueTitle: ['Not an ordinary journal —', 'a writing companion with memory and boundaries.'],
    valueCards: [
      {
        title: 'Multi-platform Import',
        description: 'Connect Notion, Feishu, Obsidian, and Flomo to reclaim writing scattered across platforms.',
        icon: Import,
        tone: 'yellow',
      },
      {
        title: 'Unified Memory Library',
        description: 'Organize fragments into a searchable, queryable, long-term personal memory layer.',
        icon: Database,
        tone: 'green',
      },
      {
        title: 'Deep Resonance',
        description: 'Detect recurring themes, emotional cues, and behavior patterns to help you see yourself again.',
        icon: HeartHandshake,
        tone: 'cream',
      },
      {
        title: 'Consent-based AI Writing',
        description: 'AI can rewrite, insert, and reply with comments, but key edits always require your confirmation.',
        icon: CheckCircle2,
        tone: 'yellow',
      },
    ],
    mimoEyebrow: 'Mimo Character',
    mimoTitle: 'Who is Mimo?',
    mimoDescription:
      'Mimo is the memory companion of Ink & Memory — not a robot that writes for you, but an inspiration recorder that captures, organizes, reviews, and gently reminds alongside you.',
    mimoTags: ['Capture', 'Companion', 'Review', 'Inspiration', 'Restraint'],
    mimoLink: 'View character profile',
    portalEyebrow: 'Portal Cards',
    portalTitle: 'Import, consolidate, ask across platforms — and see yourself again.',
    portalCards: [
      {
        title: 'Writing Space',
        subtitle: 'Start writing',
        description: 'Start a journal entry, essay, idea, or creative draft.',
        action: 'Start Writing',
        href: startWritingUrl,
        icon: PenLine,
        external: true,
      },
      {
        title: 'Memory Reports',
        subtitle: 'Review memory',
        description: 'See recent themes, emotional cues, and long-term recurring questions.',
        action: 'View Reports',
        href: '#memory',
        icon: BookOpen,
      },
      {
        title: 'Voice Cards',
        subtitle: 'Choose voices',
        description: 'Choose different AI voices to read your writing back in different ways.',
        action: 'Manage Voices',
        href: '#stories',
        icon: Mic,
      },
    ],
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
  const normalizedPath =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/';
  const locale: Locale = normalizedPath === '/en' || normalizedPath.startsWith('/en/') ? 'en' : 'zh';
  const copy = homeCopy[locale];
  const currentArticle =
    normalizedPath.startsWith('/blog/') ?
      blogArticles.find((article) => normalizedPath === `/blog/${article.slug}`)
    : undefined;
  const isBlogPage = normalizedPath === '/blog' || Boolean(currentArticle);

  const navItems: NavItem[] = [
    {label: 'Write', href: startWritingUrl, external: true},
    {label: 'Blog', href: blogUrl},
    {label: 'Memory', href: `${copy.homeHref}#memory`},
    {label: 'Mimo', href: `${copy.homeHref}#mimo`},
  ];

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let travelled = 0;
    let direction = 0;
    let animationFrame = 0;

    const updateHeader = (initial = false) => {
      const currentScrollY = window.scrollY;

      if (currentArticle) {
        const articleHeader = document.querySelector<HTMLElement>('.blog-detail-header');
        setHeaderCompact(Boolean(articleHeader && articleHeader.getBoundingClientRect().bottom <= 0));
      } else if (currentScrollY <= 16) {
        setHeaderCompact(false);
      } else if (initial) {
        setHeaderCompact(currentScrollY > 80);
      } else {
        const delta = currentScrollY - previousScrollY;
        const nextDirection = Math.sign(delta);

        if (nextDirection !== 0) {
          if (nextDirection !== direction) {
            direction = nextDirection;
            travelled = 0;
          }

          travelled += Math.abs(delta);
          if (travelled >= 12) {
            setHeaderCompact(direction > 0);
            travelled = 0;
          }
        }
      }

      previousScrollY = currentScrollY;
      animationFrame = 0;
    };

    const requestHeaderUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(() => updateHeader());
      }
    };

    updateHeader(true);
    window.addEventListener('scroll', requestHeaderUpdate, {passive: true});
    window.addEventListener('resize', requestHeaderUpdate);

    return () => {
      window.removeEventListener('scroll', requestHeaderUpdate);
      window.removeEventListener('resize', requestHeaderUpdate);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [currentArticle]);

  useEffect(() => {
    if (headerCompact) {
      setMenuOpen(false);
    }
  }, [headerCompact]);

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
      (isBlogPage ?
        'Ink & Memory Blog 收录 AI 写作、长期记忆、Workspace 状态管理和交互设计文章。'
      : copy.metaDescription);
    const canonicalUrl =
      currentArticle ? `https://suoxya.com/blog/${currentArticle.slug}/`
      : isBlogPage ? 'https://suoxya.com/blog/'
      : copy.canonicalUrl;
    const socialImageUrl =
      currentArticle ? `https://suoxya.com${currentArticle.coverImage.src}` : 'https://suoxya.com/og-image.png';

    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', socialImageUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', socialImageUrl);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
  }, [currentArticle, isBlogPage, copy]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header
        className={`site-header${headerCompact ? ' is-compact' : ''}${currentArticle ? ' is-article' : ''}`}
        aria-label="Ink & Memory navigation"
      >
        <a
          className="brand-link"
          href={copy.homeHref}
          aria-label="Ink & Memory home"
          onClick={() => setMenuOpen(false)}
        >
          <img src={logoHorizontal} alt="Ink & Memory" />
        </a>

        {currentArticle ? (
          <a className="blog-back-link header-back-link" href="/blog/">
            <ArrowRight aria-hidden="true" size={17} />
            <span>Back to Blog</span>
          </a>
        ) : null}

        <button
          aria-controls="primaryNav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          className="nav-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>

        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} id="primaryNav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <ExternalAwareLink external={item.external} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </ExternalAwareLink>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-cta" href={startWritingUrl} rel="noreferrer" target="_blank">
            Start Writing
          </a>
        </div>
      </header>

      {currentArticle ? <BlogArticlePage article={currentArticle} /> : isBlogPage ? <BlogPage /> : <HomePage copy={copy} />}

      <footer className="site-footer" aria-label="Project links">
        <span>Ink &amp; Memory</span>
        <a href={startWritingUrl} rel="noreferrer" target="_blank">
          Start Writing
        </a>
        <a href={blogUrl}>Blog</a>
        <a href={repositoryUrl} rel="noreferrer" target="_blank">
          GitHub
        </a>
        <a href="/sitemap.xml">Sitemap</a>
      </footer>
    </>
  );
}

function HomePage({copy}: {copy: HomeCopy}) {
  return (
    <main className="home-page" id="main">
        <section className="hero-section" aria-labelledby="heroTitle">
          <div className="hero-copy">
            <div className="hero-kicker">
              <Sparkles aria-hidden="true" size={17} />
              <span>{copy.heroKicker}</span>
            </div>

            <h1 id="heroTitle">
              {copy.heroTitle[0]}
              <br />
              {copy.heroTitle[1]}
            </h1>
            <span className="hero-stroke" aria-hidden="true" />

            <p className="hero-lead">
              <strong>Ink &amp; Memory</strong>
              {copy.heroLead[0]}
              <br />
              {copy.heroLead[1]}
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href={startWritingUrl} rel="noreferrer" target="_blank">
                <span>{copy.primaryAction}</span>
                <PenLine aria-hidden="true" size={22} />
              </a>
              <a className="button button-secondary" href="#mimo">
                <span>{copy.secondaryAction}</span>
                <Smile aria-hidden="true" size={23} />
              </a>
            </div>

            <p className="trust-note">
              <ShieldCheck aria-hidden="true" size={18} />
              <span>{copy.trustNote}</span>
            </p>
          </div>

          <figure className="hero-visual" aria-label="Mimo memory companion">
            <img src={heroMimoPortal} alt="Mimo holding a notebook beside a small writing card" />
          </figure>
        </section>

        <section className="quick-entry" aria-label={copy.quickEntriesLabel}>
          {copy.quickEntries.map((entry) => {
            const Icon = entry.icon;
            return (
              <ExternalAwareLink
                className="quick-card"
                external={entry.external}
                href={entry.href}
                key={entry.title}
                id={entry.anchorId}
              >
                <span className="quick-icon" aria-hidden="true">
                  <Icon size={32} strokeWidth={2.2} />
                </span>
                <span>
                  <strong>{entry.title}</strong>
                  <small>{entry.description}</small>
                </span>
              </ExternalAwareLink>
            );
          })}
        </section>

        <section className="value-section" id="memory" aria-labelledby="valueTitle">
          <div className="section-heading">
            <p>{copy.valueEyebrow}</p>
            <h2 id="valueTitle">
              {copy.valueTitle[0]}
              <br />
              {copy.valueTitle[1]}
            </h2>
          </div>

          <div className="value-grid">
            {copy.valueCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className={`value-card value-card--${card.tone}`} key={card.title}>
                  <span className="value-icon" aria-hidden="true">
                    <Icon size={36} strokeWidth={2.1} />
                  </span>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mimo-section" id="mimo" aria-labelledby="mimoTitle">
          <div className="mimo-art" aria-hidden="true">
            <span className="mimo-doodle mimo-doodle-one">✦</span>
            <span className="mimo-doodle mimo-doodle-two">⟡</span>
            <img src={mimoCharacterPortal} alt="" />
          </div>

          <div className="mimo-copy">
            <p className="eyebrow">{copy.mimoEyebrow}</p>
            <h2 id="mimoTitle">{copy.mimoTitle}</h2>
            <p>{copy.mimoDescription}</p>
            <div className="tag-row" aria-label="Mimo traits">
              {copy.mimoTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a className="text-link" href="#brand-kit">
              <span>{copy.mimoLink}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </section>

        <section className="portal-section" id="stories" aria-labelledby="portalTitle">
          <div className="section-heading">
            <p>{copy.portalEyebrow}</p>
            <h2 id="portalTitle">{copy.portalTitle}</h2>
          </div>

          <div className="portal-grid">
            {copy.portalCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className="portal-card" key={card.title}>
                  <span className="portal-icon" aria-hidden="true">
                    <Icon size={28} strokeWidth={2.2} />
                  </span>
                  <p>{card.title}</p>
                  <h3>{card.subtitle}</h3>
                  <span>{card.description}</span>
                  <ExternalAwareLink className="portal-action" external={card.external} href={card.href}>
                    <span>{card.action}</span>
                    <ArrowRight aria-hidden="true" size={17} />
                  </ExternalAwareLink>
                </article>
              );
            })}
          </div>
        </section>
      </main>
  );
}

export default App;
