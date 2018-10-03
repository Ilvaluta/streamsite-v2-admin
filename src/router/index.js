import Vue from 'vue'
import Router from 'vue-router'
import Settings from '@/components/dashboard/Settings'
import Giveaway from '@/components/dashboard/Giveaway'
import Sponsors from '@/components/dashboard/Sponsors'
import Dashboard from '@/components/dashboard/Dashboard'
import User from '@/components/dashboard/User'
import Social from '@/components/dashboard/Social'
import Colors from '@/components/dashboard/Colors'
import Login from '@/components/login/Login'
import Register from '@/components/login/Register'
import firebase from 'firebase/app'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/',
      redirect: '/dashboard',
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/giveaway',
      component: Giveaway,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/colors',
      component: Colors,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sponsors',
      component: Sponsors,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/social',
      component: Social,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else {
    // Proceed to route
    next()
  }
})

export default router
