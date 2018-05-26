<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
         <div class="user">
           <h2 class="site-heading">Single User</h2>
          <p>{{$route.params.id}}</p>
          <p>{{singleFriend}}</p>
          <ul>
            <li>
              <p>{{singleFriend.name}}</p>
            </li>
            <li>
              <p>{{singleFriend.city +' '+singleFriend.country}}</p>
            </li>
            <li>
              <p>{{singleFriend.age}}</p>
            </li>
          </ul>
        
        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
//import axios from 'axios'
import {auth,rtdb, db} from './../../firebase'
export default {
  name: 'SingleUser',
  props: {
    singleFriend: null
  },
  created: function () {
    let id = this.$route.params.id
    let currentUserId= auth.currentUser.uid
    const user = rtdb.ref('users').child(currentUserId)
    user.on('value',snap=>{
      snap.forEach(doc=>{
        if(doc.key=== id){
          this.singleFriend = doc.val()
        }
        console.log(this.singleFriend)
      })
    })
  },
  watch:{
 /*    '$route'(to, from){
      alert(to.params.id)
    } */
  },
  data(){
    return{
      inputdata: {},
    }
  },
   methods:{

    addUser(){
      /* real time database implementation */

/*       let currentUserId= auth.currentUser.uid
      let user = this.inputdata
      let users = rtdb.ref().child('users')
      let users = db.ref('users').child(currentUserId)

      let users = rtdb.ref('users').child(currentUserId)
      users.push(user) */

 
    }
  },
}

</script>