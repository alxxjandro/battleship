// This file constains all the functions responsable for loading
// and updating the board visible on the DOM as the game progreses

import Ship from "./modules/ship";

const createTile = (
  row,
  column,
  ship = false,
  hit = false,
  onClick = false,
) => {
  const div = document.createElement("div");
  div.className = `${row}-${column}`;

  if (ship) {
    div.className += ` ship`;
  }
  if (hit) {
    div.className += ` hit`;
  }

  if (onClick) {
    div.addEventListener("click", onClick);
  }

  return div;
};

const createLegend = (value) => {
  const elem = document.createElement("h3");
  elem.innerText = `${value}`;
  return elem;
};

const loadBoard = (gameboard, onClick) => {
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
        createTile(
          rows[0].row,
          columns.column,
          columns.ship,
          columns.hit,
          onClick,
        ),
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

export async function loadShips(player, length) {
  //this handles wether or not the ship can be places,
  function handleClick(e) {
    try {
      let tile = e.target;
      let [row, column] = tile.className.split("-");
      let orientation = document.getElementById("rotateBtn").className;

      const tempShip = new Ship(length, orientation);
      const shipCoords = player.gameboard.placeShip([row, column], tempShip);
      shipCoords.forEach(([row, col]) => {
        const tile = document.querySelector(`.${row}-${col}`);
        tile.classList.add("ship");
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  return new Promise(function (resolve, reject) {
    try {
      const board = loadBoard(player.gameboard, handleClick);
      document.body.appendChild(board);
      document.body.appendChild(boatMenu(length));
    } catch (e) {
      reject();
      throw new Error(e);
    }
  });
}

function boatMenu(boatLength) {
  const menu = document.createElement("div");
  const rotateBtn = document.createElement("button");

  rotateBtn.innerText = "Rotate Ship";
  rotateBtn.id = "rotateBtn";
  rotateBtn.className = "v";

  rotateBtn.addEventListener("click", () => {
    rotateBtn.className = rotateBtn.className === "v" ? "h" : "v";
  });

  menu.appendChild(createShipVisual(boatLength));
  menu.appendChild(rotateBtn);

  return menu;
}

function createShipVisual(length) {
  const ship = document.createElement("div");
  ship.className = "shipDiv";

  for (let i = 0; i < length; i++) {
    ship.appendChild(
      Object.assign(document.createElement("div"), {
        className: "shipTile",
      }),
    );
  }
  return ship;
}
