class Ship {
  constructor(length, orientation) {
    this.length = length;
    this.orientation = orientation; // h -> horizontal, v -> vertical
    this.hits = 0;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.length === this.hits) {
      return true;
    }
    return false;
  }
}

export default Ship;
