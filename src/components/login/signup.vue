<template>
  <div class="login_component">
		<div class="login-form">
			<form @submit.prevent="signup">
				<h2 class="text-center">Sign Up</h2>   
				<div class="form-group">
					<div class="input-group">
							<span class="input-group-addon"><i class="fa fa-user"></i></span>
							<input type="text" v-model="username" class="form-control" name="username" placeholder="Username" required="required">				
					</div>
				</div>
				<div class="form-group">
					<div class="input-group">
						<span class="input-group-addon"><i class="fa fa-lock"></i></span>
						<input type="password" v-model="password" class="form-control" name="password" placeholder="Password" required="required">				
					</div>
				</div>        
				<div class="form-group">
					<button type="submit" class="btn btn-primary login-btn btn-block">Register</button>
				</div>
			</form>
			<p class="text-center text-muted small">Already Registered ?<router-link to="/login" class="nav-link">Login here!</router-link></p>
		</div>          
  </div>

</template>

<script>
import {auth} from './../../firebase'

export default {
  name: 'SignIn',
  props: {

  },
  data(){
    return{
      username: null,
      password: null,
      authenticate: false
    }
  },
  methods:{
    signup: function(){
      const sign = auth.createUserWithEmailAndPassword(this.username, this.password)
      sign.then(user=>{
        if(user){
            console.log('authenticated as ',user.uid)
            this.authenticate = true
            this.$router.push('/')
            //this.$router.go({path:this.$router.path})
        }
        
         
      })
      sign.catch(err=>{
        //   this.message = "unable to signin Email /password incorrect"
        console.log(err)
      })
    }

  }
}

</script>


<style scoped>

  .login-form {
		width: 385px;
		margin: 30px auto;
	}
	.login-form form {        
		margin-bottom: 15px;
		background: #f7f7f7;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
		padding: 30px;
	}
	.login-form h2 {
		margin: 0 0 15px;
	}
	.form-control, .login-btn {
		min-height: 38px;
		border-radius: 2px;
	}
	.input-group-addon .fa {
		font-size: 18px;
	}
	.login-btn {
		font-size: 15px;
		font-weight: bold;
	}
.social-btn .btn {
	border: none;
	margin: 10px 3px 0;
	opacity: 1;
}
.social-btn .btn:hover {
	opacity: 0.9;
}
.social-btn .btn-primary {
	background: #507cc0;
}
.social-btn .btn-info {
	background: #64ccf1;
}
.social-btn .btn-danger {
	background: #df4930;
}
.or-seperator {
	margin-top: 20px;
	text-align: center;
	border-top: 1px solid #ccc;
}
.or-seperator i {
	padding: 0 10px;
	background: #f7f7f7;
	position: relative;
	top: -11px;
	z-index: 1;
}
.input-group-addon {
	padding: 6px 12px;
	font-size: 14px;
	font-weight: 400;
	line-height: 1;
	color: #555;
	text-align: center;
	background-color: #eee;
	border: 1px solid #ccc;
	border-radius: 4px;
}
.input-group-addon, .input-group-btn {
	white-space: nowrap;
	vertical-align: middle;
} 
  .input-group .form-control, .input-group-addon, .input-group-btn {
    display: table-cell;
}  
.input-group-addon[data-v-72680f5f] {
	padding: 6px 12px;
	font-size: 14px;
	font-weight: 400;
	line-height: 1;
	color: #555;
	text-align: center;
	background-color: #eee;
	border: 1px solid #ccc;
	border-radius: 4px;
}
</style>
