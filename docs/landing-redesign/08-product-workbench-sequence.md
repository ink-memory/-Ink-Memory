# IM 产品工作台时序图

## 页面与工作台

```mermaid
sequenceDiagram
    autonumber
    actor U as 用户
    participant B as 浏览器
    participant W as Workbench
    participant F as Workflow
    participant N as 导航层
    participant P as 产品入口

    U->>B: 打开 / 或 /en/
    B->>B: 加载 HTML / CSS / JS
    B->>W: 渲染 Tasks / Goals / Decks
    B-->>U: Hero + 产品画布

    loop 页面滚动
        U->>B: 原生滚轮 / 触控滚动
        B->>W: 完整工作台进入阅读位
        W->>W: 固定完整画布
        W->>W: 桌面与移动端依次切换 Tasks / Goals / Decks
        B->>F: 更新拓扑进度与面板位置
        Note over B,F: 不拦截滚轮，不虚构惯性滚动
    end

    loop 平台轨道
        B->>B: 循环移动平台标识
        U->>B: Hover / Focus
        B-->>U: 暂停轨道
    end

    opt 点击或键盘辅助定位工作台入口
        U->>W: Tasks / Goals / Decks / Arrow
        W->>B: 定位到对应滚动进度
        W->>W: 更新本地 activeView
        W-->>U: 路径 / 状态 / Agents / 模块拓扑
    end

    loop 浏览协作流程
        U->>F: 滚动
        B->>B: 下一完整面板上移
        B-->>U: 连续遮盖上一面板
        F->>F: 面板到达顶线后更新 01–04 索引
    end

    opt 点击或键盘跳步
        U->>F: Click / Arrow / Home / End
        F->>B: 定位对应完整面板
    end

    opt prefers-reduced-motion
        B->>B: 停止平台轨道 / 即时定位 / 取消非必要过渡
    end

    opt 点击主 CTA
        U->>N: 打开 IM 工作台
        N->>P: 新窗口打开既有产品入口
        Note over P: 登录与后端运行超出本仓库范围
    end
```

## 产品对象关系

```mermaid
flowchart LR
    R[需求] --> G[目标 / 任务]
    G --> A[多智能体]
    A --> T[Skills / MCP / Plugins]
    T --> P[路径 / 方案]
    P --> D[Deck]
    H[任务历史] -. 状态 / 结果 .-> G
    G -. 校准 .-> H
```

## 降级

- JS 失败：保留 `index.html` / `en/index.html` 静态产品说明。
- CSS 失败：语义结构和真实链接仍可读取。
- 外部入口失败：原落地页留在原标签页。
- 移动端：工作台压缩后完整进入视口并吸附，随触控滚动切换入口；拓扑转纵向；Workflow 取消粘性叠层，四个完整流程面板线性排列。

## Blog 列表与阅读

```mermaid
sequenceDiagram
    actor U as 用户
    participant B as 浏览器
    participant I as Blog Index
    participant A as Article

    U->>B: 打开 /blog/
    B->>I: 渲染 Featured / Index / Topics
    U->>I: 滚动
    I-->>U: 卡片渐入 / Topics 吸附
    U->>I: 选择 Topics
    I->>I: 本地过滤文章
    I-->>U: 更新结果数与文章行
    U->>A: 打开文章
    A-->>U: 标题 / 概念图 / 正文 / 目录
    loop 阅读
        U->>A: 原生滚动
        A->>A: 更新阅读进度与当前章节
    end
    opt 目录定位
        U->>A: 点击章节
        A-->>U: 定位到标题上方 118px
    end
    opt 分享
        U->>A: 复制链接
        A-->>U: 已复制
    end
```
