/**
 * main.js —— 应用入口
 *
 * 职责：
 *   1. 等待 DOM 就绪
 *   2. 实例化核心编排器（它会自动创建各 UI 子组件）
 *   3. 触发代码高亮
 *
 * 原压缩代码中这部分位于包尾：
 *   document.addEventListener("DOMContentLoaded", () => { new E, setTimeout(() => hljs.highlightAll(), 100) })
 */
import { SortingVisualizerApp } from './core/visualizer-app.js';

function bootstrap() {
  const app = new SortingVisualizerApp();

  // 代码高亮（highlight.js 从 CDN 加载，可能在 window 上）
  if (typeof window !== 'undefined' && window.hljs) {
    setTimeout(() => window.hljs.highlightAll(), 100);
  }

  // 供调试面板访问
  window.sortingVisualizerApp = app;
  return app;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

export { bootstrap };
