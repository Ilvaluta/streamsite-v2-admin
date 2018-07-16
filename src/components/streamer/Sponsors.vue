<template>
  <div class="sponsors">
    <b-container>
      <div class="sponsor-list">
        <h1>Manage Sponsors</h1>
        <b-table striped hover :items="sponsors"></b-table>
      </div>
      <!-- Add -->
      <div id="sponsor-add">
        <h3>Add a sponsor</h3>
        <div class="forms">
          <b-container>
            <b-form @submit="addSponsor">
            <b-row class="my-1">
              <b-col sm="2"><label for="input-name">Name:</label></b-col>
              <b-col sm="2">
                <b-form-input id="input-name" size="sm" type="text" placeholder="Sponsors name" v-model="sponsor.name"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-url">URL:</label></b-col>
              <b-col sm="2">
                <b-form-input id="input-url" size="sm" type="text" placeholder="Sponsor's URL" v-model="sponsor.url"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2"><label for="input-img">Image:</label></b-col>
              <b-col sm="2">
                <b-form-input id="input-img" size="sm" type="text" placeholder="Sponsor's logo" v-model="sponsor.img"></b-form-input>
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
  name: 'Sponsors',
  data () {
    return {
      sponsors: [],
      sponsor: {}
    }
  },
  methods: {
    fetchSponsors(id){
      this.$http.get('http://streamsiteb/api/streamer/' + id + '/sponsors')
        .then(function(response){
          this.sponsors = response.body;
        });
      },
      addSponsor(e){
        let newSponsor = {
          name: this.sponsor.name,
          url: this.sponsor.url,
          img: this.sponsor.img
        }
        this.$http.post('http://streamsiteb/api/streamer/' + this.$route.params.id + '/sponsors/add', newSponsor)
          .then((response) => {
            alert('Sponsor Added');
          });
          e.preventDefault();
        },
    },
  created: function(){
    this.fetchSponsors(this.$route.params.id);
  },
  updated: function(){
    this.fetchSponsors(this.$route.params.id);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
