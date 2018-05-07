<template lang="pug">
  #app
    md-toolbar.md-primary.md-dense
      h3.md-title Deals Tracker
    //- img(src="./assets/logo.png")
    router-view
    //- pre {{ notifications }}
    md-snackbar(md-position="center" :md-duration="3000" :md-active="showNotificationBar" md-persistent)
      span {{ activeNotification }}
      md-button.md-primary(@click="REMOVE_ACTIVE_NOTIFICATION") Close
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
  GET_NOTIFICATIONS,
  GET_ACTIVE_NOTIFICATION,
  REMOVE_ACTIVE_NOTIFICATION
} from '@/models/notifications'

export default {
  name: 'App',
  created () {
    // console.log(this.$store, this)
  },
  computed: {
    showNotificationBar () { return Boolean(this.activeNotification) },
    ...mapGetters({
      notifications: GET_NOTIFICATIONS,
      activeNotification: GET_ACTIVE_NOTIFICATION
    })
  },
  methods: {
    ...mapMutations([ REMOVE_ACTIVE_NOTIFICATION ])
  }
}
</script>

<style lang="scss">
@import 'vue-material/dist/vue-material.min.css';
@import 'vue-material/dist/theme/default.css';
@import './styles/main.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
