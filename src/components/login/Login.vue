<template>
  <div class="login">
    <b-container>
      <h2>Please log in to access this page</h2>
      <hr>
      <b-row class="mt-5">
        <b-col cols="4" offset="4">
          <b-form v-on:submit.prevent="login">
            <label class="sr-only" for="inputEmail">Email</label>
            <b-input v-model="email" type="email" class="mb-2 mr-sm-2 mb-sm-0" id="inputEmail" placeholder="Email" />
            <label class="sr-only" for="inputPassword">Password</label>
            <b-input v-model="password" type="password" class="mb-2 mr-sm-2 mb-sm-0 mt-2" id="inputPassword" placeholder="Password" />
            <hr>
            <b-button variant="blue" type="submit">Login</b-button>
            <b-button class="ml-4" variant="blue" @click="showForgot">Forgot Password</b-button>
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
          </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-5" v-if="showForgotForm">
      <b-col cols="4" offset="4">
        <b-form v-on:submit.prevent="forgotEmail">
          <label class="sr-only" for="inputEmail">Email</label>
          <b-input v-model="fEmail" type="email" class="mb-2 mr-sm-2 mb-sm-0" id="forgotEmail" placeholder="Email" />
          <hr>
          <b-button variant="blue" type="submit">Reset Email</b-button>
          <div class="alert alert-danger" v-if="error">{{ emailError }}</div>
          <div class="alert alert-success mt-2" v-if="emailSuccess">An email has been sent to the email address provided.</div>
        </b-form>
    </b-col>
  </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: '',
      emailError: '',
      emailSuccess: false,
      fEmail: '',
      showForgotForm: false
    }
  },
  methods: {
    login(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        alert(`Logged in as ${user.user.email}`)
        this.$router.go({
          path: this.$router.path
        })
      },
      err => {
        this.error = err.message
      }
    )
  },
  showForgot() {
    this.showForgotForm = !this.showForgotForm
  },
  forgotEmail() {
    let auth = firebase.auth()

    auth.sendPasswordResetEmail(this.fEmail).then(() => {
      this.emailSuccess = true
    })
  }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  padding-top: 60px;
}

h2{
  text-align: center;
}

#login-buttons{
  text-align: center;
  border: 1px solid #5d5d5d;
  border-radius: 2px;
  padding: 16px;
}
</style>
