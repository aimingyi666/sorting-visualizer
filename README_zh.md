# 排序算法可视化工具

一个全面的交互式排序算法可视化项目，展示了各种排序算法的2D和3D可视化效果、代码高亮和详细解释。

## 功能特性

- **多种排序算法**：冒泡排序、选择排序、插入排序、快速排序、归并排序、希尔排序、堆排序、计数排序和基数排序
- **双可视化模式**：2D和3D可视化效果
- **交互式控制**：可调整数组大小、动画速度和算法参数
- **实时步骤解释**：每个排序步骤的详细说明
- **代码高亮**：多种编程语言的算法实现语法高亮
- **深色/浅色模式**：可切换深色和浅色主题
- **响应式设计**：适配不同屏幕尺寸

## 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **可视化**：Three.js (用于3D), Canvas API (用于2D)
- **代码高亮**：highlight.js
- **构建工具**：Vite
- **图标**：Font Awesome
- **样式**：Tailwind CSS (自定义实现)

## 安装说明

1. 克隆仓库
   ```bash
   git clone https://github.com/aimingyi666/sorting-visualizer.git
   cd sorting-visualizer
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   ```

4. 打开浏览器，访问 `http://localhost:3000`

## 使用指南

1. **选择算法**：使用标签页从可用的排序算法中选择
2. **调整参数**：使用控制面板调整数组大小、速度和其他参数
3. **开始可视化**：点击"开始"按钮开始排序可视化
4. **单步执行**：使用"上一步"和"下一步"按钮逐步执行算法
5. **切换视图**：在2D和3D可视化模式之间切换
6. **查看代码**：选择不同的编程语言查看算法实现
7. **深色模式**：切换深色/浅色模式以获得舒适的查看体验

## 项目结构

```
sorting-visualizer/
├── algorithms/          # 排序算法实现
│   └── index.js        # 算法导出
├── modules/             # 主应用模块
│   ├── navbar.js        # 导航栏组件
│   ├── visualization.js # 2D可视化组件
│   ├── visualization-3d.js # 3D可视化组件
│   ├── control-panel.js # 控制面板组件
│   ├── code-section.js  # 代码显示组件
│   ├── explanation-section.js # 算法解释组件
│   ├── footer.js        # 页脚组件
│   └── explanatory-document.js # 文档生成组件
├── css/                 # CSS文件
│   ├── style.css        # 主样式
│   └── responsive.css   # 响应式样式
├── assets/              # 静态资源
├── .gitignore           # Git忽略配置
├── index.html           # 主HTML文件
├── script.js            # 主应用脚本
├── package.json         # 项目依赖
├── README.md            # 英文说明文档
└── README_zh.md         # 中文说明文档
```

## 可用算法

1. **冒泡排序** - O(n²)
2. **选择排序** - O(n²)
3. **插入排序** - O(n²)
4. **快速排序** - 平均O(n log n)
5. **归并排序** - O(n log n)
6. **希尔排序** - O(n^1.3)
7. **堆排序** - O(n log n)
8. **计数排序** - O(n+k)
9. **基数排序** - O(d*(n+k))

## 浏览器支持

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## 许可证

MIT License

## 贡献指南

欢迎贡献！请随时提交Pull Request。

## 致谢

- 受各种排序算法可视化工具的启发
- 使用现代Web技术构建
- 专为教育目的设计

## 联系方式

如有问题或反馈，请在GitHub上打开一个issue。

---

**愉快排序！** 🚀