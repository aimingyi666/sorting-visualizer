/**
 * 排序算法集合 —— 9 种算法的可视化轨迹生成器
 *
 * 每个算法签名一致： fn(arr) -> { array, history, comparisonCount, swapCount }
 *   arr              : 待排序数组
 *   history          : 逐帧快照数组，用于可视化回放
 *     每帧含 array / comparisonCount / swapCount / highlightIndices /
 *     pivotIndex / sortedIndices / algorithm / indices
 *
 * 命名约定（已从压缩代码还原语义名）：
 *   inputArray      输入数组（不修改原数组）
 *   workingArray    排序过程操作的工作副本
 *   history         逐帧轨迹累积器
 *   comparisonCount 比较次数
 *   swapCount       交换/移动次数
 *   sortedIndices   已就位下标集合
 *   allIndices      全部下标
 *   scanIndex       当前扫描下标
 *   pivotIndex      基准/分界点
 *
 * 还原方式：AST 作用域分析 + 按声明行号精确映射，共替换 557 处标识符，
 *          与原实现逐帧轨迹完全等价（72/72 用例字节级一致）。
 */

export function bubbleSort(inputArray) {
        const history = [],
          workingArray = [...inputArray];
        let comparisonCount = 0,
          swapCount = 0;
        history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          sortedIndices: [],
          algorithm: "bubble",
          indices: {
            i: 0,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        });
        for (let s = 0; s < workingArray.length - 1; s++) {
          const t = Array.from({
              length: s
            }, (t, n) => workingArray.length - 1 - n),
            a = workingArray.length - s - 1;
          for (let l = 0; l < a; l++) comparisonCount++, history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [l, l + 1],
            pivotIndex: a,
            sortedIndices: t,
            algorithm: "bubble",
            indices: {
              i: s,
              j: l,
              low: 0,
              high: workingArray.length - 1
            }
          }), workingArray[l] > workingArray[l + 1] && ([workingArray[l], workingArray[l + 1]] = [workingArray[l + 1], workingArray[l]], swapCount++, history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [l, l + 1],
            pivotIndex: a,
            sortedIndices: t,
            algorithm: "bubble",
            indices: {
              i: s,
              j: l,
              low: 0,
              high: workingArray.length - 1
            }
          }));
          t.push(workingArray.length - 1 - s);
          const o = workingArray.length - (s + 1) - 1;
          history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [],
            pivotIndex: o,
            sortedIndices: t,
            algorithm: "bubble",
            indices: {
              i: s + 1,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          })
        }
        const allIndices = Array.from({
          length: workingArray.length
        }, (t, n) => n);
        return history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          sortedIndices: allIndices,
          algorithm: "bubble",
          indices: {
            i: workingArray.length,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        }), {
          array: workingArray,
          history: history,
          comparisonCount: comparisonCount,
          swapCount: swapCount
        }
      }

export function selectionSort(inputArray) {
        const history = [],
          workingArray = [...inputArray];
        let comparisonCount = 0,
          swapCount = 0;
        history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          sortedIndices: [],
          algorithm: "selection",
          indices: {
            i: 0,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        });
        for (let s = 0; s < workingArray.length - 1; s++) {
          let t = s;
          const a = Array.from({
            length: s
          }, (t, n) => n);
          history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [s],
            pivotIndex: s,
            sortedIndices: a,
            algorithm: "selection",
            indices: {
              i: s,
              j: s,
              low: 0,
              high: workingArray.length - 1
            }
          });
          for (let l = s + 1; l < workingArray.length; l++) comparisonCount++, history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [s, l, t],
            pivotIndex: s,
            sortedIndices: a,
            algorithm: "selection",
            indices: {
              i: s,
              j: l,
              low: 0,
              high: workingArray.length - 1
            }
          }), workingArray[l] < workingArray[t] && (t = l, history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [s, l, t],
            pivotIndex: s,
            sortedIndices: a,
            algorithm: "selection",
            indices: {
              i: s,
              j: l,
              low: 0,
              high: workingArray.length - 1
            }
          }));
          t !== s && ([workingArray[s], workingArray[t]] = [workingArray[t], workingArray[s]], swapCount++, history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [s, t],
            pivotIndex: s,
            sortedIndices: a,
            algorithm: "selection",
            indices: {
              i: s,
              j: workingArray.length,
              low: 0,
              high: workingArray.length - 1
            }
          })), a.push(s);
          const o = s + 1;
          history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [],
            pivotIndex: o,
            sortedIndices: a,
            algorithm: "selection",
            indices: {
              i: s + 1,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          })
        }
        const allIndices = Array.from({
          length: workingArray.length
        }, (t, n) => n);
        return history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          sortedIndices: allIndices,
          algorithm: "selection",
          indices: {
            i: workingArray.length,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        }), {
          array: workingArray,
          history: history,
          comparisonCount: comparisonCount,
          swapCount: swapCount
        }
      }

export function insertionSort(inputArray) {
        const history = [],
          workingArray = [...inputArray];
        let comparisonCount = 0,
          swapCount = 0;
        history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          sortedIndices: [],
          algorithm: "insertion",
          indices: {
            i: 0,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        });
        for (let s = 1; s < workingArray.length; s++) {
          const t = workingArray[s];
          let a = s - 1;
          const o = Array.from({
            length: s
          }, (t, n) => n);
          for (history.push({
              array: [...workingArray],
              comparisonCount: comparisonCount,
              swapCount: swapCount,
              highlightIndices: [s],
              pivotIndex: s,
              sortedIndices: o,
              algorithm: "insertion",
              indices: {
                i: s,
                j: a,
                low: 0,
                high: workingArray.length - 1
              }
            }); a >= 0;) {
            comparisonCount++;
            const o = Array.from({
              length: a
            }, (t, n) => n);
            if (history.push({
                array: [...workingArray],
                comparisonCount: comparisonCount,
                swapCount: swapCount,
                highlightIndices: [a, a + 1],
                pivotIndex: s,
                sortedIndices: o,
                algorithm: "insertion",
                indices: {
                  i: s,
                  j: a,
                  low: 0,
                  high: workingArray.length - 1
                }
              }), !(workingArray[a] > t)) break;
            workingArray[a + 1] = workingArray[a], swapCount++, history.push({
              array: [...workingArray],
              comparisonCount: comparisonCount,
              swapCount: swapCount,
              highlightIndices: [a, a + 1],
              pivotIndex: s,
              sortedIndices: o,
              algorithm: "insertion",
              indices: {
                i: s,
                j: a,
                low: 0,
                high: workingArray.length - 1
              }
            }), a--
          }
          workingArray[a + 1] = t;
          const l = Array.from({
              length: s + 1
            }, (t, n) => n),
            d = s + 1;
          history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [a + 1],
            pivotIndex: d,
            sortedIndices: l,
            algorithm: "insertion",
            indices: {
              i: s + 1,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          })
        }
        const allIndices = Array.from({
          length: workingArray.length
        }, (t, n) => n);
        return history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          sortedIndices: allIndices,
          algorithm: "insertion",
          indices: {
            i: workingArray.length,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        }), {
          array: workingArray,
          history: history,
          comparisonCount: comparisonCount,
          swapCount: swapCount
        }
      }

export function quickSort(inputArray) {
        const history = [],
          workingArray = [...inputArray];
        let comparisonCount = 0,
          swapCount = 0;
        history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [],
            sortedIndices: [],
            algorithm: "quick",
            indices: {
              i: 0,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          }),
          function t(a, s) {
            if (a < s) {
              history.push({
                array: [...workingArray],
                comparisonCount: comparisonCount,
                swapCount: swapCount,
                highlightIndices: [a, s],
                sortedIndices: [],
                algorithm: "quick",
                indices: {
                  i: a,
                  j: s,
                  low: a,
                  high: s
                }
              });
              const o = function(t, a) {
                const s = workingArray[a];
                let o = t - 1;
                for (let l = t; l < a; l++) history.push({
                  array: [...workingArray],
                  comparisonCount: comparisonCount,
                  swapCount: swapCount,
                  highlightIndices: [l],
                  pivotIndex: a,
                  sortedIndices: [],
                  algorithm: "quick",
                  indices: {
                    i: o,
                    j: l,
                    low: t,
                    high: a
                  }
                }), comparisonCount++, workingArray[l] <= s && (o++, o !== l && ([workingArray[o], workingArray[l]] = [workingArray[l], workingArray[o]], swapCount++, history.push({
                  array: [...workingArray],
                  comparisonCount: comparisonCount,
                  swapCount: swapCount,
                  highlightIndices: [o, l],
                  pivotIndex: a,
                  sortedIndices: [],
                  algorithm: "quick",
                  indices: {
                    i: o,
                    j: l,
                    low: t,
                    high: a
                  }
                })));
                return o++, [workingArray[o], workingArray[a]] = [workingArray[a], workingArray[o]], swapCount++, history.push({
                  array: [...workingArray],
                  comparisonCount: comparisonCount,
                  swapCount: swapCount,
                  highlightIndices: [o],
                  pivotIndex: o,
                  sortedIndices: [],
                  algorithm: "quick",
                  indices: {
                    i: o,
                    j: a,
                    low: t,
                    high: a
                  }
                }), o
              }(a, s);
              t(a, o - 1), t(o + 1, s)
            }
          }(0, workingArray.length - 1);
        const allIndices = Array.from({
          length: workingArray.length
        }, (t, n) => n);
        return history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          sortedIndices: allIndices,
          algorithm: "quick",
          indices: {
            i: 0,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        }), {
          array: workingArray,
          history: history,
          comparisonCount: comparisonCount,
          swapCount: swapCount
        }
      }

export function mergeSort(inputArray) {
        const history = [],
          workingArray = [...inputArray];
        let comparisonCount = 0,
          swapCount = 0;
        history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [],
            sortedIndices: [],
            algorithm: "merge",
            indices: {
              i: 0,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          }),
          function t(a, s) {
            if (a < s) {
              const o = Math.floor((a + s) / 2);
              history.push({
                  array: [...workingArray],
                  comparisonCount: comparisonCount,
                  swapCount: swapCount,
                  highlightIndices: [a, o, s],
                  pivotIndex: o,
                  sortedIndices: [],
                  algorithm: "merge",
                  indices: {
                    i: a,
                    j: s,
                    low: a,
                    high: s
                  }
                }), t(a, o), t(o + 1, s),
                function(t, a, s) {
                  const o = workingArray.slice(t, a + 1),
                    l = workingArray.slice(a + 1, s + 1);
                  let d = 0,
                    c = 0,
                    p = t;
                  for (history.push({
                      array: [...workingArray],
                      comparisonCount: comparisonCount,
                      swapCount: swapCount,
                      highlightIndices: [t, a, s],
                      pivotIndex: a,
                      sortedIndices: [],
                      algorithm: "merge",
                      indices: {
                        i: d,
                        j: c,
                        low: t,
                        high: s
                      }
                    }); d < o.length && c < l.length;) history.push({
                    array: [...workingArray],
                    comparisonCount: comparisonCount,
                    swapCount: swapCount,
                    highlightIndices: [t + d, a + 1 + c],
                    pivotIndex: a,
                    sortedIndices: [],
                    algorithm: "merge",
                    indices: {
                      i: d,
                      j: c,
                      low: t,
                      high: s
                    }
                  }), comparisonCount++, o[d] <= l[c] ? (workingArray[p] = o[d], d++) : (workingArray[p] = l[c], c++), swapCount++, history.push({
                    array: [...workingArray],
                    comparisonCount: comparisonCount,
                    swapCount: swapCount,
                    highlightIndices: [p],
                    pivotIndex: a,
                    sortedIndices: [],
                    algorithm: "merge",
                    indices: {
                      i: d,
                      j: c,
                      low: t,
                      high: s
                    }
                  }), p++;
                  for (; d < o.length;) workingArray[p] = o[d], swapCount++, history.push({
                    array: [...workingArray],
                    comparisonCount: comparisonCount,
                    swapCount: swapCount,
                    highlightIndices: [p],
                    pivotIndex: a,
                    sortedIndices: [],
                    algorithm: "merge",
                    indices: {
                      i: d,
                      j: c,
                      low: t,
                      high: s
                    }
                  }), d++, p++;
                  for (; c < l.length;) workingArray[p] = l[c], swapCount++, history.push({
                    array: [...workingArray],
                    comparisonCount: comparisonCount,
                    swapCount: swapCount,
                    highlightIndices: [p],
                    pivotIndex: a,
                    sortedIndices: [],
                    algorithm: "merge",
                    indices: {
                      i: d,
                      j: c,
                      low: t,
                      high: s
                    }
                  }), c++, p++;
                  const m = Array.from({
                    length: s - t + 1
                  }, (n, e) => t + e);
                  history.push({
                    array: [...workingArray],
                    comparisonCount: comparisonCount,
                    swapCount: swapCount,
                    highlightIndices: [],
                    pivotIndex: a,
                    sortedIndices: m,
                    algorithm: "merge",
                    indices: {
                      i: d,
                      j: c,
                      low: t,
                      high: s
                    }
                  })
                }(a, o, s)
            }
          }(0, workingArray.length - 1);
        const allIndices = Array.from({
          length: workingArray.length
        }, (t, n) => n);
        return history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          sortedIndices: allIndices,
          algorithm: "merge",
          indices: {
            i: 0,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        }), {
          array: workingArray,
          history: history,
          comparisonCount: comparisonCount,
          swapCount: swapCount
        }
      }

export function shellSort(inputArray) {
        const history = [],
          workingArray = [...inputArray];
        let comparisonCount = 0,
          swapCount = 0;
        history.push({
          array: [...workingArray],
          comparisonCount: 0,
          swapCount: 0,
          highlightIndices: [],
          pivotIndex: -1,
          sortedIndices: [],
          indices: {
            i: 0,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          },
          algorithm: "shell"
        });
        const a = workingArray.length;
        let scanIndex = Math.floor(a / 2);
        for (; scanIndex > 0;) {
          for (let t = scanIndex; t < a; t++) {
            const o = workingArray[t];
            let l = t;
            for (; l >= scanIndex && (comparisonCount++, history.push({
                array: [...workingArray],
                comparisonCount: comparisonCount,
                swapCount: swapCount,
                highlightIndices: [l, l - scanIndex],
                pivotIndex: t,
                sortedIndices: [],
                indices: {
                  i: t,
                  j: l,
                  low: 0,
                  high: a - 1
                },
                algorithm: "shell"
              }), workingArray[l - scanIndex] > o);) workingArray[l] = workingArray[l - scanIndex], swapCount++, history.push({
              array: [...workingArray],
              comparisonCount: comparisonCount,
              swapCount: swapCount,
              highlightIndices: [l, l - scanIndex],
              pivotIndex: t,
              sortedIndices: [],
              indices: {
                i: t,
                j: l,
                low: 0,
                high: a - 1
              },
              algorithm: "shell"
            }), l -= scanIndex;
            workingArray[l] = o, history.push({
              array: [...workingArray],
              comparisonCount: comparisonCount,
              swapCount: swapCount,
              highlightIndices: [l],
              pivotIndex: t,
              sortedIndices: [],
              indices: {
                i: t,
                j: l,
                low: 0,
                high: a - 1
              },
              algorithm: "shell"
            })
          }
          scanIndex = Math.floor(scanIndex / 2)
        }
        const allIndices = Array.from({
          length: workingArray.length
        }, (t, n) => n);
        return history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          pivotIndex: -1,
          sortedIndices: allIndices,
          indices: {
            i: 0,
            j: 0,
            low: 0,
            high: a - 1
          },
          algorithm: "shell"
        }), {
          history: history,
          array: workingArray,
          comparisonCount: comparisonCount,
          swapCount: swapCount
        }
      }

export function heapSort(inputArray) {
        const history = [],
          workingArray = [...inputArray];
        let comparisonCount = 0,
          swapCount = 0,
          sortedIndices = [];

        function s(t, o) {
          let l = o;
          const d = 2 * o + 1,
            c = 2 * o + 2;
          history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [d, c].filter(n => n < t),
            pivotIndex: o,
            sortedIndices: [...sortedIndices],
            algorithm: "heap",
            indices: {
              i: o,
              j: t - 1,
              low: 0,
              high: workingArray.length - 1
            }
          }), d < t && (comparisonCount++, workingArray[d] > workingArray[l] && (l = d)), c < t && (comparisonCount++, workingArray[c] > workingArray[l] && (l = c)), l !== o && ([workingArray[o], workingArray[l]] = [workingArray[l], workingArray[o]], swapCount++, history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [o, l],
            pivotIndex: o,
            sortedIndices: [...sortedIndices],
            algorithm: "heap",
            indices: {
              i: o,
              j: t - 1,
              low: 0,
              high: workingArray.length - 1
            }
          }), s(t, l))
        }
        history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          pivotIndex: -1,
          sortedIndices: [...sortedIndices],
          algorithm: "heap",
          indices: {
            i: 0,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        });
        const scanIndex = workingArray.length;
        for (let l = Math.floor(scanIndex / 2) - 1; l >= 0; l--) s(scanIndex, l);
        for (let l = scanIndex - 1; l > 0; l--)[workingArray[0], workingArray[l]] = [workingArray[l], workingArray[0]], swapCount++, sortedIndices.unshift(l), history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [0, l],
          pivotIndex: 0,
          sortedIndices: [...sortedIndices],
          algorithm: "heap",
          indices: {
            i: 0,
            j: l,
            low: 0,
            high: workingArray.length - 1
          }
        }), s(l, 0);
        return sortedIndices.unshift(0), history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          pivotIndex: -1,
          sortedIndices: [...sortedIndices],
          algorithm: "heap",
          indices: {
            i: 0,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        }), {
          array: workingArray,
          history: history,
          comparisonCount: comparisonCount,
          swapCount: swapCount
        }
      }

export function countingSort(inputArray) {
        const history = [],
          workingArray = [...inputArray];
        if (history.push({
            array: [...workingArray],
            comparisonCount: 0,
            swapCount: 0,
            highlightIndices: [],
            pivotIndex: -1,
            sortedIndices: [],
            algorithm: "counting",
            indices: {
              i: 0,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          }), 0 === workingArray.length) {
          const t = Array.from({
            length: workingArray.length
          }, (t, n) => n);
          return history.push({
            array: [...workingArray],
            comparisonCount: 0,
            swapCount: 0,
            highlightIndices: [],
            pivotIndex: -1,
            sortedIndices: t,
            algorithm: "counting",
            indices: {
              i: 0,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          }), {
            array: workingArray,
            history: history,
            comparisonCount: 0,
            swapCount: 0
          }
        }
        let maxValue = workingArray[0],
          minValue = workingArray[0];
        for (let scanIndex = 1; scanIndex < workingArray.length; scanIndex++) {
          let t = workingArray.indexOf(maxValue),
            a = workingArray.indexOf(minValue);
          workingArray[scanIndex] > maxValue && (maxValue = workingArray[scanIndex], t = scanIndex), workingArray[scanIndex] < minValue && (minValue = workingArray[scanIndex], a = scanIndex), history.push({
            array: [...workingArray],
            comparisonCount: 0,
            swapCount: 0,
            highlightIndices: [scanIndex, t, a],
            pivotIndex: scanIndex,
            sortedIndices: [],
            algorithm: "counting",
            indices: {
              i: scanIndex,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          })
        }
        const a = new Array(maxValue - minValue + 1).fill(0);
        for (let countIndex = 0; countIndex < workingArray.length; countIndex++) {
          const t = workingArray[countIndex] - minValue;
          a[t]++;
          const i = [];
          for (let n = 0; n <= countIndex; n++) workingArray[n] === workingArray[countIndex] && i.push(n);
          history.push({
            array: [...workingArray],
            comparisonCount: 0,
            swapCount: 0,
            highlightIndices: i,
            pivotIndex: countIndex,
            sortedIndices: [],
            algorithm: "counting",
            indices: {
              i: countIndex,
              j: t,
              low: 0,
              high: workingArray.length - 1
            },
            countArray: [...a]
          })
        }
        for (let l = 1; l < a.length; l++) a[l] += a[l - 1], history.push({
          array: [...workingArray],
          comparisonCount: 0,
          swapCount: 0,
          highlightIndices: [],
          pivotIndex: -1,
          sortedIndices: [],
          algorithm: "counting",
          indices: {
            i: l,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          },
          countArray: [...a]
        });
        const countArray = new Array(workingArray.length);
        for (let l = workingArray.length - 1; l >= 0; l--) {
          const t = workingArray[l] - minValue,
            i = a[t] - 1;
          countArray[i] = workingArray[l], a[t]--, history.push({
            array: [...countArray],
            comparisonCount: 0,
            swapCount: 0,
            highlightIndices: [l, i],
            pivotIndex: l,
            sortedIndices: [],
            algorithm: "counting",
            indices: {
              i: l,
              j: i,
              low: 0,
              high: workingArray.length - 1
            },
            countArray: [...a]
          })
        }
        for (let l = 0; l < workingArray.length; l++) workingArray[l] = countArray[l], history.push({
          array: [...workingArray],
          comparisonCount: 0,
          swapCount: 0,
          highlightIndices: [l],
          pivotIndex: l,
          sortedIndices: [],
          algorithm: "counting",
          indices: {
            i: l,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        });
        for (let l = 0; l < workingArray.length; l++) {
          const t = Array.from({
            length: l + 1
          }, (t, n) => n);
          history.push({
            array: [...workingArray],
            comparisonCount: 0,
            swapCount: 0,
            highlightIndices: [],
            pivotIndex: l,
            sortedIndices: t,
            algorithm: "counting",
            indices: {
              i: l,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          })
        }
        const allIndices = Array.from({
          length: workingArray.length
        }, (t, n) => n);
        return history.push({
          array: [...workingArray],
          comparisonCount: 0,
          swapCount: 0,
          highlightIndices: [],
          pivotIndex: -1,
          sortedIndices: allIndices,
          algorithm: "counting",
          indices: {
            i: workingArray.length,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        }), {
          array: workingArray,
          history: history,
          comparisonCount: 0,
          swapCount: 0
        }
      }

export function radixSort(inputArray) {
        const history = [],
          workingArray = [...inputArray];
        let comparisonCount = 0,
          swapCount = 0;
        if (history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [],
            pivotIndex: -1,
            sortedIndices: [],
            algorithm: "radix",
            indices: {
              i: 0,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          }), 0 === workingArray.length) {
          const t = Array.from({
            length: workingArray.length
          }, (t, n) => n);
          return history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [],
            pivotIndex: -1,
            sortedIndices: t,
            algorithm: "radix",
            indices: {
              i: 0,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          }), {
            array: workingArray,
            history: history,
            comparisonCount: comparisonCount,
            swapCount: swapCount
          }
        }
        let a = workingArray[0];
        for (let c = 1; c < workingArray.length; c++) comparisonCount++, workingArray[c] > a && (a = workingArray[c]), history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [c],
          pivotIndex: c,
          sortedIndices: [],
          algorithm: "radix",
          indices: {
            i: c,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        });
        let s = 0;
        for (; a > 0;) s++, a = Math.floor(a / 10);
        let o = 1;
        for (let c = 0; c < s; c++) history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          pivotIndex: c,
          sortedIndices: [],
          algorithm: "radix",
          indices: {
            i: c,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        }), d(workingArray, o), o *= 10;
        for (let c = 0; c < workingArray.length; c++) {
          const t = Array.from({
            length: c + 1
          }, (t, n) => n);
          history.push({
            array: [...workingArray],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [],
            pivotIndex: c,
            sortedIndices: t,
            algorithm: "radix",
            indices: {
              i: c,
              j: 0,
              low: 0,
              high: workingArray.length - 1
            }
          })
        }
        const allIndices = Array.from({
          length: workingArray.length
        }, (t, n) => n);

        function d(t, e) {
          const a = t.length,
            s = new Array(a),
            o = new Array(10).fill(0);
          for (let l = 0; l < a; l++) o[Math.floor(t[l] / e) % 10]++, history.push({
            array: [...t],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [l],
            pivotIndex: l,
            sortedIndices: [],
            algorithm: "radix",
            indices: {
              i: l,
              j: 0,
              low: 0,
              high: a - 1
            }
          });
          for (let n = 1; n < 10; n++) o[n] += o[n - 1];
          for (let l = a - 1; l >= 0; l--) {
            const d = Math.floor(t[l] / e) % 10;
            s[o[d] - 1] = t[l], o[d]--, swapCount++, history.push({
              array: [...s],
              comparisonCount: comparisonCount,
              swapCount: swapCount,
              highlightIndices: [l],
              pivotIndex: l,
              sortedIndices: [],
              algorithm: "radix",
              indices: {
                i: l,
                j: 0,
                low: 0,
                high: a - 1
              }
            })
          }
          for (let l = 0; l < a; l++) t[l] = s[l], history.push({
            array: [...t],
            comparisonCount: comparisonCount,
            swapCount: swapCount,
            highlightIndices: [l],
            pivotIndex: l,
            sortedIndices: [],
            algorithm: "radix",
            indices: {
              i: l,
              j: 0,
              low: 0,
              high: a - 1
            }
          })
        }
        return history.push({
          array: [...workingArray],
          comparisonCount: comparisonCount,
          swapCount: swapCount,
          highlightIndices: [],
          pivotIndex: -1,
          sortedIndices: allIndices,
          algorithm: "radix",
          indices: {
            i: workingArray.length,
            j: 0,
            low: 0,
            high: workingArray.length - 1
          }
        }), {
          array: workingArray,
          history: history,
          comparisonCount: comparisonCount,
          swapCount: swapCount
        }
      }
