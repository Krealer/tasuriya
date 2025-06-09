// grid.js — Handles grid creation and interactions

const GRID_ROWS = 5;
const GRID_COLS = 9;
const CELL_SIZE = 64; // in pixels
const gridElement = document.getElementById('grid');

// Create and store grid cells
const gridCells = []; // Stores DOM references
const gridData = [];  // Stores what's in each cell (null, character, enemy)

// Build grid in DOM
function createGrid() {
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.row = row;
      cell.dataset.col = col;

      // You can attach event listeners here for clicks, hovers, etc.
      cell.addEventListener('click', () => onGridCellClick(row, col));

      gridElement.appendChild(cell);
      gridCells.push(cell);
      gridData.push(null); // initially empty
    }
  }
}

// Get the content of a cell
function getCellContent(row, col) {
  return gridData[gridIndex(row, col)];
}

// Set the content of a cell (e.g. place character)
function setCellContent(row, col, content) {
  const index = gridIndex(row, col);
  gridData[index] = content;
}

// Clear the entire grid (for restarting)
function clearGrid() {
  gridCells.forEach(cell => cell.innerHTML = '');
  gridData.fill(null);
}

// Handle click event (placeholder for now)
function onGridCellClick(row, col) {
  console.log(`Clicked cell at row ${row}, col ${col}`);
  // Example: highlight cell or place selected character
}

// Call on game start
createGrid();
