<template>
  <div class="streamers">
    <b-container>
      <div class="streamer-list">
        <h1>Manage Streamers</h1>
        <b-table striped :items="streamerList"></b-table>
      </div>
      <!-- Add -->
      <div id="streamer-add">
        <h3>Edit Streamer</h3>
        <div class="forms">
          <b-container>
            <b-form @submit="editStreamer">
              <b-row class="my-1">
                <b-col sm="2"><label for="input-id">ID:</label></b-col>
                <b-col sm="2">
                  <b-form-input id="input-id" size="sm" type="number" placeholder="0" v-model="streamer.id"></b-form-input>
                </b-col>
              </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-twitch">Twitch:</label></b-col>
              <b-col sm="2">
                <b-form-input id="input-twitch" size="sm" type="text" placeholder="Enter your username" v-model="streamer.twitch"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-twitter">Twitter:</label></b-col>
              <b-col sm="2">
                <b-form-input id="input-twitter" size="sm" type="text" placeholder="Enter your username" v-model="streamer.twitter"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-num">Number of videos to show :</label></b-col>
              <b-col sm="2">
                <b-form-select v-model="streamer.num" :options="options" class="mb-3" />
                <div>Selected: <strong>{{ streamer.num }}</strong></div>
              </b-col>
            </b-row>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
          </b-container>
        </div>
      </div>
      <!-- // Add -->
  </b-container>
  </div>
</template>

<script>
export default {
  name: 'Streamers',
  data () {
    return {
      streamerList: [],
      streamer: {},
      options: [
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' }
      ]
    }
  },
  methods: {
    fetchStreamers(){
      this.$http.get('http://streamsiteb/api/streamers')
        .then(function(response){
          this.streamerList = response.body
        });
    },
    editStreamer(e){
      let updStreamer = {
        id: this.streamer.id,
        twitch: this.streamer.twitch,
        twitter: this.streamer.twitter,
        vids_number: this.streamer.num
      }
      this.$http.put('http://streamsiteb/api/streamer/update', updStreamer)
        .then((response) => {
          alert('Streamer Edited');
        });
        e.preventDefault();
      },
  },
  created: function(){
    this.fetchStreamers();
  },
  updated: function(){
    this.fetchStreamers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
