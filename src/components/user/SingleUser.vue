<template>
<div class="singleFriend">
    
   <div class="container ">
    <div class="row ">
      <div class="col-md-3">       
        <div class="avatar">
          <img :src="singleFriend.avatar" :alt="singleFriend.avatar">
        </div>       
      </div>
      <div class="col-md-9">
         <div class="friend_upper_block">
            <div class="singleFriend_title">
              <h1>{{singleFriend.name}} </h1>
              <small><router-link :to="'/users/'+singleFriend.type" > {{singleFriend.type}}</router-link> </small> 
            </div>           
            <div class="edit_profile_link">
              <router-link :to="'/user/'+$route.params.id+'/edit'" class="nav_link custom_button"><i class="fa fa-edit"></i> Edit Profile</router-link>
            </div>
        </div> 
        <div class="row" >
          <div class="col-md-4" v-if="singleFriend.knowFrom">
            <div class="info_block">
              <h3>Known For:</h3>
              <strong>{{singleFriend.knowFrom | moment('from', true)}}</strong>
            </div>
          </div>
          <div class="col-md-4" v-if="singleFriend.friendshipBreak">
            <div class="info_block">
              <h3>Without :</h3>
              <strong>{{singleFriend.friendshipBreak | moment('from', true)}}</strong>
            </div>
          </div>
          <div class="col-md-4" v-if="singleFriend.lastTalk">
            <div class="info_block">
              <h3>Last Talked</h3>
              <strong>{{singleFriend.lastTalk | moment('from')}}</strong>
            </div>
          </div>
          <div class="col-md-4" v-if="singleFriend.friendshipBreak">
            <div class="info_block">
              <h3>Friendship Duration</h3>
               <strong>{{singleFriend.friendshipBreak | moment('from',singleFriend.knowFrom, true)}}</strong>
            </div>
          </div>
          <div class="col-md-4">
            <div class="info_block">
              <h3>first Meet</h3>
              <strong>{{singleFriend.knowFrom | moment('YYYY')}}</strong>
            </div>
          </div>
          <div class="col-md-4" v-if="singleFriend.friendshipBreak">
            <div class="info_block">
              <h3>Relation Break</h3>
              <strong>{{singleFriend.friendshipBreak | moment('MMMM YYYY')}}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="info_block">
          <h3>Date Of birth :</h3>
          <strong>{{singleFriend.dob || '---' }}</strong>
        </div>
      </div>
     
      <div class="col-md-3">
        <div class="info_block">
          <h3>Current City :</h3>
          <strong>{{singleFriend.city +', '+ singleFriend.country  || '---' }}</strong>
        </div>
      </div>
      <div class="col-md-3">
        <div class="info_block">
          <h3>Mobile :</h3>
          <strong>{{singleFriend.mobile || '---' }}</strong>
        </div>
      </div>
       <div class="col-md-3">
        <div class="info_block">
          <h3>Email :</h3>
          <strong>{{singleFriend.email || '---' }}</strong>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
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
              <li class="user_list">
                <div class="user_info">
                  <span class="user_info__title">Source:</span>
                  {{singleFriend.foreigner}}
                </div>
              </li>
              
            </ul>       
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="friend_social">
          <ul class="social_list">
            <li>
              <a :href="singleFriend.facebook" ><i class="fa fa-facebook"></i></a>
            </li>
            <li>
              <a v-bind:href ="singleFriend.twitter"><i class="fa fa-twitter"></i></a>
            </li>
            <li>
              <a :href="singleFriend.instagram"><i class="fa fa-instagram"></i></a>
            </li>
            <li>
              <a :href="singleFriend.skype"><i class="fa fa-skype"></i></a>
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
    background: #e9ecef;;
  }
  .user{
    text-align: left;
    padding: 10px;
    /* border: 1px solid; */
    text-transform: capitalize;
  }
  .user_info{
    font-size: 15px
  }
  .single_user_top_container{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 0;
    background: #e6eaef;
    overflow: hidden;
  }
  .friend_upper_block{
    text-align: left;
    background: #101010;
    /* width: 70%; */
    color: #fff;
    padding: 5px 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
  }
  .info_block{
    margin: 20px 0;
    background: #555;
    color: #fff;
    padding: 10px 5px;
  }
  .info_block h3{
    margin: 0px 0;
    font-size: 15px;
    text-transform: uppercase;
  }
   .info_block strong{
    font-size: 20px;
  }
  .singleFriend_title{
    color: #fff;
    padding: 5px 10px;
    float: left;
    width: 70%;
  }
  .singleFriend_title h1{
    text-transform: capitalize;
    margin-bottom: 0;
  }
  .singleFriend_title small{
    text-transform: capitalize;
  }
  .user_info__title{
    font-weight: bold;
    margin-right: 10px;
    /* text-transform: capitalize; */
  }
  .edit_profile_link{
    float: right;
    margin-top: -20px;
    text-align: right;
    min-width: 150px;
  }
  .avatar{
    max-width: 100%;
    max-height: 100%;
    height: 200px;
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 5px;
  }
  .avatar img{
    max-width: 100%;
    max-height:100%;
  }
  .friend_social{
    background: #555;
    margin-top: 20px;
    padding: 15px;
  }
  .social_list{

  }
  .social_list li{
    display: inline-block;
    padding: 10px;
  }
  .social_list a{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 50%;
    background: #f9eded;
        color: #191a1b;
  }
  .social_list a:hover{
     background: #fff;

  }
</style>
