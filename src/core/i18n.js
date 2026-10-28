/**
 * I18nManager —— 国际化（中文 / English）
 *
 * 内含完整翻译词表，通过 updateDOMText 遍历 DOM 做文本替换。
 * 原压缩代码中为 class S。
 */

export class I18nManager {
        constructor() {
          this.currentLanguage = localStorage.getItem("language") || "zh", this.translations = {
            common: {
              zh: {
                title: "排序算法可视化",
                singleMode: "单算法模式",
                competitionMode: "竞赛模式",
                visualization: "排序可视化",
                algorithmPrinciple: "算法原理",
                complexityAnalysis: "复杂度分析",
                applicationScenarios: "适用场景",
                codeImplementation: "代码实现",
                algorithmComparison: "算法对比",
                selectAlgorithm: "选择算法",
                newArray: "新数组",
                start: "开始",
                pause: "暂停",
                reset: "重置",
                stepBack: "步退",
                stepForward: "步进",
                arraySize: "数组大小",
                sortSpeed: "每秒排序次数",
                algorithmLog: "算法日志",
                step: "步骤",
                generateDocument: "生成文档",
                exportData: "导出数据",
                exportFormat: "导出格式",
                exportContent: "导出内容",
                sortingProcess: "排序过程",
                performanceData: "性能数据",
                algorithmInfo: "算法信息",
                randomArray: "随机数组",
                sortedArray: "已排序数组",
                reverseArray: "逆序数组",
                nearlySortedArray: "近似排序数组",
                fewUniqueArray: "少数唯一值",
                constantArray: "常数数组",
                alternatingArray: "交替数组",
                customArray: "自定义数组",
                confirm: "确认",
                cancel: "取消",
                enterArray: "请输入数组（用逗号分隔）",
                invalidArray: "无效的数组格式",
                explanatoryDocument: "解释文档"
              },
              en: {
                title: "Sorting Algorithm Visualization",
                singleMode: "Single Algorithm Mode",
                competitionMode: "Competition Mode",
                visualization: "Visualization",
                algorithmPrinciple: "Algorithm Principle",
                complexityAnalysis: "Complexity Analysis",
                applicationScenarios: "Application Scenarios",
                codeImplementation: "Code Implementation",
                algorithmComparison: "Algorithm Comparison",
                selectAlgorithm: "Select Algorithm",
                newArray: "New Array",
                start: "Start",
                pause: "Pause",
                reset: "Reset",
                stepBack: "Step Back",
                stepForward: "Step Forward",
                arraySize: "Array Size",
                sortSpeed: "Sorting Speed",
                algorithmLog: "Algorithm Log",
                step: "Step",
                generateDocument: "Generate Document",
                exportData: "Export Data",
                exportFormat: "Export Format",
                exportContent: "Export Content",
                sortingProcess: "Sorting Process",
                performanceData: "Performance Data",
                algorithmInfo: "Algorithm Info",
                randomArray: "Random Array",
                sortedArray: "Sorted Array",
                reverseArray: "Reverse Array",
                nearlySortedArray: "Nearly Sorted Array",
                fewUniqueArray: "Few Unique Values",
                constantArray: "Constant Array",
                alternatingArray: "Alternating Array",
                customArray: "Custom Array",
                confirm: "Confirm",
                cancel: "Cancel",
                enterArray: "Please enter array (comma-separated)",
                invalidArray: "Invalid array format",
                explanatoryDocument: "Explanatory Document"
              }
            },
            algorithms: {
              zh: {
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
              en: {
                bubbleSort: "Bubble Sort",
                selectionSort: "Selection Sort",
                insertionSort: "Insertion Sort",
                quickSort: "Quick Sort",
                mergeSort: "Merge Sort",
                heapSort: "Heap Sort",
                shellSort: "Shell Sort",
                countingSort: "Counting Sort",
                radixSort: "Radix Sort"
              }
            }
          }
        }
        getCurrentLanguage() {
          return this.currentLanguage
        }
        setLanguage(t) {
          this.currentLanguage = t, localStorage.setItem("language", t), document.documentElement.setAttribute("lang", t), document.dispatchEvent(new CustomEvent("languageChanged", {
            detail: {
              lang: t
            }
          }))
        }
        t(t, n = "common") {
          return this.translations[n][this.currentLanguage][t] || t
        }
        updateDOMText() {
          const t = document.querySelector("h1");
          t && (t.textContent = this.t("title")), this.updateNavigation(), this.updateModeButtons(), this.updateControlPanel(), this.updateMobileMenu()
        }
        updateNavigation() {
          const t = {
            "#visualization": this.t("visualization"),
            "#algorithm-principle": this.t("algorithmPrinciple"),
            "#complexity-analysis": this.t("complexityAnalysis"),
            "#application-scenarios": this.t("applicationScenarios"),
            "#code-implementation": this.t("codeImplementation"),
            "#algorithm-comparison": this.t("algorithmComparison")
          };
          Object.entries(t).forEach(([t, n]) => {
            document.querySelectorAll(`a[href="${t}"]`).forEach(t => {
              const e = t.querySelector("i");
              e ? t.innerHTML = `<i class="${e.className}"></i> ${n}` : t.textContent = n
            })
          })
        }
        updateModeButtons() {
          const singleModeBtnBox = document.getElementById("single-mode-btn");
          if (singleModeBtnBox) {
            const n = singleModeBtnBox.querySelector("i");
            singleModeBtnBox.innerHTML = `<i class="${n.className}"></i> ${this.t("singleMode")}`
          }
          const competitionModeBtnBox = document.getElementById("competition-mode-btn");
          if (competitionModeBtnBox) {
            const t = competitionModeBtnBox.querySelector("i");
            competitionModeBtnBox.innerHTML = `<i class="${t.className}"></i> ${this.t("competitionMode")}`
          }
        }
        updateControlPanel() {
          const t = document.querySelector('label[for="algorithm-selector"]');
          t && (t.textContent = this.t("selectAlgorithm"));
          const newArrayInput = document.getElementById("new-array");
          if (newArrayInput) {
            const t = newArrayInput.querySelector("i");
            newArrayInput.innerHTML = `<i class="${t.className}"></i> ${this.t("newArray")}`
          }
          const startSortBox = document.getElementById("start-sort");
          if (startSortBox) {
            const t = startSortBox.querySelector("i");
            startSortBox.innerHTML = `<i class="${t.className}"></i> ${this.t("start")}`
          }
          const pauseSortBox = document.getElementById("pause-sort");
          if (pauseSortBox) {
            const t = pauseSortBox.querySelector("i");
            pauseSortBox.innerHTML = `<i class="${t.className}"></i> ${this.t("pause")}`
          }
          const resetSortBox = document.getElementById("reset-sort");
          if (resetSortBox) {
            const t = resetSortBox.querySelector("i");
            resetSortBox.innerHTML = `<i class="${t.className}"></i> ${this.t("reset")}`
          }
          const stepBackBox = document.getElementById("step-back");
          if (stepBackBox) {
            const t = stepBackBox.querySelector("i");
            stepBackBox.innerHTML = `<i class="${t.className}"></i> ${this.t("stepBack")}`
          }
          const stepForwardBox = document.getElementById("step-forward");
          if (stepForwardBox) {
            const t = stepForwardBox.querySelector("i");
            stepForwardBox.innerHTML = `<i class="${t.className}"></i> ${this.t("stepForward")}`
          }
          document.querySelectorAll('label[for="array-size"]').forEach(t => {
            const n = t.querySelector("span");
            n && (t.innerHTML = `${this.t("arraySize")}: <span id="array-size-value">${n.textContent}</span>`)
          }), document.querySelectorAll('label[for="sort-speed"]').forEach(t => {
            const n = t.querySelector("span");
            n && (t.innerHTML = `${this.t("sortSpeed")}: <span id="sort-speed-value">${n.textContent}</span>`)
          }), document.querySelectorAll("label").forEach(t => {
            const n = t.textContent.trim();
            if ("导出数据" === n || "Export Data" === n) t.textContent = this.t("exportData");
            else if ("导出格式" === n || "Export Format" === n) t.textContent = this.t("exportFormat");
            else if ("导出内容" === n || "Export Content" === n) t.textContent = this.t("exportContent");
            else if (n.includes("排序过程") || n.includes("Sorting Process")) {
              const n = t.querySelector('input[type="checkbox"]');
              n && (t.innerHTML = `<input type="checkbox" name="export-content" value="sorting-process" class="mr-1"${n.checked?" checked":""}> ${this.t("sortingProcess")}`)
            } else if (n.includes("性能数据") || n.includes("Performance Data")) {
              const n = t.querySelector('input[type="checkbox"]');
              n && (t.innerHTML = `<input type="checkbox" name="export-content" value="performance-data" class="mr-1"${n.checked?" checked":""}> ${this.t("performanceData")}`)
            } else if (n.includes("算法信息") || n.includes("Algorithm Info")) {
              const n = t.querySelector('input[type="checkbox"]');
              n && (t.innerHTML = `<input type="checkbox" name="export-content" value="algorithm-info" class="mr-1"${n.checked?" checked":""}> ${this.t("algorithmInfo")}`)
            }
          });
          const exportDataText = document.getElementById("export-data");
          if (exportDataText) {
            const t = exportDataText.querySelector("i");
            t ? exportDataText.innerHTML = `<i class="${t.className}"></i> ${this.t("exportData")}` : exportDataText.textContent = this.t("exportData")
          }
        }
        updateMobileMenu() {
          const t = document.querySelector('label[for="mobile-algorithm-selector"]');
          t && (t.textContent = this.t("selectAlgorithm"))
        }
      }

/**
 * 全局语言管理器单例
 *
 * 原压缩代码中为 const C = new S; 并挂到 window.languageManager。
 * 这里保留 window 挂载以兼容恢复前依赖全局的代码路径。
 */
export const languageManager = new I18nManager();

if (typeof window !== 'undefined') {
  window.LanguageManager = I18nManager;
  window.languageManager = languageManager;
}
