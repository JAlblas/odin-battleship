const Ship = require("./Ship");

class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = Array(size) // size is used here instead of fixed 10
      .fill(null)
      .map(() => Array(size).fill(null));

    this.missedAttacks = [];
  }

  canPlaceShip(shipSize, shipDirection, startCoord) {
    const [startX, startY] = startCoord;

    // Ensure the coordinates are within bounds before attempting to place
    if (shipDirection === "horizontal") {
      if (startX + shipSize > this.size) {
        // Check if ship would go out of bounds horizontally
        console.log("Ship out of bounds horizontally");
        return false;
      }

      // Check if space is free horizontally
      for (let yCoord = startY; yCoord < startY + shipSize; yCoord++) {
        console.log("Checking horizontally at", startX, yCoord);
        // Check if space is already occupied
        if (this.board[startX][yCoord] !== null) {
          // startX is the row, yCoord is the column
          console.log("Space already occupied");
          return false;
        }
      }
    } else if (shipDirection === "vertical") {
      if (startY + shipSize > this.size) {
        // Check if ship would go out of bounds vertically
        console.log("Ship out of bounds vertically");
        return false;
      }

      // Check if space is free vertically
      for (let xCoord = startX; xCoord < startX + shipSize; xCoord++) {
        console.log("Checking vertically at", xCoord, startY);
        // Check if space is already occupied
        if (this.board[xCoord][startY] !== null) {
          // xCoord is the row, startY is the column
          console.log("Space already occupied");
          return false;
        }
      }
    }
    return true; // Ship can be placed
  }

  placeShip(shipSize, shipDirection, startCoord) {
    if (!this.canPlaceShip(shipSize, shipDirection, startCoord)) {
      return false; // Ship cannot be placed
    }

    const ship = new Ship(shipSize);
    const [startX, startY] = startCoord;

    if (shipDirection === "horizontal") {
      for (let yCoord = startY; yCoord < startY + shipSize; yCoord++) {
        this.board[startX][yCoord] = ship; // startX is the row, yCoord is the column
        console.log("Placed horizontally at", startX, yCoord);
      }
    } else if (shipDirection === "vertical") {
      for (let xCoord = startX; xCoord < startX + shipSize; xCoord++) {
        this.board[xCoord][startY] = ship; // xCoord is the row, startY is the column
        console.log("Placed vertically at", xCoord, startY);
      }
    }
    console.log(this.board);
    return true;
  }

  receiveAttack(coord) {
    const [x, y] = coord;

    // Check if the coordinates are within bounds
    if (x < 0 || x >= this.board.length || y < 0 || y >= this.board[0].length) {
      throw new Error("Coordinates out of bounds");
    }

    console.log(x, y);
    console.log(this.board);
    console.log(this.board[x][y]); // x for row, y for column

    if (this.board[x][y] != null) {
      // x for row, y for column
      console.log("HIT");
      return true;
    } else {
      console.log("MISS");
      return false;
    }
  }

  isGameOver() {
    // Implement the logic for game over
  }
}

module.exports = Gameboard;
