<template>
<div id="nav">
  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <router-link to="/dashboard" tag="b-navbar-brand">StreamSite</router-link>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/dashboard/settings">Settings</b-nav-item>
        <b-nav-item to="/dashboard/sponsors">Sponsors</b-nav-item>
        <b-nav-item to="/dashboard/giveaway">Giveaway</b-nav-item>
    </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
          <em>{{ user }}</em>
        </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Navigation',
  data: function() {
    return {
      user: ''
    }
  },
  methods: {
    fetchUsername() {
      this.$http.get('http://streamsiteb/api/streamer/' + this.$id)
        .then(function(response) {
          this.user = response.body.twitch;
        });
    }
  },
  created: function() {
    this.fetchUsername();
  }
}
</script>

<style>
.forms {
  margin: 16px 0 16px 0;
}
</style>
