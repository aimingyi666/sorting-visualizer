# 排序算法可视化

> 一个用于教学与算法理解的交互式排序可视化工具，支持 9 种经典排序算法的 2D/3D 实时演示、逐步执行、复杂度分析与中英双语界面。

<p align="left">
  <a href="https://github.com/aimingyi666/sorting-visualizer/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/aimingyi666/sorting-visualizer/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://github.com/aimingyi666/sorting-visualizer/actions/workflows/deploy-pages.yml">
    <img alt="Deploy" src="https://github.com/aimingyi666/sorting-visualizer/actions/workflows/deploy-pages.yml/badge.svg">
  </a>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white">
  <img alt="Node" src="https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js&logoColor=white">
  <img alt="Three.js" src="https://img.shields.io/badge/Three.js-0.137-000000?logo=three.js&logoColor=white">
  <img alt="Chart.js" src="https://img.shields.io/badge/Chart.js-4.x-FF6384?logo=chart.js&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg">
</p>

<p align="left">
  <a href="https://aimingyi666.github.io/sorting-visualizer/">
    <img alt="在线演示" src="https://img.shields.io/badge/在线演示-立即体验-165DFF?style=for-the-badge">
  </a>
</p>

> **[▶ 在线演示](https://aimingyi666.github.io/sorting-visualizer/)** —— 无需安装，打开即用。

---

## 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [支持的算法](#支持的算法)
- [快速开始](#快速开始)
- [目录结构](#目录结构)
- [核心概念](#核心概念)
- [开发指南](#开发指南)
- [测试](#测试)
- [技术实现](#技术实现)
- [浏览器兼容性](#浏览器兼容性)
- [项目沿革](#项目沿革)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

---

## 项目简介

排序算法是计算机科学的基础，但「比较 → 交换 → 有序」这一过程在纸面上往往难以直观理解。本项目把每种算法的每一次比较、每一次交换都记录下来并逐帧回放，让学习者可以**看清算法在每一步到底做了什么**。

除了动画本身，每帧数据还携带指针位置、基准点、已就位下标等信息，配合同步的步骤解说与代码高亮，形成「看到现象 → 理解原理 → 对照代码」的完整学习闭环。

**适合场景**

- 数据结构与算法课程的教学演示
- 自学时对照代码理解执行流程
- 面试前复习各算法的行为差异与复杂度
- 需要讲解同一问题不同解法的优劣对比

---

## 功能特性

### 可视化

- **2D 柱状图**：经典的条形高度映射，颜色区分「待排序 / 比较中 / 已就位 / 基准点」
- **3D 场景**：基于 Three.js 渲染，可通过 OrbitControls 自由旋转缩放，观察空间结构（OrbitControls 缺失时自动降级为静态 3D，不影响渲染）
- **实时指标图表**：基于 Chart.js 绘制比较次数与交换次数随时间的变化曲线

### 交互控制

- **单算法模式**：选定一种算法，独立观察其完整执行过程
- **竞赛模式**：两种算法同屏并行执行，直观对比效率差异
- **参数调节**：数组规模、动画速度、动画强度均可实时调整
- **自定义数组**：手动输入任意数据，观察算法在特定输入下的表现

### 逐步执行

- **播放 / 暂停 / 重置**：完整控制执行节奏
- **单步前进 / 后退**：逐帧检视，适合精讲
- **实时解说**：每一步都有对应的文字说明（如「比较 arr[3] 与 arr[4]，3 < 7，无需交换」）
- **算法日志**：滚动记录所有已执行步骤

### 学习辅助

- **算法原理**：每种算法的核心思想与执行流程说明
- **复杂度分析**：最好 / 平均 / 最坏时间复杂度、空间复杂度、稳定性
- **适用场景**：说明该算法适合什么样的数据与业务场景
- **多语言代码**：同一算法提供 C / Python / Go / Java 四种实现，带语法高亮
- **算法对比表**：横向比较全部 9 种算法的各维度指标

### 其他

- **中英双语**：全站文案支持切换，选择记忆在 localStorage
- **明暗主题**：跟随系统偏好，也可手动切换
- **导出功能**：可将当前算法的步骤记录导出为 HTML / Markdown 文档
- **分享链接**：把当前算法与数组编码进 URL，便于传播

---

## 支持的算法

| 算法 | 最好 | 平均 | 最坏 | 空间 | 稳定性 | 特点 |
|---|---|---|---|---|---|---|
| 冒泡排序 Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | 稳定 | 相邻交换，实现最简单 |
| 选择排序 Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | 不稳定 | 每轮选出最小值，交换次数少 |
| 插入排序 Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | 稳定 | 小规模或近有序数据表现优秀 |
| 希尔排序 Shell Sort | O(n log n) | O(n^1.3) | O(n²) | O(1) | 不稳定 | 插入排序的增量改进版 |
| 归并排序 Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | 稳定 | 分治思想，稳定且性能确定 |
| 快速排序 Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | 不稳定 | 实际应用最广，常数因子小 |
| 堆排序 Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | 不稳定 | 原地排序且最坏情况有保证 |
| 计数排序 Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | 稳定 | 非比较排序，适合整数与小范围 |
| 基数排序 Radix Sort | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | 稳定 | 按位分配收集，适合长整数 |

> 时间复杂度中的 `n` 为元素个数，`k` 为数据范围，`d` 为最大位数。

---

## 快速开始

### 环境要求

- Node.js **>= 18**
- npm 或 pnpm（示例使用 npm）

### 安装与运行

```bash
# 1. 克隆仓库
git clone https://github.com/aimingyi666/sorting-visualizer.git
cd sorting-visualizer

# 2. 安装依赖
npm install        # 开发时使用
# npm ci           # 需要严格按 lockfile 复现依赖时使用（CI 即采用此方式）

# 3. 启动开发服务器（默认 http://127.0.0.1:3000）
npm run dev
```

### 生产构建

```bash
npm run build      # 产物输出到 dist/
npm run preview    # 本地预览生产构建
```

构建产物使用相对路径（`base: './'`），可直接部署到任意静态托管服务（GitHub Pages、Vercel、Netlify、Nginx 子目录等），无需限制在站点根目录。

### 部署到 GitHub Pages

仓库已内置 GitHub Actions 自动部署，无需手动推送 `gh-pages` 分支。

**一次性配置**：在仓库 **Settings → Pages → Build and deployment** 中，将 **Source** 设为 **GitHub Actions**。

**之后**：推送到 `main` 即自动触发 `.github/workflows/deploy-pages.yml`，流水线为

```
npm ci → 算法回归测试 → vite build → 运行时冒烟测试 → 上传产物 → 部署 Pages
```

部署完成后站点地址为 <https://aimingyi666.github.io/sorting-visualizer/>。如需手动触发，可在 Actions 页面选择 **Deploy to GitHub Pages** → **Run workflow**。

**部署到其他静态托管**（Vercel / Netlify / Nginx 子目录等）时，只需：

```bash
npm run build
# 上传 dist/ 目录内容即可，产物使用相对路径，不要求站根目录
```

---

## 目录结构

```
sorting-visualizer/
├── index.html                    # 页面骨架（含内联样式与 CDN 资源引入）
├── vite.config.js                # 构建配置（已开启 sourcemap）
├── package.json
├── src/
│   ├── main.js                   # 应用入口，等待 DOM 就绪后启动
│   │
│   ├── algorithms/
│   │   └── index.js              # 9 种排序算法的轨迹生成器
│   │
│   ├── core/
│   │   ├── visualizer-app.js     # 核心编排器（80 个方法，应用中枢）
│   │   ├── algorithm-mode.js     # 单算法 / 竞赛 双模式管理
│   │   ├── history-cache.js      # 排序轨迹缓存（按算法+数组内容去重）
│   │   ├── i18n.js               # 国际化（中/英），含完整词表
│   │   └── performance-timer.js  # 执行计时器
│   │
│   ├── components/
│   │   ├── navbar.js             # 顶部导航 / 主题切换 / 语言切换
│   │   ├── control-panel.js      # 控制面板（滑块与按钮绑定）
│   │   ├── explanation-section.js# 算法原理 / 复杂度 / 场景 / 对比表
│   │   ├── code-section.js       # 多语言代码展示（C/Python/Go/Java）
│   │   ├── document-exporter.js  # 导出 HTML / Markdown 文档
│   │   └── footer.js             # 页脚
│   │
│   ├── data/
│   │   ├── algorithm-map.js      # 算法标识 → 实现函数映射
│   │   └── algorithm-meta.js     # 算法元数据（说明/复杂度/场景/步骤文案）
│   │
│   ├── utils/
│   │   └── define-field.js       # 实例字段定义辅助
│   │
│   └── visualization-3d.js       # 3D 可视化模块（按需动态加载）
│
├── tests/
│   ├── test-algorithms.mjs       # 算法正确性回归测试
│   └── smoke-test.cjs            # 运行时冒烟测试
│
└── dist/                         # 构建产物（不纳入版本库）
```

### 模块职责速览

| 模块 | 行数 | 职责 |
|---|---:|---|
| `core/visualizer-app.js` | 1681 | 应用中枢，协调所有子模块与外设交互 |
| `algorithms/index.js` | 1187 | 9 种算法的轨迹生成逻辑 |
| `components/explanation-section.js` | 255 | 算法说明相关区块 |
| `core/i18n.js` | 246 | 中英词表与 DOM 文本替换 |
| `data/algorithm-meta.js` | 204 | 算法元数据（说明、复杂度、场景、步骤文案） |
| `core/algorithm-mode.js` | 113 | 单算法 / 竞赛模式切换 |
| `components/document-exporter.js` | 110 | 文档导出 |

---

## 核心概念

### 算法接口约定

所有算法遵循统一签名，这也让「竞赛模式」可以直接并排驱动任意两种算法：

```js
fn(inputArray) => {
  array,            // 排序完成后的数组
  history,          // 逐帧快照数组，用于可视化回放
  comparisonCount,  // 总比较次数
  swapCount,        // 总交换 / 移动次数
}
```

**示例**

```js
import { quickSort } from './src/algorithms/index.js';

const result = quickSort([5, 2, 8, 1]);

console.log(result.array);           // [1, 2, 5, 8]
console.log(result.comparisonCount); // 比较次数
console.log(result.history.length);  // 可回放的帧数
```

### 历史帧结构

`history` 中每一帧都是对某一时刻的完整快照，渲染层只需读取当前帧即可重绘：

```js
{
  array: [3, 1, 2],          // 该时刻数组状态
  comparisonCount: 5,        // 累计比较次数
  swapCount: 2,              // 累计交换次数
  highlightIndices: [1, 2],  // 需要高亮的下标（比较/交换中）
  pivotIndex: -1,            // 基准点下标，无则为 -1
  sortedIndices: [0],        // 已确认就位的下标
  algorithm: 'quick',        // 算法标识
  indices: {                 // 各指针当前位置，用于绘制指示箭头
    i: 1,
    j: 2,
    low: 0,
    high: 3,
  },
}
```

**为什么记录全量快照而非增量？**
回放需要支持任意方向跳转（单步后退），全量快照让渲染层无需反向推导状态，逻辑更简单、更不易出错。代价是内存占用随帧数线性增长，因此 `history-cache.js` 按「算法名 + 数组内容」做了去重缓存，避免同一数组重复计算。

### 命名约定

源码中的局部变量已从压缩代码还原为语义名，便于阅读：

| 变量名 | 含义 |
|---|---|
| `inputArray` | 输入数组（函数不修改原数组） |
| `workingArray` | 排序过程实际操作的工作副本 |
| `history` | 逐帧轨迹累积器 |
| `comparisonCount` | 比较次数 |
| `swapCount` | 交换 / 移动次数 |
| `sortedIndices` | 已确认就位的下标集合 |
| `allIndices` | 全部下标 |
| `scanIndex` | 当前扫描下标 |
| `pivotIndex` | 基准 / 分界点 |

---

## 开发指南

### 新增一种排序算法

以添加「鸡尾酒排序（Cocktail Shaker Sort）」为例：

**1. 在 `src/algorithms/index.js` 中实现**

```js
export function cocktailSort(inputArray) {
  const history = [];
  const workingArray = [...inputArray];
  let comparisonCount = 0;
  let swapCount = 0;

  let low = 0;
  let high = workingArray.length - 1;

  while (low < high) {
    for (let i = low; i < high; i++) {
      comparisonCount++;
      if (workingArray[i] > workingArray[i + 1]) {
        [workingArray[i], workingArray[i + 1]] = [workingArray[i + 1], workingArray[i]];
        swapCount++;
        history.push({
          array: [...workingArray],
          comparisonCount,
          swapCount,
          highlightIndices: [i, i + 1],
          pivotIndex: -1,
          sortedIndices: [],
          algorithm: 'cocktail',
          indices: { i, j: i + 1, low, high },
        });
      }
    }
    high--;

    for (let i = high; i > low; i--) {
      comparisonCount++;
      if (workingArray[i] < workingArray[i - 1]) {
        [workingArray[i], workingArray[i - 1]] = [workingArray[i - 1], workingArray[i]];
        swapCount++;
        history.push({
          array: [...workingArray],
          comparisonCount,
          swapCount,
          highlightIndices: [i, i - 1],
          pivotIndex: -1,
          sortedIndices: [],
          algorithm: 'cocktail',
          indices: { i, j: i - 1, low, high },
        });
      }
    }
    low++;
  }

  return { array: workingArray, history, comparisonCount, swapCount };
}
```

**2. 注册到 `src/data/algorithm-map.js`**

```js
import { /* ... */ cocktailSort } from '../algorithms/index.js';

export const algorithmMap = {
  /* ... */
  cocktailSort,
};
```

**3. 补充元数据到 `src/data/algorithm-meta.js`**

```js
export const algorithmMeta = {
  /* ... */
  cocktailSort: {
    name: '鸡尾酒排序',
    description: '双向冒泡排序，先从左到右再从右到左……',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stability: '稳定',
    scenarios: '适用于大部分元素已基本有序的场景……',
    stepExplanations: {
      initial: '初始状态：数组尚未开始排序。',
      compare: '比较相邻元素，顺序错误则交换。',
      complete: '鸡尾酒排序完成，所有元素已升序排列。',
    },
  },
};
```

**4. 若需出现在 UI 下拉框**，在 `index.html` 与 `src/core/i18n.js` 中补充对应项。

**5. 跑测试确认**

```bash
npm run test:algorithms
```

测试会读取 `src/algorithms/index.js` 的全部导出并自动校验，无需修改测试文件。

### 修改视觉表现

| 想改什么 | 去哪里 |
|---|---|
| 条形颜色 | `visualizer-app.js` 中的 `setBarColor` / 颜色常量 |
| 动画时长与缓动 | `visualizer-app.js` 的 `animationDuration`，及 CSS 过渡 |
| 3D 场景（相机、光照、材质） | `src/visualization-3d.js` |
| 页面整体配色与字体 | `index.html` 中的 Tailwind 配置与内联样式 |

### 性能图表

性能曲线由 Chart.js 绘制，配置位于 `visualizer-app.js` 的 `initPerformanceChart` 与 `initCompetitionPerformanceChart`。若数据量很大需要降采样，可在此处加入抽稀逻辑。

---

## 测试

```bash
npm test                    # 全部测试
npm run test:algorithms     # 算法正确性（72 个用例）
npm run test:runtime        # 运行时冒烟（10 项检查）
```

### 算法测试覆盖

对 9 种算法 × 8 组输入 = **72 个用例**，逐项校验：

- 排序结果是否与 `Array.prototype.sort` 一致
- `history` 是否非空
- `comparisonCount` / `swapCount` 是否为合法数值
- 每一帧的结构完整性（`array` / `highlightIndices` / `sortedIndices` / `indices`）

测试输入包含边界值：

```js
[5, 2, 8, 1, 9, 3]           // 随机
[1]                          // 单元素
[2, 1]                       // 两元素逆序
[3, 3, 1, 2]                 // 含重复值
[9, 8, 7, 6, 5, 4, 3, 2, 1]  // 完全逆序
[1, 2, 3, 4, 5]              // 已有序
[7, 7, 7, 7]                 // 全相同
[0, 100, 5, 0]               // 含零与大跨度
```

### 运行时测试

用 jsdom 加载真实构建产物，验证应用能完整初始化：

- 应用实例成功创建并挂载
- 初始数组生成、条形图渲染
- 排序历史生成、单步前进可用
- 新建数组、切换算法、语言切换
- 无未捕获异常

> **实现说明**：jsdom 不支持 `<script type="module">`，而构建产物含有 `import.meta`（3D 模块动态加载需要），因此测试会先用 esbuild 把产物转为 IIFE 再交给 jsdom 执行。这样测的仍是真实的构建结果，只是换了加载方式。

### 持续集成

`.github/workflows/ci.yml` 在每次推送到 `main` 或提交 PR 时运行，矩阵覆盖 Node.js **18 / 20 / 22**：

| 步骤 | 说明 |
|---|---|
| 安装依赖 | `npm ci`，严格按 lockfile 安装 |
| 算法回归测试 | 9 种算法 × 8 组输入 = 72 个用例 |
| 构建 | `vite build` |
| 运行时冒烟测试 | 对真实构建产物执行 10 项检查 |

构建失败时，workflow 会自动执行诊断步骤，把 `node_modules/@rollup`、`node_modules/@esbuild` 的平台二进制清单，以及 `vite build --debug` 的完整输出写入 Job Summary，便于快速区分「代码问题」与「环境 / 依赖问题」。

---

## 技术实现

### 技术选型

| 层面 | 选型 | 说明 |
|---|---|---|
| 构建工具 | Vite 5 | 冷启动快，开发体验好，构建产物精简 |
| 语言 | 原生 ES Modules | 无框架依赖，聚焦算法本身 |
| 2D 渲染 | DOM + CSS | 便于用 CSS 过渡实现流畅动画 |
| 3D 渲染 | Three.js 0.137（CDN） | 成熟的 WebGL 封装。选用 0.137 是因为 three 自 r148 起移除了 `examples/js`（UMD 版），更高版本的 OrbitControls 在 CDN 上为 404 |
| 图表 | Chart.js | 轻量、API 简洁 |
| 代码高亮 | highlight.js | 支持 C / Python / Go / Java |
| 样式 | Tailwind CSS（CDN） | 原子化，便于快速调整 |

### 为什么不用前端框架

本项目的复杂度集中在「算法轨迹生成」与「帧渲染」两条主线，状态结构清晰、交互路径固定。引入 React / Vue 会带来组件生命周期与状态同步的额外心智负担，而收益有限。原生 ES Modules + 明确的模块划分，更贴近教学项目「可读性优先」的目标。

### 渲染循环

```
用户操作（播放 / 单步）
      ↓
从 history 取出目标帧
      ↓
更新 comparisonCount / swapCount 等指标
      ↓
renderArray(frame) 重绘条形与指针
      ↓
更新步骤解说与算法日志
```

动画播放本质是一个定时器驱动的帧迭代，`setTimeout` 间隔由「动画速度」参数换算得出。单步模式则直接增减 `currentStep` 索引，不依赖定时器。

### 已知限制

1. **CDN 依赖**：Tailwind、Three.js、Chart.js、highlight.js 与字体均从外部 CDN 加载。若网络受限，可能出现样式缺失或加载缓慢。离线部署时建议将这些资源本地化。
2. **性能图表的采样**：数据量极大时图表点数过多，目前未做降采样，可能影响渲染帧率。
3. **3D 模式的元素规模**：条形数量较多时 3D 场景的绘制开销上升，建议在 2D 模式下观察大数组。

---

## 浏览器兼容性

| 浏览器 | 版本要求 |
|---|---|
| Chrome / Edge | 最新两个版本 |
| Firefox | 最新两个版本 |
| Safari | 16+ |

需要浏览器支持 ES2020、CSS 自定义属性与 WebGL 2.0。

---

## 项目沿革

本项目有一段比较特殊的历史，值得记录：

### 1.0 —— 初版

最初的完整源码在提交到 GitHub 时未被正确纳入版本控制。`.gitignore` 与实际提交内容恰好相反：本该忽略的 `dist/`、`node_modules/` 被提交了，而 `src/`、`index.html`、`package.json` 全部缺失。仓库里只剩下构建产物，`npm run dev` 无法运行。

### 1.0-recovered —— 从构建产物恢复

由于源码已无处可寻（无 git 历史、无本地备份），从 `dist/assets/index-*.js` 进行了反压缩（de-minify）恢复：

- 单行 386 KB 的压缩代码 → 还原为 4015 行可读代码
- 依据代码内的 `algorithmMap` 反向还原 9 个算法函数名
- 按职责拆分为 17 个模块
- 应用 AST 作用域分析还原变量名，算法部分 557 处、DOM 部分 87 处
- 全程以「逐帧轨迹完全等价」作为验收标准（72/72 用例字节级一致）

### 1.1 —— 当前版本（本仓库）

在恢复的基础上完成了工程化整备：

- 补齐 `.gitignore`，只提交源码，排除 `dist/`、`node_modules/`
- 开启 `sourcemap`，避免再次因源码丢失而被迫逆向
- 补齐测试（算法回归 + 运行时冒烟）并接入 `npm test`
- 完善 README、目录结构与模块文档
- 修复 `index.html` 中资源绝对路径问题，使构建产物可部署到任意子目录
- 接入 GitHub Actions：CI 三版本矩阵（Node.js 18 / 20 / 22）+ 自动部署 GitHub Pages
- 重建 `package-lock.json`：修正平台包元数据（`libc` 字段误写为 `gnu`，导致 npm 判定 Linux 二进制不兼容而静默跳过安装），并将下载源统一指向官方 registry，解决 CI 在 `vite build` 阶段报 `Cannot find module @rollup/rollup-linux-x64-gnu` 的问题

> **给未来的自己**：这次恢复之所以可行，完全依赖构建产物中保留了可读的函数名与字段名。如果当初开启 sourcemap，可以直接 1:1 还原，不必花数小时逆向。**请始终保留 sourcemap。**

---

## 贡献指南

欢迎提交 Issue 与 Pull Request。

### 提交流程

```bash
# 1. Fork 并克隆
git clone https://github.com/<your-name>/sorting-visualizer.git

# 2. 创建特性分支
git checkout -b feature/my-feature

# 3. 开发并自测
npm run dev
npm test

# 4. 提交（建议遵循 Conventional Commits）
git commit -m "feat: 新增鸡尾酒排序算法"

# 5. 推送并发起 PR
git push origin feature/my-feature
```

### 代码规范

- 使用 2 空格缩进
- 变量与函数命名采用语义化命名，避免单字母（循环下标 `i` / `j` 除外）
- 新增算法必须实现统一接口，并补充 `algorithmMeta` 元数据
- 提交前确保 `npm test` 全部通过
- 涉及算法改动的，需在 PR 描述中说明验证方式

### Commit 类型

| 类型 | 含义 |
|---|---|
| `feat` | 新功能 |
| `fix` | 缺陷修复 |
| `docs` | 文档更新 |
| `refactor` | 重构（不改变行为） |
| `test` | 测试相关 |
| `chore` | 构建 / 工具链 |
| `perf` | 性能优化 |

---

## 许可证

本项目基于 [MIT License](LICENSE) 开源。

```
MIT License

Copyright (c) 2026 aimingyi666

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 致谢

- 算法实现参考《算法导论》与经典教材的伪代码
- 3D 渲染基于 [Three.js](https://threejs.org/)
- 图表基于 [Chart.js](https://www.chartjs.org/)
- 代码高亮基于 [highlight.js](https://highlightjs.org/)
- 构建工具 [Vite](https://vitejs.dev/)

---

<p align="center">
  如果这个项目对你有帮助，欢迎点个 ⭐
</p>
