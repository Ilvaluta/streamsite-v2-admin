<template>
<div class="settings">
  <b-container>
    <div class="streamer-settings">
      <b-form @submit.prevent="editStreamer">
        <h1>Manage your settings</h1>
        <hr>
        <b-card-group deck>
          <b-card header="<b>Main Settings</b>">
            <b-list-group>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-header"><b>Header</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-header" size="sm" type="text" placeholder="Header" v-model="streamer.header"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-twitch"><b>Twitch:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-twitch" size="sm" type="text" placeholder="Enter your username" v-model="streamer.twitch"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-donation"><b>Donation:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-donation" size="sm" type="text" placeholder="Donation URL" v-model="streamer.donation"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-giveaway"><b>Giveaway:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-giveaway" size="sm" type="text" placeholder="Giveaway URL" v-model="streamer.giveawayurl"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
            <div slot="footer">
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </b-card>
          <!-- ### -->
          <b-card header="<b>Video Settings</b>">
            <b-list-group>
              <b-list-group-item><b>Show Highlights :</b>
                <b-form-checkbox id="checkboxHighlights"
                     v-model="streamer.highlights"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
              </b-list-group-item>
              <b-list-group-item><b>Show Broadcasts : </b>
                <b-form-checkbox id="checkboxVods"
                     v-model="streamer.vods"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
              </b-list-group-item>
              <b-list-group-item><b>How many of each : </b>
                <b-row class="my-1">
                  <b-col sm="5"><label for="input-num">Number of videos to show :</label></b-col>
                  <b-col sm="3">
                    <b-form-select v-model="streamer.vids_num" :options="options" class="mb-3" />
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item><b>Show Sponsors : </b>
                <b-form-checkbox id="checkboxSponsors"
                     v-model="streamer.sponsors"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
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
import db from '../firebaseInit'

export default {
  name: 'Settings',
  data() {
    return {
      streamer: {},
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
    fetchData() {
      db.collection('streamers').where('streamer_id', '==', this.$id).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.streamer = doc.data()
        })
      })
    },
    editStreamer(){
      db.collection('streamers').where('streamer_id', '==', this.$id).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            streamer_id: this.streamer.streamer_id,
            header: this.streamer.header,
            twitch: this.streamer.twitch,
            vods: this.streamer.vods,
            vids_num: this.streamer.vids_num,
            highlights: this.streamer.highlights,
            sponsors: this.streamer.sponsors,
            donation: this.streamer.donation,
            giveawayurl: this.streamer.giveawayurl
          }).then(() => {
            this.$router.push('/dashboard/settings')
          })
        })
      })
    }
  },
  created: function(){
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
