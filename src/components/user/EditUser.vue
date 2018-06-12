<template>
<div class="singleFriend">

  <div class="container ">
    <div class="row" v-if="message">
      <div class="col-md-12">
        <div class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
        </div>
      </div>        
    </div>
    <div class="row">
      <div class="col-md-5">
        <div class="text-center friend_avater_change">
          <input style="display:none" ref="selectImage" class ="form-control"  type="file" v-on:change ="onFileSelected" >
          <!-- <button @click="$refs.selectImage.click()"> change Image </button> -->
          
          <img style="width:100%" @click="$refs.selectImage.click()" :src="singleFriend.avatar" class="avatar img-circle" alt="avatar">
          <h6>Change Profile photo</h6>
          <input class= "btn btn-primary" v-if="showChangePhoto" @click="updateAvater" value="Update Photo" >
          <input class= "btn btn-danger" v-if="showChangePhoto" @click="showChangePhoto= false" value="Cancel" >
          
          <!-- <input type="file" class="form-control"> -->
        </div>
          <div class="edit social_edit">
            <h2 class="friend_edit_title" v-show="displayMood">social Account List</h2>
            <h2 class="friend_edit_title" v-show="editMood">Add social Account </h2>
            <ul>
                <li class="edit_item" v-for="(account, index) of socialAcounts" :key="index">
                <div class="knowFrom">
                  {{account}} : <input v-show="editMood" v-model="singleFriend[account]" type="text" placeholder="Social Accunt">
                  <span v-show="displayMood">{{singleFriend[account] || 'Not specified yet'}} </span> 
                </div>
              </li>
            </ul>
          </div>
      </div>
      <div class="col-md-7">
          <div class="btn_list">
          <span class="btn btn-primary" v-show="displayMood" @click="showEdit"> <i class="fa fa-edit"></i> Edit </span>
          <span class="btn btn-warning" v-show="editMood" @click="updateOption"> Update </span>
          <span  class="btn btn-info" v-show="displayMood" @click="hideEdit"> <router-link :to="'/user/'+$route.params.id" >back</router-link></span>
          <span class="btn btn-info" v-show="editMood" @click="hideEdit" > Cancel</span>
          <span class="btn btn-danger"  @click="deleteFriend(singleFriend.id)" > Delete</span>
        </div>
        
          <div class="edit">
            <h2 class="friend_edit_title" v-show="displayMood">friends details</h2>         
            <h2 class="friend_edit_title" v-show="editMood"> edit friends details</h2>         
            <ul>
              <li class="edit_item">
                <div class="name">
                  Name <input v-show="editMood" v-model="singleFriend.name" type="text" placeholder="Name">
                  <span v-show="displayMood">{{singleFriend.name}} </span> 
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
                  <span v-show="displayMood">{{singleFriend.currentLocation || 'Not specified yet'}} </span> 
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
                    Friends From :<select v-show="editMood" v-model="singleFriend.foreigner"> 
                      <option value=native>Native</option>
                      <option value=foreigner>Foreigner</option>
                    </select>
                  <span v-show="displayMood">{{singleFriend.foreigner}} </span> 
                </div>
              </li>
                <li class="edit_item">
                <div class="mobile">
                  Date Of birth: <input v-show="editMood" v-model="singleFriend.dob" type="date" placeholder="date of birth">
                  <span v-show="displayMood">{{singleFriend.dob}} </span> 
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
              <li class="edit_item" v-if="singleFriend.type === 'family Member' || singleFriend.type === 'relatives'">
                <div class="currently_live">
                  type of Relatives <input v-show="editMood" v-model="singleFriend.subType" type="text" placeholder="Brother">
                  <span v-show="displayMood">{{singleFriend.subType}} </span> 
                </div>
              </li>
              <li class="edit_item">
                <div class="status">
                    status:<select v-show="editMood" v-model="singleFriend.status"> 
                      <option value="connected">connected</option>
                      <option value="disconnected">disconnected</option>
                      <option value="abandon">abandon</option>
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
              <li class="edit_item">
                <div class="knowFrom">
                  Last Communication : <input v-show="editMood" v-model="singleFriend.lastTalk" type="date" placeholder="last Talk">
                  <span v-show="displayMood">{{singleFriend.lastTalk}} </span> 
                </div>
              </li>          
            </ul>
          </div> 
          
      </div>
    </div>
    <div class="row">
      
      
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="btn_list">
          <span class="btn btn-primary" v-show="displayMood" @click="showEdit"> <i class="fa fa-edit"></i> Edit </span>
          <span class="btn btn-warning" v-show="editMood" @click="updateOption"> Update </span>
          <span class="btn btn-info" v-show="displayMood" @click="hideEdit"> <router-link  :to="'/user/'+$route.params.id" >back</router-link></span>
          <span class="btn btn-info" v-show="editMood" @click="hideEdit" > Cancel</span>
          <span class="btn btn-danger"  @click="deleteFriend(singleFriend.id)" > Delete</span>
        </div>
      </div>
    </div>
      
  </div>
</div>
 
 
</template>

<script>
//import axios from 'axios'
import {auth,rtdb,storageRef, db} from './../../firebase'
export default {
  name: 'EditUser',
  props: {

  },
  data(){
    return{
      inputdata: {},
      message: null,
      singleFriend: {},
      actionButton: 'Edit',
      displayMood: true,
      editMood: false,
      currentUser : auth.currentUser,
      showChangePhoto : false,
      friendType: ['Best friend','Childhood friend','Close friend','Love relation','School friend','College friend',
        'university friend','family Member','relatives','Educational friend','Business partner','office colleague','Just friend','Helpful friend','Time pass friend',
        'Corporate friend','Community friend','Friends friend','Facebook friend','WhatsApp friend','Speaky app friend',
        'Local friend','Mobile friend','Online friend'
      ],
      socialAcounts: ['facebook', 'twitter', 'instagram', 'whatsApp','linkedIn','skype','google_plus','musically']
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
          this.singleFriend.id = doc.key
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
      this.editMood = true,
      this.displayMood = false
      this.displayDisplay = false
    },
    hideEdit(){
      this.editMood = false,
      this.displayMood = true
    },
    deleteFriend(id){
    var yes=  confirm('Do you really want to delete this Friend ?')
      if (yes){
        let currentUserId= auth.currentUser.uid
        rtdb.ref('users').child(currentUserId).child(id).remove()
        this.$router.push('/')
      }
    },
    updateOption(){
      let id = this.$route.params.id
      let currentUserId= auth.currentUser.uid
      //const user = rtdb.ref('users').child(currentUserId)
      const user = rtdb.ref('users').child(currentUserId).child(id)
        .set(this.singleFriend, (err=>{
          if(err){
            console.log(err)
          }else{
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
     
    },

    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.showChangePhoto = true
    },
    updateAvater(){
            
      const fileName = this.selectedFile.name
      let currentUserId= auth.currentUser.uid
      const userprofileRef = storageRef.ref('friends/'+currentUserId+'/'+ fileName)
      // Upload the file and metadata
      const uploadTask = userprofileRef.put(this.selectedFile);

      uploadTask.on('state_changed', (snapshot)=>{
 
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, (error) =>{
        console.log(error)
      }, () =>{
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
          console.log('File available at', downloadURL);
        let friendId = this.$route.params.id
        //const user = rtdb.ref('users').child(currentUserId)
        const user = rtdb.ref('users').child(currentUserId).child(friendId)
          .update({"avatar": downloadURL})
        });
      });
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
  input['text'],
  select {
    margin-left: 20px;
    padding: 0 5px;
    outline: none;
  }
  .user_info__title{
    font-weight: bold;
    margin-right: 10px;
    text-transform: capitalize;
  }
  .social_edit{
    margin-top: 70px;
    text-align: left;
  }
  .friend_social{
    background: rgb(192, 25, 25);
    margin-top: 20px;
  }
  .edit{
    background: #e9ecec;;
    color: #555;
    text-align: left;
    padding: 10px;
  }
  .edit_item{
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .edit_item input, select, .edit_item span{
    margin-left: 20px;
    padding: 2px 5px;
    width: 300px;
  }
  .btn_list{
    margin-bottom:10px;
  }
  .btn_list span{
    margin-bottom: 40px;
    margin-top: 20px;
    margin-right: 10px;
  }
  .btn_list a{
    color: #fff;
  }
  .btn_list a:hover{
    color: #fff;
    text-decoration: none
  }
  .friend_avater_change{
    border: 1px solid #ccc
  }
  .friend_avater_change{
    font-size: 12px;
    text-transform: capitalize;
    margin-top: 20px;
    background: rgba(0,0,0,.5);
    color: #fff;
  }
  .friend_edit_title{
    text-transform: capitalize;
    font-size: 20px;
    margin-bottom: 15px;
  }
  .edit input , select{
    text-transform: capitalize;
  }
  .friend_avater_change input{
    margin-bottom: 20px;
  }
</style>
