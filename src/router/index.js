import Vue from 'vue'
import VueRouter from 'vue-router'

import { asyncRouterMap } from '@/config/router.config'

Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:asyncRouterMap,
})

export default router
