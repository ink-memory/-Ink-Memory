# 阶段四：设计目标符合性评审

## Optimized Prompt

你是 Ink Memory 落地页编码前的产品设计评审负责人。以阶段一审计、阶段二交互稿、阶段三时序图和项目真实技术栈为证据，对以下项目逐项判定“通过、需调整或不适用”：产品概念、Mimo 清理、Composio 骨架借鉴、避免品牌复制、UI Design v2 PDF、首屏价值、浏览与转化、桌面/移动、可访问性、过度设计、新依赖、架构一致性、实现维护性。每项必须说明证据与编码门禁；发现问题时先修订设计，不得通过增加不必要功能解决。重点检查生产 DOM、图片 Logo、social preview、SEO 静态内容、锚点、真实链接、四步 Tab、移动菜单、Reduced Motion 和脚本失败降级。只有所有“需调整”都有明确且最小的处理方案后，才能允许进入实现。

### Optional Enhancers

- 增加“设计承诺 → 代码检查 → E2E 断言”的追踪矩阵。
- 将不属于本仓库的产品登录/后端流程单独列为待接入边界。

## 评审结论

**结论：初审有条件不通过；完成设计修订后通过，可进入实现。** 四项需调整内容已写入阶段二/三规格和本页编码门禁：Mimo 是生产面清理而非删除历史设计档案；OG 视觉必须同步 v2 色值；焦点对比与移动菜单需要加强；`index.html` 的静态 SEO 后备不能在 bundle 成功前被隐藏。产品示意与真实锚点约束也已锁定。

## 逐项评审

| 评审项 | 结论 | 证据与判断 | 编码门禁 |
|---|---|---|---|
| 保持 Ink Memory 产品概念 | 通过 | Hero、产品示意、四步和边界均围绕跨平台写作记忆、同页注意力、长期回应、确认写入 | 文案不得退回泛化“AI 日记”或拟人陪伴 |
| 完全隐藏 Mimo IP | 需调整 → 已修订设计 | 设计稿不含角色；当前代码仍有 Mimo nav、CTA、段落、alt、两张大图和带角色 Logo | 移除生产 import/DOM/CSS/ARIA/alt；审计 favicon/OG/SEO/llms；纯文字 Logo；clean build 后大小写不敏感搜索 |
| 借鉴 Composio 骨架与交互 | 通过 | 单一 Hero、Hero 后产品证明、四步主交互、场景、边界、Final CTA 的节奏可追溯到参考分析 | 只保留结构与节奏，不复制其具体内容或视觉 |
| 避免复制 Composio 品牌资产 | 通过 | 方案零外部素材；产品示意为写作/记忆场景；无客户 Logo、终端、代码、蓝紫霓虹 | 不下载参考站资源；截图仅留在 evidence，不进入页面 |
| 符合 UI Design v2.pdf | 需调整 → 已修订设计 | 页面方案使用 v2 Token，但 `public/og-image.svg/png` 仍为 PDF 禁止的 v1 色值 | 页面与 OG 全部映射 v2 Token；不执行 PDF 角色章节；不新增孤立色值 |
| 首屏价值表达明确 | 通过 | Eyebrow 明示“跨平台个人写作记忆层”，H1 表达长期自我，Lead 解释平台/同页/确认 | 1440 与 390 首屏均需看到 H1、Lead、主 CTA，不被演示压过 |
| 浏览与转化路径清晰 | 通过 | Header → Hero → 产品证明 → 四步 → 场景 → 边界 → CTA；主 CTA 始终指向既有产品入口 | 删除 `#brand-kit`、`#stories` 等假动作；次 CTA 只到真实锚点/Blog |
| 支持桌面端和移动端 | 通过 | 1440/768/390 线框已定义；三列演示按 2 列/单列降级；Tab 横向滚动 | 额外验证 1280×800；任何视口 `scrollWidth <= clientWidth` |
| 基础可访问性 | 需调整 → 已修订设计 | 原绿色焦点环在暖纸背景对比不足；全屏移动菜单需要焦点圈闭与背景 inert | 改用炭棕/Action Brown 焦点双环；实现唯一 tabpanel、正确 tabIndex、菜单 focus trap/inert、Escape/焦点归还、Reduced Motion |
| 不存在过度设计 | 通过 | 只有一处滚动驱动的四步切换与一处菜单状态；不使用视频、3D、Canvas、scroll-snap、自动轮播 | sticky 区只读取原生滚动进度、不锁滚轮；移动端与 Reduced Motion 降级；不追加装饰系统 |
| 不引入不必要新依赖 | 通过 | React/Lucide/CSS 足够；`motion` 即使已存在也无需用于首页 | 不改 `package.json` 依赖；不加载远程字体/图片 |
| 不偏离当前技术架构 | 需调整 → 已修订设计 | pathname 分支、现有 Blog 和外链边界正确；阶段三曾出现不存在的 noscript 假设，现已改为保留现有静态 SEO 内容 | 不引入 Router/虚构 fallback；React 成功时自然替换静态内容，失败时保留它 |
| 可在合理时间实现和维护 | 通过 | 本地配置数据 + 1 个 `activeStep`；CSS 断点复用现有 1120/900/640 体系 | 首页逻辑保持单文件可读；重复预览由数据映射生成 |

## 初审问题及设计修订

### 1. 生产页清理与历史档案边界

- **问题**：PDF 与历史资产本身包含 Mimo，不可能对全仓库做零命中删除，同时这些文件是用户提供的设计依据或历史资产。
- **修订**：验收范围定义为生产页面、生产 import、DOM、alt/ARIA、打包后的 JS/CSS/HTML 和部署资源。历史 PDF、生成脚本、未被引用的资产保留，不进入运行时。

### 2. 界面示意不能伪装为业务操作

- **问题**：Hero 工作区若出现“确认/拒绝”按钮，会让用户误以为可直接操作真实数据。
- **修订**：Product proof 明示“界面示意”，确认状态使用只读标签；真实可操作确认仅作为四步面板中的概念展示，仍不使用提交型按钮。

### 3. 锚点与产品入口必须真实

- **问题**：当前 `#brand-kit`、`#stories` 会造成假导航。
- **修订**：只保留 `#how-it-works`、`#memory`、`#boundaries`、`/blog/` 和外部产品 URL；实现后逐一断链检查。

### 4. JS bundle 失败的静态降级

- **问题**：当前 inline script 过早加入 `.js-enabled` 并隐藏 SEO 静态内容，bundle 失败可能得到空白页。
- **修订**：删除过早隐藏逻辑，让 React 成功挂载时自然替换 `#root` 的静态内容；若脚本失败，HTML 中的产品说明和真实链接仍可用。

### 5. Social preview 与 Logo

- **检查**：`public/og-image.png/.svg` 不含 Mimo 或角色，但现有 SVG 使用 PDF 明令禁用的旧色值；`src/assets/home/logo-horizontal.png` 含角色面孔，禁止继续 import/render。
- **修订**：Header 改为纯文字 Logo；同一次改造中机械映射 OG SVG 到 v2 Token 并重新渲染 PNG，不改变其无角色构图。

### 6. 焦点可见性与移动菜单

- **问题**：Spark Green 在 Warm Canvas/Paper Cream 上不足以单独承担焦点边界；全屏移动菜单若只锁滚动，键盘仍可能进入背景内容。
- **修订**：焦点环改用 Charcoal/Action Brown 并保留纸色间隔；打开菜单时对主体、Footer 与菜单外 Header 控件应用 `inert`，Tab/Shift+Tab 在菜单按钮和链接内循环，关闭后清理并恢复焦点。

## 设计承诺 → 实现与测试追踪

| 设计承诺 | 代码检查 | 自动化断言 |
|---|---|---|
| 纯 Ink Memory 品牌 | `App.tsx` 无 Mimo import/文案/alt；纯文字 Logo | DOM/构建产物搜索；截图目检 |
| 单一主交互 | 仅 `menuOpen` 与 `activeStep` 首页状态 | Tab click/keyboard 与菜单 Escape |
| 真实链接 | href 只指锚点、Blog、GitHub、Sitemap、产品入口 | 锚点存在；外链属性正确 |
| PDF Token | CSS 只使用根 Token/`color-mix` 派生 | 静态搜索孤立色值；截图色彩检查 |
| 无横向溢出 | 900/640 断点重排，演示列隐藏/堆叠 | 四视口 `scrollWidth === clientWidth` |
| Reduced Motion | 媒体查询关闭 smooth/transition/animation | 模拟媒体偏好检查计算样式 |
| 静态降级 | 不提前隐藏 SEO fallback | 禁用 JS 时存在 H1 和真实产品链接 |
| Blog 不回归 | Blog 组件与样式不重写 | `/blog/` 页面加载、H1、资源与 Console |

## 不适用项

- 应用级 Loading/Empty/Error：首页交互内容完全本地同步，没有业务接口；不制作无意义 Spinner 或错误 Toast。
- 登录/注册流程：外部产品入口负责，超出本仓库范围。
- 客户 Logo、量化社会证明、安全认证：项目无可验证材料，不展示。

## 实现批准条件

以下条件已明确并必须在阶段五落地：

1. 生产页面零 Mimo，历史档案不进入 bundle。
2. 首页不新增依赖、不改 Blog 数据、不恢复 12 屏方案。
3. 只用真实锚点和链接；产品示意明确为只读。
4. Tab 和移动菜单按 WAI-ARIA/键盘规格实现。
5. 修复静态 SEO fallback，完成四视口、Console、资源、断链、Reduced Motion 与 Blog 回归测试。
6. favicon 与 OG 使用 v2 Token；全页最多一处页面级虚线外边界。
