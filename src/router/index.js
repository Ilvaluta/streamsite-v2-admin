import Vue from 'vue'
import Router from 'vue-router'
import Settings from '@/components/Settings'
import Giveaway from '@/components/Giveaway'
import Streamers from '@/components/Streamers'
import Resource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/giveaway',
      name: 'Giveaway',
      component: Giveaway
    },
    {
      path: '/streamers',
      name: 'Streamers',
      component: Streamers
    }
  ]
})
