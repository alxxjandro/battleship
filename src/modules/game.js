import Player from "./player.js";
import Ship from "./ship.js";
import loadBoard from "../GUI.js";
import "../styles.css";

class Game {
  constructor() {
    this.players = [new Player("user"), new Player("user")];
  }
  start() {
    const testShip = new Ship(4, "v");
    this.players[0].gameboard.placeShip(["C", 4], testShip);
    this.players[0].gameboard.receiveAttack(["C", 4]);
    document.body.appendChild(loadBoard(this.players[0].gameboard));
  }
}

export default Game;
