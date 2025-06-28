import Player from "./player.js";
import Ship from "./ship.js";
import loadBoard from "../GUI.js";
import { loadShips as loadShipsGUI } from "../GUI.js";
import "../styles.css";

class Game {
  constructor() {
    this.players = [new Player("user"), new Player("user")];
    this.defaultLengths = [5, 4, 3, 3, 2];
  }

  async start() {
    for (let player of this.players) {
      let coords = [];
      for (let length of this.defaultLengths) {
        coords.push(await loadShipsGUI(player, length));
      }
      console.log(coords, ships);
    }
  }
}

export default Game;
