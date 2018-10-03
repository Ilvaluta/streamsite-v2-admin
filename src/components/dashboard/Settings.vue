<template>
<div class="settings">
  <b-container>
    <div class="streamer-settings mt-2">
      <b-form @submit.prevent="editStreamer">
        <h1>Settings</h1>
        <hr>
        <div class="warning">
          <p>To show Youtube vids you need to input your YT channel ID and NOT your username.</p>
          <p>Go to <a href="https://commentpicker.com/youtube-channel-id.php" target="_blank">https://commentpicker.com/youtube-channel-id.php</a> to get your ID.</p>
        </div>
        <b-card-group deck>
          <b-card header="<b>Main Settings</b>" text-variant="white" bg-variant="dark">
            <b-list-group>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-header"><b>Header</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-header" size="sm" type="text" placeholder="Header" v-model="streamer.header"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-twitch"><b>Twitch:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-twitch" size="sm" type="text" placeholder="Enter your username" v-model="streamer.twitch"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-youtube"><b>Youtube<span style="color:red;">*</span>:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-youtube" size="sm" type="text" placeholder="Enter your YT ID" v-model="streamer.youtube"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-donation"><b>Donation:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-donation" size="sm" type="text" placeholder="Donation URL" v-model="streamer.donation"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <!-- ### -->
          <b-card header="<b>Video Settings</b>" text-variant="white" bg-variant="dark">
            <b-list-group>
              <b-list-group-item class="list-bg"><b>Show Highlights :</b>
                <b-form-checkbox class="pt-2" id="checkboxHighlights"
                     v-model="streamer.highlights"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
              </b-list-group-item>
              <b-list-group-item class="list-bg"><b>Show Broadcasts : </b>
                <b-form-checkbox class="pt-2" id="checkboxVods"
                     v-model="streamer.vods"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
              </b-list-group-item>
              <b-list-group-item class="list-bg"><b>Show Youtube Vids : </b>
                <b-form-checkbox class="pt-2" id="checkboxYt"
                     v-model="streamer.showYt"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
              </b-list-group-item>
              <b-list-group-item class="list-bg"><b>How many of each to show: </b>
                <b-row class="my-1">
                  <b-col sm="3">
                    <b-form-select v-model="streamer.vids_num" :options="options" class="mb-3" />
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg"><b>Show Sponsors : </b>
                <b-form-checkbox class="pt-2" id="checkboxSponsors"
                     v-model="streamer.sponsors"
                     value="true"
                     unchecked-value="false"></b-form-checkbox>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
        <!-- <div class="updated pt-2"><p>Last updated - {{update}}</p></div> -->
        <hr>
        <b-button type="submit" variant="blue">Save</b-button>
      </b-form>
      <b-alert :show="successCd"
         dismissible
         variant="success"
         @dismissed="successCd=0">
  Successfully submitted
</b-alert>
    </div>
  </b-container>
</div>
</template>

<script>
import db from '../firebaseInit'

export default {
  name: 'Settings',
  props: ['uid'],
  data() {
    return {
      streamer: {},
      successSecs: 5,
      successCd: 0,
      errorSecs: 5,
      errorCd: 0,
      error: '',
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
      db.collection('streamers').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.streamer = doc.data()
        })
      })
    },
    editStreamer(){
      db.collection('streamers').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
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
            showYt: this.streamer.showYt,
            youtube: this.streamer.youtube
          })
        })
      })
    },
    showSuccess(){
      this.successCd = this.successSecs
    },
    showError(){
      this.errorCd = this.errorSecs
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
