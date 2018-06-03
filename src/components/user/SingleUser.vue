<template>
<div class="singleFriend">
    
   <div class="container ">
    <div class="row ">
      <div class="col-md-12">
        <div class="single_user_top_container singleFriend_container">
         <h1>{{singleFriend.name}} </h1>
        <small>{{singleFriend.type}} friend</small> 
        </div> 
        <div class="avater">
          <img :src="singleFriend.avatar" alt="">
        </div>
       
        <div class="edit_profile_link">
          <router-link :to="'/user/'+$route.params.id+'/edit'" class="nav-link"><i class="fa fa-edit"></i> Edit Profile</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
         <div class="user">
           <h4 class="site-heading">Personal Info</h4>
          <ul>
            <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">Age:</span>
                {{singleFriend.age}}
              </div>
            </li>
             <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">sex:</span>
                {{singleFriend.sex}}
              </div>
            </li>
             <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">mobile:</span>
                {{singleFriend.mobile}}
              </div>
            </li>
            <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">address:</span>
                {{singleFriend.address ||singleFriend.city +', '+singleFriend.country}}
              </div>
            </li>
            <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">Current Location:</span>
                {{singleFriend.currentLocation ||singleFriend.city +', '+singleFriend.country}}
              </div>
            </li>
            <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">City:</span>
                {{singleFriend.city}}
              </div>
            </li>
            <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">Country:</span>
                {{singleFriend.country}}
              </div>
            </li>
            
          </ul>
        
        </div>
      </div>
      <div class="col-md-4">
         <div class="user">
           <h2 class="site-heading">Single User</h2>
          <p>{{$route.params.id}}</p>
          <p>{{singleFriend}}</p>
          <ul>
            <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">Age:</span>
                {{singleFriend.age}}
              </div>
            </li>
            <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">Age:</span>
                {{singleFriend.age}}
              </div>
            </li>
          </ul>
        
        </div>
      </div>
      <div class="col-md-4">
         <div class="user">

          <ul>
            <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">Know from :</span>
                {{singleFriend.knowFrom | moment(" MMMM YYYY")}}
              </div>
            </li>
            <li v-if="singleFriend.knowFrom " class="user_list">
              <div class="user_info">
                <span class="user_info__title">know each Others for :</span>
                {{ singleFriend.knowFrom | moment("from")}}
              </div>
            </li>
             <li class="user_list">
              <div class="user_info">
                <span class="user_info__title">Email:</span>
                {{singleFriend.email}}
              </div>
            </li>
            <li v-if="singleFriend.friendshipBreak " class="user_list">
              <div class="user_info">
                <span class="user_info__title">Friendship Break Up :</span>
                {{singleFriend.friendshipBreak | moment("MMMM, YYYY")  }}
              </div>
            </li>
             <li v-if="singleFriend.friendshipBreak " class="user_list">
              <div class="user_info">
                <span class="user_info__title">Friendship Survive For :</span>
                {{singleFriend.friendshipBreak | moment("from", singleFriend.knowFrom)  }}
              </div>
            </li>
             <li v-if="singleFriend.friendshipBreak " class="user_list">
              <div class="user_info">
                <span class="user_info__title">Living Without contact :</span>
                {{singleFriend.friendshipBreak | moment("from")  }}
              </div>
            </li>
          </ul>
        
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="friend_social">
          <ul>
            <li>
              <a href="" ><i class="fa fa-facebook"></i></a>
            </li>
            <li>
              <a v-bind:href ="singleFriend.google_plus"><i class="fa fa-twitter"></i></a>
            </li>
            <li>
              <a href=""><i class="fa fa-instagram"></i></a>
            </li>
            <li>
              <a href=""><i class="fa fa-skype">{{singleFriend.google_plus}}</i></a>
            </li>
          </ul>
        </div>
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
 
      })
     console.log(this.singleFriend)
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
      singleFriend: {}
    }
  },
   methods:{

    addUser(){
    }
  },
}

</script>

<style scoped >
  ul{
    margin: 0;
    padding: 0;
  }
  li{
    list-style-type: none
  }
  .singleFriend_container,.user{
    background: cadetblue;
  }
  .user{
    text-align: left;
    padding: 5px;
    border: 1px solid;
    text-transform: capitalize;
  }
  .user_info{
    font-size: 15px
  }
  .single_user_top_container{
    margin: 20px 0;
  }
  .user_info__title{
    font-weight: bold;
    margin-right: 10px;
    text-transform: capitalize;
  }
  .friend_social{
    background: rgb(192, 25, 25);
    margin-top: 20px;
  }
</style>
