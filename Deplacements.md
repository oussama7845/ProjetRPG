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
