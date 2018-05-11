<template>
  <div class="settings">
    <div class="forms">
      <b-container>
        <b-form @submit="addStreamer">
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
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
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
    addStreamer(e){
      let newStreamer = {
        twitch: this.streamer.twitch,
        twitter: this.streamer.twitter,
        vids_number: this.streamer.num
      }
      this.$http.post('http://streamsiteb/api/streamer/update/12', newStreamer)
        .then((response) => {
          alert('Streamer Added');
        });
        e.preventDefault();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
