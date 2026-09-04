# IM 产品工作台最终验收

日期：2026-09-04

## 工程验证

| 命令 | 结果 |
|---|---|
| `npm run lint` | PASS：TypeScript `--noEmit`，0 error |
| `npm run build` | PASS：Vite 6.4.3，1686 modules，production build 完成 |
| `npm run preview -- --host 127.0.0.1 --port 4180` | PASS：生产预览可访问 |

项目未定义独立的 unit / integration test script；关键交互使用生产构建浏览器自动化覆盖。

## 视口

| 视口 | 横向溢出 | 流程布局 |
|---|---:|---|
| 1440×900 | 0px | 4 个 sticky 面板，top 96px |
| 1280×800 | 0px | 4 个 sticky 面板，top 96px |
| 768×1024 | 0px | relative，线性排列 |
| 390×844 | 0px | relative，线性排列 |

## 滚动联动

- Hero：滚动 `0 → 240 → 520px`，产品画布位移 `0 → -9.76 → -21.14px`；工具栏位移 `0 → 6.18 → 13.39px`。
- Workbench：完整画布到达阅读位后固定。桌面 `1440×900` 固定边界约为 `top 96 / bottom 693px`，移动端 `390×844` 约为 `top 78 / bottom 695px`；两端滚动进度 `0–24% / 30–74% / 80–100%` 分别选中 `任务 / 目标 / Decks`。
- Topology：进入视口时进度线连续前进；六个节点分段由 `48px / 0.08 opacity / 0.965 scale` 归位至 `0px / 1 opacity / 1 scale`，向上滚动时反向退回。
- Workflow：01 固定后，02 面板顶部随滚动连续经过 `818 → 580 → 341 → 96px`，覆盖量与滚动距离同步。
- 平台轨道：transform 持续变化；Hover / Focus 后 `animation-play-state: paused` 且位置保持不变。
- Reduced Motion：平台 `animation-name: none`；Hero、工具栏、拓扑节点 transform 为 `none`；scroll behavior 为 `auto`。

## UI v2 减线检查

以下关键层级的 `border-top-width` 均为 `0px`：

- `.how-tabs`
- `.how-panel`
- `.step-preview`
- `.step-concept`
- `.topology-node`

保留：键盘焦点环、黄色路径线、绿色状态、唯一页面级控制边界。

## 交互与可访问性

- Workbench：桌面滚轮、移动端触控滚动切换通过；Tasks / Goals / Decks 点击和方向键辅助定位通过。
- Workflow：左侧 01–04 点击、Arrow、Home、End 定位通过；右侧废弃按钮 `.how-drawer-trigger` 数量为 0。
- 移动菜单：打开后 `body overflow: hidden`、主内容 `inert`、首链接获得焦点；Escape 关闭并将焦点归还菜单按钮。
- 资源：失败请求 0、HTTP ≥400 0、破图 0、空链接 0、控制台错误 0。
- 运行时资源 host 只有本地预览；无 Pinterest 运行时请求。
- `src`、静态 HTML、`public` 与 `dist` 中无 Mimo、Memory Companion、hero-mimo、mimo-character。
- 公开页面无“让主观方案接受客观事实检验”产品哲学文案。

## Blog

- 列表：3 个 Featured 卡片、4 条文章索引、5 个 Topics 筛选；`写作`筛选在四档视口均由 4 条准确变为 1 条。
- 响应式：`1440×900 / 1280×800 / 768×1024 / 390×844` 横向溢出均为 0。
- 阅读页：目录锚点存在，点击后标题落在 `118px` 阅读位；当前章节与顶部阅读进度同步。
- 分享：复制链接后按钮反馈“已复制”。
- Hover：Featured 卡片底色由半透明 Paper 转为实色 Paper，阴影增强，箭头透明度 `0 → 1`；Reduced Motion 下卡片 `transform: none / opacity: 1`。
- 路由：4 个文章地址均返回 HTTP 200；各页 H1、5–8 个概念骨架和 7–9 个目录项正常渲染。
- 资源：Blog 主内容图片请求为 0；历史人物/IP 图不渲染，头图与正文图全部由 HTML / CSS 概念骨架替代；文章社交图统一使用 `/og-image.png`。
- 控制台错误 0、HTTP ≥400 0。

## 视觉证据

- `evidence/ink-product-final-desktop-1440.png`
- `evidence/ink-product-final-desktop-1280.png`
- `evidence/ink-product-final-tablet-768.png`
- `evidence/ink-product-final-mobile-390.png`
- `evidence/ink-product-final-platform-rail.png`
- `evidence/ink-product-final-topology-flow.png`
- `evidence/ink-product-final-scroll-cover.png`
- `evidence/ink-product-final-workbench-scroll.png`
- `evidence/ink-blog-v2-desktop-top.png`
- `evidence/ink-blog-v2-desktop-index.png`
- `evidence/ink-blog-v2-mobile-top.png`
- `evidence/ink-blog-v2-mobile-index.png`
- `evidence/ink-blog-v2-article-desktop.png`
- `evidence/ink-blog-v2-article-mobile.png`

## 独立终验

Luna test runner：PASS。

- `git diff --check`：exit 0；dirty worktree 保留。
- `npm run lint`：exit 0；`tsc --noEmit`。
- `npm run build`：exit 0；Vite 6.4.3，1686 modules，生成 5 个 Blog 静态入口。
- 隔离预览：`npm run preview -- --host 127.0.0.1 --port 4191`；HTTP 200；仅停止测试器自行启动的进程。
- 四视口：页面宽度分别等于 `1440 / 1280 / 768 / 390`，横向溢出 0。
- 首页：Workbench、Topology、Workflow、平台轨道、Reduced Motion、移动菜单、0px 关键描边均 PASS。
- Blog：Featured / Index / Topics、四视口筛选、Hover、文章目录、118px 锚点、阅读进度、复制链接、四文章路由均 PASS。
- 清理：控制台错误 0、失败本地请求 0、空链接 0、Mimo / 旧哲学文案 / Pinterest 运行时残留 0。
- 跳过：项目未定义独立 unit / integration test script；关键路径由生产构建浏览器自动化覆盖。
