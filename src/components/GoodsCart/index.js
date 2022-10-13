import { service } from "../../service";
import { GET_BASKET_GOODS_ITEMS } from "../../constants";
import cartItem from "../CartItem";

export default Vue.component('goods_cart', {
  data() {
    return {
      cartItems: []
    }
  },
  props: ['items'],
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
      <cart_item v-for="item in cartItems" :key="item.id" :item="item" @del-item="delCartItem" @add-item="addCartItem"></cart_item>
      <div class="basketTotal">
        Товаров в корзине на сумму:
        $<span class="basketTotalValue">{{ getCartTotal() }}</span>
      </div>
    </div>
    </div>
  `,
  mounted() {
    this.getCartItems()
  },
  methods: {
    getCartItems() {
      service(GET_BASKET_GOODS_ITEMS).then((cartItems) => {
        this.cartItems = cartItems;
      })
    },
    delCartItem(id) {
      this.$emit('del-cart-item', id)
    },
    addCartItem(id) {
      this.$emit('add-cart-item', id)
    },
    getCartTotal() {
      return this.cartItems.reduce((acc, i) => acc + i.count * i.total, 0);
    }
  },
  watch: {
    items: function (value) {
      this.cartItems = value;
    }
  },
})