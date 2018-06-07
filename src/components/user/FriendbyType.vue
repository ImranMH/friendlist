<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
         <div class="friend_filter_list" v-if="categorizeFriends">
           <h2>{{categorizeFriends[0].type }}</h2>
           <small>Total {{categorizeFriends.length}} Friends</small>
            <ul class="list-group">
              <li v-for = "user in categorizeFriends" v-bind:key ="user.id" class=" friend_list">
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
      console.log(this.$route.params.type)
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
            console.log(this.categorizeFriends)
          }

          
        })
        // this.userdata.map(friend=>{
        //   if(!friend.friendshipBreak ){
        //     return
        //   }
        //   this.friendshipBreak.push(friend)
        // })

      }) 
      
  },
  mounted:function () {
    console.log('mounted')
    console.log(this.$route.params.type)
  },


  methods:{

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
