var prefix = "https://cors-anywhere.herokuapp.com/";
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
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
    var cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
}
    
    function generateTemplate(name, data, basicElement){
      var template = document.getElementById(name).innerHTML;
      var element = document.createElement(basicElement || 'div');
      
      Mustache.parse(template);
      element.innerHTML = Mustache.render(template, data);
      
      return element;
    }
  function Column(id, name) {
    var self = this;
  
    this.id = id;
    this.name = name || 'No name given';
    this.element = generateTemplate('column-template', { name: this.name, id: this.id });
  
    this.element.querySelector('.column .btn-delete').addEventListener('click', function (event) {
        self.removeColumn();
    });
  
    this.element.querySelector('.column .add-card').addEventListener('click', function (event) {
      var data = new FormData();
    var cardName = prompt('Enter a card name');
  
    data.append('name', cardName);
    data.append('bootcamp_kanban_column_id', self.id);
  
    fetch(fullUrl + '/card', {
        method: 'POST',
        headers: myHeaders,
        body: data,
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(resp) {
        var card = new Card(resp.id, cardName);
        self.addCard(card);
      })
    });
  }
  
  Column.prototype = {
  addCard: function(card) {
    this.element.querySelector('ul').appendChild(card.element);
  },
  removeColumn: function() {
      var self = this;
      fetch(fullUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
        .then(function(resp) {
          return resp.json();
      })
      .then(function(resp) {
          self.element.parentNode.removeChild(self.element);
      });
  }
  };
  function Card(id, name){
    var self = this;
    this.id = id;
    this.name = name
    this.element = generateTemplate('card-template', { description: this.name }, 'li');
    
    this.element.querySelector('.card').addEventListener('click', function(event){
      event.stopPropagation();
      
      if(event.target.classList.contains('btn-delete')){
        self.removeCard();
      }
    });
  }
  Card.prototype = {
    removeCard: function() {
        var self = this;
      
        fetch(fullUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
          .then(function(resp) {
            return resp.json();
          })
          .then(function(resp) {
            self.element.parentNode.removeChild(self.element);
          })
      }
  }
  var board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
      this.element.appendChild(column.element);
      initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function() {
  var name = prompt('Enter a column name');
  var data = new FormData();

  data.append('name', name);

  fetch(fullUrl + '/column', {
      method: 'POST',
      headers: myHeaders,
      body: data,
    })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp) {
      var column = new Column(resp.id, name);
      board.addColumn(column);
    });
});

function initSortable(id) {
  	var el = document.getElementById(id);
  	var sortable = Sortable.create(el, {

      group: {
          name: 'kanban',
          put:true,
          pull: true,
      },
      sort: true
  	});
}