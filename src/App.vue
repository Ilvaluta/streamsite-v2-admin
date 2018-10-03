<template>
<div id="app">
  <Navigation/>
  <router-view v-bind:uid="uid"/>
</div>
</template>

<script>
import Navigation from './components/Nav'
import firebase from 'firebase/app'

export default {
  name: 'App',
  components: {
    'Navigation': Navigation
  },
  data(){
    return{
      uid: ''
    }
  },
  methods: {
    getUid(){
      let user = firebase.auth().currentUser
      if(user){
        this.uid = user.uid
      } else {
        this.uid = null
      }
    }
  },
  created: function(){
    this.getUid()
  }
}
</script>

<style>
hr {
  background-color: rgb(128, 128, 128);
}

body {
  background: rgb(37, 40, 48);
  color: #EAEAEA;
}

.card-test {
  background: rgb(67, 72, 87);
}

.list-bg {
  background: #333;
}

.btn-blue {
  background: rgb(25, 151, 198);
  color: #EAEAEA;
}

.blue-bg {
  background: rgb(25, 151, 198);
}

.twitch-purple{
  background: #6441A4;
}

.warning {
  font-weight: bold;
  color: rgb(208, 77, 77);
}

</style>
