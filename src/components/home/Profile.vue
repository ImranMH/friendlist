<template>
  <div class="container">
    <div class="row ">
      <div class="col-md-12">
        <div class="profile_top">
          <div class=" block_home_top">
            <img :src="currentUser.photoURL" alt="">
            <div class="meta">
              
              <h3>{{currentUser.displayName}}</h3>
              <h5>{{currentUser.email}}</h5>
              <small>Total Friend {{userdata.length}}</small>
            </div>
            
            
          </div>
          <div class="edit_profile_link">
            <router-link :to="'/home/'+$route.params.ProfileId+'/edit'" class="nav_link custom_button"><i class="fa fa-edit"></i> Edit Profile</router-link>
            <div class="info">
              <div class="data">{{currentUser.metadata.lastSignInTime | moment("DD MMMM YYYY, h:mm:ss a")}}</div>
              <div class="data">{{currentUser.metadata.creationTime | moment("DD MMMM YYYY")}}</div>
            </div>
          </div>
        </div> 
        
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">        
        <ul class="profile_item" v-if="bestFriend.length > 0">
           <h2 class="profile_item_title">{{bestFriend[0].type}}  </h2>
          <li v-for ="item of bestFriend" :key="item.name">
            <img :src="item.avatar" :alt="item.name">
            <h4><td><router-link :to="'/user/'+item.id" >{{item.name}}</router-link></td></h4>
            <h5>{{item.city}}</h5>
            
          </li>          
        </ul>
      </div>
      <div class="col-md-3">        
        <ul class="profile_item" v-if="collegeFriend.length > 0">
           <h2 class="profile_item_title">{{collegeFriend[0].type}} </h2>
          <li v-for ="item of collegeFriend" :key="item.name">
            <img :src="item.avatar" :alt="item.name">
            <h4>{{item.name}}</h4>
            <h5>{{item.city}}</h5>
            
          </li>          
        </ul>
      </div>
      <div class="col-md-3">        
        <ul class="profile_item" v-if="othersFriend.length > 0">
           <h2 class="profile_item_title">Others friend</h2>
          <li v-for ="item of othersFriend" :key="item.name">
            <img :src="item.avatar" :alt="item.name">
            <h4>{{item.name}}</h4>
            <h5>{{item.city}}</h5>
            
          </li>          
        </ul>
      </div>
      <div class="col-md-3">        
        <ul class="profile_item" v-if="schoolFriend.length > 0">
           <h2 class="profile_item_title">{{schoolFriend[0].type}}  friend</h2>
          <li v-for ="item of schoolFriend" :key="item.name">
            <img :src="item.avatar" :alt="item.name">
            <h4>{{item.name}}</h4>
            <h5>{{item.city}}</h5>            
          </li>          
        </ul>
      </div>
    </div>
  </div>
 
</template>

<script>
import axios from 'axios'
import {auth,rtdb} from './../../firebase'
export default {
  name: 'Todo',
  props: {
    msg: String
  },
  data:function() {
    return {
      currentUser : auth.currentUser,
      //profile: [],
      userdata: [],
      bestFriend:[],
      childhoodFriend:[],
      schoolFriend:[],
      onlineFriend:[],
      collegeFriend:[],
      othersFriend:[],
    }
  },
  created: function () {
    console.log("created")
    // `this` points to the vm instance
 
    let currentUserId= this.currentUser.uid
    const user = rtdb.ref().child('users').child(currentUserId)
    user.on('value',snap=>{
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
        }
        this.userdata.push(data)
      })
      console.log( this.userdata)
      
    })
        

  },
  mounted: function () {
   console.log('mounted')
    if (this.userdata != null) {
        this.userdata.forEach(friends => {
          //console.log(friends)
          switch (friends.type) {
            case 'Best friend':
              this.bestFriend.push(friends)
              break;
            case 'School friend':
              this.schoolFriend.push(friends)
              break;
            case 'Online friend':
              this.onlineFriend.push(friends)
              break;
            case 'College friend':
              this.collegeFriend.push(friends)
              break;
          
            default:
            this.othersFriend.push(friends)
              break;
          }
        });
      }
      console.log( this.othersFriend)
  },
  methods:{

    addUser(){

    }
  },
  components:{
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile_top{
    border: 1px solid rgb(105, 103, 103);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.block_home_top{
  display: flex;
    align-items: center;
    justify-content: space-between;
}
.meta{
  margin-left: 20px;
    text-align: left;
    text-transform: capitalize;
    color: #777;
}
.profile_item{
  background: #555;
  color:#fff;
  text-align: left;
  overflow: hidden;
}
.profile_item li{
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
.profile_item_title{
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
  text-transform: uppercase;
  border-bottom: 3px solid #9a9a90;
  padding-bottom: 5px;
}
.profile_item h4{
  font-size: 14px;
  padding-top: 7px;
  margin-bottom: 3px;
  text-transform: capitalize;
}
.profile_item h5{
  font-size: 12px;
  text-transform: capitalize;
}
.profile_item img{
  max-width: 100%;
  width: 50px;
  height: 40px;
  float: left;
  margin: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
}
</style>
