# 阶段一：问题判断与处理方案

## Optimized Prompt

你是 Ink Memory 落地页改造的产品设计负责人。基于以下一手证据完成编码前审计：当前 React/Vite 实现及未提交修改、`assets/Ink & Memory UI Design v2.pdf` 的视觉规范、`PROJECT-DESIGN.md` 与 `README.md` 的真实产品定位，以及在 Chrome 中对 `https://composio.dev/` 的桌面端与移动端观察。输出当前页面问题、可借鉴的结构原则、必须保留的 Ink Memory 概念、Mimo 的生产页面残留位置、目标差距、技术/素材/响应式/性能风险、推荐信息架构、实现优先级、最小可行改造范围和明确的不做清单。不得复制 Composio 的品牌、文案、客户标识或视觉资产；不得把 PDF 中与“移除 Mimo”冲突的角色规范继续用于页面。结论必须能直接约束后续交互设计与实现，并标明事实、推断和待接入项。

### Optional Enhancers

- 保存 1440px 与 390px 的参考站/现状截图，供改造前后对比。
- 建立“Composio 参考点 → Ink Memory 转译方案 → 禁止复制项”的映射。

## 证据范围

- 技术栈：React 19、TypeScript 5.8、Vite 6、Lucide；已有 `motion` 依赖，但当前首页无需新增动画库。
- 当前实现：`src/App.tsx`、`src/index.css`，首页与 Blog 共用 Header/Footer；首页中文 `/`、英文 `/en/`。
- 工作区状态：用户删除了旧版 `assets/Ink & Memory UI Design.pdf`，并新增 `assets/Ink & Memory UI Design v2.pdf`。这两项不回滚、不覆盖。
- PDF：19 页、A4 文本型规范；权威内容是 v2.0 色彩 Token、轻纸面、少面板、多留白、克制动效。角色章节与本次“移除 Mimo”目标冲突，角色内容不执行。
- 参考站证据：`evidence/composio-desktop-1440.png`、`evidence/composio-mobile-390.png`、`evidence/composio-mobile-menu-390.png`。
- 当前页基线：`evidence/ink-before-desktop-1440.png`、`evidence/ink-before-mobile-390.png`。

## 当前落地页存在的问题

1. **首屏认知被角色视觉抢占。** 右侧 Mimo 约占首屏一半，用户先看到 IP，而不是“跨平台个人写作记忆层”和“AI 读取当前写作、关键写入需确认”。
2. **Mimo 深度写入信息架构。** Header、Hero 次 CTA、快速入口、独立角色区、两张大图、英文副本、ARIA/alt 文本均出现 Mimo，无法通过简单隐藏一个区块完成清理。
3. **页面更像品牌提案，缺少产品证据。** 能力主要以图标卡片陈述，没有展示从导入文字、当前写作、记忆检索到确认写入的实际关系。
4. **重复卡片造成层级趋平。** 快速入口、四项价值、三张 Portal 共 11 个相似卡片，所有内容获得近似视觉权重，与 PDF 的“轻纸面、少面板、多留白”相冲突。
5. **浏览路径过短且跳跃。** 当前从 Hero 直接进入入口和功能清单，中间没有“产品怎样工作”的连续叙事，CTA 的理由不足。
6. **存在无效或含糊锚点。** `#brand-kit`、`#stories` 作为产品行为入口，但页面没有对应真实产品能力/路由；“查看报告”“管理声音”看似可执行，实际只在当前页跳转。
7. **Header 滚动行为过度。** 向下滚动后 Logo 与 CTA 变为两个固定浮层、导航隐藏，增加布局和认知变化；落地页只需要稳定的轻量 sticky header。
8. **移动端内容过长但密度没有重排。** 卡片全量纵向堆叠，用户需穿过多个相似模块；导航是小型弹层而不是更清晰的移动菜单层。
9. **品牌 Logo 自带角色符号。** 图片 Logo 尾部含角色/墨滴面孔，必须替换为纯文字品牌标识。
10. **旧设计文档与当前代码不完全同步。** `PROJECT-DESIGN.md` 描述 12 屏沉浸式页面，当前实现实际为约 4 段门户页；后续以真实代码和本次交互稿为准，不恢复旧 12 屏方案。

## Composio 值得借鉴的核心原则

| 参考原则 | 观察证据 | Ink Memory 转译 |
|---|---|---|
| 单一首屏命题 | 1440px 下 H1 64px、居中、双 CTA，首屏先讲价值 | 用一句“让过去写下的内容，参与今天的回应”建立记忆价值；保留主 CTA + 查看工作方式 |
| 产品演示紧随 Hero | Hero 后立即出现大型交互演示 | 使用原创 CSS 构成的写作工作区演示，不使用 Composio 终端/UI |
| 先总览后逐步展开 | “Why” 区用编号导航和四段能力叙事 | 转译成导入、同页阅读、形成记忆、确认写入四步，不复制其标题与画面 |
| 强节奏切换 | 深浅背景、全宽分段、长短区块交替 | 仍用 PDF 暖纸色系，只通过纸面层级、细分隔线、留白与局部深棕带切换 |
| 一处主交互，多处静态叙事 | 关键 Tab 有交互，其余区块以阅读为主 | 仅工作方式区提供可访问 Tab；其余保持静态，避免动画泛滥 |
| 移动端线性化 | H1 36px、双栏改单栏、复杂演示降级、全屏菜单 | 保持核心文案和 CTA，演示变为紧凑单列，Tab 可横向滚动或纵向展开 |
| 最终 CTA 再收束 | 页尾大标题 + 双 CTA | 以“从今天这一页开始”收束，只保留真实产品入口和 Blog 次入口 |

## 需要转换或舍弃的参考内容

### 转换为 Ink Memory 品牌语言

- Composio 的黑底、网格和高饱和蓝紫视觉 → Warm Canvas / Paper Cream / Charcoal Brown，黄色与绿色只作小面积标记。
- Agent 工具调用演示 → 写作页、上下文、记忆线索和“待确认修改”的原创界面模型。
- 工程能力编号 → 用户可理解的四步写作/记忆过程。
- 安全能力 Accordion → “AI 能读什么、何时能写、谁做最终决定”的边界说明。

### 必须舍弃

- Composio Logo、文案、客户 Logo 墙、集成图标资源、终端 ASCII、Claude/代码窗口、蓝紫霓虹素材。
- “1500+”“100k”等不可验证数据、客户背书和认证声明。
- 面向开发者平台的复杂 mega-menu、价格/销售入口、SDK 代码示例。
- 7,000px 以上的长页面体量；Ink Memory 只保留能支持认知与转化的 6–7 个区块。

## Ink Memory 必须保留的内容

- 定位：跨平台个人写作记忆层，而非普通日记工具或通用聊天框。
- 对象：长期写作者、自我探索者、日记/随笔/梦境/情绪记录用户。
- 主价值：收回 Notion、飞书、Obsidian、Flomo 等平台的个人文字；可检索、可对话、可长期沉淀。
- 差异：AI 与用户看同一页、记忆会影响未来回应、写入/改写/插入/评论需用户可见并确认。
- 语气：温暖、安静、克制、站在写作者一侧。
- 真实入口：`https://ink-frontend.suoxya.com`、Blog、GitHub、Sitemap；不虚构报告或声音管理路由。
- 中英文入口和现有 Blog 路由能力。

## Mimo 生产页面清理清单

- `src/App.tsx`：`Smile`、`Star`、`heroMimoPortal`、`mimoCharacterPortal` 导入。
- `HomeCopy`：所有 `mimo*` 字段；中英文 `secondaryAction`、快速入口中的 Mimo/Brand Kit 文案与链接。
- `navItems` 中的 Mimo 项。
- Hero 次 CTA、Hero figure 的 ARIA/alt、独立 `.mimo-section` 全部结构。
- 图片 Logo `logo-horizontal.png`（尾部角色符号），改为纯文字标识。
- `src/index.css`：`#mimo`、`.mimo-*`、Mimo 特定响应式样式。
- 生产触点审计：Header/Logo、favicon、OG/JSON-LD、SEO 静态内容、`llms.txt` 与 clean build 产物均需检查；“companion”不得继续作为角色化品牌表达。
- 历史设计 PDF、生成脚本和未被生产入口引用的源资产保留为项目档案；必须确保不被首页 import、不进入本次页面 DOM，构建产物中不出现 Mimo 文案或角色图片。

## 差距与风险

| 风险 | 影响 | 控制方案 |
|---|---|---|
| 技术：Home 与 Blog 共用结构/样式 | 重写首页可能破坏 Blog | 保留 Blog 组件与样式，只替换 Home 数据、标记和首页命名空间；验证 `/blog/` |
| 技术：当前无路由库 | 不能虚构复杂流程 | 继续按 pathname 分支；锚点 + 真实外链即可 |
| 素材：PDF 主要是文字规范且偏 Mimo | 缺少去 IP 后的主视觉 | 用原创 CSS/SVG 写作工作区和“记忆边线”，不下载不明素材，不依赖 Pinterest |
| 视觉：Composio 与 PDF 风格冲突 | 易成为换皮或偏离品牌 | 骨架取 Composio，颜色/表面/字体/圆角完全服从 PDF Token |
| 响应式：交互演示信息密度高 | 390px 可能溢出 | 移动端隐藏非关键辅助栏、Tab 横向可滚动、卡片单列、44px 点击目标 |
| 性能：大图/视频/动画 | LCP 与滚动性能退化 | Hero 不使用 Mimo 大图或视频；主要视觉为 DOM/CSS；IntersectionObserver 只做一次性渐入且 Reduced Motion 禁用 |
| 内容：缺少真实客户/量化证据 | 社会证明不足 | 不伪造；用“支持的平台 + 可见确认边界 + Blog 深度文章”构成可信度 |
| 链接：外部产品入口可用性未知 | CTA 可能受外部服务状态影响 | 保留既有地址并标为新窗口；测试只验证 href，不对生产服务作副作用操作 |

## 推荐信息架构

1. Sticky Header：纯文字 Logo、工作方式、记忆、边界、Blog、开始写作。
2. Hero：唯一价值主张、简洁说明、主/次 CTA、边界承诺。
3. Product proof：原创工作区演示，把“当前页 + 相关记忆 + 待确认写入”放在一个画面。
4. Platform strip：Notion / 飞书 / Obsidian / Flomo，以文字而非品牌图标强调“把文字带回来”。
5. How it works：四步 Tab/章节叙事，唯一主要交互。
6. Use cases：日记反思、长文写作、跨平台回看三种场景，使用轻纸面行而非厚重卡片。
7. Trust boundary：读取、建议、写入确认与隐私边界。
8. Final CTA + Footer：开始今天的书写、阅读 Blog、项目链接。

## 实现优先级与最小可行范围

- P0：移除所有生产页面 Mimo 文案/图像/链接；替换 Logo；同步 favicon/OG 到 v2 Token；重建 Hero 与工作区演示；修复锚点和 CTA；桌面/移动响应式；键盘与 Reduced Motion。
- P1：四步 Tab、导航抽屉、轻量进入视口渐入；真实 Blog 入口与信任说明。
- P2：改造前后截图与 Lighthouse（环境允许时）；不以分数替代功能验收。

## 明确不做

- 不新增路由器、状态管理、动画库、图表库或 UI 框架。
- 不实现登录/注册/导入/报告/声音管理等后端业务。
- 不伪造客户 Logo、用户数量、评分、认证、案例或性能指标。
- 不复制 Composio 的品牌资产、代码窗口、文案、网格配色或大型 mega-menu。
- 不恢复旧 12 屏 scroll-snap，不加入重视频、3D、Canvas、粒子或持续背景动画。
- 不改写 Blog 内容、不删除历史 PDF/资产库、不触碰用户的未提交 PDF 变更。

## 阶段结论

**通过进入阶段二。** 最小改造方向明确：从“角色品牌门户”转为“以真实产品工作流为主角的写作记忆落地页”，保留暖纸与手写记忆感，减少卡片和动效，只实现一处有意义的交互。
