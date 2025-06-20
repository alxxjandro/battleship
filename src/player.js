import Gameboard from "./gameboard.js";

class Player {
  constructor(type = "computer") {
    this.type = type;
    this.gameboard = new Gameboard(10);
  }
}

export default Player;
