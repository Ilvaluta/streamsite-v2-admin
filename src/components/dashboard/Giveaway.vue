<template>
<div class="giveaway">
  <b-container>
    <h1 class="mt-2">Giveaway</h1>
    <hr>
    <p>You can integrate a <a href="https://gleam.io/?via=412790">Gleam.io</a> giveaway onto your site.</p>
    <p>Use the link above and create and account, then follow their instructions on how to customise your giveaway.</p>
    <p>Once you are happy with the entry methods, paste the link into the form below <b>(It should resemble the following : "https://gleam.io/LmJuq/your-giveaway" )</b></p>
    <b-row>
      <b-col>
        <b-card class="ga-preview" text-variant="white" bg-variant="dark">
          <h3 slot="header">Giveaway preview</h3>
          <iframe :src="giveawayurl" class="ga-frame" frameborder="0" scrolling="yes" height="600" width="600"></iframe>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="ga-edit" text-variant="white" bg-variant="dark">
          <h3 slot="header">Edit giveaway</h3>
          <b-card-body class="list-bg">
              <b-form @submit.prevent="editGiveaway">
                <label for="input-url">URL:</label>
                    <b-form-input id="input-url" size="sm" type="text" :placeholder="giveawayurl" v-model="editGa"></b-form-input>
                    <hr>
                    <b-button type="submit" variant="blue">Submit</b-button>
              </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import db from '../firebaseInit'

export default {
  props: ['uid'],
  name: 'Giveaway',
  data() {
    return {
      giveawayurl: '',
      editGa: ''
    }
  },
  methods: {
    fetchGiveaway() {
      db.collection('streamers').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.giveawayurl = doc.data().giveawayurl
        })
      })
    },
    editGiveaway(){
      if(this.editGa.includes('https://gleam.io/')) {
      db.collection('streamers').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            giveawayurl: this.editGa
          }).then(() => {
            this.$router.push('/giveaway')
          })
        })
      })
    } else {
      alert('Please enter a gleam.io url')
    }
    }
  },
  created: function(){
    this.fetchGiveaway()
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
