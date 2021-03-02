import { createRouter, createWebHashHistory } from 'vue-router'
import { routerMap } from '@/config/router.config'


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routerMap
})



export default router
