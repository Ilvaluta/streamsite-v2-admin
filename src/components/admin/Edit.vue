<template>
<b-container>
  <!-- Edit -->
  <div id="streamer-edit" class="mt-4">
    <h3>Edit Streamer - {{username}}</h3>
    <hr>
    <div class="forms">
      <b-container>
        <b-form @submit="editStreamer">
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
              <b-form-checkbox id="checkboxVods" v-model="streamer.vods" value="true" unchecked-value="false"></b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2"><label for="input-highlights">Show Highlights:</label></b-col>
            <b-col sm="2">
              <b-form-checkbox id="checkboxHighlights" v-model="streamer.highlights" value="true" unchecked-value="false"></b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2"><label for="input-num"># of videos to show :</label></b-col>
            <b-col sm="2">
              <b-form-select v-model="streamer.vids_number" :options="numOptions" class="mb-3" />
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
              <b-form-checkbox id="checkboxSponsors" v-model="streamer.sponsors" value="true" unchecked-value="false"></b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2"><label for="input-twitter">Giveaway:</label></b-col>
            <b-col sm="2">
              <b-form-input id="input-giveaway" size="sm" type="text" placeholder="Gleam URL" v-model="streamer.giveawayurl"></b-form-input>
            </b-col>
          </b-row>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-container>
    </div>
  </div>
  <!-- // Edit -->
</b-container>
</template>

<script>
export default {
  name: 'Streamers',
  data() {
    return {
      streamer: {},
      username: '',
      numOptions: [{
          value: '1',
          text: '1'
        },
        {
          value: '2',
          text: '2'
        },
        {
          value: '3',
          text: '3'
        },
        {
          value: '4',
          text: '4'
        },
        {
          value: '5',
          text: '5'
        },
        {
          value: '6',
          text: '6'
        },
        {
          value: '7',
          text: '7'
        },
        {
          value: '8',
          text: '8'
        }
      ]
    }
  },
  methods: {
    fetchStreamer(id) {
      this.$http.get('http://streamsiteb/api/streamer/' + id)
        .then(function(response) {
          this.streamer = response.body
          this.username = response.body.twitch
        });
    },
    editStreamer(e) {
      let updStreamer = {
        twitch: this.streamer.twitch,
        vids_number: this.streamer.vids_number,
        donation: this.streamer.donation,
        giveawayurl: this.streamer.giveawayurl,
        vods: this.streamer.vods,
        highlights: this.streamer.highlights,
        header: this.streamer.header,
        sponsors: this.streamer.sponsors
      }
      this.$http.put('http://streamsiteb/api/streamer/' + this.$route.params.id + '/update', updStreamer)
        .then((response) => {
          alert('Streamer Edited');
        });
      e.preventDefault();
    },
  },
  created: function() {
    this.fetchStreamer(this.$route.params.id);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
