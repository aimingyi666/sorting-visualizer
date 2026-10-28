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
