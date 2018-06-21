<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
			  <footer class="footer-basic-centered">

					<p class="footer-company-motto">keep Your friens activities alive</p>

					<p class="footer-links">
						<router-link to="/" class="nav-link"> home</router-link>
						<router-link to="/user" class="nav-link"> firends</router-link>

						<router-link to="/about" class="nav-link"> about</router-link>
						<a href="#">Faq</a>
						<router-link to="/contact" class="nav-link"> contact</router-link>
					</p>

					<p class="footer-company-name">Friendlist &copy; 2015</p>

				</footer>
			</div>
		</div>
	</div>


</template>

<script>

export default {
  name: 'Footer',
  props: {

  },
  created(){
    //alert(this.$route.params.id)
  },
  watch:{
  },
  data(){
    return{

    }
  },
  methods:{
    goHome(){
      this.$router.push('/')
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-basic-centered{
	background-color: #292c2f;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
	box-sizing: border-box;
	width: 100%;
	text-align: center;
	font: normal 18px sans-serif;

	padding: 45px;
	margin-top: 80px;
}

.footer-basic-centered .footer-company-motto{
	color:  #8d9093;
	font-size: 24px;
	margin: 0;
}

.footer-basic-centered .footer-company-name{
	color:  #8f9296;
	font-size: 14px;
	margin: 0;
}

.footer-basic-centered .footer-links{
	list-style: none;
	font-weight: bold;
	color:  #ffffff;
	padding: 35px 0 23px;
	margin: 0;
}

.footer-basic-centered .footer-links a{
	display:inline-block;
	text-decoration: none;
	color: inherit;
}

/* If you don't want the footer to be responsive, remove these media queries */
.footer-links{
	padding: 10px 0;
}
.footer-links a{
	padding: 0px 10px;
	text-transform: capitalize;
}
.footer-links a:hover{
	color: #555;
}
@media (max-width: 600px) {

	.footer-basic-centered{
		padding: 35px;
	}

	.footer-basic-centered .footer-company-motto{
		font-size: 18px;
	}

	.footer-basic-centered .footer-company-name{
		font-size: 12px;
	}

	.footer-basic-centered .footer-links{
		font-size: 14px;
		padding: 25px 0 20px;
	}

	.footer-basic-centered .footer-links a{
		line-height: 1.8;
	}
}
</style>
