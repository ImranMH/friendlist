<template>
  <div class="todo">
    <h1>{{ msg }}</h1>
    <form @submit.prevent="addUser"> 
      <input type="text" class="form-control" v-model= "inputdata" placeholder="click Here" />
    </form>
    
    <small>{{inputdata}} </small>
    <ul class="list-group">
      <li v-for = "(user,index) in users" v-bind:key ="index" class="list-group-item ">{{user}}</li>
      
    </ul>
    <div v-for = "(user, index ) in userdata " v-bind:key ="index" >
       <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">age</th>
          </tr>
      </thead>
         <Todalist msg="hellow" v-bind:name="user.name" v-bind:age="user.age" v-bind:city="user.city" v-bind:no="user.title" />
      </table>
     
    </div>
      

  </div>
</template>

<script>
import axios from 'axios'
import Todalist from './todolist.vue'
export default {
  name: 'Todo',
  props: {
    msg: String
  },
  data:()=>{
    return {
      inputdata: '',
      users:[
        'Cras justo odio',
        'Dapibus ac facilisis in',
        'Morbi leo risus'

      ],
      userdata: [
        {
          title:1,
          name:'Nadia',
          age: 19,
          city: 'Egypt'
        },
          {
          title:2,
          name:'Anandi',
          age: 16,
          city: 'Indonesia'
        },
          {
          title:3,
          name:'Lika',
          age: 16,
          city: 'Russia'
        }
      ]
    }
  },
  methods:{
    // addUser:()=>{
    //   //this.users.push(this.inputdata)
    //   console.log(this)
    // }
    addUser(){
      this.users.push(this.inputdata)
      axios.post('https://us-central1-testwithvue-24462.cloudfunctions.net/fileUpload').then((res)=>{
        console.log(res)
      })
      this.inputdata = ""
    }
  },
  components:{
    Todalist
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
