<template lang="pug">
  .company-listing(v-if="company")
    h1 {{ company.name }}
    ul
      li(v-for="address in company.locations" @click="FETCH_LOCATION_DEALS({ companyId: company.id, locationId: address.id })")
        h3 {{ address.street_address }}, {{ address.city }}, {{ address.zip_code }}
        .deals(v-if="deals(address.id)")
          pre {{ deals(address.id) }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  FETCH_COMPANY,
  FETCH_LOCATION_DEALS,
  GET_ACTIVE_COMPANY,
  GET_DEALS_FOR_LOCATION,
} from '@/models/companies'

export default {
  computed: {
    ...mapGetters({
      company: GET_ACTIVE_COMPANY,
      deals: GET_DEALS_FOR_LOCATION,
    })
  },

  created () {
    const { companyId } = this.$route.params
    this.$store.dispatch(FETCH_COMPANY, { companyId })
  },

  methods: mapActions([FETCH_LOCATION_DEALS])
}
</script>

<style lang="scss">
@import '../styles/variables';

.company-listing {
  padding: $padding-default;

  ul {
    padding: $padding-large;
  }
}
</style>
