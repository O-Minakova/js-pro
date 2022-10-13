export default Vue.component('cart_item', {
  props: [
    'item'
  ],
  template: `
    <div class="basketRow">
      <div>{{item?.data?.product_name}}</div>
      <div>
        <div class="quantity_inner">        
          <button class="bt_minus" @click="$emit('del-item', item.data.id)">-</button>
          <div class="quantity_value">{{item?.count}}</div>
          <button class="bt_plus" @click="$emit('add-item', item.data.id)">+</button>
        </div>
      </div>
      <div>{{item?.data.price}}</div>
      <div>
        $<span class="productTotalRow">{{item?.total}}</span>
      </div>
    </div>
    `
})