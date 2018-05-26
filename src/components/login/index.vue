<template>
  <div class="login_component">
      <div class="login-form">
          <form @submit.prevent="login">
              <h2 class="text-center">Sign in</h2>   
              <div class="form-group">
                <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-user"></i></span>
                      <input type="text" class="form-control" v-model="username" name="username" placeholder="Username" required="required">				
                  </div>
              </div>
              <div class="form-group">
                  <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                      <input type="password" v-model="password" class="form-control" name="password" placeholder="Password" required="required">				
                  </div>
              </div>        
              <div class="form-group">
                  <button type="submit"   class="btn btn-primary login-btn btn-block">Sign in</button>
              </div>
              <div class="clearfix">
                  <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
                  <a href="#" class="pull-right">Forgot Password?</a>
              </div>
          <div class="or-seperator"><i>or</i></div>
              <p class="text-center">Login with your social media account</p>
              <div class="text-center social-btn">
                  <a href="#" class="btn btn-primary"><i class="fa fa-facebook"></i>&nbsp; Facebook</a>
                  <a href="#" class="btn btn-info"><i class="fa fa-twitter"></i>&nbsp; Twitter</a>
            <a href="#" class="btn btn-danger"><i class="fa fa-google"></i>&nbsp; Google</a>
              </div>
          </form>
          <p class="text-center text-muted small">Don't have an account? <router-link to="/signup" class="nav-link">Sign up here!</router-link> </p>
      </div>
          
  </div>

</template>

<script>
import {auth} from './../../firebase'

export default {
  name: 'Test',
  props: {

  },
  data(){
    return{
      username: null,
      password: null,
      authenticate: false
    }
  },
  mounted: function (params) {
    //  auth.onAuthStateChanged((user)=>{
    //   console.log('state chanhge')
    //   if(!user){
    //       console.log('logout')
    //   }
    //   console.log(user)
    //   console.log(auth.currentUser)
    // })
  },
  methods:{
    login: function(){
      console.log(this.username, this.password)
      const sign = auth.signInWithEmailAndPassword(this.username, this.password)
      sign.then(user=>{
        
        if(user){
            console.log('authenticated as ',user.uid)
            this.authenticate = true
            this.$router.push('/home')
            //this.$router.go({path:this.$router.path})
        }
      })
      sign.catch(err=>{
        console.log(err)
      })
    }
   

  }
}
/* similar command ....... */
// @change =
// v-on:change =
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
