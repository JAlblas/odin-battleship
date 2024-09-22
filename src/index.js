import Gameboard from "./Gameboard";
import Player from "./Player";
import Ship from "./Ship";
import ViewController from "./ViewController";

import "./style.css";

const playerBoard = new Gameboard(10, "human");
/* 
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
gameboard.placeShip(3, "vertical", [0, 9]);
*/
const player = new Player("player", playerBoard);

const computerBoard = new Gameboard(10, "pc");
//computerBoard.placeShip(3, "horizontal", [5, 5]);
const pc = new Player("pc", computerBoard);

Player.setPlayers([player, pc]);
Player.setCurrentPlayer(player);

// Place ships
playerBoard.randomlyPlaceShips([new Ship(4)]);
computerBoard.randomlyPlaceShips([new Ship(4)]);

const viewController = new ViewController(computerBoard, playerBoard);
viewController.setupUI();
