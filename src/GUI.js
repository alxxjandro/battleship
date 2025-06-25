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
  return new Promise((resolve) => {

    const ships = [
      new Ship(5, "v"),
      new Ship(4, "v"),
      new Ship(3, "v"),
      new Ship(3, "v"),
      new Ship(2, "v"),
    ];
    
    const menu = document.createElement("div");
    const carousel = createShipCarousel(ships);
    const h1 = Object.assign(document.createElement("h1"), {
      innerText: "Let's start by placing your ship's!",
    });

    const readyBtn = Object.assign(document.createElement("button"), {
      innerText: "Ready",
    });

    menu.appendChild(h1);
    menu.appendChild(carousel);
    menu.appendChild(readyBtn);
    document.body.appendChild(menu);

    readyBtn.addEventListener("click", () => {
      resolve([shipsCoords, ships]);
    });

  });
}

export function createShipCarousel(ships) {

  let currentIndex = 0;
  //main div
  const carousel = document.createElement("div");
  carousel.className = "ship-carousel";

  //arrows
  const leftArrow = document.createElement("button");
  leftArrow.className = "arrow left";
  leftArrow.innerHTML = "&#8592;";
  const rightArrow = document.createElement("button");
  rightArrow.className = "arrow right";
  rightArrow.innerHTML = "&#8594;";

  //ship containers 
  const shipVisual = document.createElement("div");
  shipVisual.className = "ship";
  shipVisual.id = "ship-placeholder";
  const shipLabel = document.createElement("p");
  shipLabel.id = "ship-label";

  //rotate btn
  const rotateBtn = document.createElement("button");
  rotateBtn.className = "rotate-button";
  rotateBtn.innerText = "↻ Rotate ship";

  //container for arrows, and the ship
  const navContainer = document.createElement("div");
  navContainer.className = "nav-container";
  navContainer.appendChild(leftArrow);
  navContainer.appendChild(shipVisual);
  navContainer.appendChild(rightArrow);

  //main container
  carousel.appendChild(navContainer);
  carousel.appendChild(shipLabel);
  carousel.appendChild(rotateBtn);

  function renderShip(index) {
    const ship = ships[index];
    shipVisual.innerHTML = "";
    for (let i = 0; i < ship.length; i++) {
      const cell = document.createElement("div");
      cell.style.width = "20px";
      cell.style.height = "20px";
      cell.style.backgroundColor = "#555";
      cell.style.margin = "2px";
      shipVisual.appendChild(cell);
    }
    shipLabel.innerText = `Ship of length: ${ship.length}`;
  }

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + ships.length) % ships.length;
    renderShip(currentIndex);
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % ships.length;
    renderShip(currentIndex);
  });

  shipVisual.style.display = "flex";
  shipVisual.style.flexDirection = "row";
  rotateBtn.addEventListener("click", () => {
    shipVisual.style.flexDirection = shipVisual.style.flexDirection === "column" ? "row" : "column";
  });

  renderShip(currentIndex);
  carousel.getCurrentIndex = () => currentIndex;
  return carousel;
}
