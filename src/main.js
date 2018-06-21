import Vue from 'vue'
//import VueRouter from 'vue-router'
import VueMoment from 'vue-moment'
import App from './App.vue'
import router from './route'
import firebase from 'firebase'
Vue.use(VueMoment);
let app ;

Vue.config.productionTip = false
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
      app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})


/* 
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
 */