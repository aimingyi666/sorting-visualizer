/**
 * Navbar —— 顶部导航栏
 *
 * 负责渲染页头（模式切换 / 主题切换 / 语言切换 / 桌面与移动导航），
 * 并绑定主题与语言相关的交互事件。
 */

export class Navbar {
        constructor() {
          this.app = document.getElementById("app"), this.render()
        }
        render() {
          this.app.insertAdjacentHTML("afterbegin", '\n            \x3c!-- 顶部导航栏 --\x3e\n            <header class="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700/30 sticky top-0 z-50 transition-all duration-300 w-full py-2">\n                <div class="w-full container mx-auto px-4 py-1 flex items-center justify-between">\n                    <div class="flex items-center gap-2">\n                        <i class="fa fa-exchange text-primary text-2xl"></i>\n                        <h1 class="text-lg font-bold text-gray-800 dark:text-white">排序算法可视化</h1>\n                    </div>\n                    \n                    \x3c!-- 模式切换按钮 --\x3e\n                    <div class="relative flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-full shadow-sm transition-all duration-300 ease-in-out">\n                        <button id="single-mode-btn" class="px-6 py-2 rounded-full font-medium text-sm font-medium transition-all duration-300 ease-in-out transform bg-primary text-white shadow-md hover:shadow-lg scale-105 active:scale-95 flex items-center gap-2">\n                            <i class="fa fa-single-circle-o"></i> 单算法模式\n                        </button>\n                        <button id="competition-mode-btn" class="px-6 py-2 rounded-full font-medium text-sm font-medium transition-all duration-300 ease-in-out transform bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 scale-105 active:scale-95 flex items-center gap-2">\n                            <i class="fa fa-trophy"></i> 竞赛模式\n                        </button>\n                    </div>\n                    \n                    \x3c!-- 主题切换按钮 --\x3e\n                    <button id="theme-toggle" class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out transform scale-105 active:scale-95">\n                        <i class="fa fa-moon-o dark:hidden"></i>\n                        <i class="fa fa-sun-o hidden dark:block"></i>\n                    </button>\n                    \n                    \x3c!-- 语言切换按钮 --\x3e\n                    <div class="relative">\n                        <button id="language-toggle" class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out transform scale-105 active:scale-95">\n                            <i class="fa fa-globe"></i>\n                        </button>\n                        \x3c!-- 语言切换菜单 --\x3e\n                        <div id="language-menu" class="absolute hidden bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 right-0 mt-2 z-50 min-w-[120px]">\n                            <div class="py-1">\n                                <button class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md" data-lang="zh">\n                                    <i class="fa fa-flag mr-2"></i> 中文\n                                </button>\n                                <button class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md" data-lang="en">\n                                    <i class="fa fa-flag mr-2"></i> English\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    \x3c!-- 桌面端导航 --\x3e\n                    <nav class="hidden md:flex items-center gap-3">\n                        <a href="#visualization" class="py-2 px-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors text-sm">\n                            <i class="fa fa-bar-chart mr-1"></i> 排序可视化\n                        </a>\n                        <a href="#algorithm-principle" class="py-2 px-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors text-sm">\n                            <i class="fa fa-lightbulb-o mr-1"></i> 算法原理\n                        </a>\n                        <a href="#complexity-analysis" class="py-2 px-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors text-sm">\n                            <i class="fa fa-line-chart mr-1"></i> 复杂度分析\n                        </a>\n                        <a href="#application-scenarios" class="py-2 px-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors text-sm">\n                            <i class="fa fa-question-circle-o mr-1"></i> 适用场景\n                        </a>\n                        <a href="#code-implementation" class="py-2 px-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors text-sm">\n                            <i class="fa fa-code mr-1"></i> 代码实现\n                        </a>\n                        <a href="#algorithm-comparison" class="py-2 px-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors text-sm">\n                            <i class="fa fa-exchange mr-1"></i> 算法对比\n                        </a>\n                    </nav>\n                    \n                    \x3c!-- 移动端菜单按钮 --\x3e\n                    <button class="text-gray-600 dark:text-gray-300 hover:text-primary md:hidden" id="menu-toggle">\n                        <i class="fa fa-bars text-xl"></i>\n                    </button>\n                </div>\n                \n                \x3c!-- 移动端菜单 --\x3e\n                    <div id="mobile-menu" class="hidden md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">\n                        <div class="container mx-auto px-4 py-3 flex flex-col gap-3">\n                            <div class="mb-2">\n                                <label for="mobile-algorithm-selector" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">选择算法</label>\n                                <select id="mobile-algorithm-selector" class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2">\n                                    <option value="bubbleSort">冒泡排序</option>\n                                    <option value="quickSort">快速排序</option>\n                                    <option value="selectionSort">选择排序</option>\n                                    <option value="insertionSort">插入排序</option>\n                                    <option value="mergeSort">归并排序</option>\n                                    <option value="heapSort">堆排序</option>\n                                    <option value="shellSort">希尔排序</option>\n                                    <option value="countingSort">计数排序</option>\n                                    <option value="radixSort">基数排序</option>\n                                </select>\n                            </div>\n                            <a href="#visualization" class="text-gray-600 dark:text-gray-300 hover:text-primary py-2 transition-colors">排序可视化</a>\n                            <a href="#algorithm-principle" class="text-gray-600 dark:text-gray-300 hover:text-primary py-2 transition-colors">算法原理</a>\n                            <a href="#complexity-analysis" class="text-gray-600 dark:text-gray-300 hover:text-primary py-2 transition-colors">复杂度分析</a>\n                            <a href="#application-scenarios" class="text-gray-600 dark:text-gray-300 hover:text-primary py-2 transition-colors">适用场景</a>\n                            <a href="#code-implementation" class="text-gray-600 dark:text-gray-300 hover:text-primary py-2 transition-colors">代码实现</a>\n                            <a href="#algorithm-comparison" class="text-gray-600 dark:text-gray-300 hover:text-primary py-2 transition-colors">算法对比</a>\n                        </div>\n                    </div>\n            </header>\n        '), this.setupEventListeners()
        }
        setupEventListeners() {
          const menuToggleBtn = document.getElementById("menu-toggle"),
            mobileMenuBox = document.getElementById("mobile-menu");
          menuToggleBtn && mobileMenuBox && menuToggleBtn.addEventListener("click", () => {
            mobileMenuBox.classList.toggle("hidden")
          });
          const themeToggleBtn = document.getElementById("theme-toggle");
          if (themeToggleBtn) {
            const t = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
            this.setTheme(t), themeToggleBtn.addEventListener("click", () => {
              const t = "light" == (document.documentElement.classList.contains("dark") ? "dark" : "light") ? "dark" : "light";
              this.setTheme(t), localStorage.setItem("theme", t)
            })
          }
          const languageToggleBtn = document.getElementById("language-toggle"),
            languageMenuBox = document.getElementById("language-menu");
          if (languageToggleBtn && languageMenuBox) {
            const t = localStorage.getItem("language") || "zh";
            this.setLanguage(t), languageToggleBtn.addEventListener("click", () => {
              languageMenuBox.classList.toggle("hidden")
            }), languageMenuBox.querySelectorAll("button[data-lang]").forEach(t => {
              t.addEventListener("click", t => {
                const n = t.target.getAttribute("data-lang");
                this.setLanguage(n), localStorage.setItem("language", n), languageMenuBox.classList.add("hidden")
              })
            }), document.addEventListener("click", t => {
              languageToggleBtn.contains(t.target) || languageMenuBox.contains(t.target) || languageMenuBox.classList.add("hidden")
            })
          }
        }
        setTheme(t) {
          "dark" === t ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
        }
        setLanguage(t) {
          window.languageManager ? window.languageManager.setLanguage(t) : (document.documentElement.setAttribute("lang", t), localStorage.setItem("language", t), document.dispatchEvent(new CustomEvent("languageChanged", {
            detail: {
              lang: t
            }
          }))), this.updateLanguageButton(t)
        }
        updateLanguageButton(t) {
          document.getElementById("language-toggle")
        }
      }
