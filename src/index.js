import Game from "./game.js";
import Ship from "./ship.js"

//This file will handle loading the GUI and making the correct visual changes
const loadBoard = (gameboard) =>{
  console.log(gameboard.board)
  const boardContainer = Object.assign(document.createElement("div"),{className: "boardContainer"});

  for (let rows of gameboard.board){
    let rowDiv = Object.assign(document.createElement("div"),{className: `row${rows[0].row}`});
    for (let columns of rows){
      rowDiv.appendChild(createTile(rows[0].row, columns.column, columns.ship)) // columns.ship could be null!
    }
    boardContainer.appendChild(rowDiv);
  }
  return boardContainer;
}

const createTile = (row, column, ship) =>{
  const div = document.createElement("div");
  div.className = `${row}-${column}`;
  if (ship) { div.className += ` ship` }
  console.log(div);
  return div;
}

const startGame = () =>{
  const game = new Game();

  //testing purpouses only
  const testShip = new Ship(4, "v");
  game.players[0].gameboard.placeShip(["C", 4], testShip);

  document.body.appendChild(loadBoard(game.players[0].gameboard));
  document.body.appendChild(loadBoard(game.players[1].gameboard));
};
startGame();




