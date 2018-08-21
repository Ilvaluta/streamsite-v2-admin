<template>
  <div class="test">
    <b-container>
      <h1>Test</h1>
      <hr>
      Hi {{name}}

    </b-container>
  </div>
</template>

<script>
export default {

  name: 'Test',
  data () {
    return {
      name: 'd'
    }
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
