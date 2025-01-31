// controllers/gameController.js
const readline = require('readline');
const Character = require('../models/character');
const Dungeon = require('../models/dungeon');
const Monster = require('../models/monster');

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
        return this.createCharacter();
      }

      console.log("Choisissez une classe pour votre personnage :");
      console.log("1. Guerrier (force élevée, santé élevée)");
      console.log("2. Mage (mana élevé, faible défense)");
      console.log("3. Voleur (force moyenne, agilité)");

      this.rl.question('Entrez le numéro de la classe choisie : ', (choice) => {
        let characterClass;
        switch (choice) {
          case '1': characterClass = 'guerrier'; break;
          case '2': characterClass = 'mage'; break;
          case '3': characterClass = 'voleur'; break;
          default:
            console.log("Choix invalide. Veuillez entrer 1, 2 ou 3.");
            return this.createCharacter();
        }

        this.character = new Character(name, characterClass);
        console.log(`Personnage créé : ${this.character.name}, classe : ${characterClass}`);
        console.log(`Statistiques :`, this.character.getStats().stats);
        
        this.createDungeon();
      });
    });
  }

  createDungeon() {
    const numRooms = 5;
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
              this.fightMonster(new Monster(), askCommand);
            } else if (room.type === 'trésor') {
              this.collectTreasure(askCommand);
            } else {
              askCommand();
            }
          } catch (e) {
            console.error(e.message);
            askCommand();
          }
        } else {
          console.log('Commande invalide. Utilisez "nord", "sud", "est", "ouest" ou "quitter".');
          askCommand();
        }
      });
    };

    askCommand();
  }

  fightMonster(monster, callback) {
    console.log(`Un ${monster.name} apparaît ! PV : ${monster.santé}`);

    const fightTurn = () => {
      console.log("\nQue voulez-vous faire ?");
      console.log("1. Attaquer");
      console.log("2. Défendre");
      console.log("3. Utiliser une potion");

      this.rl.question('Votre choix : ', (choice) => {
        if (choice === '1') {
          let damage = Math.max(1, this.character.stats.force - monster.defense);
          monster.santé -= damage;
          console.log(`Vous attaquez et infligez ${damage} dégâts !`);

          if (monster.santé <= 0) {
            console.log(`Vous avez vaincu le ${monster.name} !`);
            return callback(); // Retour à la boucle des commandes après la victoire
          }
        } else if (choice === '2') {
          console.log("Vous vous défendez ! Vous réduisez les dégâts du prochain tour.");
        } else if (choice === '3') {
          this.character.usePotion();
        } else {
          console.log("Choix invalide.");
          return fightTurn();
        }

        // Tour du monstre
        let damage = Math.max(1, monster.force - this.character.stats.defense);
        this.character.stats.santé -= damage;
        console.log(`Le ${monster.name} attaque et inflige ${damage} dégâts !`);

        if (this.character.stats.santé <= 0) {
          console.log("Vous êtes mort... Fin du jeu.");
          return this.rl.close();
        }

        fightTurn();
      });
    };

    fightTurn();
  }

  collectTreasure(callback) {
    const treasures = ['épée en argent', 'potion de soin', 'armure magique', 'sac d’or'];
    const foundTreasure = treasures[Math.floor(Math.random() * treasures.length)];

    console.log(`🎁 Vous avez trouvé un trésor : ${foundTreasure} !`);

    // Ajoute au personnage si c'est un objet utile
    if (foundTreasure === 'potion de soin') {
      this.character.inventory.potion++;
      console.log("Vous ajoutez une potion à votre inventaire !");
    } else {
      console.log(`Vous prenez le trésor et continuez votre chemin.`);
    }

    callback(); // Retour à la boucle des commandes
  }
}

module.exports = GameController;
