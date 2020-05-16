import Vue from 'vue'
import VueRouter from 'vue-router'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
