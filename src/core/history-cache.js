/**
 * SortHistoryCache —— 排序过程历史缓存
 *
 * 以「算法名 + 数组内容」为键缓存完整排序轨迹，
 * 避免同一数组重复计算，回放时直接命中缓存。
 * 原压缩代码中为匿名类实例 w。
 */
import { algorithmMap } from '../data/algorithm-map.js';

export class SortHistoryCache {
          constructor() {
            this.sortHistory = {}, this.currentArray = [], this.currentAlgorithm = "bubbleSort"
          }
          generateHistory(arr, algorithmName) {
            const cacheKey = this.generateKey(arr, algorithmName);
            if (this.sortHistory[cacheKey]) return this.sortHistory[cacheKey];
            const impl = algorithmMap[algorithmName];
            if (!impl) throw new Error(`排序算法 ${algorithmName} 未实现`);
            const result = impl(arr);
            return this.sortHistory[cacheKey] = result, result
          }
          generateKey(arr, algorithmName) {
            return `${algorithmName}-${JSON.stringify(arr)}`
          }
          getHistory(arr, algorithmName) {
            const cacheKey = this.generateKey(arr, algorithmName);
            return this.sortHistory[cacheKey] || null
          }
          clearHistory() {
            this.sortHistory = {}
          }
          setCurrent(arr, algorithmName) {
            this.currentArray = [...arr], this.currentAlgorithm = algorithmName
          }
          getCurrentHistory() {
            return this.getHistory(this.currentArray, this.currentAlgorithm)
          }
          generateCurrentHistory() {
            return this.generateHistory(this.currentArray, this.currentAlgorithm)
          }
        }
