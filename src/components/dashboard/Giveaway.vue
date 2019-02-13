<template>
<div class="giveaway">
  <vue-headful :title="title"/>
  <b-container>
    <h1 class="mt-2 title">Giveaway</h1>
    <hr>
    <p>You can integrate a <a href="https://gleam.io/?via=412790">Gleam.io</a> giveaway onto your site.</p>
    <p>Use the link above and create and account, then follow their instructions on how to customise your giveaway.</p>
    <p>Once you are happy with the entry methods, paste the link into the form below <b>(It should resemble the following : "https://gleam.io/LmJuq/your-giveaway" )</b></p>
    <b-row>
      <b-col cols="12" md="8" order-sm="2">
        <b-card class="ga-preview" text-variant="white" bg-variant="dark">
          <h3 slot="header">Giveaway preview</h3>
          <iframe :src="giveawayurl" class="ga-frame" frameborder="0" scrolling="yes" height="600" width="600"></iframe>
        </b-card>
      </b-col>
      <br>
      <b-col cols="12" md="4" order-sm="1">
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
        <br>
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
      title: 'Giveaway - StreamSite Admin',
      editGa: ''
    }
  },
  methods: {
    fetchGiveaway() {
      db.collection('streamers').doc(this.uid).get().then((doc) => {
        if (doc.exists) {
          this.giveawayurl = doc.data().giveaway
        } else {
          alert('An error has occurred')
        }
      })
    },
    editGiveaway(){
      if(this.editGa.includes('https://gleam.io/')) {
      db.collection('streamers').doc(this.uid).update({
            giveawayurl: this.editGa
          }).then(() => {
            this.$router.go({
              path: this.$router.path
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
iframe {
  display: block;
  width: 100%;
}
</style>
