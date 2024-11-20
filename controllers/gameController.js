// controllers/gameController.js
const readline = require('readline');
const Character = require('../models/character');
const Dungeon = require('../models/dungeon');

class GameController {
  constructor() {
    this.character = null;
    this.dungeon = null;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  startGame() {
    console.log("Bienvenue dans le jeu RPG ! Commençons par créer votre personnage.");
    this.createCharacter();
  }

  createCharacter() {
    this.rl.question('Entrez un nom pour votre personnage (entre 3 et 20 caractères) : ', (name) => {
      if (name.length < 3 || name.length > 20) {
        console.log("Le nom doit comporter entre 3 et 20 caractères.");
        return this.createCharacter(); // Repose la question si le nom est invalide
      }

      console.log("Choisissez une classe pour votre personnage :");
      console.log("1. Guerrier (force élevée, santé élevée)");
      console.log("2. Mage (mana élevé, faible défense)");
      console.log("3. Voleur (force moyenne, agilité)");

      this.rl.question('Entrez le numéro de la classe choisie : ', (choice) => {
        let characterClass;

        switch (choice) {
          case '1':
            characterClass = 'guerrier';
            break;
          case '2':
            characterClass = 'mage';
            break;
          case '3':
            characterClass = 'voleur';
            break;
          default:
            console.log("Choix invalide. Veuillez entrer 1, 2 ou 3.");
            return this.createCharacter(); // Repose la question si la classe est invalide
        }

        this.character = new Character(name, characterClass);
        console.log(`Personnage créé : ${this.character.name}, classe : ${characterClass}`);
        console.log(`Statistiques :`, this.character.getStats().stats);
        
        this.createDungeon();
      });
    });
  }

  createDungeon() {
    const numRooms = 5; // Vous pouvez choisir combien de salles vous voulez pour le donjon
    this.dungeon = new Dungeon(numRooms);
    console.log(`Vous explorez maintenant un donjon de ${numRooms} salles.`);
    console.log(`Commandes : 'nord', 'sud', 'est', 'ouest' pour vous déplacer. Tapez 'quitter' pour arrêter le jeu.`);
    this.startCommandLoop();
  }

  startCommandLoop() {
    const askCommand = () => {
      this.rl.question('Entrez une commande : ', (command) => {
        if (command === 'quitter') {
          console.log('Merci d\'avoir joué! À bientôt!');
          this.rl.close();
        } else if (['nord', 'sud', 'est', 'ouest'].includes(command)) {
          try {
            const room = this.dungeon.move(command);
            console.log(`Vous vous déplacez vers le ${command}. Vous êtes maintenant dans une salle de type : ${room.type}`);
            if (room.type === 'monstre') {
              console.log('Attention! Un monstre apparaît!');
              // Ajouter la logique de combat ici
            }
          } catch (e) {
            console.error(e.message);
          }
          askCommand(); // Relancer la boucle de commandes
        } else {
          console.log('Commande invalide. Utilisez "nord", "sud", "est", "ouest" ou "quitter".');
          askCommand(); // Relancer la boucle de commandes
        }
      });
    };

    askCommand();
  }
}

module.exports = GameController;
