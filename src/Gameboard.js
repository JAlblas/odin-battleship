const Ship = require("./Ship");

class Gameboard {
  constructor(size, playerType) {
    this.size = size;
    this.board = Array(size) // size is used here instead of fixed 10
      .fill(null)
      .map(() => Array(size).fill(null));

    this.attackedCells = [];
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
      if (startY + ship.size > this.size || startX >= this.size) {
        // Check if ship would go out of bounds horizontally
        console.log("Ship out of bounds horizontally");
        return false;
      }

      // Check if space is free horizontally
      for (let yCoord = startY; yCoord < startY + ship.size; yCoord++) {
        // Check if space is already occupied
        if (this.board[startX][yCoord] !== null) {
          console.log("Space already occupied");
          return false;
        }
      }
    } else if (shipDirection === "vertical") {
      if (startX + ship.size > this.size || startY >= this.size) {
        // Check if ship would go out of bounds vertically
        console.log("Ship out of bounds vertically");
        return false;
      }

      // Check if space is free vertically
      for (let xCoord = startX; xCoord < startX + ship.size; xCoord++) {
        // Check if space is already occupied
        if (this.board[xCoord][startY] !== null) {
          console.log("Space already occupied");
          return false;
        }
      }
    } else {
      console.log("Invalid direction");
      return false; // Invalid direction
    }

    // If all checks passed, return true
    return true;
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
      }
    } else if (shipDirection === "vertical") {
      for (let xCoord = startX; xCoord < startX + ship.size; xCoord++) {
        this.board[xCoord][startY] = ship; // xCoord is the row, startY is the column
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

    this.attackedCells.push([x, y]);

    if (this.board[x][y] != null) {
      if (this.board[x][y] instanceof Ship) {
        const ship = this.board[x][y];
        ship.hit();
        this.board[x][y] = "hit";
        return true;
      } else if (
        this.board[x][y] == "hit" ||
        this.board[x][y] == "miss" ||
        this.board[x][y] == "X"
      ) {
        console.log("INVALID SHOT");
        return false;
      } else {
        this.board[x][y] = "miss";
        this.missedAttacks.push([x, y]);
        return false;
      }
    } else {
      this.board[x][y] = "miss";
      return false;
    }
  }

  randomlyPlaceShips(ships) {
    for (let ship of ships) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100; // Limit attempts

      while (!placed && attempts < maxAttempts) {
        let direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        let row = Math.floor(Math.random() * this.board.length);
        let column = Math.floor(Math.random() * this.board[0].length);

        if (this.canPlaceShip(ship, direction, [row, column])) {
          this.placeShip(ship, direction, [row, column]);
          placed = true;
        }
        attempts++;
      }

      if (!placed) {
        console.log(
          `Failed to place ship of size ${ship.size} after ${maxAttempts} attempts`,
        );
      }
    }
  }

  isMoveValid(cell) {
    // Check if the move already exists in attackedCells
    return !this.attackedCells.some(
      (attack) => JSON.stringify(attack) === JSON.stringify(cell),
    );
  }

  makeEnemyMove(playerBoard) {
    console.log(playerBoard);
    console.log("Enemy shooting!");

    let row, column;

    // Keep trying to make move until valid move is found
    do {
      row = Math.floor(Math.random() * this.board.length);
      column = Math.floor(Math.random() * this.board[0].length);
    } while (!this.isMoveValid([row, column]));

    // Once a valid move is found, make the attack
    playerBoard.receiveAttack([row, column]);
  }

  isGameOver() {
    // Implement the logic for game over
    console.log(this.ships);
    return this.ships.every((ship) => ship.isSunk());
  }

  resetBoard() {
    this.board = Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null));

    this.attackedCells = [];
    this.ships = [];

    this.randomlyPlaceShips([
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
      new Ship(2),
    ]);
  }
}

module.exports = Gameboard;
