<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
         <div class="user">
           <p>{{friends}}</p>
          <div >
            <router-link to="/user/new" class="nav-link"><i class="fas fa-plus"></i> addnew</router-link>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">List</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">City</th>
                  <th scope="col">Country</th>
                  <th scope="col">Status</th>
                  <th scope="col">Langudge</th>
                </tr>
            </thead>
              <!-- <Todalist msg="hellow" v-bind:name="user.name" v-bind:country="user.country" v-bind:age="user.age" v-bind:city="user.city" v-bind:status="user.type" v-bind:no="user.title" /> -->
            <tbody>
              <tr  v-for = "user of userdata " v-bind:key ="user.id">
                <td>{{user.title}}</td>
                <td><router-link :to="'user/'+user.id" > {{user.name}}</router-link></td>
                <td>{{user.age}}</td>
                <td>{{user.city}}</td>
                <td>{{user.country}}</td>
                <td>{{user.status}}</td>
                <td>{{user.langudge}}</td>
              </tr>
              </tbody>
            </table>
          
          </div>
            

        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
import axios from 'axios'
import {rtdb} from './../../firebase'
import {auth, db} from './../../firebase'
export default {
  name: 'User',
  props: {

  },
   created: function () {
     

    // realtime database implementation

    let currentUserId= auth.currentUser.uid
    const user = rtdb.ref('users').child(currentUserId)
    user.on('value',snap=>{
      //this.userdata = snap.val()
      snap.forEach(u=>{
        const data ={
          id:u.key,
          title:u.val().title,
          name:u.val().name,
          country:u.val().country,
          city:u.val().city,
          age:u.val().age,
          status:u.val().title,
          type:u.val().type,
        }
        this.userdata.push(data)
      })
    }) 
   
    // firebese firestore implementation
  db.collection('users').get().then((querySnaphot)=>{
    querySnaphot.forEach((doc)=>{
      //console.log(doc)
      const friend = {
        id:doc.id
      }
      this.friends.push(friend)
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

      userdata: [],
      
      friends: [
      ]
    }
  },
   methods:{

/*     addUser(){

        let user = this.inputdata
        let users = rtdb.ref().child('users')
        users.push(user)
    } */
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
