# Ink & Memory 色彩系统规范（站点落地版）

> 整理自 `/Users/dmeck/project/ink-and-memory/docs/prd/color_system/`（README / light-theme / dark-theme / reflection-blog）。
> **唯一权威色值来源：`ink-and-memory/frontend/src/styles/tokens.css`。** PRD markdown 中的部分色值为旧稿（如 `#f8f0e6` / `#2c2c2c`），与 tokens.css 不一致时一律以 tokens.css 为准。
> 本文件是 `-Ink-Memory` 站点（Vite + React 落地页）的执行规范；`src/index.css` 的 `:root` 为站点侧运行时 source of truth。
> 整理日期：2026-07-25。

---

## 1. 视觉语言

关键词：**暖纸张、手写笔记本、安静工具台**。

| 维度 | 规范 |
|---|---|
| 画布 | 暖米色 `--color-bg-app`，避免纯白全屏和冷灰渐变 |
| 承载面 | 奶油纸面 `--color-bg-paper`；轻分区用半透明 `--color-bg-surface` |
| 文本 | 主文本 `--color-text-primary`，正文 `--color-text-body`，辅助 `--color-text-secondary` / `--color-text-muted` |
| 强调色 | 黄色 / 绿色声部色只做**小面积 accent**（icon 底、标签、高亮条），不作整卡填充、正文强调或大面积渐变 |
| 分区 | **轻纸面 · 无卡片**：减少面板堆叠，以留白和字重层级分区；条目用浅纸面/透明混合 + 行分隔线；页面级承载只保留一条 `--color-border-paper` 虚线边界；静止无阴影，仅 hover 出现 `--color-shadow-soft` |
| 状态色 | 小面积提示，必须配文字或图标，不只用颜色表达状态 |
| 圆角 | 卡片/弹窗 4–12 px；站点现有 24/36 px 大圆角属于站点语言，保留 |
| 动效 | hover/focus 0.2–0.3 s；无强 glow、持续闪烁 |

**硬规则**：不新增孤立十六进制颜色；新视觉需求先映射到 token；半透明色用 `color-mix(in srgb, <token> <pct>%, transparent)` 派生。

---

## 2. 语义 Token 完整表（亮色，以 tokens.css `:root` 为准）

| CSS 变量 | 亮色值 | 语义用途 |
|---|---:|---|
| `--color-bg-app` | `#f6efe5` | App 背景 |
| `--color-bg-paper` | `#fffaf2` | 主阅读/编辑面 |
| `--color-bg-surface` | `rgba(255,250,242,0.9)` | 次级半透明承载面 / 轻分区 |
| `--color-bg-surface-solid` | `#fffdf8` | 不透明浮层（菜单/Popover） |
| `--color-bg-overlay` | `rgba(39,31,24,0.5)` | Modal 遮罩 |
| `--color-bg-hover` | `rgba(95,74,54,0.06)` | 控件 hover 叠层 |
| `--color-bg-active` | `rgba(95,74,54,0.12)` | 选中/激活叠层 |
| `--color-bg-active-hover` | `rgba(95,74,54,0.18)` | 激活态 hover |
| `--color-border-paper` | `#d8c7b3` | 暖纸边框、分隔线 |
| `--color-border-neutral` | `#e6ddd0` | 中性控件边框 |
| `--color-border-focus` | `#5f4a36` | 键盘焦点线 |
| `--color-text-primary` | `#3f3429` | 标题、主操作文案 |
| `--color-text-body` | `#4b3f33` | 正文内容 |
| `--color-text-secondary` | `#7a6a59` | 元信息、图标默认 |
| `--color-text-muted` | `#9a8a78` | placeholder、时间戳 |
| `--color-text-on-action` | `#ffffff` | 深色按钮前景 |
| `--color-action-primary` | `#5f4a36` | 主按钮背景/当前导航 |
| `--color-action-link` | `#4a90e2` | 链接、发送可用 |
| `--color-action-link-hover` | `#357abd` | 链接 hover |
| `--color-state-success` | `#7e9468` | 成功态 |
| `--color-state-success-hover` | `#6f835c` | 成功态 hover |
| `--color-state-warning` | `#c78855` | 提醒 |
| `--color-state-error` | `#a86652` | 错误态 |
| `--color-state-danger` | `#b35f50` | 破坏性操作 |
| `--color-state-danger-hover` | `#9f4f42` | 破坏性操作 hover |
| `--color-disabled-bg` | `#d6cbbb` | 禁用态背景 |
| `--color-shadow-soft` | `rgba(91,69,44,0.08)` | 卡片轻阴影 |
| `--color-shadow-medium` | `rgba(91,69,44,0.16)` | 浮层阴影 |
| `--color-scrollbar-thumb` | `#cab7a4` | 滚动条滑块 |
| `--color-scrollbar-thumb-hover` | `#b29d88` | 滚动条滑块 hover |
| `--color-voice-blue` | `#4a90e2` | 蓝色声部 |
| `--color-voice-purple` | `#9b59b6` | 紫色声部 |
| `--color-voice-pink` | `#e91e63` | 粉色声部 |
| `--color-voice-green` | `#27ae60` | 绿色声部 |
| `--color-voice-yellow` | `#f39c12` | 黄色声部 |
| `--color-code-bg` | `#2c2c2c` | 代码块背景 |
| `--color-code-text` | `#f3eee6` | 代码块前景 |
| `--color-code-inline-bg` | `rgba(0,0,0,0.08)` | 行内代码背景 |

---

## 3. 暗色主题（App 侧已完整实现；站点暂不启用）

站点当前为浅色单主题（`color-scheme: light`，hero 插图使用 `mix-blend-mode: multiply`，直接开暗色会破坏视觉）。
以下为 tokens.css `[data-theme='dark']` 的权威值，供未来站点暗色化时使用：

| 亮色 → 暗色关键映射 | 亮 | 暗 |
|---|---:|---:|
| bg-app | `#f6efe5` | `#1d1916` |
| bg-paper | `#fffaf2` | `#2a241f` |
| bg-surface-solid | `#fffdf8` | `#342d27` |
| text-primary | `#3f3429` | `#f3e8d8` |
| text-body | `#4b3f33` | `#eee8df` |
| text-secondary | `#7a6a59` | `#c8bcae` |
| text-muted | `#9a8a78` | `#9f9283` |
| action-primary | `#5f4a36` | `#f3e8d8` |
| action-link | `#4a90e2` | `#81b7d2` |
| border-paper | `#d8c7b3` | `#5a4d3d` |
| border-neutral | `#e6ddd0` | `#4a4238` |
| voice-green | `#27ae60` | `#7bdba0` |
| voice-yellow | `#f39c12` | `#f7c96a` |
| shadow-soft | `rgba(91,69,44,0.08)` | `rgba(0,0,0,0.32)` |
| shadow-medium | `rgba(91,69,44,0.16)` | `rgba(0,0,0,0.45)` |
| code-bg | `#2c2c2c` | `#0d1117` |

暗色设计原则：不是简单反色——背景走暖棕、文字走暖白，与亮色保持"同一本笔记本"的连续性。

---

## 4. 站点旧变量 → 新 Token 映射（本次同步执行）

| 旧变量 / 硬编码 | 旧值 | 新映射 |
|---|---:|---|
| `--paper-beige` | `#f5e9d6` | `--color-bg-app` |
| `--soft-cream` | `#fff8ed` | `--color-bg-paper` |
| `--ink-black` | `#111111` | `--color-text-primary` |
| `--warm-brown` | `#6f5840` | `--color-text-secondary` |
| `--quiet-brown` | `#9b7b58` | `--color-text-muted` |
| `--muted-tan` | `#c9b69a` | `--color-border-paper` |
| `--memory-yellow` | `#ffd42a` | `--color-voice-yellow` |
| `--spark-green` | `#39d353` | `--color-voice-green` |
| `--sun-yellow`（未定义，bug） | — | `--color-voice-yellow` |
| `--line-soft` / `--line-medium` | `rgba(17,17,17,·)` | `color-mix(--color-text-primary 8%/16%)` |
| `--shadow-card` / `--shadow-float` | `rgba(71,45,18,·)` | 基于 `--color-shadow-soft` / `--color-shadow-medium` |
| `rgba(255,212,42,a)` | 亮黄 accent | `color-mix(--color-voice-yellow a)` |
| `rgba(57,211,83,a)` | 亮绿 accent | `color-mix(--color-voice-green a)` |
| `rgba(17,17,17,a)` | 黑透明 | `color-mix(--color-text-primary a)` |
| `rgba(245,233,214,a)` | 米色透明 | `color-mix(--color-bg-app a)` |
| `rgba(255,248,237,a)` | 奶油透明 | `color-mix(--color-bg-paper a)` |
| `rgba(138,106,69,a)` / `rgba(92,64,35,a)` / `rgba(71,45,18,a)` | 棕色透明 | `color-mix(--color-action-primary a)` |
| `#d69900` | 深黄 | `color-mix(--color-voice-yellow 72%, --color-action-primary)` |
| `#252525`（CTA 深色带） | 近黑 | `--color-action-primary` |
| 主按钮（.header-cta / .button-primary） | `var(--ink-black)` | `--color-action-primary` 背景 + `--color-text-on-action` 前景 |
| meta `theme-color` | `#F5E9D6` | `#F6EFE5` |

旧变量名在 `:root` 中保留为指向新 token 的别名，组件无需改名即可继承新色值；后续重构应直接引用 `--color-*`。

---

## 5. 验收标准

- [x] `src/index.css` `:root` 覆盖 color_system 全量语义 token（亮色），值与 `tokens.css` 一致。
- [x] 站点无孤立十六进制颜色（字体/半径等非色值除外）；全部经 token 或 `color-mix` 派生。
- [x] `var(--sun-yellow)` 未定义引用已修复。
- [x] 黄色/绿色只作小面积 accent，色值统一为 `--color-voice-yellow` / `--color-voice-green`。
- [x] 分区轻纸面化：quick/value/portal 条目静止无阴影、细纸边；mimo 区块改单一虚线纸边界；hover 才出现轻阴影。
- [x] `index.html` 与 `scripts/generate-blog-pages.ts` 的 `theme-color` 同步为 `#F6EFE5`。
- [x] `npm run build` 与 `tsc --noEmit` 通过。
- [ ] （后续）站点暗色主题：需替换 hero 插图混合模式后，再启用第 3 节 token。
