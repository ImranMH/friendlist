<template>
<div class="singleFriend">
    
   <div class="container ">
     <div class="row">
       <div class="col-md-12">
          <span v-show="displayMood" @click="showEdit"> Edit </span>
          <span v-show="editMood" @click="updateOption"> Update </span>
          <span v-show="editMood" @click="hideEdit" > Cancle</span>
         <ul class="edit">
           <li class="edit_item">
             <div class="name">
               Name <input v-show="editMood" v-model="singleFriend.name" type="text" placeholder="Name">
               <span v-show="displayMood"> name:{{singleFriend.name}} </span> 
             </div>
           </li>
            <li class="edit_item">
             <div class="email">
               Email <input v-show="editMood" v-model="singleFriend.email" type="text" placeholder="email">
               <span v-show="displayMood"> email:{{singleFriend.email}} </span> 
             </div>
           </li>
            <li class="edit_item">
             <div class="age">
               Age: <input v-show="editMood" v-model="singleFriend.age" type="number" placeholder="Age">
               <span v-show="displayMood">{{singleFriend.age}} </span> 
             </div>
           </li>
            <li class="edit_item">
             <div class="mobile">
                mobile:<input v-show="editMood" v-model="singleFriend.mobile" type="number" placeholder="mobile">
               <span v-show="displayMood">{{singleFriend.mobile}} </span> 
             </div>
           </li>
            <li class="edit_item">
             <div class="mobile">
              Address: <input v-show="editMood" v-model="singleFriend.address" type="text" placeholder="address">
               <span v-show="displayMood">{{singleFriend.address}} </span> 
             </div>
           </li>
            <li class="edit_item">
             <div class="currently_live">
              Current Location: <input v-show="editMood" v-model="singleFriend.currentLocation" type="text" placeholder="Current Location">
               <span v-show="displayMood">{{singleFriend.currentLocation}} </span> 
             </div>
           </li>
            <li class="edit_item">
             <div class="sex">
                meet in real life :<select v-show="editMood" v-model="singleFriend.isMeet"> 
                  <option value=true>Yes</option>
                  <option value=false>No</option>
                </select>
               <span v-show="displayMood">{{singleFriend.isMeet}} </span> 
             </div>
           </li>
           <li class="edit_item">
             <div class="sex">
                sex:<select v-show="editMood" v-model="singleFriend.sex"> 
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
               <span v-show="displayMood">{{singleFriend.sex}} </span> 
             </div>
           </li>
          <li class="edit_item">
             <div class="type">
                Friend Type :<select v-show="editMood" v-model="singleFriend.type"> 
                  <option v-for = "(type, index) of friendType" :value="type" v-bind:key ="index" >{{type}}</option>
                  
                </select>
               <span v-show="displayMood">{{singleFriend.type}} </span> 
             </div>
           </li>
           <li class="edit_item">
             <div class="status">
                status:<select v-show="editMood" v-model="singleFriend.status"> 
                  <option value="connected">connected</option>
                  <option value="disconnected">disconnected</option>
                  <option value="abnbdant">abnbdant</option>
                  <option value="loosely connected">loosely connected</option>
                </select>
               <span v-show="displayMood">{{singleFriend.status}} </span> 
             </div>
           </li>
             <li class="edit_item">
             <div class="currently_live">
              Way of Communication: <input v-show="editMood" v-model="singleFriend.communicationWay" type="text" placeholder="Facebook">
               <span v-show="displayMood">{{singleFriend.communicationWay}} </span> 
             </div>
           </li>
           <li class="edit_item">
             <div class="knowFrom">
              Know From : <input v-show="editMood" v-model="singleFriend.knowFrom" type="date" placeholder="knowFrom">
               <span v-show="displayMood">{{singleFriend.knowFrom}} </span> 
             </div>
           </li>
            <li class="edit_item">
             <div class="knowFrom">
              Friendship Break : <input v-show="editMood" v-model="singleFriend.friendshipBreak" type="date" placeholder="Friendship Break">
               <span v-show="displayMood">{{singleFriend.friendshipBreak}} </span> 
             </div>
           </li>


           <!-- <li class="edit_item" v-for="(account, index) of socialAcounts" :key="index">
             <div class="knowFrom">
              {{account}} : <input v-show="editMood" v-model="singleFriend.account" type="text" placeholder="Social Accunt">
               <span v-show="displayMood">{{singleFriend.account}} </span> 
             </div>
           </li> -->
         </ul>
       </div>
     </div>
     edit page
     {{singleFriend}}
  </div>
</div>
 
 
</template>

<script>
//import axios from 'axios'
import {auth,rtdb, db} from './../../firebase'
export default {
  name: 'EditUser',
  props: {

  },
  data(){
    return{
      inputdata: {},
      singleFriend: {},
      actionButton: 'Edit',
      displayMood: true,
      editMood: false,
      friendType: ['facebook','whatsApp','mobile','best friend'],
      socialAcounts: ['facebook', 'twitter', 'instagram', 'whatsApp','linkedIn','skype','google_plus']
    }
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

  },
  watch:{
 /*    '$route'(to, from){
      alert(to.params.id)
    } */
  },

   methods:{

    showEdit(e){
      console.log(this)
      console.log(e)
      this.editMood = true,
      this.displayMood = false
    },
    hideEdit(){
      this.editMood = false,
      this.displayMood = true
    },
    updateOption(){
      console.log('updted')
      console.log(this.singleFriend)
      let id = this.$route.params.id
      let currentUserId= auth.currentUser.uid
      //const user = rtdb.ref('users').child(currentUserId)
      const user = rtdb.ref('users').child(currentUserId).child(id)
        .set(this.singleFriend, (err=>{
          if(err){
            console.log(err)
          }else{
            console.log('successfully updated')
            this.$router.push('/user/'+id)
          }
        }))
     
      // user.on('value',snap=>{
      //   snap.forEach(doc=>{
      //     if(doc.key=== id){
      //       this.singleFriend = doc.val()
      //     }
  
      //   })
      //         console.log(snap.val())
      // })
     
    }
  },
}

</script>

<style scoped >

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
  .edit{
    background: #17a2b8;
    color: #fff;
    text-align: left;
    padding: 10px;
  }
  .edit_item{
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .edit_item input,.edit_item span{
    margin-left: 20px;
  }
</style>
