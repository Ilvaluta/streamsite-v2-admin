<template>
<div id="nav">
  <b-navbar toggleable="md" type="dark" class="blue-bg">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand>StreamSite</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav v-if="isLoggedIn">
        <b-nav-item to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item to="/settings">Settings</b-nav-item>
        <b-nav-item to="/social">Social</b-nav-item>
        <b-nav-item to="/colors">Colors</b-nav-item>
        <b-nav-item to="/sponsors">Sponsors</b-nav-item>
        <b-nav-item to="/giveaway">Giveaway</b-nav-item>
    </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
          <em>{{ user }}</em>
        </template>
          <b-dropdown-item to="/user" v-if="isLoggedIn">User</b-dropdown-item>
          <b-dropdown-item to="/login" v-else >Login</b-dropdown-item>
          <b-dropdown-item v-if="isLoggedIn"><b-button variant="danger" v-on:click="logout" size="sm">Logout</b-button></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase/app'

export default {
  name: 'Navigation',
  data: function() {
    return {
      user: '',
      isLoggedIn: false
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.go({
          path: this.$router.path
        })
      })
    }
  },
  created: function() {
    if(firebase.auth().currentUser){
      this.isLoggedIn = true
      this.user = firebase.auth().currentUser.email
    }
  }
}
</script>

<style>
.forms {
  margin: 16px 0 16px 0;
}
</style>
