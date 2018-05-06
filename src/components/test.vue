<template>
      <div class="test">
        <input style="display:none" ref="selectImage" class ="form-control"  type="file" v-on:change ="onFileSelected" >
        <button @click="$refs.selectImage.click()"> change Image </button>
        <input class= "btn btn-primary" @click="upload" value="Upload" >
      </div>

</template>

<script>

export default {
  name: 'Test',
  props: {

  },
  data(){
    return{
      selectedFile : null
    }
  },
  methods:{
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile)
    },
    upload(){
      console.log('uploading')
    }
  }
}
/* similar command ....... */
// @change =
// v-on:change =
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button{
    width: 200px;
    height: 100px;
    margin-bottom: 20px;
    background: #ff0;
  }
</style>
