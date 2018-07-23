<template>
  <div class="login">
    <b-container>
      <b-form @submit.prevent="login">
        <h1>Log in</h1>
        <hr>
      <b-row class="my-1">
        <b-col sm="2"><label for="login-username">Username:</label></b-col>
        <b-col sm="2">
          <b-form-input id="login-username" size="sm" type="text" placeholder="username"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2"><label for="login-password">Password:</label></b-col>
        <b-col sm="2">
          <b-form-input id="login-password" size="sm" type="password" placeholder="Password"></b-form-input>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
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
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  padding-top: 60px;
}
</style>
