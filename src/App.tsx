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
  | 'promptCards'
  | 'breathingEditor'
  | 'memoryLayers'
  | 'voiceCast'
  | 'memoryResponse'
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
    title: '写下来，听见长期的自己',
    lead: '普通日记只保存文字，普通 AI 只回答当下。Ink & Memory 会让你的文字形成记忆，让记忆影响 AI 与你的每一次互动。',
    proof: '先记住，再理解。先沉淀，再回应。',
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
    lead: '它不是给所有人用的日记工具。它更适合高频书写、自我探索、需要上下文，也重视控制权的人。',
    proof: '你不只想把文字存起来，也希望这些文字在未来还能重新回应你。',
    visualTitle: '这是写作者的工具',
    visualText: '先确认“这是给我的”，再进入能力解释。',
    scene: 'audienceCards',
    cards: [
      '你经常写日记、随笔、灵感、梦境、情绪记录或创作草稿。',
      '你正在经历关系变化、职业转折、创作瓶颈、孤独、迷茫或长期压力。',
      '你希望 AI 懂上下文，但不希望它擅自替你决定或修改。',
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
    lead: '它不只给建议，也能改写、删除、插入组件、回复评论、根据你的风格润色。但在动手之前，它必须先展示请求。',
    proof: '你会看到修改目标、前后内容、修改理由和风险等级，然后决定是否接受。',
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
    lead: 'Ink & Memory 把 AI 的写作行为拆成明确工具，避免模糊操作。越能行动，越要把边界说清楚。',
    proof: 'AI 可以读、分析、建议、申请修改；不能绕过你直接改文档。',
    visualTitle: '读、想、提议、等待',
    visualText: '工具越明确，信任越容易建立。',
    scene: 'toolCards',
    cards: [
      {title: '写入段落', text: '替换完整段落，适合润色、改写、压缩、增强画面感。'},
      {title: '删除段落', text: '删除风险更高，必须醒目确认，拒绝后不会写入。'},
      {title: '插入组件', text: '在指定位置插入图片、提示卡、对话框或其他写作组件。'},
      {title: '回复评论', text: '不打断正文，在旁边与你对话，保留创作节奏。'},
    ],
  },
  {
    id: 'prompts',
    nav: '灵感提示',
    layout: 'prompts',
    tone: 'peach',
    video: 4,
    shape: 'window',
    accent: '#F6B26B',
    accent2: '#39D353',
    bg: '#FFE1BD',
    eyebrow: '写作灵感提示',
    title: '停笔时，不是催促，而是轻轻推门',
    lead: '当你停下来超过几秒，某个声音角色可能只给一句很短的提示。不是模板，不是命令，也不是让 AI 接管表达。',
    proof: '好的提示不需要很多。一句够准，就能让你继续写下去。',
    visualTitle: '轻提示，不接管',
    visualText: '它只是帮你靠近那个还没说清楚的地方。',
    scene: 'promptCards',
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
    title: '每天一页，重要的事会慢慢留下来',
    lead: '自动识别日期、3 秒智能保存、支持语音输入。日记、梦境、片段和草稿会被安静地保存，等待未来重新回应你。',
    proof: '第一天只是陪你写。写得越久，记忆越厚，回应越准确。',
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
    eyebrow: '三层记忆',
    title: '不是每句话都分析，只记真正重要的东西',
    lead: '很多 AI 记忆会把“记住”和“解读”混在一起。Ink & Memory 先判断这句话有没有长期价值，再决定是否写入记忆。',
    proof: '它不急着给你贴标签。它先认真记住你。',
    visualTitle: '先记住，再理解',
    visualText: '事实、行为表达、深层主题分层保存。',
    scene: 'memoryLayers',
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
    title: '不同声音，站在文字旁边',
    lead: '温柔共情者、理性分析者、犀利挑战者、安静旁观者、创作陪跑者和结构整理者，会结合你的文字、记忆和当前语境出现。',
    proof: '这些评论不是为了打断你，而是给你一个新的看法。',
    visualTitle: '声音角色团',
    visualText: '像贴纸一样出现，留下评论，然后退回边缘。',
    scene: 'voiceCast',
  },
  {
    id: 'response',
    nav: '记忆回应',
    layout: 'analysis',
    tone: 'lilac',
    video: 3,
    shape: 'tilt',
    accent: '#C9B7FF',
    accent2: '#39D353',
    bg: '#F0EAFF',
    eyebrow: '记忆影响回应',
    title: '记忆不是档案，是未来的回应方式',
    lead: '记住的信息不会被放在角落里。它会影响 AI 怎样称呼你、怎样理解上下文、用什么语气回应，以及什么时候提醒你。',
    proof: '记忆不是为了记录过去，而是让 AI 在未来更懂得如何陪你。',
    visualTitle: '带着记忆来见你',
    visualText: '事实、习惯和主题会变成更有分寸的回应。',
    scene: 'memoryResponse',
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
    title: '今天的情绪，变成一幅安静的图',
    lead: '每天深夜，Ink & Memory 会根据当天文字生成一幅极简图片。好友时间线只展示图像，不展示原文。',
    proof: '不是自拍，不是状态，也不是社交表演。只是那一天的颜色、形状和氛围。',
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
    lead: '你的文字属于你。AI 只能在你允许的范围内行动；记忆写入也会筛选，分析不会被包装成诊断。',
    proof: '写操作必须确认，记忆写入有筛选，数据隔离，操作可追溯。',
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
    lead: '你不需要立刻想清楚，也不需要写得漂亮。先写下来，Ink & Memory 会陪你记录重要事实，沉淀长期记忆，并在未来更准确地回应你。',
    proof: '不是 AI 替你成为另一个人，是 AI 帮你慢慢听见自己。',
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
    case 'promptCards':
      return (
        <div className="prompt-scene">
          {['这里可以再诚实一点。', '你刚刚绕开了重点。', '继续写那个人。', '不要急着总结。'].map(
            (prompt, index) => (
              <article className="prompt-card" key={prompt} style={{'--i': index} as CSSProperties}>
                <span>0{index + 1}</span>
                <p>{prompt}</p>
              </article>
            ),
          )}
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
    case 'memoryLayers':
      return (
        <div className="memory-layer-scene">
          {[
            ['事实记忆', '你希望被怎样称呼、重要人物、经历、目标和承诺。'],
            ['行为与表达记忆', '你的写作时间、表达风格、情绪倾向和反复绕开的议题。'],
            ['深层主题记忆', '当文字足够厚，才谨慎提炼压力、关系、价值和长期循环。'],
          ].map(([title, text], index) => (
            <article className="memory-layer-card" key={title} style={{'--i': index} as CSSProperties}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
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
    case 'memoryResponse':
      return (
        <div className="memory-response-scene">
          <article className="response-card response-card--wide">
            <strong>不是重新认识你</strong>
            <p>你可以直接问：我最近反复写到的主题是什么？我是不是一直在把压力写成自责？用我自己的语气，帮我重写这段。</p>
          </article>
          <article>
            <strong>事实记忆</strong>
            <p>影响称呼、人物关系、上下文和轻提醒。</p>
          </article>
          <article>
            <strong>行为记忆</strong>
            <p>影响语气、节奏、建议密度和写作支持方式。</p>
          </article>
          <article>
            <strong>主题记忆</strong>
            <p>影响声音角色如何反应，而不是急着解释你。</p>
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
              '记忆写入有筛选',
              '分析不等于诊断',
              '数据隔离',
              '操作可追溯',
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
