<template>
<div class="social">
  <b-container>
    <div class="social-settings mt-2">
      <b-form @submit.prevent="editSocial">
        <h1>Settings</h1>
        <hr>
        <b-card-group deck>
          <b-card header="<b>Social Settings</b>" text-variant="white" bg-variant="dark">
            <p class="card-text">To show the Instagram feed on your site, you need to provide an access code.</p>
            <p class="card-text">This can be done by clicking "Generate Access Token" on the following link <a href="http://instagram.pixelunion.net">http://instagram.pixelunion.net</a></p>
            <p class="card-text">To not show either the Instagram or Twitter section, leave the forms empty.</p>
            <b-list-group>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-header"><b>Instagram :</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-header" size="sm" type="text" placeholder="Header" v-model="instagram"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-donation"><b>Twitter :</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-donation" size="sm" type="text" placeholder="Donation URL" v-model="twitter"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
        <!-- <div class="updated pt-2"><p>Last updated - {{update}}</p></div> -->
        <hr>
        <b-button type="submit" variant="blue">Save</b-button>
      </b-form>
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
      instagram: '',
      twitter: ''
    }
  },
  methods: {
    fetchSocial() {
      db.collection('streamers').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.instagram = doc.data().instagram
          this.twitter = doc.data().twitter
        })
      })
    },
    editSocial(){
      db.collection('streamers').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            instagram: this.instagram,
            twitter: this.twitter,
          }).then(() => {
            this.$router.push('/social')
          })
        })
      })
    },

  },
  created: function(){
    this.fetchSocial()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
