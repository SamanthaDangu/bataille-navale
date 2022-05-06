// et paf, un module score
const score = {

  // on déclare un tableau "history"; vide, pour le moment
  history: [],

  // [convention] on créé une fonction init dans chaque module
  init: function() {
    console.log('score.init() appelé'); // debug
  },

  // méthode permettant de récupérer les scores stockés dans le localStorage
  getHistory: function() {

    // on récupère le potentiel contenu 'scores' du localStorage
    const scoresStr = localStorage.getItem('scores');

    // localStorage "scores" :
    // 0 : { 'username': 'bob', 'score': 666 }
    // 1 : { 'username': 'alice', 'score': 1666 }
    // 2 : { 'username': 'alexis', 'score': 100000 }

    // est-ce que j'ai bien cette entrée dans mon localStorage ?
    if (scoresStr !== null) {
      
      // oui, cette entrée existe
      
      // on en décode la valeur, qui est au format JSON
      // et on la place dans notre variable history
      score.history = JSON.parse(scoresStr);

      // debug
      console.log('getHistory() cool, on a une entrée "scores" dans le localStorage');

    }

  },

  // méthode permettant d'ajouter une entrée (composée d'un pseudo et d'un score) dans le localStorage
  add: function(usernameToAdd, scoreToAdd) {

    // on créé une nouvelle entrée
    const newScoreArray = {
      'username': usernameToAdd,
      'score': scoreToAdd
    };

    // on récupère/rafraîchi les scores actuels
    score.getHistory();

    // on ajoute la nouvelle entrée "newScoreArray"
    // aux potentiels autres scores existants
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    score.history.push(newScoreArray);

    // on encode les scores en JSON, grâce à JSON.stringify()
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    const scoresStr = JSON.stringify(score.history);

    // on sauvegarde dans le localStorage
    localStorage.setItem('scores', scoresStr);

  },

  // handler qui est appelé lorsque l'on click sur le bouton "voir les scores"
  handleClickScores: function(evt) {

    // on récupère/rafraîchi les scores actuels
    score.getHistory(); // permet de mettre à jour la variable "score.history"
    
    // on créé une chaîne de caractères vide
    // qui contiendra le message affiché par une alert()
    let alertStr = '';

    console.log('handleClickScores()');
    console.log(score.history);

    // pour chaque entrée score
    for (const currentScore of score.history) {
      // on concatène le nom utilisateur, deux points et le score suivi d'un retour à la ligne
      // au message qui sera affiché par une alert()
      alertStr += currentScore.username + ' : ' + currentScore.score + '\n';
    }

    // on affiche le message via une alert()
    window.alert(alertStr);

  }

}