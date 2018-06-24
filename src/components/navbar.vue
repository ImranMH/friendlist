<template>
	<div class="nav_area">
		<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
				<router-link to="/" class="navbar-brand ">Friendlist</router-link>
				<button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
						aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-bars"></i> </button>
				<div class="collapse navbar-collapse" id="collapsibleNavId">
					<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
						<li class="nav-item active" v-if="isLoggedIn">
								
							<router-link to="/" class="nav-link"><i class="fa fa-home"></i> Home</router-link>
						</li>
						<li class="nav-item " v-if="isLoggedIn">
							<router-link to="/user" class="nav-link"><i class="fas fa-user"></i> Friends</router-link>
						</li>									
					</ul>
					<form class="form-inline my-2 my-lg-0 mobile_off">
						<input class="form-control mr-sm-2" v-model="queryFriend" type="text" placeholder="Search">
						<button @click.prevent="searchFriend" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>
					<form class="show-tablet">
						<input class="" v-model="queryFriend" >
						<button @click.prevent="searchFriend" class="" type="submit"><i class="fa fa-search"></i></button>
					</form>
					<ul class="navbar-nav mr-auto mt-2 mt-lg-0 navbar-right tablet" >
						<li class=" nav-item" v-if="isLoggedIn" >
							<router-link :to="'/home/'+currentUser.uid" class="nav-link">{{currentUser.displayName ||currentUser.email }}</router-link>
						</li>
						<li class=" nav-item" v-show="!isLoggedIn" >
							<router-link to="/signup" class="nav-link"><i class="fas fa-sign-in-alt"></i> Signup</router-link>
						</li>
						<li @click="logout"  v-show="isLoggedIn"   class=" nav-item">
							<router-link  to="/login" class="nav-link"><i class="fa fa-edit"></i> Logout</router-link>
						</li>                   
					</ul>
				</div>
		</nav>
		
		<div class="container-fluid">
			<div class="row" v-if="searched">           
				<div class="col-md-12">
					<ul class="profile_item" v-if="queryResult.length > 0" >							
						<h2 class="profile_item_title"> search result </h2>
						<li v-for ="item of queryResult" :key="item.name">
							<div class="avatar">
								<img :src="item.avatar" :alt="item.name">  
							</div>							
							<h4><router-link :to="'/user/'+item.id" >{{item.name}}</router-link></h4>
							<h5 ><router-link :to="'/users/'+item.type" >{{item.type}}</router-link></h5>
							<h5 v-if="item.subType">{{item.subType}}</h5>    
							<h5>{{item.city}}</h5>										
						</li>											
					</ul>
					<div class="profile_item" v-else >
						<h2 class="profile_item_title"> search result </h2>
						<p class="no_data">no friend found</p>
					</div>
				</div>
			</div>
		</div>
	</div>
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav> -->
       
</template>

<script>
import {auth,rtdb} from './../firebase'
export default {
  name: 'Navbar',
  props: {
  },
  data(){
    return{
        currentUser: auth.currentUser,
        isLoggedIn: false,
        queryFriend: '',
        queryResult:[],
        searched: false
    }
  },
  created: function () {
      if(auth.currentUser){
          this.isLoggedIn= true
      }else{
          this.isLoggedIn= false
      }
  },

  methods:{
    logout: function() {        
        auth.signOut().then(()=>{
        this.$router.push('/login')
    })
    },
    searchFriend(){
        this.queryResult = []
        let serachResult= rtdb.ref('users').child(this.currentUser.uid).orderByChild('name').equalTo(this.queryFriend)
        serachResult.once('value', (snapshot)=>{
            //this.searched = false
            snapshot.forEach(friend=>{
                const friends={
                    id:friend.key,
                    name:friend.val().name,
                    type: friend.val().type,
                    subType: friend.val().subType,
                    city: friend.val().city,
                    avatar: friend.val().avatar
                }
                this.queryResult.push(friends)
               
            })
            //console.log(snapshot.val())
        })
         this.searched = true
    },
  }
}

</script>


<style scoped>
.navbar .container-fluid{
    background: none
}
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
.navbar-brand a{
    letter-spacing: 2px
}
.profile_item_title{
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  text-transform: uppercase;
  border-bottom: 3px solid #9a9a90;
  padding-bottom: 5px;
}
.profile_item h4{
  font-size: 16px;
  padding-top: 7px;
  margin-bottom: 3px;
  text-transform: capitalize;
}
button{
   margin: 0 auto;
}
.profile_item h5{
  font-size: 14px;
  text-transform: capitalize;
}
.avatar{
    max-width: 100%;
    width: 70px;
    height: 70px;
    float: left;
    margin: 5px;
    margin-right: 30px;
}
.profile_item img{
  max-width: 100%;
  border: 1px solid #ccc;
  width: 70px;
  height: 70px;
}
.no_data{
    padding: 20px;
    background: #555;
    text-align: center;
    color: #fff;
    font-size: 25px;
    text-transform: capitalize;
}
.show-tablet{
    display: none;
}
@media (max-width : 640px) {

}
@media (max-width : 835px) {

    .show-tablet{
        display: block;
        border: 1px solid #ccc;
        width: 180px;
        border-radius: 10px;
        overflow: hidden;
    }
    .show-tablet button{
        display: inline;
        border: none;
        margin-left: -17px;
        padding: 1px;

    }
      .show-tablet input{
        border: none;
        max-width: 100%;
        padding: 2px;
    }
    .mobile_off{
        display: none;
    }
    .tablet{
        margin-right: 0;
    }
    button.navbar-toggler{
        margin: 0;
    }
    input{
        /* width: 70%; */
        /* display: block;
        margin: 0 auto; */
    }
    button{
        display: block;
    }
}
@media (max-width : 575px) {

    .mobile_off{
        display: block;
    }
    button.navbar-toggler{
        margin: 0;
    }
    .show-tablet{
        display: none;
    }
    input{
        /* width: 70%; */
        /* display: block;
        margin: 0 auto; */
    }
    button{
        display: block;
    }
}
</style>

