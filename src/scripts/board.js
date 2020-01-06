let board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
      this.element.appendChild(column.element);
      initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function() {
  let name = prompt('Enter a column name');
  let data = new FormData();

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
      let column = new Column(resp.id, name);
      board.addColumn(column);
    });
});

function initSortable(id) {
  	let el = document.getElementById(id);
  	let sortable = Sortable.create(el, {

      group: {
          name: 'kanban',
          put:true,
          pull: true,
      },
      sort: true
  	});
}