<template>
  <fieldset>
    <input  placeholder={{place}} type={{type}} tabindex="1" required autofocus>
  </fieldset>
</template>
<script>
export default {
  name:'Input',
  props: {
    model: String,
    place: String,
    type: String,
    require: Boolean,
  }
}
</script>
