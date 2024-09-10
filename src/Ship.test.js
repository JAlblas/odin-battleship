const Ship = require("./Ship");

describe("Ship class", () => {
  test("ship hits equals 0", () => {
    const ship = new Ship(4);
    expect(ship.hits).toBe(0);
  });

  test("isSunk() should return false for a new ship", () => {
    const ship = new Ship(3); // Ship with length 3
    expect(ship.isSunk()).toBe(false);
  });

  test("hit() should increment hits and isSunk() should return false if not fully hit", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk() should return true when hits equal the ship length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit(); // 3 hits for length 3 ship
    expect(ship.isSunk()).toBe(true);
  });

  test("hit() should not increase hits beyond ship length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit(); // Trying to hit more than the length
    expect(ship.hits).toBe(3); // Hits should remain 3
  });
});
