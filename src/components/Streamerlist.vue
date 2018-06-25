<template>
  <div class="streamers">
    <b-container>
      <div class="streamer-list">
        <h1>Manage Streamers</h1>
        <b-table striped :items="streamerList"></b-table>
      </div>
  </b-container>
  </div>
</template>

<script>
export default {
  name: 'Streamerlist',
  data () {
    return {
      streamerList: [],
    }
  },
  methods: {
    fetchStreamers(){
      this.$http.get('http://streamsiteb/api/streamers')
        .then(function(response){
          this.streamerList = response.body;
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
