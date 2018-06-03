<template>
  <div class="container">
    <div class="row ">
      <div class="col-md-12"> 
        <div class="single_user_top_container singleFriend_container">
          <img :src="userdata.avatar" alt="" >
        </div>
        <div class="edit_profile_link">
          <router-link :to="'/home/'+$route.params.ProfileId+'/edit'" class="nav-link"><i class="fa fa-edit"></i> Edit Profile</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
         <div class="profile">

          <h3>profile</h3>
          <h3>{{currentUser.displayName}}</h3>
          <img :src="currentUser.photoURL" alt="">
        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
import axios from 'axios'
import {auth,rtdb} from './../../firebase'
export default {
  name: 'Todo',
  props: {
    msg: String
  },
  data:function() {
    return {
      currentUser : {},
      profile: [],
      userdata: {}
    }
  },
  created: function () {
    // `this` points to the vm instance
    const user = rtdb.ref().child('users')
    user.on('value',snap=>{
      this.userdata = snap.val()
    })
   console.log(userdata)
  },
  mounted: function () {
   this.currentUser= auth.currentUser
    console.log(this.currentUser)
    if (this.currentUser != null) {
        this.currentUser.providerData.forEach(function (profile) {
           //this.profile.push(profile) 
          //  this.profile =profile
           console.log(profile)
        });
      }
  },
  methods:{

    addUser(){

    }
  },
  components:{
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
