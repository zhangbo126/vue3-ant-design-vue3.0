import { createRouter, createWebHashHistory } from 'vue-router'
import { routerMap,LoginRouterMap } from '@/config/router.config'


const router = createRouter({
  history: createWebHashHistory('/'),
  routes: routerMap.concat(LoginRouterMap)
})


export default router
