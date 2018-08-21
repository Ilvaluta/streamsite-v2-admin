import Vue from 'vue'
import Router from 'vue-router'
import Settings from '@/components/dashboard/Settings'
import Giveaway from '@/components/dashboard/Giveaway'
import Sponsors from '@/components/dashboard/Sponsors'
import Dashboard from '@/components/dashboard/Dashboard'
import Test from '@/components/dashboard/Test'
import Login from '@/components/login/Login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/dashboard/test/',
      name: 'Test',
      component: Test
    },
    {
      path: '/dashboard/',
      component: Dashboard
    },
    {
      path: '/dashboard/giveaway',
      component: Giveaway
    },
    {
      path: '/dashboard/settings',
      component: Settings
    },
    {
      path: '/dashboard/sponsors',
      component: Sponsors
    }
  ]
})
