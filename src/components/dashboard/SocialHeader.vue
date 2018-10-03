<template>
<div class="socials">
  <b-container>
    <div class="social-list mt-2">
      <h1>Social</h1>
      <b-table striped hover :items="socials" :fields="fields" class="socialTable">
        <template slot="edit" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
           {{ row.detailsShowing ? 'Hide' : 'Show'}} Edit
          </b-button>
            <!-- In some circumstances you may need to use @click.native.stop instead -->
        </template>
        <template slot="row-details" slot-scope="row">
          <b-form v-on:submit.prevent="editSocial(row.item.id)">
            <b-card text-variant="white" bg-variant="dark">
              <b-list-group>
                <!-- Edit Name -->
                <b-list-group-item class="list-bg">
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-name"><b>Name:</b></label></b-col>
                    <b-col sm="6">
                      <b-form-input id="input-name" size="sm" type="text" :placeholder="row.item.name" v-model="editSoc.name"></b-form-input>
                    </b-col>
                  </b-row>
                </b-list-group-item>
                <!-- Edit URL -->
                <b-list-group-item class="list-bg">
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-url"><b>URL:</b></label></b-col>
                    <b-col sm="6">
                      <b-form-input id="input-url" size="sm" type="text" :placeholder="row.item.url" v-model="editSoc.url"></b-form-input>
                    </b-col>
                  </b-row>
                </b-list-group-item>
                <!-- Edit Image -->
                <b-list-group-item class="list-bg">
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-img"><b>Icon:</b></label></b-col>
                    <b-col sm="6">
                      <b-form-input id="input-img" size="sm" type="text" :placeholder="row.item.icon" v-model="editSoc.icon"></b-form-input>
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
          <b-button size="sm" class="btn-danger" @click.stop="deleteSocial(row.item.id)">
            Delete
          </b-button>
        </template>
        </b-table>
      </div>
      <b-row>
        <b-col cols="8">
      <div class="social-preview mt-4">
        <h3>Previews</h3>
        <hr>
        <ul>
          <li v-for="s in socials"><b-card :header="s.name" text-variant="white" bg-variant="dark"><a :href="s.url"><i :class="s.icon"></i></a></b-card></li>
        </ul>
      </div>
    </b-col>
      <hr>
      <!-- Add -->
      <b-col cols="4">
      <div class="social-add mt-4">
        <h3>Add a Social link</h3>
        <hr>
        <div class="forms">
          <b-card text-variant="white" bg-variant="dark">
            <b-form @submit.prevent="addSocial">
              <label for="input-name">Name:</label>
                <b-form-input id="input-name" size="sm" type="text" placeholder="Name" v-model="social.name"></b-form-input>
              <label for="input-url" class="mt-2">URL:</label>
                <b-form-input id="input-url" size="sm" type="text" placeholder="URL" v-model="social.url"></b-form-input>
              <label for="input-img" class="mt-2">Icon:</label>
                <b-form-input id="input-img" size="sm" type="text" placeholder="Icon" v-model="social.icon"></b-form-input>
            <b-button type="submit" variant="blue" class="mt-2">Add social link</b-button>
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
  props: ['uid'],
  name: 'Sponsors',
  data() {
    return {
      socials: [],
      social: {},
      editSoc: {},
      fields: {
        name: {
          label: 'Name',
          sortable: true
        },
        url: {
          label: 'URL',
          sortable: true
        },
        icon: {
          label: 'Icon',
          sortable: true
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
    fetchSocials() {
      db.collection('social').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          const social = {
            'id': doc.id,
            'name': doc.data().name,
            'url': doc.data().url,
            'icon': doc.data().icon
          }
          this.socials.push(social)
        })
      })
    },
    editSocial(id) {
      db.collection('social').doc(id).onSnapshot(doc => {
        doc.ref.update({
          name: this.editSoc.name,
          url: this.editSoc.url,
          icon: this.editSoc.icon
        })
      })
    },
    deleteSocial(id) {
      if (confirm('Are you sure ?')) {
        db.collection('social').doc(id).onSnapshot(doc => {
          doc.ref.delete()
        })
      }
    },
    addSocial() {
      db.collection('social').add({
        streamer_id: this.uid,
        name: this.social.name,
        url: this.social.url,
        icon: this.social.icon
      }).then(clear => {
        this.social.name = '',
          this.social.url = '',
          this.social.icon = '',
          this.$refs.socialTable.refresh()
      })
    },
  },
  created: function() {
    this.fetchSocials();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.social-preview>ul>li {
  list-style: none;
  display: inline-block;
  padding: 8px;
  margin: 8px;
}
.social-preview>ul>li>.card>.card-body>a>i {
  font-size: 3em;
  text-align: center;
}
.socialTable {
  margin-top: 16px;
  color: rgb(207, 210, 218);
}
/* .sponsor-preview > ul > li > p {
  text-align: center;
} */

</style>
