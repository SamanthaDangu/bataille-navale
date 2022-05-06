
// un module c'est un tableau associatif
// donc chaque élément de ce module (cells, headers, etc) 
// est accessible sous la forme suivante :
// nomDuModule.nomElement
// exemple :
// grid.cells permet d'accéder à la grille
// grid.headers permet d'accéder aux entêtes
// --
// on peut tout stocker dans un module :
// Number, String, Array, Object ou ... FONCTIONS
// exemple :
// grid.display() permet de lancer la fonction display()
// --
// plutôt cool, non ?
// --
// allez c'est parti pour le module grid :
const grid = {

  // la grille
  cells: [],

  // les entêtes des lignes et colonnes
  headers: {
    rows: [],
    columns: []
  },

  // les coordonnées des cellules
  cellNames: [],

  // [convention] on créé une fonction init dans chaque module
  init: function() {
    console.log('grid.init() appelé'); // debug

    // initialise la grille
    // à terme elle sera générée aléatoirement
    grid.cells = [
      ['', 'b', 'b', 'b', '', '', '', ''], // 0
      ['', '', '', '', '', '', '', ''],    // 1
      ['', '', '', '', '', '', '', ''],    // 2
      ['', '', '', '', '', '', '', ''],    // 3
      ['', '', '', '', '', '', '', ''],    // 4
      ['', '', '', '', '', '', '', 'b'],   // 5
      ['', '', '', '', '', '', '', 'b'],   // 6
      ['', '', '', '', '', '', '', 'b'],   // 7
    ];
    
    // initialise les entêtes
    // à terme elles seront générées dynamiquement
    grid.headers.rows = [1, 2, 3, 4, 5, 6, 7, 8];
    grid.headers.columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    // initialise les coordonnées de chaque cellule
    // à terme elles seront générées dynamiquement
    grid.cellNames = [
      'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1',
      'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2',
      'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3',
      'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4',
      'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5',
      'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6',
      'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7',
      'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8'
    ]

  },

  // fonction permettant d'afficher une ligne (row) à partir de son numéro de ligne (rowIndex)
  displayRow: function(rowIndex) {

    // on extrait la ligne complète (contenant ses cellules)
    // exemple ['', 'b', 'b', 'b', '', '', '', '']
    const rowArray = grid.cells[rowIndex];
    
    // on créé une nouvelle variable 'line'
    // qui est une chaîne de caractère vide pour le moment (prev notion OK)
    let line = '';
    
    // on parcourt chaque entrée de ce tableau row via une boucle for
    // https://fr.javascript.info/while-for#la-boucle-for
    for (let colIndex = 0; colIndex < rowArray.length; colIndex++) {
      // on extrait la valeur de la cellule
      // en utilisant la clé 'colIndex'
      const cellValue = rowArray[colIndex];
      // cellValue peut valoir :
      // '' (eau non touchée)
      // 'b' (bateau non touché)
      // 't' (bateau touché)
      // 'p' (coup dans l'eau)

      // on veut inscrire cette valeur dans la cellule HTML
      // or, notre grille HTML possède les attributs 'id' suivants :
      // row 1 : #cell00, #cell01, #cell02
      // row 2 : #cell10, #cell11, #cell12
      // row 3 : #cell20, #cell21, #cell22
      // etc.
      // je vais d'abord cibler cette cellule HTML de notre DOM, en utilisant les sélecteurs CSS
      // https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector
      let cellElement = document.querySelector('#cell' + rowIndex + colIndex);

      // une fois l'élément cellule du DOM ciblé
      // on en modifie le contenu
      // https://developer.mozilla.org/fr/docs/Web/API/Node/textContent
      // cellElement.textContent = cellValue; // trop fastoche si on affiche le contenu des cases dans le HTML ;)

      // on ajoute éventuellement une classe
      // https://developer.mozilla.org/fr/docs/Web/API/Element/classList
      if (cellValue === 't') {
        cellElement.classList.add('hit');
        
        // on vide le contenu de la cellule
        cellElement.innerHTML = '';

        // on créé un nouvel élément <img>
        const imgElement = document.createElement('img');
        // on lui donne son URL source
        imgElement.src = './img/flames.gif';
        // on lui donne une description
        imgElement.alt = 'flammes animées';
        // l'attribut alt contient une description textuelle de l'image, qui n'est pas obligatoire mais qui est incroyablement utile pour l'accessibilité — les lecteurs d'écran lisent cette description à leurs utilisateurs pour qu'ils sachent ce que signifie l'image. Le texte Alt est également affiché sur la page si l'image ne peut pas être chargée pour une raison quelconque : par exemple, erreurs de réseau (...) source : MDN

        // on insert cet élément image dans le DOM, dans la cellule
        cellElement.appendChild(imgElement);

      } else if (cellValue === 'p') {
        cellElement.classList.add('splash');

        // on vide le contenu de la cellule
        cellElement.innerHTML = '';

        const imgElement = document.createElement('img');
        imgElement.src = './img/water.gif';
        imgElement.alt = 'vagues animées';
        cellElement.appendChild(imgElement); // on insert cet élément image dans le DOM, dans la cellule

      }

      // est-ce que le caractère est vide ?
      if (cellValue === '') {

        // oui, le caractère est vide
        line += '~ '; // on ajoute le caractère '~ ' (vague suivi d'un espace) à notre variable 'line'
        // on dit que l'on concatène sur la variable 'line' le caractère '~ ' (vague suivi d'un espace)

      } else {

        // non, le caractère n'est pas vide
        line += cellValue + ' ';
        // on concatène sur 'line' le caractère (non vide, suivi d'un espace) contenu dans colValue

      }
      
    }

    // on retourne cette ligne formatée
    return line;
  },

  // fonction permettant d'afficher la grille entière (grid) dans la console
  displayGrid: function() {

    // on commence par afficher les entêtes des colonnes
    // la fonction 'join' nous permet de rassembler les valeurs d'un tableau dans une chaîne de caractères
    // 'join' prend en paramètre des caractères (ici un espace) qui s'intercaleront entre les valeurs
    let colHeader = grid.headers.columns.join(' ');
    console.log('  ' + colHeader);

    // on boucle sur chaque ligne (row) de ce tableau gridToDisplay
    for (let rowIndex = 0; rowIndex < grid.cells.length; rowIndex++) {
      
      // on déclare une nouvelle chaîne de caractère
      // qui sera précédée du numéro de ligne (ex: 5)
      let formatedLine = grid.headers.rows[rowIndex] + ' ';
          
      // on concatène avec la ligne mise au bon format, via displayRow
      formatedLine = formatedLine + grid.displayRow(rowIndex);

      // et on affiche cette ligne dans la console
      console.log(formatedLine);

    }

  },

  // fonction qui traduit 'cellName', une chaîne de caractères (ex: A1), en tableau ([rowIndex, colIndex] - ex: [0, 0])
  getGridIndexes: function(cellName) {

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
    let colIndex = grid.headers.columns.indexOf(colName)

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

  },

  // fonction permettant de vérifier l'existence de coordonnées
  checkCellName: function(coords) {
    
    // on extrait la colonne et la ligne de l'argument 'coords'
    let colName = coords[0]; // ex: A
    let rowName = Number(coords[1]); // string > nombre; ex: 1

    // est-ce que cette ligne OU cette colonne n'est pas présente dans 'gridHeaders' ?
    if (
      grid.headers.rows.indexOf(rowName) === -1 ||
      grid.headers.columns.indexOf(colName) === -1
    ) {

      // oui, cette ligne ou cette colonne n'est pas présente
      
      // on sort de la fonction en retournant un signal négatif
      return false;

    } else {

      // non, ces deux infos sont bien présentes

      // on sort de la fonction en retournant un signal positif
      return true;

    }  

  },

  // fonction permettant d'ajouter un attribut de donnée 'cell-name' à chaque cellule
  addCellNames: function() {
    
    // dans le DOM, on récupère toutes les cellules '<div class="cell">' de notre grille HTML
    const cellElements = document.querySelectorAll('div.cell');

    // on créé une boucle for
    // pour boucler sur chacune de ces cellules
    // en gardant un index (i) initialisé à 0
    for (let i = 0; i < cellElements.length; i++) {
      
      // on extrait un élément cellule 'cellEl'
      const cellEl = cellElements[i];

      // on extrait une coordonnée 'humaine' (ex: A1) à partir de notre tableau 'cellNameArray'
      const cellNameValue = grid.cellNames[i];

      // on ajoute un attribut de donnée 'cell-name' contenant cette coordonnée
      cellEl.dataset.cellName = cellNameValue;
      
    }

  },

  // fonction permettant de remettre à zéro la grille
  resetGrid: function() {

    // initialise la grille
    // à terme elle sera générée aléatoirement
    grid.cells = [
      ['', 'b', 'b', 'b', '', '', '', ''], // 0
      ['', '', '', '', '', '', '', ''],    // 1
      ['', '', '', '', '', '', '', ''],    // 2
      ['', '', '', '', '', '', '', ''],    // 3
      ['', '', '', '', '', '', '', ''],    // 4
      ['', '', '', '', '', '', '', 'b'],   // 5
      ['', '', '', '', '', '', '', 'b'],   // 6
      ['', '', '', '', '', '', '', 'b'],   // 7
    ];

  }

};