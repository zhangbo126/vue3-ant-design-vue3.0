/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { routerMap } from '@/config/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'

const permission = {
    state: {
        routers: routerMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = routerMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(reslove => {
                generatorDynamicRouter().then(res => {                  
                    commit('SET_ROUTERS', res)
                    reslove(res)
                })
            })
        }
    }
}

export default permission