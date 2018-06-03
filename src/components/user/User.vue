<template>
  <div class="container">
    <div class="row">
      {{cu}}
      <div class="col-md-12">
         <div class="user">
           
          <div >
            <router-link to="/user/new" class="nav_link"><i class="fas fa-plus"></i> addnew</router-link>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Age</th>
                  <th scope="col">City</th>
                  <th scope="col">Country</th>
                  <th scope="col">Status</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Know For</th>
                </tr>
            </thead>
              <!-- <Todalist msg="hellow" v-bind:name="user.name" v-bind:country="user.country" v-bind:age="user.age" v-bind:city="user.city" v-bind:status="user.type" v-bind:no="user.title" /> -->
            <tbody>
              <tr  v-for = "user of userdata " v-bind:key ="user.id">
                <td><router-link :to="'user/'+user.id" > <img class="list_image" :src="user.avatar" alt=""></router-link></td>
                <td><router-link :to="'user/'+user.id" > {{user.name}}</router-link></td>
                <td>{{user.type}}</td>
                <td>{{user.age}}</td>
                <td>{{user.city}}</td>
                <td>{{user.country}}</td>
                <td>{{user.communicationWay}}</td>
                <td>{{user.mobile}}</td>
                <td v-if="user.knowFrom">{{user.knowFrom | moment("from", true)}}</td>
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
    console.log('created')
    // realtime database implementation

    
    let currentUserId= auth.currentUser.uid
    const user = rtdb.ref('users').child(currentUserId)
    user.on('value',snap=>{
      //this.userdata = snap.val()
      snap.forEach(u=>{
        const data ={
          id:u.key,
          avatar:u.val().avatar,
          name:u.val().name,
          country:u.val().country,
          city:u.val().city,
          age:u.val().age,
          language:u.val().language,
          type:u.val().type,
          mobile:u.val().mobile,
          knowFrom:u.val().knowFrom,
          communicationWay:u.val().communicationWay,
        }
        this.userdata.push(data)
      })
    }) 
   
   console.log(this.userdata)
    // firebese firestore implementation
/*   db.collection('users').get().then((querySnaphot)=>{
    querySnaphot.forEach((doc)=>{
      //console.log(doc)
      const friend = {
        id:doc.id
      }
      this.friends.push(friend)
    })
  }) */
  },
   mounted: function () {
      console.log('mounted')
      const cu = auth.currentUser;
      console.log(cu)
    },
  watch:{
 /*    '$route'(to, from){
      alert(to.params.id)
    } */
  },
  data(){
    return{
      inputdata: {},
      cu : null,
      userdata: []
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
.list_image{
  width: 40px;
  height: 40px;
  margin-top: -0.50rem;
  margin-bottom: -0.50rem;

}
.user table{
  text-align: left;
  text-transform: capitalize;
}
.nav_link{
    padding: .5rem 1rem;
    border: 1px solid #ccc;
    display: inline-block;
    margin-bottom: 20px;
    border-radius: 10px;
    color: #fff;
    background: #004085;
    margin-top: 40px;
}
.nav_link:hover{
  background: #2f5a88;;
  text-decoration: none;
}
</style>
