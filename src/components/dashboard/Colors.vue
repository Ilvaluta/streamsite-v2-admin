<template>
<div class="settings">
  <b-container>
    <div class="color-settings mt-2">
      <b-form @submit.prevent="editColors" v-if="colors">
        <h1>Settings</h1>
        <hr>
        <p>For the background image to load faster, we advise you to compress it via the website <a href="https://tinypng.com">Tinypng</a> and then upload the image to any image hosting site and paste the URL into the form below.</p>
        <p>The image cannot be any smaller than 1920x1080 to allow it to cover the whole page, otherwise design issues may occur.</p>
        <b-card-group deck>
          <b-card header="<b>Header Colors</b>" text-variant="white" bg-variant="dark">
            <b-list-group>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-header"><b>Header Background</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-header" size="sm" type="text" v-model="headerBg" v-bind:style="{background: headerBg}"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-twitch"><b>Header Text</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-twitch" size="sm" type="text" v-model="headerText" v-bind:style="{background: headerText}"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-donation"><b>Social Icons:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-donation" size="sm" type="text" v-model="socialIcon" v-bind:style="{background: socialIcon}"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-donation"><b>Social Text:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-donation" size="sm" type="text" v-model="socialText" v-bind:style="{background: socialText}"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <!-- ### -->

          <b-card header="<b>Section Settings</b>" text-variant="white" bg-variant="dark">
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-header"><b>Section Header Background</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-header" size="sm" type="text" v-model="titleBg" v-bind:style="{background: titleBg}"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-header"><b>Section Text</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-header" size="sm" type="text" v-model="titleText" v-bind:style="{background: titleText}"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            </b-list-group>
          </b-card>
          <!-- ### -->
          <b-card header="<b>General Settings</b>" text-variant="white" bg-variant="dark">
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-header"><b>Page Background</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-header" size="sm" type="text" v-model="bg"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <img :src="bg"/>
              </b-row>
            </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
        <!-- <div class="updated pt-2"><p>Last updated - {{update}}</p></div> -->
        <hr>
        <b-button type="submit" variant="blue">Save</b-button>
      </b-form>

      <!-- If initial colors need to added -->

      <b-form @submit.prevent="addColors" v-else>
        <h1>Settings</h1>
        <hr>
        <p>For the background image to load faster, we advise you to compress it via the website <a href="https://tinypng.com">Tinypng</a> and then upload the image to any image hosting site and paste the URL into the form below.</p>
        <p>The image cannot be any smaller than 1920x1080 to allow it to cover the whole page, otherwise design issues may occur.</p>
        <b-card-group deck>
          <b-card header="<b>Header Colors</b>" text-variant="white" bg-variant="dark">
            <b-list-group>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-header"><b>Header Background</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-header" size="sm" type="text" v-model="headerBg"></b-form-input>
                  </b-col>
                                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-twitch"><b>Header Text</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-twitch" size="sm" type="text" v-model="headerText"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-donation"><b>Social Icons:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-donation" size="sm" type="text" v-model="socialIcon"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-donation"><b>Social Text:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-donation" size="sm" type="text" v-model="socialText"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <!-- ### -->
          <b-card header="<b>Section Settings</b>" text-variant="white" bg-variant="dark">
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-header"><b>Section Header Background</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-header" size="sm" type="text" v-model="titleBg"></b-form-input>

                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-header"><b>Section Text</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-header" size="sm" type="text" v-model="titleText"></b-form-input>

                </b-col>
              </b-row>
            </b-list-group-item>
            </b-list-group>
          </b-card>
          <!-- ### -->
          <b-card header="<b>General Settings</b>" text-variant="white" bg-variant="dark">
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-header"><b>Page Background</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-header" size="sm" type="text" v-model="bg"></b-form-input>
                    </b-col>
              </b-row>
            </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
        <!-- <div class="updated pt-2"><p>Last updated - {{update}}</p></div> -->
        <hr>
        <b-button type="submit" variant="blue">Add</b-button>
      </b-form>
    </div>
  </b-container>
</div>
</template>

<script>
import db from '../firebaseInit'

export default {
  name: 'Colors',
  props: ['uid'],
  data() {
    return {
      colors: false,
      color: '#333',
      headerBg: '',
      headerText: '',
      socialIcon: '',
      socialText: '',
      titleBg: '',
      titleText: '',
      bg: '',
      streamer: {}
    }
  },
  methods: {
    fetchColors() {
      db.collection('colors').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          if(doc.data().streamer_id != null || doc.data().streamer_id != '') {
            this.colors = true
            this.headerBg = doc.data().headerBg
            this.headerText = doc.data().headerText
            this.socialIcon = doc.data().socialIcon
            this.socialText = doc.data().socialText
            this.titleBg = doc.data().titleBg
            this.titleText = doc.data().titleText
            this.bg = doc.data().bg
          } else {
            this.colors = false
          }
        })
      })
    },
    editColors(){
      db.collection('colors').where('streamer_id', '==', this.uid).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            headerBg: this.headerBg,
            headerText: this.headerText,
            socialIcon: this.socialIcon,
            socialText: this.socialText,
            titleBg: this.titleBg,
            titleText: this.titleText,
            bg: this.bg
          }).then(() => {
            this.$router.push('/colors')
          })
        })
      })
    },
    addColors(){
      db.collection('colors').add({
            headerBg: this.headerBg,
            headerText: this.headerText,
            socialIcon: this.socialIcon,
            socialText: this.socialText,
            titleBg: this.titleBg,
            titleText: this.titleText,
            bg: this.bg,
            streamer_id: this.uid
          }).then(() => {
            this.$router.push('/colors')
          })
    }
  },
  created: function(){
    this.fetchColors()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  color: black;
  text-shadow: 1px 1px 2px white;
}
input:focus {
  color: black;
  text-shadow: 1px 1px 2px white;
}
</style>
