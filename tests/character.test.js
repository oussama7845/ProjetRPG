// tests/character.test.js
const Character = require('../models/character');
const assert = require('assert');

describe('Character Creation', () => {
  it('should create a character with valid name and class', () => {
    const character = new Character('Héros', 'guerrier');
    assert.strictEqual(character.name, 'Héros');
    assert.strictEqual(character.stats.santé, 100);
  });

  it('should throw an error if the name is too short or too long', () => {
    assert.throws(() => new Character('Al', 'mage'), /Le nom doit comporter entre 3 et 20 caractères/);
    assert.throws(() => new Character('NomTrèsTrèsLongInvalide', 'voleur'), /Le nom doit comporter entre 3 et 20 caractères/);
  });

  it('should throw an error if the class is invalid', () => {
    assert.throws(() => new Character('Héros', 'archer'), /Classe non valide/);
  });
});
