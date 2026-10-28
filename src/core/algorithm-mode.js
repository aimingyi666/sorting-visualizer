/**
 * AlgorithmModeManager —— 单算法 / 竞赛 双模式管理
 *
 * 维护两套算法实例与数组，处理模式切换、实例补齐、对比表高亮。
 */
import { PerformanceTimer } from './performance-timer.js';


export class AlgorithmModeManager {
        constructor() {
          this.competitionMode = !1, this.algorithmInstances = [], this.activeAlgorithmCount = 2, this.algorithmColors = [{
            primary: "#165DFF",
            comparing: "#3B82F6",
            sorted: "#60A5FA"
          }, {
            primary: "#f97316",
            comparing: "#FB923C",
            sorted: "#FDBA74"
          }, {
            primary: "#10B981",
            comparing: "#34D399",
            sorted: "#6EE7B7"
          }, {
            primary: "#8B5CF6",
            comparing: "#A78BFA",
            sorted: "#C4B5FD"
          }], this.init()
        }
        init() {
          this.algorithmInstances = [new PerformanceTimer("bubble", 0, this.algorithmColors[0]), new PerformanceTimer("selection", 1, this.algorithmColors[1])], this.switchToSingle()
        }
        getAlgorithmTypeMap() {
          return {
            bubbleSort: "bubble",
            selectionSort: "selection",
            insertionSort: "insertion",
            quickSort: "quick",
            mergeSort: "merge",
            heapSort: "heap",
            shellSort: "shell",
            countingSort: "counting",
            radixSort: "radix"
          }
        }
        switchToSingle() {
          this.competitionMode = !1, this.activeAlgorithmCount = 1, this.algorithmContentContainer && (this.algorithmContentContainer.classList.remove("compare-algorithms", "competition-2", "competition-3", "competition-4"), this.algorithmContentContainer.classList.add("single-algorithm")), this.codeContent && (this.codeContent.classList.remove("compare-algorithms", "competition-2", "competition-3", "competition-4"), this.codeContent.classList.add("single-algorithm"))
        }
        switchToCompetition(t) {
          this.competitionMode = !0, this.activeAlgorithmCount = t, this.ensureAlgorithmInstanceCount(t), this.algorithmContentContainer && (this.algorithmContentContainer.classList.remove("single-algorithm", "compare-algorithms", "competition-2", "competition-3", "competition-4"), this.algorithmContentContainer.classList.add(`competition-${t}`)), this.codeContent && (this.codeContent.classList.remove("single-algorithm", "compare-algorithms", "competition-2", "competition-3", "competition-4"), this.codeContent.classList.add(`competition-${t}`))
        }
        ensureAlgorithmInstanceCount(t) {
          for (this.activeAlgorithmCount = t; this.algorithmInstances.length < t;) {
            const t = this.algorithmInstances.length,
              n = this.getDefaultAlgorithmForIndex(t);
            this.algorithmInstances.push(new PerformanceTimer(n, t, this.algorithmColors[t % this.algorithmColors.length]))
          }
          this.algorithmInstances = this.algorithmInstances.slice(0, t)
        }
        getDefaultAlgorithmForIndex(t) {
          const n = ["bubble", "selection", "insertion", "quick"];
          return n[t % n.length]
        }
        updateAlgorithmInstance(t, n) {
          this.algorithmInstances[t] && (this.algorithmInstances[t].algorithmName = n)
        }
        getAlgorithmInstances() {
          return this.algorithmInstances.slice(0, this.activeAlgorithmCount)
        }
        highlightComparisonTable() {
          const t = {
              bubbleSort: "冒泡排序",
              selectionSort: "选择排序",
              insertionSort: "插入排序",
              quickSort: "快速排序",
              mergeSort: "归并排序",
              heapSort: "堆排序",
              shellSort: "希尔排序",
              countingSort: "计数排序",
              radixSort: "基数排序"
            },
            n = {
              bubble: "bubbleSort",
              selection: "selectionSort",
              insertion: "insertionSort",
              quick: "quickSort",
              merge: "mergeSort",
              heap: "heapSort",
              shell: "shellSort",
              counting: "countingSort",
              radix: "radixSort"
            },
            e = document.querySelectorAll("#explanation table tbody tr");
          e.forEach(t => {
            t.classList.remove("bg-primary/10", "bg-orange-50", "bg-green-50", "bg-purple-50", "font-semibold"), t.querySelectorAll("td").forEach(t => {
              t.classList.remove("bg-primary/10", "bg-orange-50", "bg-green-50", "bg-purple-50", "font-semibold")
            })
          }), this.getAlgorithmInstances().forEach((i, r) => {
            const a = t[n[i.algorithmName]],
              s = ["bg-primary/10", "bg-orange-50", "bg-green-50", "bg-purple-50"][r];
            e.forEach(t => {
              const n = t.querySelector("td:first-child");
              n && n.textContent === a && t.querySelectorAll("td").forEach(t => {
                t.classList.add(s, "font-semibold")
              })
            })
          })
        }
        initAlgorithmArrays(t) {
          this.algorithmInstances.forEach(n => {
            n.init([...t])
          })
        }
      }
