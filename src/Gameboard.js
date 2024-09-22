const Ship = require("./Ship");

class Gameboard {
  constructor(size, playerType) {
    this.size = size;
    this.board = Array(size) // size is used here instead of fixed 10
      .fill(null)
      .map(() => Array(size).fill(null));

    this.missedAttacks = [];
    this.ships = [];
    this.playerType = playerType;
  }

  getBoard() {
    return this.board;
  }

  canPlaceShip(ship, shipDirection, startCoord) {
    const [startX, startY] = startCoord;

    // Ensure the coordinates are within bounds before attempting to place
    if (shipDirection === "horizontal") {
      if (startY + ship.size >= this.size || startX >= this.size) {
        // Check if ship would go out of bounds horizontally
        console.log("Ship out of bounds horizontally");
        return false;
      }

      // Check if space is free horizontally
      for (let yCoord = startY; yCoord < startY + ship.size; yCoord++) {
        console.log("Checking horizontally at", startX, yCoord);
        // Check if space is already occupied
        if (this.board[startX][yCoord] !== null) {
          // startX is the row, yCoord is the column
          console.log("Space already occupied");
          return false;
        }
      }
    } else if (shipDirection === "vertical") {
      if (startX + ship.size >= this.size || startY >= this.size) {
        // Check if ship would go out of bounds vertically
        console.log("Ship out of bounds vertically");
        return false;
      }

      // Check if space is free vertically
      for (let xCoord = startX; xCoord < startX + ship.size; xCoord++) {
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

  placeShip(ship, shipDirection, startCoord) {
    if (!this.canPlaceShip(ship, shipDirection, startCoord)) {
      console.log("ship can't be placed", ship.size, startCoord);
      return false; // Ship cannot be placed
    }

    const [startX, startY] = startCoord;

    if (shipDirection === "horizontal") {
      for (let yCoord = startY; yCoord < startY + ship.size; yCoord++) {
        this.board[startX][yCoord] = ship; // startX is the row, yCoord is the column
        console.log("Placed horizontally at", startX, yCoord);
      }
    } else if (shipDirection === "vertical") {
      for (let xCoord = startX; xCoord < startX + ship.size; xCoord++) {
        this.board[xCoord][startY] = ship; // xCoord is the row, startY is the column
        console.log("Placed vertically at", xCoord, startY);
      }
    }
    this.ships.push(ship);
    return true;
  }

  receiveAttack(coord) {
    const [x, y] = coord;

    // Check if the coordinates are within bounds
    if (x < 0 || x >= this.board.length || y < 0 || y >= this.board[0].length) {
      throw new Error("Coordinates out of bounds");
    }

    if (this.board[x][y] != null) {
      if (this.board[x][y] instanceof Ship) {
        const ship = this.board[x][y];
        ship.hit();
        this.board[x][y] = "hit";
        return true;
      } else {
        this.board[x][y] = "miss";
        this.missedAttacks.push([x, y]);
        return false;
      }
    } else {
      this.board[x][y] = "miss";
      this.missedAttacks.push([x, y]);
      return false;
    }
  }

  randomlyPlaceShips(ships) {
    for (let ship of ships) {
      let placed = false;
      while (!placed) {
        let direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        let row = Math.floor(Math.random() * this.board.length);
        let column = Math.floor(Math.random() * this.board[0].length);

        if (this.canPlaceShip([row, column], ship, direction)) {
          this.placeShip(ship, direction, [row, column]);
          placed = true;
        }
      }
    }
  }

  isGameOver() {
    // Implement the logic for game over
    console.log(this.ships);
    const allSunk = this.ships.every((ship) => ship.isSunk());
    return allSunk;
  }

  resetBoard() {
    this.board = Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null));

    this.missedAttacks = [];
    this.ships = [];
  }
}

module.exports = Gameboard;
