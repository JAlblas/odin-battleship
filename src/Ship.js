class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1;
      if (this.isSunk()) {
        console.log("SUNK");
      }
    }
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

module.exports = Ship;
