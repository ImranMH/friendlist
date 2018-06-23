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
            <h2 class="section_title">About Me</h2>
            <p class="description">{{tagline}}</p>
          </div>
          
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
        <div class="contact_list">
          <h2>Find Me Online</h2>
          <div class="email contact_item" >
            <a href="" target="_top"><i class=""></i>{{'social.username'}}</a>
          </div>
        </div>
        
      </div>
      <div class="col-md-8">
        <div class="contact_form">
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aperiam modi voluptatum sed ipsa repellat incidunt dignissimos fuga eligendi. Et.
            </li>
          </ul>

        </div>
      </div>
      </div>
    </div>

</template>

<script>

export default {
  name: 'about',
  props: {

  },
  data(){
    return{
      socialAccounts:[],
      tagline:'hello',
      message: 'lorem30'
    }
  },
  methods:{


  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
