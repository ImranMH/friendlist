<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ">
          <Todo msg="Welcome to Your Vue.js App"/>
          
        </div>
        <div class="col-md-4 ">
          <Test/>
          
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Todo from './components/todo.vue'
import Test from './components/test.vue'

export default {
  name: 'app',
  components: {
    Todo,
    Test
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
