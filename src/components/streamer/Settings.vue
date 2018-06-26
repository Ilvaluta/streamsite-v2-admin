<template>
<div class="settings">
  <b-container>
    <div class="streamer-settings">
      <b-form @submit="editStreamer">
        <h1>Manage your settings</h1>
        <hr>
        <b-card-group deck>
          <b-card header="<b>Main Settings</b>">
            <b-list-group>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-twitch"><b>Twitch:</b></label></b-col>
                  <b-col sm="4">
                    <b-form-input id="input-twitch" size="sm" type="text" placeholder="Enter your username" v-model="streamer.twitch"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-twitter"><b>Twitter:</b></label></b-col>
                  <b-col sm="4">
                    <b-form-input id="input-twitter" size="sm" type="text" placeholder="Enter your username" v-model="streamer.twitter"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
            <div slot="footer">
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </b-card>
          <b-card header="<b>Video Settings</b>">
            <b-list-group>
              <b-list-group-item><b>Show Highlights :</b>
                <b-form-checkbox-group v-model="selected" name="highlights"></b-form-checkbox-group>
              </b-list-group-item>
              <b-list-group-item><b>Show Broadcasts : </b>
                <b-form-checkbox-group v-model="selected" name="broadcasts"></b-form-checkbox-group>
              </b-list-group-item>
              <b-list-group-item><b>How many of each : </b>
                <b-row class="my-1">
                  <b-col sm="5"><label for="input-num">Number of videos to show :</label></b-col>
                  <b-col sm="3">
                    <b-form-select v-model="streamer.vids_number" :options="options" class="mb-3" />
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
            <div slot="footer">
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </b-card>
        </b-card-group>
        <hr>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </div>
  </b-container>
</div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      streamer: '',
      selected: [],
      options: [{
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
          this.streamer = response.body;
        });
    },
    editStreamer(e) {
      let updStreamer = {
        id: this.streamer.id,
        twitch: this.streamer.twitch,
        twitter: this.streamer.twitter,
        vids_number: this.streamer.vids_number
      }
      this.$http.put('http://streamsiteb/api/streamer/update', updStreamer)
        .then((response) => {
          alert('Streamer Edited');
        });
      e.preventDefault();
    },
  },
  created: function() {
    this.fetchStreamer(this.$route.query.id);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
