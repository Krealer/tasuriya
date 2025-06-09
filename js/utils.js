// utils.js — Reusable helper functions across Tasuriya

/**
 * Convert (row, col) to a 1D array index
 */
function gridIndex(row, col, columns = 9) {
  return row * columns + col;
}

/**
 * Convert a flat index back to (row, col)
 */
function indexToGrid(index, columns = 9) {
  return {
    row: Math.floor(index / columns),
    col: index % columns
  };
}

/**
 * Load an image element from a source URL
 */
function loadImage(src, className = '') {
  const img = new Image();
  img.src = src;
  if (className) img.classList.add(className);
  img.loading = 'lazy';
  img.draggable = false;
  return img;
}

/**
 * Clamp a value between min and max
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Get a random integer between min (inclusive) and max (exclusive)
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Delay for a given number of milliseconds (async sleep)
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format a number nicely for display (e.g. energy counter)
 */
function formatNumber(num) {
  return Math.floor(num).toString();
}

/**
 * Show the Victory screen overlay
 */
function showVictoryScreen() {
  levelIsRunning = false;
  const victory = document.getElementById("victory-screen");
  if (victory) {
    victory.classList.remove("hidden");
  }
}
