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
    const h1 = Object.assign(document.createElement("h1"), {
      innerText: "Let's start by placing your ship's!",
    });

    const carousel = createShipCarousel(ships);
    menu.appendChild(carousel);
    const readyBtn = Object.assign(document.createElement("button"), {
      innerText: "Ready",
    });

    menu.appendChild(h1);
    menu.appendChild(readyBtn);
    document.body.appendChild(menu);

    readyBtn.addEventListener("click", () => {
      resolve([shipsCoords, ships]);
    });

  });
}

export function createShipCarousel(ships) {
  let currentIndex = 0;

  const carousel = document.createElement("div");
  carousel.className = "ship-carousel";

  const leftArrow = Object.assign(document.createElement("button"), {
    className: "arrow left",
    innerHTML: "&#8592;",
  });

  const shipPreview = document.createElement("div");
  shipPreview.className = "ship-preview";

  const shipVisual = document.createElement("div");
  shipVisual.className = "ship";
  shipVisual.id = "ship-placeholder";

  const shipLabel = document.createElement("p");
  shipLabel.id = "ship-label";

  shipPreview.appendChild(shipVisual);
  shipPreview.appendChild(shipLabel);

  const rightArrow = Object.assign(document.createElement("button"), {
    className: "arrow right",
    innerHTML: "&#8594;",
  });

  const rotateBtn = Object.assign(document.createElement("button"), {
    className: "rotate-button",
    innerText: "↻ Rotar barco",
  });

  // Agregar al carrusel
  carousel.appendChild(leftArrow);
  carousel.appendChild(shipPreview);
  carousel.appendChild(rightArrow);
  carousel.appendChild(rotateBtn);

  // Función para renderizar el barco actual
  function renderShip(index) {
    const ship = ships[index];
    shipVisual.innerHTML = ""; // Limpiar vista previa
    for (let i = 0; i < ship.length; i++) {
      const cell = document.createElement("div");
      cell.style.width = "20px";
      cell.style.height = "20px";
      cell.style.backgroundColor = "#555";
      cell.style.margin = "2px";
      shipVisual.appendChild(cell);
    }

    shipLabel.innerText = `Barco de ${ship.length} casillas`;
  }

  // Navegación de flechas
  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + ships.length) % ships.length;
    renderShip(currentIndex);
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % ships.length;
    renderShip(currentIndex);
  });

  // Render inicial
  renderShip(currentIndex);

  // Exponer índice actual si lo necesitas después
  carousel.getCurrentIndex = () => currentIndex;

  return carousel;
}
