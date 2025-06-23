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

const loadBoard = (gameboard) => {
  console.log(gameboard.board);
  const boardContainer = Object.assign(document.createElement("div"), {
    className: "boardContainer",
  });

  for (let rows of gameboard.board) {
    let rowDiv = Object.assign(document.createElement("div"), {
      className: `row${rows[0].row}`,
    });
    for (let columns of rows) {
      rowDiv.appendChild(createTile(rows[0].row, columns.column, columns.ship)); // columns.ship could be null!
    }
    boardContainer.appendChild(rowDiv);
  }
  return boardContainer;
};
export default loadBoard;
