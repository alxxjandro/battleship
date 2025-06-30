import Player from "./player.js";
import { loadShips, playRound } from "../GUI.js";
import "../styles.css";

class Game {
  constructor() {
    this.players = [new Player("user",1), new Player("user",2)];
    this.defaultLengths = [1,2] //[5, 4, 3, 3, 2];
  }

  async start() {
    try {
      //load both players ships!
      for (let player of this.players) {
        let coords = [];
        for (let length of this.defaultLengths) {
          coords.push(await loadShips(player, length));
        }
        // console.log(this.players);
        // console.log(coords);
      }
      //while a player hasn't won, play rounds
      while (true) {
        await playRound(this.players[0], this.players[1]);
        console.log("made i")
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default Game;
