const prefix = "https://cors-anywhere.herokuapp.com/";
const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
const myHeaders = {
    'X-Client-Id': '4124',
    'X-Auth-Token': 'cb1fca0aa21e2fa224dd4cd6f3667202'
};

let fullUrl = prefix + baseUrl;

fetch(fullUrl + '/board', { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
  });
  function setupColumns(columns) {
    columns.forEach(function(column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
    let cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
}
    
    function generateTemplate(name, data, basicElement){
      let template = document.getElementById(name).innerHTML;
      let element = document.createElement(basicElement || 'div');
      
      Mustache.parse(template);
      element.innerHTML = Mustache.render(template, data);
      
      return element;
  }