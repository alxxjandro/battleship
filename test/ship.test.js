import Ship from "../src/ship";

test('A ship can be created and has length', () =>{
    const ship = new Ship(10)
    expect(ship.length).toBe(10);
})

test('A ship can take a hit', () =>{
    const ship = new Ship(5)
    ship.hit();
    expect(ship.hits).toBe(1);
})

test('A ship can sunk', () =>{
    const ship = new Ship(1)
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})