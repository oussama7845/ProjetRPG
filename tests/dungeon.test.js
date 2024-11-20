// tests/dungeon.test.js
const Dungeon = require('../models/dungeon');
const assert = require('assert');

describe('Dungeon Exploration', () => {
  it('should generate a dungeon with the correct number of rooms', () => {
    const dungeon = new Dungeon(5);
    assert.strictEqual(dungeon.rooms.length, 5);
  });

  it('should allow the player to move to the next room', () => {
    const dungeon = new Dungeon(3);
    const firstRoom = dungeon.getCurrentRoom();
    const secondRoom = dungeon.move('nord');
    assert.notStrictEqual(firstRoom, secondRoom);
  });

  it('should throw an error when trying to move beyond the last room', () => {
    const dungeon = new Dungeon(1);
    assert.throws(() => dungeon.move('nord'), /Aucune salle suivante/);
  });
});
