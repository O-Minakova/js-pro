const goods = [
  {id: 1, title: 'Shirt', price: 150},
  {id: 2, title: 'Socks', price: 50},
  {id: 3, title: 'Jacket', price: 350},
  {id: 4, title: 'Shoes', price: 250},
];

class GoodsItem {
  constructor({id, title, price}) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  render() {
    return `
    <div class="goods-item" data-id="${this.id}">
      <div class="goods-item_img_wrapper">
        <img class="goods-item_img" src="img/${this.title}.png" alt="${this.title}">
      </div>
      <h3>${this.title}</h3>
      <p>${this.price} $</p>
      <div class="add_to_cart_wrapper">
        <button class="add_to_cart">Добавить</button>
      </div>
    </div>
    `;
  }
}

class GoodsList {
  items = [];

  fetchGoods() {
    this.items = goods;
  }

  render() {
    document.querySelector('.goods-list').innerHTML =
      this.items.map(item => new GoodsItem(item).render()).join('');
  }

  getGoodsTotalPrice() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}

class CartItem {
  constructor({id, title, price}, count) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.count = count;
  }

  getTotalPrice() {
    return this.price * this.count;
  }

  renderItem() {
    // добавить код отрисовки элемента в Корзине
  }
}

class Cart {
  constructor() {
    this.items = new Map();
  }

  addItem({id, title, price}) {
    if (!this.items.has(id)) {
      this.items.set(id, new CartItem({id, title, price}, 0));
    }
    this.items.get(id).count++;
    //добавить код добавления элемента в html кода корзины
  }

  removeItem(id) {
    const cartItem = this.items.get(id);
    if (cartItem.count === 1) {
      this.items.delete(id);
      //добавить код удаления элемента из html кода корзины
    } else {
      cartItem.count--;
      //добавить код обновления элемента в html коде корзины
    }
    //добавить код обновления полной стоимости в html коде корзины
  }

  render() {
    // добавить код отрисовки/отображения содержимого корзины при нажатии на кнопку Корзина
  }

  getCartTotalPrice() {
    return [...this.items.values()]
      .reduce((acc, item) => acc + item.getTotalPrice(), 0);
  }

  getCartProductsCount() {
    return [...this.items.values()].reduce((acc, item) => acc + item.count, 0);
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
const cart = new Cart();