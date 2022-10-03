const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = "/catalogData.json";

function makeGETRequest(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(JSON.parse(xhr.response));
    };
    xhr.open('GET', url, true);
    xhr.send();
  })
}

const app = new Vue({
  el: "#root",
  data: {
    goods: [],
    search: "",
    isCartVisible: false
  },
  mounted() {
    setTimeout(() => makeGETRequest(`${BASE_URL}${GOODS}`)
      .then((data) => this.goods = data),
      400)
  },
  computed: {
    filteredGoods() {
      return this.goods.filter((item) => {
        const regExp = new RegExp(`.*${this.search.toLowerCase()}.*`);
        return regExp.test(item.product_name.toLowerCase());
      });
    }
  },
  methods: {
    toggleCartVisibility() {
      this.isCartVisible = !this.isCartVisible;
    }
  }
});