<template>
  <div class="login">
    <b-container>
      <h2>Please log in to access this page</h2>
      <hr>
      <b-row class="mt-5">
        <b-col cols="4" offset="4">
      <b-form>
        <label class="sr-only" for="inputEmail">Email</label>
        <b-input v-model="email" type="email" class="mb-2 mr-sm-2 mb-sm-0" id="inputEmail" placeholder="Email" />
        <label class="sr-only" for="inputPassword">Password</label>
        <b-input v-model="password" type="password" class="mb-2 mr-sm-2 mb-sm-0" id="inputPassword" placeholder="Password" />
        <b-button variant="primary" type="submit">Login</b-button>
        <h2 class="form-signin-heading">Please sign in</h2>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
      </b-form>
    </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  methods: {

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
