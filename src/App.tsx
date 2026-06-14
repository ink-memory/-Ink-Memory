import {type CSSProperties, useEffect, useRef, useState} from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  Menu,
  Mic2,
  Pencil,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

import videoThree from '../assets/video-3.mp4?url';
import videoThreeAlpha from '../assets/video-3-alpha.webm?url';
import videoFour from '../assets/video-4.mp4?url';
import videoFourAlpha from '../assets/video-4-alpha.webm?url';
import videoFive from '../assets/video-5.mp4?url';
import videoFiveAlpha from '../assets/video-5-alpha.webm?url';

const startWritingUrl = 'https://ink-frontend.suoxya.com';
const videoSources = [videoThree, videoFour, videoFive, videoThree, videoFour];
const alphaVideoSources = [videoThreeAlpha, videoFourAlpha, videoFiveAlpha, videoThreeAlpha, videoFourAlpha];

type Cta = {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
};

type SectionCard =
  | string
  | {
      title: string;
      text: string;
    };

type SectionScene =
  | 'heroProof'
  | 'audienceCards'
  | 'confirmPanel'
  | 'toolCards'
  | 'modeCards'
  | 'breathingEditor'
  | 'memoryChat'
  | 'voiceCast'
  | 'echoAnalysis'
  | 'imageTimeline'
  | 'safetyGrid'
  | 'finalCall';

type LandingSection = {
  id: string;
  nav: string;
  layout: string;
  tone: string;
  video: number;
  shape: string;
  accent: string;
  accent2: string;
  bg: string;
  eyebrow: string;
  title: string;
  lead: string;
  proof: string;
  scene: SectionScene;
  visualTitle: string;
  visualText: string;
  cards?: SectionCard[];
  ctas?: Cta[];
};

const sections: LandingSection[] = [
  {
    id: 'hero',
    nav: 'Ink & Memory',
    layout: 'hero',
    tone: 'paper',
    video: 0,
    shape: 'hero',
    accent: '#FFD42A',
    accent2: '#39D353',
    bg: '#F5E9D6',
    eyebrow: '给认真写作者的 AI 搭档',
    title: '写下来，让 AI 和你一起听见自己',
    lead: '面向长期写作者、自我探索者和日记/随笔/梦境记录用户。你写字，它倾听；需要修改时，它可以动笔，但每一次关键动作都等你确认。',
    proof: '核心边界：不是 AI 替你写，是 AI 和你一起写。',
    visualTitle: 'Mimo 在旁边听',
    visualText: '从第一句话开始，AI 先理解，再协作。',
    scene: 'heroProof',
    ctas: [
      {label: '开始今天的书写', href: startWritingUrl, primary: true, external: true},
      {label: '了解 AI 协作方式', href: '#ai-collab'},
    ],
  },
  {
    id: 'audience',
    nav: 'ICP',
    layout: 'split',
    tone: 'mint',
    video: 1,
    shape: 'rounded',
    accent: '#39D353',
    accent2: '#FFD42A',
    bg: '#EFF8DD',
    eyebrow: '明确 ICP',
    title: '这是给认真写，也认真看见自己的人',
    lead: '如果你只是想随手试 AI，它可能太克制；如果你在意文字、隐私、长期记忆和可控协作，它会更像一个写作空间。',
    proof: '适合长期写作者、自我探索者、情绪记录者、AI 创作用户，以及重视边界的人。',
    visualTitle: '这是写作者的工具',
    visualText: '先确认“这是给我的”，再进入能力解释。',
    scene: 'audienceCards',
    cards: [
      '长期写日记、随笔、灵感、梦境或情绪记录的人。',
      '希望 AI 真正参与写作、整理和修改，但每一步都可解释、可拒绝。',
      '在意文字私密性和长期记忆，希望越写越懂自己，而不是每次从零开始。',
    ],
  },
  {
    id: 'ai-collab',
    nav: 'AI 协作',
    layout: 'editor',
    tone: 'cream',
    video: 2,
    shape: 'tilt',
    accent: '#F6B26B',
    accent2: '#FFD42A',
    bg: '#FFF7EA',
    eyebrow: '核心差异',
    title: 'AI 可以动笔，但先把手停住',
    lead: '它不只给建议，也能改写段落、整理结构、插入内容或回复评论。但在执行前，它必须说明想做什么、改哪里、为什么改。',
    proof: '确认面板出现之前，任何关键写操作都不会落到正文里。',
    visualTitle: '修改前先停下',
    visualText: '它会说明目标、范围、前后差异和原因。',
    scene: 'confirmPanel',
  },
  {
    id: 'tools',
    nav: '工具边界',
    layout: 'cards',
    tone: 'yellow',
    video: 3,
    shape: 'capsule',
    accent: '#FFD42A',
    accent2: '#39D353',
    bg: '#FFF1AE',
    eyebrow: '能力边界',
    title: '能做什么，不能做什么，都写清楚',
    lead: 'Ink & Memory 把 AI 的写作能力拆成四类工具。每一种都对应明确风险等级和确认方式。',
    proof: 'AI 可以读、分析、建议、申请修改；不能绕过你直接改文档。',
    visualTitle: '读、想、提议、等待',
    visualText: '工具越明确，信任越容易建立。',
    scene: 'toolCards',
    cards: [
      {title: '写入段落', text: '替换完整段落，适合润色、改写、压缩、增强画面感。'},
      {title: '删除段落', text: '删除风险更高，必须醒目确认，拒绝后不会写入。'},
      {title: '插入组件', text: '在指定位置插入图片、对话框、提示卡片等内容。'},
      {title: '回复评论', text: '不打断正文，在旁边与你对话，保留创作节奏。'},
    ],
  },
  {
    id: 'modes',
    nav: '参与程度',
    layout: 'modes',
    tone: 'peach',
    video: 4,
    shape: 'window',
    accent: '#F6B26B',
    accent2: '#39D353',
    bg: '#FFE1BD',
    eyebrow: '控制权',
    title: '你决定 AI 靠近到什么程度',
    lead: '顺畅写作时，让它自动理解和回应；认真打磨时，让每个关键动作逐步展示、逐步确认。',
    proof: '自动不等于越界，精细也不等于打断。',
    visualTitle: '自动与逐步确认',
    visualText: '不涉及修改的理解可自动完成；关键动作暂停确认。',
    scene: 'modeCards',
  },
  {
    id: 'editor',
    nav: '编辑器',
    layout: 'wide',
    tone: 'sky',
    video: 0,
    shape: 'wide',
    accent: '#9BD8FF',
    accent2: '#FFD42A',
    bg: '#EAF7FF',
    eyebrow: '日常场景',
    title: '每天一页，慢慢长成你的记忆库',
    lead: '自动识别日期、3 秒智能保存、支持语音输入。日记、梦境、片段和草稿会被安静地保存成长期上下文。',
    proof: '写得越久，它越懂你的表达方式和反复出现的主题。',
    visualTitle: '会呼吸的编辑器',
    visualText: '空白页、保存提示和语音波形都保持安静。',
    scene: 'breathingEditor',
  },
  {
    id: 'memory',
    nav: '写作记忆',
    layout: 'split',
    tone: 'sage',
    video: 1,
    shape: 'rounded',
    accent: '#8BCB88',
    accent2: '#FFD42A',
    bg: '#E8F2DC',
    eyebrow: '长期上下文',
    title: '它不是第一次见你',
    lead: '普通 AI 每次都像重新认识你；Ink & Memory 会带着近期写作、主题线索和语气习惯来回应。',
    proof: '它不是凭空回答，而是带着你的写作记忆来和你对话。',
    visualTitle: '带记忆的 AI 助手',
    visualText: '近期段落被整理成线索，再回到对话里。',
    scene: 'memoryChat',
  },
  {
    id: 'voices',
    nav: '声音角色',
    layout: 'voices',
    tone: 'rose',
    video: 2,
    shape: 'blob',
    accent: '#FFB4C8',
    accent2: '#FFD42A',
    bg: '#FFE8EF',
    eyebrow: '多视角陪伴',
    title: '不同声音，不抢你的笔',
    lead: '理性的分析者、温柔的共情者、犀利的挑战者、安静的旁观者，可以在文字旁留下轻量评论。',
    proof: '它们像贴纸一样出现，只提醒一句，然后退回边缘。',
    visualTitle: '声音角色团',
    visualText: '像贴纸一样出现，留下评论，然后退回边缘。',
    scene: 'voiceCast',
  },
  {
    id: 'echoes',
    nav: '回响分析',
    layout: 'analysis',
    tone: 'lilac',
    video: 3,
    shape: 'tilt',
    accent: '#C9B7FF',
    accent2: '#39D353',
    bg: '#F0EAFF',
    eyebrow: '长期价值',
    title: '写得足够久，模式会自己浮现',
    lead: '当文字积累到一定厚度，反复出现的主题、意象、情绪循环和选择困境会被整理成可回看的线索。',
    proof: '不是为了定义你，而是帮你多一次看见自己。',
    visualTitle: '精神地图',
    visualText: '散落文字被连接成 Echoes、Traits、Patterns。',
    scene: 'echoAnalysis',
  },
  {
    id: 'timeline',
    nav: '情绪图像',
    layout: 'timeline',
    tone: 'cream',
    video: 4,
    shape: 'wide',
    accent: '#FFD42A',
    accent2: '#F6B26B',
    bg: '#FFF7EA',
    eyebrow: '连接但有分寸',
    title: '分享这一天的形状，而不是原文',
    lead: '每天根据当天文字生成极简情绪图像。好友时间线只展示图像，不展示你的文字。',
    proof: '连接，但不打扰；亲密，但有分寸。',
    visualTitle: '视觉日记',
    visualText: '朋友只看见这一天的形状，而不是你的原文。',
    scene: 'imageTimeline',
  },
  {
    id: 'safety',
    nav: '安全边界',
    layout: 'safety',
    tone: 'paper',
    video: 0,
    shape: 'capsule',
    accent: '#39D353',
    accent2: '#FFD42A',
    bg: '#F5E9D6',
    eyebrow: '信任机制',
    title: '你的文字属于你',
    lead: 'AI 可以读、分析、建议，也可以申请动笔；但写入、删除、插入和关键决策都必须经过你确认。',
    proof: '被拒绝的操作不会写入文档，分析结果可保存、可回看、可追溯。',
    visualTitle: '确认、隔离、追溯',
    visualText: '写操作必须确认；删除类操作拥有更高等级提醒。',
    scene: 'safetyGrid',
  },
  {
    id: 'start',
    nav: '开始',
    layout: 'final',
    tone: 'ink',
    video: 1,
    shape: 'hero',
    accent: '#FFD42A',
    accent2: '#39D353',
    bg: '#111111',
    eyebrow: '开始协作',
    title: '从今天的一句话开始',
    lead: '你写下第一句话。它读懂、回应、建议，必要时申请动笔。但每一次关键修改，都等你说：可以。',
    proof: '不是 AI 替你写，是 AI 和你一起写。',
    visualTitle: '等你写第一句',
    visualText: '它在旁边，不抢笔。',
    scene: 'finalCall',
    ctas: [
      {label: '开始今天的书写', href: startWritingUrl, primary: true, external: true},
      {label: '查看协作演示', href: '#ai-collab'},
      {label: '了解确认机制', href: '#safety'},
    ],
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(media.matches);
    syncPreference();
    media.addEventListener('change', syncPreference);
    return () => media.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    const stageElements = Array.from(document.querySelectorAll<HTMLElement>('.stage'));
    const observer = new IntersectionObserver(
      () => {
        const viewportHeight = window.innerHeight || 1;
        const visible = stageElements
          .map((stage, index) => {
            const rect = stage.getBoundingClientRect();
            const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
            return {index, visibleHeight};
          })
          .sort((a, b) => b.visibleHeight - a.visibleHeight)[0];

        if (visible?.visibleHeight) {
          setActiveIndex(visible.index);
        }
      },
      {threshold: [0.2, 0.42, 0.68]},
    );

    stageElements.forEach((stage) => observer.observe(stage));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex && !prefersReducedMotion) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex, prefersReducedMotion]);

  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return;

      const targetIndex = sections.findIndex((section) => `#${section.id}` === window.location.hash);
      const target = document.querySelector<HTMLElement>(window.location.hash);
      if (!target) return;

      window.scrollTo({top: target.offsetTop, behavior: 'auto'});
      if (targetIndex >= 0) setActiveIndex(targetIndex);
    };

    const handleHashChange = () => scrollToHash();

    window.requestAnimationFrame(() => scrollToHash());
    window.setTimeout(scrollToHash, 120);
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let ticking = false;
    const update = () => {
      document.querySelectorAll<HTMLElement>('.stage').forEach((stage) => {
        const rect = stage.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        if (rect.bottom < 0 || rect.top > viewportHeight) return;
        const progress = rect.top / viewportHeight;
        stage.style.setProperty('--video-shift', `${progress * -46}px`);
        stage.style.setProperty('--copy-shift', `${progress * 18}px`);
      });
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, {passive: true});
    update();

    return () => window.removeEventListener('scroll', requestUpdate);
  }, [prefersReducedMotion]);

  return (
    <>
      <a className="skip-link" href="#sections">
        跳到主要内容
      </a>

      <header className="site-header" aria-label="Ink & Memory 导航">
        <a className="brand" href="#hero" aria-label="Ink & Memory 首页" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">I&amp;M</span>
          <span className="brand-name">Ink &amp; Memory</span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? '关闭导航' : '打开导航'}
          aria-controls="siteNav"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>

        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} id="siteNav" aria-label="主导航">
          {[
            ['适合谁', '#audience'],
            ['AI 协作', '#ai-collab'],
            ['写作记忆', '#memory'],
            ['声音角色', '#voices'],
            ['安全边界', '#safety'],
          ].map(([label, href]) => (
            <a
              className={href === `#${sections[activeIndex].id}` ? 'is-active' : undefined}
              href={href}
              key={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#start" onClick={() => setMenuOpen(false)}>
            开始书写
          </a>
        </nav>
      </header>

      <main id="sections" className={prefersReducedMotion ? 'sections reduce-motion' : 'sections'} tabIndex={-1}>
        {sections.map((section, index) => (
          <LandingStage
            active={index === activeIndex}
            index={index}
            key={section.id}
            section={section}
            videoRef={(node) => {
              videoRefs.current[index] = node;
            }}
          />
        ))}
      </main>
    </>
  );
}

type LandingStageProps = {
  active: boolean;
  index: number;
  key?: string;
  section: LandingSection;
  videoRef: (node: HTMLVideoElement | null) => void;
};

function LandingStage({active, index, section, videoRef}: LandingStageProps) {
  const Heading = index === 0 ? 'h1' : 'h2';
  const stageStyle = {
    '--section-bg': section.bg,
    '--accent': section.accent,
    '--accent-2': section.accent2,
    '--section-index': index,
  } as CSSProperties;

  return (
    <section
      aria-current={active ? 'true' : 'false'}
      className={`stage stage--${section.layout} tone-${section.tone} ${active ? 'is-active' : ''}`}
      data-index={index}
      id={section.id}
      style={stageStyle}
    >
      <div className="stage-inner">
        <article className="stage-copy" data-reveal="true">
          <p className="eyebrow">{section.eyebrow}</p>
          <Heading>{section.title}</Heading>
          <p className="lead">{section.lead}</p>
          <p className="proof">{section.proof}</p>
          <Actions ctas={section.ctas} />
        </article>

        <aside className="stage-visual" data-reveal="true">
          <VideoCard index={index} section={section} videoRef={videoRef} />
        </aside>

        <div className="stage-details" data-reveal="true">
          <Scene section={section} />
        </div>
      </div>
    </section>
  );
}

function VideoCard({index, section, videoRef}: {index: number; section: LandingSection; videoRef: (node: HTMLVideoElement | null) => void}) {
  return (
    <figure className={`video-card video-card--${section.shape}`}>
      <div className="video-mask">
        <video
          aria-hidden="true"
          className="section-video"
          loop
          muted
          playsInline
          preload={index === 0 ? 'auto' : 'metadata'}
          ref={videoRef}
        >
          <source src={alphaVideoSources[section.video % alphaVideoSources.length]} type="video/webm" />
          <source src={videoSources[section.video % videoSources.length]} type="video/mp4" />
        </video>
      </div>
    </figure>
  );
}

function Actions({ctas = []}: {ctas?: Cta[]}) {
  if (!ctas.length) return null;

  return (
    <div className="actions">
      {ctas.map((cta) => (
        <a
          aria-label={cta.label}
          className={`button ${cta.primary ? 'button--primary' : 'button--ghost'}`}
          href={cta.href}
          key={`${cta.label}-${cta.href}`}
          rel={cta.external ? 'noopener noreferrer' : undefined}
          target={cta.external ? '_blank' : undefined}
        >
          <span>{cta.label}</span>
          <ArrowRight aria-hidden="true" size={16} />
        </a>
      ))}
    </div>
  );
}

function Scene({section}: {section: LandingSection}) {
  switch (section.scene) {
    case 'heroProof':
      return (
        <div className="hero-proof-grid">
          <div className="sticky-note note-yellow">
            <Pencil aria-hidden="true" size={18} />
            为日记、随笔、梦境和情绪记录而设计。
          </div>
          <div className="sticky-note note-green">
            <Sparkles aria-hidden="true" size={18} />
            AI 可以申请动笔，但不能越界。
          </div>
        </div>
      );
    case 'audienceCards':
      return (
        <div className="icp-grid">
          {section.cards?.map((item, index) => (
            <div className="icp-card" key={String(item)} style={{'--i': index} as CSSProperties}>
              {String(item)}
            </div>
          ))}
        </div>
      );
    case 'confirmPanel':
      return (
        <div className="confirm-scene">
          <div className="confirm-card">
            <div className="confirm-head">
              <span>AI 修改请求</span>
              <strong>等待确认</strong>
            </div>
            <dl>
              <div>
                <dt>动作</dt>
                <dd>申请改写第 3 段，让画面更具体</dd>
              </div>
              <div>
                <dt>范围</dt>
                <dd>仅替换当前段落，不影响全文结构</dd>
              </div>
              <div>
                <dt>原因</dt>
                <dd>原句有情绪，但缺少可感知的场景</dd>
              </div>
            </dl>
            <div className="confirm-actions">
              <button type="button">可以执行</button>
              <button type="button">重新思考</button>
            </div>
          </div>
          <div className="diff-row">
            <div className="diff-card">
              <span>修改前</span>
              <p>我今天很累，好像什么都没有发生。</p>
            </div>
            <div className="diff-card after">
              <span>修改后</span>
              <p>我把钥匙放在桌上，灯没有开，整间屋子像等我先承认疲惫。</p>
            </div>
          </div>
        </div>
      );
    case 'toolCards':
      return (
        <div className="tool-grid">
          {section.cards?.map((card, index) => {
            const item = card as {title: string; text: string};
            return (
              <article className="tool-card" key={item.title} style={{'--i': index} as CSSProperties}>
                <span className="tool-index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      );
    case 'modeCards':
      return (
        <div className="mode-scene">
          <div className="mode-toggle" aria-hidden="true">
            <span>自动模式</span>
            <span>逐步确认</span>
          </div>
          <div className="mode-grid">
            <article className="mode-card">
              <h3>自动模式</h3>
              <p>适合顺畅记录。分析、理解和对话可自动完成；涉及修改、插入、删除或关键决策时暂停确认。</p>
            </article>
            <article className="mode-card">
              <h3>逐步确认模式</h3>
              <p>适合精细控制。每个关键动作都展示出来，由你逐步确认，再进入下一步。</p>
            </article>
          </div>
        </div>
      );
    case 'breathingEditor':
      return (
        <div className="editor-mock">
          <div className="editor-date">
            <BookOpen aria-hidden="true" size={15} />
            June 14 / Sunday
          </div>
          <h3>今天的空白页已经准备好</h3>
          <p>我醒来时还记得梦里那条很长的走廊。它不像回忆，更像某种提醒。先别急着总结，我想把它写完整。</p>
          <div className="save-chip">
            <CheckCircle2 aria-hidden="true" size={15} />
            3 秒前已自动保存
          </div>
          <div className="voice-wave" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    case 'memoryChat':
      return (
        <div className="memory-scene">
          <div className="memory-stack">
            <strong>近期写作线索</strong>
            <p>孤独、雨声、回避、窗边。AI 先整理你的文字记忆，再回到对话里。</p>
          </div>
          <div className="chat-list">
            <p>我最近写的关于孤独的段落，有什么共同点？</p>
            <p>这几天的文字里，情绪有什么变化？</p>
          </div>
        </div>
      );
    case 'voiceCast':
      return (
        <div className="voice-scene">
          <div className="voice-card">理性的分析者</div>
          <div className="voice-card">温柔的共情者</div>
          <div className="voice-card">安静的旁观者</div>
          <div className="comment-strip">
            <span>这句话背后有委屈。</span>
            <span>不要急着总结。</span>
          </div>
        </div>
      );
    case 'echoAnalysis':
      return (
        <div className="echo-scene">
          <div className="thread-map" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <article>
            <strong>Echoes｜回响</strong>
            <p>识别反复书写的主题和意象。</p>
          </article>
          <article>
            <strong>Traits｜特质</strong>
            <p>从语气、叙事距离和情绪强度中提炼长期特征。</p>
          </article>
          <article>
            <strong>Patterns｜模式</strong>
            <p>看见反复出现的情绪循环、关系问题和选择困境。</p>
          </article>
        </div>
      );
    case 'imageTimeline':
      return (
        <div className="timeline-scene">
          {['雨后黄昏', '像素月亮', '草地回声', '半透明房间', '蓝色信封'].map((label, index) => (
            <div className={`emotion-card emotion-${index + 1}`} key={label}>
              <span>{label}</span>
            </div>
          ))}
        </div>
      );
    case 'safetyGrid':
      return (
        <>
          <div className="safety-grid">
            {[
              '写操作必须确认',
              '删除类操作更高等级提醒',
              '用户会话完全隔离',
              '拒绝操作不会写入文档',
            ].map((item, index) => (
              <div className="safety-card" key={item} style={{'--i': index} as CSSProperties}>
                <Lock aria-hidden="true" size={18} />
                {item}
              </div>
            ))}
          </div>
        </>
      );
    case 'finalCall':
      return (
        <div className="final-note">
          <p>
            <Mic2 aria-hidden="true" size={18} />
            你写下第一句话。
          </p>
          <p>
            <Sparkles aria-hidden="true" size={18} />
            它读懂、回应、建议，必要时申请动笔。
          </p>
          <p>
            <ShieldCheck aria-hidden="true" size={18} />
            关键修改前，它会停下来等你。
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default App;
