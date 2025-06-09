// enemies.js — Handles enemy spawning, movement, damage, and victory check

// === Enemy Definitions ===
const ENEMY_DEFS = {
  tigaress: {
    name: "Tigaress",
    health: 100,
    speed: 1, // pixels per frame
    damage: 10,
    attackRate: 1000,
    sprite: "assets/sprites/enemies/tigaress.png"
  }
};

// === Active Enemies List ===
const activeEnemies = [];

/**
 * Spawns an enemy of a given type at a specific row
 */
function spawnEnemy(type = "tigaress", row = null) {
  const def = ENEMY_DEFS[type];
  if (!def) {
    console.warn(`Enemy type "${type}" not found.`);
    return;
  }

  // Choose random row if not specified
  row = row !== null ? row : randInt(0, GRID_ROWS);

  // Create DOM element
  const enemyImg = document.createElement("img");
  enemyImg.src = def.sprite;
  enemyImg.classList.add("enemy");
  enemyImg.style.position = "absolute";
  enemyImg.style.width = "64px";
  enemyImg.style.height = "64px";
  enemyImg.style.top = `${row * CELL_SIZE + gridElement.offsetTop}px`;
  enemyImg.style.left = `${window.innerWidth}px`;

  // Attach to DOM
  document.body.appendChild(enemyImg);

  // Create and track enemy object
  const enemyObj = {
    id: crypto.randomUUID(),
    row,
    x: window.innerWidth,
    health: def.health,
    element: enemyImg,
    def
  };

  activeEnemies.push(enemyObj);
  moveEnemy(enemyObj);
}

/**
 * Moves enemy left across the screen, checking for collisions
 */
function moveEnemy(enemyObj) {
  const { def, row, element } = enemyObj;

  const interval = setInterval(() => {
    enemyObj.x -= def.speed;
    element.style.left = `${enemyObj.x}px`;

    // Check for character in grid cell
    const col = Math.floor((enemyObj.x - gridElement.offsetLeft) / CELL_SIZE);
    if (col >= 0 && col < GRID_COLS) {
      const content = getCellContent(row, col);
      if (content) {
        clearInterval(interval);
        attackCharacter(enemyObj, row, col);
        return;
      }
    }

    // If enemy reaches the left edge (base)
    if (enemyObj.x < 0) {
      clearInterval(interval);
      element.remove();
      console.log("Enemy reached the base!");
      // You can add game-over logic here
    }
  }, 30);
}

/**
 * Attacks a character repeatedly until it is removed, then resumes movement
 */
function attackCharacter(enemyObj, row, col) {
  const { def, element } = enemyObj;

  const attackLoop = setInterval(() => {
    const content = getCellContent(row, col);
    if (!content) {
      clearInterval(attackLoop);
      moveEnemy(enemyObj);
      return;
    }

    // For now: immediately destroy character (no HP system)
    const cell = gridCells[gridIndex(row, col)];
    cell.innerHTML = '';
    setCellContent(row, col, null);
    clearInterval(attackLoop);
    moveEnemy(enemyObj);
  }, def.attackRate);
}

/**
 * Damages an enemy and removes it if health <= 0
 */
function damageEnemy(enemyObj, amount) {
  enemyObj.health -= amount;
  if (enemyObj.health <= 0) {
    removeEnemy(enemyObj);
  }
}

/**
 * Removes enemy from DOM and tracking; checks for victory
 */
function removeEnemy(enemyObj) {
  enemyObj.element.remove();

  const index = activeEnemies.findIndex(e => e.id === enemyObj.id);
  if (index !== -1) {
    activeEnemies.splice(index, 1);
  }

  // === VICTORY CHECK ===
  if (activeEnemies.length === 0 && levelIsRunning) {
    showVictoryScreen();
  }
}
