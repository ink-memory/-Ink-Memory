# -*- coding: utf-8 -*-
"""Rebuild Ink & Memory UI Design.pdf with the color_system token palette."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, PageBreak, KeepTogether)

reg = os.environ['DAIMON_CJK_FONT_REGULAR']
bold = os.environ['DAIMON_CJK_FONT_BOLD']
pdfmetrics.registerFont(TTFont('CJK', reg))
pdfmetrics.registerFont(TTFont('CJK-B', bold))
pdfmetrics.registerFontFamily('CJK', normal='CJK', bold='CJK-B',
                              italic='CJK', boldItalic='CJK-B')

# ---- palette (source of truth: ink-and-memory/frontend/src/styles/tokens.css) ----
C = dict(
    bg_app='#F6EFE5', bg_paper='#FFFAF2', bg_solid='#FFFDF8',
    text_primary='#3F3429', text_body='#4B3F33', text_secondary='#7A6A59',
    text_muted='#9A8A78', action_primary='#5F4A36', on_action='#FFFFFF',
    border_paper='#D8C7B3', border_neutral='#E6DDD0',
    voice_yellow='#F39C12', voice_green='#27AE60', link_blue='#4A90E2',
)

INK = HexColor(C['text_primary'])
BODY = HexColor(C['text_body'])
MUTED = HexColor(C['text_secondary'])
LINE = HexColor(C['border_paper'])

def st(name, **kw):
    base = dict(fontName='CJK', fontSize=10.5, leading=17, textColor=BODY)
    base.update(kw)
    return ParagraphStyle(name, **base)

S = dict(
    cover=st('cover', fontName='CJK-B', fontSize=26, leading=36,
             textColor=INK, alignment=TA_CENTER),
    cover_sub=st('cover_sub', fontSize=12, leading=20, textColor=MUTED,
                 alignment=TA_CENTER),
    h1=st('h1', fontName='CJK-B', fontSize=15, leading=21, textColor=INK,
          spaceBefore=16, spaceAfter=7),
    h2=st('h2', fontName='CJK-B', fontSize=12, leading=18, textColor=INK,
          spaceBefore=10, spaceAfter=5),
    body=st('body', spaceAfter=3),
    li=st('li', leftIndent=16, spaceAfter=2),
    note=st('note', fontSize=9.5, leading=15, textColor=MUTED, spaceAfter=6),
)

def P(t, s='body'): return Paragraph(t, S[s])
def H1(t): return Paragraph(t, S['h1'])
def H2(t): return Paragraph(t, S['h2'])
def LI(items): return [P('• ' + i, 'li') for i in items]

def chip_table(rows, widths):
    data = [['', '名称', '色值', '用途']]
    for name, hexv, use in rows:
        data.append(['', name, hexv, use])
    t = Table(data, colWidths=widths, rowHeights=None)
    style = [
        ('FONTNAME', (0, 0), (-1, 0), 'CJK-B'),
        ('FONTNAME', (0, 1), (-1, -1), 'CJK'),
        ('FONTSIZE', (0, 0), (-1, -1), 9.5),
        ('TEXTCOLOR', (0, 0), (-1, -1), BODY),
        ('LINEABOVE', (0, 0), (-1, 0), 1.2, INK),
        ('LINEBELOW', (0, 0), (-1, 0), 0.6, INK),
        ('LINEBELOW', (0, -1), (-1, -1), 1.2, INK),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]
    for i, (_, hexv, _u) in enumerate(rows, start=1):
        style.append(('BACKGROUND', (0, i), (0, i), HexColor(hexv)))
        style.append(('BOX', (0, i), (0, i), 0.5, LINE))
    t.setStyle(TableStyle(style))
    return t

def plain_table(header, rows, widths, fs=9.5):
    data = [header] + rows
    t = Table(data, colWidths=widths)
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'CJK-B'),
        ('FONTNAME', (0, 1), (-1, -1), 'CJK'),
        ('FONTSIZE', (0, 0), (-1, -1), fs),
        ('TEXTCOLOR', (0, 0), (-1, -1), BODY),
        ('LINEABOVE', (0, 0), (-1, 0), 1.2, INK),
        ('LINEBELOW', (0, 0), (-1, 0), 0.6, INK),
        ('LINEBELOW', (0, -1), (-1, -1), 1.2, INK),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return t

story = []

# ================= Cover =================
story += [Spacer(1, 5.2*cm),
          P('Ink & Memory 原创潮玩 IP 品牌 UI 设计稿', 'cover'),
          Spacer(1, 0.5*cm),
          P('Memory Companion Landing Page · 品牌提案 / 官网首屏 / 产品视觉概念稿', 'cover_sub'),
          Spacer(1, 1.2*cm),
          P('v2.1 · 2026-07-25', 'cover_sub'),
          P('色彩系统已对齐《Color System PRD》与 frontend/src/styles/tokens.css（唯一权威色值来源）', 'cover_sub'),
          P('分区规则：减少面板 · 增加留白 · 视觉收敛 · 轻纸面分区 · 单一虚线边界 · 无卡片设计', 'cover_sub'),
          PageBreak()]

# ================= 1-3 =================
story += [H1('1. 项目名称'), P('Ink & Memory — Memory Companion Landing Page'),
          P('页面类型：品牌提案展示页 / 官网首屏 / 产品视觉概念稿'),
          P('核心主题：记录灵感、收藏记忆、陪伴写作、温暖纸张、毛绒潮玩'),
          P('视觉方向：C4D 三维毛绒角色 + 温暖手写笔记本 UI + 高级商业品牌页'),
          H1('2. 页面设计目标'),
          P('本设计稿需要呈现一个完整、可上线感强的 Ink & Memory 品牌 UI 页面，而不是单纯角色海报。页面需要同时完成四件事：')]
story += LI(['建立 Ink & Memory 的品牌识别',
             '展示原创毛绒潮玩 IP 角色',
             '表达「写作、回忆、灵感、陪伴」的产品气质',
             '形成适合品牌提案、作品集、官网首屏的高级视觉效果'])
story += [P('整体画面应像一个真实的品牌官网首页，具备清晰导航、Hero 主视觉、CTA 按钮、角色信息卡、功能卡片和底部氛围区。'),
          H1('3. 画布规格'), H2('推荐画布尺寸')]
story += LI(['主方案：1600 × 1200 px', '备选方案：1440 × 1080 px',
             '构图比例：4:3 横向构图', '页面风格：高保真 UI Mockup',
             '背景：暖米色纸张质感（Warm Canvas #F6EFE5），不使用纯白背景'])
story += [H2('页面安全边距')]
story += LI(['左右边距：80 px', '顶部边距：40 px', '内容最大宽度：1440 px',
             '页面整体采用 12 栏栅格系统',
             '主视觉区左右分栏：左侧内容 45%，右侧角色视觉 55%'])

# ================= 4 =================
story += [H1('4. 品牌视觉关键词'), H2('核心关键词'),
          P('Ink · Memory · Notebook · Reflection · Warm Paper · Plush Toy · Writing Desk · Companion · Gentle Weirdness · Daily Record'),
          H2('中文关键词'),
          P('记录 · 灵感 · 记忆 · 陪伴 · 手写笔记 · 暖纸张 · 安静书桌 · 情绪收藏 · 毛绒小搭子')]

# ================= 5 色彩系统（重写） =================
story += [PageBreak(), H1('5. 色彩系统（v2.0 重写）'),
          P('本章已与产品《Color System PRD》对齐。唯一权威色值来源为 frontend/src/styles/tokens.css；'
            '本稿全部颜色引用均可追溯到该语义 Token 体系，不使用孤立色值。', 'note'),
          H2('5.1 主色板（亮色主题）'),
          chip_table([
              ('Warm Canvas 暖纸画布', C['bg_app'], '页面主背景、纸张氛围（--color-bg-app）'),
              ('Paper Cream 奶油纸面', C['bg_paper'], '卡片、浮层、按钮浅底（--color-bg-paper）'),
              ('Solid Cream 实底奶油', C['bg_solid'], '菜单、Tooltip、Popover 不透明浮层（--color-bg-surface-solid）'),
              ('Charcoal Brown 炭棕', C['text_primary'], '主标题、Logo、图标、描边（--color-text-primary）'),
              ('Body Brown 正文棕', C['text_body'], '正文内容（--color-text-body）'),
              ('Warm Brown 暖棕', C['text_secondary'], '说明文字、辅助信息（--color-text-secondary）'),
              ('Muted Tan 褐灰', C['text_muted'], '弱信息、时间戳、placeholder（--color-text-muted）'),
              ('Action Brown 主操作棕', C['action_primary'], 'CTA 主按钮、当前导航、深色带（--color-action-primary）'),
              ('Border Paper 纸边棕', C['border_paper'], '分割线、卡片边框、页边界（--color-border-paper）'),
              ('Memory Yellow 记忆黄', C['voice_yellow'], '徽章、下划线、重点 accent（--color-voice-yellow）'),
              ('Spark Green 灵感绿', C['voice_green'], '灵感星星、状态点、辅助 accent（--color-voice-green）'),
              ('Link Blue 链接蓝', C['link_blue'], '链接、发送可用态（--color-action-link）'),
          ], [1.0*cm, 4.2*cm, 2.4*cm, 8.2*cm]),
          H2('5.2 色彩使用规则')]
story += LI([
    '页面大面积使用 Warm Canvas 和 Paper Cream，避免纯白全屏与冷灰渐变。',
    'Charcoal Brown 用于标题、图标、Logo 和主导航；正文用 Body Brown，不用纯黑。',
    'CTA 等主操作按钮背景统一用 Action Brown，前景文字用白色（--color-text-on-action #FFFFFF）。',
    'Memory Yellow 只做小面积重点强调（徽章、手绘下划线、灵感光点），不大面积铺满。',
    'Spark Green 用于角色标志性配件和小面积灵感元素。',
    'Warm Brown / Muted Tan 承担说明文字与弱信息层级；阴影统一走暖棕体系（rgba(91,69,44,0.08 / 0.16)）。',
    '半透明色一律由 Token 经 color-mix 派生，不新增孤立十六进制色值。',
    '避免冷灰、蓝紫霓虹、赛博朋克色彩。'])
story += [H2('5.3 旧版色板 → v2.0 映射'),
          plain_table(['旧色板（v1.0）', '旧色值', 'v2.0 Token', '新色值'],
              [['Paper Beige', '#F5E9D6', '--color-bg-app (Warm Canvas)', '#F6EFE5'],
               ['Soft Cream', '#FFF8ED', '--color-bg-paper (Paper Cream)', '#FFFAF2'],
               ['Ink Black', '#111111', '--color-text-primary (Charcoal Brown)', '#3F3429'],
               ['Memory Yellow', '#FFD42A', '--color-voice-yellow', '#F39C12'],
               ['Spark Green', '#39D353', '--color-voice-green', '#27AE60'],
               ['Warm Brown', '#8A6A45', '--color-text-secondary', '#7A6A59'],
               ['Muted Tan', '#C9B69A', '--color-border-paper (Border Paper)', '#D8C7B3'],
               ['rgba(138,106,69,·)', '—', 'color-mix(--color-action-primary)', '#5F4A36 派生']],
              [3.6*cm, 2.4*cm, 6.0*cm, 3.8*cm]),
          H2('5.4 分区与留白规则（轻纸面 · 无卡片）'),
          P('为减少显示过于突兀，全站分区遵循「少面板、多留白、视觉收敛」原则：', 'note')]
story += LI([
    '<b>减少面板设计</b>：页面内不叠加多层卡片面板，普通内容不使用卡片式容器承载。',
    '<b>增加留白</b>：以留白、字号与字重层级代替边框和阴影来分区，分区之间保持充足呼吸感。',
    '<b>局部视觉收敛</b>：强调色与装饰只集中在少数焦点（Hero、CTA、小面积 accent），其余区域保持安静。',
    '<b>轻纸面 / 分区视觉</b>：分区使用 Paper Cream 浅底或透明混合 + 行分隔线表达层级，不用深色填充。',
    '<b>虚线边框</b>：页面级承载只保留一条 Border Paper #D8C7B3 虚线边界；内部区块不再额外套实线卡片。',
    '<b>无卡片设计</b>：条目行静止时不使用阴影、外框卡片或深色底；hover 才允许出现 --color-shadow-soft 轻阴影；选中态用细线或右侧对勾表达。'])

# ================= 6-8 =================
story += [PageBreak(), H1('6. 字体系统'),
          H2('6.1 Logo / 大标题'),
          P('字体气质：手写感、圆润、粗黑、带一点涂鸦感。'),
          P('参考方向：手写英文 Brush Font / Rounded Display Font。产品侧展示字体为 Excalifont / Georgia，中文优先 Xiaolai。')]
story += LI(['Ink & Memory Logo', 'Hero 大标题', '局部装饰文字'])
story += [H2('6.2 UI 正文字体'),
          P('字体气质：干净、清晰、现代、轻量（系统无衬线）。')]
story += LI(['导航栏', '功能卡片', '按钮', '角色信息卡', '说明文字'])
story += [H2('6.3 中文字体'),
          P('中文风格：圆润、手账感、温暖，不使用过度商业黑体。')]
story += LI(['中文辅助文案', '功能卡中文标题', '角色说明文字'])
story += [H1('7. 原创 IP 角色设定'), H2('7.1 角色名称'),
          P('建议名称：<b>Mimo</b>'),
          P('中文定位：灵感记录员 / 记忆小搭子'),
          P('英文定位：Memory Companion'),
          H1('8. 角色造型规范'), H2('8.1 整体比例')]
story += LI(['头身比例约 2.5 头身', '大头短身', '方圆形头部',
             '身体短小、圆润、软乎乎', '四肢简化，像毛绒玩偶手办',
             '角色站姿或坐姿都要稳定可爱'])
story += [H2('8.2 头部设计')]
story += LI(['头部为圆角方块形', '边缘柔软，不出现硬直角',
             '表面为暖纸米色短绒材质（近 Warm Canvas / Paper Cream）',
             '顶部有炭棕色绒毛发簇（Charcoal Brown #3F3429），像一小撮墨迹或思想火苗',
             '头部轮廓保持高度识别性'])
story += [H2('8.3 五官设计')]
story += LI(['眼睛：炭棕色椭圆刺绣眼睛（Charcoal Brown，不用死黑）',
             '嘴巴：极简弧线微笑', '腮红：浅桃色圆形刺绣腮红',
             '表情：温暖、安静、倾听感', '不使用复杂表情，不做过度拟人化'])
story += [H2('8.4 标志性配件'), P('角色必须拥有固定配件系统：')]
story += LI(['<b>笔形侧耳</b>：一侧像柔软的铅笔 / 钢笔，末端为炭棕笔尖，中段有 Memory Yellow #F39C12 环形装饰。',
             '<b>折叠纸张耳朵</b>：另一侧像折叠的小纸页或小本子，边缘有炭棕虚线缝线，角落可有折角。',
             '<b>黄色记忆徽章</b>：位于头部左上区域，圆形 PVC 质感，Memory Yellow #F39C12，中间有小笔图标。',
             '<b>绿色灵感星星</b>：位于头部右上区域，Spark Green #27AE60 四角星形 PVC 配件，表达灵感闪现。',
             '<b>炭棕斜挎包</b>：从肩部斜跨到身体，包身炭棕，带一颗 Memory Yellow 扣子，包内可插一本小记忆本。',
             '<b>小记忆本</b>：米色纸张封面（Paper Cream），炭棕线圈装订，封面写有 “INK MEMORY”，可作为手持物或包内配件。'])
story += [H2('8.5 材质要求')]
story += LI(['主体：柔软短绒、毛绒玩偶质感', '眼睛：刺绣线材质',
             '徽章：微光泽 PVC', '星星：绿色微光泽 PVC',
             '小本子：纸质封面 + 炭棕线圈', '包带：哑光皮革或布料质感',
             '角色整体为 C4D 三维渲染，不是二维插画'])

# ================= 9-12 =================
story += [PageBreak(), H1('9. 页面整体布局'), P('页面分为五个区域：')]
story += LI(['顶部导航栏', 'Hero 首屏主视觉', '角色信息卡', '三张功能卡片', '底部写作工作台氛围区'])
story += [P('整体布局需要形成从品牌认知到角色认知，再到产品功能认知的路径。'),
          H1('10. 顶部导航栏设计'), H2('10.1 布局')]
story += LI(['位置：页面顶部', '高度：80 px', '左右边距：80 px',
             '背景：透明或半透明暖纸色（Warm Canvas 90% 左右透明混合）',
             '圆角：可无圆角，也可使用轻微底部分割线（Border Paper）'])
story += [H2('10.2 左侧 Logo'), P('内容：Ink & Memory')]
story += LI(['手写感粗黑字体', '颜色：Charcoal Brown #3F3429',
             '可在 Logo 旁加入一个小墨滴图标或微笑符号',
             'Logo 不要过度复杂，保持识别清晰'])
story += [H2('10.3 导航项'), P('导航文字：Home · Characters · Memory Club · Stories · Shop')]
story += LI(['字号：15–16 px', '字重：500', '颜色：Charcoal Brown',
             '当前项 Home 可加 Memory Yellow 短下划线', '导航间距：32–40 px'])
story += [H2('10.4 右侧 CTA'), P('按钮文字：Start Writing')]
story += LI(['背景：Action Brown #5F4A36', '文字：白色 #FFFFFF（--color-text-on-action）',
             '圆角：999 px 胶囊按钮', '高度：44 px', '左右内边距：24 px',
             'hover 状态可加入 Memory Yellow 边缘光或轻微上浮阴影（--color-shadow-soft）'])
story += [H1('11. Hero 首屏主视觉'), H2('11.1 区域尺寸')]
story += LI(['位置：导航栏下方', '高度：约 620 px', '布局：左右分栏',
             '左侧：文案与 CTA', '右侧：3D 毛绒角色主视觉'])
story += [H1('12. Hero 左侧内容'), H2('12.1 主标题'), P('文字：Ink & Memory')]
story += LI(['大号手写感字体', '字号：88–110 px', '行高：0.95',
             '颜色：Charcoal Brown #3F3429',
             '文字下方加入 Memory Yellow #F39C12 手绘下划线',
             '下划线应像笔刷划过，不要太工整'])
story += [H2('12.2 英文副标题'), P('文字：Write today. Remember forever.')]
story += LI(['字号：24 px', '字重：600', '颜色：Charcoal Brown', '与主标题间距：24 px'])
story += [H2('12.3 中文辅助文案'), P('文字：把灵感写下来，让记忆留下来。')]
story += LI(['字号：20 px', '颜色：Warm Brown #7A6A59', '行高：1.6'])
story += [H2('12.4 简短介绍'),
          P('文字：A warm little companion for writing, reflecting, and collecting everyday memories.')]
story += LI(['字号：16 px', '颜色：Warm Brown #7A6A59', '最大宽度：480 px', '行高：1.7'])
story += [H2('12.5 主按钮组')]
story += LI(['<b>按钮 1：Start Writing</b> — 背景 Action Brown #5F4A36，文字白色 #FFFFFF，圆角 999 px，高度 52 px，左右内边距 30 px。',
             '<b>按钮 2：Meet Mimo</b> — 背景 Paper Cream #FFFAF2，边框 1.5 px Charcoal Brown #3F3429，文字 Charcoal Brown，圆角 999 px，高度 52 px，左右内边距 30 px。',
             '按钮组间距：16 px'])
story += [H2('12.6 功能标签'), P('四个标签：Write · Reflect · Collect · Grow')]
story += LI(['每个标签包含：一个手绘小图标、一个英文词、可选中文小字。',
             '图标建议：Write 钢笔尖 / Reflect 小镜子或回声线 / Collect 爱心或记忆盒 / Grow 嫩芽。',
             '样式：背景 Paper Cream 半透明，边框 Border Paper #D8C7B3，圆角 18 px，高度 42 px，内边距 14 px 18 px；不使用阴影，保持轻纸面条目感。'])

# ================= 13-15 =================
story += [PageBreak(), H1('13. Hero 右侧角色主视觉'), H2('13.1 主角色姿态'),
          P('角色 Mimo 坐在一张温暖的纸张舞台或木质书桌上。姿态建议：')]
story += LI(['一只手抱着小记忆本', '一只手拿着钢笔', '微微向左看向页面文案',
             '表情温暖安静', '身体略微前倾，有倾听感'])
story += [H2('13.2 角色大小')]
story += LI(['角色视觉高度：约 520–620 px', '占右侧区域 70% 高度',
             '角色是页面视觉焦点', '视觉注意力占比约 35%–45%'])
story += [H2('13.3 角色周围元素'), P('围绕角色加入少量环境元素：')]
story += LI(['打开的笔记本', '墨水瓶', '便签纸', '拍立得照片',
             'Memory Yellow 灵感光点', '小星星涂鸦', '一条弯曲墨线'])
story += [P('这些元素要辅助角色，不要抢主视觉。'),
          H2('13.4 灯光')]
story += LI(['暖色主光从左上方照射', '右侧弱补光',
             '角色底部有柔和接触阴影（暖棕系）', '轻微景深，背景元素略微虚化'])
story += [H1('14. 角色信息卡设计'), H2('14.1 位置'),
          P('放置在 Hero 右侧角色旁边，或左侧文案下方偏右位置。信息卡以轻纸面条目形式贴合页面，不做悬浮卡片。'),
          H2('14.2 卡片尺寸')]
story += LI(['宽度：360–420 px', '高度：190–230 px', '圆角：12 px',
             '背景：Paper Cream #FFFAF2 或透明混合', '边框：1 px Border Paper #D8C7B3 虚线',
             '阴影：无（不使用悬浮阴影）'])
story += [H2('14.3 卡片内容'), P('标题：Character Card')]
story += LI(['Name — Mimo', 'Role — Memory Companion / 灵感记录员',
             'Personality — Curious, gentle, slightly weird, always listening.',
             'Accessories — Memory notebook, spark badge, tiny satchel, pencil ear.'])
story += [H2('14.4 卡片视觉细节')]
story += LI(['左上角加入小头像图标', '右上角加入 Memory Yellow 圆形记忆徽章',
             '卡片背景可带极淡横线纸纹（Border Paper 低透明度派生）',
             '分组之间用虚线或 Border Paper 分割线', '字体清晰，避免密集'])
story += [H1('15. 三张功能卡片设计'), H2('15.1 区域位置')]
story += LI(['位于 Hero 下方，横向排列三张卡片', '整体宽度：页面内容宽度 100%',
             '卡片间距：24 px', '卡片高度：220–260 px'])
story += [H2('15.2 卡片 1：Record Ideas / 记录灵感'),
          P('说明文案：Catch tiny thoughts before they disappear.'),
          P('视觉元素：Mimo 手持钢笔；Memory Yellow 灵感线条从笔尖飘出；小便签图形。'),
          H2('15.3 卡片 2：Reflect Memories / 回望记忆'),
          P('说明文案：Look back gently and find patterns in your days.'),
          P('视觉元素：Mimo 坐在小本子旁；背后有淡淡回声圆环；纸张纹理和小镜子图标。'),
          H2('15.4 卡片 3：Collect Moments / 收藏瞬间'),
          P('说明文案：Keep soft moments, moods, and little sparks together.'),
          P('视觉元素：Mimo 抱着小记忆盒或照片；周围有拍立得、小星星、Spark Green 灵感光点。'),
          H2('15.5 卡片统一样式')]
story += LI(['背景：Paper Cream #FFFAF2 或透明混合', '圆角：12 px',
             '边框：1 px color-mix(--color-border-paper 55%, transparent)，或仅靠留白与行分隔线分区',
             '阴影：静止时无阴影；仅 hover 出现 --color-shadow-soft 轻阴影',
             '标题颜色：Charcoal Brown', '正文颜色：Warm Brown',
             '图标颜色：Charcoal Brown + Memory Yellow 点缀',
             '三条目整体避免多层卡片面板堆叠，保持轻纸面分区',
             '每张卡片中的角色必须保持同一造型系统'])

# ================= 16-18 =================
story += [PageBreak(), H1('16. 底部写作工作台氛围区'), H2('16.1 区域定位'),
          P('底部作为品牌情绪收束区，不做复杂内容堆叠。它应像一个温暖的写作桌面，暗示用户每天写下一页。'),
          H2('16.2 元素清单')]
story += LI(['打开的手账本', '墨水瓶', '钢笔', '便签纸', '拍立得照片',
             '木桌边缘', '小夹子', '纸张纹理', '暖光灯影', '一杯咖啡或茶', '小墨滴角色剪影'])
story += [H2('16.3 文案'),
          P('主标语：One page a day.'),
          P('辅助标语：Small steps write great stories.'),
          P('小字氛围文案：Memories are inked softly in our hearts.'),
          H2('16.4 视觉要求')]
story += LI(['元素数量适中', '不要杂乱', '留出呼吸感',
             '让底部成为安静收尾，不要抢 Hero 主视觉'])
story += [H1('17. 装饰图形系统'), P('页面中可加入手绘感装饰元素：')]
story += LI(['Memory Yellow 手绘下划线', '小星星', '墨滴', '微笑脸', '小笔记本',
             '纸张折角', '虚线缝线', '回忆泡泡', '灵感灯泡', '手写箭头', '轻微胶带贴纸'])
story += [P('装饰元素应遵循以下规则：')]
story += LI(['小面积使用', '不破坏 UI 阅读', '与角色配件保持同一图形语言',
             'Charcoal Brown 线条 + Memory Yellow / Spark Green 点缀', '不使用复杂彩虹色'])
story += [H1('18. 页面文案完整稿'), H2('18.1 顶部导航'),
          P('Logo：Ink & Memory　｜　导航：Home · Characters · Memory Club · Stories · Shop　｜　按钮：Start Writing'),
          H2('18.2 Hero 文案'),
          P('主标题：Ink & Memory'),
          P('副标题：Write today. Remember forever.'),
          P('中文辅助：把灵感写下来，让记忆留下来。'),
          P('介绍文案：A warm little companion for writing, reflecting, and collecting everyday memories.'),
          P('按钮：Start Writing / Meet Mimo　｜　功能标签：Write · Reflect · Collect · Grow'),
          H2('18.3 角色信息卡文案'),
          P('标题：Character Card'),
          P('Name: Mimo　｜　Role: Memory Companion / 灵感记录员'),
          P('Personality: Curious, gentle, slightly weird, always listening.'),
          P('Accessories: Memory notebook, spark badge, tiny satchel, pencil ear.'),
          H2('18.4 功能卡片文案'),
          P('卡片一：Record Ideas / 记录灵感 — Catch tiny thoughts before they disappear.'),
          P('卡片二：Reflect Memories / 回望记忆 — Look back gently and find patterns in your days.'),
          P('卡片三：Collect Moments / 收藏瞬间 — Keep soft moments, moods, and little sparks together.'),
          H2('18.5 底部文案'),
          P('One page a day.　Small steps write great stories.　Memories are inked softly in our hearts.')]

# ================= 19-22 =================
story += [PageBreak(), H1('19. 高保真视觉描述'), P('最终画面应表现为：'),
          P('一个温暖米色纸张质感（Warm Canvas #F6EFE5）的品牌官网 UI 页面。顶部是轻盈导航栏，左侧手写感 '
            'Ink & Memory Logo，右侧是清晰的导航项和 Action Brown 胶囊 CTA 按钮。'),
          P('页面中部左侧是巨大手写风标题 “Ink & Memory”，标题下有 Memory Yellow 手绘下划线。下方是英文副标题 '
            '“Write today. Remember forever.” 和中文文案“把灵感写下来，让记忆留下来。”再往下是两个 CTA 按钮和四个功能标签。'),
          P('页面右侧是原创毛绒潮玩角色 Mimo。它有暖纸米色毛绒身体、圆角方形大头、炭棕椭圆刺绣眼睛、小微笑、浅腮红、'
            '炭棕绒毛发簇、笔形耳朵、折纸耳朵、Memory Yellow 记忆徽章、Spark Green 灵感星星、小记忆本和炭棕斜挎包。'
            '角色坐在温暖书桌或纸张舞台上，手里拿着小本子或钢笔，像一个安静陪伴用户写作的小精灵。'),
          P('角色附近有一张轻纸面角色信息条目（虚线纸边界、无悬浮阴影），介绍 Mimo 的名字、角色定位、性格和配件。'
            '页面下方有三个轻纸面功能条目，分别展示记录灵感、回望记忆、收藏瞬间，仅靠留白、细分隔线与单一虚线纸边界分区，'
            '静止无阴影，仅 hover 出现轻阴影。每条都配有小图标或同一角色的小动作变体。'),
          P('底部是一条温暖写作工作台氛围区，有打开的手账本、墨水瓶、钢笔、便签纸、拍立得照片和木桌边缘，'
            '整体干净、柔和、安静，像一个能让人安心写作的记忆空间。'),
          H1('20. 视觉质量标准'), P('最终设计稿必须满足：')]
story += LI(['完整 UI 页面，不是单个角色图', '具备真实官网结构',
             '导航、按钮、卡片、Hero、角色、底部氛围区清晰', '角色造型前后一致',
             '毛绒材质明显', 'C4D 渲染质量高级', '光影柔和精致',
             '分区轻纸面化：无多层卡片堆叠，页面级只保留一条虚线纸边界，留白充足',
             '颜色统一（全部命中 v2.0 色板，无孤立色值）', '文案尽量清晰可读',
             '适合品牌提案和作品集展示', '原创度高，不像已有 IP',
             '页面整体温暖、治愈、安静、有记忆感'])
story += [H1('21. 负向约束'), P('禁止出现：')]
story += LI(['复制参考图角色', '复制任何现有 IP', '明显像迪士尼、三丽鸥、泡泡玛特等已有角色',
             '低清晰度', '文字乱码', 'UI 元素扭曲', '杂乱背景', '过度霓虹', '赛博朋克风',
             '恐怖风', '廉价塑料感', '过度儿童化', '角色与 UI 风格割裂',
             '只生成海报，不生成 UI 页面', '只生成单个角色，不生成完整页面',
             '使用 v1.0 旧色值（#F5E9D6 / #111111 / #FFD42A / #39D353 / #8A6A45 / #C9B69A）'])
story += [H1('22. 图像生成用整合提示词'),
          P('请生成一张完整的高保真 UI 设计稿：', 'body'),
          P('主题为「Ink & Memory」原创潮玩 IP 品牌官网首页 / 品牌提案页。画面为 1600×1200 px，4:3 横向构图，'
            '暖米色纸张背景（Warm Canvas #F6EFE5），整体风格温暖、治愈、安静、高级商业视觉。'),
          P('页面顶部是导航栏，左侧为手写感 Ink & Memory Logo，中间有 Home、Characters、Memory Club、Stories、Shop '
            '导航项，右侧有 Action Brown #5F4A36 胶囊按钮 Start Writing。'),
          P('Hero 区域左侧为大标题 Ink & Memory，使用粗黑手写字体（Charcoal Brown #3F3429），标题下有 Memory Yellow '
            '#F39C12 手绘下划线。副标题为 Write today. Remember forever. 中文辅助文案为“把灵感写下来，让记忆留下来。”'
            '下方有两个按钮 Start Writing 和 Meet Mimo，并有四个功能标签 Write、Reflect、Collect、Grow，'
            '配手绘图标、星星、墨滴、小笔记本和涂鸦线条。'),
          P('Hero 右侧展示原创毛绒潮玩角色 Mimo，角色是 Ink & Memory 的记忆小搭子 / 灵感记录员。角色为 C4D 三维毛绒手办质感，'
            '暖纸米色短绒身体，圆角方形大头，大头短身约 2.5 头身，炭棕椭圆刺绣眼睛，小微笑，浅腮红，炭棕绒毛发簇。'
            '角色带有笔形耳朵、折叠纸张耳朵、Memory Yellow 记忆徽章、Spark Green #27AE60 灵感星星、小记忆本和炭棕斜挎包。'
            '角色坐在温暖书桌或纸张舞台上，手持钢笔或小本子，姿态安静、亲近、略带怪趣。'),
          P('角色附近有一张轻纸面角色信息条目（圆角、虚线纸边界、无悬浮阴影），内容包括 Character Name: Mimo，'
            'Role: Memory Companion / 灵感记录员，Personality: curious, gentle, slightly weird, always listening，'
            'Accessories: memory notebook, spark badge, tiny satchel, pencil ear。'),
          P('Hero 下方有三个轻纸面功能条目：Record Ideas / 记录灵感，Reflect Memories / 回望记忆，Collect Moments / 收藏瞬间。'
            '每条配有小图标或同一角色的小动作变体；分区只靠留白、行分隔线与一条页面级虚线纸边界，静止无阴影，'
            '排版清晰，像真实产品功能模块。'),
          P('页面底部是温暖写作工作台氛围区，有打开的手账本、墨水瓶、钢笔、便签纸、拍立得照片、木桌边缘、小夹子和暖光灯影。'
            '底部出现短标语 One page a day. Small steps write great stories. Memories are inked softly in our hearts.'),
          P('整体采用 Warm Canvas #F6EFE5、Paper Cream #FFFAF2、Charcoal Brown #3F3429、Action Brown #5F4A36、'
            'Memory Yellow #F39C12、Spark Green #27AE60、Warm Brown #7A6A59、Border Paper #D8C7B3。画面干净，留白充分，'
            'UI 层级清晰，商业提案感强，文字尽量清晰可读。不要复制任何现有 IP，不要低清晰度，不要乱码文字，不要赛博朋克，'
            '不要复杂脏乱背景，不要只生成单个角色，不要只生成海报。最终效果应是一张完整、精致、可上线感强的 '
            'Ink & Memory 潮玩 IP 品牌 UI 设计稿。')]

# ================= build =================
def footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFont('CJK', 8.5)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(w/2, 1.1*cm,
        f'Ink & Memory UI Design v2.1 · 色彩系统对齐 tokens.css · 轻纸面分区 · 第 {doc.page} 页')
    canvas.restoreState()

out = 'assets/Ink & Memory UI Design.pdf'
doc = SimpleDocTemplate(out, pagesize=A4, topMargin=2.2*cm, bottomMargin=2*cm,
                        leftMargin=2.4*cm, rightMargin=2.4*cm,
                        title='Ink & Memory UI Design v2.1',
                        author='Ink & Memory')
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print('written', out)
