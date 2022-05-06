# La bataille navale

Maintenant qu'on a vu le langage JavaScript, on va pouvoir coder un jeu :tada: :muscle:

<details><summary>Cool non ?</summary>

![cool-cool-cool-cool-cool-cool](https://media.giphy.com/media/XAdbHJywVjF5K/giphy.gif)

</details>

## Notre bataille navale

Tout le monde connaît la bataille navale et ses règles :
> _C'est un jeu à 2 joueurs, où on positionne nos bateaux sur une grille, et on envoie des missiles tour à tour sur les bateaux adverses, sans connaître leur position._

Mais le jeu à deux joueurs est trop compliqué pour nos petites mains pas encore expertes. Donc on ne va avoir qu'un seul joueur.

Ok, alors on joue contre un bot (un robot) ?  
Euh... :thinking: non. Encore une fois, ce serait trop compliqué pour nos phalanges débutantes. Donc on va jouer seul, sans bateau. On va uniquement essayer de tirer sur les bateaux de l'adversaire (arf, ce serait pas un bot finalement ça !? :confused:)

Au final, notre bataille navale :  
> _C'est un jeu ~à 2 joueurs~ à 1 joueur, où ~on positionne nos bateaux sur une grille, et~ on envoie des missiles ~tour à tour~ sur les bateaux "adverses", sans connaître leur position._

Easy :sunglasses:

## Nouveautés techniques

Pour pouvoir accomplir tout cela, on va avoir besoin d'apprendre :

- le DOM : lecture, ajout, modification, suppression
- les events
- `localStorage`

Mais en plus, il va falloir travailler son algo !  
Oui oui, comme dans algoBlocs :wink:  
La difficulté sera d'arriver à retranscrire avec des éléments de code, les concepts du jeu...

<details><summary>Ce n'est toujours pas clair ?</summary>

Comment tu stockerais les cases de la grille de droite ? Ainsi que leur "état" (eau, bateau, touché, plouf) ?

![grille-bataille-navale](https://user-images.githubusercontent.com/48241710/118808345-b6282480-b8a9-11eb-860f-9ad6b8f06125.png)

<details><summary>Réponse...</summary>

Dans un tableau à 2 dimensions :pray:

</details>

</details>
