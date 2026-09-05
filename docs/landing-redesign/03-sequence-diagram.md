# 阶段三：业务时序流程图

## Optimized Prompt

你是 Ink Memory 落地页的产品架构与交互流程负责人。依据已通过的阶段二交互稿，使用 Mermaid `sequenceDiagram` 描述落地页真实的用户时序。参与方必须包含用户、浏览器页面、React 前端交互组件、锚点/导航层、现有产品入口；覆盖首次进入、HTML/CSS/JS 初始化、locale 与 SEO 元信息更新、浏览各区块、锚点跳转、四步 Tab、移动导航、CTA 新窗口、Blog 路由、资源异常、外部入口不可达、键盘操作和 `prefers-reduced-motion`。不得虚构登录 API、数据库、导入服务、报告服务或生产后端；进入 `https://ink-frontend.suoxya.com` 之后的登录/注册/产品行为必须标注为“外部入口，超出本仓库范围”。给出主时序和异常/降级说明，确保可直接指导 React 实现和 E2E 测试。

### Optional Enhancers

- 将每个分支映射到自动化验收点。
- 明确哪些过程完全本地同步、不会出现 Loading/Error 状态。

## 范围与假设

- `/` 与 `/en/` 由同一个 React `App` 根据 pathname 选择文案；`/blog/` 继续使用现有 Blog 组件。
- 首页所有演示和四步 Tab 数据都打包在前端，切换不请求网络，不存在业务 Loading。
- 主 CTA 指向已有外部入口 `https://ink-frontend.suoxya.com`，使用新窗口；本仓库不拥有其登录、注册、导入或写作后端流程。
- 锚点导航由浏览器 hash 与 CSS `scroll-margin-top` 完成；Reduced Motion 时关闭平滑滚动和视觉过渡。
- 页面不依赖第三方图片或远程字体，主要视觉由 HTML/CSS/Lucide 组成。
- 当前 `index.html` 与生成的页面 shell 将静态 SEO 内容放在 `<noscript>` 中：启用 JavaScript 时不会先闪出纯文本，禁用 JavaScript 时仍保留可读的静态后备。

## 主业务时序

```mermaid
sequenceDiagram
    autonumber
    actor U as 用户
    participant B as 浏览器页面
    participant F as React 前端组件
    participant N as 锚点/导航层
    participant P as 现有产品入口

    U->>B: 打开 / 或 /en/
    B->>B: 加载 HTML、CSS、JS 与本地静态资源
    B->>F: 挂载 App
    F->>F: 根据 pathname 选择 zh / en 文案
    F->>B: 设置 lang、title、description、canonical、OG
    F->>B: 渲染 Header、Hero、产品示意、四步、场景、边界、CTA
    B-->>U: 显示首屏；产品示意在下方露出

    alt 用户允许常规动效
        B->>B: 使用 smooth scroll 与短过渡
    else prefers-reduced-motion: reduce
        B->>B: 关闭平滑滚动、位移和淡入
        B-->>U: 内容与交互状态立即显示
    end

    loop 用户浏览页面
        U->>B: 滚动到下一内容区
        B-->>U: 原生滚动展示静态内容
        Note over B,F: 不使用 scroll-snap、自动轮播或持续动画
    end

    opt 点击桌面锚点或 Hero 次 CTA
        U->>N: 点击 #how-it-works / #memory / #boundaries
        N->>B: 更新 hash 并滚动到目标
        B-->>U: 目标标题避开 sticky Header
    end

    opt 操作四步工作方式
        alt 桌面端原生滚动
            U->>B: 滚动 sticky 叙事轨道
            B->>F: 根据区块滚动进度计算 01–04
        else 点击或键盘
            U->>F: 点击 Tab，或按方向键 / Home / End
            F->>B: 滚到对应叙事进度（移动端只切换）
        end
        F->>F: 同步更新 activeStep
        F->>B: 更新 aria-selected、tabIndex、tabpanel
        B-->>U: 显示对应本地说明与示意
        Note over F,B: 无接口调用，不显示 Spinner；桌面端 Tab 与叙事滚动位置同步
    end

    opt 使用移动端导航
        U->>F: 点击“打开导航”
        F->>B: 展开纸面菜单、锁定背景滚动并 inert 页面主体
        F->>B: 聚焦第一个菜单链接
        alt 选择链接
            U->>N: 点击锚点 / Blog / 产品入口
            F->>B: 关闭菜单、解除 inert 并恢复页面滚动
            N->>B: 执行锚点、内部路由或外链
        else 按 Escape
            U->>F: Escape
            F->>B: 关闭菜单、解除 inert、恢复滚动
            F->>B: 将焦点还给菜单按钮
        end
    end

    opt 点击 Blog
        U->>N: 打开 /blog/
        N->>B: 加载同一前端应用的 Blog 分支
        B->>F: 渲染现有 BlogPage
        F-->>U: 显示文章列表
    end

    opt 点击“开始今天的书写”
        U->>N: 激活真实外部 CTA
        N->>P: 新窗口打开 https://ink-frontend.suoxya.com
        alt 外部入口可达
            P-->>U: 显示产品入口
            Note over P,U: 后续登录、注册、写作与后端行为超出本仓库范围
        else 外部入口不可达
            P-->>U: 浏览器显示网络错误
            Note over B,U: 原落地页仍保留在原窗口，可继续浏览或重试
        end
    end
```

## 异常与降级流程

```mermaid
flowchart TD
    A[用户打开落地页] --> B{HTML 是否到达}
    B -- 否 --> B1[浏览器网络错误<br/>由托管层处理]
    B -- 是 --> C{CSS / JS 是否加载}
    C -- 正常 --> D[完整 React 页面]
    C -- CSS 失败 --> C1[语义内容仍按 DOM 顺序出现<br/>无品牌样式]
    C -- JS 失败 --> C2[保留静态 SEO 内容与真实链接<br/>React 未挂载]
    D --> E{用户偏好 Reduced Motion}
    E -- 是 --> E1[取消 smooth scroll 和过渡<br/>Tab 即时切换]
    E -- 否 --> E2[使用 160–240ms 控件过渡]
    D --> F{本地演示内容是否存在}
    F -- 是 --> F1[直接同步渲染<br/>无 Loading/Error]
    F -- 否 --> F2[显示可继续写作的空态文案<br/>不阻塞 CTA]
    D --> G{点击外部产品入口}
    G -- 可达 --> G1[新窗口进入产品]
    G -- 不可达 --> G2[原窗口落地页保留<br/>用户可重试]
```

## 组件状态时序

### 四步 Tab

1. 初始 `activeStep = 0`，第一项 `aria-selected=true`、`tabIndex=0`。
2. 大于 900px 时，切换器进入 sticky 状态；页面继续原生滚动，并把滚动进度等分映射到 0–3，既不锁定滚轮也不使用整屏 scroll-snap。
3. 点击或方向键在 0–3 间循环，并滚到对应叙事进度；Home/End 分别跳到第一/最后一步。
4. 900px 及以下取消 sticky 长轨道，只做本地 Tab 切换；选中项在移动端滚入水平可视区域。
5. Reduced Motion 时使用即时滚动并关闭面板位移动画。
6. 非激活面板 `hidden`，避免读屏重复；面板无异步请求，因此无 Loading/Error。

### 移动菜单

1. 初始关闭，按钮 `aria-expanded=false`。
2. 打开后 `aria-expanded=true`，菜单可见，`body` 背景滚动锁定；页面主体、Footer 和菜单外 Header 控件设为 `inert`。
3. 焦点进入首个菜单链接；Tab/Shift+Tab 在菜单按钮和链接内循环；Escape 或选择链接关闭。
4. Escape 关闭后焦点回菜单按钮；导航关闭后恢复原 body overflow。
5. 组件卸载时清理 keydown 监听和滚动锁，避免影响 Blog 页面。

## 自动化验收映射

| 时序分支 | 验收点 |
|---|---|
| 首次初始化 | `/` 与 `/en/` 的 H1、lang、title、canonical 正确；无 Mimo DOM 文本/alt/import |
| 资源加载 | 本地首页无失败资源；Console 无 error；主要视觉不请求第三方素材 |
| 锚点导航 | `#how-it-works`、`#memory`、`#boundaries` 存在且目标不被 Header 遮挡 |
| 四步切换 | 桌面滚动、Click、Arrow、Home、End 更新 `aria-selected` 与唯一可见 panel；移动端无 sticky |
| 移动菜单 | 390px 下开/关、Escape、焦点归还、背景滚动锁定正常 |
| CTA | href、target、rel 正确；不实际提交登录/注册或写作数据 |
| Reduced Motion | 媒体查询下 `scroll-behavior:auto`、过渡近零，功能仍可用 |
| 跨视口 | 1440×900、1280×800、768×1024、390×844 无横向溢出或遮挡 |

## 阶段结论

流程只涉及本地 React 状态、浏览器原生导航和已存在的外部产品入口，没有虚构服务。下一阶段可据此审查设计目标和实现可行性。
