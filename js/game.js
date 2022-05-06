// et paf, un module game
const game = {

  // [convention] on créé une fonction init dans chaque module
  init: function() {
    console.log('game.init() appelé'); // debug

    // initialise le score, le tour
    game.score = 0; // score actuel
    game.turn  = 1; // tour actuel
    game.startTimestamp = Date.now(); // timestamp du début du tour, en millisecondes (ms)

  },

  // fonction permettant de tirer un missile sur une cellule, au format grid (ex: [0, 0])
  // cette fonction retournera TRUE ou FALSE selon qu'on ait touché un bateau, ou pas.
  sendMissileAt: function(rowIndex, colIndex) {

    // on récupère la valeur de cette cellule
    let cellValue = grid.cells[rowIndex][colIndex];

    // est-ce qu'il y a un bateau (b) ici ?
    if (cellValue === 'b') {

      // oui c'est un bateau
      console.log('💥 touché');

      // je modifie le tableau
      grid.cells[rowIndex][colIndex] = 't'; // 't' pour touché

      // on incrémente le score +30k
      game.score += 30000;

      // on délègue l'impact durée du tour/score
      game.moreTimeLessScore();

      // on actualise la grille
      grid.displayGrid();

      // on retourne un signal positif
      return true;
    
    // bon, pas de bateau (b) ici
    // mais s'il n'y a pas ça (else if) est-ce qu'il y a un bateau déjà touché (t) ici ?
    } else if (cellValue === 't') {

      // oui c'est un bateau déjà touché
      console.log('désolé, bateau déjà touché à cette case');

      // on décrémente le score -9k
      game.score -= 9000;

      // on délègue l'impact durée du tour/score
      game.moreTimeLessScore();

      // on actualise la grille
      grid.displayGrid();

      // on retourne un signal négatif
      return false;

    // bon, pas de bateau (b), ni de bateau déjà touché (t)
    // mais s'il n'y a pas ça (else if) est-ce qu'il y a déjà un plouf (p) un coup dans l'eau ici ?
    } else if (cellValue === 'p') {

      // oui c'est déjà un plouf
      console.log('désolé, plouf déjà signalé à cette case');

      // on décrémente le score -9k
      game.score -= 9000;

      // on délègue l'impact durée du tour/score
      game.moreTimeLessScore();

      // on actualise la grille
      grid.displayGrid();

      // on retourne un signal négatif
      return false;

    // bon, pas de bateau (b), ni de bateau déjà touché (t), ni de plouf déjà signalé (p)
    // donc il ne reste qu'un dernier choix : un plouf non signalé
    } else {

      // c'est un coup nouvellement dans l'eau !
      console.log('plouf.');

      // je modifie le tableau
      grid.cells[rowIndex][colIndex] = 'p'; // 'p' pour plouf

      // on décrémente le score -9k
      game.score -= 9000;

      // on délègue l'impact durée du tour/score
      game.moreTimeLessScore();

      // on actualise la grille
      grid.displayGrid();

      // on retourne un signal négatif
      return false;

    }

  },

  // fonction permettant de tirer un missile sur une cellule, au format humain (ex: A1)
  // cette fonction retournera ce que sendMissileAt retournera (sic)
  // c'est à dire TRUE ou FALSE selon qu'on ait touché un bateau, ou pas.
  sendMissile: function(coords) {
    // on utilise la fonction getGridIndexes
    // qui traduit notre chaîne de caractères 'coords' (ex: A1) en index (row = 0, column = 0)
    const result = grid.getGridIndexes(coords);
    const rowIndex = result[0];
    const columnIndex = result[1];
    
    // puis on appelle la fonction sendMissileAt
    // qui retourne VRAI si touché, FALSE sinon
    return game.sendMissileAt(rowIndex, columnIndex);
  },

  // ----------------------------------------------------
  // moreTimeLessScore
  // ----------------------------------------------------

  // fonction permettant d'impacter le score,
  // selon la durée du tour
  // - chaque seconde passée sur le jeu retire 1 000 pts
  // - chaque milliseconde passée sur le jeu retire 1 pt
  moreTimeLessScore: function() {
    
    // récupère le timestamp
    const nowTimestamp = Date.now(); // ms

    // calcul la durée du tour :
    // timestamp actuel - timestamp de la fin du tour précédent
    const turnDuration = nowTimestamp - game.startTimestamp; // ms

    // debug
    console.log('début du tour : ' + game.startTimestamp + ' ms');
    console.log('fin du tour : ' + nowTimestamp + ' ms');
    console.log('durée du tour : ' + turnDuration + ' ms');

    // on soustrait la durée du tour au score
    game.score -= turnDuration;

    // on réinitialise le timestamp pour le prochain tour
    game.startTimestamp = Date.now(); // timestamp du début du tour, en millisecondes (ms)

  },

  // fonction permettant de savoir si le jeu est terminé, ou pas
  checkGameOver: function() {

    // je déclare un compteur de cellules 'b' restantes
    let remainingBoatCell = 0; // initialisé à zéro

    // pour extraire chaque VALEUR (et non clé) d'un tableau, j'utilise une boucle for...of
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/for...of

    // pour chaque ligne de ma grille
    for (const row of grid.cells) {
      
      // pour chaque cellule de la ligne (de ma grille)
      // oui c'est une boucle dans une boucle ;)
      for (const cellValue of row) {
        
        // est-ce que cette cellule vaut la lettre 'b' ?
        if (cellValue === 'b') {

          // oui, cette cellule vaut 'b'
          remainingBoatCell++; // incrémente le compteur de cellules 'b' restantes
        }

      }

    }

    // maintenant que mon algo a parcouru chaque cellule, de chaque ligne, de ma grille
    // je pose la question suivante : est-ce que mon compteur de cellules 'b' restantes est toujours à zéro ?
    if (remainingBoatCell === 0) {
      
      // oui le compteur est à zéro
      console.log('Tous les bateaux ont été coulés 👋');
      console.log('-- GAME OVER --');

      // on retourne un signal positif
      return true;

    } else {

      // non le compteur n'est pas égal à zéro
      // il reste des bateaux non coulés

      // on retourne un signal négatif
      return false;

    }

  },

  // fonction permettant d'incrémenter un nouveau tour et de mettre à jour le DOM
  newTurn: function() {
    
    // on incrémente notre compteur de tour
    game.turn++;

    // on met à jour cette information dans le DOM
    document.querySelector('#turn').textContent = game.turn;
  },

  // fonction permettant d'afficher le nom utilisateur, construire et afficher la grille, masquer le formulaire de lancement du jeu
  startGame: function(usernameValue, nbrowsValue) {
    
    // on réinitialise la grille
    grid.resetGrid();
    
    // on affiche le nom d'utilisateur dans le DOM
    document.querySelector('#game .username').textContent = usernameValue;

    // on génère le code HTML de la grille
    // grid.createGrid(nbrowsValue); // soon ;)

    // on affiche la grille
    grid.displayGrid();

    // on réinitialise la partie
    game.init();

    // on masque l'élément conteneur '#beforegame'
    // (formulaire nom utilisateur + taille de grille)
    document.querySelector('#beforegame').classList.add('hide');

    // on affiche l'élément conteneur '#game'
    // (formulaire d'envoi de missile + nom utilisateur et tour de jeu actuel + grille + boutons + historique sous la grille)
    document.querySelector('#game').classList.remove('hide');

  }


};