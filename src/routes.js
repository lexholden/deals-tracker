import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
// import Companies from '@/pages/Companies'
import Company from '@/pages/Company'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
    // { path: '/companies', name: 'Companies', component: Companies },
    { path: '/companies/:companyId', name: 'Company', component: Company }
  ],
  mode: 'history'
})
