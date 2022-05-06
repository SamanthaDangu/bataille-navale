// et bim, un module stats
const stats = {

  // [convention] on créé une fonction init dans chaque module
  init: function() {
    console.log('stats.init() appelé'); // debug
  },

  // fonction qui ajoute au DOM un historique de chaque tir effectué
  updateLog: function(coords, hit) {
    // déclaration d'une chaîne de caractère
    // constituant notre nouvelle entrée dans les logs (l'historique)
    let logEntryStr = 'Tour #' + game.turn;
    logEntryStr    += ' tir en ' + coords;
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
  },

  // fonction permettant d'afficher les statistiques concernant les tirs réussis et ratés
  handleClickStats: function() {

    // sommes-nous toujours au premier tour ?
    if (game.turn === 1) {
      window.alert('il faut d\'abord envoyer un premier missile');
      return; // on sort de la fonction en ne retournant aucun signal
    }

    // on sélectionne (et compte) les cellules touchées dans mon DOM
    const hitsNum = document.querySelectorAll('.cell.hit').length;
    const splashsNum = document.querySelectorAll('.cell.splash').length;

    // on calcule les pourcentages
    let hitPercent = ( hitsNum / ( hitsNum + splashsNum) ) * 100;
    let splashPercent = splashsNum / ( hitsNum + splashsNum ) * 100;

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

  },

  // fonction permettant d'afficher l'historique de tous les tirs
  handleClickLogs: function() {

    // on sélectionne l'élément conteneur de mon historique
    const historyElement = document.querySelector('#actions');

    // on ajoute OU retire la classe 'hide' du conteneur
    // https://developer.mozilla.org/fr/docs/Web/API/Element/classList
    historyElement.classList.toggle('hide');

  }

};