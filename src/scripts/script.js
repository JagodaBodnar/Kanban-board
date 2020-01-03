function Phone(brand, price, color, processor, ram){
    this.brand = brand;
    this.price = price;
    this.color = color;
    this.processor = processor;
    this.ram = ram;
}

Phone.prototype.printInfo = function(){
    console.log('The phone brans is ' + this.brand + ', color is ' + this.color  + ' the price is ' + this.price + 'processor is ' + this.processor + 'and ram ' + this.ram + '.');
}
let iPhone6S = new Phone('Apple', 2250, 'silver', 'A9', '1GB');
let SamsungGalaxyS6 = new Phone('Samsung Galaxy', 3152, 'gold','Exynos 7420 Octa', '3GB');
let OnePlusOne = new Phone('One Plus', 1526, 'black', 'Snapdragon 801', '3GB');

iPhone6S.printInfo();
SamsungGalaxyS6.printInfo();
OnePlusOne.printInfo();

/*function Button(text){
    this.text = text || 'Hello';
    }
    Button.prototype = {
      create: function(){
        let self = this;
        this.element = document.createElement('button');
        this.element.innerText = this.text;
        this.element.addEventListener('click', function() {
          alert(self.text);
        });
        document.body.appendChild(this.element);
      }
    }
    let btn1 = new Button ('Hello!');
    btn1.create();*/


document.addEventListener('DOMContentLoaded', function(){
  function randomString(){
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for(var i = 0; i < 10; i++){
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
  
  function generateTemplate(name, data, basicElement){
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');
    
    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);
    
    return element;
  }
  
  function Column(name){
    var self = this;
    
    this.id = randomString();
    this.name = name;
    this.element = generateTemplate('column-template', { name: this.name, id: this.id });
  
    this.element.querySelector('.column').addEventListener('click', function (event){
      if(event.target.classList.contains('btn-delete')){
        self.removeColumn();
      }
    
      if (event.target.classList.contains('add-card')) {
        let addCard = prompt("Enter the name of the card");
        if(addCard === ''){
          alert('Please enter the name of the card');
        }
        else if(addCard === null){
          return false;
        }
        else{
          self.addCard(new Card(addCard));
        }
        
      }

    });
  }
  Column.prototype = {
    addCard: function(card){
      this.element.querySelector('ul').appendChild(card.element);
    },
    removeColumn: function(){
      this.element.parentNode.removeChild(this.element);
    }
  };
  
  function Card(description){
    var self = this;
    
    this.id = randomString();
    this.description = description;
    this.element = generateTemplate('card-template', { description: this.description }, 'li');
    
    this.element.querySelector('.card').addEventListener('click', function(event){
      event.stopPropagation();
      
      if(event.target.classList.contains('btn-delete')){
        self.removeCard();
      }
    });
  }
  Card.prototype = {
    removeCard: function(){
      this.element.parentNode.removeChild(this.element);
    }
  }
  
  var board = {
    name: 'Kanban Board',
    addColumn: function(column){
      this.element.appendChild(column.element);
      initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
  };
  
  function initSortable(id){
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
      group: 'kanban',
      sort: true
    });
  }
  
document.querySelector('#board .create-column').addEventListener('click', function(){
  var name = window.prompt('Enter column name');
  if(name === ""){
    alert('Please enter column name')
  }
  else if(name === null){
    return false;
  }
  else{
    var column = new Column(name);
    board.addColumn(column);
  }
  });
  
  var todoColumn = new Column('To-do-list');
  var doingColumn = new Column('Work-in-progress');
  var doneColumn = new Column('Complete');
  
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);
  
  var card1 = new Card('New task');
  var card2 = new Card('Create kanban board');
  var card3 = new Card('Old task');
  
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);
});



