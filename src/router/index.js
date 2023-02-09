import { createRouter, createWebHashHistory ,createWebHistory } from 'vue-router'
import { routerMap } from '@/config/router.config'


const router = createRouter({
  history: createWebHashHistory(),
  routes: routerMap
})



export default router
