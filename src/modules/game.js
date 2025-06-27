import Player from "./player.js";
import Ship from "./ship.js";
import loadBoard from "../GUI.js";
import { loadShips as loadShipsGUI } from "../GUI.js";
import "../styles.css";

class Game {
  constructor() {
    this.players = [new Player("user"), new Player("user")];
  }

  async start() {
    for (let player of this.players) {
      const [coords, ships] = await loadShipsGUI(player);
      console.log(coords, ships);
    }
  }
  
}

export default Game;
