<template>
  <!-- <div class="Profile_item">
      <div class=" col-sm-12" >    
        <h2 class="profile_item_title">{{message}} </h2>
        <app-input @changeValue= "message=$event" :msg="message" > </app-input >    
      </div>
      <ul v-if="items.length">
        <li v-for="item in items" :key="item.id">
          <img :src="item.avatar" :alt="item.name">
            <h4>{{item.name}}</h4>
            <h5>{{item.subType}}</h5>
        </li>
      </ul>
      <p v-else>No items found.</p>
  </div> -->
  <div class="col-md-3 col-sm-6"  v-if="items.length >2">        
    <ul class="profile_item" >
      <h2 v-if="items[0].type!==items[1].type" class="profile_item_title">Others Friend </h2>
      <h2 v-else class="profile_item_title"><router-link :to="'/users/'+items[0].type" >{{items[0].type}}</router-link> </h2>
      <li v-for ="item of items" :key="item.name">
        <img :src="item.avatar" :alt="item.name">
        <h4><router-link :to="'/user/'+item.id" >{{item.name}}</router-link></h4>
        <h5 v-if="item.subType">{{item.subType}}</h5>
        <h5 v-else-if ="items[0].type!==items[1].type"><router-link :to="'/users/'+item.type" >{{item.type}}</router-link></h5>
        <h5 v-else >{{item.city}}</h5>
        
      </li>          
    </ul>
  </div>
 
</template>

<script>
//import axios from 'axios'
import {auth,rtdb} from './../../firebase'
import AppItem from './AppInput'
export default {
  name: 'ProfileItem',
  props: {
    items:{
      type: Array
    }
  },
  data:function(){
    return {
      message: 'parents message'
    }
  },
  created(){
    
  },
  methods:{

  },
  components:{
   'app-input' :AppItem
  }
}
</script>
<style scoped>
.profile_top{
    border: 1px solid rgb(105, 103, 103);
    background: #e9ecef;
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
  margin-bottom: 25px;
  margin-top: 30px;
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

