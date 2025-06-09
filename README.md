# 🍿 Tasuriya

**Tasuriya** is a 2D, tile-based tower defense game inspired by *Plants vs. Zombies*, built using **HTML**, **CSS**, and **JavaScript**. Instead of plants, you control mystical characters who defend your base from waves of enchanted enemies.

This project is proudly handcrafted with pixel art, audio assets, and custom logic — no frameworks, just browser-native code.

---

## 🎮 Gameplay

* Deploy characters like **Sarah** (energy producer) and **Stormelle** (ranged attacker) on a 5×9 grid.
* Defend your **base** from mystical creatures like **Tigaress**.
* Earn and manage **energy orbs** to place more defenders.
* Survive waves of enemies and claim **victory**!

---

## 🧙 Characters

| Character | Role            | Cost | Ability                       |
| --------- | --------------- | ---- | ----------------------------- |
| Sarah     | Energy producer | 25   | Generates energy every 7s     |
| Stormelle | Ranged attacker | 50   | Shoots projectiles at enemies |

---

## 👹 Enemies

| Enemy    | Health | Speed | Behavior                              |
| -------- | ------ | ----- | ------------------------------------- |
| Tigaress | 100    | Slow  | Walks toward base, attacks on contact |

---

## 📁 Project Structure

```
tasuriya/
├── index.html                # Main HTML file
├── style/
│   └── main.css              # Game styles
├── js/
│   ├── game.js               # Game controller
│   ├── characters.js         # Character logic
│   ├── enemies.js            # Enemy behavior
│   ├── grid.js               # Grid and placement
│   └── utils.js              # Shared helper functions
├── assets/
│   ├── sprites/
│   │   ├── characters/       # Sarah, Stormelle
│   │   ├── enemies/          # Tigaress
│   │   └── ui/               # Energy orb, projectiles
│   └── sounds/               # Background music
├── data/
│   ├── characters.json       # Character definitions
│   ├── enemies.json          # Enemy stats
│   └── levels.json           # Level wave configuration
├── favicon.png               # Tab icon
└── README.md                 # You're reading it!
```

---

## 🛠 Tech Stack

* HTML5 / CSS3
* JavaScript (no libraries or frameworks)
* JSON for data storage
* Native browser APIs
* Pixel art + MP3 audio

---

## 🚀 Getting Started

To run the game locally:

```bash
git clone https://github.com/krealer/tasuriya.git
cd tasuriya
open index.html   # or just drag it into your browser
```

> No server or build tools required — works entirely in your browser.

---

## 🔈 Known Issues

* Audio autoplay is blocked until first click (browser policy)
* Characters do not have health systems (coming soon!)
* Game over screen when enemies reach base is not yet implemented

---

## 🎯 Planned Features

* Game over screen
* Health bars for enemies and characters
* New characters with unique abilities
* Additional enemy types
* Level progression and unlock system
* Save/load functionality

---

## 📜 License

**Tasuriya** is a creative, personal project and is not affiliated with *Plants vs. Zombies*.
All characters, code, and original assets © Krealer.

---

## ✨ Credits

Created by **Krealer**
Pixel art, design, and development: 🧑‍💻
Game idea inspired by *PvZ*, built from scratch for web browsers.
