<template>
<div class="settings">
  <vue-headful :title="title"/>
  <b-container>
    <div class="color-settings mt-2">
      <b-form @submit.prevent="editColors" v-if="colors">
        <h1 class="title">Colors</h1>
        <hr>
        <p>For the background image to load faster, we advise you to compress it via the website <a href="https://tinypng.com" target="_blank">Tinypng</a> and then upload the image to any image hosting site and paste the URL into the form below.</p>
        <p>The image cannot be any smaller than 1920x1080 to allow it to cover the whole page, otherwise design issues may occur.</p>
        <b-card-group deck>
          <b-card header="<b>Header Colors</b>" text-variant="white" bg-variant="dark">
            <b-list-group>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-header-bg"><b>Header Background</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-header-bg" size="sm" type="text" v-model="headerBg" v-bind:style="{background: headerBg}"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-header-text"><b>Header Text</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-header-text" size="sm" type="text" v-model="headerText" v-bind:style="{background: headerText}"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-social-icons"><b>Social Icons:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-social-icons" size="sm" type="text" v-model="socialIcon" v-bind:style="{background: socialIcon}"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-social-text"><b>Social Text:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-social-text" size="sm" type="text" v-model="socialText" v-bind:style="{background: socialText}"></b-form-input>
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
                  <label for="input-section-header-bg"><b>Section Header Background</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-section-header-bg" size="sm" type="text" v-model="titleBg" v-bind:style="{background: titleBg}"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-section-header-text"><b>Section Text</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-section-header-text" size="sm" type="text" v-model="titleText" v-bind:style="{background: titleText}"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-social-text"><b>Section Background :</b></label></b-col>
                <b-col sm="6">
                  <b-form-input id="input-section-bg" size="sm" type="text" v-model="sectionBg" v-bind:style="{background: sectionBg}"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            </b-list-group>
          </b-card>
          <!-- ### -->
          <b-card header="<b>Background Image</b>" text-variant="white" bg-variant="dark">
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-background-image"><b>Page Background</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-background-image" size="sm" type="text" v-model="bg"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-img :src="bg" class="bg-preview" fluid />
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
        <h1 class="title">Colors</h1>
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
                    <label for="input-header-text"><b>Header Text</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-header-text" size="sm" type="text" v-model="headerText"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-social-icons"><b>Social Icons:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-social-icons" size="sm" type="text" v-model="socialIcon"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-social-text"><b>Social Text:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-social-text" size="sm" type="text" v-model="socialText"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="6">
                    <label for="input-social-text"><b>Section Background :</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-section-bg" size="sm" type="text" v-model="sectionBg"></b-form-input>
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
                  <label for="input-header-bg"><b>Section Header Background</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-header-bg" size="sm" type="text" v-model="titleBg"></b-form-input>

                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item class="list-bg">
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-section-text"><b>Section Text</b></label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-section-text" size="sm" type="text" v-model="titleText"></b-form-input>

                </b-col>
              </b-row>
            </b-list-group-item>
            </b-list-group>
          </b-card>
          <!-- ### -->
          <b-card header="<b>Background Image</b>" text-variant="white" bg-variant="dark">
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
      title: 'Colors - StreamSite Admin',
      headerBg: '',
      headerText: '',
      socialIcon: '',
      socialText: '',
      titleBg: '',
      titleText: '',
      sectionBg: '',
      bg: '',
      streamer: {}
    }
  },
  methods: {
    fetchColors() {
      db.collection('colors').doc(this.uid).get().then((doc) => {
        if (doc.exists) {
          this.colors = true
          this.headerBg = doc.data().headerBg
          this.headerText = doc.data().headerText
          this.socialIcon = doc.data().socialIcon
          this.socialText = doc.data().socialText
          this.titleBg = doc.data().titleBg
          this.titleText = doc.data().titleText
          this.sectionBg = doc.data().sectionBg
          this.bg = doc.data().bg
        } else {
          this.colors = false
        }
      })
    },
    editColors(){
      db.collection('colors').doc(this.uid).update({
            headerBg: this.headerBg,
            headerText: this.headerText,
            socialIcon: this.socialIcon,
            socialText: this.socialText,
            titleBg: this.titleBg,
            sectionBg: this.sectionBg,
            titleText: this.titleText,
            bg: this.bg
      }).then(() => {
        this.$router.go({
          path: this.$router.path
        })
      })
    },
    addColors(){
      db.collection('colors').doc(this.uid).set({
            headerBg: this.headerBg,
            headerText: this.headerText,
            socialIcon: this.socialIcon,
            socialText: this.socialText,
            titleBg: this.titleBg,
            titleText: this.titleText,
            sectionBg: this.sectionBg,
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
.bg-preview {
  max-height: 180px;
  max-width: 180px;
}

input {
  color: black;
  text-shadow: 1px 1px 2px white;
}
input:focus {
  color: black;
  text-shadow: 1px 1px 2px white;
}

</style>
