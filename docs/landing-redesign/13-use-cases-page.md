# 独立使用场景页：ComfyUI MCP Apps 与 Notion

## Optimized Prompt

在 Ink & Memory 落地站新增中英文独立使用场景页。页面必须以普通用户能理解的“目标 → 操作 → 结果”组织内容，以 ComfyUI MCP Apps 作为最醒目的规划场景，并以滚动驱动、逐层缓慢覆盖的方式展示“说明需求、选择工作流、查看执行、接收结果”。所有 ComfyUI 画面必须标注“规划中 / 概念示意”，不得暗示已有可用 App、真实工作流、在线生成服务、客户案例或验证结果。Notion 作为已实现场景，准确展示“连接账号、选择数据库/页面、同步轻量索引、按需读取页面 Markdown”，并明确只读、不写回、不在对话启动时批量下载正文。复用现有 React/Vite、UI v2 暖纸色 Token、Header/Footer 和无路由库 pathname 分支；新增 `/use-cases/` 与 `/en/use-cases/`、导航入口、SEO 页面壳和 Sitemap。桌面端使用原生滚动驱动 sticky 展示，移动端和 Reduced Motion 直接展开全部步骤。不得新增依赖、部署、发布、合并或创建 PR。

## 产品事实与状态

| 场景 | 页面状态 | 真实能力边界 |
|---|---|---|
| ComfyUI MCP Apps | 规划中 / 概念示意 | MCP Apps 只有技术 preview；`productionAppsEffective=false`。没有可宣传为已接入的 ComfyUI App、真实工作流或线上生成服务。 |
| Notion | 已实现 | 单账号连接；选择数据库/页面；同步轻量索引；对话按需读取单页最新 Markdown；失败保留最近一次成功索引。 |
| Notion 写回 | 不提供 | 当前连接为只读，不修改远程 Notion 页面。 |

事实来源：

- `/Users/dmeck/project/ink-dream-memory/docs/rules/README.md`
- `/Users/dmeck/project/ink-dream-memory/docs/stage/stage_mcp-apps-system-architecture.md`
- `/Users/dmeck/project/ink-dream-memory/docs/prd/notion-session/resource-connector.md`
- `/Users/dmeck/project/ink-dream-memory/frontend/app/_dream/components/dashboard/ConnectorNotionDetailPage.tsx`

## 页面结构

1. Hero：一句直接的使用场景命题；两个锚点分别进入 ComfyUI 与 Notion。
2. ComfyUI：平台标记、规划状态、用户任务、四段滚动叙事、预期结果、概念免责声明。
3. Notion：平台标记、已实现状态、复盘任务、四步真实流程、实际结果、只读边界。
4. CTA：进入现有工作台或返回首页。

## 交互规则

- 桌面端 ComfyUI 区域使用 `310vh` 原生页面轨道和 sticky 工作面板；不拦截 wheel，不使用 scroll-snap。
- 每一段通过 `clip-path` 从下向上覆盖前一段，滚动进度同时更新左侧步骤和底部进度线。
- 移动端不保留伪 Tab 或点击切换；概念图之后按顺序展示四个完整步骤。
- `prefers-reduced-motion: reduce` 与移动端相同：取消 sticky 长轨道，直接展示全部步骤。
- 页面无异步请求，因此不伪造 Loading、Error 或在线执行状态。

## 视觉与品牌

- 页面底色、纸面、文字、圆角和阴影全部复用 UI Design v2 Token。
- ComfyUI 仅在品牌标记、节点线和运行进度使用局部蓝色；不把页面改成冷色科技风。
- Notion 使用单色 N 标记和名称，作为外部来源识别；IM 品牌仍是页面主品牌。
- 画面为原创 CSS/SVG 概念骨架，不使用 Composio、Pinterest 或第三方产品截图。

## 验收范围

- 中英文路由、语言切换、导航和 Footer 均有独立使用场景入口。
- ComfyUI 页面首尾都能看到“规划中 / 概念示意”边界。
- Notion 页面能看到“已实现 / 只读”边界。
- 1440×900、1280×800、390×844 无横向溢出。
- 滚动能依次切换 01–04；Reduced Motion 不产生长空白轨道。
- TypeScript、Production build、Console 和静态链接检查通过。

## 2026-09-06 本地验收回执

- `npm run lint`：exit 0，TypeScript 无错误。
- `npm run build`：exit 0，Vite 生成 `/use-cases/` 与 `/en/use-cases/` 两个独立入口。
- `git diff --check`：exit 0。
- Chrome Playwright：1440×900、1280×800、768×1024、390×844 均无 Console/Page error、资源 4xx 或横向溢出。
- 桌面滚动采样：依次得到 `01 需求 → 02 工作流 → 03 执行 → 04 结果`。
- 移动导航：菜单可打开，Escape 可关闭并同步 `aria-expanded`。
- Reduced Motion：sticky 改为 relative，四个面板均为正常文档流，长滚动轨道被移除。
- 英文入口：`lang=en`、英文 title、中文切换链接和双状态文案均正确。

本轮只完成本地实现与验证；没有发布、推送、创建 PR 或合并。
