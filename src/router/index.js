import Vue from 'vue'
import Router from 'vue-router'
import Settings from '@/components/streamer/Settings'
import Giveaway from '@/components/streamer/Giveaway'
import Sponsors from '@/components/streamer/Sponsors'
import Dashboard from '@/components/admin/Dashboard'
import Edit from '@/components/admin/Edit'
import Add from '@/components/admin/Add'
import Login from '@/components/login/Login'
import Resource from 'vue-resource'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      meta: {requiresAuth: true, adminAuth: true, streamerAuth: false}
    },
    {
      path: '/admin/edit/:id',
      name: 'Edit',
      component: Edit,
      meta: {requiresAuth: true, adminAuth: true, streamerAuth: false}
    },
    {
      path: '/admin/add',
      name: 'Add',
      component: Add,
        meta: {requiresAuth: true, adminAuth: true, streamerAuth: false}
    },
    {
      path: '/streamer/:id/giveaway',
      name: 'Giveaway',
      component: Giveaway
    },
    {
      path: '/streamer/:id/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/streamer/:id/sponsors',
      name: 'Sponsors',
      component: Sponsors
    }
  ]
})
