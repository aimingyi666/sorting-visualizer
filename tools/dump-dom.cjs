/**
 * DOM 结构诊断：dump 渲染后的 DOM 树，找出重复的 id 与可见区块
 *
 * 复用 smoke-test 的加载方式：dist → esbuild 转 IIFE → jsdom 执行
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
  const args = [mainPath, '--bundle', '--format=iife', '--platform=browser', `--outfile=${out}`, '--log-level=error'];
  execFileSync('npx', ['esbuild', ...args], { stdio: 'pipe', shell: true, cwd: projectRoot });
  return out;
}

const SKIP = new Set(['SCRIPT', 'STYLE', 'LINK', 'META', 'svg', 'path', 'i', 'CANVAS']);

function isHidden(el) {
  const cls = el.getAttribute && el.getAttribute('class');
  return cls ? /(^|\s)hidden(\s|$)/.test(cls) : false;
}

function walk(el, depth, out, maxDepth) {
  if (!el || !el.tagName) return;
  if (SKIP.has(el.tagName)) return;
  const id = el.id ? `#${el.id}` : '';
  const cls = (el.getAttribute('class') || '')
    .split(/\s+/)
    .filter((c) => c && (c.startsWith('md:') || c.includes('col-span') || c === 'hidden'))
    .slice(0, 3)
    .join('.');
  const mark = isHidden(el) ? ' [hidden]' : '';
  const kids = el.children.length;
  const txt = kids === 0 ? (el.textContent || '').trim().slice(0, 24) : '';
  out.push(`${'  '.repeat(depth)}${el.tagName.toLowerCase()}${id}${cls ? '.' + cls : ''}${mark}${txt ? ` "${txt}"` : ''}`);
  if (depth >= maxDepth) {
    if (kids) out.push(`${'  '.repeat(depth + 1)}... (${kids} children)`);
    return;
  }
  for (const c of el.children) walk(c, depth + 1, out, maxDepth);
}

(async () => {
  const main = findMain();
  const iife = toIIFE(main);
  const bundle = fs.readFileSync(iife, 'utf8');
  const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  const errors = [];
  const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true, url: 'http://127.0.0.1/' });
  const { window } = dom;
  const { document } = window;

  // 浏览器 API / CDN 库 stub（与 smoke-test 保持一致）
  window.hljs = { highlightAll() {} };
  window.Chart = class {
    constructor() {
      this.data = { labels: [], datasets: [{ data: [] }, { data: [] }, { data: [] }, { data: [] }] };
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

  window.addEventListener('error', (e) => errors.push(String(e.error || e.message)));

  try {
    window.eval(bundle);
  } catch (e) {
    errors.push('eval: ' + e.message);
  }

  await new Promise((r) => setTimeout(r, 1200));

  const app = document.getElementById('app');
  if (!app) {
    console.log('未找到 #app');
    process.exit(1);
  }

  console.log('='.repeat(70));
  console.log('DOM 结构（深度 4）');
  console.log('='.repeat(70));
  const lines = [];
  for (const c of app.children) walk(c, 0, lines, 4);
  console.log(lines.join('\n'));

  // 统计所有 id
  const all = [...document.querySelectorAll('[id]')];
  const map = new Map();
  for (const el of all) {
    if (!map.has(el.id)) map.set(el.id, []);
    map.get(el.id).push(el);
  }
  const dups = [...map.entries()].filter(([, v]) => v.length > 1);

  console.log();
  console.log('='.repeat(70));
  console.log(`id 总数 ${all.length}，唯一 ${map.size}，重复 ${dups.length} 组`);
  console.log('='.repeat(70));
  for (const [id, els] of dups.sort((a, b) => b[1].length - a[1].length)) {
    const vis = els.filter((e) => !isHidden(e)).length;
    console.log(`  ${id.padEnd(34)} x${els.length}  可见 ${vis}`);
  }

  // 顶层区块概览
  console.log();
  console.log('='.repeat(70));
  console.log('顶层区块');
  console.log('='.repeat(70));
  for (const c of app.children) {
    console.log(`  ${c.tagName.toLowerCase()}${c.id ? '#' + c.id : ''}${isHidden(c) ? ' [hidden]' : ''}`);
  }

  if (errors.length) {
    console.log('\n运行时错误:', errors);
  }
})();
