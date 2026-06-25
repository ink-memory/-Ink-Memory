import {useEffect, useState, type AnchorHTMLAttributes, type ReactNode} from 'react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Menu,
  MessageSquare,
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

const startWritingUrl = 'https://ink-frontend.suoxya.com';
const repositoryUrl = 'https://github.com/glide-the/ink-and-memory';

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
  zh: string;
  description: string;
  action: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

const navItems: NavItem[] = [
  {label: 'Write', href: startWritingUrl, external: true},
  {label: 'Memory', href: '#memory'},
  {label: 'Mimo', href: '#mimo'},
  {label: 'Stories', href: '#stories'},
  {label: 'Brand Kit', href: '#brand-kit'},
];

const quickEntries: QuickEntry[] = [
  {
    title: '开始写作',
    description: '打开一页新的记忆。',
    href: startWritingUrl,
    icon: PenLine,
    external: true,
  },
  {
    title: '记忆库',
    description: '查看被沉淀下来的事实、主题和线索。',
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
];

const valueCards: ValueCard[] = [
  {
    title: '先记住，再理解',
    description: '系统不会急着给你贴标签，它先记录真正重要的事实、事件、关系、情绪和承诺。',
    icon: Brain,
    tone: 'yellow',
  },
  {
    title: '带着记忆回应你',
    description: 'AI 不再每次从零开始，它会结合你的近期写作和长期记忆理解你。',
    icon: MessageSquare,
    tone: 'green',
  },
  {
    title: 'AI 能动笔，但必须确认',
    description: '改写、删除、插入和评论都需要你确认。',
    icon: CheckCircle2,
    tone: 'yellow',
  },
];

const mimoTags = ['记录', '陪伴', '回看', '灵感', '克制'];

const portalCards: PortalCard[] = [
  {
    title: 'Writing Space',
    zh: '写作空间',
    description: '开始一篇日记、随笔、灵感或创作草稿。',
    action: '进入写作',
    href: startWritingUrl,
    icon: PenLine,
    external: true,
  },
  {
    title: 'Memory Reports',
    zh: '记忆报告',
    description: '查看近期主题、情绪线索和长期反复出现的问题。',
    action: '查看报告',
    href: '#memory',
    icon: BookOpen,
  },
  {
    title: 'Voice Cards',
    zh: '声音卡组',
    description: '选择不同的 AI 声音，让它以不同方式阅读你的文字。',
    action: '管理声音',
    href: '#stories',
    icon: Mic,
  },
];

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

  useEffect(() => {
    document.documentElement.lang = 'zh-CN';
    document.body.dataset.page = 'portal-home';
    document.title = 'Ink & Memory | 写下来，让 AI 慢慢记住你';
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="site-header" aria-label="Ink & Memory navigation">
        <a className="brand-link" href="#main" aria-label="Ink & Memory home" onClick={() => setMenuOpen(false)}>
          <img src={logoHorizontal} alt="Ink & Memory" />
        </a>

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
          <a className="login-link" href="#login">
            Log in
          </a>
          <a className="header-cta" href={startWritingUrl} rel="noreferrer" target="_blank">
            Start Writing
          </a>
        </div>
      </header>

      <main className="home-page" id="main">
        <section className="hero-section" aria-labelledby="heroTitle">
          <div className="hero-copy">
            <div className="hero-kicker">
              <Sparkles aria-hidden="true" size={17} />
              <span>Memory Companion for Writers</span>
            </div>

            <h1 id="heroTitle">
              写下来，
              <br />
              让 AI 慢慢记住你
            </h1>
            <span className="hero-stroke" aria-hidden="true" />

            <p className="hero-lead">
              <strong>Ink &amp; Memory</strong> 是一个有记忆的写作入口。
              <br />
              它陪你记录、回看、整理长期文字，
              <br />
              让散落的想法逐渐形成属于你的记忆层。
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href={startWritingUrl} rel="noreferrer" target="_blank">
                <span>开始今天的书写</span>
                <PenLine aria-hidden="true" size={22} />
              </a>
              <a className="button button-secondary" href="#mimo">
                <span>看看 Mimo</span>
                <Smile aria-hidden="true" size={23} />
              </a>
            </div>

            <p className="trust-note">
              <ShieldCheck aria-hidden="true" size={18} />
              <span>AI 可以参与，但不会越界。所有关键写入都需要你确认。</span>
            </p>
          </div>

          <figure className="hero-visual" aria-label="Mimo memory companion">
            <img src={heroMimoPortal} alt="Mimo holding a notebook beside a small writing card" />
          </figure>
        </section>

        <section className="quick-entry" aria-label="快速入口">
          {quickEntries.map((entry) => {
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
            <p>Product Value</p>
            <h2 id="valueTitle">
              不是普通日记 App，
              <br />
              是一个会随时间变厚的写作记忆层。
            </h2>
          </div>

          <div className="value-grid">
            {valueCards.map((card) => {
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
            <p className="eyebrow">Mimo Character</p>
            <h2 id="mimoTitle">Mimo 是谁？</h2>
            <p>
              Mimo 是 Ink &amp; Memory 的记忆小搭子。它不是替你写作的机器人，而是一个陪你记录、整理、回看和轻轻提醒的灵感记录员。
            </p>
            <div className="tag-row" aria-label="Mimo traits">
              {mimoTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a className="text-link" href="#brand-kit">
              <span>查看角色设定</span>
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </section>

        <section className="portal-section" id="stories" aria-labelledby="portalTitle">
          <div className="section-heading">
            <p>Portal Cards</p>
            <h2 id="portalTitle">进入你的写作、记忆和声音工作台。</h2>
          </div>

          <div className="portal-grid">
            {portalCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className="portal-card" key={card.title}>
                  <span className="portal-icon" aria-hidden="true">
                    <Icon size={28} strokeWidth={2.2} />
                  </span>
                  <p>{card.title}</p>
                  <h3>{card.zh}</h3>
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

      <footer className="site-footer" aria-label="Project links">
        <span>Ink &amp; Memory</span>
        <a href={startWritingUrl} rel="noreferrer" target="_blank">
          Start Writing
        </a>
        <a href={repositoryUrl} rel="noreferrer" target="_blank">
          GitHub
        </a>
        <a href="/sitemap.xml">Sitemap</a>
      </footer>
    </>
  );
}

export default App;
