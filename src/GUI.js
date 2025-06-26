// This file constains all the functions responsable for loading
// and updating the board visible on the DOM as the game progreses

import Ship from "./modules/ship";

const createTile = (row, column, ship = false, hit = false) => {
  const div = document.createElement("div");
  div.className = `${row}-${column}`;

  if (ship) {
    div.className += ` ship`;
  }
  if (hit) {
    div.className += ` hit`;
  }

  return div;
};

const createLegend = (value) => {
  const elem = document.createElement("h3");
  elem.innerText = `${value}`;
  return elem;
};

const loadBoard = (gameboard) => {
  const boardContainer = Object.assign(document.createElement("div"), {
    className: "boardContainer",
  });

  const rowsDiv = Object.assign(document.createElement("div"), {
    className: "rows",
  });
  const rowLegends = Object.assign(document.createElement("div"), {
    className: "rowLegends",
  });
  const columnsLegends = Object.assign(document.createElement("div"), {
    className: "columnsLegends",
  });

  for (let i = 0; i < gameboard.boardLength; i++) {
    rowLegends.appendChild(createLegend(gameboard.board[i][0].row));
    columnsLegends.appendChild(createLegend(i + 1));
  }

  for (let rows of gameboard.board) {
    let rowDiv = Object.assign(document.createElement("div"), {
      className: `row${rows[0].row}`,
    });
    for (let columns of rows) {
      rowDiv.appendChild(
        createTile(rows[0].row, columns.column, columns.ship, columns.hit),
      ); // columns.ship could be null!
    }
    rowsDiv.appendChild(rowDiv);
  }

  boardContainer.appendChild(rowLegends);
  boardContainer.appendChild(columnsLegends);
  boardContainer.appendChild(rowsDiv);

  return boardContainer;
};
export default loadBoard;

// this part handles creating a mini GUI in order for the player
// to be able to actually add ships!

export async function loadPlayerShipsGUI(player) {
  let shipsCoords = [];
  let placedShips = [];
  const ships = [
    new Ship(5, "v"),
    new Ship(4, "v"),
    new Ship(3, "v"),
    new Ship(3, "v"),
    new Ship(2, "v"),
  ];

  document.body.appendChild(loadBoard(player.gameboard));
  const result = await loadShipsMenu([shipsCoords, placedShips],ships);
  return result;
}

function loadShipsMenu(promise, ships) {
  return new Promise((resolve) => {

    const menu = document.createElement("div");
    const carrousel = createShipCarrousel(ships);
    const readyBtn = Object.assign(document.createElement("button"), {
      innerText: "Ready",
    });

    menu.appendChild(carrousel);
    menu.appendChild(readyBtn); //only append it when all of the boats have been put on the board
    document.body.appendChild(menu);

    readyBtn.addEventListener("click", () => {
      resolve(promise); 
    });
  });
}

function createShipCarrousel(ships){
  const carrousel = document.createElement("div");
  carrousel.className = "carrousel";
  const mainDiv = document.createElement("div");

  const shipsDiv = Object.assign(document.createElement("div"),{
    className: "carrouselShips"
  });
  const rotateBtn = Object.assign(document.createElement("button"), {
    innerText: "Rotate",
  });

  for (let ship of ships){
    shipsDiv.appendChild(createShipDiv(ship.length));
  }

  mainDiv.appendChild(shipsDiv)
  carrousel.appendChild(mainDiv)
  carrousel.appendChild(rotateBtn)
  
  console.log(shipsDiv);
  return carrousel;
}

function createShipDiv(length){
  const shipDiv = document.createElement("div");
  shipDiv.classList = "carrouselShip"
  for(let i = 0; i < length; i++){
    let tile = Object.assign(document.createElement("div"), {
      className: "shipTile",
    })
    shipDiv.appendChild(tile);
  }

  shipDiv.addEventListener("click", () =>{
    shipDiv.classList.toggle("selected");
    console.log(`You clicked on a ship with a legth of: ${length}`);
  })

  return shipDiv;
}
