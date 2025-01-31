// models/monster.js
class Monster {
    constructor() {
      const types = [
        { name: 'Gobelin', force: 5, defense: 3, santé: 30 },
        { name: 'Orc', force: 8, defense: 5, santé: 50 },
        { name: 'Dragonnet', force: 12, defense: 8, santé: 80 }
      ];
  
      const monsterType = types[Math.floor(Math.random() * types.length)];
  
      this.name = monsterType.name;
      this.force = monsterType.force;
      this.defense = monsterType.defense;
      this.santé = monsterType.santé;
    }
  }
  
  module.exports = Monster;
  