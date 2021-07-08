// eslint-disable-next-line

import { BasicLayouts, RouteView } from '@/layouts'
import {LoginRouterMap} from '@/config/router.config.js'

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


// 根级菜单
const rootRouter = {
    key: '',
    name: 'index',
    path: '/',
    component: 'BasicLayout',
    meta: {
        title: '首页'
    },
    children: []
}


export const renderAsyncRouter = (menuList) => {
    return new Promise(reslove => {
        const treeList = menuList
        const renderRouter = []
        // rootRouter.children =treeMap(treeList)
        rootRouter.children.push(...LoginRouterMap)

        renderRouter.push(
            {
                hide: true,
                name: '404',
                path: '/:pathMatch(.*)*',
                component: () => import('@/views/Exception/404')
            },
            rootRouter,
        )

     
        reslove(renderRouter)
    })

}


const treeMap = (menuTree) => {
    return menuTree.map(v => {
        const meta = v.meta || { title: v.name, hide: v.hide || false }
        const currentRouter = {
            path: v.path,
            name: v.name,
            component: (constantRouterComponents[v.component]),
            icon: v.icon || null,
            hide: v.hide || false,
            meta
        }
        // 重定向
        v.redirect && (currentRouter.redirect = v.redirect)
        if (v.children && v.children.length > 0) {
            currentRouter.children = treeMap(v.children)
        }
        return currentRouter
    })
}

