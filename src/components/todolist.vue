<template>
      <tbody>
        <tr>
          <th scope="row">{{no}}</th>
          <td>{{name}}</td>
          <td>{{city}}</td>
          <td>{{age}}</td>
        </tr>
      </tbody>

</template>

<script>

export default {
  name: 'Todalist',
  props: {
    msg: String,
    no: Number,
    name: String,
    city: String,
    age: Number,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
