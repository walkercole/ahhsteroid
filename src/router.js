import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hazardous-asteroids',
      name: 'hazardous-asteroids',
      // route level code-splitting
      // this generates a separate chunk (hazardous-asteroids.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "hazardous-asteroids" */ './views/HazardousAsteroids.vue')
    },
    {
      path: '/daily-observer',
      name: 'daily-observer',
      component: () => import(/* webpackChunkName: "daily-observer" */ './views/DailyObserver.vue')
    },
    {
      path: '/observations',
      name: 'observations',
      component: () => import(/* webpackChunkName: "observation" */ './views/Observations.vue')
    }
  ]
})
