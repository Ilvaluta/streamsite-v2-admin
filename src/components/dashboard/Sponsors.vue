<template>
<div class="sponsors">
  <vue-headful :title="title"/>
  <b-container>
    <div class="sponsor-list mt-2">
      <h1 class="title">Sponsors</h1>
      <p class="warning">I'm aware this page isn't responsive and may appear broken on mobile.  It is being worked on.</p>
      <b-table striped hover :items="sponsors" :fields="fields" class="sponsorTable">
        <template slot="edit" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
           {{ row.detailsShowing ? 'Hide' : 'Show'}} Edit
          </b-button>
            <!-- In some circumstances you may need to use @click.native.stop instead -->
        </template>
        <template slot="row-details" slot-scope="row">
          <b-form v-on:submit.prevent="editSponsor(row.item.id)">
            <b-card text-variant="white" bg-variant="dark">
              <b-list-group>
                <!-- Edit Name -->
                <b-list-group-item class="list-bg">
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-name"><b>Name:</b></label></b-col>
                    <b-col sm="6">
                      <b-form-input id="input-name" size="sm" type="text" :placeholder="row.item.name" v-model="editSpon.name"></b-form-input>
                    </b-col>
                  </b-row>
                </b-list-group-item>
                <!-- Edit URL -->
                <b-list-group-item class="list-bg">
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-url"><b>URL:</b></label></b-col>
                    <b-col sm="6">
                      <b-form-input id="input-url" size="sm" type="text" :placeholder="row.item.url" v-model="editSpon.url"></b-form-input>
                    </b-col>
                  </b-row>
                </b-list-group-item>
                <!-- Edit Image -->
                <b-list-group-item class="list-bg">
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-img"><b>Image:</b></label></b-col>
                    <b-col sm="6">
                      <b-form-input id="input-img" size="sm" type="text" :placeholder="row.item.img" v-model="editSpon.img"></b-form-input>
                    </b-col>
                  </b-row>
                </b-list-group-item>
                <b-list-group-item class="list-bg">
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-txt"><b>Text:</b></label></b-col>
                    <b-col sm="6">
                      <b-form-input id="input-txt" size="sm" type="text" :placeholder="row.item.txt" v-model="editSpon.txt"></b-form-input>
                    </b-col>
                  </b-row>
                </b-list-group-item>
              </b-list-group>
            </b-card>
            <hr>
            <b-button type="submit" variant="blue">Save</b-button>
          </b-form>
        </template>
        <template slot="delete" slot-scope="row">
          <b-button size="sm" class="btn-danger" @click.stop="deleteSponsor(row.item.id)">
            Delete
          </b-button>
        </template>
        </b-table>
      </div>
      <b-row>
        <b-col cols="8">
      <div class="sponsor-preview mt-4">
        <h3 class="title">Previews</h3>
        <hr>
        <ul>
          <li v-for="s in sponsors"><b-card :header="s.name" text-variant="white" bg-variant="dark"><a :href="s.url"><img :src="s.img"></a><p class="card-text">{{s.txt}}</p></b-card></li>
        </ul>
      </div>
    </b-col>
      <hr>
      <!-- Add -->
      <b-col cols="4">
      <div class="sponsor-add mt-4">
        <h3 class="title">Add a sponsor</h3>
        <hr>
        <div class="forms">
          <b-card text-variant="white" bg-variant="dark">
            <b-form @submit.prevent="addSponsor">
              <label for="input-name">Name:</label>
                <b-form-input id="input-name" size="sm" type="text" placeholder="Sponsors name" v-model="sponsor.name"></b-form-input>
              <label for="input-url" class="mt-2">URL:</label>
                <b-form-input id="input-url" size="sm" type="text" placeholder="Sponsor's URL" v-model="sponsor.url"></b-form-input>
              <label for="input-img" class="mt-2">Image:</label>
                <b-form-input id="input-img" size="sm" type="text" placeholder="Sponsor's image" v-model="sponsor.img"></b-form-input>
                <label for="input-txt" class="mt-2">Image:</label>
                  <b-form-input id="input-txt" size="sm" type="text" placeholder="Sponsor's text" v-model="sponsor.txt"></b-form-input>
            <b-button type="submit" variant="blue" class="mt-2">Add sponsor</b-button>
          </b-form>
        </b-card>
        </div>
      </div>
    </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import db from '../firebaseInit'

export default {
  name: 'Sponsors',
  props: ['uid'],
  data() {
    return {
      sponsors: [],
      sponsor: {},
      title: 'Sponsors - StreamSite Admin',
      editSpon: {},
      fields: {
        name: {
          label: 'Name',
          sortable: true
        },
        url: {
          label: 'URL',
          sortable: true
        },
        img: {
          label: 'Img',
          sortable: true
        },
        txt: {
          label: 'Text',
          sortable: false
        },
        id: {
          label: 'ID',
          sortable: true
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
    fetchSponsors() {
      db.collection('sponsors').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          const sponsor = {
            'id': doc.id,
            'name': doc.data().name,
            'url': doc.data().url,
            'img': doc.data().img,
            'txt': doc.data().text
          }
          this.sponsors.push(sponsor)
        })
      })
    },
    editSponsor(id) {
      db.collection('sponsors').doc(id).onSnapshot(doc => {
        doc.ref.update({
          name: this.editSpon.name,
          url: this.editSpon.url,
          img: this.editSpon.img,
          txt: this.editSpon.txt
        })
      })
    },
    deleteSponsor(id) {
      if (confirm('Are you sure ?')) {
        db.collection('sponsors').doc(id).onSnapshot(doc => {
          doc.ref.delete()
        }).then(() => {
          this.$router.go({
            path: this.$router.path
          })
        })
      }
    },
    addSponsor() {
      db.collection('sponsors').add({
        streamer_id: this.uid,
        name: this.sponsor.name,
        url: this.sponsor.url,
        img: this.sponsor.img,
        txt: this.sponsor.txt
      }).then(clear => {
        this.sponsor.name = '',
          this.sponsor.url = '',
          this.sponsor.img = '',
          this.sponsor.txt = '',
          this.$router.go({
            path: this.$router.path
          })
      })
    },
  },
  created: function() {
    this.fetchSponsors();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sponsor-preview>ul>li {
  list-style: none;
  display: inline-block;
  padding: 8px;
  margin: 8px;
}
.sponsorTable {
  margin-top: 16px;
  color: rgb(207, 210, 218);
}
/* .sponsor-preview > ul > li > p {
  text-align: center;
} */

</style>
