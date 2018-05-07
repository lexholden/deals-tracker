<template lang="pug">
  .location(v-if="location") {{ location.street_address }}, {{ location.city }}, {{ location.zip_code }}
</template>

<script>
export default {
  props: {
    location: Object, // TODO Prop Validation
  }
}
</script>
