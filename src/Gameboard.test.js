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

  test("placing multiple ships with collision", () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip(3, "horizontal", [5, 5]);
    gameboard.placeShip(5, "vertical", [2, 3]);
    gameboard.placeShip(2, "vertical", [5, 3]);
    gameboard.placeShip(3, "horizontal", [1, 2]);
    expect(gameboard.board.flat().filter((cell) => cell != null).length).toBe(
      11,
    );
  });

  test("receiveAttack hit", () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip(3, "horizontal", [5, 5]);
    gameboard.placeShip(5, "vertical", [2, 3]);
    gameboard.placeShip(2, "vertical", [5, 3]);
    gameboard.placeShip(3, "horizontal", [1, 2]);
    expect(gameboard.receiveAttack([2, 3])).toBeTruthy();
  });

  test("receiveAttack miss", () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip(3, "horizontal", [5, 5]);
    gameboard.placeShip(5, "vertical", [2, 3]);
    gameboard.placeShip(2, "vertical", [5, 3]);
    gameboard.placeShip(3, "horizontal", [1, 2]);
    expect(gameboard.receiveAttack([9, 9])).toBeFalsy();
  });
});
