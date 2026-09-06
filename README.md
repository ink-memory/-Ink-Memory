# Ink & Memory

Ink Memory is a multi-agent workbench for organizing personal thinking patterns. It turns needs into goals, tasks, visible agent collaboration, and tool topologies composed from Skills, MCP, and Plugins. Validated paths become reusable Decks after user confirmation.

这个仓库包含 Ink & Memory 官网/项目页的 React + Vite 实现。页面面向长期写作者、自我探索者、日记/随笔/梦境/情绪记录用户和重视 AI 写作边界的人。

## Website

https://ink-memory.suoxya.com/

## Repository

https://github.com/glide-the/ink-and-memory

## Features

- AI writing workspace
- Standalone use-case pages for the planned ComfyUI MCP Apps workflow and the implemented read-only Notion connector
- AI journal and reflective writing memory
- Writing timeline and past reflections
- Memory-based chat for personal knowledge conversations
- Long-form writing assistant
- Voice notes for daily journal entries
- Consent-based AI rewrite, delete, insert, and comment actions
- Private affect images for social sharing without exposing original text

## SEO 与索引入口

- `index.html` 提供 title、description、canonical、robots、Open Graph、Twitter Card、hreflang 和 Schema.org JSON-LD。
- `public/robots.txt` 显式允许 OpenAI、Claude、Perplexity 等 AI 搜索爬虫和常规搜索爬虫访问，并指向 `https://ink-memory.suoxya.com/sitemap.xml`。
- `public/sitemap.xml` 声明中英文首页、使用场景、定价和 Blog 入口。
- `public/llms.txt` 给 AI 搜索和引用系统提供项目摘要。
- `public/og-image.png` 提供 1200x630 的 Open Graph / Twitter 预览图。
- `.github/workflows/deploy-pages.yml` 可以把 Vite 构建产物部署到 GitHub Pages。
- `public/CNAME` 声明 GitHub Pages 自定义域名 `ink-memory.suoxya.com`；生产 SEO 规范地址统一为 `https://ink-memory.suoxya.com/`。

Search Console 应提交项目站点 `https://ink-memory.suoxya.com/` 和 sitemap，而不是 GitHub 仓库 URL。GitHub 仓库页应该通过 README、官网回链和外部链接被发现。

## 项目结构

- `index.html`：Vite 应用入口与 SEO meta
- `use-cases/index.html`、`en/use-cases/index.html`：中英文使用场景 SEO 页面壳
- `src/App.tsx`：中英双语落地页、使用场景、定价、Blog 路由、移动导航与滚动叙事交互
- `src/index.css`：全站 Token、Blog 与公共样式
- `src/landing.css`：落地页布局、组件状态和响应式样式
- `assets/Ink & Memory UI Design v2.pdf`：落地页最高优先级视觉规范
- `docs/landing-redesign/`：调研证据、交互稿、时序图、设计评审与测试记录
- `PROJECT-DESIGN.md`：当前页面体验和信息架构摘要

## 本地运行

```bash
npm run dev
```

Vite 默认地址是 `http://localhost:5173`；终端会在端口占用时显示实际地址。

## 验证与构建

```bash
npm run lint
npm run build
```
