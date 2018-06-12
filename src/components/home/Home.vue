<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
         <div class="friend_filter_list">
           <h2 class="home_title">friends with me</h2>
           <table class="info_table table">
             <thead>
               <tr class="table_item">
                 <th>img</th>
                 <th>Friends</th>
                 <th>know for</th>
                 <th>meet</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for = "(user,index) in oldFriend" v-bind:key ="index" class=" table_item" >
                 <td class="avatar">
                   <img :src="user.avatar" alt="" class="table_avatar">
                 </td>
                 <td class="name">
                   <h3><router-link :to="'user/'+user.id" > {{user.name}}</router-link></h3>
                  <small><router-link :to="'users/'+user.type" > {{user.type}}</router-link></small>
                 </td>
                 <td class="duration">
                   {{user.knowFrom | moment('from',"now",true)}}
                 </td>
                 <td class="known">
                   {{user.knowFrom | moment("MMMM YYYY")}}
                 </td>
               </tr>
             </tbody>
           </table>
            <!-- <ul class="list-group">
              <li class=" friend_list">
                <h5 class="list_item"> user </h5>
                <div class="friend_list_title list_item">
                  <h3>Friend</h3>
                
                </div>
                <p class="list_item">Missing Since</p>
                <p class="list_item">Lost From</p>
              </li>
              <li v-for = "(user,index) in oldFriend" v-bind:key ="index" class=" friend_list">
                <img :src="user.avatar" alt="" class="list_item">
                <div class="friend_list_title list_item">
                  <h3>{{user.name  }}</h3>
                  <small>{{user.type  }}</small>
                </div>
                <p class="list_item">{{user.knowFrom | moment('from',"now",true)}}</p>
                <p class="list_item">{{user.knowFrom | moment("MMMM YYYY")}}</p>
              </li>
              
            </ul> -->
  
        </div>
      </div>
      <div class="col-md-6">
         <div class="friend_filter_list">
           <h2 class="home_title">Lost Friend</h2>
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
          //this.friendshipBreak.sort(friend.age)
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
 filters: {
  listFilter: function (value) {
    if (!value) return ''
      this.value.filter((item)=>{

      })
    }
  },
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
  /* margin: 40px 0 0; */
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
  color: #28a745;
}
a:hover{
  text-decoration: none;
  color: #5d8bbd;;
}
.friend_filter_list{
  border: 1px solid #ccc;
  background: #555;
  color:#fff;
}
.list-group{
  padding: 3px 0px 0px 3px;
}
.friend_list{
  display: flex;
  align-items: left;
  justify-content: flex-start;
  
  text-align: left;
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
}
.friend_list img{
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
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
.list_item{
  border: 1px solid #ccc;
}
.home_title{
  text-transform: capitalize;
  font-size: 22px;
  padding: 10px 0 5px;
  text-shadow: 1px 1px 2px #000;
}
.info_table{
  text-align: left;
  text-transform: capitalize;
}
.table_item{
  border:1px solid #ccc;
  padding: 5px;
}
.table_item .avatar{
  width: 50px;
  height: 50px;
}
.table_item .name h3{
  font-size: 16px;
  margin-bottom: 0;
  line-height: 14px;
}
.table_item .duration{
  
}
.table_item .from{

}
.table_item th{
   padding: 5px;
  border:1px solid #ccc;
}
.table_avatar{
  max-width: 100%;
}
.info_table td {
  padding: 5px;
  border:1px solid #ccc;
}
</style>
