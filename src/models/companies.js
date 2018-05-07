import ax from 'axios'
import { api } from '@/config.yml'
import { PUSH_NOTIFICATION } from './notifications'

const initialState = {
  companyStore: {},
  // locationsStore: {},
  locationDealsStore: {},
  activeCompany: undefined,
  locationDeals: undefined,
}

export const FETCH_COMPANY = 'FETCH_COMPANY'
export const FETCH_LOCATION_DEALS = 'FETCH_LOCATION_DEALS'
export const GET_ACTIVE_COMPANY = 'GET_ACTIVE_COMPANY'
export const GET_DEALS_FOR_LOCATION = 'GET_DEALS_FOR_LOCATION'

const STORE_COMPANY_DETAILS = 'STORE_COMPANY_DETAILS'
const STORE_LOCATION_DEALS = 'STORE_LOCATION_DEALS'

export default {
  state: initialState,
  getters: {
    [GET_ACTIVE_COMPANY]: state => state.activeCompany,
    [GET_DEALS_FOR_LOCATION]: state => locationId => state.locationDealsStore[locationId],
  },
  actions: {
    [FETCH_COMPANY]: fetchCompany,
    [FETCH_LOCATION_DEALS]: fetchLocationDeals,
  },
  mutations: {
    [STORE_COMPANY_DETAILS]: (state, company) => {
      state.companyStore[company.id] = company
      state.activeCompany = company
    },
    [STORE_LOCATION_DEALS]: (state, locationId, deals) => {
      state.locationDealsStore[locationId] = deals
    }
  }
}

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
  }
}

async function fetchLocationDeals ({ commit, dispatch, state }, { companyId, locationId }) {
  try {
    const { data } = await ax.get(`${api.base}/companies/${companyId}/deals?location_ids=${locationId}`)
    commit(STORE_LOCATION_DEALS, locationId, data.deals)
  } catch (err) {
    dispatch(PUSH_NOTIFICATION, err.message) // TODO shouldn't just show API error directly
  }
}
