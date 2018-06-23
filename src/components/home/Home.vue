<template>
  <div class="container-fluid">
    <div class="row" v-if="orderByType.length> 0">
      <div class="col-sm-12">
        <div class="user">
          <router-link to="/user/new" class="nav_link custom_button"><i class="fas fa-plus"></i> addnew</router-link>
          <table>
            <thead>
              <tr>
                <th scope="col">image</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th class="small_hide" scope="col">Age</th>
                <th class="small_hide" scope="col">City</th>
                <th class="country_hide" scope="col">Country</th>
                <th class="comunicationhide" scope="col">Contact</th>
                <th scope="col">Mobile</th>
                <th class="hide_580" scope="col">Email</th>
                <th class="knowhide" scope="col">Know For</th>
              </tr>
            </thead>
              <!-- <Todalist msg="hellow" v-bind:name="user.name" v-bind:country="user.country" v-bind:age="user.age" v-bind:city="user.city" v-bind:status="user.type" v-bind:no="user.title" /> -->
            <tbody>
              <tr  v-for = "user of orderByType " v-bind:key ="user.id">
                <td><router-link :to="'user/'+user.id" > <img class="list_image" :src="user.avatar" alt=""></router-link></td>
                <td><router-link :to="'user/'+user.id" > {{user.name}}</router-link></td>
                <td><router-link :to="'/users/'+user.type" > {{user.type}}</router-link></td>
                <td  class="small_hide"><span v-if="user.dob">{{user.dob | moment("from","now", true)}}</span><span v-else >{{user.age || '---'}}</span></td>
                <td class="small_hide">{{user.city|| "---"}}</td>
                <td class="country_hide">{{user.country || "---"}}</td>
                <td class="comunicationhide">{{user.communicationWay || "---"}}</td>
                <td ><a v-if="user.mobile" :href=" `tel:${user.mobile}`">{{user.mobile}}</a><span v-else>{{'---'}}</span></td>
                <td class="email hide_580"> <a v-if="user.email" :href=" `mailto:${user.email}`">{{user.email }}</a><span v-else>{{"---"}}</span></td>
                <td class="knowhide"><span  v-if="user.knowFrom"> {{user.knowFrom | moment("from","now", true)}}</span><span v-else>{{'---'}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
    <div v-if="inputdata" class="row">
      <div v-if="orderFriendsByKnownFrom.length> 5" class="col-md-6">
        <div class="friend_filter_list">
           <h2 class="home_title">friends still with me</h2>
           <table class="info_table table">
             <thead>
               <tr class="table_item">
                 <th>img</th>
                 <th>Friends</th>
                 <th>know for</th>
                 <th>First meet</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for = "(user,index) in orderFriendsByKnownFrom" v-bind:key ="index" class=" table_item" >
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
      <div v-if="friendshipBreak.length> 5" class="col-md-6">
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
    <div v-else class="row">
      <div class="col-md-12">
        <div class="text-center no_user">
          <p>You Haven't add any friend yet</p>          
          <router-link to="/user/new" class="nav_link custom_button"><i class="fas fa-plus"></i> addnew</router-link>
           <small>
            For Update friend go to friend home page and then use Update profile 
          </small>
        </div>
      </div>      
    </div>
  </div> 
</template>

<script>
//import axios from 'axios'
import {auth,rtdb} from './../../firebase'
import _ from 'lodash'
export default {
  name: 'Home',
  props: {
    // msg: String
  },
  data:function(){
    return {
      currentUser : auth.currentUser,
      inputdata: [],
      userdata: [],
      newFriend: [],
      oldFriend: [],
      friendshipBreak:[],
      activeFriend:[],
    }
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
  },


//  filters: {
//   listFilter: function (value) {
//     if (!value) return ''
//       this.value.filter((item)=>{

//       })
//     }
//   },
  computed:{
    orderFriendsByKnownFrom:function () {
      return _.orderBy(this.oldFriend,'knowFrom','desc')
    },
    orderByType:function () {
      return _.orderBy(this.userdata,'type')
    }
  },
  methods:{

    addUser(){
      /* var newPostRef = postListRef.push();
      this.userdata.push(this.inputdata) */
      let user = this.inputdata
        let users = rtdb.ref().child('users')
        users.push(user)
    }
  },
  components:{
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin:  0px;
  }
  .friend_filter_list{
    border: 1px solid #555;
    background: #212529;
    color:#fff;
    margin-top: 50px;
    border-bottom: none;

  }
  .user{
    margin-top: 0px;
  }
  .list-group{
    padding: 3px 0px 0px 3px;
  }
  .friend_list{
    display: flex;
    align-items: left;
    justify-content: flex-start;
    
    text-align: left;
    border-bottom: 1px solid #555;
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
    border:1px solid #555;
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
  /* .table_item .duration{
    
  }
  .table_item .from{

  } */

  .table_avatar{
    max-width: 100%;
  }

  /* from user */
  .list_image{
    width: 40px;
    height: 29px;
    margin-top: -0.50rem;
    margin-bottom: -0.50rem;
    max-width: 100%;

  }
  .user table{
    text-align: left;
    text-transform: capitalize;
    margin: 0 auto;
  }
  tbody,thead{
    color: #fff;
  }
  /* tr{
    border: 1px solid #555;
  }
  td,th{
    padding-right: 4px;
  } */
  .email{
    font-size: 12px;
    text-transform: lowercase;
  }
  @media(max-width:900px){
    .comunicationhide{
      display: none;
    }
    .knowhide{
      display: none;
    }
  }
  @media(max-width:730px){
    .country_hide{
      display: none;
    }
    tr td, tr a{
      font-size: 12px;
      line-height: 18px;
    }
    tr td {
      padding: 2px;
    }

  }
  @media(max-width:580px){
    .small_hide{
      display: none;
    }
    .edit_item input, select, .edit_item span{
      margin-left: 10px;
      padding: 2px 5px;
      width: 250px;
    }

  }
  @media(min-width:1100px){
    .email{
      font-size: 16px;
    }

  }
</style>
