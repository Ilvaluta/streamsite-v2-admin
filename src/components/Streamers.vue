<template>
  <div class="streamers">
    <b-container>
    <h1>Manage Streamers</h1>
    <b-table striped :items="streamers"></b-table>
  </b-container>
  </div>
</template>

<script>
export default {
  name: 'Streamers',
  data () {
    return {
      streamers: []
    }
  },
  methods: {
    fetchStreamers(){
      this.$http.get('http://streamsiteb/api/streamers')
        .then(function(response){
          this.streamers = response.body
        });
    }
  },
  created: function(){
    this.fetchStreamers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
