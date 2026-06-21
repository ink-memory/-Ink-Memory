

# Ink & Memory 官网首屏位置清单

## 0. 页面基础

```txt
页面类型：Landing Page / 品牌官网首屏
设计稿基准尺寸：1600 × 900
页面背景：暖米色纸张质感
主内容安全边距：24px ~ 32px
主内容圆角：24px
整体风格：暖纸张、手写笔记本、毛绒潮玩、安静写作桌面
```

页面背景色：

```txt
body background: #F5E9D6
main surface: #FFF8ED
text primary: #111111
text secondary: #8A6A45
accent yellow: #FFD42A
accent green: #39D353
border: rgba(138, 106, 69, 0.22)
```

---

# 1. 顶部导航栏

## 1.1 容器位置

```txt
组件名：TopNav
位置：页面顶部
x: 24px
y: 24px
w: calc(100% - 48px)
h: 72px
border-radius: 24px
background: rgba(255, 248, 237, 0.86)
border: 1px solid rgba(138, 106, 69, 0.16)
box-shadow: 0 8px 24px rgba(80, 55, 30, 0.08)
z-index: 20
```

## 1.2 Logo 区

```txt
组件名：LogoBlock
x: 64px
y: 39px
w: 240px
h: 42px
内容：Ink & Memory + 小墨滴图标
字体：手写粗体 / brush handwritten
字号：34px
颜色：#111111
```

## 1.3 导航菜单

```txt
组件名：NavMenu
x: 440px
y: 49px
w: 520px
h: 28px
display: flex
gap: 44px
align-items: center
```

导航文本：

```txt
Home
Characters
Memory Club
Stories
Shop
```

样式：

```txt
font-size: 15px
font-weight: 500
color: #111111
active item: Home
active underline: #FFD42A, 32px × 3px, border-radius: 999px
```

## 1.4 右侧操作区

```txt
组件名：NavActions
x: auto
right: 64px
y: 39px
h: 48px
display: flex
gap: 24px
align-items: center
```

图标：

```txt
Search Icon
Bag Icon with Badge 2
Vertical Divider
```

主按钮：

```txt
组件名：StartWritingButton
文本：Start Writing ✦
w: 176px
h: 48px
border-radius: 999px
background: #FFD42A
color: #111111
font-size: 15px
font-weight: 700
```

---

# 2. Hero 左侧内容区

## 2.1 容器位置

```txt
组件名：HeroCopy
x: 80px
y: 130px
w: 560px
h: 500px
z-index: 5
```

## 2.2 主标题

```txt
组件名：HeroTitle
文本：
Ink &
Memory

x: 140px
y: 145px
w: 460px
h: 180px
font-family: handwritten display
font-size: 96px
line-height: 0.88
font-weight: 800
color: #111111
letter-spacing: -2px
```

黄色下划线：

```txt
组件名：HeroUnderline
x: 145px
y: 330px
w: 390px
h: 12px
颜色：#FFD42A
形态：手绘笔刷曲线
```

装饰元素：

```txt
左侧星星：x 38px / y 180px
左侧墨滴：x 52px / y 288px
右上微笑涂鸦：x 530px / y 165px
小星星：x 500px / y 145px
```

## 2.3 副标题

```txt
组件名：HeroSubtitle
文本：Write today. Remember forever.
x: 165px
y: 360px
w: 420px
h: 32px
font-size: 20px
font-weight: 700
color: #111111
```

## 2.4 中文辅助文案

```txt
组件名：HeroCnText
文本：把灵感写下来，让记忆留下来。
x: 165px
y: 398px
w: 420px
h: 30px
font-size: 18px
font-weight: 500
color: #111111
```

## 2.5 介绍文案

```txt
组件名：HeroDescription
文本：
A warm little companion for writing,
reflecting, and collecting everyday memories.

x: 165px
y: 442px
w: 430px
h: 56px
font-size: 15px
line-height: 1.5
color: #5F4935
```

---

# 3. 功能标签区

## 3.1 容器位置

```txt
组件名：FeatureTagGroup
x: 70px
y: 510px
w: 540px
h: 128px
display: flex
gap: 18px
```

## 3.2 单个标签卡

```txt
组件名：FeatureTagCard
w: 118px
h: 128px
border-radius: 18px
background: rgba(255, 248, 237, 0.78)
border: 1px solid rgba(138, 106, 69, 0.18)
box-shadow: 0 8px 20px rgba(80, 55, 30, 0.08)
```

四个标签内容：

```txt
1. Write
图标：钢笔线稿
x: 70px
y: 510px

2. Reflect
图标：爱心 / 回声图案
x: 206px
y: 510px

3. Collect
图标：文件夹 / 星标
x: 342px
y: 510px

4. Grow
图标：嫩芽
x: 478px
y: 510px
```

文字样式：

```txt
font-size: 15px
font-weight: 700
color: #111111
text-align: center
```

底部小下划线：

```txt
黄色或绿色短线
w: 34px
h: 3px
border-radius: 999px
```

---

# 4. Hero 右侧主角色区

## 4.1 主角色位置

```txt
组件名：MascotHero
资源：Mimo 3D 毛绒角色主图
x: 665px
y: 105px
w: 430px
h: 560px
z-index: 8
```

角色要求：

```txt
暖纸米色毛绒身体
圆角方形大头
黑色椭圆刺绣眼睛
小微笑
浅腮红
黑色绒毛发簇
左侧笔形耳朵
右侧折叠纸张耳朵
黄色记忆徽章
绿色灵感星星
黑色斜挎包
小记忆本
手持钢笔
```

角色在产品里承担品牌人格：Mimo 是 Ink & Memory 的记忆小搭子 / 灵感记录员，这和产品“写下来，让 AI 慢慢记住你”的核心定位一致。

## 4.2 桌面区

```txt
组件名：HeroDesk
x: 620px
y: 575px
w: 720px
h: 125px
background: wood texture
z-index: 4
```

桌面素材位置：

```txt
打开的笔记本：
x: 645px
y: 595px
w: 300px
h: 90px

墨水瓶：
x: 1055px
y: 555px
w: 88px
h: 112px

书本堆：
x: 1180px
y: 555px
w: 150px
h: 120px

钢笔：
x: 790px
y: 615px
w: 120px
h: 28px
```

## 4.3 背景便签 / 拍立得

```txt
组件名：WallNotes
位置：Hero 右上背景
z-index: 2
```

素材清单：

```txt
便签 1：
x: 1120px
y: 128px
w: 90px
h: 120px
文本：Small steps write great stories.

拍立得照片：
x: 1230px
y: 118px
w: 115px
h: 100px

黄色便签：
x: 1210px
y: 300px
w: 92px
h: 90px
文本：Don't forget to be kind to yourself.

绿色星星：
x: 1495px
y: 125px
w: 48px
h: 48px
```

---

# 5. 角色信息卡

## 5.1 容器位置

```txt
组件名：CharacterInfoCard
x: 1290px
y: 210px
w: 255px
h: 420px
border-radius: 28px
background: #FFF8ED
border: 1px solid rgba(138, 106, 69, 0.24)
box-shadow: 0 16px 40px rgba(80, 55, 30, 0.12)
z-index: 12
rotation: 1deg
```

## 5.2 标题

```txt
文本：Meet Mimo ✧
x: 1320px
y: 240px
font-size: 28px
font-family: handwritten
color: #111111
```

## 5.3 内容分区

```txt
Role
Memory Companion
灵感记录员

Personality
curious, gentle,
slightly weird,
always listening.

Accessories
Memory Notebook / Ink Pen Ear / Spark Badge / Tiny Satchel
```

样式：

```txt
label font-size: 13px
label font-weight: 700
body font-size: 13px
body line-height: 1.4
divider: 1px solid rgba(138, 106, 69, 0.22)
```

## 5.4 卡片按钮

```txt
组件名：KnowMimoButton
文本：Get to know Mimo →
x: 1320px
y: 575px
w: 190px
h: 44px
border-radius: 999px
background: #FFD42A
color: #111111
font-size: 13px
font-weight: 700
```

---

# 6. 三张功能卡片区

## 6.1 外层容器

```txt
组件名：FeatureCardsSection
x: 16px
y: 665px
w: calc(100% - 32px)
h: 225px
border-radius: 24px
background: rgba(255, 248, 237, 0.78)
border: 1px solid rgba(138, 106, 69, 0.18)
display: grid
grid-template-columns: repeat(3, 1fr)
gap: 14px
padding: 16px
z-index: 10
```

## 6.2 卡片一：Record Ideas

```txt
组件名：FeatureCardRecord
x: 32px
y: 680px
w: 470px
h: 190px
border-radius: 18px
background: rgba(255, 248, 237, 0.86)
```

内容：

```txt
标题：Record Ideas
中文：记录灵感
说明：Capture the little sparks that light up your day.
按钮：Learn more →
```

素材：

```txt
Mimo 坐姿 / 举笔
x: 55px
y: 694px
w: 200px
h: 160px
```

文案位置：

```txt
x: 300px
y: 715px
```

## 6.3 卡片二：Reflect Memories

```txt
组件名：FeatureCardReflect
x: 516px
y: 680px
w: 470px
h: 190px
border-radius: 18px
background: rgba(255, 248, 237, 0.86)
```

内容：

```txt
标题：Reflect Memories
中文：回望记忆
说明：Look back, feel deeply, understand yourself.
按钮：Learn more →
```

素材：

```txt
Mimo 闭眼抱本子
x: 560px
y: 690px
w: 205px
h: 165px
```

文案位置：

```txt
x: 790px
y: 715px
```

## 6.4 卡片三：Collect Moments

```txt
组件名：FeatureCardCollect
x: 1000px
y: 680px
w: 568px
h: 190px
border-radius: 18px
background: rgba(255, 248, 237, 0.86)
```

内容：

```txt
标题：Collect Moments
中文：收藏瞬间
说明：Save what matters and build your story.
按钮：Learn more →
```

素材：

```txt
Mimo 举拍立得照片
x: 1035px
y: 695px
w: 210px
h: 165px
```

文案位置：

```txt
x: 1280px
y: 715px
```

---

# 7. 底部氛围条

## 7.1 容器位置

```txt
组件名：FooterMoodBar
x: 0
y: 890px
w: 100%
h: 190px
background: #F5E9D6
display: flex
align-items: center
```

如果首屏只做到 900px 高，底部氛围条可以作为下一屏首段。

## 7.2 左侧手账素材

```txt
组件名：FooterNotebook
x: 30px
y: 905px
w: 260px
h: 150px
内容：Ink & Memory 手写本
```

## 7.3 三个底部标语

```txt
组件名：FooterSlogans
x: 410px
y: 930px
w: 520px
h: 100px
display: grid
grid-template-columns: repeat(3, 1fr)
gap: 48px
```

标语 1：

```txt
Icon: 小书本
Text: One page a day.
中文：每天一页。
```

标语 2：

```txt
Icon: 星星
Text: Small steps write great stories.
中文：点滴记录，成就故事。
```

标语 3：

```txt
Icon: 爱心
Text: Memories are inked softly in our hearts.
中文：记忆，温柔地写在心里。
```

## 7.4 右侧照片 / 蜡烛素材

```txt
拍立得照片组：
x: 1050px
y: 920px
w: 220px
h: 110px

便签：
x: 1230px
y: 980px
w: 130px
h: 72px
文本：You're doing great.

蜡烛：
x: 1420px
y: 900px
w: 120px
h: 150px
文字：INK & MEMORY
```

---

# 8. 资源素材清单

## 8.1 品牌类

```txt
asset-logo-main
用途：顶部 Logo / Hero 品牌识别
内容：Ink & Memory 手写字 + 小墨滴

asset-logo-mark
用途：favicon / 移动端 Logo / loading
内容：小墨滴笑脸

asset-yellow-underline
用途：标题下划线 / active nav
内容：黄色手绘笔刷线
```

## 8.2 角色类

```txt
asset-mimo-hero
用途：Hero 主视觉
姿态：坐在桌面，手持钢笔和小本子

asset-mimo-write
用途：Record Ideas 卡片
姿态：举笔 / 写作

asset-mimo-reflect
用途：Reflect Memories 卡片
姿态：闭眼抱本 / 安静回想

asset-mimo-collect
用途：Collect Moments 卡片
姿态：举照片 / 收藏瞬间

asset-mimo-small-icon
用途：空状态 / loading / toast
姿态：小头像或半身
```

## 8.3 配件类

```txt
asset-memory-notebook
小记忆本

asset-ink-pen
钢笔 / 笔形耳朵延展

asset-memory-badge
黄色记忆徽章

asset-spark-badge
绿色灵感星星

asset-satchel
黑色斜挎包

asset-ink-bottle
墨水瓶

asset-polaroid
拍立得照片

asset-sticky-note
便签纸

asset-candle
Ink & Memory 蜡烛

asset-desk-notebook
打开的桌面手账
```

## 8.4 装饰图标类

```txt
icon-write-pen
icon-reflect-heart
icon-collect-folder
icon-grow-sprout
icon-sparkle
icon-smile
icon-ink-drop
icon-note
icon-heart
icon-dots
icon-swirl
```

## 8.5 材质类

```txt
texture-paper-bg
暖米色纸张背景

texture-card-paper
卡片纸张纹理

texture-plush-fur
毛绒材质

texture-leather-black
黑色皮革 / 包带

texture-wood-desk
木桌纹理
```

---

# 9. 交互状态说明

## 9.1 导航

```txt
hover:
文字颜色保持 #111111
下方出现 #FFD42A 短线
轻微 translateY(-1px)

active:
Home 默认 active
黄色短下划线常驻
```

## 9.2 CTA 按钮

```txt
Start Writing hover:
background: #111111
color: #FFD42A
box-shadow: 0 8px 20px rgba(17,17,17,0.16)

Learn more hover:
按钮右箭头向右移动 4px
背景略加深
```

## 9.3 功能卡片

```txt
hover:
translateY(-4px)
box-shadow: 0 14px 32px rgba(80, 55, 30, 0.14)

角色图：
轻微 scale(1.02)
```

## 9.4 角色卡

```txt
hover:
rotation: 0deg
translateY(-3px)
```

---

# 10. 响应式规则

## Desktop ≥ 1280px

```txt
保持当前布局
Hero 左文案 + 右角色
功能卡片三列
角色信息卡固定在右侧
```

## Tablet 768px–1279px

```txt
导航菜单减少间距
Hero 改为上下结构：
上：文案
中：角色
下：角色信息卡
功能卡片三列改两列或横向滚动
```

## Mobile ≤ 767px

```txt
导航：
隐藏中间菜单
保留 Logo + Start Writing

Hero：
单列
标题字号 56px
角色放在标题下方
角色信息卡放在角色下方
功能卡片一列排列

底部氛围素材减少：
隐藏照片组、蜡烛、部分便签
```

---

# 11. 给前端的结构建议

```txt
Page
├── TopNav
│   ├── LogoBlock
│   ├── NavMenu
│   └── NavActions
│
├── HeroSection
│   ├── HeroCopy
│   │   ├── HeroTitle
│   │   ├── HeroSubtitle
│   │   ├── HeroDescription
│   │   ├── HeroActions
│   │   └── FeatureTagGroup
│   │
│   ├── HeroVisual
│   │   ├── MascotHero
│   │   ├── DeskAssets
│   │   └── WallNotes
│   │
│   └── CharacterInfoCard
│
├── FeatureCardsSection
│   ├── FeatureCardRecord
│   ├── FeatureCardReflect
│   └── FeatureCardCollect
│
└── FooterMoodBar
    ├── FooterNotebook
    ├── FooterSlogans
    └── FooterAtmosphereAssets
```

---

# 12. 页面核心文案

```txt
Logo:
Ink & Memory

Hero Title:
Ink & Memory

Hero Subtitle:
Write today. Remember forever.

Hero CN:
把灵感写下来，让记忆留下来。

Hero Description:
A warm little companion for writing, reflecting, and collecting everyday memories.

CTA Primary:
Start Writing

CTA Secondary:
Meet Mimo

Feature Tags:
Write
Reflect
Collect
Grow

Character Card:
Meet Mimo

Role:
Memory Companion
灵感记录员

Personality:
curious, gentle,
slightly weird,
always listening.

Accessories:
Memory Notebook
Ink Pen Ear
Spark Badge
Tiny Satchel

Feature Card 1:
Record Ideas
记录灵感
Capture the little sparks that light up your day.

Feature Card 2:
Reflect Memories
回望记忆
Look back, feel deeply, understand yourself.

Feature Card 3:
Collect Moments
收藏瞬间
Save what matters and build your story.

Footer:
One page a day.
每天一页。

Small steps write great stories.
点滴记录，成就故事。

Memories are inked softly in our hearts.
记忆，温柔地写在心里。
```

---

# 13. 开发注意事项

1. **不要把整张图当背景图直接铺。**
   拆成 Logo、角色、卡片、按钮、装饰、桌面素材，页面才可维护。

2. **角色主图可以先用 PNG 透明图。**
   后续再补 WebP / AVIF，移动端用低分辨率版本。

3. **文字必须用真实 DOM。**
   不要把标题和按钮文字烘焙进图片，否则无法响应式、无法 SEO、无法国际化。

4. **桌面素材可以作为装饰层。**
   用 absolute 定位，设置 `pointer-events: none`。

5. **Mimo 角色统一命名。**
   不要页面里一会儿 Mimo，一会儿 Memo。统一用 `Mimo`。

6. **品牌逻辑要和产品一致。**
   这个页面不是单纯卖潮玩，Mimo 是 Ink & Memory 的“记忆陪伴角色”。产品真正核心是长期写作、记忆沉淀、AI 回看与克制协作，这与现有产品定位一致。
