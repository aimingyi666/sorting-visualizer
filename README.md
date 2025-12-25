# Sorting Algorithm Visualizer

A comprehensive interactive sorting algorithm visualization project that demonstrates various sorting algorithms with 2D and 3D visualizations, code highlighting, and detailed explanations.

## Features

- **Multiple Sorting Algorithms**: Bubble sort, selection sort, insertion sort, quick sort, merge sort, shell sort, heap sort, counting sort, and radix sort
- **Dual Visualization Modes**: 2D and 3D visualization effects
- **Interactive Controls**: Adjustable array size, animation speed, and algorithm parameters
- **Real-time Step Explanations**: Detailed explanations for each sorting step
- **Code Highlighting**: Syntax highlighting for algorithm implementations in multiple programming languages
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on different screen sizes

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: Three.js (for 3D), Canvas API (for 2D)
- **Code Highlighting**: highlight.js
- **Build Tool**: Vite
- **Icons**: Font Awesome
- **Styling**: Tailwind CSS (custom implementation)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/aimingyi666/sorting-visualizer.git
   cd sorting-visualizer
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Select Algorithm**: Choose from the available sorting algorithms using the tabs
2. **Adjust Parameters**: Use the control panel to adjust array size, speed, and other parameters
3. **Start Visualization**: Click "Start" to begin the sorting visualization
4. **Step Through**: Use "Previous" and "Next" buttons to step through the algorithm
5. **Toggle View**: Switch between 2D and 3D visualization modes
6. **View Code**: Select different programming languages to see the algorithm implementation
7. **Dark Mode**: Toggle dark/light mode for comfortable viewing

## Project Structure

```
sorting-visualizer/
├── algorithms/          # Sorting algorithm implementations
│   └── index.js        # Algorithm exports
├── modules/             # Main application modules
│   ├── navbar.js        # Navigation bar component
│   ├── visualization.js # 2D visualization component
│   ├── visualization-3d.js # 3D visualization component
│   ├── control-panel.js # Control panel component
│   ├── code-section.js  # Code display component
│   ├── explanation-section.js # Algorithm explanation component
│   ├── footer.js        # Footer component
│   └── explanatory-document.js # Document generation component
├── css/                 # CSS files
│   ├── style.css        # Main styles
│   └── responsive.css   # Responsive styles
├── assets/              # Static assets
├── .gitignore           # Git ignore configuration
├── index.html           # Main HTML file
├── script.js            # Main application script
├── package.json         # Project dependencies
└── README.md            # This file
```

## Available Algorithms

1. **Bubble Sort** - O(n²)
2. **Selection Sort** - O(n²)
3. **Insertion Sort** - O(n²)
4. **Quick Sort** - O(n log n) average
5. **Merge Sort** - O(n log n)
6. **Shell Sort** - O(n^1.3)
7. **Heap Sort** - O(n log n)
8. **Counting Sort** - O(n+k)
9. **Radix Sort** - O(d*(n+k))

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Inspired by various sorting algorithm visualizers
- Built with modern web technologies
- Designed for educational purposes

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Happy Sorting!** 🚀