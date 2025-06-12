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
        //if its an even length ship
        offset = Math.floor(shipLength / 2);
        startRow = rowIndex - offset;
        endRow = rowIndex + (offset - 1);
      }
      for (let i = startRow; i <= endRow; i++) {
        if (!this.board[i] || !this.board[i][colIndex]) {
          throw new Error("Ship placement out of bounds.");
        }
        this.board[i][colIndex].ship = true;
        changedCoords.push([
          this.board[i][colIndex].row,
          this.board[i][colIndex].column,
        ]);
      }
    } else if (orientation === "h") {
      //odd
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
