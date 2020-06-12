import Vue from 'vue'
import VueRouter from 'vue-router'

import UserService from '../services/UserService'
import decode from 'jwt-decode'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../modules/error/views/404')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../modules/auth/views/Register')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../modules/auth/views/Login')
  },
  {
    path: '/activate',
    name: 'ActivateAccount',
    component: () => import(/* webpackChunkName: "activate" */'../modules/auth/views/AccountActivation')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */'../modules/home/views/Home'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:uid',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */'../modules/user/views/User'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const token = localStorage.getItem('token')

    if (!token) {
      return next('/login')
    }

    try {
      const decodedToken = decode(token)
      await UserService.getByID(decodedToken.uid)
      return next()
    } catch (error) {
      console.log(error)
      return next('/login')
    }
  }
  next()
})

export default router
