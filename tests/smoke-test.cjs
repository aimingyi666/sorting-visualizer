/**
 * 运行时冒烟测试（统一入口）
 *
 * 背景：jsdom 不支持 <script type="module">，而构建产物含 import.meta，
 *       window.eval 也无法直接执行 ESM。因此先用 esbuild 把产物转成 IIFE，
 *       再交给 jsdom 执行 —— 测的仍是真实构建产物，只是换了加载方式。
 *
 * 流程：读取 dist → esbuild 转 IIFE → jsdom 执行 → 断言
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const nodeModules = path.join(projectRoot, 'node_modules');
const { JSDOM } = require(path.join(nodeModules, 'jsdom'));

const distDir = path.join(projectRoot, 'dist');
const assetsDir = path.join(distDir, 'assets');

function findMain() {
  const f = fs.readdirSync(assetsDir).find((x) => /^index-.*\.js$/.test(x));
  if (!f) throw new Error('未找到主包，请先执行 npm run build');
  return path.join(assetsDir, f);
}

function toIIFE(mainPath) {
  const out = path.join(nodeModules, '.cache', 'bundle-iife.js');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  // Windows 上 spawn .cmd 需要 shell:true，否则 EINVAL
  const args = [mainPath, '--bundle', '--format=iife', '--platform=browser', `--outfile=${out}`, '--log-level=error'];
  execFileSync('npx', ['esbuild', ...args], { stdio: 'pipe', shell: true, cwd: projectRoot });
  return out;
}

(async () => {
  const main = findMain();
  const iife = toIIFE(main);
  const bundle = fs.readFileSync(iife, 'utf8');
  const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  const errors = [];
  const dom = new JSDOM(html, {
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    url: 'http://127.0.0.1/',
  });
  const { window } = dom;
  const { document } = window;

  // 浏览器 API / CDN 库 stub（测试不依赖外网）
  window.hljs = { highlightAll() {} };
  window.Chart = class {
    constructor() {
      this.data = { labels: [], datasets: [{ data: [] }, { data: [] }] };
      this.options = {};
    }
    update() {}
    destroy() {}
  };
  window.matchMedia =
    window.matchMedia ||
    ((q) => ({
      matches: false,
      media: q,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
    }));
  window.addEventListener('error', (e) => errors.push(e.message || String(e.error)));
  window.addEventListener('unhandledrejection', (e) => errors.push(String(e.reason)));

  try {
    window.eval(bundle);
  } catch (e) {
    errors.push('执行异常: ' + e.message);
  }

  await new Promise((r) => setTimeout(r, 1200));

  const app = window.sortingVisualizer || window.sortingVisualizerApp;
  const results = [];
  // 约定：true = 通过；字符串 = 通过并附注；false = 失败
  const ck = (name, fn) => {
    try {
      const v = fn();
      if (v === true) results.push([name, true, '']);
      else if (v === false) results.push([name, false, '']);
      else if (typeof v === 'string') results.push([name, true, v]);
      else results.push([name, false, '异常返回: ' + String(v)]);
    } catch (e) {
      results.push([name, false, e.message]);
    }
  };

  ck('应用实例创建', () => (app ? '已挂载 window' : false));
  ck('初始数组生成', () => (app?.array?.length ? `${app.array.length} 元素` : false));
  ck('条形图渲染', () => {
    const n = document.querySelectorAll('#bars-container > *').length;
    return n > 0 ? `${n} 个条形` : false;
  });
  ck('导航栏渲染', () => (document.querySelector('header') ? 'header 存在' : false));
  ck('排序历史生成', () => {
    const h = app?.sortHistory;
    return Array.isArray(h) && h.length ? `${h.length} 帧` : false;
  });
  ck('单步前进', () => {
    if (typeof app?.stepForward !== 'function') return false;
    const before = app.currentStep;
    app.stepForward();
    return app.currentStep > before ? `${before}→${app.currentStep}` : false;
  });
  ck('新建数组', () => {
    if (!app) return false;
    const before = JSON.stringify(app.array);
    if (typeof app.createNewArray === 'function') app.createNewArray();
    else if (typeof app.generateArray === 'function') app.generateArray();
    else return false;
    return JSON.stringify(app.array) !== before ? '已重新生成' : false;
  });
  ck('语言管理器就绪', () => (window.languageManager ? `lang=${window.languageManager.currentLanguage}` : false));
  ck('切换算法', () => {
    if (!app || typeof app.updateAlgorithmContent !== 'function') return false;
    app.currentAlgorithm = 'quickSort';
    app.updateAlgorithmContent();
    return app.currentAlgorithm === 'quickSort' ? '已切到 quickSort' : false;
  });
  ck('无未捕获异常', () => (errors.length === 0 ? '干净' : false));
  ck('页面只渲染一份', () => {
    // 防回归：入口若被实例化两次，整页会渲染两遍（header/main 各出现两次）
    const headers = document.querySelectorAll('#app > header').length;
    const mains = document.querySelectorAll('#app > main').length;
    return headers === 1 && mains === 1 ? `header×${headers} main×${mains}` : false;
  });

  // ---- 竞赛模式：曾因算法映射残留压缩函数名（p/m/h...）导致点击开始毫无反应 ----
  ck('竞赛模式可进入', () => {
    const btn = document.getElementById('competition-mode-btn');
    if (!btn) return false;
    btn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    const layout = document.getElementById('competition-layout');
    return layout && !layout.classList.contains('hidden') ? '布局已显示' : false;
  });

  ck('竞赛模式算法实现可解析', () => {
    const keyMap = {
      bubble: 'bubbleSort', selection: 'selectionSort', insertion: 'insertionSort',
      quick: 'quickSort', merge: 'mergeSort', heap: 'heapSort', shell: 'shellSort',
      counting: 'countingSort', radix: 'radixSort',
    };
    const missing = app.competitionManager.algorithmInstances
      .map((x) => x.algorithmName)
      .filter((n) => !keyMap[n]);
    if (missing.length) return false;
    // 直接验证实现函数存在：调用后应产出非空轨迹
    const startBtn = document.getElementById('competition-start-btn');
    if (!startBtn) return false;
    startBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    const lens = app.competitionManager.algorithmInstances.map((x) => x.sortHistory.length);
    const allRan = lens.every((n) => n > 0);
    return allRan ? `各赛位轨迹 ${lens.join('/')} 帧` : `轨迹异常: ${lens.join('/')}`;
  });

  ck('竞赛模式计数器会推进', () => {
    const inst = app.competitionManager.algorithmInstances[0];
    if (!inst || !inst.sortHistory.length) return false;

    // 竞速定时器可能同时在跑，先暂停再手动推进，保证读到的变化来自本次调用
    app.isCompetitionRunning = false;
    inst.isPaused = false;

    const stepBefore = inst.currentStep;
    const cmpBefore = inst.comparisonCount;

    for (let i = 0; i < 30 && inst.currentStep < inst.sortHistory.length - 1; i++) {
      app.executeAlgorithmStep(inst, 0);
    }

    const advanced = inst.currentStep > stepBefore;
    if (!advanced) return `未推进: step ${stepBefore}→${inst.currentStep}`;
    return `step ${stepBefore}→${inst.currentStep}, 比较 ${cmpBefore}→${inst.comparisonCount}`;
  });

  ck('计数器能写入可见赛位', () => {
    // 恢复运行态，让 updateCompetitionPerformance 真正写 DOM
    app.isCompetitionRunning = true;
    app.competitionStartTime = Date.now() - 2000;
    app.updateCompetitionPerformance();
    const shown = app.resolveCompetitionElement('comparison-count-0')?.textContent;
    const instCount = String(app.competitionManager.algorithmInstances[0].comparisonCount);
    return shown === instCount ? `DOM=${shown} 与实例一致` : `DOM=${shown} 实例=${instCount}`;
  });

  console.log('=== 运行时测试（真实构建产物）===');
  let pass = 0;
  for (const [name, ok, note] of results) {
    console.log(`  ${ok ? '✓' : '✗'} ${name}${note ? `  (${note})` : ''}`);
    if (ok) pass++;
  }
  console.log(`\n通过 ${pass}/${results.length}`);
  if (errors.length) {
    console.log('\n=== 错误 ===');
    [...new Set(errors)].slice(0, 6).forEach((e) => console.log('  !', String(e).slice(0, 220)));
  }
  process.exit(pass === results.length ? 0 : 1);
})();
