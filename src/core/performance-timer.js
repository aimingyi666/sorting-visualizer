/**
 * PerformanceTimer —— 执行计时器
 */

export class PerformanceTimer {
        constructor(t, n, e) {
          this.id = n, this.algorithmName = t, this.color = e, this.array = [], this.arraySize = 20, this.sortSpeed = 10, this.isSorting = !1, this.isPaused = !1, this.isStepping = !1, this.comparisonCount = 0, this.swapCount = 0, this.animationId = null, this.sortHistory = [], this.currentStep = -1, this.preGeneratedHistory = null, this.initialArray = [], this.startTime = null, this.endTime = null
        }
        init(t) {
          this.array = [...t], this.initialArray = [...t], this.arraySize = t.length, this.reset()
        }
        reset() {
          this.isSorting = !1, this.isPaused = !1, this.isStepping = !1, this.comparisonCount = 0, this.swapCount = 0, this.currentStep = -1, this.startTime = null, this.endTime = null, this.array = [...this.initialArray]
        }
        getExecutionTime() {
          return this.startTime ? this.endTime ? this.endTime - this.startTime : Date.now() - this.startTime : 0
        }
        start() {
          this.isSorting = !0, this.isPaused = !1, this.startTime = Date.now()
        }
        pause() {
          this.isPaused = !0, this.isSorting = !1
        }
        finish() {
          this.isSorting = !1, this.isPaused = !1, this.endTime = Date.now()
        }
      }
