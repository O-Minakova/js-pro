// const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const BASE_URL = 'http://localhost:8000';
const GET_GOODS_ITEMS = `${BASE_URL}/goods.json`;
const GET_BASKET_GOODS = `${BASE_URL}/basket_goods`;

function service(url, method="GET", body) {
  return fetch(url, {
    headers: Object.assign({}, body ? {
      'Content-Type': 'application/json; charset=utf-8'
    } : {}),
    method,
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
}

function init() {

  Vue.component('notification', {
    template: `
    <div class="notification">
      <h4>Не удалось получить данные с сервера</h4>
    </div>
    `
  });

  Vue.component('search_component', {
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: String
    },
    template: `
    <div class="search">
      <input type="text" class="goods-search" :value="value" @input="$emit('input', $event.target.value)"/>
    </div>
    `
  });

  Vue.component('goods_cart', {
    data() {
      return {
        cartItems: []
      }
    },
    template: `
    <div class="fixed-area">
      <div class="basket">
        <div class="basketClose-wrapper">
          <svg @click="$emit('close')" width="24px" height="24px" viewPort="0 0 16 16" version="1.1"
               xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="16"
                  x2="16" y2="1"
                  stroke="black"
                  stroke-width="2"/>
            <line x1="1" y1="1"
                  x2="16" y2="16"
                  stroke="black"
                  stroke-width="2"/>
          </svg>
        </div>
        <div class="basketRow basketHeader">
          <div>Название товара</div>
          <div>Количество</div>
          <div>Цена за шт.</div>
          <div>Итого</div>
        </div>
        <cart_item v-for="item in cartItems" :key="item.id" :item="item" @delete="deleteBasketGood" @add="addGood"></cart_item>
        <div class="basketTotal">
          Товаров в корзине на сумму:
          $<span class="basketTotalValue">{{ getCartTotal() }}</span>
        </div>
      </div>
    </div>
    `,
    mounted() {
      service(GET_BASKET_GOODS).then((data) => {
        this.cartItems = data
      })
    },
    methods: {
      deleteBasketGood(id) {
        service(GET_BASKET_GOODS, "DELETE", {
          id
        }).then((data) => {
          this.cartItems = data
        })
      },
      addGood(id) {
        service(GET_BASKET_GOODS, 'PUT', {
          id
        }).then((data) => {
          this.cartItems = data
        })
      },
      getCartTotal() {
        return this.cartItems.reduce((acc, i) => acc + i.count * i.total, 0);
      }
    }
  });

  Vue.component('cart_item', {
    props: [
      'item'
    ],
    template: `
    <div class="basketRow">
      <div>{{item?.data?.product_name}}</div>
      <div>
        <div class="quantity_inner">        
          <button class="bt_minus" @click="$emit('delete', item.data.id)">-</button>
          <div class="quantity_value">{{item?.count}}</div>
          <button class="bt_plus" @click="$emit('add', item.data.id)">+</button>
        </div>
      </div>
      <div>{{item?.data.price}}</div>
      <div>
        $<span class="productTotalRow">{{item?.total}}</span>
      </div>
    </div>
    `
  })

  Vue.component('goods_item', {
    props: [
      'item'
    ],
    template: `
    <div class="goods-item">
      <h3>{{item.product_name}}</h3>
      <p>{{item.price}} $</p>
      <div class="add_to_cart_wrapper">
        <button class="add_to_cart" @click="addGood">Добавить</button>
      </div>
    </div>
    `,
    methods: {
      addGood() {
        service(GET_BASKET_GOODS, 'PUT', {
          id: this.item.id
        })
      }
    }
  });

  const app = new Vue({
    el: "#root",
    data: {
      items: [],
      filteredItems: [],
      search: '',
      isCartVisible: false,
      isErrorVisible: false
    },
    methods: {
      toggleCartVisibility() {
        this.isCartVisible = !this.isCartVisible;
      },
      showError() {
        this.isErrorVisible = true;
        setTimeout(() => this.isErrorVisible = false, 1000);
      },
      fetchGoods() {
        service(GET_GOODS_ITEMS).then((data) => {
          this.items = data;
          this.filteredItems = data;
        }).catch(() => this.showError());
      }
    },
    watch: {
      search: function (value) {
        this.filteredItems = this.items.filter(({ product_name }) => {
          return product_name.toLowerCase().match(
            new RegExp(`.*${value.toLowerCase()}.*`, 'gui')
          )
        })
      }
    },
    mounted() {
      setTimeout(() => this.fetchGoods(),400)
    }
  })
}

window.onload = init