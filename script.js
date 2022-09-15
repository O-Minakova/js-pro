const goods = [
  {title: 'Shirt', price: 150},
  {title: 'Socks', price: 50},
  {title: 'Jacket', price: 350},
  {title: 'Shoes', price: 250},
];

const renderGoodsItem = (title, price) => {
  return `<div class="goods-item">
            <div class="goods-item_img_wrapper">
              <img class="goods-item_img" src="img/${title}.png" alt="${title}">
            </div>
            <h3>${title}</h3>
            <p>${price} $</p>
            <div class="add_to_cart_wrapper">
              <button class="add_to_cart">Добавить</button>
            </div>
          </div>`;
};

const renderGoodsList = (list) => {
  document.querySelector('.goods-list').innerHTML =
    list.map(item =>
      renderGoodsItem(item.title, item.price)
    ).join('');
}

renderGoodsList(goods);