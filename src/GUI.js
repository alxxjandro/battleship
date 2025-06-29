// This file constains all the functions responsable for loading
// and updating the board visible on the DOM as the game progreses

import Ship from "./modules/ship";

const createTile = (
  row,
  column,
  ship = false,
  hit = false,
  onClick = false,
  onHover,
  onHoverLeft,
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
    div.addEventListener("mouseover", onHover);
    div.addEventListener("mouseout", onHoverLeft);
  }
  return div;
};

const createLegend = (value) => {
  const elem = document.createElement("h3");
  elem.innerText = `${value}`;
  return elem;
};

const loadBoard = (gameboard, onClick, onHover, onHoverLeft) => {
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
          onHover,
          onHoverLeft,
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
  return new Promise(function (resolve, reject) {
    function handleClick(e) {
      try {
        let tile = e.target;
        let [row, column] = tile.className.split("-");
        column = column.split(" ")[0]; //remove the hover class haha
        let orientation = document.getElementById("rotateBtn").className;
        const tempShip = new Ship(length, orientation);
        const shipCoords = player.gameboard.placeShip([row, column], tempShip);

        shipCoords.forEach(([row, col]) => {
          const tile = document.querySelector(`.${row}-${col}`);
          tile.classList.add("ship");
        });
        resolve(shipCoords);
      } catch (e) {
        console.error("Invalid placement:", e.message);
      }
    }

    function onHover(e) {
      try {
        let [row, column] = e.target.className.split("-");
        let orientation = document.getElementById("rotateBtn").className;
        let coords = getHoverCoords(
          row,
          column,
          length,
          orientation,
          player.gameboard.board,
        );

        coords.forEach(([r, c]) => {
          const tile = document.querySelector(`.${r}-${c}`);
          if (tile) tile.classList.add("tileHover");
        });
      } catch (err) {
        //ignore them ajajajaj
      }
    }

    function onHoverLeft(e) {
      try {
        document.querySelectorAll(".tileHover").forEach((tile) => {
          tile.classList.remove("tileHover");
        });
      } catch (err) {
        // silently ignore
      }
    }

    try {
      let previousBoard = document.querySelector(".boardContainer");
      let prevMenu = document.querySelector(".ShipMenu");
      if (previousBoard) {
        previousBoard.remove();
        prevMenu.remove();
      }
      const board = loadBoard(
        player.gameboard,
        handleClick,
        onHover,
        onHoverLeft,
      );
      document.body.appendChild(board);
      document.body.appendChild(boatMenu(length));
    } catch (e) {
      reject(e);
    }
  });
}

function boatMenu(boatLength) {
  const menu = document.createElement("div");
  menu.className = "ShipMenu";
  const rotateBtn = document.createElement("button");

  rotateBtn.innerText = "Rotate Ship";
  rotateBtn.id = "rotateBtn";
  rotateBtn.className = "v";

  rotateBtn.addEventListener("click", () => {
    document.querySelector(".shipDiv").classList.toggle("rotateShip");
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

function getHoverCoords(row, column, length, orientation, board) {
  //same logic as the gameboard.js one but without actually placing the ship
  const shipLength = length;
  let changedCoords = [];

  const rowIndex = row.charCodeAt(0) - 65; //'A' → 0
  const colIndex = column - 1; //1-based input

  if (orientation === "v") {
    //starting values for a odd ship length
    let offset = Math.floor(shipLength / 2);
    let startRow = rowIndex - offset;
    let endRow = rowIndex + offset;

    if (!(shipLength % 2)) {
      endRow = rowIndex + (offset - 1);
    } //if its an even length ship

    for (let i = startRow; i <= endRow; i++) {
      if (!board[i] || !board[i][colIndex]) {
        throw new Error("Ship placement out of bounds.");
      }
      if (board[i][colIndex].ship.length != null) {
        throw new Error("Two ship's should not overlap!");
      }
      changedCoords.push([board[i][colIndex].row, board[i][colIndex].column]);
    }
  } else if (orientation === "h") {
    //odd length ships
    let offset = Math.floor(shipLength / 2);
    let startColumn = colIndex - offset;
    let endColumn = colIndex + offset;

    if (!(shipLength % 2)) {
      endColumn = colIndex + (offset - 1);
    } //if its an even length ship

    for (let i = startColumn; i <= endColumn; i++) {
      if (!board[i] || !board[i][colIndex]) {
        throw new Error("Ship placement out of bounds.");
      }
      if (board[rowIndex][i].ship.length != null) {
        throw new Error("Two ship's should not overlap!");
      }
      changedCoords.push([board[rowIndex][i].row, board[rowIndex][i].column]);
    }
  }
  return changedCoords;
}
