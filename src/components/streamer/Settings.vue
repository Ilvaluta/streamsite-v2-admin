<template>
  <div class="settings">
    <b-container>
      <div class="streamer-list">
        <h1>Manage your settings</h1>
        <hr>
        <b-card-group deck>
          <b-card header="<b>Main Settings</b>">
            <b-list-group>
              <b-list-group-item><b>Twitch username :</b> {{streamer.twitch}}</b-list-group-item>
              <b-list-group-item><b>Twitter username :</b> {{streamer.twitter}}</b-list-group-item>
            </b-list-group>
            <div slot="footer">
    <small class="text-muted">Last updated 3 mins ago</small>
</div>
          </b-card>
          <b-card header="<b>Video Settings</b>">
            <b-list-group>
              <b-list-group-item><b>Show Highlights :</b> <b-form-checkbox-group v-model="selected" name="highlights" :options="options"></b-form-checkbox-group></b-list-group-item>
              <b-list-group-item><b>Show Broadcasts : </b><b-form-checkbox-group v-model="selected" name="broadcasts" :options="options"></b-form-checkbox-group></b-list-group-item>
              <b-list-group-item><b>How many of each : </b>{{streamer.vids_number}}</b-list-group-item>
            </b-list-group>
            <div slot="footer">
    <small class="text-muted">Last updated 3 mins ago</small>
</div>
          </b-card>
        </b-card-group>
      </div>
  </b-container>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      streamer: '',
      selected: [],
      options: [
        {text: 'Yes', value: 'showhl'},
      ]
    }
  },
  methods: {
    fetchStreamer(id){
      this.$http.get('http://streamsiteb/api/streamer/'+id)
        .then(function(response){
          this.streamer = response.body;
        });
      },
    },
  created: function(){
    this.fetchStreamer(this.$route.query.id);
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
