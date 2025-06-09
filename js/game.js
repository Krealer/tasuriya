// game.js — Manages game startup, level loading, and victory logic

// Tracks whether the level is currently active
let levelIsRunning = false;

window.addEventListener("load", () => {
  startGame();
});

/**
 * Initializes the game on page load
 */
async function startGame() {
  console.log("Tasuriya is starting...");

  // Load characters from characters.json
  await loadCharacterData();

  // Set initial energy from characters.js
  updateEnergyUI();

  // Load level data from levels.json
  const levelData = await loadLevelData(1);
  if (!levelData) {
    console.error("Level data not found.");
    return;
  }

  // Apply level-specific starting energy
  currentEnergy = levelData.energyStart ?? 50;
  updateEnergyUI();

  // Run the level (spawns enemies in waves)
  await runLevel(levelData);
}

/**
 * Loads the level data from levels.json by ID
 */
async function loadLevelData(levelId) {
  const res = await fetch("data/levels.json");
  const data = await res.json();
  return data.levels.find(level => level.id === levelId);
}

/**
 * Spawns all waves for the given level
 */
async function runLevel(levelData) {
  levelIsRunning = true;

  for (const wave of levelData.waves) {
    await sleep(wave.delayBefore);

    wave.enemies.forEach(enemy => {
      setTimeout(() => {
        spawnEnemy(enemy.type, enemy.row);
      }, enemy.spawnDelay);
    });
  }

  console.log(`Level ${levelData.id} complete — waiting for all enemies to be defeated.`);
}

/**
 * Shows the victory overlay
 */
function showVictoryScreen() {
  levelIsRunning = false;
  const victory = document.getElementById("victory-screen");
  if (victory) {
    victory.classList.remove("hidden");
  }
}

/**
 * Reloads the page to restart the game
 */
function restartGame() {
  location.reload();
}

/**
 * UNBLOCK AUTOPLAY:
 * Plays music after the first user interaction (required by browsers)
 */
document.addEventListener("click", () => {
  const bgm = document.getElementById("bgm");
  if (bgm && bgm.paused) {
    bgm.volume = 0.5;
    bgm.play().catch(err => console.warn("Autoplay blocked:", err));
  }
}, { once: true });
