<template lang="pug">
  div.company-listing
    h1 Companies
    input(v-model="text")
    button(@click="PUSH_NOTIFICATION(text)") Notify {{ text }}
</template>

<script>
import { mapActions } from 'vuex'
import { PUSH_NOTIFICATION } from '@/models/notifications'

export default {
  data () {
    return {
      text: 'Stuff to Notify'
    }
  },
  methods: mapActions([PUSH_NOTIFICATION]),
}
</script>
