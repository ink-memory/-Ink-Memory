import {useEffect, useState, type CSSProperties} from 'react';
import {
  ArrowRight,
  BookOpen,
  Folder,
  Heart,
  Menu,
  PenLine,
  Search,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  X,
  type LucideIcon,
} from 'lucide-react';

import candle from './assets/home/candle.png';
import deskNotebookOpen from './assets/home/desk-notebook-open.png';
import heroMimoDesk from './assets/home/hero-mimo-desk.png';
import heroWallNotes from './assets/home/hero-wall-notes.png';
import inkPen from './assets/home/ink-pen.png';
import logoHorizontal from './assets/home/logo-horizontal.png';
import logoPrimary from './assets/home/logo-primary.png';
import mascotBust from './assets/home/mascot-bust.png';
import mascotFront from './assets/home/mascot-front.png';
import mascotNotebook from './assets/home/mascot-notebook.png';
import mascotPen from './assets/home/mascot-pen.png';
import polaroids from './assets/home/polaroids.png';
import satchel from './assets/home/satchel.png';
import sparkBadge from './assets/home/spark-badge.png';
import stickyNotes from './assets/home/sticky-notes.png';

const startWritingUrl = 'https://ink-frontend.suoxya.com';
const repositoryUrl = 'https://github.com/glide-the/ink-and-memory';

type NavItem = {
  label: string;
  href: string;
};

type ActionTile = {
  label: string;
  zh: string;
  icon: LucideIcon;
  accent: string;
};

type FeatureCard = {
  title: string;
  zh: string;
  text: string;
  image: string;
  tone: 'yellow' | 'green' | 'cream';
};

const navItems: NavItem[] = [
  {label: 'Home', href: '#home'},
  {label: 'Characters', href: '#characters'},
  {label: 'Memory Club', href: '#memory-club'},
  {label: 'Stories', href: '#stories'},
  {label: 'Shop', href: '#shop'},
];

const actionTiles: ActionTile[] = [
  {label: 'Write', zh: '记录', icon: PenLine, accent: '#39D353'},
  {label: 'Reflect', zh: '回望', icon: Heart, accent: '#FFD42A'},
  {label: 'Collect', zh: '收藏', icon: Folder, accent: '#39D353'},
  {label: 'Grow', zh: '成长', icon: Sprout, accent: '#FFD42A'},
];

const featureCards: FeatureCard[] = [
  {
    title: 'Record Ideas',
    zh: '记录灵感',
    text: 'Capture the little sparks that light up your day.',
    image: mascotPen,
    tone: 'yellow',
  },
  {
    title: 'Reflect Memories',
    zh: '回望记忆',
    text: 'Look back, feel deeply, understand yourself.',
    image: mascotNotebook,
    tone: 'cream',
  },
  {
    title: 'Collect Moments',
    zh: '收藏瞬间',
    text: 'Save what matters and build your story.',
    image: mascotFront,
    tone: 'green',
  },
];

const accessories = [
  {name: 'Memory Notebook', image: deskNotebookOpen},
  {name: 'Ink Pen Ear', image: inkPen},
  {name: 'Spark Badge', image: sparkBadge},
  {name: 'Tiny Satchel', image: satchel},
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.body.dataset.page = 'home';
    document.title = 'Ink & Memory | AI Journal and Writing Companion';
  }, []);

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to main content
      </a>

      <header className="site-header" aria-label="Ink & Memory navigation">
        <a className="brand-link" href="#home" aria-label="Ink & Memory home" onClick={() => setMenuOpen(false)}>
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
          {navItems.map((item, index) => (
            <a className={index === 0 ? 'is-active' : undefined} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button aria-label="Search" className="icon-button" type="button">
            <Search aria-hidden="true" size={23} />
          </button>
          <button aria-label="Open memory bag" className="icon-button bag-button" type="button">
            <ShoppingBag aria-hidden="true" size={22} />
            <span>2</span>
          </button>
          <a className="start-button" href={startWritingUrl} rel="noreferrer" target="_blank">
            <span>Start Writing</span>
            <Sparkles aria-hidden="true" size={16} />
          </a>
        </div>
      </header>

      <main className="home-page" id="home">
        <section className="hero-board" aria-labelledby="heroTitle">
          <div className="doodle doodle-one" aria-hidden="true">
            ✦
          </div>
          <div className="doodle doodle-two" aria-hidden="true">
            ☺
          </div>
          <div className="doodle doodle-three" aria-hidden="true">
            ⟡
          </div>

          <div className="hero-copy">
            <img className="hero-logo" src={logoPrimary} alt="" />
            <h1 id="heroTitle">Write today. Remember forever.</h1>
            <p className="hero-zh">把灵感写下来，让记忆留下来。</p>
            <p className="hero-lead">A warm little companion for writing, reflecting, and collecting everyday memories.</p>

            <div className="action-tiles" aria-label="Memory actions">
              {actionTiles.map((item) => {
                const Icon = item.icon;
                return (
                  <a className="action-tile" href="#memory-club" key={item.label} style={{'--tile-accent': item.accent} as CSSProperties}>
                    <Icon aria-hidden="true" size={36} strokeWidth={2.2} />
                    <span>{item.label}</span>
                    <small>{item.zh}</small>
                  </a>
                );
              })}
            </div>
          </div>

          <figure className="hero-mimo" aria-label="Mimo writing at a wooden desk">
            <img src={heroMimoDesk} alt="Mimo writing in a notebook beside an ink bottle" />
          </figure>

          <aside className="memory-notes" aria-hidden="true">
            <img src={heroWallNotes} alt="" />
          </aside>

          <aside className="profile-card" id="characters" aria-label="Meet Mimo">
            <img className="profile-bust" src={mascotBust} alt="" />
            <h2>Meet Mimo <Sparkles aria-hidden="true" size={17} /></h2>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>Memory Companion<br />灵感记录员</dd>
              </div>
              <div>
                <dt>Personality</dt>
                <dd>Curious, gentle, slightly weird, always listening.</dd>
              </div>
            </dl>
            <div className="accessory-row" aria-label="Mimo accessories">
              {accessories.map((item) => (
                <figure key={item.name}>
                  <img src={item.image} alt="" />
                  <figcaption>{item.name}</figcaption>
                </figure>
              ))}
            </div>
            <a className="profile-button" href="#memory-club">
              <span>Get to know Mimo</span>
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </aside>
        </section>

        <section className="feature-band" id="memory-club" aria-label="Memory club features">
          {featureCards.map((card) => (
            <article className={`feature-card feature-card--${card.tone}`} key={card.title}>
              <div className="feature-image">
                <img src={card.image} alt="" />
              </div>
              <div className="feature-copy">
                <h2>{card.title}</h2>
                <p className="feature-zh">{card.zh}</p>
                <p>{card.text}</p>
                <a href="#stories">
                  <span>Learn more</span>
                  <ArrowRight aria-hidden="true" size={17} />
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="memory-desk" id="stories" aria-label="Ink and Memory story desk">
          <article className="notebook-note">
            <img src={deskNotebookOpen} alt="" />
            <div>
              <span>Ink &amp; Memory</span>
              <p>One page a day.</p>
            </div>
          </article>

          <div className="mantra-grid">
            <article>
              <BookOpen aria-hidden="true" size={30} />
              <h2>One page a day.</h2>
              <p>每天一页。</p>
            </article>
            <article>
              <Star aria-hidden="true" size={31} />
              <h2>Small steps write great stories.</h2>
              <p>点滴记录，成就故事。</p>
            </article>
            <article>
              <Heart aria-hidden="true" size={31} />
              <h2>Memories are inked softly in our hearts.</h2>
              <p>记忆，温柔地写在心里。</p>
            </article>
          </div>

          <aside className="desk-objects" id="shop" aria-label="Memory keepsakes">
            <img className="polaroids" src={polaroids} alt="Mimo polaroid photos" />
            <img className="sticky" src={stickyNotes} alt="Sticky notes with a reminder" />
            <img className="candle" src={candle} alt="Ink and Memory candle" />
          </aside>
        </section>
      </main>

      <footer className="site-footer" aria-label="Project links">
        <a href="https://ink-memory.suoxya.com/">Website</a>
        <a href={repositoryUrl} rel="noreferrer" target="_blank">
          GitHub Repository
        </a>
        <a href="/sitemap.xml">Sitemap</a>
      </footer>
    </>
  );
}

export default App;
