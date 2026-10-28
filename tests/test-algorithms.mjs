/**
 * 算法回归测试 —— 直接从 src/algorithms/index.js 导入，验证 9 个算法
 *
 * 覆盖：排序正确性、history 帧完整性、计数器、边界输入
 */
import * as algo from '../src/algorithms/index.js';

const NAMES = [
  'bubbleSort', 'selectionSort', 'insertionSort', 'quickSort', 'mergeSort',
  'shellSort', 'heapSort', 'countingSort', 'radixSort',
];

/** 测试输入（含边界与重复值） */
const INPUTS = [
  [5, 2, 8, 1, 9, 3],
  [1],
  [2, 1],
  [3, 3, 1, 2],
  [9, 8, 7, 6, 5, 4, 3, 2, 1],
  [1, 2, 3, 4, 5],
  [7, 7, 7, 7],
  [0, 100, 5, 0],
];

let pass = 0;
const fails = [];

for (const name of NAMES) {
  const fn = algo[name];
  if (typeof fn !== 'function') {
    fails.push(`${name}: 未导出或不是函数`);
    continue;
  }
  for (const input of INPUTS) {
    try {
      const r = fn([...input]);
      const expected = [...input].sort((a, b) => a - b);

      if (JSON.stringify(r.array) !== JSON.stringify(expected)) {
        fails.push(`${name} 排序错误: ${JSON.stringify(input)} -> ${JSON.stringify(r.array)}`);
        continue;
      }
      if (!Array.isArray(r.history) || r.history.length === 0) {
        fails.push(`${name} history 为空`);
        continue;
      }
      if (typeof r.comparisonCount !== 'number' || typeof r.swapCount !== 'number') {
        fails.push(`${name} 计数器缺失`);
        continue;
      }
      // 每一帧结构完整性
      const bad = r.history.find(
        (f) =>
          !Array.isArray(f.array) ||
          typeof f.comparisonCount !== 'number' ||
          typeof f.swapCount !== 'number' ||
          !Array.isArray(f.highlightIndices) ||
          !Array.isArray(f.sortedIndices) ||
          !f.indices
      );
      if (bad) {
        fails.push(`${name} 帧结构不完整`);
        continue;
      }
      pass++;
    } catch (e) {
      fails.push(`${name} 抛出异常: ${e.message}`);
    }
  }
}

const total = NAMES.length * INPUTS.length;
console.log(`算法回归: ${pass}/${total} 通过${fails.length ? `，${fails.length} 失败` : ''}`);
fails.slice(0, 8).forEach((f) => console.log('  ✗', f));
process.exit(fails.length === 0 ? 0 : 1);
