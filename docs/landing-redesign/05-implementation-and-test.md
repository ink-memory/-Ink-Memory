# 阶段五：代码实现与自动化验收

## Optimized Prompt

你是 Ink Memory 落地页的前端实现与验收负责人。严格按照已通过的交互稿、时序图和设计评审，在现有 React 19 + TypeScript + Vite 架构中完成中英双语首页改造：保留跨平台个人写作记忆层、同页注意力、长期记忆和确认式写入的产品表达；彻底移除生产页面中的角色 IP、角色 Logo、文案、ARIA、图片和样式引用；用 UI Design v2 的 Warm Canvas、Paper Cream、Charcoal Brown 和克制黄色/绿色状态建立视觉；采用 Composio 启发的单一 Hero、大型产品证明、四步 sticky 滚动折叠、场景、信任和最终 CTA 节奏，但不复制其品牌或素材。四步区必须使用原创 HTML/CSS 产品概念骨架，桌面原生滚动依次切换 01–04，点击与键盘可跳步，移动端取消 sticky；精细指针提供克制 Hover，Reduced Motion 取消平滑与位移。不得新增依赖、虚构接口、破坏 Blog 或覆盖用户无关修改。完成 lint、build、四视口 E2E、资源/Console/断链、Mimo 残留、键盘、菜单、Hover、Reduced Motion 和 JS 失败静态后备验证，并保存可复核截图。

### Optional Enhancers

- 保存改造前后桌面/移动截图和四步滚动关键帧。
- 将每一项设计承诺映射到代码选择器和自动化断言。

## 实现摘要

- Header 使用纯文字 `Ink & Memory` 标识，保留真实锚点、Blog、语言和现有产品入口。
- Hero 重写为单一价值命题，明确“跨平台写作记忆层 / 同页阅读 / 确认写入”。
- `#memory` 使用原创写作页、记忆边线和待确认状态概念骨架，不加载角色或第三方图片。
- 四步区使用一个 `activeStep`：桌面由约 `300vh` 的原生滚动轨道驱动 sticky 切换器，点击/方向键/Home/End 可定位步骤；900px 以下恢复普通文档流和横向 Tab。
- 四个面板把用户提供的产品截图转译为 CSS 概念骨架：来源策略、同页注意力、三层记忆、可见确认；运行时不加载截图，不展示账号数据。
- Hover 仅在 `hover:hover` + `pointer:fine` 生效；触控不依赖 Hover；Reduced Motion 关闭滚动平滑、面板动画和位移。
- Pinterest 补充调研被转译为原创线稿图标、三节点记忆路径和平台来源标记；参考截图仅保留在设计证据中，不进入运行时。
- 移动菜单使用 `inert`、滚动锁、焦点圈闭、Escape 与焦点归还，并在菜单内保留产品 CTA。
- favicon、OG SVG/PNG、静态 SEO 后备和 `llms.txt` 同步新的品牌定位与 v2 色值。
- React 成功挂载时自然替换静态内容；bundle 失败或 JS 禁用时仍保留可读 H1 和真实链接。

## 主要代码与资产

| 文件 | 改动 |
|---|---|
| `src/App.tsx` | 首页内容、滚动折叠、ARIA Tab、概念骨架、移动菜单、双语 SEO |
| `src/landing.css` | 新落地页视觉、sticky 叙事、概念骨架、Hover、响应式与 Reduced Motion |
| `src/index.css` | 移除角色专属选择器，保留公共/Blog 兼容样式 |
| `src/main.tsx` | 在公共样式后加载首页样式 |
| `index.html`、`en/index.html` | SEO、favicon、静态后备与新定位 |
| `scripts/generate-blog-pages.ts` | 生成页面的 favicon 与静态后备策略同步 |
| `public/og-image.svg`、`public/og-image.png` | v2 Token 无角色社交预览 |
| `public/llms.txt` | 产品类别改为跨平台个人写作记忆层 |
| `PROJECT-DESIGN.md`、`README.md` | 当前架构、交互与文档入口同步 |

## 实现与参考差异

- Composio 的深色、蓝色动效面板改成 Ink Memory 暖纸面；左侧步骤 + 右侧大画面的关系保留。
- 不使用参考站的客户 Logo、终端、代码、数字背书、图像或品牌措辞。
- 不锁定鼠标滚轮、不启用 scroll-snap；sticky 只在本区生效，到轨道末端自然释放。
- 原始产品截图只作为概念结构参考，最终页面使用可缩放的 DOM/CSS 骨架，避免裁切、低清和账号信息。
- 首页没有异步业务请求，因此 Loading/Empty/Error 为不适用；产品入口后的登录/写作流程不在本仓库中。

## 自动化验收

独立 `luna_test_runner` 在生产构建与 `vite preview` 上完成最终验收。测试过程中发现并修复了两处 TypeScript 类型问题、移动 Tab 的 Grid 越界，以及 Hero 纯装饰伪元素造成的 8px 页面溢出；以下为修复后的最终回执。

### 命令回执

| 命令 / 检查 | 结果 |
|---|---|
| `git diff --check` | 通过，exit 0 |
| `npm run lint`（`tsc --noEmit`） | 通过，exit 0 |
| `npm run build` | 通过，exit 0；Vite 6.4.3 正常生成生产包 |
| `npm run preview -- --host 127.0.0.1 --port 4273` | 正常启动并用于浏览器验收；结束时仅中断本次 preview 进程 |
| `dist` Mimo / mascot / 旧首页素材名扫描 | 通过，0 个命中文件 |
| `dist` 落地页截图引用扫描 | 通过，0 个命中文件；概念图均为 DOM/CSS |
| OG 图片检查 | 通过，PNG 1200×630，SVG/PNG 均为无角色 v2 品牌图 |
| Console 与同源资源 | 通过；清空后重载无 error，资源为 200/304，无 `/landing` 图片请求 |
| 单元 / 集成测试 | 项目未配置对应 script 或测试框架，因此不适用；未通过删除测试或降低断言规避 |

### 四视口矩阵

| 视口 | 页面宽度 | 结构与交互 | 结果 |
|---|---:|---|---|
| 1440×900 | `1440 / 1440` | 唯一 H1；sticky 四步滚动 01→04；点击与全套方向键/Home/End；Hover | 通过 |
| 1280×800 | `1280 / 1280` | 唯一 H1；主区块、CTA 与内容密度正常 | 通过 |
| 768×1024 | `768 / 768` | 切换为横向 Tab、取消 sticky、保持点击切换 | 通过 |
| 390×844 | `390 / 390` | 四个短标签等分且可点；无页面溢出；移动菜单焦点圈闭、`inert`、Escape | 通过 |

### 关键行为断言

- 桌面原生滚动采样依次激活 0/1/2/3；每次只有一个 `aria-selected=true` 和一个可见 `tabpanel`，`aria-controls` 对应正确，轨道结束后 sticky 自然释放。
- 点击步骤 04 后可用 `ArrowLeft`、`ArrowUp`、`ArrowDown`、`ArrowRight`、`Home`、`End` 往返切换，并同步滚动进度、`tabIndex` 与内容面板。
- 390px 菜单打开后首个链接获得焦点，主体、Footer、品牌和 Header 操作区进入 `inert`；Tab/Shift+Tab 循环，Escape 关闭并把焦点归还按钮。
- 精细指针下概念行、场景、边界和工作区产生克制的 2–3px 位移与表面反馈；概念骨架保持为不可误触的静态 `div/article`。Reduced Motion 下滚动为 `auto`，面板动画与全部 Hover 位移关闭。
- 阻断 JS 后，`/` 与 `/en/` 仍各保留一个可读 H1 和真实链接；`/blog/` 回归可访问。主要产品 CTA 均指向现有 `https://ink-frontend.suoxya.com/`，只核对链接，未代替用户访问外部产品。

### 最终证据

- `evidence/ink-after-desktop-1440.png`
- `evidence/ink-after-desktop-1280.png`
- `evidence/ink-after-tablet-768.png`
- `evidence/ink-after-mobile-390.png`
- `evidence/ink-scroll-story-final-01.png`
- `evidence/ink-scroll-story-final-03.png`

**最终结论：通过。** 设计稿、时序图、设计评审、实现、生产构建与主要桌面/移动视口验收均满足本次完成门禁。

## Pinterest 图标补充复验

- `git diff --check`、`npm run lint`、`npm run build` 再次通过，均为 exit 0。
- 1440×900、768×1024、390×844 的 H1 均唯一；页面宽度分别为 `1440/1440`、`768/768`、`390/390`，无新增溢出。
- Hero 三节点路径、四个平台来源标记、四步原创 SVG 均存在；精细指针 Hover 有边框、纸面与 1–3px 位移反馈。
- Reduced Motion 下滚动保持 `auto`，新增 Hero/平台 Hover 位移为 `none`。
- 浏览器网络记录没有 `pinterest.com` 请求；运行时 Mimo 和 mascot 文本均为零命中。
- 最终截图：`evidence/ink-icons-after-desktop-1440.png`、`evidence/ink-icons-after-mobile-390.png`。
