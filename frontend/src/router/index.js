import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'
import toyApp from '../views/toyApp.vue'
import test from '../cmps/test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/toy',
    name: 'toy',
    component: toyApp
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/toy-edit/:toyId',
    name: 'toy-edit',
    component: toyEdit
  },
  {
    path: '/toy-details/:toyId',
    name: 'toy-details',
    component: toyDetails
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
]

const router = new VueRouter({
  routes
})

export default router
