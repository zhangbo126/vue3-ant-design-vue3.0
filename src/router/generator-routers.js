// eslint-disable-next-line

import { BasicLayouts } from '@/layouts'
import { getUserInfo } from '@/api/login'


const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
}
// 前端路由表
const constantRouterComponents = {
    // 基础页面 layout 必须引入
    BasicLayouts: BasicLayouts,
    RouteView: RouteView,
    '404': () => import(/* webpackChunkName: "error" */ '@/views/Exception/404'),
    // 你需要动态引入的页面组件
    'Form': () => import('@/views/FormList/Form'),
    'BasicForm': () => import('@/views/FormList/BasicForm'),
    'StepForm': () => import('@/views/FormList/StepForm'),
    'AdvanceForm': import('@/views/FormList/AdvanceForm'),
    'ResultSuccess': () => import('@/views/Result/ResultSuccess'),
    'ResultFail': () => import('@/views/Result/ResultFail'),
    'AccountCenter': () => import('@/views/Account/AccountCenter'),
    'AccountSettings': () => import('@/views/Account/AccountSettings'),
    'BaseSettings': () => import('@/views/Account/BaseSettings'),
    'SecuritySettings': () => import('@/views/Account/SecuritySettings'),
}

export const renderAsyncRouter = () => {
    return new Promise(reslove => {
        getUserInfo().then(res => {
            const treeList = res.result
            const renderRouter = treeMap(treeList)
            reslove(renderRouter)
        })
    })

}


const treeMap = (menuTree) => {

    return menuTree.map(v => {
        const currentRouter = {
            path: v.path,
            name: v.name,
            component: (constantRouterComponents[v.component]),
        }
        // 重定向
        v.redirect && (currentRouter.redirect = v.redirect)
        if (v.children && v.children.length > 0) {

            currentRouter.children = treeMap(v.children)
        }
        return currentRouter
    })
}

