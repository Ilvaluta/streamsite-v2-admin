<template>
  <div class="dashboard">
    <b-container>
      <h1 class="mt-2">Dashboard</h1>
      <p class="warning">Please keep in mind StreamSite is still in it's "alpha" phase, so alot more features will be added in the future.</p>
      <hr>
      <div class="initialize" v-if="noDoc">
        <h3>Please initialize your account by filling in the form below</h3>
        <b-form @submit.prevent="initStreamer">
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
      </div>
      <!-- End of if no doc -->
      <div class="something">
        <b-row>
          <b-col cols="8">
            <b-card class="list-bg">
              <b-card bg-variant="dark">
              <h5>Placeholder (Kind of)</h5>
              <hr>
              <p>I plan to add analytics here for you to see how many people have interacted with the different parts of the site.<br>For example, how many people click to view what time of highlights/vods, how many people click the sponsor links.<br>This will be added in a future update.</p>
              </b-card>
            <hr>
              <b-card bg-variant="dark">
                <h5>Feedback</h5>
                <hr>
                <p>Any feedback you have is appreciated, whether it's something you like, don't like or want added, it all helps and I am thankful for all of it.</p>
                <p>For the moment if you wouldn't mind emailing <a href="mailto:feedback@esjem.net">feedback@esjem.net</a></p>
                <p>I'll add more ways to submit feedback soon™</p>
              </b-card>
            </b-card>
          </b-col>
        <b-col>
          <div class="updates">
            <p>During the "Alpha" period of StreamSite, you will be able to see the recent changes in the section below.</p>
            <b-card bg-variant="light" text-variant="dark">
              <h5 slot="header">Recent Changes</h5>
              <b-card-body>
                <b-list-group v-for="u in recentUpdates" key="u.text">
                  <b-list-group-item class="update-bg mt-1">{{u.text}}</b-list-group-item>
                </b-list-group>
              </b-card-body>
              <div class="update-footer">
                <hr>
                <p>Last update - {{updateDate}}</p>
              </div>
            </b-card>
          </div>
        </b-col>
    </b-row>
  </div>
    </b-container>
  </div>
</template>

<script>
import db from '../firebaseInit'
import firebase from 'firebase/app'

export default {
  name: 'Dashboard',
  props: ['uid'],
  data () {
    return {
      noDoc: true,
      recentUpdates: [],
      updateDate: '24/09/18',
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
    check(){
      let user = firebase.auth().currentUser
      if(user) {
        let uid = user.uid
        db.collection('streamers').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            if(doc.data().streamer_id != null || doc.data().streamer_id != '') {
              this.noDoc = false
            } else {
              this.noDoc = true
            }
          })
        })
        }
      },
      initStreamer() {
        db.collection('streamers').add({
          streamer_id: firebase.auth().currentUser.uid,
          header: this.streamer.header,
          twitch: this.streamer.twitch,
          vods: this.streamer.vods,
          vids_num: this.streamer.vids_num,
          highlights: this.streamer.highlights,
          sponsors: this.streamer.sponsors,
          donation: this.streamer.donation,
          twitter: '',
          instagram: ''
        }).then(() => {
          this.$router.push('/settings')
        })
      },
      fetchUpdates() {
        db.collection('updates').doc('Date').get().then(doc => {
          if(doc.exists) {
            this.updateDate = doc.data().updateDate
          } else {
            console.log('An error has occured with retrieving the update date.')
          }
        }).then(() => {
          db.collection('updates').where('date', '==', this.updateDate).get().then(querySnapshot => {
            querySnapshot.forEach((doc) => {
              const update = {
                'text': doc.data().text
              }
              this.recentUpdates.push(update)
            })
          })
        })
      },
    },
  created: function(){
    this.check()
    this.fetchUpdates()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.update-bg {
  background: #dbdbdb;
}

.update-footer {
  margin: 0 0 -8px 0;
  padding: 0;
  font-style: italic;
}

</style>
