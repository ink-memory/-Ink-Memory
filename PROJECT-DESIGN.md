# Ink & Memory Landing Page Design

## 页面体验目标

首屏聚焦产品命题和行动入口，紧接真实 Deck 案例界面，直接展示可搜索的 Deck 库、多智能体角色组合和结构化结果。

## 信息架构

1. 顶部导航：品牌、两个首页锚点、Blog、语言与产品入口。
2. Hero：艺术字体 `Ink & Memory` + 行动入口。
3. Real Decks：Deck 库、创作团队、角色资料三类真实产品案例。
4. 产品路径：协作、工具拓扑和执行历史，不重复链路大标题。
5. 平台来源轨道：Notion、飞书、Obsidian、Flomo 横向循环。
6. Deck 拓扑：六个精简节点展示需求、目标/任务、多智能体、模块、路径、Deck，不重复长链路大标题。
7. 滚动抽屉：四个步骤由索引和面板直接表达，不重复组合式大标题。
8. 最终 CTA 与 Footer。

## 视觉与交互原则

- 视觉规范以 `assets/Ink & Memory UI Design v2.pdf` 为准：Warm Canvas、Paper Cream、Charcoal Brown、少面板、多留白、黄色/绿色小面积点缀。
- 页面骨架借鉴 Composio 的产品命题、首屏产品画布、平台滚动轨道、左侧吸附索引、右侧抽屉画布与最终 CTA 节奏；不使用其品牌、文案、Logo、终端视觉或客户资产。
- 页面不使用角色、人物或吉祥物视觉；产品证明由 HTML/CSS 构成。
- Real Decks 先完整进入阅读位并吸附，再随原生滚轮或触控滚动切换三类案例；点击和键盘只作辅助定位。
- 主要流程交互是四步滚动叠层：桌面左侧索引吸附，右侧四个完整面板依次上移覆盖；覆盖距离直接由滚动位置决定。索引点击和方向键可定位面板。移动端取消粘性叠层，保留横向索引与线性内容。
- 平台标识使用双组无缝循环；悬浮或键盘聚焦暂停，Reduced Motion 下停止自动移动并允许横向浏览。
- 全页使用原生滚动坐标驱动轻量层差：Real Decks 案例随进度切换，拓扑节点按进度归位，流程面板连续覆盖。不拦截滚轮，不使用滚动劫持。
- Real Decks 使用真实产品截图，其余流程画面使用原创 HTML/CSS 概念骨架；精细指针可获得克制的 Hover 反馈，触控与 Reduced Motion 均有降级。
- 断点采用 1120 / 900 / 640px；移动端线性化，不依赖 Hover。
- 动效只保留短暂状态过渡，并服从 `prefers-reduced-motion`。

## 设计与评审资料

- `docs/landing-redesign/01-problem-assessment.md`
- `docs/landing-redesign/02-interaction-spec.md`
- `docs/landing-redesign/03-sequence-diagram.md`
- `docs/landing-redesign/04-design-review.md`
- `docs/landing-redesign/05-implementation-and-test.md`
- `docs/landing-redesign/06-pinterest-material-study.md`
- `docs/landing-redesign/07-product-workbench-design.md`（当前产品设计稿）
- `docs/landing-redesign/08-product-workbench-sequence.md`（当前时序与对象关系）
- `docs/landing-redesign/09-product-workbench-review.md`（当前设计评审）
- `docs/landing-redesign/10-product-workbench-test.md`（最终自动化验收）
- `docs/landing-redesign/11-blog-system-design.md`（Blog 列表与阅读系统）
