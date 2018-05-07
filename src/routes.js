import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
// import Companies from '@/pages/Companies'
import Company from '@/pages/Company'
import CompanyLocation from '@/pages/CompanyLocation'
import PageNotFound from '@/pages/404'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
    // { path: '/companies', name: 'Companies', component: Companies }, // TODO Company Listing page with search
    { path: '/companies/:companyId', name: 'Company', component: Company },
    { path: '/companies/:companyId/locations/:locationId', name: 'CompanyLocation', component: CompanyLocation },
    { path: '*', name: '404', component: PageNotFound },
  ],
  mode: 'history'
})
