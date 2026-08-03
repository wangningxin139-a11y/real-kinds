# 真实几种 · Design System

> 真实感的 N 次建构
>
> Scrollable Presentation · 2026

---

## 目录

1. [设计原则](#1-设计原则)
2. [Design Token](#2-design-token)
3. [Typography](#3-typography)
4. [Color](#4-color)
5. [Grid](#5-grid)
6. [Motion Guideline](#6-motion-guideline)
7. [Component Library](#7-component-library)
8. [Section Patterns](#8-section-patterns)

---

## 1. 设计原则

### 1.1 核心信条

| # | 原则 | 说明 |
|---|------|------|
| 1 | **One Thought Per Screen** | 每个 viewport 只传递一个核心信息。内容密度不高，但精度高。 |
| 2 | **Pacing as Narrative** | 留白不是空缺，是节奏。段落之间的空隙决定呼吸感，而非内容本身。 |
| 3 | **Typography is Voice** | 在演讲网站中，文字就是视觉主体。排版是唯一的"演员"。 |
| 4 | **Cinematic Reveal** | 每一屏是一次"镜头切换"。动画服务于叙事结构，而非装饰。 |
| 5 | **No Chrome** | 无导航栏、无侧边栏、无永久性 UI 家具。所有界面元素仅在需要时出现。 |

### 1.2 气质定位

```
Minimal · Editorial · Premium · Documentary

极简 —— 信息密度克制，只用必要的元素
编辑 —— 排版驱动，图文关系如杂志版面
高级 —— 像素级精度，拒绝粗糙与妥协
纪录 —— 真实、冷静、非推销式的叙述语气
```

### 1.3 设计红线

- ❌ 禁止使用科技蓝 (#007AFF 系)
- ❌ 禁止赛博朋克风格
- ❌ 禁止玻璃拟态（frosted glass）
- ❌ 禁止霓虹与发光效果
- ❌ 禁止渐变背景
- ❌ 禁止复杂或纹理背景
- ❌ 禁止使用 Emoji 作为视觉元素
- ❌ 禁止圆角大于 16px（除非特殊媒体容器）
- ✅ 只允许一种强调色：`#4EA1FF`

---

## 2. Design Token

### 2.1 Spacing 体系

推荐使用 `4px` 为基准单位的 4-point grid。

| Token | px | rem | 使用场景 |
|-------|----|-----|----------|
| `space-1` | 4px | 0.25rem | 微距调整 |
| `space-2` | 8px | 0.5rem | 内边距、紧凑间距 |
| `space-3` | 12px | 0.75rem | 文本与元素间距 |
| `space-4` | 16px | 1rem | 基础间距单位 |
| `space-5` | 20px | 1.25rem | 段落间距 |
| `space-6` | 24px | 1.5rem | 组件内间距 |
| `space-7` | 32px | 2rem | 组件间间距 |
| `space-8` | 40px | 2.5rem | 内容区域间距 |
| `space-9` | 48px | 3rem | 章节内区块间距 |
| `space-10` | 64px | 4rem | 章节分隔 |
| `space-11` | 80px | 5rem | 大章节分隔 |
| `space-12` | 96px | 6rem | 屏间留白 |
| `space-13` | 120px | 7.5rem | 超大留白（用于视觉呼吸） |

### 2.2 Opacity

| Token | Value | 使用场景 |
|-------|-------|----------|
| `opacity-0` | 0 | 隐藏 |
| `opacity-subtle` | 0.08 | 分割线、轻装饰 |
| `opacity-faint` | 0.12 | 占位符状态 |
| `opacity-disabled` | 0.28 | 禁用状态 |
| `opacity-muted` | 0.44 | 次要文字（对应 #8A8A8A 于 #111111 背景） |
| `opacity-medium` | 0.64 | 次级信息 |
| `opacity-strong` | 0.80 | hover 增强 |
| `opacity-1` | 1 | 主内容 |

### 2.3 Radius

所有圆角使用同一体系中值，避免混合风格。

| Token | Value | 使用场景 |
|-------|-------|----------|
| `radius-sm` | 4px | 小元素、代码块 |
| `radius-md` | 8px | 按钮、卡片、输入框 |
| `radius-lg` | 12px | 媒体容器 |
| `radius-xl` | 16px | 大媒体容器（上限） |

### 2.4 Z-Index

| Token | Value | 使用场景 |
|-------|-------|----------|
| `z-base` | 1 | 主内容 |
| `z-sticky` | 10 | 粘性元素 |
| `z-overlay` | 100 | 遮罩层 |
| `z-modal` | 200 | 模态弹窗 |
| `z-toast` | 300 | 通知提示 |

### 2.5 Breakpoints

Presentation 不同于传统响应式网站 — 我们只针对典型 Presentation 场景做适配。

| Token | Width | 目标设备 |
|-------|-------|----------|
| `bp-mobile` | < 768px | 手机浏览/分享 |
| `bp-tablet` | 768px – 1023px | iPad 演示 |
| `bp-desktop` | 1024px – 1511px | 笔记本/外接显示器 |
| `bp-wide` | 1512px – 1919px | 27" 显示器 |
| `bp-cinema` | ≥ 1920px | 大屏投影/电视 |

> **核心原则**：设计从 `bp-desktop` 向下兼容。Presentation 的主要舞台是桌面端。

---

## 3. Typography

### 3.1 Font Stack

```css
/* 中文 */
--font-cn: 'HarmonyOS Sans SC', 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif;

/* 英文 */
--font-en: 'SF Pro Display', 'SF Pro Text', -apple-system, 'Helvetica Neue', sans-serif;

/* 数字（推荐使用 SF Mono 以对齐 Apple 风格） */
--font-num: 'SF Mono', 'SF Pro Display', monospace;

/* 代码（极少出现，仅用于必要的引用） */
--font-code: 'SF Mono', 'JetBrains Mono', 'Fira Code', monospace;
```

### 3.2 Type Scale

字体层级基于 `1.25` (Major Third) 比例，但针对 Presentation 场景做了视觉放大。

| Token | Size | Line Height | Weight | 使用场景 |
|-------|------|-------------|--------|----------|
| `text-caption` | 0.75rem / 12px | 1.4 | 400 | 脚注、来源标注 |
| `text-footnote` | 0.875rem / 14px | 1.5 | 400 | 辅助说明、标注 |
| `text-body` | 1rem / 16px | 1.6 | 400 | 正文（桌面端） |
| `text-body-large` | 1.125rem / 18px | 1.7 | 400 | 大正文、段落描述 |
| `text-lead` | 1.25rem / 20px | 1.6 | 400 → 500 | 引文、前导段落 |
| `text-h5` | 1.5rem / 24px | 1.4 | 500 | 小标题 |
| `text-h4` | 1.75rem / 28px | 1.3 | 500 | 段落标题 |
| `text-h3` | 2rem / 32px | 1.25 | 600 | 区块标题 |
| `text-h2` | 2.5rem / 40px | 1.15 | 600 | 章节大标题 |
| `text-h1` | 3.5rem / 56px | 1.1 | 600 → 700 | Hero 标题 |
| `text-display` | 5rem / 80px | 1.05 | 700 | 大屏展示文案 |
| `text-mega` | 6.25rem / 100px | 1 | 700 | 数字、强调大字号 |

> 注意：以上为基础参考值。Presentation 中标题的实际字号应根据屏高动态响应，可使用 `clamp()` 实现流体排版。

### 3.3 推荐的流体排版

```css
/* Hero 标题：在手机端缩小，宽屏放大 */
--fs-hero: clamp(2.25rem, 5vw + 1rem, 5rem);

/* 章节标题 */
--fs-section: clamp(1.75rem, 3vw + 0.5rem, 3.5rem);

/* 正文：保持基线稳定 */
--fs-body: clamp(0.9375rem, 1vw + 0.5rem, 1.125rem);
```

### 3.4 Letter Spacing

| Token | Value | 使用场景 |
|-------|-------|----------|
| `tracking-tight` | -0.02em | 大标题（H1、Display 级） |
| `tracking-normal` | 0 | 正文 |
| `tracking-wide` | 0.02em | 小字号 UI 文字 |
| `tracking-wider` | 0.05em | 标签、标注、导航文字 |
| `tracking-caps` | 0.08em | 全大写英文副标题 |

### 3.5 排版层级示例

```
层级 0： Display / Mega          —— 极少使用，仅用于关键数字或核心命题
层级 1： H1 / Hero               —— 章节开篇标题，每屏最多一个
层级 2： H2 / 引文                —— 区块标题或贯穿性引文
层级 3： H3 + Body               —— 论点标题 + 支撑说明
层级 4： Lead + Body             —— 前导段落 + 正文
层级 5： Body + Caption          —— 正文 + 出处/注解
```

**规则：同一屏内最多使用 2 个层级。** 层级过多 = 视觉噪音 = 违反 One Thought Per Screen。

### 3.6 英文与中文混排

```css
/* 推荐做法：用 CSS 选择器分离中西文排版 */
--mixed-letter-spacing: 0.02em;      /* 中西文之间增加微量间距可提升可读性 */
--mixed-word-gap: 0.25em;            /* 词间距补偿 */
```

使用 `word-spacing` 或 `:lang()` 选择性应用。避免在中文段落中插入英文时产生粘连感。

---

## 4. Color

### 4.1 Base Palette

全站仅 4 种颜色，外加一组纯功能性状态色。

| Token | Hex | Role |
|-------|-----|------|
| `color-bg` | `#111111` | 背景色（主舞台） |
| `color-bg-elevated` | `#1A1A1A` | 悬浮背景（次级区块） |
| `color-bg-overlay` | `#0D0D0D` | 遮罩/模态背景 |
| `color-text` | `#F5F5F5` | 正文、主标题 |
| `color-text-secondary` | `#8A8A8A` | 辅助文字、标注、元信息 |
| `color-text-tertiary` | `#5A5A5A` | 占位符、禁用态 |
| `color-accent` | `#4EA1FF` | **唯一强调色** |
| `color-border` | `#222222` | 分割线、边框（极淡） |
| `color-border-strong` | `#333333` | 更明显的边框（极少使用） |

### 4.2 Accent 色彩表现

`#4EA1FF` 作为全站唯一强调色，使用准则：

| 使用场景 | 方式 | 示例 |
|----------|------|------|
| 超链接 | 文字色 + `#4EA1FF`，不加下划线 | `color: #4EA1FF` |
| 专注标注 | 用于标记核心词、关键词 | 单个词着色 |
| 进度指示 | 滚动进度条、当前章节指示器 | 填充色 |
| 引用装饰 | 引号/引用块左侧装饰线 | 带 `opacity-strong` 的 2px 边线 |
| 交互反馈 | hover / focus 状态 | 悬停/聚焦色 |
| 数字/统计 | 高亮关键数据 | `color: #4EA1FF` |

> **禁令**：强调色不得用于背景填充、渐变、按钮大面积覆盖、霓虹发光。

### 4.3 功能性色

仅在需要时使用，且尽量低调。

| Token | Hex | Role |
|-------|-----|------|
| `color-success` | `#34C759` | 成功/完成（极低频使用） |
| `color-warning` | `#FFD60A` | 注意（极低频使用） |
| `color-error` | `#FF453A` | 错误（极低频使用） |

> 这三个颜色在主要叙事中不出现。仅在附录、互动组件或必要反馈中启用。

### 4.4 对比度保证

| 组合 | Ratio | 合规 |
|------|-------|------|
| #F5F5F5 on #111111 | 16.6 : 1 | ✅ AAA |
| #8A8A8A on #111111 | 5.2 : 1 | ✅ AA |
| #4EA1FF on #111111 | 5.9 : 1 | ✅ AA |

### 4.5 Dark Mode

**不支持 Light Mode。**

此 Presentation 为全黑背景设计。黑色背景是舞台，内容在舞台上浮现。

---

## 5. Grid

### 5.1 哲学

Presentation 的网格不同于 Dashboard 或文档网站。网格的核心职责是：

1. 提供**可预期**的水平对齐
2. 创造**有节奏**的留白
3. 在宽屏与窄屏之间维持**视觉连续**

### 5.2 桌面端网格 (bp-desktop & above)

```
┌──────────────────────────────────────────────────────────────┐
│  ┌──┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──┐  │  ← 内容区域
│  │  │  ①   │  ②   │  ③   │  ④   │  ⑤   │  ⑥   │  ⑦   │  │  │  1440px max
│  │  │      │      │      │      │      │      │      │  │  │
│  │  └──────┴──────┴──────┴──────┴──────┴──────┴──────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

   ↑                             ↑
 24px                         24px
gutter                       margin
```

| Property | Value |
|----------|-------|
| Column count | 7 |
| Column width | 1fr（等宽） |
| Gutter | 24px |
| Content max-width | 1440px |
| Side margin | 24px（桌面）→ 48px（宽屏） |
| Baseline | 4px |

### 5.3 内容宽度策略

Presentation 内容不应填满整屏宽度。采用"三层宽度"法则：

| 层级 | 宽度 | 使用场景 |
|------|------|----------|
| `width-narrow` | max-width: 640px | 正文段落、引文、注解 |
| `width-medium` | max-width: 960px | 正文 + 辅助媒体、图文混排 |
| `width-wide` | max-width: 1440px | 全出血媒体、大图、对比展示 |
| `width-full` | 100vw | 电影感的铺满画面（极少使用） |

> **原则**：绝大多数文字内容使用 `width-narrow`。媒体使用 `width-medium` 或 `width-wide`。

### 5.4 纵向节奏

Presentation 是纵向驱动的。每个 Section 的纵向空间规划比横向更重要。

```css
--section-min-height: 100vh;       /* 每屏至少占满一屏 */
--section-padding-y: 120px;        /* 上下内边距 */
--section-padding-y-mobile: 64px;  /* 手机端缩小 */
```

### 5.5 手机端适配

```
┌────────────────┐
│ ┌──┬──┬──┬──┐ │  ← 6列网格
│ │① │② │③ │④ │ │
│ │  │  │  │  │ │
│ └──┴──┴──┴──┘ │
└────────────────┘

Gutter: 12px
Side margin: 20px
Columns: 4
```

---

## 6. Motion Guideline

### 6.1 核心理念：One Section One Animation

> 每一屏（Section）只执行一个动画意图。
>
> 滚动是一个"拉幕"动作 — 拉开幕布，舞台上的一切已经就位，只有一个元素在运动中。

这与传统网页动画的本质区别：

| | 传统网页 | 本系统 |
|---|---|---|
| 动画密度 | 每页多元素依次入场 | 每屏只有一个动画主角 |
| 触发方式 | 滚动即播 | 到达视口正中触发 |
| 维持时间 | 一次性播完即止 | 部分动画在停留期间持续（如视差） |
| 交互反馈 | 点击/悬停 | 滚动带来的自然渐变 |

### 6.2 Easing Curves

```css
/* 核心缓动 - 受 Apple 启发，强调物理感 */

--ease-out-heavy: cubic-bezier(0.22, 1, 0.36, 1);     /* 出场：物体离开 */
--ease-in-heavy: cubic-bezier(0.55, 0, 0.8, 0.25);    /* 入场：物体进入 */
--ease-out-smooth: cubic-bezier(0.16, 1, 0.3, 1);     /* Apple 经典缓出 - 最常用 */
--ease-in-out-smooth: cubic-bezier(0.65, 0, 0.35, 1); /* 对称缓动 */
--ease-linear: cubic-bezier(0, 0, 1, 1);              /* 视差/滚动跟随 */
--ease-spring: spring(180, 24, 10);                    /* 微弹性（Web 可用 spring() 或模拟） */
```

> **基调**：大多数动画使用 `ease-out-smooth`。进入场景的物体应该是"优雅地停止"，而不是"急刹车"。

### 6.3 动画时序

| Token | Duration | 使用场景 |
|-------|----------|----------|
| `dur-instant` | 0ms | 状态切换、无动画 |
| `dur-fast` | 200ms | hover、微交互 |
| `dur-normal` | 600ms | 标准入场动画（文字） |
| `dur-slow` | 900ms | 媒体入场、大元素 |
| `dur-narrative` | 1200ms | 叙事性动画（引文浮现） |
| `dur-cinematic` | 1800ms+ | 全屏过渡、电影感揭示 |

### 6.4 动画类型目录

Presentation 中仅使用以下 5 种动画原语：

#### ① Fade In / Out
```
出场方式: opacity 0 → 1
缓动: ease-out-smooth
时长: 600ms–900ms
偏移: 可选 + translateY(20px→0)
用途: 文字段落、标注、脚注
特征: 最基础、最克制、最常用
```

#### ② Slide Up / Down
```
出场方式: translateY(40px→0) + opacity
缓动: ease-out-smooth
时长: 800ms–1200ms
用途: 区块整体入场、图片/媒体容器
特征: 模拟"升起"的物理感
```

#### ③ Scale In
```
出场方式: scale(0.95→1) + opacity
缓动: ease-out-smooth
时长: 600ms–900ms
用途: 数字、统计、强调元素
特征: 轻微放大入场，不做弹跳
```

#### ④ Reveal（裁剪揭示）
```
出场方式: clip-path / mask 从右到左揭示
缓动: ease-out-smooth
时长: 900ms–1500ms
用途: 引文浮现、标题逐字出现
特征: 编辑感，似杂志页面揭开
```

#### ⑤ Parallax（视差漂移）
```
出场方式: 随滚动偏移 (translateY 速度差)
缓动: ease-linear（与滚动同步）
时长: 绑定滚动进度
用途: 大背景图、浅层装饰
特征: 仅用于"第二层"元素，不干扰主叙事
```

### 6.5 滚动驱动设计

```typescript
interface ScrollAnimation {
  trigger: 'top-enters' | 'center-enters' | 'center-leaves' | 'bottom-leaves';
  duration: string;          // CSS animation-duration
  delay: string;             // CSS animation-delay
  easing: string;            // cubic-bezier 或 spring
  progress: 'auto' | 'timeline';  // auto=播完即停, timeline=绑定滚动进度
}
```

**推荐：使用 `scroll-timeline` API 或 Intersection Observer + requestAnimationFrame。**

### 6.6 禁止的动画

- ❌ 旋转动画
- ❌ 弹性弹跳（超过 1 次的 overshoot）
- ❌ 闪烁/脉冲
- ❌ 渐变背景移动
- ❌ 粒子效果
- ❌ 悬浮 3D / Tilt 效果
- ❌ 鼠标跟随
- ❌ Loading spinner

---

## 7. Component Library

### 7.1 Navigation

#### 7.1.1 顶部指示器
```
┌─────────────────────────────────────┐
│  ← 真实几种          进度 03 / 12 → │
└─────────────────────────────────────┘
```

- 透明背景（仅文字）
- 全屏宽，上下 padding 24px
- 左侧：返回/首页链接（仅在非首页时出现）
- 右侧：当前进度 "03 / 12"
- 滚动至第二节后出现，首屏隐藏
- 文字字号：`text-caption`，颜色：`color-text-secondary`
- 进入方式：fade in，触发于首屏离开后
- 过渡：opacity 渐变，不做滑动

#### 7.1.2 底部分段进度条
```
┌─────────────────────────────────────┐
│  ┃━━━━━┃━━━━━┃━━━━━┃━━━━━┃━━━━   │  ← 12 等分
│     真实感 · 建构 · 媒介 · 身体    │  ← 章节名（可选）
└─────────────────────────────────────┘
```

- 绝对定位底部
- 细线，1px 高
- 已读段落：`color-accent`
- 未读段落：`color-border`
- 当前段落：渐变过渡
- 可选：下方微小文字显示当前章节名称
- 进入方式：首屏离开后出现，初始 opacity 0 → 1

### 7.2 Section Container

每个 Section 是一屏的内容容器。

```tsx
<Section
  id="section-01"
  bg="default"           // 'default' | 'elevated' | 'media'
  align="center"         // 'center' | 'left' | 'right'
  width="narrow"         // 'narrow' | 'medium' | 'wide' | 'full'
  animation="fade"       // 'fade' | 'slideUp' | 'scaleIn' | 'reveal' | 'none'
  fullHeight={true}      // true = min-height: 100vh
/>
```

**行为规范：**
- `min-height: 100vh`（除非 `fullHeight={false}` 用于过渡节）
- 内容垂直居中（`display: flex; align-items: center`）
- 每个 Section 只包含 **一个** 动画触发器
- Section 之间由 `space-12` 或 `space-13` 分隔
- Section 之间的过渡区域不显示内容，只有留白

### 7.3 文字组件

#### 7.3.1 Heading
```html
<h1 class="heading heading--hero">真实几种</h1>
<h2 class="heading heading--section">真实感的 N 次建构</h2>
<h3 class="heading heading--block">媒介即讯息</h3>
```

- 无下划线、无装饰
- 使用 `--font-cn` 或 `--font-en`
- 颜色：`color-text`
- 间距：`letter-spacing` 根据大小调节

#### 7.3.2 Paragraph
```html
<p class="paragraph paragraph--body">
  正文内容...
</p>
<p class="paragraph paragraph--lead">
  引文/前导段落——用于引出核心观点。
</p>
```

- 最大宽度：`640px`
- 左对齐（全屏居中时采用 `text-align: left; max-width: 640px; margin: 0 auto`）
- 颜色：`color-text`
- 行高：根据大小设定（见 Typography）
- 段间距：`space-6`

#### 7.3.3 Annotated Text
```html
<figure class="annotation">
  <blockquote class="annotation__quote">
    "引文内容"
  </blockquote>
  <figcaption class="annotation__source">
    —— 出处 · 年份
  </figcaption>
</figure>
```

- Quote：`text-lead` 或 `text-h3`，斜体（英文）或正常（中文）
- Source：`text-caption`，`color-text-secondary`
- 左侧可加 2px `color-accent` 装饰线

### 7.4 Media 组件

#### 7.4.1 Image
```html
<figure class="media media--image">
  <div class="media__container">
    <img src="..." alt="..." loading="lazy" />
  </div>
  <figcaption class="media__caption">图片说明</figcaption>
</figure>
```

- `media__container`：使用 `radius-md`（8px）
- 图片内容保持比例（object-fit: cover）
- Caption：`text-caption`，`color-text-secondary`
- 可选模式：`full-bleed`（无圆角，撑满 `width-wide` 区域）

#### 7.4.2 Video / Motion
```html
<figure class="media media--video">
  <video autoplay muted loop playsinline poster="...">
    <source src="..." type="video/mp4" />
  </video>
</figure>
```

- 默认 autoplay + muted + loop（Apple 式）
- 不显示播放控件
- 进入视口时播放，离开时暂停（通过 Intersection Observer）
- 无边框、无阴影

#### 7.4.3 Portrait（人物肖像）
```html
<figure class="portrait">
  <div class="portrait__image">
    <img src="..." alt="人物名称" />
  </div>
  <figcaption class="portrait__info">
    <span class="portrait__name">人物名</span>
    <span class="portrait__role">身份/头衔</span>
  </figcaption>
</figure>
```

- Portait 图片为黑白（desaturate）或高对比度处理
- 圆形裁剪（`border-radius: 50%`）
- 尺寸：`80px`（小）| `120px`（中）| `160px`（大）

### 7.5 数字/统计组件

```html
<div class="stat">
  <span class="stat__number">84%</span>
  <span class="stat__label">受访者认为真实感在消逝</span>
</div>
```

- `stat__number`：`text-mega` 或 `text-display` 级别的巨大数字，颜色 `color-accent` 或 `color-text`
- `stat__label`：`text-body` 或 `text-caption`，`color-text-secondary`
- 动画类型：`scaleIn`

### 7.6 引文块

```html
<blockquote class="pullquote">
  <p class="pullquote__text">
    我们不是在观看真实，而是在建构真实。
  </p>
  <cite class="pullquote__cite">—— 某学者</cite>
</blockquote>
```

- `pullquote__text`：`text-h3` 或 `text-h2`，正常字重（中文不用斜体）
- 引号不做装饰（不用大字号引号字符）
- 可选：左侧 2px `color-accent` 竖线
- 动画类型：`reveal`（裁剪揭示）最适配此组件

### 7.7 分割/过渡 Section

```html
<section class="transition">
  <hr class="transition__line" />
  <span class="transition__label">第二章</span>
</section>
```

- 极简：一条细线 + 章节编号名称
- 用于章节切换
- 细线：`color-border`，1px
- Label：`text-caption`，`color-text-secondary`
- `min-height`：`60vh`（留白为主）

### 7.8 交互组件（极有限）

#### 7.8.1 Accordion（用于附录/引用来源）
```html
<details class="accordion">
  <summary class="accordion__trigger">查看引用来源</summary>
  <div class="accordion__content">
    ...
  </div>
</details>
```

- 仅用于附录、扩展阅读、引用来源
- 不在主要叙事中出现
- 样式：`color-text-secondary` 触发器，hover 变为 `color-accent`

#### 7.8.2 Copy Link
```html
<button class="copy-link" data-section="section-04">
  复制本节链接
</button>
```

- 仅在 Footer 附近出现
- 使用 `text-footnote` 字号
- `color-text-secondary` → hover 变为 `color-accent`

### 7.9 Footer

```html
<footer class="footer">
  <div class="footer__inner">
    <p class="footer__credit">© 2026 · 真实几种</p>
    <p class="footer__info">设计 & 开发</p>
  </div>
</footer>
```

- 极简，仅版权与致谢
- 不放置大 Logo、不放置社交链接、不放置表单
- `min-height: 50vh`
- 所有文字：`text-caption`，`color-text-secondary`

### 7.10 全局组件清单汇总

| 组件 | 动画类型 | 优先级 | 备注 |
|------|----------|--------|------|
| NavIndicator | fade | P0 | 顶部进度指示 |
| ProgressBar | fade | P0 | 底部进度条 |
| Section | 多样化 | P0 | 核心容器 |
| Heading | fade/reveal | P0 | 标题 |
| Paragraph | fade | P0 | 正文 |
| LeadParagraph | fade | P0 | 前导段落 |
| PullQuote | reveal | P0 | 引文 |
| Annotation | fade | P1 | 带出处的引用 |
| Stat | scaleIn | P1 | 数字强调 |
| Image | slideUp | P1 | 图片媒体 |
| Video | slideUp | P1 | 视频媒体 |
| Portrait | fade | P2 | 人物形象 |
| Transition | none/fade | P0 | 章节过渡 |
| Accordion | — | P3 | 附录交互 |
| CopyLink | — | P3 | 分享 |
| Footer | fade | P0 | 版权 |

---

## 8. Section Patterns

### 8.1 标准叙事流

Presentation 的 Section 按以下"节奏建议"编排，但不强制限制。

```
Section 1   [Hero]       —— 标题 + 副标题 + 滚动提示    (动画: fade)
Section 2   [过渡]       —— 章节过渡 / 分割线            (动画: none)
Section 3   [论点]       —— 核心命题引出                (动画: reveal)
Section 4   [论据]       —— 数据/案例/引文              (动画: scaleIn/slideUp)
Section 5   [过渡]       —— 章节过渡                    (动画: none)
Section 6   [论点]       —— 下一命题                    (动画: reveal)
Section 7   [论据]       —— 数据/案例/引文              (动画: scaleIn/slideUp)
...
Section N   [尾声]       —— 总结、致谢                  (动画: fade)
```

### 8.2 推荐的内容密度

| 元素 | 每节上限 |
|------|----------|
| 标题 | 1 |
| 段落 | 1–2 |
| 引文 | 1 |
| 图片 | 0–1 |
| 视频 | 0–1 |
| 统计数字 | 0–1 |

**多于以上数量 = 拆成多节。**

### 8.3 全屏内容布局模板

```
         ┌──────────────────────────────────────┐
         │                    ↑                  │
         │              space-10                │
         │                    ↓                  │
         │                                      │
         │           ┌──────────┐                │
         │           │  Heading  │  <- text-h1/h2│
         │           └──────────┘                │
         │                                      │
         │           ┌────────────────┐          │
         │           │  Body / Lead   │          │
         │           │  (max 640px)   │          │
         │           └────────────────┘          │
         │                    ↑                  │
         │              space-8                 │
         │                    ↓                  │
         │           ┌──────────────────┐        │
         │           │  Media / Stat    │        │
         │           └──────────────────┘        │
         │                                      │
         │                    ↑                  │
         │              space-10                │
         │                    ↓                  │
         └──────────────────────────────────────┘
         ←────────── content width ──────────→
         ←── margin ─→            ←── margin ─→
```

---

## 附录

### A. 文件命名规范

```
components/
  Section.tsx
  Heading.tsx
  Paragraph.tsx
  PullQuote.tsx
  Stat.tsx
  MediaImage.tsx
  MediaVideo.tsx
  Portrait.tsx
  NavIndicator.tsx
  ProgressBar.tsx
  Footer.tsx
  Transition.tsx

tokens/
  colors.css
  typography.css
  spacing.css
  motion.css
  grid.css

sections/
  HeroSection.tsx
  ArgumentSection.tsx
  EvidenceSection.tsx
  QuoteSection.tsx
  TransitionSection.tsx
  ClosingSection.tsx
```

### B. 技术栈建议

| 层 | 推荐 |
|---|------|
| Framework | Next.js (App Router) or Astro |
| Animation | GSAP ScrollTrigger 或 Framer Motion + useScroll |
| CSS | Tailwind CSS (定制 token) 或 Vanilla Extract / CSS Modules |
| Font | 自托管 HarmonyOS Sans SC + SF Pro Display (或 system font fallback) |
| Deployment | Vercel |

### C. 参考灵感

- [Apple Vision Pro](https://www.apple.com/apple-vision-pro/)
- [Apple Intelligence](https://www.apple.com/apple-intelligence/)
- [Linear](https://linear.app/)
- [Nothing](https://nothing.tech/)
- [Vercel](https://vercel.com/)

---

> **Design System v1.0**
>
> 本系统的终极目标：让观众忘记在看一个"网站"，而只是沉浸在一场关于"真实"的叙事中。
>
> 好的设计系统，是让人感受不到它存在的那种。
