import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

test("A board 10x10 board as 100 tiles", () => {
  const board = new Gameboard(10);
  expect(board.board.length * board.board[0].length).toBe(100);
});

test("A board rows should be labeled by letters", () => {
  const board = new Gameboard(10);
  expect(board.board[0][0].row).toBe("A");
});

test("A board should be able to place an even length ship vertically", () => {
  const board = new Gameboard(5);
  const ship = new Ship(4, "v");
  expect(board.placeShip(["C", 3], ship)).toStrictEqual([
    ["A", 3],
    ["B", 3],
    ["C", 3],
    ["D", 3],
  ]);
});

test("A board should be able to place an odd length ship vertically", () => {
  const board = new Gameboard(5);
  const ship = new Ship(5, "v");
  expect(board.placeShip(["C", 3], ship)).toStrictEqual([
    ["A", 3],
    ["B", 3],
    ["C", 3],
    ["D", 3],
    ["E", 3],
  ]);
});
