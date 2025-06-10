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

    if (orientation === "v") {
      const rowIndex = row.charCodeAt(0) - 65; //'A' → 0
      const colIndex = column - 1; //1-based input

      if (shipLength % 2) {
        //odd
        const offset = Math.floor(shipLength / 2);
        const startRow = rowIndex - offset;
        const endRow = rowIndex + offset;

        for (let i = startRow; i <= endRow; i++) {
          if (!this.board[i] || !this.board[i][colIndex]) {
            throw new Error("Ship placement out of bounds.");
          }
          this.board[i][colIndex].ship = true;
          changedCoords.push([this.board[i][colIndex].row,this.board[i][colIndex].column])
        }
      } else if (!(shipLength % 2)){
        //even
        console.log("here")
        const offset = Math.floor(shipLength / 2);
        const startRow = rowIndex - (offset);
        const endRow = rowIndex + (offset-1);

        for (let i = startRow; i <= endRow; i++) {
          if (!this.board[i] || !this.board[i][colIndex]) {
            throw new Error("Ship placement out of bounds.");
          }
          this.board[i][colIndex].ship = true;
          changedCoords.push([this.board[i][colIndex].row,this.board[i][colIndex].column])
        }
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
