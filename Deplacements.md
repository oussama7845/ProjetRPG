## Déplacement du personnage sur la grille
### Description générale
Le jeu se déroule sur une grille bidimensionnelle représentant le donjon que le personnage explore. Le personnage peut se déplacer dans les quatre directions cardinales : Nord, Sud, Est, Ouest. Chaque case de la grille peut contenir différents éléments tels que des monstres, des trésors ou être vide.

### Grille
La grille est définie par des coordonnées (x, y).
(0, 0) est la position initiale du personnage.
### Commandes de déplacement
Le personnage peut recevoir des commandes pour se déplacer :

"N" : se déplacer d'une case vers le Nord.
"S" : se déplacer d'une case vers le Sud.
"E" : se déplacer d'une case vers l'Est.
"O" : se déplacer d'une case vers l'Ouest.
### Règles de déplacement
Le personnage ne peut pas sortir des limites de la grille.
Si la case vers laquelle le personnage souhaite se déplacer contient un monstre, il doit le combattre avant de pouvoir entrer dans la case.
Si le personnage tente de se déplacer dans une direction invalide (hors de la grille), une erreur est retournée.


## Tests d'acceptation pour le déplacement du personnage
### Test d'acceptation 1 : Déplacement vers une case vide
Scénario : Le personnage se déplace vers une case adjacente vide.

#### Préconditions :

Le personnage est à la position (0, 0).
La case (0, 1) est vide.
Actions :

Le joueur entre la commande "N" pour se déplacer vers le Nord.
Résultat attendu :

Le personnage se déplace à la position (0, 1).
Un message indique la nouvelle position : "Vous êtes maintenant en position (0, 1)."
### Test d'acceptation 2 : Déplacement vers une case contenant un monstre
Scénario : Le personnage tente de se déplacer vers une case contenant un monstre.

#### Préconditions :

Le personnage est à la position (0, 1).
La case (1, 1) contient un monstre.
Actions :

Le joueur entre la commande "E" pour se déplacer vers l'Est.
Résultat attendu :

Le personnage rencontre un monstre.
Un combat s'engage automatiquement.
Le personnage ne peut pas se déplacer tant que le monstre n'est pas vaincu.
Message affiché : "Un monstre bloque votre chemin ! Vous devez le vaincre pour avancer."
### Test d'acceptation 3 : Tentative de déplacement hors de la grille
Scénario : Le personnage tente de se déplacer en dehors des limites de la grille.

#### Préconditions :

Le personnage est à la position (0, 0).
Il n'y a pas de case en position (0, -1).
Actions :

Le joueur entre la commande "S" pour se déplacer vers le Sud.
Résultat attendu :

Le déplacement est refusé.
Un message d'erreur est affiché : "Vous ne pouvez pas aller plus au Sud."
Le personnage reste à la position (0, 0).
### Test d'acceptation 4 : Enchaînement de déplacements valides
Scénario : Le personnage effectue une série de déplacements valides.

#### Préconditions :

Le personnage est à la position (0, 0).
Les cases (0, 1), (1, 1) et (1, 2) sont vides.
Actions :

Le joueur entre les commandes : "N", "E", "N".
Résultat attendu :

Le personnage se déplace successivement aux positions :
(0, 1)
(1, 1)
(1, 2)
Un message confirme chaque déplacement :
"Vous êtes maintenant en position (0, 1)."

### Test d'acceptation 5 : Rencontre d'un trésor lors du déplacement
Scénario : Le personnage se déplace vers une case contenant un trésor.

#### Préconditions :

Le personnage est à la position (1, 2).
La case (1, 3) contient un trésor.
Actions :

Le joueur entre la commande "N" pour se déplacer vers le Nord.
Résultat attendu :

Le personnage se déplace à la position (1, 3).
Un message indique la découverte du trésor : "Vous avez trouvé un trésor !"
Le trésor est ajouté à l'inventaire du personnage.
Test d'acceptation 6 : Déplacement bloqué par un obstacle
Scénario : Le personnage tente de se déplacer vers une case bloquée par un obstacle infranchissable.

#### Préconditions :

Le personnage est à la position (1, 3).
La case (2, 3) est bloquée par un obstacle (mur).
Actions :

Le joueur entre la commande "E" pour se déplacer vers l'Est.
Résultat attendu :

Le déplacement est refusé.
Un message indique : "Un obstacle vous bloque le passage. Vous ne pouvez pas aller par là."
Le personnage reste à la position (1, 3).
Test d'acceptation 7 : Gestion des limites de la grille
Scénario : Le personnage atteint le bord de la grille et ne peut pas aller plus loin.

#### Préconditions :

La grille est de taille (5 x 5).
Le personnage est à la position (0, 4).
Actions :

Le joueur entre la commande "N" pour se déplacer vers le Nord.
Résultat attendu :

Le déplacement est refusé.
Un message indique : "Vous avez atteint le bord du monde. Vous ne pouvez pas aller plus au Nord."
Le personnage reste à la position (0, 4).
Test d'acceptation 8 : Rotation et orientation du personnage
Scénario : Le personnage change d'orientation sans se déplacer.

#### Préconditions :

Le personnage est à la position (2, 2).
Par défaut, le personnage fait face au Nord.
Actions :

Le joueur entre la commande "D" pour tourner à droite (Est).
Le joueur entre la commande "G" pour tourner à gauche (retour au Nord).
Résultat attendu :

L'orientation du personnage change sans déplacement.
Messages indiquant l'orientation :
"Vous faites maintenant face à l'Est."
"Vous faites maintenant face au Nord."

### Test d'acceptation 9 : Déplacement avec orientation
Scénario : Le personnage avance dans la direction où il est orienté.

#### Préconditions :

Le personnage est à la position (2, 2), orienté vers l'Est.
Actions :

Le joueur entre la commande "A" pour avancer d'une case dans la direction actuelle.
Résultat attendu :

Le personnage se déplace à la position (3, 2).
Un message confirme le déplacement : "Vous avancez vers l'Est et êtes maintenant en position (3, 2)."

### Test d'acceptation 10 : Série de commandes complexes
Scénario : Le personnage exécute une série de commandes mixtes.

#### Préconditions :

Le personnage est à la position (0, 0), orienté vers le Nord.
Actions :

Le joueur entre la séquence de commandes : "A", "D", "A", "G", "A", "A".
Résultat attendu :

Étape 1 : Avancer vers le Nord à (0, 1).
Étape 2 : Tourner à droite vers l'Est.
Étape 3 : Avancer vers l'Est à (1, 1).
Étape 4 : Tourner à gauche vers le Nord.
Étape 5 : Avancer vers le Nord à (1, 2).
Étape 6 : Avancer vers le Nord à (1, 3).
Messages confirment chaque action et position.
Commandes résumées
"N", "S", "E", "O" : Se déplacer d'une case dans la direction spécifiée.
"A" : Avancer d'une case dans la direction actuelle.
"G" : Tourner à gauche (changement d'orientation).
"D" : Tourner à droite (changement d'orientation).
Règles supplémentaires inspirées du Kata Mars Rover
Le personnage a une orientation (Nord, Sud, Est, Ouest) qui détermine la direction de l'avance.
Les commandes de rotation "G" et "D" permettent de changer l'orientation sans se déplacer.
La commande "A" fait avancer le personnage d'une case dans sa direction actuelle.
