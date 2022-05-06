console.log("app.js chargé");

// création d'une grille
// niveau facile : 1 seul bateau (dont une partie touchée)
// et un coup dans l'eau
let grid =[
  ['', 'b', 'b', 'b', '', '', '', ''], // 0
  ['', '', '', '', '', '', '', ''],    // 1
  ['', '', '', '', '', '', '', ''],    // 2
  ['', '', '', '', '', '', '', ''],    // 3
  ['', '', '', '', '', '', '', ''],    // 4
  ['', '', '', '', '', '', '', 'b'],   // 5
  ['', '', '', '', '', '', '', 'b'],   // 6
  ['', '', '', '', '', '', '', 'b'],   // 7
];

// déclare une nouvelle variable servant de compteur de tour et initialisé à 1
let turnNum = 1;

// entêtes des lignes & colonnes
// stoockés dans un tableau associatif
let gridHeaders = {
  rows:     [1, 2, 3, 4, 5, 6, 7, 8],
  columns:  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
};

// tableau contenant les coordonnées 'humaines' de chacune de nos cellules
const cellNameArray = [
  'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1',
  'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2',
  'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3',
  'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4',
  'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5',
  'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6',
  'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7',
  'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8'
];

// on déclare une fonction qui sera lancée lorsque notre document HTML est complètement chargé et analysé par le navigateur
function init() {

  // -------------------
  // modification du DOM
  // -------------------

  addCellNames(); // fonction qui créé tous les attributs de données (les fameux data-cell-name) sur chacune de nos cases/cellules
  
  // ----------------------
  // écouteurs d'évènements
  // ----------------------

  // formulaire nom utilisateur + taille de grille
  const formBeforegameElement = document.querySelector('#beforegame .form');
  formBeforegameElement.addEventListener('submit', handleFormBeforegameSubmit);

  // on écoute l'envoi du formulaire de tir
  const formMissileElement = document.querySelector('#game .form');
  formMissileElement.addEventListener('submit', handleFormMissileSubmit);

  // bouton 'voir les statistiques'
  const statBtnElement = document.querySelector('#stats');
  statBtnElement.addEventListener('click', handleClickStats);

  // bouton 'afficher/cacher l'historique'
  const logBtnElement = document.querySelector('#toggle-actions');
  logBtnElement.addEventListener('click', handleClickLogs);

  // ----------------------
  // affichage de la grille
  // ----------------------

  displayGrid();

}

// fonction permettant d'afficher une ligne (row) de la grille (grid) dans la console, à partir d'un tableau contenant toutes les entrées de la ligne (rowArray)
function displayRow(rowIndex) {

  // cette fonction ne reçoit plus toutes les entrées de la ligne (rowArray)
  // mais seulement un numéro de ligne (rowIndex)

  // exemples :
  // displayRow(0)
  // displayRow(1)
  // displayRow(2)

  // on recréé le tableau rowArray
  // à partir de l'index reçu en argument
  const rowArray = grid[rowIndex];
  
  // on créé une nouvelle variable 'line'
  // une chaîne de caractère vide pour le moment
  let line = '';
  
  // on parcourt chaque entrée de ce tableau row via une boucle for
  // https://fr.javascript.info/while-for#la-boucle-for
  for (let colIndex = 0; colIndex < 8; colIndex++) {

    // on extrait la valeur de l'entrée du tableau en utilisant la clé colIndex
    // exemples de valeurs possibles :
    // '' (vide)
    // 'b' (bateau)
    // 't' (bateau touché)
    // etc.
    const colValue = rowArray[colIndex];

    // on veut inscrire la valeur le "colValue" dans la cellule HTML
    // or, notre grille HTML possède les attributs 'id' suivants :
    // row 1 : #cell00, #cell01, #cell02
    // row 2 : #cell10, #cell11, #cell12
    // row 3 : #cell20, #cell21, #cell22
    // etc.

    // je vais d'abord cibler cette cellule HTML de notre DOM
    // en utilisant les sélecteurs CSS
    // https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector
    let selectorString = '#cell' + rowIndex + colIndex; // on créé une chaîne de caractère en concaténant la clé de la rangée (row) avec la clé de la colonne
    let cellElement = document.querySelector(selectorString);
    // console.log(cellElement);

    // une fois l'élément cellule du DOM ciblé, j'en modifie le contenu
    // https://developer.mozilla.org/fr/docs/Web/API/Node/textContent
    cellElement.textContent = colValue; // trop fastoche si on affiche le contenu des cases dans le HTML ;)

    // je peux aussi ajouter une classe à mon élément cellElement
    // https://developer.mozilla.org/fr/docs/Web/API/Element/classList
    // selon qu'il s'agit d'un bateau touché (t)
    // ou d'un coup dans l'eau, un plouf (p)

    // est-ce que sur cette case c'est un bateau touché ?
    if (colValue === 't') {

      cellElement.classList.add('hit');
    
    // sinon est-ce que sur cette case c'est un plouf ?
    } else if (colValue === 'p') {
      
      cellElement.classList.add('splash');

    }

    // est-ce que le caractère est vide ?
    if (colValue === '') {

      // oui, le caractère est vide
      line += '~ '; // on ajoute le caractère '~ ' (vague suivi d'un espace) à notre variable 'line'
      // on dit que l'on concatène sur la variable 'line' le caractère '~ ' (vague suivi d'un espace)

    } else {

      // non, le caractère n'est pas vide
      line += colValue + ' ';
      // on concatène sur 'line' le caractère (non vide, suivi d'un espace) contenu dans colValue

    }
    
  }

  // on retourne cette ligne formatée
  return line;

}

// fonction permettant d'afficher la grille entière (grid) dans la console
function displayGrid() {

  // on commence par afficher les entêtes des colonnes
  // la fonction 'join' nous permet de rassembler les valeurs d'un tableau dans une chaîne de caractères
  // 'join' prend en paramètre des caractères (ici un espace) qui s'intercaleront entre les valeurs
  let colHeader = gridHeaders.columns.join(' ');
  console.log('  ' + colHeader);

  // on boucle sur chaque ligne (row) de ce tableau gridToDisplay
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    // on utilise la variable 'rowIndex' gérée par la boucle for
    // pour extraire la valeur de l'entrée du tableau
    const rowArray = grid[rowIndex];

    // on précède la ligne formatée par son numéro de ligne (de 1 à 8)
    let formatedLine = gridHeaders.rows[rowIndex] + ' ';
        
    // on concatène avec la ligne mise au bon format, via displayRow
    // on passe désormais un index à displayRow
    formatedLine = formatedLine + displayRow(rowIndex);

    // et on affiche cette ligne dans la console
    console.log(formatedLine);

  }

}

// fonction permettant d'afficher un récap dans la console
// de toutes les cases touchées
function displayHits() {
  
  // on vise dans notre DOM toutes les cases ayant la classe "hit"
  const hitElements = document.querySelectorAll('.hit');
  // console.log(hitElements); // debug

  // on créé un tableau vide qui contiendra les éléments cases touchées
  let hits = [];

  // on parcourt tous les éléments récupérés par notre sélecteur querySelectorAll
  for (const currentElement of hitElements) {
    
    // pour chaque élément 'currentElement' de mon tableau 'hitElements' (for...of)
    // - on récupère la valeur de l'attribut de données 'cell-name' de l'élément
    // https://developer.mozilla.org/fr/docs/Learn/HTML/Howto/Use_data_attributes
    let cellNameValue = currentElement.dataset.cellName;
    // console.log('id de cet élément est : ' + currentElementID); // debug
    
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    hits.push(cellNameValue);

  }

  // on affiche un message de récap
  // on concatène les entrées d'un tableau en une chaîne de caractère grâce à la méthode 'join' de JS
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/join
  console.log('Les cases touchées sont ' + hits.join(', '));

}

// fonction permettant de tirer un missile sur une cellule, au format grid (ex: [0, 0])
// cette fonction retournera TRUE ou FALSE selon qu'on ait touché un bateau, ou pas.
function sendMissileAt(rowIndex, colIndex) {

  // debug (au kazou)
  // console.log('sendMissileAt(' + rowIndex + ',' + colIndex + ')');

  // on récupère la valeur de cette cellule
  let cellValue = grid[rowIndex][colIndex];

  // est-ce qu'il y a un bateau (b) ici ?
  if (cellValue === 'b') {

    // oui c'est un bateau
    console.log('💥 touché');

    // je modifie le tableau
    grid[rowIndex][colIndex] = 't'; // 't' pour touché

    // après chaque tir réussi, on affiche
    // un récap de toutes les cases touchées
    displayHits();

		// on actualise la grille
    displayGrid();

    // on retourne un signal positif
    return true;
  
  // bon, pas de bateau (b) ici
  // mais s'il n'y a pas ça (else if) est-ce qu'il y a un bateau déjà touché (t) ici ?
  } else if (cellValue === 't') {

    // oui c'est un bateau déjà touché
    console.log('désolé, bateau déjà touché à cette case');
		
		// on actualise la grille
    displayGrid();

    // on retourne un signal négatif
    return false;

  // bon, pas de bateau (b), ni de bateau déjà touché (t)
  // mais s'il n'y a pas ça (else if) est-ce qu'il y a déjà un plouf (p) un coup dans l'eau ici ?
  } else if (cellValue === 'p') {

    // oui c'est déjà un plouf
    console.log('désolé, plouf déjà signalé à cette case');

    // on retourne un signal négatif
    return false;

  // bon, pas de bateau (b), ni de bateau déjà touché (t), ni de plouf déjà signalé (p)
  // donc il ne reste qu'un dernier choix : un plouf non signalé
  } else {

    // c'est un coup nouvellement dans l'eau !
    console.log('plouf.');

    // je modifie le tableau
    grid[rowIndex][colIndex] = 'p'; // 'p' pour plouf

		// on actualise la grille
    displayGrid();

    // on retourne un signal négatif
    return false;

  }

}

// fonction permettant de tirer un missile sur une cellule, au format humain (ex: A1)
// via getGridIndexes (pour la traduction A1 > 0,0) 
// via sendMissileAt (pour tirer le missile)
// cette fonction retournera ce que sendMissileAt retournera (sic)
// c'est à dire TRUE ou FALSE selon qu'on ait touché un bateau, ou pas.
function sendMissile(cellName) {
  // on utilise la fonction getGridIndexes
  // qui traduit notre chaîne de caractères (ex: A1) en index (row = 0, column = 0)
  const result = getGridIndexes(cellName);
  const rowIndex = result[0];
  const columnIndex = result[1];
  
  // puis on appelle la fonction sendMissileAt
  // qui retourne VRAI si touché, FALSE sinon
  return sendMissileAt(rowIndex, columnIndex);
}

// fonction qui traduit 'cellName', une chaîne de caractères (ex: A1), en tableau ([rowIndex, colIndex] - ex: [0, 0])
function getGridIndexes(cellName) {

  // ---------------------------------------------
  // premier caractère
  // ---------------------------------------------
  // on isole le 1er caractère (ex: A) de cette chaîne de caractère
  // https://developer.mozilla.org/fr/docs/Web/XPath/Functions/substring
  let colName = cellName.substring(0, 1);
  // let colName = cellName[0]; // idem, en plus court
  // sauf que ce qu'on veut ce n'est pas une lettre (ex: A) mais un entier (ex: 0)
  // on a cette correspondance dans gridHeaders
  // et pour récupérer la clé (ex: 0) d'une valeur (ex: A) on passe par la fonction indexOf
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  let colIndex = gridHeaders.columns.indexOf(colName)

  // ---------------------------------------------
  // deuxième caractère
  // ---------------------------------------------
  // on isole le 2ème caractère (ex: 1) de cette chaîne de caractère
  let rowIndex = cellName[1];
  // le problème c'est que ce deuxième caractère provient d'une chaîne de caractères (string)
  // console.log( typeof(rowIndex) ); // affiche 'string'
  // pour transformer en nombre on passe par Number()
  rowIndex = Number(rowIndex);
  // console.log( typeof(rowIndex) ); // affiche bien 'number'
  // super, sauf que notre ligne (row) commence à '0' et non pas '1'
  rowIndex--;
  // revient au même que rowIndex = rowIndex - 1;
  // ou rowIndex -= 1;

  // ---------------------------------------------
  // return
  // ---------------------------------------------
  let result = [rowIndex, colIndex];

  // on retourne ce tableau
  return result;

}


// fonction permettant de savoir si le jeu est terminé, ou pas
function checkGameOver() {

  // je déclare un compteur de cellules 'b' restantes
  let remainingBoatCell = 0; // initialisé à zéro

  // pour extraire chaque VALEUR (et non clé) d'un tableau, j'utilise une boucle for...of
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/for...of

  // pour chaque ligne de ma grille
  for (const row of grid) {
    
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
    // console.log('checkGameOver : il reste des bateaux non coulés');

    // on retourne un signal négatif
    return false;

  }

}

// fonction permettant d'ajouter un attribut de donnée 'cell-name' à chaque cellule
function addCellNames() {
  
  // dans le DOM, on récupère toutes les cellules '<div class="cell">' de notre grille HTML
  const cellElements = document.querySelectorAll('div.cell');

  // on créé une boucle for
  // pour boucler sur chacune de ces cellules
  // en gardant un index (i) initialisé à 0
  // --
  // on récupère le nombre total d'entrées du tableau cellElements
  // via la méthode length
  // https://javascript.info/array
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/length
  for (let i = 0; i < cellElements.length; i++) {
    
    // on extrait un élément cellule 'cellEl'
    const cellEl = cellElements[i];

    // on extrait une coordonnée 'humaine' (ex: A1) à partir de notre tableau 'cellNameArray'
    const cellNameValue = cellNameArray[i];

    // on ajoute un attribut de donnée 'cell-name' contenant cette coordonnée
    cellEl.dataset.cellName = cellNameValue;
    
  }

}

// fonction permettant d'ouvrir une boite de dialogue
// afin de laisser l'internaute saisir les coordonnées au format humain (ex: A1)
function promptMissileCell() {
  
  // on récupère ce retour dans une variable 'coords'
  let coords = window.prompt('Merci de saisir les coordonnées d\'envoi du missile');

  // on transmet ces coordonnées à sendMissile
  sendMissile(coords);
}

// fonction/handler appelé lors de l'envoi (submit) du formulaire 'Case sur laquelle envoyer un missile'
function handleFormMissileSubmit(event) {
  
  // on bloque le comportement par défaut du navigateur
  // (qui fait que la fenêtre est rechargée)
  // https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault
  event.preventDefault();

  // on sélectionne dans le DOM le champ de saisie
  const inputElement = document.querySelector('#cellToHit');
  // on en récupère sa valeur
  const inputValue = inputElement.value; // ex: "A1"
  // je délègue à une fonction 'checkCellName' le test du format de case (ex: A1)
  const inputValidity = checkCellName(inputValue); // retourne un booléen

  // est-ce que le format est bon ?
  if (inputValidity === true) {

    // oui le format est le bon
    
    // je délègue l'envoie de missile à la fonction 'sendMissile'
    // qui nous retourne un booléen : bateau touché (true) ou pas (false)
    const hit = sendMissile(inputValue);

    // on délègue l'ajout dans l'historique des actions
    updateLog(inputValue, hit);

    // je délègue l'incrémentation du tour à la fonction 'newTurn'
    newTurn();
    // je vide le champ de saisie
    inputElement.value = '';

  } else {

    // non le format n'est pas le bon

    // j'affiche un message d'erreur
    window.alert('format de cellule incorrect\nvous devez respectez le format d\'exemple suivant : A1');

  }

}

// fonction permettant d'afficher les statistiques concernant les tirs réussis et ratés
function handleClickStats() {

  // sommes-nous toujours au premier tour ?
  if (turnNum === 1) {
    window.alert('il faut d\'abord envoyer un premier missile');
    return; // on sort de la fonction en ne retournant aucun signal
  }

  // on sélectionne (et compte) les cellules touchées dans mon DOM
  const hitsNum = document.querySelectorAll('.cell.hit').length;
  const splashsNum = document.querySelectorAll('.cell.splash').length;

  // on calcule les pourcentages
  let hitPercent = ( hitsNum / ( hitsNum + splashsNum) ) * 100;
  let splashPercent = ( splashsNum / ( hitsNum + splashsNum ) ) * 100;
  
  // on retire tout ce qui a après la virgule
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
  hitPercent = hitPercent.toFixed();
  splashPercent = splashPercent.toFixed();

  // on créé les chaînes de caractères qui seront affichées
  const hitString = 'Pourcentage de tirs réussis : ' + hitPercent + '%';
  const splashString = 'Pourcentage de tirs ratés : ' + splashPercent + '%';

  // on affiche via une alerte
  // avec \n permettant de faire un retour à la ligne
  window.alert(hitString + '\n' + splashString);

}

// fonction permettant d'afficher l'historique de tous les tirs
function handleClickLogs() {

  // on sélectionne l'élément conteneur de mon historique
  const historyElement = document.querySelector('#actions');

  // on ajoute OU retire la classe 'hide' du conteneur
  // https://developer.mozilla.org/fr/docs/Web/API/Element/classList
  historyElement.classList.toggle('hide');

}

// fonction/handler appelé lors de l'envoi (submit) du formulaire 'nom utilisateur + taille de grille'
function handleFormBeforegameSubmit(event) {
  
  // on bloque le comportement par défaut du navigateur
  // (qui fait que la fenêtre est rechargée)
  event.preventDefault();

  // on récupère l'élément formulaire, déclencheur de cet heureux évènement
  const formElement = event.currentTarget;

  // on récupère les éléments champs du formulaire
  const usernameElement = formElement.querySelector('#username');
  const nbrowsElement = formElement.querySelector('#nbrows');

  // on récupère les valeurs de ces éléments
  const usernameValue = usernameElement.value;
  const nbrowsValue = nbrowsElement.value;

  // on délègue la suite
  // - affichage nom utilisateur
  // - construction de la grille
  // - masquage du formulaire 'nom utilisateur + taille de grille'
  // - affichage de la grille
  // à une fonction 'startGame'
  startGame(usernameValue, nbrowsValue);

}

// fonction permettant de vérifier l'existence d'une cellule
function checkCellName(coords) {

  // cette fonction reçoit en paramètre des coordonnées (chaîne de caractères)
  // ex : "A1"
  
  // on extrait la colonne et la ligne de l'argument 'coords'
  let colName = coords[0]; // ex: A
  let rowName = Number(coords[1]); // string > nombre; ex: 1

  // est-ce que cette ligne OU cette colonne n'est pas présente dans 'gridHeaders' ?
  // NB : indexOf() ne retourne pas un "false" mais un "-1"
  // lorsqu'il ne trouve pas l'entrée dans le tableau
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  if (
    gridHeaders.rows.indexOf(rowName) === -1 ||
    gridHeaders.columns.indexOf(colName) === -1
  ) {

    // oui, cette ligne ou cette colonne n'est pas présente
    
    // on sort de la fonction en retournant un signal négatif
    return false;

  } else {

    // non, ces deux infos sont bien présentes

    // on sort de la fonction en retournant un signal positif
    return true;

  }

}

// fonction permettant d'incrémenter un nouveau tour et de mettre à jour le DOM
function newTurn() {
  
  // on incrémente notre compteur de tour
  turnNum++;

  // on met à jour cette information dans le DOM
  document.querySelector('#turn').textContent = turnNum;
}

/**
 * fonction qui ajoute au DOM un historique de chaque tir effectué
 * 
 * @param {string} coords 
 * @param {boolean} hit 
 */
// merci JSDoc
// https://fr.wikipedia.org/wiki/JSDoc
// merci Tristan aussi :B
function updateLog(coords, hit) {

  // déclaration d'une chaîne de caractère constituant notre nouvelle entrée dans les logs (l'historique)
  let logEntryStr = 'Tour #' + turnNum + ' tir en ' + coords;

  // est-ce que la cible a été atteinte ?
  if (hit) {

    logEntryStr += ' réussi';

  } else {

    logEntryStr += ' raté';

  }

  // on sélectionne l'élément conteneur de mon historique
  const historyElement = document.querySelector('#actions');
  // je créé une nouvelle entrée
  const divElement = document.createElement('div');
  divElement.textContent = logEntryStr;
  // j'injecte cette nouvelle entrée comme PREMIER ENFANT de mon container
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
  historyElement.prepend(divElement);

}

// fonction permettant d'afficher le nom utilisateur, construire et afficher la grille, masquer le formulaire de lancement du jeu
function startGame(usernameValue, nbrowsValue) {
  
  // on réinitialise le tour de jeu
  turnNum = 1;

  // on initialise le tableau multidimensionnel de la grille
  grid =[
    ['', 'b', 'b', 'b', '', '', '', ''], // 0
    ['', '', '', '', '', '', '', ''],    // 1
    ['', '', '', '', '', '', '', ''],    // 2
    ['', '', '', '', '', '', '', ''],    // 3
    ['', '', '', '', '', '', '', ''],    // 4
    ['', '', '', '', '', '', '', 'b'],   // 5
    ['', '', '', '', '', '', '', 'b'],   // 6
    ['', '', '', '', '', '', '', 'b'],   // 7
  ];

  // on affiche le nom d'utilisateur dans le DOM
  document.querySelector('#game .username').textContent = usernameValue;

  // on génère le code HTML de la grille
  // createGrid(); // soon ;)

  // on affiche la grille
  displayGrid();

  // on masque l'élément conteneur '#beforegame'
  // (formulaire nom utilisateur + taille de grille)
  document.querySelector('#beforegame').classList.add('hide');

  // on affiche l'élément conteneur '#game'
  // (formulaire d'envoi de missile + nom utilisateur et tour de jeu actuel + grille + boutons + historique sous la grille)
  document.querySelector('#game').classList.remove('hide');

}


// lorsque notre document HTML est complètement chargé et analysé par le navigateur, on lance le handler 'init'
document.addEventListener('DOMContentLoaded', init);