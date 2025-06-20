import Player from "../src/player.js";

test("Creating a new player", () => {
  const p1 = new Player("person");
  expect(p1.type).toBe("person");
});

test("A player without a type it's a computer by default", () => {
  const p1 = new Player();
  expect(p1.type).toBe("computer");
});

test("Every player has a 10x10 gameboard", () => {
  const p1 = new Player();
  console.log(p1.gameboard);
  expect(p1.gameboard.boardLength).toBe(10);
  expect(p1.gameboard.board.length).toBe(10);
});
