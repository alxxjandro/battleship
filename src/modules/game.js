import Player from "./player.js";
import { loadShips, playRound } from "../GUI.js";
import "../styles.css";

class Game {
  constructor() {
    this.players = [new Player("user", 1), new Player("user", 2)];
    this.defaultLengths = [1, 2]; //[5, 4, 3, 3, 2];
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
    document.querySelectorAll(".turnDesc").forEach((el) => el.remove());
    document.querySelectorAll(".boardContainer").forEach((el) => el.remove());

    let playAgain = document.createElement("button");
    playAgain.innerText = "Play another round!";
    playAgain.addEventListener("click", () => {
      location.reload();
    });

    document.body.appendChild(playAgain);
  }
}

export default Game;
