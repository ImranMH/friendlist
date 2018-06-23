<template>
      <div class="background_area">
         <div class="form_container">  
          <form @submit.prevent="addUser" id="contact">
            <h3>Add Friend to your friendlist</h3>
            <h4>You can Edit those field later from edit friend option</h4>
            <fieldset>
              <input v-model= "inputdata.name" placeholder="Your name" type="text" tabindex="1" required autofocus>
            </fieldset>
            <fieldset>
              <input v-model= "inputdata.city" placeholder="Friend Place of birth (optional)" type="text" tabindex="2" required>
            </fieldset>
            <fieldset>
              <input v-model= "inputdata.country" placeholder=" Country (optional)" type="text" tabindex="3" >
            </fieldset>
            <fieldset>
              <input v-model= "inputdata.mobile" placeholder=" Mobile Number (optional)" type="tel" tabindex="3" >
            </fieldset>
            <fieldset>
              <label >Type of Friend</label>
              <select placeholder="Type of Friend" v-model="inputdata.type" required > 
                
                <option v-for = "(type, index) of friendType" :value="type" v-bind:key ="index" >{{type}}</option>               
              </select>
            </fieldset>
            <fieldset>
              <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Add to List</button>
            </fieldset>
            <fieldset>
              <router-link class="btn btn-default btn-block bor-btn" to="/" > Cancel </router-link>
            </fieldset>
          </form>


        </div> 
      </div>
             

 
</template>

<script>
//import axios from 'axios'
import {auth,rtdb} from './../../firebase'
//import Input from './input'
export default {
  name: 'NewUser',
  props: {

  },
  components:{
    //Input
  },
  watch:{
  },
  data(){
    return{
      inputdata: {},
      user: {},
      friendType: ['Best friend','Childhood friend','Close friend','Love relation','School friend','College friend',
        'university friend','Educational friend','family Member','relatives','Business partner','office colleague','Just friend','Helpful friend','Time pass friend',
        'Corporate friend','Community friend','student',' teacher','Friends friend','Facebook friend','WhatsApp friend','Speaky app friend',
        'Local friend','Mobile friend','Online friend'
      ],
    }
  },
   methods:{

    addUser(){
      /* real time database implementation */

      let currentUserId= auth.currentUser.uid
      let user = this.inputdata
      user.avatar = 'https://firebasestorage.googleapis.com/v0/b/testwithvue-24462.appspot.com/o/friends%2Fuo9QztLb2VeanoAr9w2WcoKxZcv2%2Favatar-default.png?alt=media&token=6d90b5cb-ed8f-465d-8da7-15d3edfe7528'
    
      let users = rtdb.ref('users').child(currentUserId)
      users.push(user, ()=> {
        this.$router.push('/')
      })
      this.inputdata = {} 

      /* firebase firestore implementation */
      // db.collection("users").add(user)
      // .then(function(docRef) {
      //     console.log("Document written with ID: ", docRef.id);
      // })
      // .catch(function(error) {
      //     console.error("Error adding document: ", error);
      // });
      //  this.inputdata = {}
    }
  },
}

</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,300,600,400italic);
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 12px;
  line-height: 30px;
  color: #777;
  background: #4CAF50;
}
.background_area{
   background: #212529;
}
.form_container {
  max-width: 500px;
  width: 100%;
  margin: 0px auto;
  position: relative;
  padding: 40px 0;
}

#contact input[type="text"],
#contact input[type="email"],
#contact input[type="tel"],
#contact input[type="url"],
#contact textarea,
#contact select,
#contact button[type="submit"] {
  font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
}

#contact {
  background: #F9F9F9;
  padding: 25px;
  margin: 15px 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

#contact h3 {
  display: block;
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
}

#contact h4 {
  margin: 5px 0 15px;
  display: block;
  font-size: 13px;
  font-weight: 400;
}
.app{
  background: #212529;
}
fieldset {
  border: medium none !important;
  margin: 0 0 10px;
  min-width: 100%;
  padding: 0;
  width: 100%;
}

#contact input[type="text"],
#contact input[type="email"],
#contact input[type="tel"],
#contact input[type="url"],
label,
#contact textarea {
  width: 100%;
  border: 1px solid #ccc;
  background: #FFF;
  margin: 0 0 5px;
  padding: 10px;
}
#contact select {
  width: 100%;
  border: 1px solid #ccc;
  background: #FFF;
  margin: 0 0 5px;
  padding: 10px;
}
#contact input[type="text"]:hover,
#contact input[type="email"]:hover,
#contact input[type="tel"]:hover,
#contact input[type="url"]:hover,
#contact textarea:hover {
  -webkit-transition: border-color 0.3s ease-in-out;
  -moz-transition: border-color 0.3s ease-in-out;
  transition: border-color 0.3s ease-in-out;
  border: 1px solid #aaa;
}
#contact select:hover {
  -webkit-transition: border-color 0.3s ease-in-out;
  -moz-transition: border-color 0.3s ease-in-out;
  transition: border-color 0.3s ease-in-out;
  border: 1px solid #aaa;
}
#contact textarea {
  height: 100px;
  max-width: 100%;
  resize: none;
}

#contact button[type="submit"] {
  cursor: pointer;
  width: 100%;
  border: none;
  background: #4CAF50;
  color: #FFF;
  margin: 0 0 5px;
  padding: 10px;
  font-size: 15px;
}

#contact button[type="submit"]:hover {
  background: #43A047;
  -webkit-transition: background 0.3s ease-in-out;
  -moz-transition: background 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out;
}

#contact button[type="submit"]:active {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}
.bor-btn{
  border: 1px solid #ccc;
  padding: 10px;
}
.copyright {
  text-align: center;
}

#contact input:focus,
#contact textarea:focus {
  outline: 0;
  border: 1px solid #aaa;
}

::-webkit-input-placeholder {
  color: #888;
}

:-moz-placeholder {
  color: #888;
}

::-moz-placeholder {
  color: #888;
}

:-ms-input-placeholder {
  color: #888;
}
</style>
