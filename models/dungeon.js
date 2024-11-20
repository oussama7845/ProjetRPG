// models/dungeon.js
class Dungeon {
    constructor(numRooms) {
      this.rooms = this.generateRooms(numRooms);
      this.currentRoomIndex = 0;
    }
  
    generateRooms(numRooms) {
      let rooms = [];
      for (let i = 0; i < numRooms; i++) {
        rooms.push(this.generateRoom());
      }
      return rooms;
    }
  
    generateRoom() {
      const types = ['monstre', 'trésor', 'vide'];
      const type = types[Math.floor(Math.random() * types.length)];
      return { type };
    }
  
    move(direction) {
      if (direction !== 'nord' && direction !== 'sud' && direction !== 'est' && direction !== 'ouest') {
        throw new Error('Direction invalide. Utilisez nord, sud, est, ou ouest.');
      }
  
      // Pour simplifier, on va juste avancer dans la liste des salles
      if (this.currentRoomIndex < this.rooms.length - 1) {
        this.currentRoomIndex++;
        return this.rooms[this.currentRoomIndex];
      } else {
        throw new Error('Aucune salle suivante.');
      }
    }
  
    getCurrentRoom() {
      return this.rooms[this.currentRoomIndex];
    }
  }
  
  module.exports = Dungeon;
  