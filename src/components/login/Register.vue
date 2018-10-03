<template>
  <div class="register">
    <b-container>
      <h2>Register an account</h2>
      <hr>
      <b-row class="mt-5">
        <b-col cols="4" offset="4">
      <b-form v-on:submit.prevent="register">
        <label class="sr-only" for="inputEmail">Email</label>
        <b-input v-model="email" type="email" class="mb-2 mr-sm-2 mb-sm-0" id="inputEmail" placeholder="Email" />
        <label class="sr-only" for="inputPassword">Password</label>
        <b-input v-model="password" type="password" class="mb-2 mr-sm-2 mb-sm-0 mt-2" id="inputPassword" placeholder="Password" />
        <hr>
        <b-button variant="primary" type="submit">Register</b-button>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
      </b-form>
    </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    register(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        alert(`Account created for ${user.user.email}`)
        this.$router.go({
          path: this.$router.path
        })
      },
      err => {
        this.error = err.message
      }
    )
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
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
