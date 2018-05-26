<template>
  <div id="app">
    
    <Navbar :key="$route.fullPath" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
 import Navbar from './components/navbar.vue'
 import Footer from './components/footer.vue'
// import Test from './components/test.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
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

}
</style>
