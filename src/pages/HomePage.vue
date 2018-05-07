<template lang="pug">
  .page
    h1 Welcome to Deals Tracker
    p This microapp allows you to see the deals and prices available at a given location.
    h2 Favorites:

    ul
      li(v-for="favorite in favorites")
        router-link(:to="`/companies/${favorite.id}`") {{ favorite.name }}

</template>

<script>
import { favorites } from '../config.yml'

export default {
  computed: {
    favorites () { return favorites }
  },
}
</script>
