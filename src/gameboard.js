class Gameboard {
  constructor(length) {
    this.board = createGrid(length);
    this.boardLength = length;
  }

  placeShip(coordinates, ship) {
    const [row, column] = coordinates;
    const shipLength = ship.length;
    const orientation = ship.orientation.toLowerCase();
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
        if (!this.board[i] || !this.board[i][colIndex]) {
          throw new Error("Ship placement out of bounds.");
        }
        if (this.board[i][colIndex].ship === true) { throw new Error("Two ship's should not overlap!")}
        this.board[i][colIndex].ship = true;
        changedCoords.push([
          this.board[i][colIndex].row,
          this.board[i][colIndex].column,
        ]);
      }
    } else if (orientation === "h") {
      //odd length ships
      let offset = Math.floor(shipLength / 2);
      let startColumn = colIndex - offset;
      let endColumn = rowIndex + offset;

      if (!(shipLength % 2)) {
        endColumn = colIndex + (offset - 1);
      } //if its an even length ship

      for (let i = startColumn; i <= endColumn; i++) {
        if (!this.board[i] || !this.board[i][colIndex]) {
          throw new Error("Ship placement out of bounds.");
        }
        if (this.board[rowIndex][i].ship === true) { throw new Error("Two ship's should not overlap!")}
        this.board[rowIndex][i].ship = true;
        changedCoords.push([
          this.board[rowIndex][i].row,
          this.board[rowIndex][i].column,
        ]);
      }
    }
    return changedCoords;
  }
}

class Tile {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.ship = false;
    this.hit = false;
  }
}

const createGrid = (size) => {
  let row = [];
  for (let i = 0; i < size; i++) {
    row[i] = [];
    for (let j = 0; j < size; j++) {
      row[i][j] = new Tile(String.fromCharCode(i + 65), j + 1);
    }
  }
  return row;
};

export default Gameboard;
