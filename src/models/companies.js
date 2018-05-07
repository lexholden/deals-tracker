// Centralized loading of companies and their locations/deals/prices

import ax from 'axios'
import { api } from '@/config.yml'
import { PUSH_NOTIFICATION } from './notifications'
// import { SET_LOADING_STATE } from './data'

const initialState = {
  companyStore: {},
  locationDealsStore: {},
  locationPricingsStore: {},
  variationsPricingStore: {},
}

export const FETCH_COMPANY_DETAILS = 'FETCH_COMPANY_DETAILS'
export const FETCH_DEALS_FOR_LOCATION = 'FETCH_DEALS_FOR_LOCATION'
export const GET_DEALS_BY_LOCATION_ID = 'GET_DEALS_BY_LOCATION_ID'
export const GET_COMPANY_DETAILS_BY_ID = 'GET_COMPANY_DETAILS_BY_ID'
export const GET_PRICINGS_BY_LOCATION_ID = 'GET_PRICINGS_BY_LOCATION_ID'
export const GET_VARIATION_PRICE = 'GET_VARIATION_PRICE'

const STORE_COMPANY_DETAILS = 'STORE_COMPANY_DETAILS'
const STORE_LOCATION_DEALS = 'STORE_LOCATION_DEALS'
const STORE_VARIATION_PRICING = 'STORE_VARIATION_PRICING'

export default {
  state: initialState,
  getters: {
    [GET_COMPANY_DETAILS_BY_ID]: state => companyId => state.companyStore[companyId],
    [GET_DEALS_BY_LOCATION_ID]: state => locationId => state.locationDealsStore[locationId],
    [GET_PRICINGS_BY_LOCATION_ID]: state => locationId => state.locationPricingsStore[locationId],
    [GET_VARIATION_PRICE]: state => variationId => state.variationsPricingStore[variationId],
  },
  actions: {
    [FETCH_COMPANY_DETAILS]: fetchCompany,
    [FETCH_DEALS_FOR_LOCATION]: fetchDealsForLocation,
  },
  mutations: {
    [STORE_COMPANY_DETAILS]: (state, company) => {
      state.companyStore = { ...state.companyStore, [company.id]: company }
    },
    [STORE_LOCATION_DEALS]: (state, { locationId, deals, pricings }) => {
      state.locationDealsStore = { ...state.locationDealsStore, [locationId]: deals }
      state.locationPricingsStore = { ...state.locationPricingsStore, [locationId]: pricings }
    },
    [STORE_VARIATION_PRICING]: (state, { pricings }) => {
      state.variationsPricingStore = { ...state.variationsPricingStore, ...pricings }
    },
  }
}

/**
 * Fetch the info on a company, and its locations
 */
async function fetchCompany ({ commit, dispatch, state }, { companyId }) {
  try {
    const data = await Promise.all([
      ax.get(`${api.base}/companies/${companyId}`),
      ax.get(`${api.base}/companies/${companyId}/locations`)
    ])
    const { data: { company } } = data[0]
    const { data: { locations } } = data[1]
    company.locations = locations
    commit(STORE_COMPANY_DETAILS, company)
  } catch (err) {
    dispatch(PUSH_NOTIFICATION, err.message) // TODO shouldn't just show API error directly
    throw err
  }
}

/**
 * Fetch the available deals for a given location, including pricing info
 */
async function fetchDealsForLocation ({ commit, dispatch, state }, { companyId, locationId }) {
  try {
    const data = await Promise.all([
      ax.get(`${api.base}/companies/${companyId}/deals?location_ids=${locationId}`),
      ax.get(`${api.base}/companies/${companyId}/pricings?location_ids=${locationId}`),
    ])
    const { data: { deals } } = data[0]
    const { data: { pricings } } = data[1]
    commit(STORE_LOCATION_DEALS, { locationId, deals, pricings })
    commit(STORE_VARIATION_PRICING, {
      pricings: pricings.reduce((a, p) => ({
        ...a,
        [p.variation_id]: p,
      }), {})
    })
  } catch (err) {
    dispatch(PUSH_NOTIFICATION, err.message) // TODO shouldn't just show API error directly
    throw err
  }
}
