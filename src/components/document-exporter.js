/**
 * DocumentExporter —— 文档导出
 *
 * 把当前算法与步骤记录导出为 HTML / Markdown 文档。
 */

export class DocumentExporter {
        constructor() {
          this.documentData = [], this.currentAlgorithm = "", this.startTime = null, this.endTime = null
        }
        init(t) {
          this.documentData = [], this.currentAlgorithm = t, this.startTime = new Date, this.endTime = null, this.documentData.push({
            type: "header",
            level: 1,
            content: `${t} 算法执行解释文档`
          }), this.documentData.push({
            type: "section",
            title: "基本信息",
            content: [`执行时间: ${this.startTime.toLocaleString()}`, `算法名称: ${t}`, "文档类型: 算法执行过程解释"]
          })
        }
        addStep(t, n, e) {
          this.documentData.push({
            type: "step",
            stepNumber: t,
            explanation: n,
            logs: e,
            timestamp: new Date
          })
        }
        complete(t) {
          this.endTime = new Date, this.documentData.push({
            type: "section",
            title: "执行统计",
            content: [`总执行时间: ${((this.endTime-this.startTime)/1e3).toFixed(2)} 秒`, `总步骤数: ${this.documentData.filter(t=>"step"===t.type).length} 步`, `比较次数: ${t.comparisonCount}`, `交换次数: ${t.swapCount}`]
          }), this.documentData.push({
            type: "section",
            title: "算法总结",
            content: [`该${this.currentAlgorithm}算法成功完成了排序任务。`, `通过${this.documentData.filter(t=>"step"===t.type).length}个步骤，将无序数组转换为有序数组。`, `算法执行过程中进行了${t.comparisonCount}次元素比较和${t.swapCount}次元素交换。`]
          })
        }
        generateHTML() {
          let t = `<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${this.currentAlgorithm} 算法执行解释文档</title>\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n        \n        body {\n            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;\n            line-height: 1.6;\n            color: #333;\n            background-color: #f5f5f5;\n        }\n        \n        .container {\n            max-width: 1200px;\n            margin: 0 auto;\n            padding: 20px;\n            background-color: white;\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n            margin-top: 20px;\n            margin-bottom: 20px;\n        }\n        \n        h1 {\n            color: #165DFF;\n            margin-bottom: 20px;\n            text-align: center;\n        }\n        \n        h2 {\n            color: #374151;\n            margin: 20px 0 15px 0;\n            border-bottom: 2px solid #e5e7eb;\n            padding-bottom: 5px;\n        }\n        \n        h3 {\n            color: #4B5563;\n            margin: 15px 0 10px 0;\n        }\n        \n        .section {\n            margin: 20px 0;\n            padding: 15px;\n            background-color: #f9fafb;\n            border-radius: 8px;\n        }\n        \n        .section-title {\n            font-weight: bold;\n            margin-bottom: 10px;\n            color: #1f2937;\n        }\n        \n        .step {\n            margin: 25px 0;\n            padding: 20px;\n            background-color: #ffffff;\n            border: 1px solid #e5e7eb;\n            border-radius: 8px;\n            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n        }\n        \n        .step-number {\n            font-weight: bold;\n            color: #165DFF;\n            font-size: 1.2em;\n            margin-bottom: 10px;\n        }\n        \n        .step-explanation {\n            margin-bottom: 15px;\n            font-size: 1.1em;\n            color: #374151;\n        }\n        \n        .logs-container {\n            margin-left: 20px;\n            border-left: 3px solid #165DFF;\n            padding-left: 15px;\n        }\n        \n        .log-entry {\n            margin: 5px 0;\n            padding: 8px 12px;\n            background-color: #f3f4f6;\n            border-radius: 4px;\n            font-family: 'Courier New', Courier, monospace;\n            font-size: 0.9em;\n        }\n        \n        .log-type-selection {\n            background-color: #dbeafe;\n            border-left: 3px solid #3b82f6;\n        }\n        \n        .log-type-swap {\n            background-color: #fee2e2;\n            border-left: 3px solid #ef4444;\n        }\n        \n        .log-type-comparison {\n            background-color: #d1fae5;\n            border-left: 3px solid #10b981;\n        }\n        \n        .stat-list {\n            list-style-type: none;\n            padding: 0;\n        }\n        \n        .stat-list li {\n            margin: 5px 0;\n            padding: 5px 0;\n        }\n        \n        .footer {\n            margin-top: 30px;\n            padding-top: 20px;\n            border-top: 2px solid #e5e7eb;\n            text-align: center;\n            color: #6b7280;\n            font-size: 0.9em;\n        }\n    </style>\n</head>\n<body>\n    <div class="container">\n`;
          return this.documentData.forEach(n => {
            switch (n.type) {
              case "header":
                t += `<h${n.level}>${n.content}</h${n.level}>`;
                break;
              case "section":
                t += `\n                    <div class="section">\n                        <div class="section-title">${n.title}</div>\n                        <ul class="stat-list">`, n.content.forEach(n => {
                  t += `<li>${n}</li>`
                }), t += "\n                        </ul>\n                    </div>";
                break;
              case "step":
                t += `\n                    <div class="step">\n                        <div class="step-number">步骤 ${n.stepNumber}</div>\n                        <div class="step-explanation">${n.explanation}</div>\n                        <div class="logs-container">`, n.logs.forEach(n => {
                  const e = `log-type-${n.type}`;
                  t += `<div class="log-entry ${e}">${n.content}</div>`
                }), t += "\n                        </div>\n                    </div>"
            }
          }), t += `\n        <div class="footer">\n            <p>算法执行解释文档 - 生成时间: ${this.endTime.toLocaleString()}</p>\n        </div>\n    </div>\n</body>\n</html>`, t
        }
        generateMarkdown() {
          let t = `# ${this.currentAlgorithm} 算法执行解释文档\n\n`;
          return this.documentData.forEach(n => {
            switch (n.type) {
              case "header":
                t += `${"#".repeat(n.level)} ${n.content}\n\n`;
                break;
              case "section":
                t += `## ${n.title}\n\n`, n.content.forEach(n => {
                  t += `- ${n}\n`
                }), t += "\n";
                break;
              case "step":
                t += `### 步骤 ${n.stepNumber}\n\n`, t += `${n.explanation}\n\n`, t += "**执行日志:**\n\n", n.logs.forEach(n => {
                  let e = "";
                  switch (n.type) {
                    case "selection":
                      e = "🔵 ";
                      break;
                    case "swap":
                      e = "🔴 ";
                      break;
                    case "comparison":
                      e = "🟢 ";
                      break;
                    default:
                      e = "⚪ "
                  }
                  t += `${e}\`${n.content}\`\n\n`
                })
            }
          }), t
        }
        exportDocument(t = "html") {
          if (this.endTime = new Date, "html" === t) return this.generateHTML();
          if ("markdown" === t) return this.generateMarkdown();
          throw new Error("不支持的文档格式")
        }
        saveDocument(t = "html") {
          const n = this.exportDocument(t),
            e = `${this.currentAlgorithm}-execution-document-${Date.now()}.${t}`,
            i = new Blob([n], {
              type: "html" === t ? "text/html" : "text/markdown"
            }),
            r = URL.createObjectURL(i),
            a = document.createElement("a");
          return a.href = r, a.download = e, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(r), e
        }
      }
