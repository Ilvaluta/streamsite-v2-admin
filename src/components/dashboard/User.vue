<template>
<div class="settings">
  <vue-headful :title="title"/>
  <b-container>
    <div class="streamer-settings mt-2">
      <b-form @submit.prevent="updateUsr">
        <h1 class="title">Account Settings</h1>
        <hr>
        <b-card-group deck>
          <b-card header="<b>Main Settings ( More will become available when features are added )</b>" text-variant="white" bg-variant="dark">
            <b-list-group>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-email"><b>Email</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input required id="input-email" size="sm" type="email" placeholder="Email" v-model="updUsr.email"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-current-password"><b>Current Password:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input required id="input-current-password" size="sm" type="password" placeholder="Current Password" v-model="updUsr.currentPassword"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-password"><b>Password:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-password" size="sm" type="password" placeholder="New Password" v-model="updUsr.newPassword"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item class="list-bg">
                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="input-password-check"><b>Password-check:</b></label></b-col>
                  <b-col sm="6">
                    <b-form-input id="input-password-check" size="sm" type="password" placeholder="New Password" v-model="passwordCheck"></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>

            <div class="password-check" v-if="noMatch"><hr><b-alert variant="danger" show>Passwords do not match !</b-alert></div>
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
          </b-card>
        </b-card-group>
        <!-- <div class="updated pt-2"><p>Last updated - {{update}}</p></div> -->
        <hr>
        <b-button type="submit" variant="blue">Update</b-button>
      </b-form>
    </div>
  </b-container>
</div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'User',
  data() {
    return {
      error: '',
      noMatch: false,
      passwordCheck: '',
      title: 'User - StreamSite Admin',
      updUsr: {
        email : '',
        newPassword: '',
        currentPassword: ''
      }
    }
  },
  methods: {
    fetchUsr() {
      if(firebase.auth().currentUser){
        this.updUsr.email = firebase.auth().currentUser.email
      }
    },
    updateUsr() {
            if(this.noMatch == false) {
      let user = firebase.auth().currentUser
      const credential = firebase.auth().emailAuthProvider.credential(firebase.auth().currentUser.email, this.updUsr.currentPassword)
      user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
        user.updateEmail(this.updUsr.email)
        user.updatePassword(this.updUsr.newPassword)
      }).catch(error => {
        this.error = err.message
      })
    }
    },
    passCheck(){
      if(this.updUsr.newPassword != this.passwordCheck) {
        this.noMatch = true
      } else {
        this.noMatch = false
      }
    }
  },
  created: function(){
    // this.fetchUsr()
  },
  updated: function(){
    this.passCheck()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.password-check{

}

</style>
