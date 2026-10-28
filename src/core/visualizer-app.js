/**
 * SortingVisualizerApp —— 应用核心编排器（80 个方法）
 *
 * 职责：初始化各子模块、元素缓存、2D/3D 可视化、性能图表、
 *      竞赛模式、步骤回放、分享/导出、语言与主题联动。
 *
 * 这是整个应用的中枢，其余模块围绕它协作。
 * 原压缩代码中为 class E。
 */
import { Navbar } from '../components/navbar.js';
import { Footer } from '../components/footer.js';
import { ControlPanel } from '../components/control-panel.js';
import { ExplanationSection } from '../components/explanation-section.js';
import { CodeSection } from '../components/code-section.js';
import { DocumentExporter } from '../components/document-exporter.js';
import { AlgorithmModeManager } from './algorithm-mode.js';
import { defineField } from '../utils/define-field.js';
import { SortHistoryCache } from './history-cache.js';
import { algorithmMeta } from '../data/algorithm-meta.js';
import { languageManager } from './i18n.js';


/** 全局排序历史缓存（原压缩代码中的 w） */
const historyCache = new SortHistoryCache();

export class SortingVisualizerApp {
        constructor() {
          defineField(this, "logGroup", null), this.array = [], this.arraySize = 20, this.sortSpeed = 10, this.isSorting = !1, this.isPaused = !1, this.isStepping = !1, this.comparisonCount = 0, this.swapCount = 0, this.animationId = null, this.currentAlgorithm = "bubbleSort", this.sortGenerator = null, this.sortHistory = [], this.currentStep = -1, this.preGeneratedHistory = null, this.lastPivotIndex = -1, this.lastPivotValue = -1, this.initialArray = [], this.displayStyle = "bar", this.animationDuration = 500, this.performanceData = {
            time: [],
            comparisons: [],
            swaps: []
          }, this.startTime = null, this.performanceChart = null, this.chartUpdateInterval = null, this.isCompetitionMode = !1, this.competitionAlgorithms = ["bubble", "selection", "insertion", "quick"], this.competitionArray = [], this.competitionSpeed = 10, this.isCompetitionRunning = !1, this.isCompetitionPaused = !1, this.competitionStartTime = null, this.competitionPerformanceChart = null, this.competitionChartUpdateInterval = null, this.algorithmContainers = [], this.explanatoryDocument = new DocumentExporter, this.logBuffer = [], this.currentStepExplanation = "", this.is3DMode = !1, this.visualization3D = null, this.barsContainer3D = null, this.toggle2DBtn = null, this.toggle3DBtn = null, requestAnimationFrame(() => {
            this.initModules(), setTimeout(() => {
              this.initElements(), this.setupEventListeners(), this.createNewArray(), this.competitionManager = new AlgorithmModeManager, this.updateAlgorithmContent(), this.initPerformanceChart(), this.initCompetitionMode(), this.initLanguageManager(), this.init3DVisualization(), this.initFloatingPanel(), window.sortingVisualizer = this, this.addSliderEventListeners()
            }, 100)
          })
        }
        initModules() {
          new Navbar, new Footer, new ControlPanel, new ExplanationSection, new CodeSection
        }
        initElements() {
          this.visualizationContainer = document.getElementById("visualization-container"), this.barsContainer = document.getElementById("bars-container"), this.arraySizeSlider = document.getElementById("array-size"), this.arraySizeValue = document.getElementById("array-size-value"), this.sortSpeedSlider = document.getElementById("sort-speed"), this.sortSpeedValue = document.getElementById("sort-speed-value"), this.comparisonCountEl = document.getElementById("comparison-count"), this.swapCountEl = document.getElementById("swap-count"), this.currentArraySizeEl = document.getElementById("current-array-size"), this.newArrayBtn = document.getElementById("new-array"), this.startSortBtn = document.getElementById("start-sort"), this.pauseSortBtn = document.getElementById("pause-sort"), this.resetSortBtn = document.getElementById("reset-sort"), this.stepBackBtn = document.getElementById("step-back"), this.stepForwardBtn = document.getElementById("step-forward"), this.menuToggle = document.getElementById("menu-toggle"), this.mobileMenu = document.getElementById("mobile-menu"), this.codeTabs = document.querySelectorAll(".code-tab"), this.codeBlocks = document.querySelectorAll(".code-block"), this.algorithmTabs = document.querySelectorAll(".algorithm-tab"), this.algorithmContents = document.querySelectorAll(".algorithm-content"), this.explanationTabs = document.querySelectorAll(".explanation-tab"), this.algorithmExplanations = document.querySelectorAll(".algorithm-explanation"), this.displayStyleRadios = document.querySelectorAll('input[name="display-style"]'), this.algorithmSelector = document.getElementById("algorithm-selector"), this.mobileAlgorithmSelector = document.getElementById("mobile-algorithm-selector"), this.currentAlgorithmDisplay = document.getElementById("current-algorithm-display"), this.performanceChartCanvas = document.getElementById("performance-chart"), this.stepExplanationEl = document.getElementById("step-explanation"), this.stepNumberEl = document.getElementById("step-number"), this.customArrayModal = document.getElementById("custom-array-modal"), this.customArrayModalInput = document.getElementById("custom-array-input"), this.customArrayModalError = document.getElementById("custom-array-modal-error"), this.cancelCustomArrayBtn = document.getElementById("cancel-custom-array"), this.confirmCustomArrayBtn = document.getElementById("confirm-custom-array"), this.barsContainer3D = document.getElementById("bars-container-3d"), this.toggle2DBtn = document.getElementById("toggle-2d"), this.toggle3DBtn = document.getElementById("toggle-3d")
        }
        initPerformanceChart() {
          this.performanceChartCanvas && (this.performanceChart = new Chart(this.performanceChartCanvas, {
            type: "line",
            data: {
              labels: [],
              datasets: [{
                label: "比较次数",
                data: [],
                borderColor: "#165DFF",
                backgroundColor: "rgba(22, 93, 255, 0.1)",
                tension: .4,
                fill: !0
              }, {
                label: "交换次数",
                data: [],
                borderColor: "#f97316",
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                tension: .4,
                fill: !0
              }]
            },
            options: {
              responsive: !0,
              maintainAspectRatio: !1,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: {
                      size: 12
                    }
                  }
                },
                tooltip: {
                  mode: "index",
                  intersect: !1
                }
              },
              scales: {
                x: {
                  title: {
                    display: !0,
                    text: "时间 (秒)",
                    font: {
                      size: 12
                    }
                  },
                  ticks: {
                    font: {
                      size: 10
                    }
                  }
                },
                y: {
                  title: {
                    display: !0,
                    text: "次数",
                    font: {
                      size: 12
                    }
                  },
                  ticks: {
                    font: {
                      size: 10
                    }
                  },
                  beginAtZero: !0
                }
              },
              animation: {
                duration: 0
              }
            }
          }))
        }
        initCompetitionMode() {
          this.initCompetitionPerformanceChart(), this.setupCompetitionEventListeners()
        }
        initLanguageManager() {
          const t = localStorage.getItem("language") || "zh";
          languageManager.setLanguage(t), languageManager.updateDOMText(), document.addEventListener("languageChanged", () => {
            languageManager.updateDOMText()
          })
        }
        init3DVisualization() {
          if (this.barsContainer3D = this.barsContainer3D || document.getElementById("bars-container-3d"), window.THREE) this.barsContainer3D && window.Visualization3D && (this.visualization3D = new window.Visualization3D("bars-container-3d"));
          else {
            const t = document.createElement("script");
            t.src = "https://unpkg.com/three@0.160.0/build/three.min.js", t.onload = () => {
              const t = document.createElement("script");
              t.src = "https://unpkg.com/three@0.160.0/examples/js/controls/OrbitControls.js", t.onload = () => {
                import("../visualization-3d.js").then(t => {
                  window.Visualization3D = t.Visualization3D, this.barsContainer3D && window.Visualization3D && (this.visualization3D = new window.Visualization3D("bars-container-3d"))
                })
              }, t.onerror = () => {
                console.error("Failed to load OrbitControls.js, 3D visualization may not work properly"), import("../visualization-3d.js").then(t => {
                  window.Visualization3D = t.Visualization3D
                })
              }, document.head.appendChild(t)
            }, t.onerror = () => {
              console.error("Failed to load Three.js, 3D visualization may not work properly")
            }, document.head.appendChild(t)
          }
        }
        initFloatingPanel() {
          if (document.getElementById("floating-panel")) return;
          const t = document.createElement("button");
          t.id = "floating-toggle", t.className = "bg-primary text-white p-3 shadow-lg hover:bg-primary/90 active:bg-primary/80 transition-all duration-300", t.innerHTML = '<i class="fa fa-chevron-left"></i>', t.style.cssText = "\n            position: fixed;\n            right: 0;\n            top: 50%;\n            transform: translateY(-50%);\n            border: none;\n            cursor: pointer;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            width: 40px;\n            height: 40px;\n            border-radius: 20px 0 0 20px;\n            z-index: 1001;\n            transition: all 0.3s ease;\n        ";
          const n = document.createElement("div");
          n.id = "floating-panel-content", n.className = "bg-card rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300", n.style.cssText = "\n            position: fixed;\n            right: 0;\n            top: 50%;\n            transform: translateY(-50%) translateX(100%);\n            background-color: white;\n            border-radius: 20px 0 0 20px;\n            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);\n            border: 1px solid #e2e8f0;\n            overflow: hidden;\n            transition: all 0.3s ease;\n            width: 300px;\n            max-height: 80vh;\n            overflow-y: auto;\n            z-index: 1000;\n        ";
          const e = document.createElement("div");
          e.className = "bg-primary text-white px-4 py-3 flex justify-between items-center", e.innerHTML = '\n            <h3 class="font-semibold text-sm">分享与导出</h3>\n            <button id="close-floating-panel" class="text-white hover:text-gray-200">\n                <i class="fa fa-times"></i>\n            </button>\n        ';
          const i = document.createElement("div");
          i.className = "p-4 space-y-4";
          const r = document.createElement("div");
          r.innerHTML = '\n            <div class="flex justify-between items-center mb-2">\n                <label class="text-sm font-medium text-gray-700">数据导出</label>\n            </div>\n            <div class="space-y-3">\n                \x3c!-- 导出格式选择 --\x3e\n                <div>\n                    <label class="block text-xs font-medium text-gray-700 mb-1">导出格式</label>\n                    <div class="grid grid-cols-3 gap-2">\n                        <label class="flex items-center">\n                            <input type="radio" name="export-format" value="json" class="mr-1" checked>\n                            <span class="text-xs">JSON</span>\n                        </label>\n                        <label class="flex items-center">\n                            <input type="radio" name="export-format" value="csv" class="mr-1">\n                            <span class="text-xs">CSV</span>\n                        </label>\n                        <label class="flex items-center">\n                            <input type="radio" name="export-format" value="image" class="mr-1">\n                            <span class="text-xs">图片</span>\n                        </label>\n                    </div>\n                </div>\n                \n                \x3c!-- 导出内容选择 --\x3e\n                <div>\n                    <label class="block text-xs font-medium text-gray-700 mb-1">导出内容</label>\n                    <div class="space-y-1">\n                        <label class="flex items-center"><input type="checkbox" name="export-content" value="sorting-process" class="mr-1"> 排序过程</label>\n                        <label class="flex items-center"><input type="checkbox" name="export-content" value="performance-data" class="mr-1"> 性能数据</label>\n                        <label class="flex items-center"><input type="checkbox" name="export-content" value="algorithm-info" class="mr-1"> 算法信息</label>\n                    </div>\n                </div>\n                \n                \x3c!-- 导出按钮 --\x3e\n                <button id="export-data" class="control-btn bg-primary text-white hover:bg-primary/90 active:bg-primary/80 w-full">\n                    <i class="fa fa-download"></i> 导出数据\n                </button>\n            </div>\n        ';
          const a = document.createElement("div");
          a.innerHTML = '\n            <div class="flex justify-between items-center mb-2">\n                <label class="text-sm font-medium text-gray-700">分享功能</label>\n            </div>\n            <div class="space-y-3">\n                \x3c!-- 生成分享链接 --\x3e\n                <div class="flex gap-2">\n                    <input type="text" id="share-link" placeholder="分享链接将显示在这里" readonly class="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block p-2">\n                    <button id="generate-share-link" class="control-btn bg-primary text-white hover:bg-primary/90 active:bg-primary/80 whitespace-nowrap">\n                        <i class="fa fa-link"></i>\n                    </button>\n                </div>\n                \n                \x3c!-- 导出为视频/GIF --\x3e\n                <div class="grid grid-cols-2 gap-2">\n                    <button id="export-as-video" class="control-btn bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80">\n                        <i class="fa fa-video-camera"></i> 导出视频\n                    </button>\n                    <button id="export-as-gif" class="control-btn bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80">\n                        <i class="fa fa-image"></i> 导出GIF\n                    </button>\n                </div>\n                \n                \x3c!-- 社交媒体分享 --\x3e\n                <div class="flex gap-2">\n                    <button id="share-to-weibo" class="control-btn bg-red-500 text-white hover:bg-red-600 active:bg-red-700 flex-1">\n                        <i class="fa fa-weibo"></i>\n                    </button>\n                    <button id="share-to-wechat" class="control-btn bg-green-500 text-white hover:bg-green-600 active:bg-green-700 flex-1">\n                        <i class="fa fa-weixin"></i>\n                    </button>\n                    <button id="share-to-twitter" class="control-btn bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 flex-1">\n                        <i class="fa fa-twitter"></i>\n                    </button>\n                </div>\n            </div>\n        ', i.appendChild(r), i.appendChild(a), n.appendChild(e), n.appendChild(i), document.body.appendChild(n), document.body.appendChild(t);
          let s = !1;

          function o() {
            s = !s, s ? (n.style.transform = "translateY(-50%) translateX(0)", t.innerHTML = '<i class="fa fa-chevron-right"></i>', t.style.right = "300px", t.style.borderRadius = "20px 0 0 20px") : (n.style.transform = "translateY(-50%) translateX(100%)", t.innerHTML = '<i class="fa fa-chevron-left"></i>', t.style.right = "0", t.style.borderRadius = "20px 0 0 20px")
          }
          t.addEventListener("click", o), e.querySelector("#close-floating-panel").addEventListener("click", o), this.bindShareExportEvents()
        }
        bindShareExportEvents() {
          const generateShareLinkBtn = document.getElementById("generate-share-link"),
            shareLinkInput = document.getElementById("share-link");
          generateShareLinkBtn && shareLinkInput && generateShareLinkBtn.addEventListener("click", () => {
            const t = {
                algorithm: this.currentAlgorithm,
                array: this.array,
                arraySize: this.arraySize,
                sortSpeed: this.sortSpeed
              },
              e = btoa(JSON.stringify(t)),
              i = `${window.location.origin}${window.location.pathname}?share=${e}`;
            shareLinkInput.value = i, shareLinkInput.select(), document.execCommand("copy"), alert("分享链接已复制到剪贴板！")
          });
          const exportAsVideoBtn = document.getElementById("export-as-video");
          exportAsVideoBtn && exportAsVideoBtn.addEventListener("click", () => {
            alert("视频导出功能开发中...")
          });
          const exportAsGifBtn = document.getElementById("export-as-gif");
          exportAsGifBtn && exportAsGifBtn.addEventListener("click", () => {
            alert("GIF导出功能开发中...")
          });
          const shareToWeiboBtn = document.getElementById("share-to-weibo");
          shareToWeiboBtn && shareToWeiboBtn.addEventListener("click", () => {
            const t = `我在排序算法可视化工具中使用了${algorithmMeta[this.currentAlgorithm].name}，快来看看吧！`,
              n = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(t)}`;
            window.open(n, "_blank")
          });
          const shareToWechatBtn = document.getElementById("share-to-wechat");
          shareToWechatBtn && shareToWechatBtn.addEventListener("click", () => {
            alert("请使用微信扫描二维码分享")
          });
          const shareToTwitterBtn = document.getElementById("share-to-twitter");
          shareToTwitterBtn && shareToTwitterBtn.addEventListener("click", () => {
            const t = `I used ${algorithmMeta[this.currentAlgorithm].name} in the Sorting Algorithm Visualizer!`,
              n = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t)}`;
            window.open(n, "_blank")
          })
        }
        addSliderEventListeners() {
          const arraySizeEl = document.getElementById("array-size"),
            arraySizeValueText = document.getElementById("array-size-value"),
            sortSpeedInput = document.getElementById("sort-speed"),
            sortSpeedValueText = document.getElementById("sort-speed-value");
          arraySizeEl && arraySizeValueText && (arraySizeEl.removeEventListener("input", this.arraySizeInputHandler), this.arraySizeInputHandler = t => {
            const r = t.target.value;
            arraySizeValueText.textContent = r, this.isSorting || (this.arraySize = parseInt(r), this.currentArraySizeEl.textContent = r, this.sortSpeed = Math.min(5 * this.arraySize, 250), sortSpeedInput.value = this.sortSpeed, sortSpeedValueText.textContent = this.sortSpeed, this.createNewArray())
          }, arraySizeEl.addEventListener("input", this.arraySizeInputHandler)), sortSpeedInput && sortSpeedValueText && (sortSpeedInput.removeEventListener("input", this.sortSpeedInputHandler), this.sortSpeedInputHandler = t => {
            const n = t.target.value;
            sortSpeedValueText.textContent = n, this.sortSpeed = parseInt(n)
          }, sortSpeedInput.addEventListener("input", this.sortSpeedInputHandler))
        }
        switchTo2D() {
          this.is3DMode = !1, this.toggle2DBtn && this.toggle3DBtn && (this.toggle2DBtn.classList.remove("bg-white", "text-primary"), this.toggle2DBtn.classList.add("bg-primary", "text-white"), this.toggle3DBtn.classList.remove("bg-primary", "text-white"), this.toggle3DBtn.classList.add("bg-white", "text-primary"), this.barsContainer.classList.remove("hidden"), this.barsContainer3D.classList.add("hidden"), this.renderArray())
        }
        switchTo3D() {
          this.is3DMode = !0, this.toggle2DBtn && this.toggle3DBtn && (this.toggle3DBtn.classList.remove("bg-white", "text-primary"), this.toggle3DBtn.classList.add("bg-primary", "text-white"), this.toggle2DBtn.classList.remove("bg-primary", "text-white"), this.toggle2DBtn.classList.add("bg-white", "text-primary"), this.barsContainer.classList.add("hidden"), this.barsContainer3D.classList.remove("hidden"), this.barsContainer3D && import("../visualization-3d.js").then(t => {
            this.visualization3D = new t.Visualization3D("bars-container-3d"), this.renderArray()
          }).catch(t => {
            console.error("Failed to initialize 3D visualization:", t), this.switchTo2D()
          }))
        }
        initCompetitionPerformanceChart() {
          const competitionPerformanceChartEl = document.getElementById("competition-performance-chart");
          competitionPerformanceChartEl && (this.competitionPerformanceChart = new Chart(competitionPerformanceChartEl, {
            type: "line",
            data: {
              labels: [],
              datasets: [{
                label: "算法1 - 比较次数",
                data: [],
                borderColor: "#165DFF",
                backgroundColor: "rgba(22, 93, 255, 0.1)",
                tension: .4,
                fill: !0
              }, {
                label: "算法1 - 交换次数",
                data: [],
                borderColor: "#165DFF",
                backgroundColor: "rgba(22, 93, 255, 0.05)",
                tension: .4,
                fill: !1,
                borderDash: [5, 5],
                borderWidth: 2
              }, {
                label: "算法2 - 比较次数",
                data: [],
                borderColor: "#f97316",
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                tension: .4,
                fill: !0
              }, {
                label: "算法2 - 交换次数",
                data: [],
                borderColor: "#f97316",
                backgroundColor: "rgba(249, 115, 22, 0.05)",
                tension: .4,
                fill: !1,
                borderDash: [5, 5],
                borderWidth: 2
              }]
            },
            options: {
              responsive: !0,
              maintainAspectRatio: !1,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: {
                      size: 12
                    }
                  }
                },
                tooltip: {
                  mode: "index",
                  intersect: !1
                }
              },
              scales: {
                x: {
                  title: {
                    display: !0,
                    text: "时间 (秒)",
                    font: {
                      size: 12
                    }
                  },
                  ticks: {
                    font: {
                      size: 10
                    }
                  }
                },
                y: {
                  title: {
                    display: !0,
                    text: "比较次数",
                    font: {
                      size: 12
                    }
                  },
                  ticks: {
                    font: {
                      size: 10
                    }
                  },
                  beginAtZero: !0
                }
              },
              animation: {
                duration: 0
              }
            }
          }))
        }
        setupCompetitionEventListeners() {
          const singleModeBtn = document.getElementById("single-mode-btn"),
            competitionModeBtn = document.getElementById("competition-mode-btn");
          singleModeBtn && singleModeBtn.addEventListener("click", () => this.switchToSingleMode()), competitionModeBtn && competitionModeBtn.addEventListener("click", () => this.switchToCompetitionMode());
          for (let p = 0; p < 2; p++) {
            const t = document.getElementById(`algorithm-select-${p}`);
            t && t.addEventListener("change", t => {
              this.initializeAlgorithmView(p, t.target.value)
            })
          }
          const competitionArraySizeEl = document.getElementById("competition-array-size"),
            competitionArraySizeValueText = document.getElementById("competition-array-size-value"),
            competitionSpeedInput = document.getElementById("competition-speed"),
            competitionSpeedValueText = document.getElementById("competition-speed-value");
          competitionArraySizeEl && competitionArraySizeValueText && competitionArraySizeEl.addEventListener("input", t => {
            const n = parseInt(t.target.value);
            competitionArraySizeValueText.textContent = n;
            const e = Math.min(5 * n, 250);
            competitionSpeedInput && competitionSpeedValueText && (competitionSpeedInput.value = e, competitionSpeedValueText.textContent = e, this.competitionSpeed = e), this.isCompetitionRunning && !this.isCompetitionPaused || this.generateNewCompetitionArray()
          }), competitionSpeedInput && competitionSpeedValueText && competitionSpeedInput.addEventListener("input", t => {
            const n = parseInt(t.target.value);
            competitionSpeedValueText.textContent = n, this.competitionSpeed = n
          });
          const competitionStartBtn = document.getElementById("competition-start-btn");
          competitionStartBtn && competitionStartBtn.addEventListener("click", () => {
            this.isCompetitionPaused ? this.resumeCompetition() : this.startCompetition()
          });
          const competitionPauseBtn = document.getElementById("competition-pause-btn");
          competitionPauseBtn && competitionPauseBtn.addEventListener("click", () => {
            this.isCompetitionPaused ? this.resumeCompetition() : this.pauseCompetition()
          });
          const competitionNewArrayBtn = document.getElementById("competition-new-array-btn"),
            competitionNewArrayMenuBox = document.getElementById("competition-new-array-menu");
          competitionNewArrayBtn && competitionNewArrayMenuBox && (competitionNewArrayBtn.addEventListener("click", () => {
            competitionNewArrayMenuBox.classList.contains("hidden") ? (competitionNewArrayMenuBox.classList.remove("hidden"), setTimeout(() => {
              competitionNewArrayMenuBox.classList.remove("opacity-0", "translate-y-2"), competitionNewArrayMenuBox.classList.add("opacity-100", "translate-y-0")
            }, 10)) : (competitionNewArrayMenuBox.classList.remove("opacity-100", "translate-y-0"), competitionNewArrayMenuBox.classList.add("opacity-0", "translate-y-2"), setTimeout(() => {
              competitionNewArrayMenuBox.classList.add("hidden")
            }, 300))
          }), competitionNewArrayBtn.addEventListener("mouseenter", () => {
            competitionNewArrayMenuBox.classList.contains("hidden") && (competitionNewArrayMenuBox.classList.remove("hidden"), setTimeout(() => {
              competitionNewArrayMenuBox.classList.remove("opacity-0", "translate-y-2"), competitionNewArrayMenuBox.classList.add("opacity-100", "translate-y-0")
            }, 10))
          }), competitionNewArrayBtn.addEventListener("mouseleave", () => {
            setTimeout(() => {
              competitionNewArrayMenuBox.matches(":hover") || (competitionNewArrayMenuBox.classList.remove("opacity-100", "translate-y-0"), competitionNewArrayMenuBox.classList.add("opacity-0", "translate-y-2"), setTimeout(() => {
                competitionNewArrayMenuBox.classList.add("hidden")
              }, 300))
            }, 100)
          }), competitionNewArrayMenuBox.addEventListener("mouseleave", () => {
            competitionNewArrayMenuBox.classList.remove("opacity-100", "translate-y-0"), competitionNewArrayMenuBox.classList.add("opacity-0", "translate-y-2"), setTimeout(() => {
              competitionNewArrayMenuBox.classList.add("hidden")
            }, 300)
          })), document.addEventListener("click", t => {
            if (t.target.hasAttribute("data-distribution")) {
              const n = t.target.getAttribute("data-distribution");
              this.generateNewCompetitionArray(n)
            }
            "custom" === t.target.getAttribute("data-action") && this.openCustomArrayModal()
          });
          const competitionResetBtn = document.getElementById("competition-reset-btn");
          competitionResetBtn && competitionResetBtn.addEventListener("click", () => {
            this.resetCompetition()
          })
        }
        initializeAlgorithmView(t, n) {
          const e = document.getElementById(`algorithm-name-${t}`),
            i = e ? e.textContent : "",
            r = this.getAlgorithmName(n);
          i !== r && (e && (e.textContent = r), this.competitionManager.updateAlgorithmInstance(t, n), this.isCompetitionRunning || this.initCompetitionVisualization())
        }
        resetPerformanceData() {
          this.performanceData = {
            time: [],
            comparisons: [],
            swaps: []
          }, this.startTime = null, this.performanceChart && (this.performanceChart.data.labels = [], this.performanceChart.data.datasets.forEach(t => {
            t.data = []
          }), this.performanceChart.update("none")), this.chartUpdateInterval && (clearInterval(this.chartUpdateInterval), this.chartUpdateInterval = null)
        }
        resetCompetitionPerformanceData() {
          this.competitionPerformanceChart && (this.competitionPerformanceChart.data.labels = [], this.competitionPerformanceChart.data.datasets.forEach(t => {
            t.data = []
          }), this.competitionPerformanceChart.update("none")), this.competitionChartUpdateInterval && (clearInterval(this.competitionChartUpdateInterval), this.competitionChartUpdateInterval = null)
        }
        switchToSingleMode() {
          this.isCompetitionMode = !1;
          const singleModeBtnBox = document.getElementById("single-mode-btn"),
            competitionModeBtnBox = document.getElementById("competition-mode-btn");
          singleModeBtnBox && (singleModeBtnBox.classList.remove("bg-transparent", "text-gray-700", "hover:bg-gray-200"), singleModeBtnBox.classList.add("bg-primary", "text-white", "shadow-md", "hover:shadow-lg")), competitionModeBtnBox && (competitionModeBtnBox.classList.remove("bg-primary", "text-white", "shadow-md", "hover:shadow-lg"), competitionModeBtnBox.classList.add("bg-transparent", "text-gray-700", "hover:bg-gray-200"));
          const singleAlgorithmLayoutBox = document.getElementById("single-algorithm-layout"),
            competitionLayoutBox = document.getElementById("competition-layout"),
            competitionConfigPanelBox = document.getElementById("competition-config-panel");
          competitionLayoutBox && (competitionLayoutBox.classList.add("opacity-0", "scale-95"), competitionLayoutBox.classList.remove("opacity-100", "scale-100"), setTimeout(() => {
            competitionLayoutBox && competitionLayoutBox.classList.add("hidden"), competitionConfigPanelBox && competitionConfigPanelBox.classList.add("hidden")
          }, 500)), singleAlgorithmLayoutBox && (singleAlgorithmLayoutBox.classList.remove("hidden"), setTimeout(() => {
            singleAlgorithmLayoutBox && (singleAlgorithmLayoutBox.classList.add("opacity-100", "scale-100"), singleAlgorithmLayoutBox.classList.remove("opacity-0", "scale-95"))
          }, 50)), this.isCompetitionRunning = !1, this.isCompetitionPaused = !1;
          const a = document.querySelector(".keyboard-shortcuts");
          a && a.classList.remove("hidden")
        }
        switchToCompetitionMode() {
          this.isCompetitionMode = !0;
          const singleModeBtnBox = document.getElementById("single-mode-btn"),
            competitionModeBtnBox = document.getElementById("competition-mode-btn");
          singleModeBtnBox && (singleModeBtnBox.classList.remove("bg-primary", "text-white", "shadow-md", "hover:shadow-lg"), singleModeBtnBox.classList.add("bg-transparent", "text-gray-700", "hover:bg-gray-200")), competitionModeBtnBox && (competitionModeBtnBox.classList.remove("bg-transparent", "text-gray-700", "hover:bg-gray-200"), competitionModeBtnBox.classList.add("bg-primary", "text-white", "shadow-md", "hover:shadow-lg"));
          const singleAlgorithmLayoutBox = document.getElementById("single-algorithm-layout"),
            competitionLayoutBox = document.getElementById("competition-layout"),
            competitionConfigPanelBox = document.getElementById("competition-config-panel");
          singleAlgorithmLayoutBox && (singleAlgorithmLayoutBox.classList.add("opacity-0", "scale-95"), singleAlgorithmLayoutBox.classList.remove("opacity-100", "scale-100"), setTimeout(() => {
            singleAlgorithmLayoutBox && singleAlgorithmLayoutBox.classList.add("hidden")
          }, 500)), competitionLayoutBox && (competitionLayoutBox.classList.remove("hidden"), setTimeout(() => {
            competitionLayoutBox && (competitionLayoutBox.classList.add("opacity-100", "scale-100"), competitionLayoutBox.classList.remove("opacity-0", "scale-95")), competitionConfigPanelBox && competitionConfigPanelBox.classList.remove("hidden")
          }, 50)), this.competitionManager.switchToCompetition(2), this.updateCompetitionLayout(2);
          const a = document.querySelector(".keyboard-shortcuts");
          a && a.classList.add("hidden")
        }
        onAlgorithmCountChange(t) {
          const n = parseInt(t);
          for (let e = 0; e < 4; e++) {
            const t = document.getElementById(`algorithm-select-container-${e}`);
            t && (e < n ? t.classList.remove("hidden") : t.classList.add("hidden"))
          }
          this.updateCompetitionLayout(n), this.competitionPerformanceChart && (this.competitionPerformanceChart.data.datasets[2].hidden = n < 3, this.competitionPerformanceChart.data.datasets[3].hidden = n < 4, this.competitionPerformanceChart.update("none"))
        }
        updateCompetitionLayout(t = 2) {
          for (let e = 2; e <= 4; e++) {
            const t = document.getElementById(`competition-layout-${e}`);
            t && t.classList.add("hidden")
          }
          const n = document.getElementById(`competition-layout-${t}`);
          n && n.classList.remove("hidden")
        }
        startCompetition() {
          var t;
          this.isCompetitionRunning = !0, this.isCompetitionPaused = !1, this.competitionStartTime = Date.now();
          const n = parseInt((null == (t = document.getElementById("competition-array-size")) ? void 0 : t.value) || "20"),
            competitionSpeedInput = document.getElementById("competition-speed"),
            competitionSpeedValueText = document.getElementById("competition-speed-value");
          if (competitionSpeedInput && competitionSpeedValueText) {
            const t = parseInt(competitionSpeedInput.value);
            this.competitionSpeed = t, competitionSpeedValueText.textContent = t
          }
          this.competitionAlgorithms = [];
          for (let s = 0; s < 2; s++) {
            const t = document.getElementById(`algorithm-select-${s}`);
            t && this.competitionAlgorithms.push(t.value)
          }
          this.competitionArray && this.competitionArray.length === n || (this.competitionArray = this.generateArray(n, "random")), this.competitionManager.ensureAlgorithmInstanceCount(2), this.competitionManager.initAlgorithmArrays(this.competitionArray);
          for (let s = 0; s < 2; s++) this.competitionManager.updateAlgorithmInstance(s, this.competitionAlgorithms[s]);
          for (let s = 0; s < 2; s++) {
            const t = document.getElementById(`algorithm-name-${s}`);
            t && (t.textContent = this.getAlgorithmName(this.competitionAlgorithms[s]))
          }
          const competitionArraySizeDisplayText = document.getElementById("competition-array-size-display");
          competitionArraySizeDisplayText && (competitionArraySizeDisplayText.textContent = n);
          const competitionPauseBtnInput = document.getElementById("competition-pause-btn");
          competitionPauseBtnInput && (competitionPauseBtnInput.disabled = !1), this.resetCompetitionPerformanceData(), this.initCompetitionVisualization(), this.startCompetitionPerformanceTracking(), this.startParallelExecution()
        }
        resetCompetition() {
          this.isCompetitionRunning = !1, this.isCompetitionPaused = !1, this.competitionStartTime = null;
          const competitionPauseBtnInput = document.getElementById("competition-pause-btn");
          competitionPauseBtnInput && (competitionPauseBtnInput.disabled = !0, competitionPauseBtnInput.textContent = "暂停", competitionPauseBtnInput.className = "w-full px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"), this.competitionManager.activeAlgorithmCount, this.competitionManager.initAlgorithmArrays(this.competitionArray || this.array);
          for (let n = 0; n < 4; n++) {
            const t = document.getElementById(`algorithm-status-${n}`);
            t && (t.textContent = "就绪", t.className = "text-xs font-medium");
            const e = document.getElementById(`comparison-count-${n}`);
            e && (e.textContent = "0");
            const i = document.getElementById(`swap-count-${n}`);
            i && (i.textContent = "0");
            const r = document.getElementById(`execution-time-${n}`);
            r && (r.textContent = "0ms")
          }
          this.resetCompetitionPerformanceData(), this.initCompetitionVisualization()
        }
        generateArray(t, n) {
          const e = [];
          switch (n) {
            case "sorted":
              for (let r = 0; r < t; r++) e.push(5 * r + 1);
              break;
            case "reverse":
              for (let r = t; r > 0; r--) e.push(5 * r + 1);
              break;
            case "nearly-sorted":
              for (let r = 0; r < t; r++) e.push(5 * r + 1);
              const n = Math.max(1, Math.floor(.1 * t));
              for (let r = 0; r < n; r++) {
                const n = Math.floor(Math.random() * t),
                  i = Math.floor(Math.random() * t);
                [e[n], e[i]] = [e[i], e[n]]
              }
              break;
            case "few-unique":
              const i = [10, 20, 30, 40, 50];
              for (let r = 0; r < t; r++) e.push(i[Math.floor(Math.random() * i.length)]);
              break;
            default:
              for (let r = 0; r < t; r++) e.push(Math.floor(100 * Math.random()) + 1)
          }
          return e
        }
        getAlgorithmName(t) {
          return {
            bubble: "冒泡排序",
            selection: "选择排序",
            insertion: "插入排序",
            quick: "快速排序",
            merge: "归并排序",
            heap: "堆排序",
            shell: "希尔排序",
            counting: "计数排序",
            radix: "基数排序"
          } [t] || t
        }
        getAlgorithmComplexity(t) {
          return {
            bubble: {
              time: "O(n²)",
              space: "O(1)"
            },
            selection: {
              time: "O(n²)",
              space: "O(1)"
            },
            insertion: {
              time: "O(n²)",
              space: "O(1)"
            },
            quick: {
              time: "O(n log n)",
              space: "O(log n)"
            },
            merge: {
              time: "O(n log n)",
              space: "O(n)"
            },
            heap: {
              time: "O(n log n)",
              space: "O(1)"
            },
            shell: {
              time: "O(n log² n)",
              space: "O(1)"
            },
            counting: {
              time: "O(n + k)",
              space: "O(k)"
            },
            radix: {
              time: "O(nk)",
              space: "O(n + k)"
            }
          } [t] || {
            time: "O(n)",
            space: "O(1)"
          }
        }
        initCompetitionVisualization() {
          this.competitionManager.getAlgorithmInstances().forEach((t, n) => {
            this.renderCompetitionArray(t.array, n, [])
          })
        }
        startCompetitionPerformanceTracking() {
          this.updateCompetitionPerformance(), this.competitionChartUpdateInterval = setInterval(() => {
            this.updateCompetitionPerformance()
          }, 1e3)
        }
        updateCompetitionPerformance() {
          if (!this.isCompetitionRunning) return;
          const t = Math.floor((Date.now() - this.competitionStartTime) / 1e3),
            competitionElapsedTimeText = document.getElementById("competition-elapsed-time");
          competitionElapsedTimeText && (competitionElapsedTimeText.textContent = Date.now() - this.competitionStartTime + "ms"), this.competitionPerformanceChart && (this.competitionPerformanceChart.data.labels.includes(t.toString()) || this.competitionPerformanceChart.data.labels.push(t.toString()), this.competitionManager.getAlgorithmInstances().forEach((n, e) => {
            const i = document.getElementById(`comparison-count-${e}`);
            i && (i.textContent = n.comparisonCount);
            const r = document.getElementById(`swap-count-${e}`);
            r && (r.textContent = n.swapCount);
            const a = document.getElementById(`execution-time-${e}`);
            a && (a.textContent = `${n.getExecutionTime()}ms`);
            const s = this.competitionPerformanceChart.data.datasets[2 * e],
              o = this.competitionPerformanceChart.data.datasets[2 * e + 1];
            if (s && o) {
              s.data[t] = n.comparisonCount, o.data[t] = n.swapCount;
              for (let e = 0; e < t; e++) void 0 === s.data[e] && (s.data[e] = s.data[e - 1] || n.comparisonCount), void 0 === o.data[e] && (o.data[e] = o.data[e - 1] || n.swapCount)
            }
          }), this.competitionPerformanceChart.update("none")), this.updateCompetitionTotalStats()
        }
        updateCompetitionTotalStats() {
          const t = this.competitionManager.getAlgorithmInstances();
          let n = 0,
            e = 0;
          t.forEach(t => {
            n += t.comparisonCount, e += t.swapCount
          });
          const totalComparisonsText = document.getElementById("total-comparisons");
          totalComparisonsText && (totalComparisonsText.textContent = n);
          const totalSwapsText = document.getElementById("total-swaps");
          totalSwapsText && (totalSwapsText.textContent = e)
        }
        startParallelExecution() {
          this.competitionManager.getAlgorithmInstances().forEach((t, n) => {
            this.executeAlgorithm(t, n)
          })
        }
        executeAlgorithm(t, n) {
          const e = {
            bubble: p,
            selection: m,
            insertion: h,
            quick: g,
            merge: u,
            heap: b,
            shell: x,
            counting: y,
            radix: f
          } [t.algorithmName];
          if (!e) return;
          t.start();
          const i = e(t.array);
          t.sortHistory = i.history, t.currentStep = 0;
          const r = document.getElementById(`algorithm-status-${n}`);
          r && (r.textContent = "运行中", r.className = "text-xs font-medium text-yellow-500"), setTimeout(() => {
            this.runAlgorithmSteps(t, n)
          }, 0)
        }
        runAlgorithmSteps(t, n) {
          if (this.isCompetitionRunning && !t.isPaused)
            if (t.currentStep < t.sortHistory.length) {
              if (this.executeAlgorithmStep(t, n), t.isSorting && !t.isPaused) {
                const e = 1e3 / this.competitionSpeed;
                setTimeout(() => {
                  this.runAlgorithmSteps(t, n)
                }, e)
              }
            } else {
              t.finish();
              const e = document.getElementById(`algorithm-status-${n}`);
              e && (e.textContent = "完成", e.className = "text-xs font-medium text-green-500"), this.checkCompetitionCompletion()
            }
        }
        executeAlgorithmStep(t, n) {
          if (t.currentStep >= t.sortHistory.length) return;
          const e = t.sortHistory[t.currentStep];
          t.comparisonCount = e.comparisonCount, t.swapCount = e.swapCount, t.array = [...e.array], this.renderCompetitionArray(e.array, n, e.highlightIndices || [], e.sortedIndices || []), t.currentStep++
        }
        renderCompetitionArray(t, n, e = [], i = []) {
          const r = document.getElementById(`bars-container-${n}`);
          if (!r) return;
          r.innerHTML = "";
          const a = r.clientWidth,
            s = Math.max(6, (a - 2 * t.length) / t.length),
            o = r.clientHeight - 20,
            l = Math.max(...t),
            d = ["#165DFF", "#f97316", "#10B981", "#8B5CF6"],
            c = d[n % d.length];
          t.forEach((t, a) => {
            const d = document.createElement("div");
            d.className = "bar-shadow transition-all duration-200 ease-out rounded-sm", d.style.width = `${s}px`, d.style.height = t / l * o + "px", i.includes(a) ? (d.style.backgroundColor = "#60A5FA", d.style.zIndex = "3") : e.includes(a) ? (d.style.backgroundColor = c, d.style.zIndex = "10", d.style.transform = "scaleY(1.05)") : (d.style.backgroundColor = "#64748b", d.style.zIndex = "1"), this.isCompetitionRunning || (d.draggable = !0, d.addEventListener("dragstart", t => {
              t.dataTransfer.setData("text/plain", `${n},${a}`), d.style.opacity = "0.5", d.style.cursor = "grabbing"
            }), d.addEventListener("dragend", () => {
              d.style.opacity = "1", d.style.cursor = "grab"
            }), d.addEventListener("dragenter", t => {
              t.preventDefault(), d.style.border = "2px dashed #165DFF"
            }), d.addEventListener("dragleave", () => {
              d.style.border = ""
            }), d.addEventListener("dragover", t => {
              t.preventDefault()
            }), d.addEventListener("drop", t => {
              t.preventDefault(), d.style.border = "";
              const [e, i] = t.dataTransfer.getData("text/plain").split(",").map(Number), r = a;
              if (e === n) {
                [this.competitionArray[i], this.competitionArray[r]] = [this.competitionArray[r], this.competitionArray[i]], this.competitionManager.initAlgorithmArrays(this.competitionArray), this.initCompetitionVisualization();
                const t = document.getElementById("competition-array-size-display");
                t && (t.textContent = this.competitionArray.length)
              }
            }), d.addEventListener("mouseenter", () => {
              d.style.cursor = "grab"
            })), r.appendChild(d)
          })
        }
        checkCompetitionCompletion() {
          const t = this.competitionManager.getAlgorithmInstances();
          t.every(t => !t.isSorting && !t.isPaused) && (this.isCompetitionRunning = !1, this.competitionEndTime = Date.now(), t.forEach((t, n) => {
            const e = document.getElementById(`algorithm-status-${n}`);
            e && (e.textContent = "完成", e.className = "text-xs font-medium text-green-500")
          }), this.updateCompetitionPerformance(), this.competitionChartUpdateInterval && (clearInterval(this.competitionChartUpdateInterval), this.competitionChartUpdateInterval = null))
        }
        pauseCompetition() {
          this.isCompetitionPaused = !0, this.isCompetitionRunning = !1;
          const competitionPauseBtnText = document.getElementById("competition-pause-btn");
          competitionPauseBtnText && (competitionPauseBtnText.textContent = "继续", competitionPauseBtnText.className = "w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"), this.competitionManager.getAlgorithmInstances().forEach((t, n) => {
            t.pause();
            const e = document.getElementById(`algorithm-status-${n}`);
            e && (e.textContent = "暂停", e.className = "text-xs font-medium text-orange-500")
          })
        }
        resumeCompetition() {
          this.isCompetitionPaused = !1, this.isCompetitionRunning = !0;
          const competitionPauseBtnText = document.getElementById("competition-pause-btn");
          competitionPauseBtnText && (competitionPauseBtnText.textContent = "暂停", competitionPauseBtnText.className = "w-full px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"), this.competitionManager.getAlgorithmInstances().forEach((t, n) => {
            t.isSorting = !0, t.isPaused = !1;
            const e = document.getElementById(`algorithm-status-${n}`);
            e && (e.textContent = "运行中", e.className = "text-xs font-medium text-yellow-500"), this.runAlgorithmSteps(t, n)
          })
        }
        generateNewCompetitionArray(t = "random") {
          var n;
          const e = parseInt((null == (n = document.getElementById("competition-array-size")) ? void 0 : n.value) || "20");
          this.competitionArray = this.generateArray(e, t), this.competitionManager.initAlgorithmArrays(this.competitionArray);
          const competitionArraySizeDisplayText = document.getElementById("competition-array-size-display");
          competitionArraySizeDisplayText && (competitionArraySizeDisplayText.textContent = e);
          const r = Math.min(5 * e, 500);
          this.competitionSpeed = r;
          const competitionSpeedInput = document.getElementById("competition-speed"),
            competitionSpeedValueText = document.getElementById("competition-speed-value");
          competitionSpeedInput && competitionSpeedValueText && (competitionSpeedInput.value = r, competitionSpeedValueText.textContent = r), this.resetCompetitionPerformanceData(), this.initCompetitionVisualization()
        }
        validateCustomArray(t) {
          if (!t || "" === t.trim()) return {
            valid: !1,
            message: "请输入数组"
          };
          const n = t.trim().split(",").map(t => t.trim());
          if (0 === n.length) return {
            valid: !1,
            message: "请输入有效的数字数组"
          };
          const e = [];
          for (const i of n) {
            const t = parseFloat(i);
            if (isNaN(t)) return {
              valid: !1,
              message: `"${i}" 不是有效的数字`
            };
            e.push(t)
          }
          return e.length < 5 || e.length > 50 ? {
            valid: !1,
            message: `数组大小必须在5到50之间，当前大小为${e.length}`
          } : {
            valid: !0,
            numbers: e
          }
        }
        analyzeArrayFeatures(t) {
          if (!t || 0 === t.length) return {};
          const n = {
            size: t.length,
            isSorted: !0,
            isReverseSorted: !0,
            nearlySorted: 0,
            uniqueValues: new Set(t).size,
            uniqueRatio: new Set(t).size / t.length,
            minValue: Math.min(...t),
            maxValue: Math.max(...t),
            range: Math.max(...t) - Math.min(...t),
            isFewUnique: new Set(t).size < .2 * t.length
          };
          let e = 0;
          for (let i = 0; i < t.length - 1; i++) t[i] > t[i + 1] && (n.isSorted = !1, e++), t[i] < t[i + 1] && (n.isReverseSorted = !1);
          return n.sortedDegree = 1 - e / (t.length * (t.length - 1) / 2), n.nearlySorted = n.sortedDegree > .8, n
        }
        recommendAlgorithm(t) {
          const n = [];
          t.isSorted ? (n.push({
            algorithm: "bubbleSort",
            reason: "数组已经是有序的，冒泡排序在这种情况下时间复杂度为O(n)",
            performance: "优秀",
            priority: 10
          }), n.push({
            algorithm: "insertionSort",
            reason: "数组已经是有序的，插入排序在这种情况下时间复杂度为O(n)",
            performance: "优秀",
            priority: 9
          })) : t.nearlySorted ? (n.push({
            algorithm: "insertionSort",
            reason: "数组近乎有序，插入排序对近乎有序的数据具有良好的性能",
            performance: "优秀",
            priority: 10
          }), n.push({
            algorithm: "bubbleSort",
            reason: "数组近乎有序，冒泡排序在这种情况下性能较好",
            performance: "良好",
            priority: 8
          })) : t.isReverseSorted ? (n.push({
            algorithm: "heapSort",
            reason: "数组是逆序的，堆排序对逆序数据具有稳定的O(n log n)性能",
            performance: "优秀",
            priority: 9
          }), n.push({
            algorithm: "quickSort",
            reason: "快速排序对逆序数据性能较好",
            performance: "良好",
            priority: 8
          })) : t.isFewUnique ? (n.push({
            algorithm: "countingSort",
            reason: "数组只有少数唯一值，计数排序可以在线性时间内完成排序",
            performance: "优秀",
            priority: 10
          }), n.push({
            algorithm: "radixSort",
            reason: "数组只有少数唯一值，基数排序可以在线性时间内完成排序",
            performance: "优秀",
            priority: 9
          })) : t.range < 1e3 && n.push({
            algorithm: "countingSort",
            reason: "数组范围较小，计数排序可以在线性时间内完成排序",
            performance: "优秀",
            priority: 9
          }), t.size < 20 ? (n.push({
            algorithm: "insertionSort",
            reason: "数组较小，插入排序实现简单且性能良好",
            performance: "优秀",
            priority: 8
          }), n.push({
            algorithm: "selectionSort",
            reason: "数组较小，选择排序实现简单",
            performance: "良好",
            priority: 7
          })) : t.size < 100 ? (n.push({
            algorithm: "quickSort",
            reason: "数组大小适中，快速排序平均性能优秀",
            performance: "优秀",
            priority: 9
          }), n.push({
            algorithm: "mergeSort",
            reason: "数组大小适中，归并排序具有稳定的O(n log n)性能",
            performance: "良好",
            priority: 8
          }), n.push({
            algorithm: "heapSort",
            reason: "数组大小适中，堆排序具有稳定的O(n log n)性能",
            performance: "良好",
            priority: 7
          })) : (n.push({
            algorithm: "quickSort",
            reason: "数组较大，快速排序平均性能优秀",
            performance: "优秀",
            priority: 10
          }), n.push({
            algorithm: "mergeSort",
            reason: "数组较大，归并排序具有稳定的O(n log n)性能",
            performance: "优秀",
            priority: 9
          }), n.push({
            algorithm: "heapSort",
            reason: "数组较大，堆排序具有稳定的O(n log n)性能且不需要额外空间",
            performance: "良好",
            priority: 8
          }));
          const e = [...new Map(n.map(t => [t.algorithm, t])).values()];
          return e.sort((t, n) => n.priority - t.priority), e.slice(0, 3)
        }
        displayRecommendations(t) {
          const algorithmRecommendationBox = document.getElementById("algorithm-recommendation");
          if (!algorithmRecommendationBox) return;
          if (0 === t.length) return void(algorithmRecommendationBox.innerHTML = '<p class="text-sm text-gray-600">无法生成算法推荐</p>');
          const e = {
            bubbleSort: "冒泡排序",
            selectionSort: "选择排序",
            insertionSort: "插入排序",
            quickSort: "快速排序",
            mergeSort: "归并排序",
            heapSort: "堆排序",
            shellSort: "希尔排序",
            countingSort: "计数排序",
            radixSort: "基数排序"
          };
          let i = '<div class="space-y-3">';
          t.forEach((t, n) => {
            const r = e[t.algorithm] || t.algorithm;
            i += `\n                <div class="bg-white p-2 rounded-md shadow-sm border border-gray-200">\n                    <div class="flex items-center justify-between">\n                        <h4 class="font-medium text-sm text-primary">\n                            ${n+1}. ${r}\n                        </h4>\n                        <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-${"优秀"===t.performance?"green":"blue"}-100 text-${"优秀"===t.performance?"green":"blue"}-700">\n                            ${t.performance}\n                        </span>\n                    </div>\n                    <p class="text-xs text-gray-600 mt-1">${t.reason}</p>\n                </div>\n            `
          }), i += "</div>", algorithmRecommendationBox.innerHTML = i
        }
        openCustomArrayModal() {
          this.customArrayModal && this.customArrayModalInput && (this.customArrayModalInput.value = "", this.customArrayModalError.classList.add("hidden"), this.customArrayModal.classList.remove("hidden"), this.customArrayModalInput.focus())
        }
        closeCustomArrayModal() {
          this.customArrayModal && this.customArrayModal.classList.add("hidden")
        }
        applyCustomArrayFromModal() {
          if (!this.customArrayModalInput || !this.customArrayModalError) return;
          const t = this.customArrayModalInput.value,
            n = this.validateCustomArray(t);
          if (!n.valid) return this.customArrayModalError.textContent = n.message, void this.customArrayModalError.classList.remove("hidden");
          this.customArrayModalError.classList.add("hidden"), this.array = n.numbers, this.arraySize = this.array.length, this.initialArray = [...this.array], this.arraySizeSlider.value = this.arraySize, this.arraySizeValue.textContent = this.arraySize, this.currentArraySizeEl.textContent = this.arraySize, this.comparisonCount = 0, this.swapCount = 0, this.currentStep = -1, this.updateCounters(), this.resetPerformanceData(), this.startSortBtn.disabled = !1, this.newArrayBtn.disabled = !1, this.arraySizeSlider.disabled = !1, this.pauseSortBtn.disabled = !0, this.pauseSortBtn.innerHTML = '<i class="fa fa-pause"></i> 暂停', historyCache.setCurrent(this.array, this.currentAlgorithm), this.preGeneratedHistory = historyCache.generateCurrentHistory(), this.sortHistory = this.preGeneratedHistory.history, this.updateStepButtons(), this.renderArray();
          const algorithmLogBox = document.getElementById("algorithm-log");
          algorithmLogBox && (algorithmLogBox.innerHTML = ""), this.closeCustomArrayModal()
        }
        startPerformanceTracking() {
          this.resetPerformanceData(), this.startTime = Date.now(), this.chartUpdateInterval = setInterval(() => {
            this.updatePerformanceData()
          }, 1e3)
        }
        stopPerformanceTracking() {
          this.chartUpdateInterval && (clearInterval(this.chartUpdateInterval), this.chartUpdateInterval = null), this.updatePerformanceData()
        }
        updatePerformanceData() {
          if (!this.startTime || !this.performanceChart) return;
          const t = (Date.now() - this.startTime) / 1e3;
          this.performanceData.time.push(t), this.performanceData.comparisons.push(this.comparisonCount), this.performanceData.swaps.push(this.swapCount), this.performanceChart.data.labels = this.performanceData.time, this.performanceChart.data.datasets[0].data = this.performanceData.comparisons, this.performanceChart.data.datasets[1].data = this.performanceData.swaps, this.performanceChart.update("none")
        }
        setupEventListeners() {
          document.querySelectorAll('a[href^="#"]').forEach(t => {
            t.addEventListener("click", function(t) {
              t.preventDefault();
              const n = this.getAttribute("href");
              let e;
              if ("#algorithm-principle" === n || "#complexity-analysis" === n || "#application-scenarios" === n) {
                const t = document.querySelectorAll(".algorithm-explanation:not(.hidden)");
                for (const i of t) {
                  const t = i.querySelector(n);
                  if (t) {
                    e = t;
                    break
                  }
                }
              } else e = document.querySelector(n);
              if (e) {
                const t = document.querySelector("header").offsetHeight,
                  n = e.offsetTop - t;
                window.scrollTo({
                  top: n,
                  behavior: "smooth"
                });
                const i = document.getElementById("mobile-menu");
                i && i.classList.add("hidden")
              }
            })
          }), this.arraySizeSlider && this.arraySizeValue && (this.arraySizeSlider.value = this.arraySize, this.arraySizeValue.textContent = this.arraySize, this.sortSpeed = Math.min(5 * this.arraySize, 250), this.sortSpeedSlider.value = this.sortSpeed, this.sortSpeedValue.textContent = this.sortSpeed, this.arraySizeSlider.addEventListener("input", t => {
            this.isSorting || (this.arraySize = parseInt(t.target.value), this.arraySizeValue.textContent = this.arraySize, this.currentArraySizeEl.textContent = this.arraySize, this.sortSpeed = Math.min(5 * this.arraySize, 250), this.sortSpeedSlider.value = this.sortSpeed, this.sortSpeedValue.textContent = this.sortSpeed, this.createNewArray())
          })), this.sortSpeedSlider && this.sortSpeedValue && (this.sortSpeedSlider.value = this.sortSpeed, this.sortSpeedValue.textContent = this.sortSpeed, this.sortSpeedSlider.addEventListener("input", t => {
            this.sortSpeed = parseInt(t.target.value), this.sortSpeedValue.textContent = this.sortSpeed
          }));
          const generateShareLinkBtn = document.getElementById("generate-share-link"),
            shareLinkInput = document.getElementById("share-link");
          generateShareLinkBtn && shareLinkInput && generateShareLinkBtn.addEventListener("click", () => {
            const t = {
                algorithm: this.currentAlgorithm,
                array: this.array,
                arraySize: this.arraySize,
                sortSpeed: this.sortSpeed
              },
              e = btoa(JSON.stringify(t)),
              i = `${window.location.origin}${window.location.pathname}?share=${e}`;
            shareLinkInput.value = i, shareLinkInput.select(), document.execCommand("copy"), alert("分享链接已复制到剪贴板！")
          });
          const exportAsVideoBtn = document.getElementById("export-as-video");
          exportAsVideoBtn && exportAsVideoBtn.addEventListener("click", () => {
            alert("视频导出功能开发中...")
          });
          const exportAsGifBtn = document.getElementById("export-as-gif");
          exportAsGifBtn && exportAsGifBtn.addEventListener("click", () => {
            alert("GIF导出功能开发中...")
          });
          const shareToWeiboBtn = document.getElementById("share-to-weibo");
          shareToWeiboBtn && shareToWeiboBtn.addEventListener("click", () => {
            const t = `我在排序算法可视化工具中使用了${algorithmMeta[this.currentAlgorithm].name}，快来看看吧！`,
              n = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(t)}`;
            window.open(n, "_blank")
          });
          const shareToWechatBtn = document.getElementById("share-to-wechat");
          shareToWechatBtn && shareToWechatBtn.addEventListener("click", () => {
            alert("请使用微信扫描二维码分享")
          });
          const shareToTwitterBtn = document.getElementById("share-to-twitter");
          shareToTwitterBtn && shareToTwitterBtn.addEventListener("click", () => {
            const t = `I used ${algorithmMeta[this.currentAlgorithm].name} in the Sorting Algorithm Visualizer!`,
              n = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t)}`;
            window.open(n, "_blank")
          }), this.handleShareLink();
          const newArrayMenuBox = document.getElementById("new-array-menu");
          this.newArrayBtn.addEventListener("mouseenter", () => {
            newArrayMenuBox.classList.remove("hidden")
          }), this.newArrayBtn.addEventListener("mouseleave", t => {
            setTimeout(() => {
              newArrayMenuBox.matches(":hover") || newArrayMenuBox.classList.add("hidden")
            }, 100)
          }), newArrayMenuBox.addEventListener("mouseleave", () => {
            newArrayMenuBox.classList.add("hidden")
          }), newArrayMenuBox.querySelectorAll("button[data-array-type]").forEach(t => {
            t.addEventListener("click", t => {
              const n = t.target.getAttribute("data-array-type");
              "custom" === n ? this.openCustomArrayModal() : this.createNewArray(n), newArrayMenuBox.classList.add("hidden")
            })
          }), this.newArrayBtn.addEventListener("click", () => this.createNewArray()), this.startSortBtn.addEventListener("click", () => this.startSort()), this.pauseSortBtn.addEventListener("click", () => this.togglePause()), this.resetSortBtn.addEventListener("click", () => this.resetSort()), this.stepBackBtn.addEventListener("click", () => this.stepBack()), this.stepForwardBtn.addEventListener("click", () => this.stepForward()), this.cancelCustomArrayBtn && this.cancelCustomArrayBtn.addEventListener("click", () => {
            this.closeCustomArrayModal()
          }), this.confirmCustomArrayBtn && this.confirmCustomArrayBtn.addEventListener("click", () => {
            this.applyCustomArrayFromModal()
          }), this.customArrayModalInput && this.customArrayModalInput.addEventListener("keypress", t => {
            "Enter" === t.key && this.applyCustomArrayFromModal()
          }), this.customArrayModal && this.customArrayModal.addEventListener("click", t => {
            t.target === this.customArrayModal && this.closeCustomArrayModal()
          }), this.algorithmSelector.addEventListener("change", t => {
            const n = t.target.value;
            this.isSorting && !this.isPaused || (this.currentAlgorithm = n, this.updateAlgorithmContent(), this.mobileAlgorithmSelector.value = this.currentAlgorithm, this.isSorting && (this.isSorting = !1, this.isPaused = !1, this.animationId && (clearTimeout(this.animationId), this.animationId = null)), this.comparisonCount = 0, this.swapCount = 0, this.isStepping = !0, historyCache.setCurrent(this.array, this.currentAlgorithm), this.preGeneratedHistory = historyCache.generateCurrentHistory(), this.sortHistory = this.preGeneratedHistory.history, this.currentStep = -1, this.updateCounters(), this.renderArray(), this.startSortBtn.disabled = !1, this.pauseSortBtn.disabled = !0, this.pauseSortBtn.innerHTML = '<i class="fa fa-pause"></i> 暂停', this.updateStepButtons())
          }), this.mobileAlgorithmSelector.addEventListener("change", t => {
            const n = t.target.value;
            this.isSorting && !this.isPaused || (this.currentAlgorithm = n, this.updateAlgorithmContent(), this.algorithmSelector.value = this.currentAlgorithm, this.isSorting && (this.isSorting = !1, this.isPaused = !1, this.animationId && (clearTimeout(this.animationId), this.animationId = null)), this.comparisonCount = 0, this.swapCount = 0, this.isStepping = !0, historyCache.setCurrent(this.array, this.currentAlgorithm), this.preGeneratedHistory = historyCache.generateCurrentHistory(), this.sortHistory = this.preGeneratedHistory.history, this.currentStep = -1, this.updateCounters(), this.renderArray(), this.startSortBtn.disabled = !1, this.pauseSortBtn.disabled = !0, this.pauseSortBtn.innerHTML = '<i class="fa fa-pause"></i> 暂停', this.updateStepButtons())
          }), this.menuToggle && this.mobileMenu && this.menuToggle.addEventListener("click", () => {
            this.mobileMenu.classList.toggle("hidden")
          }), this.algorithmTabs.forEach(t => {
            t.addEventListener("click", () => {
              const n = t.getAttribute("data-algorithm");
              this.algorithmTabs.forEach(t => {
                t.classList.remove("border-primary", "text-primary"), t.classList.add("border-transparent", "text-gray-500")
              }), t.classList.remove("border-transparent", "text-gray-500"), t.classList.add("border-primary", "text-primary"), document.querySelectorAll(".algorithm-content").forEach(t => {
                t.getAttribute("data-algorithm") === n ? t.classList.remove("hidden") : t.classList.add("hidden")
              })
            })
          }), this.codeTabs.forEach(t => {
            t.addEventListener("click", () => {
              const n = t.getAttribute("data-lang");
              this.codeTabs.forEach(t => {
                t.classList.remove("border-primary", "text-primary"), t.classList.add("border-transparent", "text-gray-500")
              }), t.classList.remove("border-transparent", "text-gray-500"), t.classList.add("border-primary", "text-primary"), document.querySelectorAll(".algorithm-content:not(.hidden)").forEach(t => {
                t.querySelectorAll(".code-block").forEach(t => {
                  t.getAttribute("data-lang") === n ? t.classList.remove("hidden") : t.classList.add("hidden")
                })
              })
            })
          }), this.algorithmSelector.addEventListener("change", () => {
            this.comparisonManager.updateLeftAlgorithm(this.currentAlgorithm), this.explanationTabs.forEach(t => {
              t.classList.remove("border-primary", "text-primary"), t.classList.add("border-transparent", "text-gray-500")
            });
            const t = this.comparisonManager.leftAlgorithm,
              n = document.querySelector(`.explanation-tab[data-algorithm="${t}"]`);
            n && (n.classList.remove("border-transparent", "text-gray-500"), n.classList.add("border-primary", "text-primary"))
          }), this.explanationTabs.forEach(t => {
            t.addEventListener("click", () => {
              const n = t.getAttribute("data-algorithm"),
                e = this.comparisonManager.leftAlgorithm,
                i = this.comparisonManager.rightAlgorithm;
              this.comparisonManager.comparisonMode && n === i ? this.comparisonManager.switchToSingle() : n === e || this.comparisonManager.updateRightAlgorithm(n), this.explanationTabs.forEach(t => {
                t.classList.remove("border-primary", "text-primary"), t.classList.add("border-transparent", "text-gray-500")
              });
              const r = this.comparisonManager.leftAlgorithm,
                a = document.querySelector(`.explanation-tab[data-algorithm="${r}"]`);
              if (a && (a.classList.remove("border-transparent", "text-gray-500"), a.classList.add("border-primary", "text-primary")), this.comparisonManager.comparisonMode) {
                const t = this.comparisonManager.rightAlgorithm,
                  n = document.querySelector(`.explanation-tab[data-algorithm="${t}"]`);
                n && (n.classList.remove("border-transparent", "text-gray-500"), n.classList.add("border-primary", "text-primary"))
              }
            })
          }), this.displayStyleRadios.forEach(t => {
            t.addEventListener("change", t => {
              this.isSorting || (this.displayStyle = t.target.value, this.renderArray())
            })
          });
          const clearLogBtn = document.getElementById("clear-log");
          clearLogBtn && clearLogBtn.addEventListener("click", () => {
            const t = document.getElementById("algorithm-log");
            t && (t.innerHTML = "")
          }), window.addEventListener("scroll", () => {
            const t = document.querySelector("header");
            window.scrollY > 10 ? (t.classList.add("py-2", "shadow"), t.classList.remove("py-4")) : (t.classList.add("py-4"), t.classList.remove("py-2", "shadow"))
          }), this.applyCustomArrayBtn && this.applyCustomArrayBtn.addEventListener("click", () => {
            this.applyCustomArray()
          }), this.clearCustomArrayBtn && this.clearCustomArrayBtn.addEventListener("click", () => {
            this.clearCustomArray()
          }), this.customArrayInput && this.customArrayInput.addEventListener("keypress", t => {
            "Enter" === t.key && this.applyCustomArray()
          });
          const generateDocumentHtmlBtn = document.getElementById("generate-document-html");
          generateDocumentHtmlBtn && generateDocumentHtmlBtn.addEventListener("click", () => {
            this.generateExplanatoryDocument("html")
          });
          const generateDocumentMdBtn = document.getElementById("generate-document-md");
          generateDocumentMdBtn && generateDocumentMdBtn.addEventListener("click", () => {
            this.generateExplanatoryDocument("markdown")
          });
          const exportDataBtn = document.getElementById("export-data");
          exportDataBtn && exportDataBtn.addEventListener("click", () => {
            this.exportData()
          }), document.addEventListener("keydown", t => {
            if ("INPUT" !== t.target.tagName && "TEXTAREA" !== t.target.tagName && !this.isCompetitionMode) switch (t.key) {
              case " ":
                t.preventDefault(), this.isSorting ? this.togglePause() : this.startSort();
                break;
              case "ArrowRight":
                (this.isPaused || this.isStepping) && this.stepForward();
                break;
              case "ArrowLeft":
                (this.isPaused || this.isStepping) && this.stepBack();
                break;
              case "r":
              case "R":
                this.resetSort();
                break;
              case "n":
              case "N":
                this.createNewArray()
            }
          }), this.toggle2DBtn && this.toggle2DBtn.addEventListener("click", () => {
            this.switchTo2D()
          }), this.toggle3DBtn && this.toggle3DBtn.addEventListener("click", () => {
            this.switchTo3D()
          })
        }
        createNewArray(t = "random") {
          switch (this.resetSort(), this.array = [], t) {
            case "sorted":
              for (let i = 0; i < this.arraySize; i++) this.array.push(5 * i + 1);
              break;
            case "reverse":
              for (let i = this.arraySize; i > 0; i--) this.array.push(5 * i + 1);
              break;
            case "nearly-sorted":
              for (let i = 0; i < this.arraySize; i++) this.array.push(5 * i + 1);
              const t = Math.max(1, Math.floor(.1 * this.arraySize));
              for (let i = 0; i < t; i++) {
                const t = Math.floor(Math.random() * this.arraySize),
                  n = Math.floor(Math.random() * this.arraySize);
                [this.array[t], this.array[n]] = [this.array[n], this.array[t]]
              }
              break;
            case "few-unique":
              const n = [10, 20, 30, 40, 50];
              for (let i = 0; i < this.arraySize; i++) this.array.push(n[Math.floor(Math.random() * n.length)]);
              break;
            case "constant":
              const e = 50;
              for (let i = 0; i < this.arraySize; i++) this.array.push(e);
              break;
            case "alternating":
              for (let i = 0; i < this.arraySize; i++) this.array.push(i % 2 == 0 ? 20 : 80);
              break;
            default:
              for (let i = 0; i < this.arraySize; i++) this.array.push(Math.floor(100 * Math.random()) + 1)
          }
          this.initialArray = [...this.array], historyCache.setCurrent(this.array, this.currentAlgorithm), this.preGeneratedHistory = historyCache.generateCurrentHistory(), this.sortHistory = this.preGeneratedHistory.history, this.currentStep = -1, this.renderArray(), this.currentArraySizeEl.textContent = this.arraySize;
          const n = document.getElementById("algorithm-log");
          n && (n.innerHTML = "");
          const e = this.analyzeArrayFeatures(this.array),
            i = this.recommendAlgorithm(e);
          "function" == typeof this.displayRecommendations && this.displayRecommendations(i)
        }
        renderArray(t = [], n = [], e = -1) {
          var i;
          if (this.is3DMode && this.visualization3D) return void this.visualization3D.renderArray(this.array, t, n);
          this.animationDuration = Math.max(500, this.animationDuration || 500), this.animationIntensity = this.animationIntensity || 1, this.barsContainer.style.position = "relative", this.barsContainer.style.overflowX = "auto", this.barsContainer.style.overflowY = "visible", this.barsContainer.style.whiteSpace = "nowrap";
          const r = this.barsContainer.clientWidth || (null == (i = this.visualizationContainer) ? void 0 : i.clientWidth) || .8 * window.innerWidth,
            a = Math.max(2, (r - 1 * this.arraySize) / this.arraySize),
            s = this.array.length > 0 ? Math.max(...this.array) : 100,
            o = this.array.length > 0 ? this.array : [50, 30, 80, 60, 20, 40, 70, 10, 90, 5],
            l = Math.max(0, this.barsContainer.clientHeight) - 16,
            d = .95 * Math.max(0, l - 24),
            c = this.barsContainer.querySelectorAll(".flex.flex-col.items-center.w-full"),
            p = new Map;
          c.forEach((t, n) => {
            p.set(n, t)
          }), this.barsContainer.innerHTML = "", o.forEach((i, r) => {
            this.createBarElement(r, i, o, a, d, s, t, n, e)
          });
          const m = this.currentAlgorithm.replace("Sort", "").toLowerCase();
          if (["quick", "merge", "heap"].includes(m) && e >= 0 && (this.array.length > 0 ? e < this.array.length : e < o.length)) {
            const t = this.array.length > 0 ? this.array[e] : o[e % o.length],
              n = s > 0 ? t / s * d : 0,
              i = 24,
              r = 8,
              a = this.barsContainer.clientHeight - r - i - n;
            let l = this.barsContainer.querySelector(".pivot-dash-line"),
              c = this.barsContainer.querySelector(".pivot-dash-label");
            l || (l = document.createElement("div"), l.className = "pivot-dash-line absolute left-0 right-0 pointer-events-none", l.style.borderTop = "2px dashed #9333ea", l.style.zIndex = "5", this.barsContainer.appendChild(l)), c || (c = document.createElement("div"), c.className = "pivot-dash-label absolute left-0 transform -translate-y-1/2 bg-white px-2 py-1 rounded text-xs font-medium text-purple-600 shadow-sm", c.style.left = "12px", c.style.zIndex = "6", this.barsContainer.appendChild(c)), l.style.top = `${a}px`, c.style.top = `${a}px`, c.textContent = `基准值: ${t}`
          } else {
            const t = this.barsContainer.querySelector(".pivot-dash-line"),
              n = this.barsContainer.querySelector(".pivot-dash-label");
            t && t.remove(), n && n.remove()
          }
          if (t && t.length > 0) {
            const n = t[0],
              e = this.barsContainer.querySelectorAll(".flex.flex-col.items-center.w-full");
            if (e[n]) {
              const t = e[n].getBoundingClientRect(),
                i = this.barsContainer.getBoundingClientRect(),
                r = t.left - i.left + this.barsContainer.scrollLeft - i.width / 2 + t.width / 2;
              this.barsContainer.scrollTo({
                left: r,
                behavior: "smooth"
              })
            }
          }
        }
        createBarElement(t, n, e, i, r, a, s, o, l) {
          const d = a > 0 ? n / a * r : 0,
            c = (this.array.length, t),
            p = document.createElement("div");
          p.className = "flex flex-col items-center w-full", p.style.width = `${i}px`;
          const m = document.createElement("div");
          m.className = "flex flex-col items-center w-full flex-1";
          const h = document.createElement("div");
          h.className = "bar-shadow w-full", h.style.borderRadius = "4px 4px 0 0", h.style.height = `${d}px`, h.style.transform = "scaleY(1)", h.style.transformOrigin = "bottom", h.style.opacity = "1", this.setBarColor(h, c, n, e, s, o, l);
          const g = document.createElement("div");
          g.className = "absolute text-xs -translate-y-full -mb-1 text-gray-600 font-medium", g.textContent = n, g.style.zIndex = "10", g.style.opacity = "1";
          const u = document.createElement("div");
          u.className = "w-full bg-gray-100 rounded-sm p-1 flex items-center justify-center", u.style.height = "24px";
          const x = document.createElement("div");
          x.className = "text-gray-600 whitespace-nowrap", x.textContent = t, x.style.fontSize = "10px", x.style.fontWeight = "500", x.style.lineHeight = "1", this.addDragAndDropEvents(h, t, n), u.appendChild(x), m.appendChild(h), m.appendChild(g), p.appendChild(m), p.appendChild(u), this.barsContainer.appendChild(p)
        }
        updateBarElement(t, n, e, i, r, a, s, o, l, d) {
          const c = s > 0 ? e / s * a : 0,
            p = (this.array.length, n),
            m = t.querySelector(".flex.flex-col.items-center.w-full.flex-1");
          if (!m) return t.remove(), void this.createBarElement(n, e, i, r, a, s, o, l, d);
          const h = m.querySelector(".bar-shadow"),
            g = m.querySelector(".absolute.text-xs.-translate-y-full.-mb-1.text-gray-600.font-medium");
          if (!h || !g) return t.remove(), void this.createBarElement(n, e, i, r, a, s, o, l, d);
          t.style.width = `${r}px`, h.style.transformOrigin = "bottom", h.style.height = `${c}px`, this.setBarColor(h, p, e, i, o, l, d), g.textContent = e, g.style.opacity = "1"
        }
        setBarColor(t, n, e, i, r, a, s) {
          if (t.style.transformOrigin = "bottom", t.style.transition = "none", a.includes(n)) t.style.backgroundColor = "#10b981", t.style.zIndex = "1", t.style.transform = "scaleY(1)";
          else if (n === s) t.style.backgroundColor = "#9333ea", t.style.zIndex = "5", t.style.transform = "scaleY(1)", this.lastPivotIndex = n, this.lastPivotValue = e;
          else if (n === this.lastPivotIndex) t.style.backgroundColor = "#9333ea", t.style.zIndex = "5", t.style.transform = "scaleY(1)";
          else if (r.includes(n))
            if (2 === r.length) {
              const a = r[0] === n ? r[1] : r[0];
              (this.array[n] || e) > (this.array[a] || i[a % i.length]) ? (t.style.backgroundColor = "#165DFF", t.style.zIndex = "10", t.style.transform = "scaleY(1)") : (t.style.backgroundColor = "#f97316", t.style.zIndex = "1", t.style.transform = "scaleY(1)")
            } else t.style.backgroundColor = "#f97316", t.style.zIndex = "1", t.style.transform = "scaleY(1)";
          else t.style.backgroundColor = "#64748b", t.style.zIndex = "1", t.style.transform = "scaleY(1)"
        }
        addDragAndDropEvents(t, n, e) {
          t.draggable = !0, t.addEventListener("dragstart", e => {
            this.isSorting ? e.preventDefault() : (e.dataTransfer.setData("text/plain", n), t.style.opacity = "0.5", t.style.cursor = "grabbing")
          }), t.addEventListener("dragend", () => {
            t.style.opacity = "1", t.style.cursor = "grab"
          }), t.addEventListener("dragenter", n => {
            this.isSorting || (n.preventDefault(), t.style.border = "2px dashed #165DFF")
          }), t.addEventListener("dragleave", () => {
            t.style.border = ""
          }), t.addEventListener("dragover", t => {
            this.isSorting || t.preventDefault()
          }), t.addEventListener("drop", e => {
            if (!this.isSorting) {
              e.preventDefault(), t.style.border = "";
              const i = parseInt(e.dataTransfer.getData("text/plain")),
                r = n;
              [this.array[i], this.array[r]] = [this.array[r], this.array[i]], this.initialArray = [...this.array], this.renderArray(), historyCache.setCurrent(this.array, this.currentAlgorithm), this.preGeneratedHistory = historyCache.generateCurrentHistory(), this.sortHistory = this.preGeneratedHistory.history, this.currentStep = -1;
              const a = document.getElementById("algorithm-log");
              a && (a.innerHTML = "")
            }
          }), t.addEventListener("mouseenter", () => {
            this.isSorting || (t.style.cursor = "grab", t.style.transform = "scaleY(1.1)", t.style.transition = "transform 150ms ease-out")
          }), t.addEventListener("mouseleave", () => {
            this.isSorting || (t.style.transform = "scaleY(1)", t.style.transition = "transform 150ms ease-out")
          })
        }
        updateAlgorithmContent() {
          const t = algorithmMeta[this.currentAlgorithm].name;
          this.currentAlgorithmDisplay.textContent = t;
          const algorithmNameTagText = document.getElementById("algorithm-name-tag");
          if (algorithmNameTagText && (algorithmNameTagText.textContent = t), this.competitionManager.competitionMode ? this.competitionManager.updateAlgorithmInstance(0, this.currentAlgorithm.replace("Sort", "").toLowerCase()) : this.competitionManager.switchToSingle(), this.explanationTabs.forEach(t => {
              t.classList.remove("border-primary", "text-primary"), t.classList.add("border-transparent", "text-gray-500")
            }), this.competitionManager.competitionMode) this.competitionManager.getAlgorithmInstances().forEach((t, n) => {
            const e = document.querySelector(`.explanation-tab[data-algorithm="${t.algorithmName}"]`);
            e && (e.classList.remove("border-transparent", "text-gray-500"), e.classList.add("border-primary", "text-primary"))
          });
          else {
            const t = this.currentAlgorithm.replace("Sort", "").toLowerCase(),
              n = document.querySelector(`.explanation-tab[data-algorithm="${t}"]`);
            n && (n.classList.remove("border-transparent", "text-gray-500"), n.classList.add("border-primary", "text-primary"))
          }
        }
        highlightComparisonTable() {
          this.competitionManager.highlightComparisonTable()
        }
        startSort() {
          this.isSorting && this.isPaused ? (this.isPaused = !1, this.isStepping = !1, this.pauseSortBtn.innerHTML = '<i class="fa fa-pause"></i> 暂停', this.stepBackBtn.disabled = !0, this.stepForwardBtn.disabled = !0, null === this.chartUpdateInterval && this.startPerformanceTracking(), this.playFromCurrentStep()) : this.isSorting || (this.isSorting = !0, this.isPaused = !1, this.isStepping = !1, this.currentStep = -1, this.preGeneratedHistory && historyCache.getCurrentHistory() !== this.preGeneratedHistory && (this.preGeneratedHistory = historyCache.generateCurrentHistory(), this.sortHistory = this.preGeneratedHistory.history, this.currentStep = -1), this.startPerformanceTracking(), this.updateCounters(), this.startSortBtn.disabled = !0, this.newArrayBtn.disabled = !0, this.arraySizeSlider.disabled = !0, this.pauseSortBtn.disabled = !1, this.pauseSortBtn.innerHTML = '<i class="fa fa-pause"></i> 暂停', this.stepBackBtn.disabled = !0, this.stepForwardBtn.disabled = !0, this.playFromCurrentStep())
        }
        playFromCurrentStep() {
          if (this.isSorting && !this.isPaused && this.currentStep < this.sortHistory.length - 1) {
            this.currentStep++, this.restoreStep(this.sortHistory[this.currentStep]);
            const t = 1e3 / this.sortSpeed;
            this.animationId = setTimeout(() => this.playFromCurrentStep(), t)
          } else this.currentStep >= this.sortHistory.length - 1 && (this.isSorting = !1, this.stopPerformanceTracking(), this.startSortBtn.disabled = !1, this.newArrayBtn.disabled = !1, this.arraySizeSlider.disabled = !1, this.pauseSortBtn.disabled = !0, this.stepBackBtn.disabled = this.sortHistory.length <= 0, this.stepForwardBtn.disabled = this.sortHistory.length <= 0 || this.currentStep >= this.sortHistory.length - 1)
        }
        togglePause() {
          this.isSorting && (this.isPaused ? (this.isPaused = !1, this.isStepping = !1, this.pauseSortBtn.innerHTML = '<i class="fa fa-pause"></i> 暂停', this.stepBackBtn.disabled = !0, this.stepForwardBtn.disabled = !0, null === this.chartUpdateInterval && this.startPerformanceTracking(), this.playFromCurrentStep()) : (this.isPaused = !0, this.isStepping = !0, this.pauseSortBtn.innerHTML = '<i class="fa fa-play"></i> 继续', this.stepBackBtn.disabled = !1, this.stepForwardBtn.disabled = !1, this.animationId && (clearTimeout(this.animationId), this.animationId = null), this.stopPerformanceTracking()))
        }
        stepForward() {
          this.currentStep < this.sortHistory.length - 1 && (this.currentStep++, this.restoreStep(this.sortHistory[this.currentStep]))
        }
        stepBack() {
          this.currentStep > 0 && (this.currentStep--, this.restoreStep(this.sortHistory[this.currentStep]))
        }
        resetSort() {
          this.isSorting && (this.isSorting = !1, this.isPaused = !1, this.isStepping = !1, this.animationId && (clearTimeout(this.animationId), this.animationId = null), this.stopPerformanceTracking()), this.initialArray && (this.array = [...this.initialArray]), this.comparisonCount = 0, this.swapCount = 0, this.currentStep = -1, this.updateCounters(), this.resetPerformanceData(), this.startSortBtn.disabled = !1, this.newArrayBtn.disabled = !1, this.arraySizeSlider.disabled = !1, this.pauseSortBtn.disabled = !0, this.pauseSortBtn.innerHTML = '<i class="fa fa-pause"></i> 暂停', historyCache.setCurrent(this.array, this.currentAlgorithm), this.preGeneratedHistory = historyCache.generateCurrentHistory(), this.sortHistory = this.preGeneratedHistory.history, this.currentStep = -1, this.updateStepButtons(), this.renderArray();
          const algorithmLogBox = document.getElementById("algorithm-log");
          algorithmLogBox && (algorithmLogBox.innerHTML = "")
        }
        handleShareLink() {
          const t = new URLSearchParams(window.location.search).get("share");
          if (t) try {
            const n = atob(t),
              e = JSON.parse(n);
            if (e.algorithm && (this.currentAlgorithm = e.algorithm, this.algorithmSelector.value = this.currentAlgorithm, this.mobileAlgorithmSelector.value = this.currentAlgorithm, this.updateAlgorithmContent()), e.array && (this.array = e.array, this.initialArray = [...this.array], this.arraySize = this.array.length, this.arraySizeSlider.value = this.arraySize, this.arraySizeValue.textContent = this.arraySize, this.currentArraySizeEl.textContent = this.arraySize), e.sortSpeed && (this.sortSpeed = e.sortSpeed, this.sortSpeedSlider.value = this.sortSpeed, this.sortSpeedValue.textContent = this.sortSpeed), e.animationDuration) {
              this.animationDuration = e.animationDuration;
              const t = document.getElementById("animation-speed"),
                n = document.getElementById("animation-speed-value");
              t && n && (t.value = this.animationDuration, n.textContent = `${this.animationDuration}ms`)
            }
            if (e.animationIntensity) {
              this.animationIntensity = e.animationIntensity;
              const t = document.getElementById("animation-intensity"),
                n = document.getElementById("animation-intensity-value");
              t && n && (t.value = this.animationIntensity, n.textContent = this.animationIntensity)
            }
            this.renderArray(), historyCache.setCurrent(this.array, this.currentAlgorithm), this.preGeneratedHistory = historyCache.generateCurrentHistory(), this.sortHistory = this.preGeneratedHistory.history, this.currentStep = -1, this.updateStepButtons();
            const i = document.getElementById("algorithm-log");
            i && (i.innerHTML = "");
            const r = this.analyzeArrayFeatures(this.array),
              a = this.recommendAlgorithm(r);
            "function" == typeof this.displayRecommendations && this.displayRecommendations(a)
          } catch (n) {
            console.error("处理分享链接时出错:", n), alert("分享链接无效或已过期")
          }
        }
        restoreStep(t) {
          this.array = [...t.array], this.comparisonCount = t.comparisonCount, this.swapCount = t.swapCount, window.currentAlgorithm = t.algorithm, window.currentI = t.indices.i, window.currentJ = t.indices.j, window.currentLow = t.indices.low, window.currentHigh = t.indices.high, this.updateCounters(), this.renderArray(t.highlightIndices, t.sortedIndices, t.pivotIndex || -1), this.updateStepButtons(), this.updateLog(t), this.updateStepExplanation(t), this.saveStepToDocument(t)
        }
        saveStepToDocument(t) {
          const stepExplanationText = document.getElementById("step-explanation");
          if (!stepExplanationText) return;
          const e = stepExplanationText.textContent.trim();
          0 === this.currentStep && this.explanatoryDocument.init(algorithmMeta[this.currentAlgorithm].name), this.explanatoryDocument.addStep(this.currentStep + 1, e, [...this.logBuffer]), this.logBuffer = []
        }
        generateExplanatoryDocument(t = "html") {
          this.explanatoryDocument.complete({
            comparisonCount: this.comparisonCount,
            swapCount: this.swapCount,
            totalSteps: this.sortHistory.length
          });
          const n = this.explanatoryDocument.saveDocument(t);
          return alert(`解释文档已生成并下载：${n}`), n
        }
        exportData() {
          const t = document.querySelector('input[name="export-format"]:checked').value,
            n = Array.from(document.querySelectorAll('input[name="export-content"]:checked')).map(t => t.value),
            e = {
              timestamp: (new Date).toISOString(),
              algorithm: this.currentAlgorithm,
              arraySize: this.arraySize,
              initialArray: this.initialArray,
              finalArray: [...this.array].sort((t, n) => t - n),
              comparisonCount: this.comparisonCount,
              swapCount: this.swapCount,
              executionTime: this.getExecutionTime(),
              performanceData: this.performanceData,
              sortingHistory: this.sortHistory
            };
          switch (t) {
            case "json":
              this.exportAsJSON(e, n);
              break;
            case "csv":
              this.exportAsCSV(e, n);
              break;
            case "image":
              this.exportAsImage();
              break;
            default:
              console.error("不支持的导出格式:", t)
          }
        }
        exportAsJSON(t, n) {
          const e = this.filterExportData(t, n),
            i = JSON.stringify(e, null, 2);
          this.downloadFile(i, `${this.currentAlgorithm}-${(new Date).toISOString().slice(0,10)}.json`, "application/json")
        }
        exportAsCSV(t, n) {
          let e = "";
          if (n.includes("performance-data")) {
            e += "时间,比较次数,交换次数\n";
            for (let n = 0; n < t.performanceData.time.length; n++) e += `${t.performanceData.time[n]},${t.performanceData.comparisons[n]},${t.performanceData.swaps[n]}\n`
          }
          n.includes("algorithm-info") && (e += "\n算法,数组大小,比较次数,交换次数,执行时间\n", e += `${t.algorithm},${t.arraySize},${t.comparisonCount},${t.swapCount},${t.executionTime}\n`), n.includes("sorting-process") && (e += "\n步骤类型,数组状态\n", t.sortingHistory.forEach((t, n) => {
            e += `${t.type},${t.array.join(",")}\n`
          })), this.downloadFile(e, `${this.currentAlgorithm}-${(new Date).toISOString().slice(0,10)}.csv`, "text/csv")
        }
        exportAsImage() {
          const t = document.createElement("canvas"),
            visualizationContainerEl = document.getElementById("visualization-container");
          if (!visualizationContainerEl) return;
          const e = visualizationContainerEl.getBoundingClientRect();
          t.width = e.width, t.height = e.height;
          const i = t.getContext("2d");
          i.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-background"), i.fillRect(0, 0, t.width, t.height);
          const barsContainerEl = document.getElementById("bars-container");
          barsContainerEl && barsContainerEl.querySelectorAll(".bar").forEach(t => {
            const n = t.getBoundingClientRect(),
              r = n.left - e.left,
              a = n.top - e.top;
            i.fillStyle = t.style.backgroundColor, i.fillRect(r, a, n.width, n.height), i.strokeStyle = t.style.borderColor || "transparent", i.lineWidth = 1, i.strokeRect(r, a, n.width, n.height)
          });
          const a = t.toDataURL("image/png");
          this.downloadImage(a, `${this.currentAlgorithm}-visualization-${(new Date).toISOString().slice(0,10)}.png`)
        }
        filterExportData(t, n) {
          const e = {};
          return n.includes("algorithm-info") && (e.algorithm = t.algorithm, e.arraySize = t.arraySize, e.initialArray = t.initialArray, e.finalArray = t.finalArray, e.comparisonCount = t.comparisonCount, e.swapCount = t.swapCount, e.executionTime = t.executionTime), n.includes("performance-data") && (e.performanceData = t.performanceData), n.includes("sorting-process") && (e.sortingHistory = t.sortingHistory), e
        }
        downloadFile(t, n, e) {
          const i = new Blob([t], {
              type: e
            }),
            r = URL.createObjectURL(i),
            a = document.createElement("a");
          a.href = r, a.download = n, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(r)
        }
        downloadImage(t, n) {
          const e = document.createElement("a");
          e.href = t, e.download = n, document.body.appendChild(e), e.click(), document.body.removeChild(e)
        }
        updateStepExplanation(t) {
          var n;
          if (!this.stepExplanationEl || !this.stepNumberEl) return;
          this.stepNumberEl.textContent = `步骤: ${this.currentStep+1}`;
          const e = null == (n = algorithmMeta[this.currentAlgorithm]) ? void 0 : n.stepExplanations;
          if (!e) return this.currentStepExplanation = "当前算法暂不支持步骤解释。", void(this.stepExplanationEl.textContent = this.currentStepExplanation);
          let i = "";
          const r = this.currentAlgorithm.replace("Sort", "").toLowerCase();
          if (-1 !== this.currentStep && t)
            if (this.currentStep === this.sortHistory.length - 1 || t.sortedIndices.length === t.array.length) i = e.complete || "排序完成，所有元素都已按升序排列。";
            else {
              let n = "";
              if ("quick" === r && t.pivotIndex >= 0) {
                const e = this.currentStep > 0 ? this.sortHistory[this.currentStep - 1] : null;
                e && e.pivotIndex === t.pivotIndex || (n = "selectPivot")
              } else if ("heap" === r && t.highlightIndices.length > 0) n = "buildHeap";
              else if ("merge" === r && 3 === t.highlightIndices.length) n = "merge";
              else if ("counting" === r) t.highlightIndices.length >= 2 && t.highlightIndices.includes(0) ? n = "findRange" : t.highlightIndices.length > 0 && t.countArray ? n = "countOccurrences" : !t.highlightIndices.length && t.countArray ? n = "calculatePrefixSum" : 2 === t.highlightIndices.length && (n = "buildOutput");
              else if ("radix" === r && 1 === t.highlightIndices.length) n = "sortByDigit";
              else if (0 === t.highlightIndices.length) n = "roundComplete";
              else if ("selection" === r && 1 === t.highlightIndices.length) n = "selectMin";
              else if ("insertion" === r && 1 === t.highlightIndices.length) n = "selectKey";
              else if (t.highlightIndices.length >= 2) {
                const e = this.currentStep > 0 ? this.sortHistory[this.currentStep - 1] : null;
                n = e && JSON.stringify(e.array) !== JSON.stringify(t.array) ? "swap" : "compare"
              } else n = "default";
              if (i = e[n] || e.default || "执行排序操作。", "swap" === n && t.highlightIndices.length >= 2) {
                const [n, e] = t.highlightIndices;
                i = i.replace("{{i}}", n).replace("{{j}}", e), i = i.replace("{{value_i}}", t.array[n]).replace("{{value_j}}", t.array[e]);
                const r = this.currentStep > 0 ? this.sortHistory[this.currentStep - 1] : null;
                r && (i += ` 具体变化：${r.array[n]}(arr[${n}])<->${r.array[e]}(arr[${e}])`)
              }
              if ("compare" === n && t.highlightIndices.length >= 2) {
                const [n, e] = t.highlightIndices;
                if (i = i.replace("{{i}}", n).replace("{{j}}", e), i = i.replace("{{value_i}}", t.array[n]).replace("{{value_j}}", t.array[e]), i += ` 比较结果：${t.array[n]} ${t.array[n]>t.array[e]?">":t.array[n]<t.array[e]?"<":"="} ${t.array[e]}`, "quick" === r && t.pivotIndex >= 0) {
                  const n = t.array[t.pivotIndex];
                  i = i.replace("{{pivot}}", n), i = i.replace("{{pivotIndex}}", t.pivotIndex), i += ` （与基准值 ${n} 比较）`
                }
              }
              if ("selectPivot" === n && t.pivotIndex >= 0 && (i = i.replace("{{pivot}}", t.array[t.pivotIndex]), i = i.replace("{{pivotIndex}}", t.pivotIndex), i += ` 选择原因：在当前分区 [${t.indices.low}, ${t.indices.high}] 中选择一个基准元素，用于将数组分为两部分`), "selectMin" === n) {
                const n = t.highlightIndices[0];
                i += ` 当前最小值：${t.array[n]}（位置 ${n}）`
              }
              if ("selectKey" === n) {
                const n = t.highlightIndices[0];
                i += ` 关键字：${t.array[n]}（位置 ${n}），将插入到已排序区间`
              }
            }
          else i = e.initial || "初始状态：数组尚未开始排序。";
          i = i.replace(/arr\[j\]/g, `arr[${t.indices.j}]`), i = i.replace(/arr\[j\+1\]/g, `arr[${t.indices.j+1}]`), i = i.replace(/arr\[i\]/g, `arr[${t.indices.i}]`), i = i.replace(/arr\[i\+1\]/g, `arr[${t.indices.i+1}]`), i = i.replace("{{i}}", t.indices.i).replace("{{j}}", t.indices.j), i = i.replace("{{i+1}}", t.indices.i + 1).replace("{{j+1}}", t.indices.j + 1), i = i.replace("{{low}}", t.indices.low).replace("{{high}}", t.indices.high);
          const a = this.getStepContextInfo(t, r);
          a && (i += ` ${a}`), this.currentStepExplanation = i, this.stepExplanationEl.textContent = this.currentStepExplanation
        }
        getStepContextInfo(t, n) {
          let e = "";
          if ("bubble" === n) e = `（已排序元素：${t.sortedIndices.length}个）`;
          else if ("selection" === n) e = `（已找到${t.indices.i+1}个最小值）`;
          else if ("insertion" === n) e = `（已排序${t.indices.i+1}个元素）`;
          else if ("quick" === n) e = `（当前分区：[${t.indices.low}, ${t.indices.high}]）`;
          else if ("merge" === n) e = "（合并区间）";
          else if ("heap" === n) e = "（堆调整中）";
          else if ("shell" === n) e = `（当前间隔：${Math.floor((t.indices.high-t.indices.low+1)/2)}）`;
          else if ("counting" === n)
            if (t.countArray) {
              const n = Math.min(...t.array);
              e = `（计数数组：[${t.countArray.map((t,e)=>`${n+e}:${t}`).join(", ")}]）`
            } else e = "（查找最值中）";
          return e
        }
        updateLog(t) {
          const algorithmLogBox = document.getElementById("algorithm-log");
          if (!algorithmLogBox) return;
          if (this.currentStep < algorithmLogBox.children.length - 1) {
            for (; algorithmLogBox.children.length > this.currentStep + 1;) algorithmLogBox.removeChild(algorithmLogBox.lastChild);
            return this.logGroup = null, void(this.logBuffer = [])
          }
          let e = "";
          const i = this.currentStep + 1;
          let r = "",
            a = !1,
            s = "",
            o = "";
          switch (s = {
              bubble: "冒泡排序",
              quick: "快速排序",
              selection: "选择排序",
              insertion: "插入排序",
              merge: "归并排序",
              heap: "堆排序",
              shell: "希尔排序",
              counting: "计数排序",
              radix: "基数排序"
            } [t.algorithm] || t.algorithm, t.algorithm) {
            case "bubble":
              if (2 === t.highlightIndices.length) {
                const [n, s] = t.highlightIndices;
                void 0 !== this.array[n] && void 0 !== this.array[s] && (e = `${i}: 比较相邻元素 ${this.array[n]} 和 ${this.array[s]}`, a = this.array[n] > this.array[s], r = a ? "swap" : "comparison", o = a ? '💡 较大的元素会像气泡一样"浮"到右边' : "💡 相邻元素已按顺序排列")
              }
              break;
            case "quick":
              if (t.pivotIndex >= 0) t.pivotIndex === this.lastPivotIndex && this.array[t.pivotIndex] === this.lastPivotValue || (e = `${i}: 选择基准元素 ${this.array[t.pivotIndex]}（位置 ${t.pivotIndex}）`, r = "selection", o = "💡 快速排序会选择一个基准元素，将数组分为两部分", this.lastPivotIndex = t.pivotIndex, this.lastPivotValue = this.array[t.pivotIndex]);
              else if (2 === t.highlightIndices.length) {
                const [n, s] = t.highlightIndices;
                if (void 0 !== this.array[n] && void 0 !== this.array[s]) {
                  const s = this.array[t.pivotIndex || 0];
                  e = `${i}: 比较元素 ${this.array[n]} 和基准值 ${s}`, a = this.array[n] > s, r = a ? "swap" : "comparison", o = a ? "💡 大于基准的元素移到右边，小于的移到左边" : "💡 元素已在正确的分区"
                }
              }
              break;
            case "selection":
              if (1 === t.highlightIndices.length) {
                const n = t.highlightIndices[0];
                void 0 !== this.array[n] && (e = `${i}: 开始从位置 ${n} 寻找最小值`, r = "selection", o = "💡 选择排序每次从剩余元素中找到最小值")
              } else if (2 === t.highlightIndices.length) {
                const [n, s] = t.highlightIndices;
                void 0 !== this.array[n] && void 0 !== this.array[s] && (e = `${i}: 比较元素 ${this.array[n]} 和当前最小值 ${this.array[s]}`, a = this.array[n] < this.array[s], r = "comparison", o = a ? "💡 找到新的最小值" : "💡 继续寻找更小的值")
              }
              break;
            case "insertion":
              if (1 === t.highlightIndices.length) {
                const n = t.highlightIndices[0];
                void 0 !== this.array[n] && (e = `${i}: 准备插入元素 ${this.array[n]}`, r = "selection", o = "💡 插入排序将元素插入到已排序序列的合适位置")
              } else if (2 === t.highlightIndices.length) {
                const [n, s] = t.highlightIndices;
                void 0 !== this.array[n] && void 0 !== this.array[s] && (e = `${i}: 比较元素 ${this.array[n]} 和已排序元素 ${this.array[s]}`, a = this.array[n] < this.array[s], r = "comparison", o = a ? "💡 需要将已排序元素右移，腾出插入位置" : "💡 找到合适的插入位置")
              }
              break;
            case "merge":
              if (3 === t.highlightIndices.length) {
                const [n, a, s] = t.highlightIndices;
                e = `${i}: 合并区间 [${n}, ${a}] 和 [${a+1}, ${s}]`, r = "selection", o = "💡 归并排序先分割数组，再合并排序结果"
              } else if (2 === t.highlightIndices.length) {
                const [n, s] = t.highlightIndices;
                void 0 !== this.array[n] && void 0 !== this.array[s] && (e = `${i}: 比较左右区间元素 ${this.array[n]} 和 ${this.array[s]}`, a = this.array[n] > this.array[s], r = "comparison", o = "💡 选择较小的元素放入合并结果")
              }
              break;
            case "heap":
              if (t.highlightIndices.length >= 1)
                if (1 === t.highlightIndices.length) {
                  const n = t.highlightIndices[0];
                  e = `${i}: 构建最大堆，处理节点 ${this.array[n]}`, r = "selection", o = "💡 堆排序先将数组构建为最大堆"
                } else {
                  const [n, s] = t.highlightIndices;
                  e = `${i}: 比较节点 ${this.array[n]} 和 ${this.array[s]}`, a = this.array[n] < this.array[s], r = a ? "swap" : "comparison", o = a ? "💡 确保父节点大于子节点，维持最大堆性质" : "💡 堆性质已满足"
                } break;
            case "shell":
              if (2 === t.highlightIndices.length) {
                const [n, s] = t.highlightIndices;
                void 0 !== this.array[n] && void 0 !== this.array[s] && (e = `${i}: 比较间隔为 ${Math.abs(n-s)} 的元素 ${this.array[n]} 和 ${this.array[s]}`, a = this.array[n] > this.array[s], r = a ? "swap" : "comparison", o = a ? "💡 希尔排序使用间隔分组，逐步减小间隔" : "💡 间隔内元素已排序")
              }
              break;
            case "counting":
              if (t.highlightIndices.length >= 2 && t.highlightIndices.includes(0)) {
                const [n, a, s] = t.highlightIndices;
                e = `${i}: 查找最值，当前最大值: ${this.array[a]}，当前最小值: ${this.array[s]}`, r = "selection", o = "💡 计数排序首先找出数组中的最大值和最小值，确定计数范围"
              } else if (t.highlightIndices.length > 0 && t.countArray) {
                const n = t.highlightIndices,
                  a = this.array[n[0]];
                e = `${i}: 统计元素 ${a} 的出现次数，当前计数: ${t.countArray[a-Math.min(...this.array)]}`, r = "selection", o = "💡 计数排序统计每个元素出现的次数"
              } else if (!t.highlightIndices.length && t.countArray) {
                const n = t.indices.i;
                e = `${i}: 计算累积计数，位置 ${n} 的累积计数: ${t.countArray[n]}`, r = "selection", o = "💡 累积计数用于确定每个元素在输出数组中的位置"
              } else if (2 === t.highlightIndices.length) {
                const [n, a] = t.highlightIndices;
                e = `${i}: 放置元素 ${this.array[n]} 到位置 ${a}`, r = "swap", o = "💡 根据累积计数，将元素放置到输出数组的正确位置"
              }
              break;
            case "radix":
              if (1 === t.highlightIndices.length) {
                const n = t.highlightIndices[0];
                e = `${i}: 处理元素 ${this.array[n]} 的某一位`, r = "selection", o = "💡 基数排序从低位到高位依次排序"
              } else if (2 === t.highlightIndices.length) {
                const [n, s] = t.highlightIndices;
                e = `${i}: 比较元素 ${this.array[n]} 和 ${this.array[s]} 的某一位`, a = this.array[n] > this.array[s], r = a ? "swap" : "comparison", o = "💡 根据当前位的值进行排序"
              }
              break;
            default:
              if (2 === t.highlightIndices.length) {
                const [n, s] = t.highlightIndices;
                void 0 !== this.array[n] && void 0 !== this.array[s] && (e = `${i}: 比较元素 ${this.array[n]} 和 ${this.array[s]}`, a = this.array[n] > this.array[s], r = a ? "swap" : "comparison")
              } else if (1 === t.highlightIndices.length) {
                const n = t.highlightIndices[0];
                void 0 !== this.array[n] && (e = `${i}: 处理元素 ${this.array[n]}`, r = "selection")
              }
          }
          if (!e) return;
          this.logBuffer.push({
            type: r,
            content: e,
            stepNumber: i,
            algorithm: s,
            tip: o
          });
          const l = document.createElement("div");
          if ("selection" === r) {
            this.logGroup = document.createElement("div"), this.logGroup.className = "border-b border-gray-200 mb-1 bg-white rounded-md shadow-sm";
            const t = document.createElement("div");
            t.className = "flex items-center justify-between text-xs p-2 bg-blue-50 font-semibold cursor-pointer rounded-t-md", t.innerHTML = `\n                <span>${e}</span>\n                <span class="fold-icon">▼</span>\n            `;
            const i = document.createElement("div");
            if (i.className = "group-content p-2 bg-white rounded-b-md", i.style.display = "block", o) {
              const t = document.createElement("div");
              t.className = "text-xs p-2 mb-2 bg-yellow-50 border-l-4 border-yellow-400 rounded text-gray-700", t.textContent = o, i.appendChild(t)
            }
            t.addEventListener("click", () => {
              const n = "block" === i.style.display;
              i.style.display = n ? "none" : "block", t.querySelector(".fold-icon").textContent = n ? "▶" : "▼"
            }), this.logGroup.appendChild(t), this.logGroup.appendChild(i), algorithmLogBox.appendChild(this.logGroup)
          } else if ("swap" === r)
            if (this.logGroup) {
              const t = this.logGroup.querySelector(".group-content"),
                n = document.createElement("div");
              if (n.className = "text-xs p-2 pl-4 border-l-4 border-red-400 bg-red-50 rounded text-gray-800 mb-1", n.textContent = `${e} → 交换位置`, t.appendChild(n), o) {
                const n = document.createElement("div");
                n.className = "text-xs p-2 pl-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-gray-700 mb-1", n.textContent = o, t.appendChild(n)
              }
              this.logGroup = null
            } else l.className = "text-xs p-2 border-l-4 border-red-400 bg-red-50 rounded text-gray-800 mb-1", l.textContent = `${e} → 交换位置`, algorithmLogBox.appendChild(l);
          else if ("comparison" === r)
            if (this.logGroup) {
              const t = this.logGroup.querySelector(".group-content"),
                n = document.createElement("div");
              if (n.className = "text-xs p-2 pl-4 border-l-4 border-blue-300 bg-blue-50 rounded text-gray-800 mb-1", n.textContent = `${e} → 保持不变`, t.appendChild(n), o) {
                const n = document.createElement("div");
                n.className = "text-xs p-2 pl-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-gray-700 mb-1", n.textContent = o, t.appendChild(n)
              }
            } else l.className = "text-xs p-2 border-l-4 border-blue-300 bg-blue-50 rounded text-gray-800 mb-1", l.textContent = `${e} → 保持不变`, algorithmLogBox.appendChild(l);
          if (this.stepExplanationEl && this.currentStepExplanation) {
            this.stepExplanationEl.remove();
            const t = document.createElement("div");
            t.id = "step-explanation", t.className = "pl-4 border-l-2 border-blue-200 ml-2 mt-1 text-gray-600 text-xs p-2 bg-blue-50 rounded", t.textContent = this.currentStepExplanation, this.stepExplanationEl = t, algorithmLogBox.appendChild(t)
          }
          algorithmLogBox.children.length > 15 && algorithmLogBox.removeChild(algorithmLogBox.firstChild), algorithmLogBox.scrollTop = algorithmLogBox.scrollHeight
        }
        updateCounters() {
          this.comparisonCountEl.textContent = this.comparisonCount, this.swapCountEl.textContent = this.swapCount
        }
        updateStepButtons() {
          this.stepBackBtn.disabled = this.currentStep <= 0, this.stepForwardBtn.disabled = this.currentStep >= this.sortHistory.length - 1
        }
      }
      window.SortingVisualizer = SortingVisualizerApp, document.addEventListener("DOMContentLoaded", () => {
        new SortingVisualizerApp, setTimeout(() => {
          hljs.highlightAll()
        }, 100)
      });
