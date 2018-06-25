import Vue from 'vue'
import Router from 'vue-router'
import Settings from '@/components/Settings'
import Giveaway from '@/components/Giveaway'
import Streamers from '@/components/Streamers'
import Edit from '@/components/Edit'
import Add from '@/components/Add'
import Resource from 'vue-resource'


Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Streamers',
      component: Streamers
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/giveaway',
      name: 'Giveaway',
      component: Giveaway
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    }
  ]
})
