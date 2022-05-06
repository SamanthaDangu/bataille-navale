// ze module app
const app = {

  // on déclare un nom d'utilisateur vide, pour le moment
  username: '',

  // [convention] on créé une fonction init dans chaque module
  init: function() {

    console.log('app.init() appelé'); // debug

    // on initialise la grille
    grid.init();

    // -------------------
    // modification du DOM
    // -------------------

    grid.addCellNames(); // attributs de données 'data-cell-name'
    app.loadTheme(); // application du thème
    // loadTheme est une méthode permettant de vérifier si un cookie
    // de thème est présent, et qui applique ce thème, via une méthode applyTheme

    // ----------------------
    // écouteurs d'évènements
    // ----------------------

    // formulaire nom utilisateur + taille de grille (beforegame)
    const formBeforegameElement = document.querySelector('#beforegame .form');
    formBeforegameElement.addEventListener('submit', app.handleFormBeforegameSubmit);

    // bouton 'voir les statistiques'
    const statBtnElement = document.querySelector('#stats');
    statBtnElement.addEventListener('click', stats.handleClickStats);

    // bouton 'afficher/cacher l'historique'
    const logBtnElement = document.querySelector('#toggle-actions');
    logBtnElement.addEventListener('click', stats.handleClickLogs);  

    // click sur chaque cellule de la grille
    const allCells = document.querySelectorAll('div.cell');
    for (const cellElement of allCells) {
      // pour chaque élément 'cellElement' extrait de l'ensemble 'allCells'
      cellElement.addEventListener('click', app.handleClickOnCell);
    }

    // liste déroulante <select> du thème
    const selectElement = document.querySelector('#select-theme');
    selectElement.addEventListener('change', app.handleChangeTheme);
    // https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/change_event

    // bouton 'voir les scores'
    const scoresBtnElement = document.querySelector('#scores');
    scoresBtnElement.addEventListener('click', score.handleClickScores);

  },

  // fonction/handler appelé lors de l'envoi (submit) du formulaire 'nom utilisateur + taille de grille'
  handleFormBeforegameSubmit: function(event) {
    
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

    // on transmet le nom utilisateur au module
    app.username = usernameValue;

    // on délègue la suite
    // - affichage nom utilisateur
    // - construction de la grille
    // - masquage du formulaire 'nom utilisateur + taille de grille'
    // - affichage de la grille
    // à une fonction 'startGame'
    game.startGame(usernameValue, nbrowsValue);

  },

  // fonction/handler appelé lors de l'envoi (submit) du formulaire 'Case sur laquelle envoyer un missile'
  handleFormMissileSubmit: function(event) {
    
    // on bloque le comportement par défaut du navigateur
    // (qui fait que la fenêtre est rechargée)
    // https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault
    event.preventDefault();

    // on sélectionne dans le DOM le champ de saisie
    const inputElement = document.querySelector('#cellToHit');
    // on en récupère sa valeur
    const inputValue = inputElement.value;
    // on délègue à une fonction 'checkCellName' le test du format de case (ex: A1)
    const inputValidity = grid.checkCellName(inputValue);

    // est-ce que le format est bon ?
    if (inputValidity === true) {

      // oui le format est le bon
      
      // on délègue l'envoie de missile à la fonction 'sendMissile'
      // qui nous retourne un booléen : bateau touché (true) ou pas (false)
      const hit = game.sendMissile(inputValue);

      // on délègue l'ajout dans l'historique des actions
      stats.updateLog(inputValue, hit);

      // on délègue l'incrémentation du tour à la fonction 'newTurn'
      game.newTurn();

      // on vide le champ de saisie
      inputElement.value = '';

    } else {

      // non le format n'est pas le bon

      // j'affiche un message d'erreur
      window.alert('format de cellule incorrect\nvous devez respectez le format d\'exemple suivant : A1');

    }

  },

  // fonction permettant de déclencher des actions lors du clic sur une cellule de la grille
  handleClickOnCell: function(event) {

    // est-ce que la partie N'EST PAS terminée ?
    if (game.checkGameOver() === false) {

      // oui, la partie n'est pas terminée
      // donc on va pouvoir envoyer un missile

      // on récupère l'élément cellule à l'origine de cet évènement
      const cellElement = event.currentTarget;

      // on récupère les coordonnées stockées dans l'attribut de donnée 'cell-name'
      const coords = cellElement.dataset.cellName; // ex: A1

      // on délègue l'envoie de missile à la fonction 'sendMissile'
      // qui nous retourne un booléen : bateau touché (true) ou pas (false)
      const hit = game.sendMissile(coords);

      // on délègue l'ajout dans l'historique des actions
      stats.updateLog(coords, hit);

    }

    // le missile est éventuellement parti
    // bon, et maintenant est-ce que la partie est terminée ?
    if (game.checkGameOver() === true) {
      
      // oui, la partie est terminée

      // on sauvegarde le score dans le localStorage
      score.add(app.username, game.score);

      // on affiche un message
      window.alert('La partie est terminée\nVotre score : ' + game.score);

      // on s'en refait une ?
      //game.startGame();

    } else {

      // non, la partie n'est pas terminée

      // on délègue l'incrémentation du tour à la fonction 'newTurn'
      game.newTurn();

    }

  },

  // méthode/handler appelée lors de la sélection d'un thème et qui permet d'appliquer un thème et de sauvegarder ce choix dans un cookie
  handleChangeTheme: function(evt) {

    // on sélectionne dans le DOM l'élément à l'origine de cet évènement
    const selectElement = evt.currentTarget;
    // on en récupère sa valeur (le nom du thème choisi)
    const selectValue = selectElement.value;
    // on sauvegarde également ce choix dans un cookie appelé 'battleship-theme'
    // - dont la valeur est le nom du thème choisi (selectValue)
    // - dont la durée de vie est 1 an (soit 365 jours x 24 heures x 60 minutes x 60 secondes)
    const cookieMaxAge = ( 365 * 24 * 60 * 60 ); // car max-age est exprimé en secondes
    document.cookie = 'battleship-theme=' + selectValue + '; max-age=' + cookieMaxAge;

    // on délègue la mise en place de ce thème
    app.applyTheme(selectValue);

  },

  // méthode permettant de vérifier si un cookie de thème est présent,
  // et, s'il existe, d'appliquer ce thème
  loadTheme: function() {

    // on récupère tous les cookies sous la forme d'une chaîne de caractères
    let allCookies = document.cookie;
    // on transforme la chaîne de caractères en tableau indexé
    let cookiesTabIndex = allCookies.split('; ');
    // on s'apprête à le transformer en tableau associatif
    let cookiesTabAssoc = []; // futur tableau associatif
    // pour chaque entrée 'cookieString' du tableau indexé 'cookiesTabIndex'
    for (const cookieString of cookiesTabIndex) {
      const cookieSplit = cookieString.split('='); // ex: ['battleship-theme', 'black-and-white']
      const cookieIndex = cookieSplit[0]; // ex: 'battleship-theme'
      const cookieValue = cookieSplit[1]; // ex: 'black-and-white'
      cookiesTabAssoc[cookieIndex] = cookieValue; // ajoute au tableau assoc
    }

    // est-ce que mon cookie 'battleship-theme' est défini ?
    // équivalent à la condition suivante :
    // est-ce que mon cookie n'est pas indéfini ?
    if (cookiesTabAssoc['battleship-theme'] !== undefined) {

      // oui il est défini

      const themeValue = cookiesTabAssoc['battleship-theme']; // on en récupère la valeur
      console.log('loadTheme() cookie de thème détecté : ' + themeValue); // debug
      app.applyTheme(themeValue); // on délègue la mise en place de ce thème

    } else {

      // non il n'est pas défini
      console.log('loadTheme() aucun cookie de thème présent'); // debug

    }

  },

  // méthode permettant de mettre en place un thème dont le nom est passé en paramètre
  applyTheme: function(themeName) {

    // on sélectionne l'élément <body> de notre DOM
    const bodyElement = document.querySelector('body');
    // document.querySelector('body') revient au même que : document.body

    // on supprime les éventuelles classes déjà en place
    bodyElement.classList.remove('oclock', 'f0f', 'black-and-white', 'terminal');

    // on ajoute la classe portant le nom du thème passé en argument
    bodyElement.classList.add(themeName);

  }

}

// lorsque notre document HTML
// est complètement chargé et analysé par le navigateur,
// on lance le handler 'init'
document.addEventListener('DOMContentLoaded', app.init);