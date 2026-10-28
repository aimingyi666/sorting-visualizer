/**
 * 算法注册表 —— 把算法标识映射到实现函数
 *
 * 键为 UI/URL 使用的算法标识，值为 algorithms/index.js 中的实现函数。
 * 原压缩代码中此处为 const v = { bubbleSort: p, ... }，已还原语义名。
 */
import {
  bubbleSort, selectionSort, insertionSort, quickSort, mergeSort,
  shellSort, heapSort, countingSort, radixSort,
} from '../algorithms/index.js';

export const algorithmMap = {
          bubbleSort: bubbleSort,
          selectionSort: selectionSort,
          insertionSort: insertionSort,
          quickSort: quickSort,
          mergeSort: mergeSort,
          shellSort: shellSort,
          heapSort: heapSort,
          countingSort: countingSort,
          radixSort: radixSort
};
