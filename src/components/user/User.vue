<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
         <div class="user">
           
          <div v-if="userdata.length> 0">
            <router-link to="/user/new" class="nav_link custom_button"><i class="fas fa-plus"></i> addnew</router-link>
            <table>
              <thead>
                <tr>
                  <th scope="col">image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th class="hide_400" scope="col">Age</th>
                  <th class="small_hide" scope="col">City</th>
                  <th class="hide_580" scope="col">Country</th>
                  <th class="hide_900" scope="col">Contact</th>
                  <th scope="col">Mobile</th>
                  <th class="hide_770" scope="col">Email</th>
                  <th class="hide_900" scope="col">Know For</th>
                </tr>
              </thead>
                <!-- <Todalist msg="hellow" v-bind:name="user.name" v-bind:country="user.country" v-bind:age="user.age" v-bind:city="user.city" v-bind:status="user.type" v-bind:no="user.title" /> -->
              <tbody>
                <tr  v-for = "user of orderFriends " v-bind:key ="user.id">
                  <td><router-link :to="'user/'+user.id" > <img class="list_image" :src="user.avatar" alt=""></router-link></td>
                  <td><router-link :to="'user/'+user.id" > {{user.name}}</router-link></td>
                  <td class="type_heading"><router-link :to="'/users/'+user.type" > {{user.type}}</router-link></td>
                  <td  class="hide_400"><span v-if="user.dob">{{user.dob | moment("from","now", true)}}</span><span v-else >{{user.age || '---'}}</span></td>
                  <td class="small_hide">{{user.city|| "---"}}</td>
                  <td class="hide_580">{{user.country || "---"}}</td>
                  <td class="hide_900">{{user.communicationWay || "---"}}</td>
                  <td ><a v-if="user.mobile" :href=" `tel:${user.mobile}`">{{user.mobile}}</a><span v-else>{{'---'}}</span></td>
                  <td class="email hide_770"> <a v-if="user.email" :href=" `mailto:${user.email}`">{{user.email }}</a><span v-else>{{"---"}}</span></td>
                  <td class="hide_900"><span  v-if="user.knowFrom"> {{user.knowFrom | moment("from","now", true)}}</span><span v-else>{{'---'}}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center no_user">
            <p>You Haven't add any friend yet</p>
            <router-link to="/user/new" class="nav_link custom_button"><i class="fas fa-plus"></i> addnew</router-link>
          </div>
            

        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
// import axios from 'axios'
// import {rtdb} from './../../firebase'
import {auth,rtdb} from './../../firebase'
import _ from 'lodash'

export default {
  name: 'User',
  props: {

  },
   created: function () {

    
    let currentUserId= auth.currentUser.uid
    const user = rtdb.ref('users').child(currentUserId)
    user.on('value',snap=>{
      //this.userdata = snap.val()
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
          mobile:u.val().mobile,
          knowFrom:u.val().knowFrom,
          dob:u.val().dob,
          email:u.val().email,
          communicationWay:u.val().communicationWay,
        }
        this.userdata.push(data)
      })
    }) 
   
    // firebese firestore implementation
/*   db.collection('users').get().then((querySnaphot)=>{
    querySnaphot.forEach((doc)=>{
      //console.log(doc)
      const friend = {
        id:doc.id
      }
      this.friends.push(friend)
    })
  }) */
  },
   mounted: function () {
      // const cu = auth.currentUser;
    },
  watch:{
 /*    '$route'(to, from){
      alert(to.params.id)
    } */
  },
  data(){
    return{
      inputdata: {},
      cu : null,
      userdata: []
    }
  },
  computed:{
    orderFriends:function () {
      return _.orderBy(this.userdata,'name')
    }
  },
   methods:{

  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list_image{
  width: 40px;
  height: 29px;
  margin-top: -0.50rem;
  margin-bottom: -0.50rem;
  max-width: 100%;

}
.user table{
  /* text-align: left; */
  text-transform: capitalize;
  margin: 0 auto;
}
tbody,thead{
  color: #fff;
}
/* tr{
  border: 1px solid #555;
} */

.email{
  font-size: 12px;
  text-transform: lowercase;
}
</style>
