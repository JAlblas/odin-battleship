import Gameboard from "./Gameboard";

import "./style.css";

const gameboard = new Gameboard(10);
gameboard.placeShip(3, "horizontal", [5, 5]);
gameboard.placeShip(5, "vertical", [2, 3]);
gameboard.placeShip(2, "vertical", [5, 3]);
gameboard.placeShip(3, "horizontal", [10, 2]);
console.log(gameboard.receiveAttack([2, 3]));
console.log(gameboard.receiveAttack([3, 3]));
console.log(gameboard.receiveAttack([4, 3]));
console.log(gameboard.receiveAttack([5, 3]));
console.log(gameboard.receiveAttack([6, 3]));
console.log(gameboard.receiveAttack([7, 3]));
console.log(gameboard.board);
