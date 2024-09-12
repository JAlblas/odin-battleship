const Gameboard = require("./Gameboard.js");

describe("Gameboard class", () => {
  test("gameboard complete", () => {
    const gameboard = new Gameboard(10);
    expect(gameboard.board.flat().length).toBe(100);
  });

  test("valid placement", () => {
    const gameboard = new Gameboard(10);
    expect(gameboard.placeShip(3, "horizontal", [7, 2])).toBeTruthy();
  });

  test("invalid placement", () => {
    const gameboard = new Gameboard(10);
    expect(gameboard.placeShip(5, "vertical", [6, 8])).toBeFalsy();
  });
});
