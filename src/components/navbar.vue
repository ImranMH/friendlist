<template>
       <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
              <router-link to="/" class="navbar-brand ">Friendlist</router-link>
              <button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                  aria-expanded="false" aria-label="Toggle navigation"></button>
              <div class="collapse navbar-collapse" id="collapsibleNavId">
                  <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                      <li class="nav-item active">
                          
                          <router-link to="/" class="nav-link"><i class="fa fa-home"></i> Home</router-link>
                      </li>
                      <li class="nav-item ">
                          <router-link to="/user" class="nav-link"><i class="fas fa-user"></i> User</router-link>
                      </li>
                     
                  </ul>
                  <form class="form-inline my-2 my-lg-0">
                      <input class="form-control mr-sm-2" type="text" placeholder="Search">
                      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </form>
                  <ul class="navbar-nav mr-auto mt-2 mt-lg-0 navbar-right" >
                    <li class=" nav-item" v-show="!isLoggedIn" >
                        <router-link to="/login" class="nav-link"><i class="fas fa-sign-in-alt"></i> Login</router-link>
                    </li>
                     <li @click="logout"  v-show="isLoggedIn"   class=" nav-item">
                        <router-link  to="/login" class="nav-link"><i class="fa fa-edit"></i> Logout</router-link>
                    </li>
                     <li class=" nav-item" v-if="isLoggedIn" >
                        <router-link :to="'/home/'+currentUser.uid" class="nav-link">{{currentUser.displayName ||currentUser.email }}</router-link>
                    </li>
                  </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>

</template>

<script>
import {auth} from './../firebase'
export default {
  name: 'Navbar',
  props: {
  },
  data(){
    return{
        currentUser: auth.currentUser,
        isLoggedIn: false
    }
  },
  created: function () {
      if(auth.currentUser){
          this.isLoggedIn= true
      }else{
          this.isLoggedIn= false
      }
  },
  methods:{
    logout: function() {        
        auth.signOut().then(e=>{
        this.$router.push('/login')
    })
    }
  }
}

</script>


<style scoped>

</style>