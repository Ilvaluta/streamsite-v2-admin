<template>
  <div class="giveaway">
    <b-container>
      <h1>Manage your giveaway</h1>
      <hr>
      <div class="ga-preview">
        <a class="e-widget no-button" href="https://gleam.io/6FH24/your-giveaway" rel="nofollow">Your Giveaway</a>
      </div>
      <hr>
      <h5>{{giveawayurl}}</h5>
      <div id="ga-edit">
        <h3>Add/Edit giveaway</h3>
        <div class="forms">
          <b-container>
            <b-form @submit="addGiveaway">
            <b-row class="my-1">
              <b-col sm="2"><label for="input-url">URL:</label></b-col>
              <b-col sm="2">
                <b-form-input id="input-url" size="sm" type="text" placeholder="Gleam URL" v-model="giveaway.url"></b-form-input>
              </b-col>
            </b-row>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
          </b-container>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {

  name: 'Giveaway',
  data () {
    return {
      giveawayurl: '',
      giveaway: {}
    }
  },
  methods: {
    fetchGiveaway(id){
        this.$http.get('http://streamsiteb/api/streamer/'+id)
          .then(function(res) {
            if (res.body.donation != null) {
              this.giveawayurl = res.body.giveawayurl;
            } else {
              this.giveawayurl = false;
            }
          });
    },
    addGiveaway(e){
      let newGiveaway = {
        url: this.giveaway.url
      }
      this.$http.post('http://streamsiteb/api/streamer/' + this.$route.params.id + '/giveaway/add', newGiveaway)
        .then((response) => {
          alert('Giveaway Added');
        });
        e.preventDefault();
    }
  },
  created: function(){
    this.fetchGiveaway(this.$route.params.id);
  },
  updated: function(){
    this.fetchGiveaway(this.$route.params.id);
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
