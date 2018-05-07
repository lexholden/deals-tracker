<template lang="pug">
  .page.company-listing(v-if="company")
    h1 {{ company.name }}
    h2 Locations:
    ul.locations
      li(v-for="address in company.locations")
        h3
          router-link(:to="`/companies/${$route.params.companyId}/locations/${address.id}`")
            address-renderer(:location="address")
</template>

<script>
import AddressRenderer from '@/components/AddressRenderer'
import { mapGetters } from 'vuex'
import {
  FETCH_COMPANY_DETAILS,
  GET_COMPANY_DETAILS_BY_ID,
} from '@/models/companies'

export default {
  components: { AddressRenderer },

  computed: {
    ...mapGetters({
      GET_COMPANY_DETAILS_BY_ID,
    }),

    company () {
      const { companyId } = this.$route.params
      return this.GET_COMPANY_DETAILS_BY_ID(companyId)
    }
  },

  created () {
    const { companyId } = this.$route.params
    this.$store.dispatch(FETCH_COMPANY_DETAILS, { companyId })
  },
}
</script>
