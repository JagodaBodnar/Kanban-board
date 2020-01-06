function Card(id, name){
    let self = this;
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
        let self = this;
      
        fetch(fullUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
          .then(function(resp) {
            return resp.json();
          })
          .then(function(resp) {
            self.element.parentNode.removeChild(self.element);
          })
      }
  }