<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
         <div class="todo">
          <h1>{{ msg }}</h1>
          <form @submit.prevent="addUser"> 
            <input type="number" class="form-control" v-model= "inputdata.title" placeholder="Number" />
            <input type="text" class="form-control" v-model= "inputdata.name" placeholder="name" />
            <input type="text" class="form-control" v-model= "inputdata.country" placeholder="Countey" />
            <input type="text" class="form-control" v-model= "inputdata.city" placeholder="City" />
            <input type="text" class="form-control" v-model= "inputdata.langudge" placeholder="Langudge" />
            <input type="text" class="form-control" v-model= "inputdata.type" placeholder="Friend type" />
            <input type="number" class="form-control" v-model= "inputdata.age" placeholder="age" />
            <input type="submit" class="btn btn-primary" value ="AddUser">
          </form>
          
          <small>{{inputdata.name}} </small>
          <ul class="list-group">
            <li v-for = "(user,index) in users" v-bind:key ="index" class="list-group-item ">{{user}}</li>
            
          </ul>
          <div >
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
              <tr  v-for = "(user, index ) in userdata " v-bind:key ="index">
                <td>{{user.title}}</td>
                <td>{{user.name}}</td>
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
        <Test/>
      </div>
    </div>
  </div>
 
</template>

<script>
import axios from 'axios'
import Todalist from './todolist.vue'
import Test from './test.vue'
import {rtdb} from './../firebase'
import {auth} from './../firebase'
export default {
  name: 'Todo',
  props: {
    msg: String
  },
  created: function () {
    // `this` points to the vm instance
    const user = rtdb.ref().child('users')
    user.on('value',snap=>{
      console.log(snap.key)
      this.userdata = snap.val()
    })
   
  },
  data:()=>{
    return {
      inputdata: {},
      users:[
        'Cras justo odio',
        'Dapibus ac facilisis in',
        'Morbi leo risus'

      ],
      userdata: {},
      
      userdatas: [

      ]
    }
  },
  methods:{
    // addUser:()=>{
    //   //this.users.push(this.inputdata)
    //   console.log(this)
    // }
    addUser(){
      /* var newPostRef = postListRef.push();
      this.userdata.push(this.inputdata) */
      let user = this.inputdata
        let users = rtdb.ref().child('users')
        users.push(user)
    //     users.set({
    //    name:user.name,
    //    age:user.age,
    //    city:user.city,
    //    country:user.country,
    //  })
     console.log(users)
     

     console.log(this.userdata)
      //this.inputdata = ""
    }
  },
  components:{
    Todalist,
    Test
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
