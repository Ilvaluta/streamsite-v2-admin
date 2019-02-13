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

</style>
