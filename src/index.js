import Gameboard from "./Gameboard";

import "./style.css";

let board = new Gameboard(10);

board.placeShip(3, "horizontal", [5, 5]);
board.placeShip(5, "vertical", [2, 3]);
board.placeShip(2, "vertical", [5, 3]);
board.placeShip(3, "horizontal", [10, 2]);
