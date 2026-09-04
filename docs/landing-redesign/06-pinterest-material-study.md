# Pinterest 图标与编辑性元素补充调研

## 目标

为 Ink Memory 首页补充缺失的图标、记忆路径和页边批注感，同时遵守三条边界：不直接使用来源或授权不明的 Pin 图片；不重新引入人物、吉祥物或 Mimo 暗示；不让装饰遮盖正文和 CTA。

## 检索方向与证据

| 检索方向 | 观察到的有效语言 | 本地证据 |
|---|---|---|
| warm editorial journal UI icons | 暖棕双色、粗细统一的线稿、书页/笔/文件小图标、圆角但不拟物 | `evidence/pinterest-warm-icon-reference.png` |
| memory timeline editorial web design | 细线串联节点、日期/片段作为锚点、留白中的小型编辑标记 | `evidence/pinterest-memory-timeline-reference.png` |
| hand drawn editorial annotation symbols | 短划线、圈点、箭头和不完全对称的手绘轮廓 | `evidence/pinterest-editorial-symbols-reference.png` |
| editorial notebook margin annotation web design | 页边批注、荧光划线、正文与注释之间的明确层级 | `evidence/pinterest-margin-note-reference.png` |

以上截图只作为调研证据，不进入构建产物，也不作为运行时资源加载。

## Ink Memory 转译

- 新增四枚原创编辑性 SVG：来源页、同页阅读、记忆回环、确认笔迹。全部使用 `currentColor`、1.55px 圆角线条和极少量 Voice Yellow。
- Hero 新增三节点记忆路径：“读取当前页 → 带回相关记忆 → 等待确认”。它既补足首屏产品机制，也替代纯装饰插画。
- Notion、飞书、Obsidian、Flomo 使用四枚原创来源类别标记；不下载或临摹官方 Logo，不把第三方商标图形作为主视觉。
- Hover 只让图标产生 1–3px 位移、轻微旋转和纸面颜色变化；Reduced Motion 下取消位移。
- 移动端保持三节点等分与完整文字，不用横向越界、绝对定位照片或覆盖式贴纸。

## 明确舍弃

- 人物插画、拟人表情、动物、吉祥物和可爱贴纸包。
- 3D App 图标、玻璃拟态、照片拼贴、撕纸照片和厚重阴影。
- Pinterest 图片的直接下载、裁切、描摹或生产引用。
- 为了填满空间而加入无产品含义的星星、花朵、咖啡杯等装饰。
