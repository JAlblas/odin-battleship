import Gameboard from "./Gameboard";

import "./style.css";

let board = new Gameboard(10);
console.log(board);
console.log(board.board[4][5]);

board.placeShip(3, "horizontal", [9, 5]);
