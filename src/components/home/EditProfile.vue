<template>
      <div class="editProfile">
        <h2>Edit profile</h2>
        
         <div class="container ">
            <div class="row">
              <div class="col-md-12">
                <div class="alert alert-info alert-dismissable">
                  <a class="panel-close close" data-dismiss="alert">×</a> 
                  <i class="fa fa-coffee"></i>
                  This is an <strong>.alert</strong>. Use this to show important messages to the user.
                </div>
              </div>
              
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="text-center">
                  <input style="display:none" ref="selectImage" class ="form-control"  type="file" v-on:change ="onFileSelected" >
                  <!-- <button @click="$refs.selectImage.click()"> change Image </button> -->
                  
                  <img style="width:100px" @click="$refs.selectImage.click()" :src="currentUser.photoURL" class="avatar img-circle" alt="avatar">
                  <h6>Change Profile photo</h6>
                  <input class= "btn btn-primary" v-if="showChangePhoto" @click="changePhoto" value="Change Photo" >
                  
                  <!-- <input type="file" class="form-control"> -->
                </div>
              </div>
              <div class="col-md-9 personal-info">
                 
                <h3>Personal info</h3>
                
                <form class="form-horizontal" @submit.prevent="updateProfile" role="form">
                  <div class="form-group">
                    <label class="col-md-3 control-label">First name:</label>
                    <div class="col-md-8">
                      <input class="form-control" v-model="user.firstName" type="text" >
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">Last name:</label>
                    <div class="col-lg-8">
                      <input class="form-control" v-model="user.lastName"  type="text" >
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label">Mobile No:</label>
                    <div class="col-md-8">
                      <input class="form-control" v-model="user.mobile" type="number">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label"></label>
                    <div class="col-md-8">
                      <input type="submit" class="btn btn-primary" value="Save Changes">
                      <span></span>
                      <input type="reset" class="btn btn-default" value="Cancel">
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- <div class="row">
              <div class="col-md-12">
                <ul class="edit">
                  <li class="edit_item">
                    <div class="name">
                      Name <input v-model="userEdit.displayName" value="currentUser.displayName" type="text">
                    </div>
                  </li>
                  <li class="edit_item">
                  <div class="mobile">
                        mobile:<input v-model="userEdit.phoneNumber" value="currentUser.phoneNumber" type="text" >
                    </div>
                  </li>
                  <li class="edit_item">
                    <div class="currently_live">
                      profile Url: <input  v-model="userEdit.photoURL" type="text">                    
                    </div>
                  </li>
                  <button @click="updateProfile" class="btn btn-primary">update Profile</button>
                </ul>
              </div>
            </div> -->
        </div>
      </div>

</template>

<script>
import axios from 'axios'
import {auth,rtdb,storageRef, db} from './../../firebase'
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
      selectedFile : null,
      editMood: false,
      displayMood:true,
      showChangePhoto : false
    }
  },
  created: function(){
    console.log('created')
  },
  mounted: function () {
    console.log(this.currentUser)
    if (this.currentUser != null) {
        this.currentUser.providerData.forEach(function (profile) {
          console.log( profile);
        });
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
        console.log('Update successful.')
      }).catch(function(error) {
        // An error happened.
        console.log('An error happened')
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
          console.log('File available at', downloadURL);
           this.currentUser.updateProfile({         
            photoURL: downloadURL
          }).then(function() {
            // Update successful.
            console.log('Update successful.')
          }).catch(function(error) {
            // An error happened.
            console.log('An error happened')
          }); 
        });
      });
    },
    /* Set a user's email address */
    updateEmail: function () {
      this.currentUser.updateEmail(this.email).then(function() {
        // Update successful.
        console.log('Update successful.')
      }).catch(function(error) {
        // An error happened.
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
        console.log('An error happened')
      });
    },
    /* Set a user's a new password */
    changePassword: function () {
      var newPassword = getASecureRandomPassword();

      this.currentUser.updatePassword(newPassword).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
    },
    /* Send a password reset email */
     passwordReset: function () {
      var auth = firebase.auth();
      var emailAddress = "user@example.com";

      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
    },
    /* Delete a user */
     passwordReset: function () {
      this.currentUser.delete().then(function() {
        // User deleted.
      }).catch(function(error) {
        // An error happened.
      });
    },
        /* Re-authenticate a user */
    passwordReset: function () {
      let credential = '12345'
      this.currentUser.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
        // User re-authenticated.
      }).catch(function(error) {
        // An error happened.
      });
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>