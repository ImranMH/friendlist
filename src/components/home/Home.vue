<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
         <div class="friend_filter_list">
           <h2>friends with me</h2>
            <ul class="list-group">
              <li v-for = "(user,index) in oldFriend" v-bind:key ="index" class=" friend_list">
                <img :src="user.avatar" alt="">
                <div class="friend_list_title">
                  <h3>{{user.name  }}</h3>
                <small>{{user.type  }}</small>
                </div>
                <p class="know_from">{{user.knowFrom | moment('from',"now",true)}}</p>
                <p class="know_from_2">{{user.knowFrom | moment("MMMM YYYY")}}</p>
              </li>
              
            </ul>
  
        </div>
      </div>
            <div class="col-md-6">
         <div class="friend_filter_list">
           <h2>Lost Friend</h2>
          <ul class="list-group">
            <li v-for = "(user,index) in friendshipBreak" v-bind:key ="index" class=" friend_list">
              <img :src="user.avatar" alt="">
              <div class="friend_list_title">
               
               
                <h3> <router-link :to="'user/'+user.id" > {{user.name}}</router-link></h3>
                <small> <router-link :to="'users/'+user.type" > {{user.type}}</router-link></small>
              </div>
              <p class="know_from">friend for {{user.knowFrom | moment('from',user.friendshipBreak,true)}}</p>
              <p class="know_from_2">lost from {{user.friendshipBreak | moment("MMMM YYYY")}}</p>
            </li>
            
          </ul>
  
        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
//import axios from 'axios'
import {auth,rtdb} from './../../firebase'
export default {
  name: 'Home',
  props: {
    msg: String
  },
  data:function(){
    return {
      currentUser : auth.currentUser,
      inputdata: [],
      users:[
        'Cras justo odio',
        'Dapibus ac facilisis in',
        'Morbi leo risus'
      ],
      userdata: [],
      newFriend: [],
      oldFriend: [],
      friendshipBreak:[],
      activeFriend:[],
    }
  },
  computed: {
 
 
  },
  created: function () {
      const user = rtdb.ref('users').child(this.currentUser.uid).orderByChild('age')
       user.on('value',snap=>{
        
        this.inputdata = snap.val()
        for(let item in this.inputdata){
          let items = this.inputdata[item];
          items.id = item
          this.userdata.push(items)
        }
        this.userdata.map(friend=>{
          if(!friend.knowFrom ){
            return
          }
           if(friend.friendshipBreak ){
            return
          }
          this.oldFriend.push(friend)
        })
        this.userdata.map(friend=>{
          if(!friend.friendshipBreak ){
            return
          }
          this.friendshipBreak.push(friend)
        })

      }) 
      console.log(this.oldFriend)
  },
  mounted:function () {
    console.log('mounted')
  },
  //  beforeUpdate() {
  //   console.log('before updated') // Logs the counter value every second, before the DOM updates.
  //   console.log(this.compute) // Logs the counter value every second, before the DOM updates.
  // },
  // updated:function () {
  //   console.log('updated')
  // },
//  filters: {
//   capitalize: function (value) {
//     if (!value) return ''
//       value = value.toString()
//       return value.charAt(0).toUpperCase() + value.slice(1)
//     }
//   },
  methods:{

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
  margin:  0px;
}
a {
  color: #42b983;
}
.friend_filter_list{
  border: 1 solid #ccc;
  background: #9cbbb0;
}
.friend_list{
  display: flex;
  align-items: left;
  justify-content: flex-start;
  padding: 0;
  text-align: left;
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
}
.friend_list img{
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  padding: 2px;
  text-transform: capitalize;
}
.friend_list_title{
    width: 30%;
    margin: 0 10px;
}
.friend_list_title h3{
  margin: 0;
  font-size: 14px;
 line-height: 16px;
 text-transform: capitalize;

}
.friend_list p{
  margin: 0;
  padding: 0;
}
small{
  line-height: 15px;
}
p.know_from_2{
  margin: 0 10px;
  font-size: 15px;
}
</style>
