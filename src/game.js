import Player from "./player.js";
import "./styles.css"

class Game {
  constructor() {
    this.players = [new Player("user"),new Player("user")];
  }
}

export default Game;