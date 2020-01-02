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