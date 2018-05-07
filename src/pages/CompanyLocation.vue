<template lang="pug">
  .page.company-locations(v-if="company")
    router-link.fright(:to="`/companies/${company.id}`") back to company
    h1 {{ company.name }}
    p Here you can find all the available deals for this location
    ul.deals(v-if="deals")
      li(v-for="deal in deals")
        h3 {{ deal.service.name }}
        ul.cards
          li(v-for="variation in deal.variations")
            md-card
              md-card-content
                price(:price="GET_VARIATION_PRICE(variation.id)")
              md-card-header
                h4 {{ variation.name }}
    md-progress-spinner(v-else md-mode="indeterminate" :md-diameter="100")
</template>

<script>
import AddressRenderer from '@/components/AddressRenderer'
import Price from '@/components/Price'
import { mapGetters } from 'vuex'
import {
  FETCH_COMPANY_DETAILS,
  FETCH_DEALS_FOR_LOCATION,
  GET_COMPANY_DETAILS_BY_ID,
  GET_DEALS_BY_LOCATION_ID,
  GET_PRICINGS_BY_LOCATION_ID,
  GET_VARIATION_PRICE,
} from '@/models/companies'

export default {
  components: { AddressRenderer, Price },
  computed: {
    ...mapGetters({
      GET_COMPANY_DETAILS_BY_ID,
      GET_DEALS_BY_LOCATION_ID,
      GET_PRICINGS_BY_LOCATION_ID,
      GET_VARIATION_PRICE,
    }),

    company () {
      const { companyId } = this.$route.params
      return this.GET_COMPANY_DETAILS_BY_ID(companyId)
    },

    location () {
      const { locationId } = this.$route.params
      const locations = this.company.locations
      return locations.find(loc => loc.id === locationId)
    },

    deals () {
      const { locationId } = this.$route.params
      return this.GET_DEALS_BY_LOCATION_ID(locationId)
    },

    pricings () {
      const { locationId } = this.$route.params
      return this.GET_PRICINGS_BY_LOCATION_ID(locationId)
    }
  },

  created () {
    const { companyId, locationId } = this.$route.params
    if (this.$store.state.companies.companyStore[companyId] === undefined) {
      this.$store.dispatch(FETCH_COMPANY_DETAILS, { companyId })
    }
    this.$store.dispatch(FETCH_DEALS_FOR_LOCATION, { companyId, locationId })
  },
}
</script>

<style lang="scss">
@import '../styles/variables';

.company-locations {
  h1,
  h2,
  p {
    margin: $padding-large $padding-default 0;
  }
}

ul.deals {
  padding: 0;
  list-style-type: none;

  > li {
    display: block;
    width: 100%;
  }

  h3 {
    text-decoration: underline;
    margin: $padding-large $padding-default 0;
    color: $color-fade;
  }
}

ul.cards {
  padding: 0;

  li {
    list-style-type: none;
    display: inline-block;

    .md-card {
      width: 220px;
      min-height: 160px;
      margin: $padding-default;
      text-align: center;

      .price {
        margin: $padding-default 0;
      }
    }
  }
}
</style>
