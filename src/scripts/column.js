function Column(id, name) {
  let self = this;

  this.id = id;
  this.name = name || 'No name given';
  this.element = generateTemplate('column-template', { name: this.name, id: this.id });

  this.element.querySelector('.column .btn-delete').addEventListener('click', function (event) {
      self.removeColumn();
  });

  this.element.querySelector('.column .add-card').addEventListener('click', function (event) {
    let data = new FormData();
    let cardName = prompt('Enter a card name');

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
      let card = new Card(resp.id, cardName);
      self.addCard(card);
    })
  });
}

Column.prototype = {
addCard: function(card) {
  this.element.querySelector('ul').appendChild(card.element);
},
removeColumn: function() {
    let self = this;
    fetch(fullUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
      .then(function(resp) {
        return resp.json();
    })
    .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
    });
}
};