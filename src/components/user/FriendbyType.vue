<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="friend_filter_list" v-if="categorizeFriends">
          <h2 class="home_title">{{categorizeFriends[0].type }}</h2>
          <small>Total {{categorizeFriends.length}} Friends</small>
            <table class="info_table table">
             <thead>
               <tr class="table_item">
                 <th>photo</th>
                 <th>Friends</th>
                 <th class="hide_900">know for</th>
                 <th class="hide_580">meet</th>
                 <th class="hide_770">email</th>
                 <th>city</th>
                 <th>talk In</th>
                 <th>mobile</th>
                 
               </tr>
             </thead>
             <tbody>
               <tr v-for = "user in categorizeFriends" v-bind:key ="user.id" class=" table_item" >
                 <td class="avatar">
                   <img :src="user.avatar" alt="" class="table_avatar">
                 </td>
                 <td class="name">
                   <h3><router-link :to="'/user/'+user.id" > {{user.name}}</router-link></h3>
                 
                 </td>
                 <td class="duration hide_900">
                   <span  v-if="user.knowFrom"> {{user.knowFrom | moment("from","now", true)}}</span><span v-else>{{'---'}}</span>
                 </td>
                 <td class="known hide_580">
                   <span  v-if="user.knowFrom"> {{user.knowFrom | moment("MMMM YYYY")}}</span><span v-else>{{'---'}}</span>
                 </td>
                 <td class="hide_770"><a :href=" `mailto:${user.email}`">{{user.email}}</a></td>
                 <td>{{user.city}}</td>
                 <td>{{user.communicationWay}}</td>
                 <td><a :href=" `tel:${user.mobile}`">{{user.mobile}}</a></td>
               </tr>
             </tbody>
           </table>
           <!--  <ul class="list-group">
              <li class=" friend_list">
                <div>image</div>
                <div class="friend_list_title">
                  <h3>naame</h3>
                </div>
                <p class="know_from">know From</p>
                <p class="know_from">first Meet</p>
                
                <div>Communaication</div>
                <div>Mobile</div>
                <div>Email</div>
                <div>Status</div>
              </li>
              <li v-for = "user in categorizeFriends" v-bind:key ="user.id" class=" friend_list">
                <img :src="user.avatar" alt="">
                <div class="friend_list_title">
                  <h3>{{user.name  }}</h3>
                  <small v-if="user.subType ">{{user.subType  }}</small>
                  <small v-else>{{user.city  }}</small>
                </div>
                <p class="know_from">{{user.knowFrom | moment('from',"now",true)}}</p>
                <p class="know_from_2">{{user.knowFrom | moment("MMMM YYYY")}}</p>
                <div>{{user.communicationWay}}</div>
                <div>{{user.mobile}}</div>
                <div>{{user.email}}</div>
                <div>{{user.status}}</div>
              </li>
              
            </ul> -->
  
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
      userdata: [],
      categorizeFriends: [],
 
    }
  },
  computed: {
 
 
  },
  created: function () {
    const type = this.$route.params.type
    const user = rtdb.ref('users').child(this.currentUser.uid).orderByChild('age')
      user.on('value',snap=>{
      
      this.inputdata = snap.val()
      for(let item in this.inputdata){
        let items = this.inputdata[item];
        items.id = item
        this.userdata.push(items)
      }
      this.userdata.map(friend=>{
        if(friend.type === type ){
          return this.categorizeFriends.push(friend)
        }

        
      })
    }) 
      
  },

  methods:{

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
  a {
    color: #28a745;
  }
  .home_title{
    text-transform: capitalize;
    font-size: 22px;
    padding: 10px 0 5px;
    text-shadow: 1px 1px 2px #000;
  }
  .friend_filter_list{
      background: #292c2f;
      margin-top: 30px;
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
    border:1px solid #555;
    text-align: center;
  }
  .table_avatar{
    max-width: 100%;
  }
  .info_table td {
    padding: 2px;
    border:1px solid #555;
    vertical-align: middle;
    text-align: center;
  }
</style>
