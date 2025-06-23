// This file constains all the functions responsable for loading
// and updating the board visible on the DOM as the game progreses

const createTile = (row, column, ship) => {
  const div = document.createElement("div");
  div.className = `${row}-${column}`;
  if (ship) {
    div.className += ` ship`;
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
      rowDiv.appendChild(createTile(rows[0].row, columns.column, columns.ship)); // columns.ship could be null!
    }
    rowsDiv.appendChild(rowDiv);
  }

  boardContainer.appendChild(rowLegends);
  boardContainer.appendChild(columnsLegends);
  boardContainer.appendChild(rowsDiv);

  return boardContainer;
};

export default loadBoard;
