const Ship = require("./Ship");

class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = Array(10)
      .fill(null)
      .map((entry) => Array(10).fill(null));

    this.missedAttacks = [];
  }

  canPlaceShip(shipSize, shipDirection, startCoord) {
    const [startX, startY] = startCoord;

    // Ensure the coordinates are within bounds before attempting to place
    if (shipDirection === "horizontal") {
      if (startX + shipSize > this.size) {
        console.log("Ship out of bounds horizontally");
        return false;
      }

      // Place the ship horizontally
      for (let xCoord = startX; xCoord < startX + shipSize; xCoord++) {
        console.log("Checking horizontally at", xCoord, startY);
        // Check if space is already occupied
        if (this.board[xCoord][startY] !== null) {
          console.log("Space already occupied");
          return false;
        }
      }
    } else if (shipDirection === "vertical") {
      if (startY + shipSize > this.size) {
        console.log("Ship out of bounds vertically");
        return false;
      }

      // Place the ship vertically
      for (let yCoord = startY; yCoord < startY + shipSize; yCoord++) {
        console.log("Checking vertically at", startX, yCoord);
        // Check if place is already occupied
        if (this.board[startX][yCoord] !== null) {
          console.log("Space already occupied");
          return false;
        }
      }
    }

    // If we make it this far, the ship can be placed
    return true;
  }

  placeShip(shipSize, shipDirection, startCoord) {
    if (!this.canPlaceShip(shipSize, shipDirection, startCoord)) {
      return false; // Ship cannot be placed
    }

    const ship = new Ship(shipSize);
    const [startX, startY] = startCoord;

    if (shipDirection === "horizontal") {
      for (let xCoord = startX; xCoord < startX + shipSize; xCoord++) {
        this.board[startY][xCoord] = ship;
        console.log("Placed horizontally at", xCoord, startY);
      }
    } else if (shipDirection === "vertical") {
      for (let yCoord = startY; yCoord < startY + shipSize; yCoord++) {
        this.board[yCoord][startX] = ship;
        console.log("Placed vertically at", startX, yCoord);
      }
    }
    console.log(this.board);
    return true;
  }

  receiveAttack() {}

  isGameOver() {}
}

module.exports = Gameboard;
