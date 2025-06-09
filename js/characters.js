// characters.js — Handles character logic, placement, abilities, and projectile collision

let currentEnergy = 50;
let selectedCharacter = null;

// Loaded from characters.json
const CHARACTER_DEFS = {};

/**
 * Load all character definitions from external JSON
 */
async function loadCharacterData() {
  const res = await fetch('data/characters.json');
  const data = await res.json();

  data.characters.forEach(character => {
    CHARACTER_DEFS[character.id] = character;
  });

  // Default selection
  selectCharacter("sarah");
}

/**
 * Set selected character for placement
 */
function selectCharacter(name) {
  if (CHARACTER_DEFS[name]) {
    selectedCharacter = name;
    console.log(`Selected character: ${name}`);
  }
}

/**
 * Attempt to place selected character at given cell
 */
function placeCharacter(row, col) {
  if (!selectedCharacter) return;

  const charData = CHARACTER_DEFS[selectedCharacter];

  if (getCellContent(row, col) !== null) return; // Must be empty
  if (currentEnergy < charData.cost) {
    console.log("Not enough energy!");
    return;
  }

  currentEnergy -= charData.cost;
  updateEnergyUI();

  const cell = gridCells[gridIndex(row, col)];
  const charImg = loadImage(charData.sprite);
  cell.appendChild(charImg);
  setCellContent(row, col, selectedCharacter);

  // Ability activation
  if (charData.shoots) {
    startShooting(row, col, selectedCharacter);
  } else if (charData.generatesEnergy) {
    startGeneratingEnergy(row, col, selectedCharacter, charData.energyRate);
  }
}

/**
 * Update energy counter in UI
 */
function updateEnergyUI() {
  const energySpan = document.getElementById('energy-count');
  energySpan.textContent = formatNumber(currentEnergy);
}

/**
 * Passive energy generation (Sarah)
 */
function startGeneratingEnergy(row, col, characterName, rate) {
  const cell = gridCells[gridIndex(row, col)];

  const produceLoop = async () => {
    while (getCellContent(row, col) === characterName) {
      await sleep(rate);
      if (getCellContent(row, col) !== characterName) break;

      currentEnergy += 25;
      updateEnergyUI();

      // Visual feedback
      const orb = loadImage("assets/sprites/ui/energy_orb.png");
      orb.style.position = "absolute";
      orb.style.top = "16px";
      orb.style.left = "16px";
      orb.style.width = "32px";
      orb.style.height = "32px";
      cell.appendChild(orb);
      setTimeout(() => orb.remove(), 1000);
    }
  };

  produceLoop();
}

/**
 * Shoots projectiles from grid cell (Stormelle)
 */
function startShooting(row, col, characterName) {
  const def = CHARACTER_DEFS[characterName];
  const cell = gridCells[gridIndex(row, col)];

  const shootLoop = async () => {
    while (getCellContent(row, col) === characterName) {
      const shot = loadImage(def.projectile);
      shot.classList.add('projectile');
      shot.style.position = 'absolute';
      shot.style.left = '0px';
      shot.style.top = '20px';
      cell.appendChild(shot);

      let x = 0;

      const interval = setInterval(() => {
        x += 5;
        shot.style.left = `${x}px`;

        // Check for collisions
        for (let i = 0; i < activeEnemies.length; i++) {
          const enemy = activeEnemies[i];
          if (enemy.row !== row) continue;

          const enemyX = parseInt(enemy.element.style.left);
          if (Math.abs(enemyX - (cell.offsetLeft + x)) < 20) {
            // Collision!
            damageEnemy(enemy, 25); // Deal damage (adjust as needed)
            shot.remove();
            clearInterval(interval);
            return;
          }
        }

        // Off-screen
        if (x > window.innerWidth) {
          shot.remove();
          clearInterval(interval);
        }
      }, 30);

      await sleep(def.attackRate);
    }
  };

  shootLoop();
}

/**
 * Hook for grid cell click — places selected character
 */
function onGridCellClick(row, col) {
  placeCharacter(row, col);
}
