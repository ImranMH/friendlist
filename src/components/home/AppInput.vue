<template>
  <div class="Profile_item">
   
      <div class="sub" >        
        <input type="text" @input="changeInput" :value="msg">
      </div>
       <h2>{{message}}</h2>
       <h2>{{msg}}</h2>
  </div>
 
</template>

<script>
//import axios from 'axios'

export default {
  name: 'AppItem',
  props: ['msg'],
  data:function(){
    return {
      message: ''
    }
  },


  methods:{

    changeInput(event){
      this.message = event.target.value
      this.$emit('changeValue', this.message)
    }
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
