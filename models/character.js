// models/character.js
class Character {
    constructor(name, characterClass) {
      this.setName(name);
      this.setClass(characterClass);
    }
  
    setName(name) {
      if (name.length < 3 || name.length > 20) {
        throw new Error("Le nom doit comporter entre 3 et 20 caractères.");
      }
      this.name = name;
    }
  
    setClass(characterClass) {
      const classes = {
        guerrier: { force: 10, defense: 8, santé: 100, mana: 0 },
        mage: { force: 4, defense: 3, santé: 50, mana: 100 },
        voleur: { force: 7, defense: 5, santé: 70, mana: 20 },
      };
  
      if (!classes[characterClass]) {
        throw new Error("Classe non valide. Choisissez entre guerrier, mage ou voleur.");
      }
  
      this.stats = classes[characterClass];
    }
  
    getStats() {
      return {
        name: this.name,
        stats: this.stats,
      };
    }
  }
  
  module.exports = Character;
  