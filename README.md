# Ink & Memory

React + Vite 实现的沉浸式转化宣传页。页面面向长期写作者、自我探索者、日记/随笔/梦境/情绪记录用户和重视 AI 写作边界的人。

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
