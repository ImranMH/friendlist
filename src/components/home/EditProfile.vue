<template>
  <div class="editProfile">
    <div class="container-fluid ">
      <div class="row">
        <div class="col-md-12">
          <div class="alert alert-info alert-dismissable">
            <a class="panel-close close" data-dismiss="alert">×</a> 
            <i class="fa fa-coffee"></i>
              <strong>{{response.msg}}</strong>
          </div>
        </div>        
      </div>
      <h2>Edit profile</h2>
      <div class="row">
        <div class="col-md-3">
          <div class="text-center profile_photo_con">
            <input style="display:none" ref="selectImage" class ="form-control"  type="file" v-on:change ="onFileSelected" >
            <!-- <button @click="$refs.selectImage.click()"> change Image </button> -->
            <div class="profile_photo">
              <img  @click="$refs.selectImage.click()" :src="currentUser.photoURL" class="avatar img-circle" alt="avatar">
            </div>            
            <h6>Change Profile photo</h6>
            <input class= "btn btn-primary" v-if="showChangePhoto" @click="changePhoto" value="Change Photo" >           
            <!-- <input type="file" class="form-control"> -->
          </div>
        </div>
        <div class="col-md-9 personal-info">            
          <h3>Personal info</h3>          
          <form @submit.prevent="updateProfile" role="form">
            <div class="form-group row">
              <label for="fname" class="col-sm-2 col-form-label">First Name</label>
              <div class="col-sm-10">
                <input type="text" v-model="user.firstName"  class="form-control" id="fname" value="email@example.com">
              </div>
            </div>
            <div class="form-group row">
              <label for="lname" class="col-sm-2 col-form-label">Last Name</label>
              <div class="col-sm-10">
                <input type="text" v-model="user.lastName"  class="form-control" id="lname" value="email@example.com">
              </div>
            </div>
            <div class="form-group row">
              <label for="email" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" readonly  id="email" :value="currentUser.email">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary" value="Save Changes">Save Changes</button>
                <router-link :to="'/home/'+currentUser.uid" class="btn btn-secondary">Cancel</router-link>                
              </div>               
            </div>
          </form>      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import {auth, storageRef} from './../../firebase'
export default {
  name: 'EditProfile',
  props: {
    msg: String,
  },
  data: function () {
    return {
      currentUser : auth.currentUser,
      userEdit: {},
      user:{},
      response: {},
      selectedFile : null,
      editMood: false,
      displayMood:true,
      showChangePhoto : false
    }
  },

  methods:{
    /* update user profile */
      updateProfile: function () {
       this.currentUser.updateProfile({
         
         phoneNumber: this.user.mobile,
         displayName: this.user.firstName +' '+ this.user.lastName,
       }).then(function() {
        // Update successful.
        //console.log('Update successful.')
      }).catch(function(error) {
        // An error happened.
        console.log('An error happened', error)
      }); 
    },
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.showChangePhoto = true
    },
    changePhoto(){
      
      const fileName = this.selectedFile.name
      const userprofileRef = storageRef.ref('users/'+ fileName)
      // Upload the file and metadata
      const uploadTask = userprofileRef.put(this.selectedFile);

      uploadTask.on('state_changed', (snapshot)=>{
 
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
/*         switch (snapshot.state) {
          case storageRef.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case storageRef.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        } */
      }, (error) =>{
        console.log(error)
      }, () =>{
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
           this.currentUser.updateProfile({         
            photoURL: downloadURL
          }).then(function() {
            // Update successful.
            this.response.meg = 'Update successful profile name.'
          }).catch(function(error) {
            // An error happened.
            console.log(error)
            this.response.meg ='An error happened'
          }); 
        });
      });
    },
    /* Set a user's email address */
    updateEmail: function () {
      this.currentUser.updateEmail(this.email).then(function() {
        // Update successful.

      }).catch(function(error) {
        // An error happened.
        console.log(error)
        console.log('An error happened')
      });
    },
    /* Send a user a verification email */
     userVerification: function () {
      this.currentUser.sendEmailVerification().then(function() {
        // Email sent.
        console.log('Update successful.')
      }).catch(function(error) {
        // An error happened.
        console.log(error)
        console.log('An error happened')
      });
    },
    /* Set a user's a new password */
    changePassword: function (credential) {
      // var newPassword = getASecureRandomPassword();

      this.currentUser.updatePassword(credential).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
    },
    /* Send a password reset email */
     passwordReset: function () {
      // var auth = firebase.auth();
      var emailAddress = "user@example.com";

      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
    },
    /* Delete a user */
     deleteUser: function () {
      this.currentUser.delete().then(function() {
        // User deleted.
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
    },
        /* Re-authenticate a user */
    reauthenticate: function () {
      let credential = '12345'
      this.currentUser.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
        // User re-authenticated.
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.profile_photo_con h6{
  float: left;
  color: #fff;
  margin-top: -40px;
  margin-left: 20px;
  text-transform: uppercase;
  font-size: 13px;
}
.editProfile h2{
  font-size: 30px;
  padding: 20px;
  color: #fff;
  text-transform: capitalize;
}
.personal-info{
  background: #ccc;
  padding: 30px;
  color:#777
}
.personal-info h3{
  color: #777;
  text-align: left;
  text-transform: capitalize;
  margin-bottom: 20px;
}
 button{
  margin-right: 20px;
}
</style>