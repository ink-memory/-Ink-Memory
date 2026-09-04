import {
  useEffect,
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
  FileText,
  History,
  Layers3,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
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

type Boundary = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ProductExample = {
  label: string;
  title: string;
  description: string;
  meta: string;
  stageLabel: string;
  mode: 'library' | 'team' | 'character';
  sequence: string[];
  media: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
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
    boundaries: string;
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
    pathLabel: string;
    path: [string, string, string];
  };
  proof: {
    eyebrow: string;
    title: string;
    description: string;
    demoLabel: string;
    workspaceLabel: string;
    documentsLabel: string;
    documents: string[];
    currentLabel: string;
    currentTitle: string;
    currentMeta: string;
    paragraphs: [string, string];
    highlight: string;
    memoryLabel: string;
    memoryTitle: string;
    memories: Array<{date: string; title: string; text: string}>;
    suggestionStatus: string;
    suggestionTitle: string;
    suggestionText: string;
  };
  platform: {
    label: string;
    title: string;
    sources: string[];
    notes: [string, string];
  };
  examples: {
    eyebrow: string;
    title: string;
    description: string;
    tabLabel: string;
    cases: ProductExample[];
  };
  topology: {
    eyebrow: string;
    title: string;
    description: string;
    nodes: Array<{label: string; meta: string}>;
    feedback: string;
  };
  how: {
    eyebrow: string;
    title: string;
    description: string;
    tabLabel: string;
    steps: HowStep[];
  };
  boundaries: {
    eyebrow: string;
    title: string;
    description: string;
    items: Boundary[];
  };
  final: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
  footerTagline: string;
};

const homeCopy: Record<Locale, HomeCopy> = {
  zh: {
    metaTitle: 'Ink Memory | 个人思维模式与多智能体工作台',
    metaDescription:
      'Ink Memory 把真实需求组织成目标、任务、多智能体协作与可检查的工具拓扑，并将经过实践验证的解决路径沉淀为个人思维模式 Deck。',
    canonicalUrl: 'https://suoxya.com/',
    homeHref: '/',
    languageHref: '/en/',
    languageLabel: 'English',
    skipLabel: '跳到主要内容',
    nav: {
      how: '协作流程',
      memory: '工作台',
      boundaries: '控制边界',
      blog: 'Blog',
      write: '打开工作台',
      open: '打开导航',
      close: '关闭导航',
      label: '主导航',
    },
    hero: {
      eyebrow: 'IM · 多智能体思维工作台',
      title: ['组织需求。', '沉淀 Deck。'],
      lead: '目标 · 任务 · 多智能体 · Skills / MCP / Plugins',
      primaryAction: '打开 IM 工作台',
      secondaryAction: '查看协作拓扑',
      trustNote: '路径可见 · 用户确认',
      pathLabel: '需求到 Deck',
      path: ['目标 / 任务', '多智能体 / 工具', '路径 / Deck'],
    },
    proof: {
      eyebrow: 'Workbench',
      title: '需求 → 目标 → 任务 → Deck',
      description: '多智能体协作 · 工具拓扑 · 执行历史',
      demoLabel: '交互预览',
      workspaceLabel: 'Ink Memory 多智能体思维模式工作台交互概念',
      documentsLabel: '抽象入口',
      documents: ['任务', '目标', 'Decks'],
      currentLabel: '当前需求',
      currentTitle: '落地页产品化重构',
      currentMeta: '目标已确认 · 3 个任务 · 3 个智能体',
      paragraphs: [
        '需求 → 目标 → 任务',
        '智能体 → 工具 → 结果',
      ],
      highlight: '保存为「产品方向 Deck」',
      memoryLabel: 'Agents',
      memoryTitle: '一个目标 · 多条路径',
      memories: [
        {date: '运行中', title: '研究智能体', text: '检索 Skill · 浏览器 MCP · 产品证据'},
        {date: '等待交接', title: '方案智能体', text: '研究结果 → 路径比较 → 方案'},
      ],
      suggestionStatus: 'Deck · 待确认',
      suggestionTitle: '产品方向思维模式',
      suggestionText: '目标 · 任务 · 智能体分工 · 工具拓扑',
    },
    platform: {
      label: 'Context sources',
      title: '内容接入',
      sources: ['Notion', '飞书', 'Obsidian', 'Flomo'],
      notes: ['Skills · MCP · Plugins', '来源 · 权限 · 状态'],
    },
    examples: {
      eyebrow: 'Real Decks',
      title: 'Deck · Agent · Output',
      description: '真实界面 · 真实角色 · 真实结果',
      tabLabel: '选择一个实际 Deck 案例',
      cases: [
        {
          label: 'Deck 库',
          title: '搜索 · 分类 · 打开',
          description: '已安装 / 可用 / 系统',
          meta: '3 已安装 · 3 可用',
          stageLabel: 'Decks / Library',
          mode: 'library',
          sequence: ['搜索', '筛选', '打开'],
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
          title: '编剧 · 结构 · 人物',
          description: '多智能体角色组合',
          meta: 'Dream / 剧本创作团队',
          stageLabel: 'Deck / Agent team',
          mode: 'team',
          sequence: ['目标', '角色', '协作'],
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
          title: '档案 · 关系 · 成品图',
          description: '结构化资料与视觉结果',
          meta: '十二律：乐坊封神 / R3',
          stageLabel: 'Dream / Character bible',
          mode: 'character',
          sequence: ['资料', '关系', '成品'],
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
      eyebrow: 'Deck topology',
      title: '需求 → 目标 / 任务 → 多智能体 → 模块 → 路径 → Deck',
      description: '角色 · 状态 · 交接 · 来源 · 结果',
      nodes: [
        {label: '真实需求', meta: '问题与边界'},
        {label: '目标 · 任务', meta: '判断标准'},
        {label: '多智能体', meta: '角色与交接'},
        {label: '模块拓扑', meta: 'Skills · MCP · Plugins'},
        {label: '路径 · 方案', meta: '事实与验证'},
        {label: '思维 Deck', meta: '确认后沉淀'},
      ],
      feedback: '任务历史 ↔ 目标',
    },
    how: {
      eyebrow: 'Workflow',
      title: '01 需求 / 02 协作 / 03 拓扑 / 04 Deck',
      description: '滚动查看完整路径',
      tabLabel: 'Ink Memory 产品协作流程',
      steps: [
        {
          shortLabel: '需求',
          label: '定义需求',
          title: '定义目标与任务',
          description: '结果 · 边界 · 判断标准',
          bullets: ['目标', '任务', '完成条件'],
          previewTitle: '目标与任务',
          previewItems: [
            {label: '需求', title: '重新判断产品方向', meta: '来自当前工作台', state: 'success'},
            {label: '目标', title: '找到一条可验证路径', meta: '包含判断标准'},
            {label: '任务', title: '调研 · 方案 · 验证', meta: '等待分配智能体'},
          ],
          result: '可执行',
        },
        {
          shortLabel: '协作',
          label: '组织协作',
          title: '分配智能体',
          description: '研究 · 方案 · 执行 · 验证',
          bullets: ['角色', '状态', '交接'],
          previewTitle: '多智能体工作区',
          previewItems: [
            {label: '协调', title: '目标与任务编排', meta: '正在分配', state: 'accent'},
            {label: '研究', title: '证据与上下文', meta: '运行中'},
            {label: '方案', title: '路径比较与输出', meta: '等待交接', state: 'success'},
          ],
          result: '协作可见',
        },
        {
          shortLabel: '拓扑',
          label: '组合拓扑',
          title: '组合工具拓扑',
          description: 'Skills · MCP · Plugins',
          bullets: ['方法', '连接', '封装'],
          previewTitle: '模块与路径拓扑',
          previewItems: [
            {label: 'Skills', title: '问题拆解与评审方法', meta: '方法层'},
            {label: 'MCP', title: '内容与工具连接', meta: '能力层'},
            {label: 'Plugins', title: '可复用任务组合', meta: '封装层', state: 'accent'},
          ],
          result: '调用可追踪',
        },
        {
          shortLabel: 'Deck',
          label: '沉淀 Deck',
          title: '保存 Deck',
          description: '目标结构 · 智能体分工 · 工具拓扑',
          bullets: ['复用', '调整', '用户确认'],
          previewTitle: 'Deck 沉淀确认',
          previewItems: [
            {label: '目标结构', title: '结果、边界与判断标准', meta: '已验证', state: 'accent'},
            {label: '协作结构', title: '智能体职责与交接', meta: '可复用'},
            {label: '模块拓扑', title: 'Skills · MCP · Plugins', meta: '等待确认', state: 'success'},
          ],
          result: '思维模式已沉淀',
        },
      ],
    },
    boundaries: {
      eyebrow: 'Control',
      title: '角色 · 工具 · Deck',
      description: '可见 · 可追踪 · 可确认',
      items: [
        {title: '角色 / 交接', description: '任务 · 上下文 · 交付物', icon: FileText},
        {title: '工具 / 来源', description: '调用 · 权限 · 结果', icon: History},
        {title: 'Deck / 确认', description: '保存 · 命名 · 复用', icon: CheckCircle2},
      ],
    },
    final: {
      eyebrow: 'One need. One visible path.',
      title: '开始一个 Deck。',
      description: '输入需求 · 组织路径 · 确认沉淀',
      primaryAction: '打开 IM 工作台',
      secondaryAction: '阅读 Ink Memory Blog',
    },
    footerTagline: '需求 → 路径 → Deck',
  },
  en: {
    metaTitle: 'Ink Memory | A multi-agent workbench for personal thinking patterns',
    metaDescription:
      'Ink Memory turns real needs into goals, tasks, visible multi-agent collaboration, and reusable thinking-pattern Decks built from Skills, MCP, and Plugins.',
    canonicalUrl: 'https://suoxya.com/en/',
    homeHref: '/en/',
    languageHref: '/',
    languageLabel: '中文',
    skipLabel: 'Skip to main content',
    nav: {
      how: 'Collaboration',
      memory: 'Workbench',
      boundaries: 'Control',
      blog: 'Blog',
      write: 'Open workbench',
      open: 'Open navigation',
      close: 'Close navigation',
      label: 'Primary navigation',
    },
    hero: {
      eyebrow: 'IM · Multi-agent thinking workbench',
      title: ['Organize needs.', 'Build Decks.'],
      lead: 'Goals · Tasks · Multiple agents · Skills / MCP / Plugins',
      primaryAction: 'Open IM workbench',
      secondaryAction: 'Explore the topology',
      trustNote: 'Visible path · User confirmed',
      pathLabel: 'Need to Deck',
      path: ['Goals / Tasks', 'Agents / Tools', 'Path / Deck'],
    },
    proof: {
      eyebrow: 'Workbench',
      title: 'Need → Goal → Tasks → Deck',
      description: 'Multi-agent collaboration · Tool topology · Execution history',
      demoLabel: 'Interactive preview',
      workspaceLabel: 'Interactive Ink Memory multi-agent thinking workbench concept',
      documentsLabel: 'Workbench views',
      documents: ['Tasks', 'Goals', 'Thinking Decks'],
      currentLabel: 'Current need',
      currentTitle: 'Product-led landing redesign',
      currentMeta: 'Goal confirmed · 3 tasks · 3 agents',
      paragraphs: [
        'Need → Goal → Tasks',
        'Agents → Tools → Results',
      ],
      highlight: 'Save as Product Direction Deck',
      memoryLabel: 'Agents',
      memoryTitle: 'One goal · Multiple paths',
      memories: [
        {date: 'Running', title: 'Research agent', text: 'Research Skill · Browser MCP · Evidence'},
        {date: 'Handoff', title: 'Strategy agent', text: 'Evidence → Path comparison → Plan'},
      ],
      suggestionStatus: 'Deck · confirmation needed',
      suggestionTitle: 'Product-direction thinking pattern',
      suggestionText: 'Goal · Tasks · Agent roles · Tool topology',
    },
    platform: {
      label: 'Context sources',
      title: 'Content connections',
      sources: ['Notion', 'Feishu', 'Obsidian', 'Flomo'],
      notes: ['Skills · MCP · Plugins', 'Sources · Permissions · State'],
    },
    examples: {
      eyebrow: 'Real Decks',
      title: 'Deck · Agent · Output',
      description: 'Real interface · Real roles · Real output',
      tabLabel: 'Choose a working Deck example',
      cases: [
        {
          label: 'Deck library',
          title: 'Search · Filter · Open',
          description: 'Installed / Available / System',
          meta: '3 installed · 3 available',
          stageLabel: 'Decks / Library',
          mode: 'library',
          sequence: ['Search', 'Filter', 'Open'],
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
          title: 'Writer · Structure · Character',
          description: 'A multi-agent role set',
          meta: 'Dream / Screenwriting team',
          stageLabel: 'Deck / Agent team',
          mode: 'team',
          sequence: ['Goal', 'Roles', 'Collaborate'],
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
          title: 'Record · Relations · Visuals',
          description: 'Structured data and visual output',
          meta: 'Twelve Tones / R3',
          stageLabel: 'Dream / Character bible',
          mode: 'character',
          sequence: ['Record', 'Relate', 'Render'],
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
      eyebrow: 'Deck topology',
      title: 'Need → Goals / Tasks → Agents → Modules → Path → Deck',
      description: 'Roles · State · Handoffs · Sources · Results',
      nodes: [
        {label: 'Real need', meta: 'Problem and boundary'},
        {label: 'Goals · Tasks', meta: 'Success criteria'},
        {label: 'Multiple agents', meta: 'Roles and handoffs'},
        {label: 'Tool topology', meta: 'Skills · MCP · Plugins'},
        {label: 'Path · Plan', meta: 'Evidence and verification'},
        {label: 'Thinking Deck', meta: 'Saved after confirmation'},
      ],
      feedback: 'Task history ↔ Goal',
    },
    how: {
      eyebrow: 'Workflow',
      title: '01 Need / 02 Agents / 03 Topology / 04 Deck',
      description: 'Scroll through the full path',
      tabLabel: 'Ink Memory product collaboration flow',
      steps: [
        {
          shortLabel: 'Need',
          label: 'Define the need',
          title: 'Define goals and tasks',
          description: 'Outcome · Boundaries · Success criteria',
          bullets: ['Goal', 'Tasks', 'Completion conditions'],
          previewTitle: 'Goals and tasks',
          previewItems: [
            {label: 'Need', title: 'Re-evaluate product direction', meta: 'From this workbench', state: 'success'},
            {label: 'Goal', title: 'Find a verifiable path', meta: 'Criteria included'},
            {label: 'Tasks', title: 'Research · design · verify', meta: 'Ready for agent assignment'},
          ],
          result: 'Executable',
        },
        {
          shortLabel: 'Agents',
          label: 'Coordinate agents',
          title: 'Assign agents',
          description: 'Research · Strategy · Execute · Verify',
          bullets: ['Roles', 'State', 'Handoffs'],
          previewTitle: 'Multi-agent workspace',
          previewItems: [
            {label: 'Coordinate', title: 'Arrange goals and tasks', meta: 'Assigning now', state: 'accent'},
            {label: 'Research', title: 'Evidence and context', meta: 'Running'},
            {label: 'Strategy', title: 'Compare paths and deliver', meta: 'Waiting for handoff', state: 'success'},
          ],
          result: 'Visible collaboration',
        },
        {
          shortLabel: 'Topo',
          label: 'Compose the topology',
          title: 'Compose tool topology',
          description: 'Skills · MCP · Plugins',
          bullets: ['Methods', 'Connections', 'Packages'],
          previewTitle: 'Modules and path topology',
          previewItems: [
            {label: 'Skills', title: 'Problem framing and review', meta: 'Method layer'},
            {label: 'MCP', title: 'Content and tool connections', meta: 'Capability layer'},
            {label: 'Plugins', title: 'Reusable task bundles', meta: 'Package layer', state: 'accent'},
          ],
          result: 'Traceable calls',
        },
        {
          shortLabel: 'Deck',
          label: 'Settle the Deck',
          title: 'Save the Deck',
          description: 'Goal structure · Agent roles · Tool topology',
          bullets: ['Reuse', 'Adjust', 'User confirm'],
          previewTitle: 'Deck confirmation',
          previewItems: [
            {label: 'Goal structure', title: 'Outcome, boundary, and criteria', meta: 'Verified', state: 'accent'},
            {label: 'Collaboration', title: 'Agent roles and handoffs', meta: 'Reusable'},
            {label: 'Module topology', title: 'Skills · MCP · Plugins', meta: 'Waiting for confirmation', state: 'success'},
          ],
          result: 'Thinking pattern saved',
        },
      ],
    },
    boundaries: {
      eyebrow: 'Control',
      title: 'Roles · Tools · Deck',
      description: 'Visible · Traceable · Confirmed',
      items: [
        {title: 'Roles / Handoffs', description: 'Tasks · Context · Deliverables', icon: FileText},
        {title: 'Tools / Sources', description: 'Calls · Permissions · Results', icon: History},
        {title: 'Deck / Confirm', description: 'Save · Name · Reuse', icon: CheckCircle2},
      ],
    },
    final: {
      eyebrow: 'One need. One visible path.',
      title: 'Start a Deck.',
      description: 'Input need · Organize path · Confirm Deck',
      primaryAction: 'Open IM workbench',
      secondaryAction: 'Read the Ink Memory Blog',
    },
    footerTagline: 'Need → Path → Deck',
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
    {label: copy.nav.memory, href: `${copy.homeHref}#memory`},
    {label: copy.nav.boundaries, href: `${copy.homeHref}#boundaries`},
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
          <span>{copy.footerTagline}</span>
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

  useEffect(() => {
    const reactiveElements = Array.from(document.querySelectorAll<HTMLElement>([
      '.product-proof > *',
      '.product-examples-heading',
      '.platform-strip > *',
      '.topology-section > .section-intro',
      '.how-section > .section-intro',
      '.boundary-section > *',
      '.final-cta',
    ].join(', ')));
    const heroCopy = document.querySelector<HTMLElement>('.hero-copy');
    const heroCanvas = document.querySelector<HTMLElement>('.hero-product-canvas');
    const workspaceToolbar = document.querySelector<HTMLElement>('.workspace-toolbar');
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
      heroCanvas?.style.setProperty('--hero-canvas-drift', `${heroProgress * -30}px`);
      workspaceToolbar?.style.setProperty('--workspace-toolbar-drift', `${heroProgress * 19}px`);

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
          <h1 id="heroTitle"><span>{copy.hero.title[0]}</span><span>{copy.hero.title[1]}</span></h1>
          <span className="hero-stroke" aria-hidden="true" />
          <p className="hero-lead">{copy.hero.lead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={startWritingUrl} rel="noreferrer" target="_blank">
              <span>{copy.hero.primaryAction}</span><ArrowRight aria-hidden="true" size={19} />
            </a>
            <a className="button button-secondary" href="#how-it-works">
              <span>{copy.hero.secondaryAction}</span>
            </a>
          </div>
          <p className="trust-note"><ShieldCheck aria-hidden="true" size={18} /><span>{copy.hero.trustNote}</span></p>
        </div>
        <div className="hero-product-canvas"><WorkspaceConcept copy={copy.proof} /></div>
      </section>

      <section className="product-proof" id="memory" aria-labelledby="proofTitle">
        <div className="proof-copy">
          <p className="eyebrow">{copy.proof.eyebrow}</p>
          <h2 id="proofTitle">{copy.proof.title}</h2>
          <p>{copy.proof.description}</p>
          <span className="concept-label"><Layers3 aria-hidden="true" size={15} />{copy.proof.demoLabel}</span>
        </div>
        <ol className="hero-memory-path product-memory-path" aria-label={copy.hero.pathLabel}>
          {copy.hero.path.map((label, index) => (
            <li key={label}>
              <span className="hero-path-icon"><EditorialGlyph index={index + 1} /></span>
              <strong>{label}</strong>
            </li>
          ))}
        </ol>
      </section>

      <ProductExamples copy={copy.examples} />

      <section className="platform-strip" aria-labelledby="platformTitle">
        <div className="platform-heading">
          <p className="eyebrow">{copy.platform.label}</p>
          <h2 id="platformTitle">{copy.platform.title}</h2>
        </div>
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
        <ul className="platform-notes">
          {copy.platform.notes.map((note) => <li key={note}><Check aria-hidden="true" size={15} />{note}</li>)}
        </ul>
      </section>

      <section className="topology-section" aria-labelledby="topologyTitle">
        <header className="section-intro section-intro--wide">
          <p className="eyebrow">{copy.topology.eyebrow}</p>
          <h2 id="topologyTitle">{copy.topology.title}</h2>
          <p>{copy.topology.description}</p>
        </header>
        <div className="topology-map" aria-label={copy.topology.title}>
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

      <section className="how-section" id="how-it-works" aria-labelledby="howTitle">
        <header className="section-intro">
          <p className="eyebrow">{copy.how.eyebrow}</p>
          <h2 id="howTitle">{copy.how.title}</h2>
          <p>{copy.how.description}</p>
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

      <section className="boundary-section" id="boundaries" aria-labelledby="boundaryTitle">
        <div className="boundary-heading">
          <p className="eyebrow">{copy.boundaries.eyebrow}</p>
          <h2 id="boundaryTitle">{copy.boundaries.title}</h2>
          <p>{copy.boundaries.description}</p>
        </div>
        <div className="boundary-list">
          {copy.boundaries.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="boundary-item" key={item.title}>
                <span className="boundary-icon"><Icon aria-hidden="true" size={21} /></span>
                <div><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></div>
              </article>
            );
          })}
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
          <a className="button button-on-dark" href={blogUrl}>{copy.final.secondaryAction}</a>
        </div>
      </section>
    </main>
  );
}

function ProductExamples({copy}: {copy: HomeCopy['examples']}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const storyRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
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

  useEffect(() => {
    if (!window.matchMedia('(max-width: 900px)').matches) return;
    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeIndex]);

  const activate = (index: number, focus = false, alignStory = true) => {
    setActiveIndex(index);
    const story = storyRef.current;
    const demo = demoRef.current;
    if (alignStory && story && demo) {
      const stickyTop = window.matchMedia('(max-width: 900px)').matches ? 78 : 96;
      const storyTop = window.scrollY + story.getBoundingClientRect().top;
      const track = Math.max(0, story.offsetHeight - demo.offsetHeight);
      const progress = copy.cases.length > 1 ? index / (copy.cases.length - 1) : 0;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: Math.max(0, storyTop - stickyTop + track * progress),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
    if (focus) {
      window.requestAnimationFrame(() => tabRefs.current[index]?.focus());
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % copy.cases.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + copy.cases.length) % copy.cases.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = copy.cases.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    activate(nextIndex, true, true);
  };

  return (
    <section className="product-examples" id="real-decks" aria-labelledby="productExamplesTitle">
      <header className="product-examples-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="productExamplesTitle">{copy.title}</h2>
        <p>{copy.description}</p>
      </header>

      <div className="product-example-story" ref={storyRef}>
        <div className="product-example-demo" ref={demoRef}>
          <div className="product-example-tabs" role="tablist" aria-label={copy.tabLabel} aria-orientation="vertical">
            {copy.cases.map((example, index) => (
              <button
                aria-controls={`product-example-panel-${index}`}
                aria-selected={activeIndex === index}
                className={activeIndex === index ? 'is-current' : ''}
                id={`product-example-tab-${index}`}
                key={example.label}
                onClick={() => activate(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                ref={(element) => {tabRefs.current[index] = element;}}
                role="tab"
                tabIndex={activeIndex === index ? 0 : -1}
                type="button"
              >
                <span className="product-example-tab-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="product-example-tab-copy">
                  <strong>{example.label}</strong>
                  <small>{example.title}</small>
                </span>
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            ))}
          </div>

          <div className="product-example-stage-stack" aria-live="polite">
            {copy.cases.map((example, exampleIndex) => (
              <article
                aria-hidden={activeIndex !== exampleIndex}
                aria-labelledby={`product-example-tab-${exampleIndex}`}
                className={`product-example-panel is-${example.mode}${activeIndex === exampleIndex ? ' is-current' : ''}`}
                id={`product-example-panel-${exampleIndex}`}
                key={example.mode}
                ref={(element) => {panelRefs.current[exampleIndex] = element;}}
                role="tabpanel"
              >
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

                <footer className="product-example-footer">
                  <div>
                    <strong>{example.label}</strong>
                    <span>{example.description}</span>
                  </div>
                  <ol aria-label={example.title}>
                    {example.sequence.map((item, index) => (
                      <li key={item}><span>{index + 1}</span>{item}</li>
                    ))}
                  </ol>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkspaceConcept({copy}: {copy: HomeCopy['proof']}) {
  const [activeView, setActiveView] = useState(0);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const isChinese = /[\u3400-\u9fff]/.test(copy.title);
  const ui = isChinese ? {
    status: '协作运行中',
    overview: '路径观测',
    views: [
      {title: copy.currentTitle, meta: copy.currentMeta, items: ['产品定位', '多智能体交互', '响应式验证']},
      {title: 'IM 产品路径', meta: '1 个目标 · 3 条标准', items: ['产品闭环', '状态可见', 'Deck 可复用']},
      {title: '产品方向 Deck', meta: '草稿 · 待确认', items: ['目标 / 任务', '角色 / 交接', 'Skills / MCP / Plugins']},
    ],
    taskStates: ['已完成', '运行中', '待验证'],
    evidence: ['计划', '证据', '偏差 / 调整'],
    evidenceValues: ['3 个阶段', '8 条来源', '2 个待校准项'],
    modules: '当前模块拓扑',
    history: '任务历史持续回看目标',
  } : {
    status: 'Collaboration live',
    overview: 'Path observability',
    views: [
      {title: copy.currentTitle, meta: copy.currentMeta, items: ['Product positioning', 'Multi-agent interaction', 'Responsive verification']},
      {title: 'IM product path', meta: '1 goal · 3 criteria', items: ['Product loop', 'Visible state', 'Reusable Deck']},
      {title: 'Product Direction Deck', meta: 'Draft · Confirm', items: ['Goals / Tasks', 'Roles / Handoffs', 'Skills / MCP / Plugins']},
    ],
    taskStates: ['Complete', 'Running', 'Verify'],
    evidence: ['Plan', 'Evidence', 'Gap / adjustment'],
    evidenceValues: ['3 stages', '8 sources', '2 items to recalibrate'],
    modules: 'Active module topology',
    history: 'Task history keeps checking the goal',
  };
  const active = ui.views[activeView];

  useEffect(() => {
    let animationFrame = 0;
    const updateFromScroll = () => {
      const workspace = workspaceRef.current;
      if (!workspace) return;
      const story = workspace.parentElement;
      if (!story) return;
      const stickyTop = window.matchMedia('(max-width: 900px)').matches ? 78 : 96;
      const storyRect = story.getBoundingClientRect();
      const track = Math.max(1, story.offsetHeight - workspace.offsetHeight);
      const progress = Math.min(1, Math.max(0, (stickyTop - storyRect.top) / track));
      const nextView = Math.round(progress * (copy.documents.length - 1));
      setActiveView((current) => current === nextView ? current : nextView);
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
  }, [copy.documents.length]);

  const activateWorkspaceView = (index: number, focus = false) => {
    setActiveView(index);
    const workspace = workspaceRef.current;
    const story = workspace?.parentElement;
    if (workspace && story) {
      const stickyTop = window.matchMedia('(max-width: 900px)').matches ? 78 : 96;
      const storyTop = window.scrollY + story.getBoundingClientRect().top;
      const track = Math.max(0, story.offsetHeight - workspace.offsetHeight);
      const progress = copy.documents.length > 1 ? index / (copy.documents.length - 1) : 0;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: Math.max(0, storyTop - stickyTop + track * progress),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
    if (focus) {
      window.requestAnimationFrame(() => document.getElementById(`workspace-tab-${index}`)?.focus());
    }
  };

  const handleWorkspaceKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % copy.documents.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + copy.documents.length) % copy.documents.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = copy.documents.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    activateWorkspaceView(nextIndex, true);
  };

  return (
    <div className="workspace-concept" aria-label={copy.workspaceLabel} ref={workspaceRef}>
      <div className="workspace-toolbar">
        <span>IM / Workbench</span>
        <span className="workspace-live"><i aria-hidden="true" />{ui.status}</span>
      </div>
      <div className="workspace-layout">
        <nav className="workspace-sidebar" aria-label={copy.documentsLabel}>
          <span>{copy.documentsLabel}</span>
          <div className="workspace-view-tabs" role="tablist" aria-orientation="vertical">
            {copy.documents.map((document, index) => (
              <button
                aria-controls="workspace-view"
                aria-selected={activeView === index}
                className={activeView === index ? 'is-current' : ''}
                id={`workspace-tab-${index}`}
                key={document}
                onClick={() => activateWorkspaceView(index)}
                onKeyDown={(event) => handleWorkspaceKeyDown(event, index)}
                role="tab"
                tabIndex={activeView === index ? 0 : -1}
                type="button"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{document}
              </button>
            ))}
          </div>
          <div className="workspace-mini-history"><History aria-hidden="true" size={14} /><span>{ui.history}</span></div>
        </nav>
        <article aria-labelledby={`workspace-tab-${activeView}`} className="workspace-editor" id="workspace-view" key={activeView} role="tabpanel">
          <span className="workspace-overline">{copy.currentLabel}</span>
          <h3>{active.title}</h3>
          <small>{active.meta}</small>
          <div className="editor-rule" aria-hidden="true" />
          <div className="workbench-path">
            {active.items.map((item, index) => (
              <div className="workbench-task" key={item}>
                <span className="workbench-task-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
                <span className={`workbench-task-state state-${index + 1}`}>{ui.taskStates[index]}</span>
              </div>
            ))}
          </div>
          <div className="workbench-observation" aria-label={ui.overview}>
            {ui.evidence.map((label, index) => (
              <div key={label}><span>{label}</span><strong>{ui.evidenceValues[index]}</strong></div>
            ))}
          </div>
          <mark>{copy.highlight}</mark>
        </article>
        <aside className="memory-rail">
          <span className="workspace-overline">{copy.memoryLabel}</span>
          <h3>{copy.memoryTitle}</h3>
          <div className="memory-thread">
            {copy.memories.map((memory, index) => (
              <article className="memory-note" key={`${memory.date}-${memory.title}`}>
                <span>{memory.date}</span><strong><i>{index + 1}</i>{memory.title}</strong><p>{memory.text}</p>
              </article>
            ))}
          </div>
          <div className="module-topology">
            <span>{ui.modules}</span>
            <div><strong>Skills</strong><ArrowRight aria-hidden="true" size={12} /><strong>MCP</strong><ArrowRight aria-hidden="true" size={12} /><strong>Plugins</strong></div>
          </div>
          <div className="suggestion-note">
            <span><CheckCircle2 aria-hidden="true" size={15} />{copy.suggestionStatus}</span>
            <strong>{copy.suggestionTitle}</strong>
            <p>{copy.suggestionText}</p>
          </div>
        </aside>
      </div>
    </div>
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
    ready: '目标已建立',
    policy: '当前目标',
    policyValue: '路径可验证',
    pending: '待确认沉淀',
    keep: '继续调整',
    confirm: '保存为 Deck',
  } : {
    ready: 'goal defined',
    policy: 'current goal',
    policyValue: 'verifiable path',
    pending: 'awaiting confirmation',
    keep: 'keep refining',
    confirm: 'save as Deck',
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
