<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
         <div class="user">
           <h2 class="site-heading">Add a Friend to your friendlist</h2>
          <form @submit.prevent="addUser"> 
            <input type="number" class="form-control" v-model= "inputdata.title" placeholder="Number" />
            <input type="text" class="form-control" v-model= "inputdata.name" placeholder="name" required />
            <input type="text" class="form-control" v-model= "inputdata.country" placeholder="Countey" />
            <input type="text" class="form-control" v-model= "inputdata.city" placeholder="City" />
            <input type="text" class="form-control" v-model= "inputdata.language" placeholder="Langudge" />
            <input type="text" class="form-control" v-model= "inputdata.type" placeholder="Friend type" />
            <input type="number" class="form-control" v-model= "inputdata.age" placeholder="age" />
            <input type="submit" class="btn btn-primary" value ="AddUser">
          </form>
        
        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
//import axios from 'axios'
import {auth,rtdb, db} from './../../firebase'
export default {
  name: 'NewUser',
  props: {

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

       let currentUserId= auth.currentUser.uid
      let user = this.inputdata
      //let users = rtdb.ref().child('users')
    

      let users = rtdb.ref('users').child(currentUserId)
      users.push(user)
      this.inputdata = {} 

      /* firebase firestore implementation */
      // db.collection("users").add(user)
      // .then(function(docRef) {
      //     console.log("Document written with ID: ", docRef.id);
      // })
      // .catch(function(error) {
      //     console.error("Error adding document: ", error);
      // });
      //  this.inputdata = {}
    }
  },
}

</script>