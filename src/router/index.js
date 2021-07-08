import { createRouter, createWebHashHistory ,createWebHistory } from 'vue-router'
import { routerMap,asyncRouter } from '@/config/router.config'


const router = createRouter({
  history: createWebHashHistory(),
  routes: routerMap.concat(asyncRouter)
})



export default router
