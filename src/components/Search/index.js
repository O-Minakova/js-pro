export default Vue.component('search_component', {
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