import Game from "./modules/game.js";

// This file is the one responsable for
// starting the main game encapsulated on a variable

// Show welcome overlay and start game on button click
window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('welcomeOverlay');
  const startBtn = document.getElementById('startGameBtn');

  if (overlay && startBtn) {
    overlay.style.display = 'flex';
    startBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
      const game = new Game();
      game.start();
    });
  } else {
    // fallback: start game immediately if overlay not found
    const game = new Game();
    game.start();
  }
});
