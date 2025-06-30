import Player from "./player.js";
import { loadShips, playRound } from "../GUI.js";
import "../styles.css";

class Game {
  constructor() {
    this.players = [new Player("user", 1), new Player("user", 2)];
    this.defaultLengths =  [5, 4, 3, 3, 2];
  }

  async start() {
    try {
      //placing ships
      for (let player of this.players) {
        for (let length of this.defaultLengths) {
          await loadShips(player, length);
        }
      }
      //playing
      while (true) {
        const finished = await playRound(this.players[0], this.players[1]);
        console.log("hereeee");
        if (finished === true) break;
        if (finished.switchPlayers) {
          [this.players[0], this.players[1]] = [
            this.players[1],
            this.players[0],
          ];
        }
      }
      //final msg
      this.end();
    } catch (e) {
      console.error("Something went wrong:", e);
    }
  }

  end() {
    // Remove all game UI
    const main = document.querySelector('.main-container');
    if (main) main.innerHTML = '';
    // Remove any turnDesc
    document.querySelectorAll('.turnDesc').forEach((el) => el.remove());
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'game-over-modal';
    const box = document.createElement('div');
    box.className = 'game-over-box';
    box.innerHTML = `<h2>Game Over!</h2><p>Would you like to play again?</p>`;
    const playAgain = document.createElement('button');
    playAgain.innerText = 'Play Again';
    playAgain.className = 'play-again-btn';
    playAgain.addEventListener('click', () => {
      location.reload();
    });
    box.appendChild(playAgain);
    modal.appendChild(box);
    document.body.appendChild(modal);
  }
}

export default Game;
