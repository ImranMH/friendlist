<template>
<div class="singleFriend">
    
   <div class="container-fluid ">
    <div class="row ">
      <div class="col-md-3">       
        <div class="avatar">
          <img :src="singleFriend.avatar" :alt="singleFriend.name">
        </div>       
      </div>
      <div class="col-md-9">
         <div class="friend_upper_block">
            <div class="singleFriend_title">
              <div class="friend_status_color" :class="status_indicator_color">{{singleFriend.status}}</div>
              <h1>{{singleFriend.name}} <span class="friend_status_indicator" :class="status_indicator_color"></span> </h1>
              <small><router-link :to="'/users/'+singleFriend.type" > {{singleFriend.type}}</router-link> </small> 
            </div>           
            <div class="edit_profile_link">
              <router-link :to="'/user/'+$route.params.id+'/edit'" class="nav_link custom_button"><i class="fa fa-cog"></i> Update User Info</router-link>
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
               <div>{{singleFriend.knowFrom | moment('YYYY')}} - {{singleFriend.friendshipBreak | moment('YYYY')}}</div>
            </div>
          </div>
          <div class="col-md-4" v-if="singleFriend.knowFrom">
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
          <strong>
            <span v-if="singleFriend.city">{{singleFriend.city }}, </span> 
            <span v-if="singleFriend.country ">{{singleFriend.country}} </span>
            <span v-else >{{'---'}}</span>
          </strong>
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
          <strong class="email">{{singleFriend.email || '---' }}</strong>
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
        <h4 class="site-heading">Social profile Link</h4>
        <div class="friend_social">
          <ul class="social_list">
            <li @mouseover="showLink" v-if= "singleFriend.facebook">
              <a :href="singleFriend.facebook" target="_blank"><i class="fa fa-facebook"></i></a>
            </li>
            <li  v-if= "singleFriend.twitter">
              <a v-bind:href ="singleFriend.twitter" target="_blank"><i class="fa fa-twitter"></i></a>
            </li>
            <li  v-if= "singleFriend.instagram">
              <a :href="singleFriend.instagram" target="_blank"><i class="fa fa-instagram"></i></a>
            </li>
            <li  v-if= "singleFriend.linkedIn" target="_blank">
              <a :href="singleFriend.linkedIn"><i class="fa fa-linkedin-in"></i></a>
            </li>
            <li  v-if= "singleFriend.skype" target="_blank">
              <a :href="singleFriend.skype"><i class="fa fa-skype"></i></a>
            </li>
            <li  v-if= "singleFriend.google_plus" target="_blank">
              <a :href="singleFriend.google_plus"><i class="fa fa-google-plus-g"></i></a>
            </li>
            <li  v-if= "singleFriend.musically" target="_blank">
              <a :href="singleFriend.musically"><i class="fa fa-music"></i></a>
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
import {auth,rtdb} from './../../firebase'
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
    })
    switch (this.singleFriend.status) {
      case 'connected':
        this.status_indicator_color = 'green'
        break;
        case 'loosely connected':
        this.status_indicator_color = 'gray'
        break;
        case 'disconnected':
        this.status_indicator_color = 'yellow'
        break;
        case 'abandon':
        this.status_indicator_color = 'red'
        break;
      default:
        this.status_indicator_color = 'gray'
        break;
    }
  },
  watch:{
 /*    '$route'(to, from){
      alert(to.params.id)
    } */
  },
  data(){
    return{
      inputdata: {},
      singleFriend: {},
      status_indicator_color: null
    }
  },
   methods:{

    showLink(){
      console.log('show Link')
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
  .singleFriend .user{
    background: #292c2f;
    color: #fff;
    padding: 20px;
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
  .friend_status_color{
   text-shadow: 0px 1px 3px #000;
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
    text-transform: capitalize;
  }
  .info_block h3{
    margin: 0px 0;
    font-size: 12px;
    text-transform: uppercase;
  }
   .info_block strong{
    font-size: 20px;
    letter-spacing: 2px;
  }
   .info_block strong.email{
    font-size: 14px;
    text-transform: lowercase;
  }
  .singleFriend_title{
    color: #fff;
    float: left;
    /* width: 70%; */
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
  .friend_status_indicator{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    color: #f8f9fa;
    display: inline-block;
    background: #fff;
    margin-bottom: 3px;
  }
  .friend_status_color{
    font-size: 12px;
    padding: 5px;
    display: inline-block;
    line-height: 10px;
  }
  .avatar{
    width: 100%;
    height: 100%;
    /* height: 200px; */
    margin-top: 20px;
    /* border: 1px solid #ccc; */
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
  .green{
    background: green;
  }
  .gray{
    background: gray;
  }
  .yellow{
    background: yellow;
  }
  .red{
    background: red;
  }
  @media(max-width:580px){
  .friend_upper_block{
    display: block;
    
  }
  .edit_profile_link{
    float: none;
    text-align: left
  }
  .singleFriend_title{
  float: none;
  }
}
</style>
