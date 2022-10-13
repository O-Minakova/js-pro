export default Vue.component('goods_item', {
  props: [
    'item'
  ],
  template: `
    <div class="goods-item">
      <h3>{{item.product_name}}</h3>
      <p>{{item.price}} $</p>
      <div class="add_to_cart_wrapper">
        <button class="add_to_cart" v-on:click="$emit('add', item.id)">Добавить</button>
      </div>
    </div>
    `
});