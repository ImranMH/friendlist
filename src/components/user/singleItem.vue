
<template>
  <li class="edit_item">
    <div class="name">
      {{data}} <input v-show="mood" v-model="data" :type="type" :placeholder="placeholder">
      <span v-show="dm">{{data}} </span> 
    </div>
  </li>
</template>
<script>
export default {
  name: 'singleItem',
  props: {
    mood: String,
    type:{
      type:String,
      default: 'text'
    },
    placeholder:{
      type:String,
      default: 'input your data'
    },
    data:String,
    name: String,
    dm: String
  },
}
</script>
