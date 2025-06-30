import Gameboard from "./gameboard.js";

class Player {
  constructor(type = "computer", number) {
    this.type = type;
    this.gameboard = new Gameboard(10);
    this.number = number;
  }
}

export default Player;
