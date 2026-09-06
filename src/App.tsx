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
  CheckCircle,
  Check,
  CheckCircle2,
  FileText,
  History,
  ImageIcon,
  Layers3,
  Link2,
  Menu,
  Play,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';

import {blogArticles} from './blog/articles';
import {BlogArticlePage, BlogPage} from './blog/BlogPages';

const startWritingUrl = 'https://ink-frontend.suoxya.com';
const subscriptionUrl = `${startWritingUrl}/story-workspace/subscription`;
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

type PricingPlan = {
  eyebrow: string;
  name: string;
  note: string;
  details: string[];
  allowance?: string;
  status: string;
  available: boolean;
};

type UseCasesPageCopy = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
  status: {
    available: string;
    planned: string;
    concept: string;
  };
  comfy: {
    eyebrow: string;
    title: string;
    description: string;
    goalLabel: string;
    goal: string;
    steps: Array<{label: string; title: string; description: string; output: string}>;
    resultLabel: string;
    result: string;
    disclaimer: string;
  };
  notion: {
    eyebrow: string;
    title: string;
    description: string;
    taskLabel: string;
    task: string;
    steps: Array<{title: string; description: string}>;
    resultLabel: string;
    result: string;
    boundary: string;
  };
  final: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
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
    pricing: string;
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
    action: string;
    items: UseCase[];
  };
  examples: {
    tabLabel: string;
    cases: ProductExample[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    capabilitiesLabel: string;
    capabilities: string[];
    cycle: string;
    liveNote: string;
    plans: PricingPlan[];
    faqEyebrow: string;
    faqTitle: string;
    faq: Array<{question: string; answer: string}>;
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
    canonicalUrl: 'https://ink-memory.suoxya.com/',
    homeHref: '/',
    languageHref: '/en/',
    languageLabel: 'English',
    skipLabel: '跳到主要内容',
    nav: {
      how: '怎么使用',
      memory: '使用场景',
      pricing: '定价',
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
      action: '查看完整使用场景',
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
    pricing: {
      eyebrow: 'Plans',
      title: '选择你的创作空间',
      description: 'Free 可直接使用。Dream 与 is Dreaming 会在订阅能力接通后开放。',
      capabilitiesLabel: '由业界顶尖模型驱动',
      capabilities: ['Seedance 2.0', 'GPT-Image-2', 'ComfyMCP Apps', 'DeepSeek V4', 'GPT-5.5'],
      cycle: '当前方案 · 按月',
      liveNote: '额度和可用状态以工作台订阅页的实时数据为准。',
      plans: [
        {
          eyebrow: 'A quiet beginning',
          name: 'Free',
          note: '从一段创作目标开始',
          details: ['查看已有 Deck', '发起有限次数的 Dream', '保留最近的工作台入口'],
          allowance: '每月 100,000,000 Token',
          status: '可以开通',
          available: true,
        },
        {
          eyebrow: 'For active stories',
          name: 'Dream',
          note: '给持续创作留出空间',
          details: ['更充足的 Dream 创作额度', '更长的 Dream Agent 对话历史', '优先体验新的创作工作台能力'],
          status: '暂不可开通',
          available: false,
        },
        {
          eyebrow: 'For ongoing worlds',
          name: 'is Dreaming',
          note: '为长期作品准备的工作台',
          details: ['面向多部作品的持续创作支持', '更完整的 Deck 与工作台协作空间', '适合正在形成中的故事世界'],
          status: '暂不可开通',
          available: false,
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: '相关问题',
      faq: [
        {
          question: 'Ink & Memory 适合谁？',
          answer: '适合持续写日记、做长期创作、整理复杂想法，并希望随时找回历史内容的人。',
        },
        {
          question: 'Free 包含什么？',
          answer: '可以查看已有 Deck、发起有限次数的 Dream，并保留最近的工作台入口。当前显示每月 100,000,000 Token；最终额度以订阅页实时数据为准。',
        },
        {
          question: 'Dream 和 is Dreaming 什么时候可以开通？',
          answer: '真实支付闭环、套餐配置与资格检查全部就绪后开放。在此之前只展示能力范围，不显示虚构价格或支付结果。',
        },
        {
          question: 'Token 如何计算和重置？',
          answer: '工作台订阅页会显示本周期总额、已使用量、剩余额度和下一次更新时间。模型调用完成后按真实消耗更新。',
        },
        {
          question: '可以升级、降级或取消吗？',
          answer: '可执行动作由当前套餐状态和订阅服务实时返回。每次变更先预览，再由你确认；页面状态变化后会要求重新确认。',
        },
        {
          question: 'AI 会直接执行工具操作吗？',
          answer: '需要授权的工具操作会先请求确认。写作内容、会话和订阅状态按当前用户隔离。',
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
    canonicalUrl: 'https://ink-memory.suoxya.com/en/',
    homeHref: '/en/',
    languageHref: '/',
    languageLabel: '中文',
    skipLabel: 'Skip to main content',
    nav: {
      how: 'How it works',
      memory: 'Use cases',
      pricing: 'Pricing',
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
      action: 'Explore all use cases',
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
    pricing: {
      eyebrow: 'Plans',
      title: 'Choose your creative space',
      description: 'Free is available now. Dream and is Dreaming will open when subscriptions are ready.',
      capabilitiesLabel: 'Powered by leading models',
      capabilities: ['Seedance 2.0', 'GPT-Image-2', 'ComfyMCP Apps', 'DeepSeek V4', 'GPT-5.5'],
      cycle: 'Current plans · Monthly',
      liveNote: 'Allowances and availability follow the live data shown in the workbench subscription page.',
      plans: [
        {
          eyebrow: 'A quiet beginning',
          name: 'Free',
          note: 'Start with one creative goal',
          details: ['Open available Decks', 'Start a limited number of Dream runs', 'Keep recent workbench entry points'],
          allowance: '100,000,000 tokens per month',
          status: 'Available',
          available: true,
        },
        {
          eyebrow: 'For active stories',
          name: 'Dream',
          note: 'More room for active creative work',
          details: ['More Dream creation allowance', 'Longer Dream Agent history', 'Early access to new creative workbench features'],
          status: 'Not yet available',
          available: false,
        },
        {
          eyebrow: 'For ongoing worlds',
          name: 'is Dreaming',
          note: 'A workbench for long-running work',
          details: ['Ongoing support across several works', 'A fuller Deck and workbench collaboration space', 'Built for story worlds taking shape over time'],
          status: 'Not yet available',
          available: false,
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions',
      faq: [
        {
          question: 'Who is Ink & Memory for?',
          answer: 'People who journal consistently, create over time, work through complex thoughts, and need to recall earlier writing.',
        },
        {
          question: 'What is included in Free?',
          answer: 'Open available Decks, start a limited number of Dream runs, and keep recent workbench entry points. The current display is 100,000,000 tokens per month; the subscription page remains authoritative.',
        },
        {
          question: 'When can I open Dream or is Dreaming?',
          answer: 'After payment, plan configuration, and eligibility checks are ready. Until then, the page shows the intended scope without inventing prices or payment results.',
        },
        {
          question: 'How are tokens counted and reset?',
          answer: 'The subscription page shows the granted, consumed, and remaining tokens for the current cycle and the next reset date. Usage updates from completed model calls.',
        },
        {
          question: 'Can I upgrade, downgrade, or cancel?',
          answer: 'Available actions come from the live subscription service. Every change is previewed and confirmed; stale state must be refreshed before you confirm again.',
        },
        {
          question: 'Can AI run tools without approval?',
          answer: 'Tool actions that require authorization ask for confirmation first. Writing, sessions, and subscription state are isolated to the current user.',
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

const useCasesPageCopy: Record<Locale, UseCasesPageCopy> = {
  zh: {
    metaTitle: 'Ink & Memory 使用场景 | ComfyUI MCP Apps 与 Notion',
    metaDescription: '查看 Ink & Memory 如何把视觉生成和外部资料带进当前任务：ComfyUI MCP Apps 概念方案与已实现的 Notion 只读连接。',
    canonicalUrl: 'https://ink-memory.suoxya.com/use-cases/',
    hero: {
      eyebrow: 'Use cases · 工作流',
      title: '从一句需求，到可继续使用的结果。',
      description: 'IM 把任务、资料、工具和结果放在同一条工作路径里。先看视觉生成，再看 Notion 资料如何进入当前写作。',
      primaryAction: '查看 ComfyUI 方案',
      secondaryAction: '查看 Notion 场景',
    },
    status: {
      available: '已实现',
      planned: '规划中',
      concept: '概念示意',
    },
    comfy: {
      eyebrow: '主要场景 · ComfyUI MCP Apps',
      title: '描述画面。运行工作流。拿回结果。',
      description: '面向角色设定、分镜和视觉素材。用户只说明目标，IM 负责把任务交给已配置的 ComfyUI 工作流，并在当前工作台显示过程与结果。',
      goalLabel: '当前需求',
      goal: '为长篇故事生成一张角色设定图：正面、侧面、服装细节，保持已有角色特征。',
      steps: [
        {label: '01 · 需求', title: '说明要生成什么', description: '目标、用途、画面比例、必须保留的角色事实。', output: '任务已整理'},
        {label: '02 · 工作流', title: '选择 ComfyUI 工作流', description: '选择模型、参考图和输出规格；参数保持可见。', output: '等待确认'},
        {label: '03 · 执行', title: '查看运行状态', description: '节点进度、失败位置和可重试步骤留在当前任务里。', output: '生成中'},
        {label: '04 · 结果', title: '接收并继续使用', description: '图片与生成记录回到任务，可加入 Deck 或继续调整。', output: '结果已返回'},
      ],
      resultLabel: '预期结果',
      result: '角色设定图 · 运行记录 · 可继续调整的工作流',
      disclaimer: '当前尚未接入可用的 ComfyUI MCP App、真实工作流或线上生成服务。本区只描述计划中的用户体验。',
    },
    notion: {
      eyebrow: '已实现 · Notion',
      title: '选择资料。同步索引。按需读取。',
      description: '写产品复盘、文章或方案时，先选定允许 IM 使用的 Notion 页面和数据库。需要时再读取相关页面，不必反复复制粘贴。',
      taskLabel: '示例任务',
      task: '写一篇产品复盘，核对最初目标、用户反馈和上线时间。',
      steps: [
        {title: '连接 Notion', description: '使用一个账号完成授权。'},
        {title: '选择范围', description: '勾选早期方案、用户反馈和上线记录。'},
        {title: '同步索引', description: '更新页面标题、类型和最近同步状态。'},
        {title: '按需读取', description: '对话需要时读取一个页面的最新 Markdown。'},
      ],
      resultLabel: '实际结果',
      result: '资料来源可见 · 读取范围可控 · 最近一次成功索引保留',
      boundary: 'Notion 当前为只读连接：不写回远程页面，也不会在启动对话时批量下载正文。',
    },
    final: {
      eyebrow: 'Task · Source · Result',
      title: '先从一个真实任务开始。',
      description: '打开工作台，写下目标，选择需要的资料和工作方式。',
      primaryAction: '打开工作台',
      secondaryAction: '返回首页',
    },
  },
  en: {
    metaTitle: 'Ink & Memory Use Cases | ComfyUI MCP Apps and Notion',
    metaDescription: 'See how Ink & Memory brings visual generation and external sources into one task: a planned ComfyUI MCP Apps experience and the implemented read-only Notion connection.',
    canonicalUrl: 'https://ink-memory.suoxya.com/en/use-cases/',
    hero: {
      eyebrow: 'Use cases · Workflows',
      title: 'From one request to a result you can keep using.',
      description: 'IM keeps the task, sources, tools, and output in one working path. Start with visual generation, then see how Notion material enters the writing process.',
      primaryAction: 'See the ComfyUI plan',
      secondaryAction: 'See the Notion workflow',
    },
    status: {
      available: 'Implemented',
      planned: 'Planned',
      concept: 'Concept illustration',
    },
    comfy: {
      eyebrow: 'Primary use case · ComfyUI MCP Apps',
      title: 'Describe the image. Run the workflow. Keep the result.',
      description: 'For character sheets, storyboards, and visual assets. The user states the goal; IM hands the task to a configured ComfyUI workflow and keeps its progress and result in the current workbench.',
      goalLabel: 'Current request',
      goal: 'Create a character sheet for a long-form story: front view, side view, costume details, and the established character traits.',
      steps: [
        {label: '01 · Brief', title: 'State what you need', description: 'Goal, intended use, aspect ratio, and character facts that must remain.', output: 'Brief prepared'},
        {label: '02 · Workflow', title: 'Choose a ComfyUI workflow', description: 'Choose the model, reference images, and output spec with visible parameters.', output: 'Awaiting approval'},
        {label: '03 · Run', title: 'Watch execution', description: 'Node progress, failures, and retryable steps stay with the current task.', output: 'Generating'},
        {label: '04 · Result', title: 'Receive and reuse', description: 'The image and run record return to the task for Deck storage or another iteration.', output: 'Result returned'},
      ],
      resultLabel: 'Expected result',
      result: 'Character sheet · Run record · Reusable workflow',
      disclaimer: 'No usable ComfyUI MCP App, real workflow, or online generation service is connected yet. This section describes the planned user experience only.',
    },
    notion: {
      eyebrow: 'Implemented · Notion',
      title: 'Choose sources. Sync the index. Read on demand.',
      description: 'When writing a retrospective, article, or proposal, choose the Notion pages and databases IM may use. Relevant pages can then be read without repeated copy and paste.',
      taskLabel: 'Example task',
      task: 'Write a product retrospective and verify the original goal, user feedback, and launch timeline.',
      steps: [
        {title: 'Connect Notion', description: 'Authorize one account.'},
        {title: 'Choose the scope', description: 'Select the early proposal, feedback, and launch record.'},
        {title: 'Sync the index', description: 'Update titles, resource types, and the last sync state.'},
        {title: 'Read on demand', description: 'Read the latest Markdown for one page when the conversation needs it.'},
      ],
      resultLabel: 'Actual result',
      result: 'Visible sources · Controlled scope · Last successful index retained',
      boundary: 'The current Notion connection is read-only: it does not write back to remote pages or bulk-download page bodies when a conversation starts.',
    },
    final: {
      eyebrow: 'Task · Source · Result',
      title: 'Start with one real task.',
      description: 'Open the workbench, state the goal, and choose the sources and workflow you need.',
      primaryAction: 'Open workbench',
      secondaryAction: 'Back to home',
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
  const isPricingPage = normalizedPath === '/pricing' || normalizedPath === '/en/pricing';
  const isUseCasesPage = normalizedPath === '/use-cases' || normalizedPath === '/en/use-cases';
  const locale: Locale =
    normalizedPath === '/en' || normalizedPath.startsWith('/en/') || currentArticle?.language === 'English' ? 'en' : 'zh';
  const copy = homeCopy[locale];
  const useCasesCopy = useCasesPageCopy[locale];
  const pricingHref = locale === 'en' ? '/en/pricing/' : '/pricing/';
  const useCasesHref = locale === 'en' ? '/en/use-cases/' : '/use-cases/';
  const languageHref =
    isPricingPage ? (locale === 'en' ? '/pricing/' : '/en/pricing/')
    : isUseCasesPage ? (locale === 'en' ? '/use-cases/' : '/en/use-cases/')
    : copy.languageHref;

  const navItems: NavItem[] = [
    {label: copy.nav.how, href: `${copy.homeHref}#how-it-works`},
    {label: copy.nav.memory, href: useCasesHref},
    {label: copy.nav.pricing, href: pricingHref},
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
    document.body.dataset.page =
      isBlogPage ? 'portal-blog'
      : isPricingPage ? 'portal-pricing'
      : isUseCasesPage ? 'portal-use-cases'
      : 'portal-home';
    document.title =
      currentArticle ? `${currentArticle.title} | Ink & Memory Blog`
      : isBlogPage ? 'Ink & Memory Blog | AI 写作记忆与工作空间设计'
      : isPricingPage ? (locale === 'en' ? 'Ink & Memory Pricing | Free, Dream, is Dreaming' : 'Ink & Memory 定价 | Free、Dream、is Dreaming')
      : isUseCasesPage ? useCasesCopy.metaTitle
      : copy.metaTitle;

    const description =
      currentArticle?.summary ??
      (isBlogPage ? 'Ink & Memory Blog 收录 AI 写作、长期记忆、Workspace 状态管理和交互设计文章。'
      : isPricingPage ? copy.pricing.description
      : isUseCasesPage ? useCasesCopy.metaDescription
      : copy.metaDescription);
    const canonicalUrl =
      currentArticle ? currentArticle.canonicalHref
      : isBlogPage ? 'https://ink-memory.suoxya.com/blog/'
      : isPricingPage ? (locale === 'en' ? 'https://ink-memory.suoxya.com/en/pricing/' : 'https://ink-memory.suoxya.com/pricing/')
      : isUseCasesPage ? useCasesCopy.canonicalUrl
      : copy.canonicalUrl;
    const socialImageUrl = 'https://ink-memory.suoxya.com/og-image.png';

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
  }, [currentArticle, isBlogPage, isPricingPage, isUseCasesPage, locale, copy, useCasesCopy]);

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
          <a className="language-link" href={languageHref} aria-label={copy.languageLabel}>
            {copy.languageLabel}
          </a>
          <a className="header-cta" href={startWritingUrl} rel="noreferrer" target="_blank">
            {copy.nav.write}
          </a>
        </div>
      </header>

      {currentArticle ? <BlogArticlePage article={currentArticle} />
      : isBlogPage ? <BlogPage />
      : isPricingPage ? <PricingPage copy={copy} />
      : isUseCasesPage ? <UseCasesPage copy={useCasesCopy} homeHref={copy.homeHref} />
      : <HomePage copy={copy} useCasesHref={useCasesHref} />}

      <footer className="site-footer" aria-label="Project links">
        <div className="footer-brand">
          <strong>Ink &amp; Memory</strong>
        </div>
        <div className="footer-links">
          <a href={startWritingUrl} rel="noreferrer" target="_blank">{copy.nav.write}</a>
          <a href={pricingHref}>{copy.nav.pricing}</a>
          <a href={useCasesHref}>{copy.nav.memory}</a>
          <a href={blogUrl}>Blog</a>
          <a href={repositoryUrl} rel="noreferrer" target="_blank">GitHub</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href={languageHref}>{copy.languageLabel}</a>
        </div>
      </footer>
    </>
  );
}

function HomePage({copy, useCasesHref}: {copy: HomeCopy; useCasesHref: string}) {
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
            <a className="button button-secondary" href={useCasesHref}>
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
        <a className="scenario-page-link" href={useCasesHref}>
          <span>{copy.useCases.action}</span><ArrowRight aria-hidden="true" size={18} />
        </a>
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

function PlatformBrandMark({kind}: {kind: 'comfy' | 'notion'}) {
  if (kind === 'notion') {
    return (
      <span className="platform-brand platform-brand--notion" aria-label="Notion">
        <span className="platform-brand-symbol" aria-hidden="true"><span>N</span></span>
        <strong>Notion</strong>
      </span>
    );
  }

  return (
    <span className="platform-brand platform-brand--comfy" aria-label="ComfyUI">
      <span className="platform-brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <path d="M7 8h8v7H7zM17 17h8v7h-8z" />
          <path d="M15 11.5h4.5a3 3 0 0 1 3 3V17M17 20.5h-4.5a3 3 0 0 1-3-3V15" />
        </svg>
      </span>
      <strong>ComfyUI</strong>
    </span>
  );
}

function UseCasesPage({copy, homeHref}: {copy: UseCasesPageCopy; homeHref: string}) {
  const [activeComfyStep, setActiveComfyStep] = useState(0);
  const storyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;

    const updateFromScroll = () => {
      const story = storyRef.current;
      const stage = stageRef.current;
      if (!story || !stage) return;
      const compact = window.matchMedia('(max-width: 820px)').matches;
      if (compact || motionQuery.matches) {
        story.style.setProperty('--use-case-progress', '100%');
        panelRefs.current.forEach((panel) => {
          panel?.style.setProperty('--case-reveal', '1');
          panel?.style.setProperty('--case-inset', '0%');
          panel?.style.setProperty('--case-shift', '0px');
        });
        return;
      }

      const stickyTop = 96;
      const storyRect = story.getBoundingClientRect();
      const track = Math.max(1, story.offsetHeight - stage.offsetHeight);
      const progress = Math.min(1, Math.max(0, (stickyTop - storyRect.top) / track));
      const nextStep = Math.min(copy.comfy.steps.length - 1, Math.floor(progress * copy.comfy.steps.length));
      setActiveComfyStep((current) => current === nextStep ? current : nextStep);
      story.style.setProperty('--use-case-progress', `${progress * 100}%`);

      panelRefs.current.forEach((panel, index) => {
        const start = index === 0 ? 0 : (index - 0.2) / copy.comfy.steps.length;
        const end = Math.min(1, start + 0.19);
        const linear = index === 0 ? 1 : Math.min(1, Math.max(0, (progress - start) / Math.max(0.01, end - start)));
        const reveal = 1 - Math.pow(1 - linear, 3);
        panel?.style.setProperty('--case-reveal', String(reveal));
        panel?.style.setProperty('--case-inset', `${(1 - reveal) * 100}%`);
        panel?.style.setProperty('--case-shift', `${(1 - reveal) * 34}px`);
      });
      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateFromScroll);
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
  }, [copy.comfy.steps.length]);

  return (
    <main className="use-cases-page" id="main">
      <section className="use-cases-hero" aria-labelledby="useCasesHeroTitle">
        <p className="eyebrow">{copy.hero.eyebrow}</p>
        <h1 id="useCasesHeroTitle">{copy.hero.title}</h1>
        <p>{copy.hero.description}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#comfyui-use-case">{copy.hero.primaryAction}<ArrowRight aria-hidden="true" size={18} /></a>
          <a className="button button-secondary" href="#notion-use-case">{copy.hero.secondaryAction}</a>
        </div>
      </section>

      <section className="comfy-use-case" id="comfyui-use-case" aria-labelledby="comfyUseCaseTitle">
        <header className="use-case-heading">
          <div>
            <PlatformBrandMark kind="comfy" />
            <p className="eyebrow">{copy.comfy.eyebrow}</p>
          </div>
          <span className="use-case-status use-case-status--planned"><span aria-hidden="true" />{copy.status.planned}</span>
          <h2 id="comfyUseCaseTitle">{copy.comfy.title}</h2>
          <p>{copy.comfy.description}</p>
        </header>

        <div className="use-case-goal">
          <span>{copy.comfy.goalLabel}</span>
          <p>{copy.comfy.goal}</p>
        </div>

        <div className="comfy-scroll-story" ref={storyRef}>
          <div className="comfy-sticky-stage" ref={stageRef}>
            <ol className="comfy-step-rail" aria-label={copy.comfy.eyebrow}>
              {copy.comfy.steps.map((step, index) => (
                <li className={activeComfyStep === index ? 'is-active' : ''} aria-current={activeComfyStep === index ? 'step' : undefined} key={step.label}>
                  <span>{String(index + 1).padStart(2, '0')}</span><strong>{step.label.replace(/^\d+\s·\s/, '')}</strong>
                </li>
              ))}
            </ol>

            <div className={`comfy-concept-canvas is-step-${activeComfyStep + 1}`} aria-label={`${copy.status.concept}: ${copy.comfy.goal}`}>
              <div className="concept-canvas-toolbar">
                <PlatformBrandMark kind="comfy" />
                <span>{copy.status.concept}</span>
              </div>
              <div className="comfy-brief-card">
                <FileText aria-hidden="true" size={18} />
                <span>{copy.comfy.goalLabel}</span>
                <p>{copy.comfy.goal}</p>
              </div>
              <div className="comfy-node-field" aria-hidden="true">
                <span className="comfy-node-link comfy-node-link--1" />
                <span className="comfy-node-link comfy-node-link--2" />
                <span className="comfy-node-link comfy-node-link--3" />
                <div className="comfy-node comfy-node--brief"><FileText size={17} /><span>Brief</span><small>role facts</small></div>
                <div className="comfy-node comfy-node--model"><Layers3 size={17} /><span>Model</span><small>configured</small></div>
                <div className="comfy-node comfy-node--run"><Play size={17} /><span>Run</span><small>pending</small></div>
                <div className="comfy-node comfy-node--output"><ImageIcon size={17} /><span>Output</span><small>task asset</small></div>
              </div>
              <div className="comfy-run-state">
                <span><Workflow aria-hidden="true" size={17} />{copy.comfy.steps[activeComfyStep].output}</span>
                <span className="comfy-run-line"><i /></span>
                <span>{String(activeComfyStep + 1).padStart(2, '0')} / 04</span>
              </div>
            </div>

            <div className="comfy-copy-stack" aria-live="polite">
              {copy.comfy.steps.map((step, index) => (
                <article
                  className={`comfy-copy-panel${activeComfyStep === index ? ' is-current' : ''}`}
                  key={step.label}
                  ref={(element) => {panelRefs.current[index] = element;}}
                >
                  <p>{step.label}</p>
                  <h3>{step.title}</h3>
                  <span aria-hidden="true" />
                  <p>{step.description}</p>
                  <small>{step.output}</small>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="use-case-result">
          <CheckCircle aria-hidden="true" size={21} />
          <div><span>{copy.comfy.resultLabel}</span><strong>{copy.comfy.result}</strong></div>
        </div>
        <p className="use-case-disclaimer"><span>{copy.status.concept}</span>{copy.comfy.disclaimer}</p>
      </section>

      <section className="notion-use-case" id="notion-use-case" aria-labelledby="notionUseCaseTitle">
        <header className="use-case-heading use-case-heading--notion">
          <div>
            <PlatformBrandMark kind="notion" />
            <p className="eyebrow">{copy.notion.eyebrow}</p>
          </div>
          <span className="use-case-status use-case-status--available"><span aria-hidden="true" />{copy.status.available}</span>
          <h2 id="notionUseCaseTitle">{copy.notion.title}</h2>
          <p>{copy.notion.description}</p>
        </header>

        <div className="notion-workflow">
          <div className="notion-task">
            <span><FileText aria-hidden="true" size={18} />{copy.notion.taskLabel}</span>
            <p>{copy.notion.task}</p>
            <div className="notion-selected-sources" aria-label={copy.notion.resultLabel}>
              <span><FileText aria-hidden="true" size={15} />Early proposal</span>
              <span><Link2 aria-hidden="true" size={15} />User feedback</span>
              <span><FileText aria-hidden="true" size={15} />Launch record</span>
            </div>
          </div>
          <ol className="notion-steps">
            {copy.notion.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{step.title}</strong><p>{step.description}</p></div>
                <Check aria-hidden="true" size={17} />
              </li>
            ))}
          </ol>
        </div>

        <div className="use-case-result use-case-result--notion">
          <CheckCircle aria-hidden="true" size={21} />
          <div><span>{copy.notion.resultLabel}</span><strong>{copy.notion.result}</strong></div>
        </div>
        <p className="notion-boundary">{copy.notion.boundary}</p>
      </section>

      <section className="final-cta use-cases-final" aria-labelledby="useCasesFinalTitle">
        <p className="eyebrow">{copy.final.eyebrow}</p>
        <h2 id="useCasesFinalTitle">{copy.final.title}</h2>
        <p>{copy.final.description}</p>
        <div className="final-actions">
          <a className="button button-light" href={startWritingUrl} rel="noreferrer" target="_blank">{copy.final.primaryAction}<ArrowRight aria-hidden="true" size={19} /></a>
          <a className="button button-on-dark" href={homeHref}>{copy.final.secondaryAction}</a>
        </div>
      </section>
    </main>
  );
}

function PricingPage({copy}: {copy: HomeCopy}) {
  return (
    <main className="pricing-page" id="main">
      <PricingSection copy={copy.pricing} />
    </main>
  );
}

function PricingSection({copy}: {copy: HomeCopy['pricing']}) {
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricingTitle">
      <div className="pricing-shell">
        <header className="pricing-heading">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="pricingTitle">{copy.title}</h1>
          <p>{copy.description}</p>
        </header>

        <p className="pricing-capabilities-label">{copy.capabilitiesLabel}</p>
        <ul className="pricing-capabilities" aria-label={copy.capabilitiesLabel}>
          {copy.capabilities.map((capability, index) => (
            <li key={capability}><span aria-hidden="true" className={`model-mark model-mark-${index + 1}`}><ModelGlyph index={index} /></span>{capability}</li>
          ))}
        </ul>

        <div className="pricing-cycle-row"><span className="pricing-cycle">{copy.cycle}</span></div>

        <div className="pricing-grid">
          {copy.plans.map((plan) => (
            <article className={`pricing-card${plan.available ? ' is-available' : ''}`} key={plan.name}>
              <div className="pricing-card-topline">
                <p>{plan.eyebrow}</p>
                <span>{plan.status}</span>
              </div>
              <h3>{plan.name}</h3>
              <p className="pricing-card-note">{plan.note}</p>
              <ul>
                {plan.details.map((detail) => <li key={detail}><Check aria-hidden="true" size={15} />{detail}</li>)}
              </ul>
              {plan.allowance ? <strong className="pricing-allowance">{plan.allowance}</strong> : null}
              {plan.available ? (
                <a className="pricing-action" href={subscriptionUrl} rel="noreferrer" target="_blank">
                  {plan.status}<ArrowRight aria-hidden="true" size={17} />
                </a>
              ) : (
                <button className="pricing-action" disabled type="button">{plan.status}</button>
              )}
            </article>
          ))}
        </div>
        <p className="pricing-live-note">{copy.liveNote}</p>

        <div className="pricing-faq">
          <header className="pricing-faq-heading">
            <p className="eyebrow">{copy.faqEyebrow}</p>
            <h2>{copy.faqTitle}</h2>
          </header>
          <div className="pricing-faq-list">
            {copy.faq.map((item, index) => (
              <details className="pricing-faq-item" key={item.question} open={index === 0 || undefined}>
                <summary>
                  <span>{item.question}</span>
                  <span aria-hidden="true" className="pricing-faq-toggle" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
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

function ModelGlyph({index}: {index: number}) {
  const glyph = index % 5;
  const byteDancePath = 'M19.8772 1.4685 24 2.5326v18.9426l-4.1228 1.0563V1.4685Zm-13.3481 9.428 4.115 1.0641v8.9786l-4.115 1.0642v-11.107ZM0 2.572l4.115 1.0642v16.7354L0 21.428V2.572Zm17.4553 5.6205v11.107l-4.1228-1.0642V9.2568l4.1228-1.0642Z';
  const openAiPath = 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729Zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944Zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464ZM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872Zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667Zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66ZM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813Zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z';
  const deepSeekPath = 'M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588ZM11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615Zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307Zm3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45Z';

  if (glyph === 2) {
    return (
      <svg aria-hidden="true" viewBox="0 0 142 142">
        <rect width="142" height="142" rx="33" fill="#F2FF59" />
        <path d="M91.7457 90.1697c.1331-.4502.2057-.9248.2057-1.4236 0-2.762-2.227-5.0009-4.9746-5.0009H64.6819c-1.1983.0122-2.1787-.9612-2.1787-2.1658 0-.219.0364-.4258.0848-.6205l6.0034-21.0254c.2542-.9247 1.1014-1.6061 2.0939-1.6061l22.3797-.0243c4.7204 0 8.702 3.1999 9.901 7.568l3.365-11.7173c.108-.4137.169-.8639.169-1.3141 0-2.7498-2.215-4.9764-4.95-4.9764H74.4738c-4.6963 0-8.6663 3.1757-9.8887 7.4951l-2.2755 7.9939c-.2663.9126-1.1014 1.5818-2.0939 1.5818h-6.4997c-4.6599 0-8.5936 3.1149-9.8524 7.3855L35.6816 85.911c-.1211.4259-.1816.8883-.1816 1.3506 0 2.762 2.2271 5.0009 4.9746 5.0009h6.3907c1.1983 0 2.1787.9734 2.1787 2.1901 0 .2069-.0242.4137-.0847.6084l-2.2634 7.921c-.109.426-.1816.864-.1816 1.314 0 2.75 2.215 4.977 4.9504 4.977l27.088-.025c4.7083 0 8.6783-3.188 9.8887-7.531l3.2922-11.5352.0121-.0121Z" fill="#211927" />
      </svg>
    );
  }

  const path = glyph === 0 ? byteDancePath : glyph === 3 ? deepSeekPath : openAiPath;
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24"><path d={path} /></svg>
  );
}

export default App;
