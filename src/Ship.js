class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.size) {
      this.hits += 1;
      if (this.isSunk()) {
        console.log("SUNK");
      }
    }
  }

  isSunk() {
    return this.hits >= this.size;
  }
}

module.exports = Ship;
