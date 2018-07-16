<template>
  <div class="streamers">
    <b-container>
      <div class="streamer-list">
        <h1>Manage Streamers</h1>
        <b-table striped :items="streamerList"></b-table>
      </div>
      <!-- Add -->
      <div id="streamer-add">
        <h3>Add Streamer</h3>
        <div class="forms">
          <b-container>
            <b-form @submit="addStreamer">
              <b-row class="my-1">
                <b-col sm="2"><label for="input-header">Header:</label></b-col>
                <b-col sm="2">
                  <b-form-input id="input-header" size="sm" type="text" placeholder="Header text/Logo" v-model="streamer.header"></b-form-input>
                </b-col>
              </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-twitch">Twitch:</label></b-col>
              <b-col sm="2">
                <b-form-input id="input-twitch" size="sm" type="text" placeholder="Twitch" v-model="streamer.twitch"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-vods">Show Vods:</label></b-col>
              <b-col sm="2">
                <b-form-checkbox id="checkboxVods"
                     v-model="streamer.vods"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-highlights">Show Highlights:</label></b-col>
              <b-col sm="2">
                <b-form-checkbox id="checkboxHighlights"
                     v-model="streamer.highlights"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-num"># of videos to show :</label></b-col>
              <b-col sm="2">
                <b-form-select v-model="streamer.num" :options="numOptions" class="mb-3" />
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-twitter">Donation:</label></b-col>
              <b-col sm="2">
                <b-form-input id="input-donation" size="sm" type="text" placeholder="Donation URL" v-model="streamer.donation"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-sponsors">Show Sponsors:</label></b-col>
              <b-col sm="2">
                <b-form-checkbox id="checkboxSponsors"
                     v-model="streamer.sponsors"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-twitter">Giveaway:</label></b-col>
              <b-col sm="2">
                <b-form-input id="input-giveaway" size="sm" type="text" placeholder="Gleam URL" v-model="streamer.giveaway"></b-form-input>
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
      numOptions: [
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
    addStreamer(e){
      let newStreamer = {
        twitch: this.streamer.twitch,
        vids_number: this.streamer.num,
        vods: this.streamer.vods,
        highlights: this.streamer.highlights,
        giveaway: this.streamer.giveaway,
        donation: this.streamer.donation,
        sponsors: this.streamer.sponsors,
        header: this.streamer.header
      }
      this.$http.post('http://streamsiteb/api/streamer/add', newStreamer)
        .then((response) => {
          alert('Streamer Added');
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
