class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = Array(10)
      .fill(null)
      .map((entry) => Array(10).fill(null));

    this.missedAttacks = [];
  }

  placeShip(shipSize, shipDirection, startCoord) {
    const [startX, startY] = startCoord;

    console.log(startX, startY);
    if (shipDirection == "horizontal") {
      // Loop here
      for (let index = startX; index < startX + shipSize; index++) {
        console.log("TRRR", index);
        console.log("TRRR", this.size);
        if (index >= this.size) {
          console.log("OOH NOES X");
          return false;
        }
      }
      return true;
    } else if (shipDirection == "vertical") {
      // Loop here
      for (let index = startY; index < startY + shipSize; index++) {
        console.log(index);
        if (index >= this.size) {
          console.log("OOH NOES Y");
          return false;
        }
      }
      return true;
    }
  }

  receiveAttack() {}

  isGameOver() {}
}

module.exports = Gameboard;
