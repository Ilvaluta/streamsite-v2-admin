<template>
  <div class="sponsors">
    <b-container>
      <div class="sponsor-list mt-4">
        <h1>Manage Sponsors</h1>
        <b-table striped hover :items="sponsors" :fields="fields">
          <template slot="edit" slot-scope="row">
  <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
  <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
   {{ row.detailsShowing ? 'Hide' : 'Show'}} Edit
  </b-button>
  <!-- In some circumstances you may need to use @click.native.stop instead -->
</template>

<template slot="row-details" slot-scope="row">
  <b-form v-on:submit.prevent="editSponsor(row.item.sponid)">
  <b-card>
    <b-list-group>
      <!-- Edit Name -->
      <b-list-group-item>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-name"><b>Name:</b></label></b-col>
          <b-col sm="6">
            <b-form-input id="input-name" size="sm" type="text" :placeholder="row.item.name" v-model="editSpon.name"></b-form-input>
          </b-col>
        </b-row>
      </b-list-group-item>
      <!-- Edit URL -->
      <b-list-group-item>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-url"><b>URL:</b></label></b-col>
          <b-col sm="6">
            <b-form-input id="input-url" size="sm" type="text" :placeholder="row.item.url" v-model="editSpon.url"></b-form-input>
          </b-col>
        </b-row>
      </b-list-group-item>
      <!-- Edit Image -->
      <b-list-group-item>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-img"><b>Image:</b></label></b-col>
          <b-col sm="6">
            <b-form-input id="input-img" size="sm" type="text" :placeholder="row.item.img" v-model="editSpon.img"></b-form-input>
          </b-col>
        </b-row>
      </b-list-group-item>
</b-list-group>
  </b-card>
  <hr>
  <b-button type="submit" variant="primary">Save</b-button>
</b-form>
</template>

          <template slot="delete" slot-scope="row">
            <b-button size="sm" class="btn-danger" @click.stop="deleteSponsor(row.item.sponid)">
              Delete
            </b-button>
          </template>
        </b-table>
      </div>
      <hr>
      <div class="sponsor-preview mt-4">
        <h1>Previews</h1>
        <hr>
        <ul>
          <li v-for="s in sponsors"><b>{{s.id}} - </b><a :href="s.url"><img :src="s.img"></a></li>
        </ul>
      </div>
      <hr>
      <!-- Add -->
      <div id="sponsor-add">
        <h3>Add a sponsor</h3>
        <div class="forms">
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
      sponsor: {},
      editSpon: {},
      fields: {
        name: {
          label: 'Name'
        },
        url: {
          label: 'URL'
        },
        img: {
          label: 'Img'
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
        editSponsor(id){
          let updSponsor = {
            name: this.editSpon.name,
            url: this.editSpon.url,
            img: this.editSpon.img
          }
          this.$http.put('http://streamsiteb/api/streamer/' + this.$route.params.id + '/sponsors/edit/'+id, updSponsor)
            .then((response) => {
              alert('Sponsor Edited');
            });
        },
        deleteSponsor(id){
          this.$http.delete('http://streamsiteb/api/streamer/' + this.$route.params.id + '/sponsors/delete/'+id)
          .then(function(response){
            alert('Successfully deleted');
          });
          }
    },
  created: function(){
    this.fetchSponsors(this.$route.params.id);
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.sponsor-preview > ul > li {
  list-style: none;
  padding-top: 8px;
}

</style>
