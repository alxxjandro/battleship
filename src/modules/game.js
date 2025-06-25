import Player from "./player.js";
import Ship from "./ship.js";
import loadBoard from "../GUI.js";
import { loadPlayerShipsGUI } from "../GUI.js";
import "../styles.css";

class Game {

  constructor() {
    this.players = [new Player("user"), new Player("user")];
  }

  async start() {
    const body = document.body;
    for (let player of this.players){
      const [coords, ships] = await loadPlayerShipsGUI(player);

      let test = await setTimeout(() => {
        console.log("Delayed for 1 second.");
      }, "1000");

      loadPlayerShips(player, coords, ships);
      body.appendChild(loadBoard(player.gameboard));
    }
  }

}

const loadPlayerShips = (player, coords, ships) =>{
  for (let i = 0; i < ships.length; i++) {
    player.gameboard.placeShip(coords[i], ships[i]);
  }
}

export default Game;
