import Gameboard from "./Gameboard";
import Player from "./Player";
import Ship from "./Ship";
import ViewController from "./viewController";

import "./style.css";

const playerBoard = new Gameboard(10, "human");
const player = new Player("player", playerBoard);

const computerBoard = new Gameboard(10, "pc");
const pc = new Player("pc", computerBoard);

Player.setPlayers([player, pc]);
Player.setCurrentPlayer(player);

// Place ships
playerBoard.randomlyPlaceShips([
  new Ship(5),
  new Ship(4),
  new Ship(3),
  new Ship(3),
  new Ship(2),
  new Ship(2),
]);
computerBoard.randomlyPlaceShips([
  new Ship(5),
  new Ship(4),
  new Ship(3),
  new Ship(3),
  new Ship(2),
  new Ship(2),
]);

const viewController = new ViewController(computerBoard, playerBoard);
viewController.setupUI();
