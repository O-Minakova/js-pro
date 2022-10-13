import './style.css';
import Notification from './components/Notification';
import Search from './components/Search';
import GoodsItem from './components/GoodsItem';
import GoodsCart from './components/GoodsCart';
import CartItem from './components/CartItem';
import { service, servicePost, serviceDelete } from './service';
import { GET_BASKET_GOODS_ITEMS, GET_GOODS_ITEMS } from "./constants";

function init() {
  const app = new Vue({
    el: "#root",
    data: {
      items: [],
      filteredItems: [],
      cartItems: [],
      cartCount: 0,
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
      },
      addGood(goodId) {
        servicePost(GET_BASKET_GOODS_ITEMS, {id: goodId}).then((result) => {
          this.cartItems = result;
          this.updateCartCount(result);
        });
      },
      deleteGood(goodId) {
        serviceDelete(GET_BASKET_GOODS_ITEMS, {id: goodId}).then((result) => {
          this.cartItems = result;
          this.updateCartCount(result);
        });
      },
      updateCartCount(cartItems) {
        this.cartCount = cartItems.reduce((acc, i) => acc + i.count, 0);
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
      service(GET_BASKET_GOODS_ITEMS).then((cartItems) => {
        this.updateCartCount(cartItems);
      })
    }
  })
}
window.onload = init