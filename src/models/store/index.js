import Vue from 'vue'
import Vuex from 'vuex'

import notifications from '@/models/notifications'
import companies from '@/models/companies'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    companies,
    notifications
  }
})
