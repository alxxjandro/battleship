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

test("A board should be able to place an odd length ship horizontally", () => {
  const board = new Gameboard(5);
  const ship = new Ship(5, "h");
  expect(board.placeShip(["C", 3], ship)).toStrictEqual([
    ["C", 1],
    ["C", 2],
    ["C", 3],
    ["C", 4],
    ["C", 5],
  ]);
});

test("A board should be able to place an even length ship horizontally", () => {
  const board = new Gameboard(5);
  const ship = new Ship(4, "h");
  expect(board.placeShip(["C", 3], ship)).toStrictEqual([
    ["C", 1],
    ["C", 2],
    ["C", 3],
    ["C", 4]
  ]);
});

test("Two ship's should not overlap", () => {
  const board = new Gameboard(5);
  const shipOne = new Ship(4, "h");
  const shipTwo = new Ship(4, "h");
  board.placeShip(["C", 3], shipOne)
  expect(() => {
    board.placeShip(["C", 3], shipTwo);
  }).toThrow("Two ship's should not overlap!");
});

// test's to see if a ships is able to recieve an attack!

test("A ship can take a hit", () =>{
  const board = new Gameboard(5);
  const ship = new Ship(4,"h");
  board.placeShip(["C", 3], ship)
  expect(board.receiveAttack(["C", 3])).toBe(1);
});

test("A hit can land in water", () =>{
  const b = new Gameboard(4);
  expect(b.receiveAttack(["C", 3])).toBe(0);
});

test("A tile should now be able to be hit twice", () =>{
  const b = new Gameboard(4);
  b.receiveAttack(["C", 3]);
  expect(() => {
    b.receiveAttack(["C", 3]);;
  }).toThrow("That tile has already been hit!");
});