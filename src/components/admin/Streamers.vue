<template>
  <div class="streamers">
    <b-container>
      <div class="streamer-list">
        <h1>Manage Streamers</h1>
        <b-table striped hover :items="streamers" :fields="fields">
          <template slot="actions" slot-scope="row">
            <b-button size="sm" @click.stop="row.toggleDetails">
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>
          </template>
          <template slot="row-details" slot-scope="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
              </ul>
              <b-button size="sm" class="btn-danger" @click.stop="deleteStreamer(row.item.id)">
                Delete
              </b-button>
            </b-card>
          </template>
        </b-table>
      </div>
  </b-container>
  </div>
</template>

<script>
export default {
  name: 'Streamers',
  data () {
    return {
      streamers: [],
      fields: {
        id: {
          label: 'ID'
        },
        twitch: {
          label: 'Twitch'
        },
        twitter: {
          label: 'Twitter'
        },
        vids_number: {
          label: 'Vids num'
        },
        actions: {
          label: 'Actions'
        },
      }
    }
  },
  methods: {
    fetchStreamers(){
      this.$http.get('http://streamsiteb/api/streamers')
        .then(function(response){
          this.streamers = response.body;
        });
      },
    deleteStreamer(id){
      this.$http.delete('http://streamsiteb/api/streamer/delete/'+id)
      .then(function(response){
        alert('Successfully deleted');
      });
      }
    },
  created: function(){
    this.fetchStreamers();
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
