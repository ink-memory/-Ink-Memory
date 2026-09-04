# IM Blog 列表与阅读系统

## 参考结论

对照 `https://composio.dev/blog` 的桌面、移动与文章页：

- 列表首屏：单一大标题。
- Featured：桌面三列卡片；移动端单列。
- Index：文章行列表；日期、作者、标签集中在次级区域。
- Topics：桌面右侧吸附；移动端横向排列。
- 文章页：大标题；主阅读栏；右侧目录、作者、分享；目录随章节更新。
- Hover：底色变化为主，不使用夸张位移或重动画。

## IM 转译

- 标题：`Blog`。
- 范围：`Decks · Agents · Workbench`。
- Featured：最新 3 篇。
- Topics：`全部 / 多智能体 / 工作台 / 状态 / 写作`。
- 视觉：Warm Canvas、Paper Cream、Charcoal Brown；黄色路径、绿色状态。
- 图片：不使用 Composio 资产；历史人物/IP 图片不再渲染，以 `文档 → 上下文 → Agent → Deck` 等 HTML / CSS 概念骨架替代。

## 交互

- 卡片进入视口时轻量显现；Reduced Motion 下直接显示。
- Featured 与文章行 Hover：表面色、状态线、箭头反馈。
- Topics：本地筛选并更新结果数；`aria-pressed` 表达当前筛选。
- 文章：顶部阅读进度；右侧目录跟随当前章节；目录锚点保留标题阅读位。
- 分享：复制当前链接，显示成功反馈。
- 桌面：三列 Featured；Index + sticky Topics；正文 + sticky Sidecar。
- 移动：单列 Featured；Topics 横向吸附；Sidecar 位于正文前，目录横向浏览。

## 不做

- 不引入 CMS、搜索服务、评论、账号或远程筛选。
- 不复制 Composio 品牌、标签颜色、文案或图片。
- 不恢复人物、吉祥物或 Mimo 视觉。
- 不引入动画库或滚动劫持。
