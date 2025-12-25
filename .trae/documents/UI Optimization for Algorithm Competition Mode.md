## Implementation Plan for UI Optimization

### 1. **Move Mode Switch Buttons to Navbar**
   - **File**: `modules/navbar.js`
   - **Change**: Add mode switch buttons (`single-mode-btn`, `competition-mode-btn`) next to the h1 title in the navbar
   - **Layout**: Update flex container to include buttons after the h1 element
   - **Remove**: Duplicate mode switch buttons from `modules/visualization.js`

### 2. **Remove Competition Title**
   - **File**: `modules/visualization.js`
   - **Change**: Delete the `<h2>` element with text "算法竞赛 - 实时对比"

### 3. **Simplify to 2-Algorithm Support**
   - **File**: `modules/visualization.js`
   - **Change**: Remove the `algorithm-count-select` dropdown menu
   - **Cleanup**: Ensure only 2 algorithm selects are displayed by default

### 4. **Move Algorithm Selects Above Visualization**
   - **File**: `modules/visualization.js`
   - **Change**: Restructure the competition layout to place algorithm selects above the visualization area
   - **Position**: Insert algorithm select dropdowns (algorithm 1 and 2) before the visualization containers
   - **Layout**: Use grid or flex layout to display selects horizontally

### 5. **Move Performance Metrics and Chart**
   - **File**: `modules/visualization.js`
   - **Change**: Restructure the layout to move performance metrics and chart below the algorithm comparison
   - **Position**: Place these elements after the visualization containers, spanning the full width
   - **Layout**: Use `md:col-span-3` to ensure they occupy the left 75% area

### 6. **Merge Duplicate Control Buttons**
   - **File**: `modules/visualization.js`
   - **Change**: Remove duplicate start/reset buttons from the competition config panel
   - **Keep**: Only retain the global control buttons (`competition-start-btn`, `competition-pause-btn`, `competition-reset-btn`)
   - **Cleanup**: Remove `start-competition-btn` and `reset-competition-btn` from the config panel

### Expected Result
- Clean navbar with mode switch buttons next to title
- Streamlined competition layout with only 2 algorithms
- Intuitive control flow with algorithm selects above visualization
- Performance metrics and chart displayed prominently below visualization
- Single set of control buttons for consistent user experience
- Responsive design maintained across all screen sizes