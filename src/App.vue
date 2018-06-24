<template>
  <div id="app">    
    <Navbar :key="$route.fullPath" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
 import Navbar from './components/navbar.vue'
 import Footer from './components/footer.vue'
// import Test from './components/test.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
  ul{
    margin: 0;
    padding: 0;
  }
  li{
    list-style-type: none
  }
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
  line-height: 30px;
}

.form_container {
  max-width: 500px;
  width: 100%;
  margin: 40px auto;
  position: relative;
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

/* button */
  .nav_link{
    padding: .5rem 1rem;
    border: 1px solid #ccc;
    display: inline-block;
    margin-bottom: 20px;
    border-radius: 10px;
    color: #fff;
    background: #004085;
    margin-top: 40px;
}
.nav_link:hover{
  background: #2f5a88;;
  text-decoration: none;
  color: #fff;
}
.custom_button{
  display: block;
  padding: .5rem 1rem;
  border: 1px solid;
  background: #0062cc;
  color: #fff;
  display: inline-block;
}


 /* edit profile.vue css */
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
.container-fluid{
  background: #212529;
  color: #fff;
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
.profile_photo{
  width: 200px;
  height: 200px;
  float: left;
  margin: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  padding: 2px;
}
.profile_photo img{
  max-width: 100%; 
}
.site-heading{
  color: #fff;
  padding: 15px;
  text-transform: capitalize;
}
.user .site-heading{
   color: #e2d9d9;
    padding: 0;
    text-align: center;
    font-size: 30px;

}
h3 a {
  color: #0056b3;
}
a{
  color: #00b38c;
}
strong a {
  color: #28a745;
}
.type_heading a {
  color: #28a745;
}
a:hover{
  text-decoration: none;
  color: #5d8bbd;;
}
.no_user{
  color: #fff;
  padding: 50px;
}
.no_user small{
display: block;
bottom: 40px;
}
.no_user p{
  font-size: 25px;
  text-transform: capitalize;
  padding: 20px 0;
  line-height: 35px;
}
td,th{
  padding-right: 4px;
}
table tr{
    border: 1px solid #555;
    text-align: center;
}
/* .info_table td {
  padding: 5px;
  border:1px solid #555;
}
.table_item th{
   padding: 5px;
  border:1px solid #555;
} */
/* input from css */
/* @import url(https://fonts.googleapis.com/css?family=Roboto:400,300,600,400italic);
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
} */



/*  responsive css */
.show_580{
  display: none;
}
.show_770{
  display: none;
}
@media(min-width:1200px){
   tr td, th {
    padding: 10px;
  }
}
@media(min-width:900px){
  .form_container {
    max-width: 700px;
    width: 100%;
  }
}
@media(max-width:900px){
  .hide_900{
    display: none;
  }
}
@media(max-width:770px){
  .hide_770{
    display: none;
  }
  #contact h3{
    font-size: 25px;
  }
  tr td, tr a{
    font-size: 12px;
    line-height: 18px;
  }
  tr td {
    padding: 2px;
  }
   .show_770{
    display: block;
  }
 
}
@media(max-width:580px){
  .hide_580{
    display: none;
  }
  .footer-basic-centered{
	padding: 25px;
    margin-top: 40px;
  }
  .footer-links a{
    padding: 0px 5px;

  }
  td{
    padding-right:0px ;
  }
  .show_580{
    display: block;
  }
  .edit_item  input{
    /* margin-left: 0; */
  }
  .edit_item input[data-v-091b6546],
   select[data-v-091b6546], .edit_item span[data-v-091b6546]{
    margin-left: 0;
  }
}
@media(max-width:400px){
  .hide_400{
    display: none;
  }
 .edit_item input{
   margin-left: 0;
 }
}
</style>
