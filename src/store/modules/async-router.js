/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { routerMap } from '@/config/router.config'
import { renderAsyncRouter } from '@/router/generator-routers'
import router from '../../router'


const permission = {
    state: {
        routers: [],
        addRouters: [],
   
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
           
            state.addRouters = routers.renderRouter
            state.routers = routerMap.concat(routers.asyncRouter)
        }
    },
    actions: {
        GenerateRoutes({ commit }, menuList) {
            return new Promise((reslove, reject) => {
                renderAsyncRouter(menuList).then(res => {
                    commit('SET_ROUTERS', res)
                    reslove(res)
                })
            })
        }
    }
}


export default permission