<template>
      <tbody>
        <tr>
          <th scope="row">{{no}}</th>
          <td>{{name}}</td>
          <td>{{age}}</td>
          <td>{{city}}</td>
          <td>{{country}}</td>
          <td>{{status}}</td>
        </tr>
      </tbody>

</template>

<script>

export default {
  name: 'Todalist',
  props: {
    msg: String,
    no: String,
    name: String,
    city: String,
    country: String,
    status: String,
    age: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
