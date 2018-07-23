<template>
  <div class="streamers">
    <b-container>
      <div class="streamer-list">
        <h1>Manage Streamers</h1>
        <b-table striped hover :items="streamers" :fields="fields">
          <template slot="edit" slot-scope="row">
            <router-link v-bind:to="'edit/' + row.item.id">
              <b-button size="sm" class="btn-warning">
                Edit
              </b-button>
            </router-link>
          </template>
          <template slot="delete" slot-scope="row">
            <b-button size="sm" class="btn-danger" @click.stop="deleteStreamer(row.item.id)">
              Delete
            </b-button>
          </template>
        </b-table>
      </div>
  </b-container>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
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
        edit: {
          label: 'Edit'
        },
        delete: {
          label: 'Delete'
        }
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
  updated: function(){
    this.fetchStreamers();
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
