# Ink & Memory

Ink & Memory is an AI writing workspace for reflection, memory, writing timelines, and personal knowledge conversations. It combines an AI journal, long-form writing assistant, memory-based chat, voice notes, and consent-based editing for people who want AI support without giving up authorship.

这个仓库包含 Ink & Memory 官网/项目页的 React + Vite 实现。页面面向长期写作者、自我探索者、日记/随笔/梦境/情绪记录用户和重视 AI 写作边界的人。

## Website

https://ink-memory.suoxya.com/

## Repository

https://github.com/glide-the/ink-and-memory

## Features

- AI writing workspace
- AI journal and reflective writing companion
- Writing timeline and past reflections
- Memory-based chat for personal knowledge conversations
- Long-form writing assistant
- Voice notes for daily journal entries
- Consent-based AI rewrite, delete, insert, and comment actions
- Private affect images for social sharing without exposing original text

## SEO 与索引入口

- `index.html` 提供 title、description、canonical、robots、Open Graph、Twitter Card、hreflang 和 Schema.org JSON-LD。
- `public/robots.txt` 允许抓取并指向 `https://ink-memory.suoxya.com/sitemap.xml`。
- `public/sitemap.xml` 声明英文首页和中文入口。
- `public/llms.txt` 给 AI 搜索和引用系统提供项目摘要。
- `public/og-image.png` 提供 1200x630 的 Open Graph / Twitter 预览图。
- `.github/workflows/deploy-pages.yml` 可以把 Vite 构建产物部署到 GitHub Pages。
- `public/CNAME` 声明自定义域名 `ink-memory.suoxya.com`。

Search Console 应提交项目站点 `https://ink-memory.suoxya.com/` 和 sitemap，而不是 GitHub 仓库 URL。GitHub 仓库页应该通过 README、官网回链和外部链接被发现。

## 项目结构

- `index.html`：Vite 应用入口与 SEO meta
- `src/App.tsx`：12 屏整屏滚动页面、配置化内容、视频播放控制、导航状态
- `src/index.css`：视觉系统、scroll-snap、入场动效、响应式布局
- `assets/video-1.mp4` 到 `assets/video-5.mp4`：MP4 fallback 视频素材
- `assets/video-1-alpha.webm` 到 `assets/video-5-alpha.webm`：透明 VP9 WebM 素材
- 页面主视觉优先循环使用 `video-3` 到 `video-5`，避免带统一场景背景的素材出现矩形边界
- `scripts/make_alpha_videos.py`：从黑底素材重新生成透明 WebM 的工具脚本
- `PROJECT-DESIGN.md`：页面体验和信息架构说明

## 本地运行

```bash
npm run dev
```

默认地址是 `http://localhost:3000`。

## 验证与构建

```bash
npm run lint
npm run build
```

## 重新生成透明视频

如果后续替换了 `assets/video-*.mp4`，可以重新生成透明 WebM：

```bash
python3 scripts/make_alpha_videos.py
```
