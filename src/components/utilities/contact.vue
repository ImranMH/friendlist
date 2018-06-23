<template>
    <div class="contact container">
      <div class="row" v-if="message">
        <div class="col-md-12">
          <div class="alert alert-info alert-dismissable">
            <a class="panel-close close" data-dismiss="alert">×</a> 
            <i class="fa fa-coffee"></i>
            {{message}}
          </div>
        </div>        
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="top">
            <h2 class="section_title">Contact</h2>
            <p class="description">{{tagline}}</p>
          </div>
          
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
        <div class="contact_list">
          <h2>Find Me Online</h2>
          <!-- <div class="phone contact_item"> <a href="tel:+8801709875517"><i class="fa fa-phone"></i>+8801709875517</a></div>
          <div class="email contact_item">
            <a href="mailto:imran096@gmail.com" target="_top"><i class="fa fa-envolupe"></i>imran096@gmail.com</a>
          </div>
          <div class="skype contact_item">
            <a target="__blank" href="skype:iiiiimran?chat"><i class="fa fa-skype"></i>iiiiimran</a>
          </div>
          <div class="github contact_item">
            <a target="__blank" href="https://github.com/ImranMH"><i class="fa fa-github"></i>imranMH</a>
          </div>
          <div class="twitter contact_item">
            <a target="__blank" href="https://twitter.com/Imran__mh"><i class="fa fa-twitter"></i>imran096</a>
          </div> -->

          <div class="email contact_item" v-for ="(social, index) in socialAccounts" :key="index" >
            <a :href="social.url" target="_top"><i :class="social.className"></i>{{social.username}}</a>
          </div>
        </div>
        
      </div>
      <div class="col-md-8">
        <div class="contact_form">
          <h3>{{feedbackTitle}} </h3>
          <form action="" id="contact-form" @submit.prevent="clientFeedback" name="contact-form">
            <div class="form_input top">
              <input type="text" v-model="feedback.name" name="name" placeholder="Name" required="" id="field1"> 
              <input type="email" v-model="feedback.email" name="email" placeholder="Email" required=""> 
              <input type="tel" v-model="feedback.phone" name="phone" placeholder="Phone" required="">
            </div>
            <div class="form_input bottom">
              <textarea class="message" v-model="feedback.message" name="message" placeholder="Message" required="" rows="6"></textarea>
            </div>
            <span id="submit-response"></span>
            <div class="submit">
              <input type="submit" class="button" value="send">
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>

</template>

<script>
import {rtdb} from './../../firebase'
export default {
  name: "contact",
  props: {},
  data() {
    return {
      feedback:{},
      message: '',
      socialAccounts: [
       
        {
          name:'website',
          username:'imranmh.netlify.com',
          url:'https://imranmh.netlify.com/',
          className:'fa fa-link'
        },
        {
          name:'github',
          username:'ImranMH',
          url:'https://github.com/ImranMH',
          className:'fa fa-github'
        },
        {
          name:'twitter',
          username:'Imran__mh',
          url:'https://twitter.com/Imran__mh',
          className:'fa fa-twitter'
        },
        {
          name:'gmail',
          username:'imran096@gmail.com',
          url:'mailto:imran096@gmail.com',
          className:'fa fa-envelope'
        },
         {
          name:'skype',
          username:'iiiiimran',
          url:'skype:iiiiimran?chat',
          className:'fa fa-skype'
        },
        {
          name:'mobile',
          username:'+8801709875517',
          url:'tel:+8801709875517',
          className:'fa fa-phone'
        }
      ],
      tagline:"Trust your project in the hands of experts. I'm head of a nimble group of designers and developers whose commitment to quality is usingrelenting. Let's start the conversation.",
      feedbackTitle: 'Send Your thought about Friendlist app'
    };
  },
  methods: {
    clientFeedback(){
      const feedbacks = rtdb.ref('feedbacks')
      feedbacks.push(this.feedback, (err)=> {
        if (err) {
          this.message = err.code
        } else {
        this.message= "your feedback  successfully received "
        }        
        setTimeout(() => {
          this.message= ""
          this.feedback= {}

        }, 30000);
        
        //this.$router.push('/')
      })
      console.log(this.feedback)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* contact page .....................................*/
  .contact {
    background: #fff;
  }
  .contact_form {
    width: 100%;
    margin-right: 10px;
    border: 1px solid #ccc;
    padding: 5px;
    background: #eee;
    padding-top: 15px;
    margin-bottom: 40px;
  }
 
  .contact_form .top input {
    width: 100%;
    margin-bottom: 10px;
    height: 30px;
    padding: 6px;
    font-size: 14px; 
  }
  .contact_form .bottom {
    width: 98%; 
  }
  .contact_form .bottom textarea {
      width: 100%; 
  }
  .contact_form .submit {
    margin: 20px;
    overflow: hidden; 
  }
  .contact_form .button {
    width: 100px;
    height: 40px;
    float: right;
    font-size: 15px;
    text-transform: uppercase;
    border: #ccc4c4 solid 1px;
    border-radius: 5px;
    background: #fff; 
  }
  .contact_form .button:hover {
    border: 1px solid #2693c3; 
  }

  .contact_item {
    background: #fff;
    margin-bottom: 10px;
    padding: 0px; 
    text-align: left;
    border: 1px solid #ccc;
  }
  .contact_item span {
    border: 2px solid #ccc;
    border-radius: 50%;
    line-height: 20px;
    background: #e8e4e4;
    margin-right: 10px;
    padding: 7px; 
  }
  .contact_item a {
    color: #555;
    text-decoration: none;
    font-size: 16px; 
  }
  .contact_item i{
    padding: 10px;
    border: 1px solid #ccc;
    background: #38a5e4;
    color: #fff;
    margin-right: 10px;
  }
  .contact_item:hover span {
    background: #2693c3;
    color: #f9f9f9; 
  }
  .top{
    padding: 30px 0;
  }
  h2{
    background: #eee;
    padding: 10px;
    color: #555;
  }
</style>
