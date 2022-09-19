const hamburgerSizes = new Map();
hamburgerSizes.set('small', {'price': 50, 'calories': 20});
hamburgerSizes.set('big', {'price': 100, 'calories': 40});

const hamburgerStuffings = new Map();
hamburgerStuffings.set('cheese',  {'price': 10, 'calories': 20});
hamburgerStuffings.set('salad',  {'price': 20, 'calories': 5});
hamburgerStuffings.set('potato',  {'price': 15, 'calories': 10});

const hamburgerToppings = new Map();
hamburgerToppings.set('flavoring',  {'price': 15, 'calories': 0});
hamburgerToppings.set('mayo',  {'price': 50, 'calories': 5});

function checkSize(size) {
  if (!hamburgerSizes.has(size)) {
    console.error(
      `Wrong hamburger size: ${size}\n
      Possible values: ${[...hamburgerSizes.keys()]}`
    );
    return false;
  }
  return true;
}

function checkStuffing(stuffing) {
  if (!hamburgerStuffings.has(stuffing)) {
    console.error(
      `Wrong hamburger stuffing: ${stuffing}\n
      Possible values: ${[...hamburgerStuffings.keys()]}`
    );
    return false;
  }
  return true;
}

function checkTopping(topping) {
  if (!hamburgerToppings.has(topping)) {
    console.error(
      `Wrong hamburger topping: ${topping}\n
      Possible values: ${[...hamburgerToppings.keys()]}`
    );
    return false;
  }
  return true;
}

class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.price = hamburgerSizes.get(size).price;
    this.calories = hamburgerSizes.get(size).calories;
    this.stuffing = stuffing;
    this.price += hamburgerStuffings.get(stuffing).price;
    this.calories += hamburgerStuffings.get(stuffing).calories;
    this.toppings = new Map();
  }

  static makeHamburger(size, stuffing) {
    if (!checkSize(size) || !checkStuffing(stuffing)) {
      return null;
    }
    return new Hamburger(size, stuffing);
  }

  addTopping(topping) {
    if (!checkTopping(topping)) return;
    if (this.toppings.has(topping)) {
      console.log(`Hamburger already has topping: ${topping}`);
      return;
    }
    this.toppings.set(topping, hamburgerToppings.get(topping));
  }

  removeTopping(topping) {
    if (!checkTopping(topping)) return;
    if (!this.toppings.has(topping)) {
      console.log(`Hamburger has no topping: ${topping}`);
      return;
    }
    this.toppings.delete(topping);
  }

  getToppings() {
    return JSON.stringify(
      [...this.toppings.entries()], null, 2
    );
  }

  getStuffing() {
    return this.stuffing;
  }

  getSize() {
    return this.size;
  }

  calculatePrice() {
    return [...this.toppings.values()]
      .reduce((acc, t) => acc + t.price, this.price);
  }

  calculateCalories() {
    return [...this.toppings.values()]
      .reduce((acc, t) => acc + t.calories, this.calories);
  }

}

console.log('Creating hamburger with wrong size');
let hamburger = Hamburger.makeHamburger('medium', 'salad');
console.log(hamburger);

console.log('Creating hamburger with wrong stuffing');
hamburger = Hamburger.makeHamburger('small', 'cucumber');
console.log(hamburger);

console.log('Creating hamburger with correct size and stuffing');
hamburger = Hamburger.makeHamburger('big', 'cheese');
console.log(hamburger);

console.log('Adding topping mayo');
hamburger.addTopping('mayo');
console.log('Adding topping mayo');
hamburger.addTopping('mayo');
console.log('Adding wrong topping mayo1');
hamburger.addTopping('mayo1');
console.log('Adding topping flavoring');
hamburger.addTopping('flavoring');
console.log('Removing topping flavoring');
hamburger.removeTopping('flavoring');
console.log('Removing topping flavoring');
hamburger.removeTopping('flavoring');

console.log(`Size: ${hamburger.getSize()}`);
console.log(`Stuffing: ${hamburger.getStuffing()}`);
console.log(`Toppings: ${hamburger.getToppings()}`);
console.log(`Price: ${hamburger.calculatePrice()}`);
console.log(`Calories: ${hamburger.calculateCalories()}`);
