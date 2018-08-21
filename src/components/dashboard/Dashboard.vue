<template>
  <div class="dashboard">
    <b-container>
      <h1>Dashboard</h1>
      <hr>
      {{test}}
    </b-container>
  </div>
</template>

<script>
import db from '../firebaseInit'

export default {
  name: 'Dashboard',
  data () {
    return {
      test: []
    }
  },
  created: function(){
    db.collection('streamers').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'streamer_id' : doc.data().streamer_id,
          'twitch' : doc.data().twitch,
          'vods' : doc.data().vods,
          'highlights' : doc.data().highlights,
          'vids_num' : doc.data().vids_num,
          'header' : doc.data().header,
          'donation' : doc.data().donation,
          'giveawayUrl' : doc.data().giveawayUrl,
          'sponsors' : doc.data().sponsors
        }
        this.test.push(data)
      })
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
