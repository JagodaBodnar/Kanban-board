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

function Button(text){
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
    btn1.create();
    