// eslint-disable-next-line

import { BasicLayouts, RouteView } from '@/layouts'


// 前端路由表
const constantRouterComponents = {
    // 基础页面 layout 必须引入
    BasicLayouts: BasicLayouts,
    RouteView: RouteView,
    '404': () => import(/* webpackChunkName: "error" */ '@/views/Exception/404'),
    // 你需要动态引入的页面组件
    'userRole': () => import('@/views/userCenter/userRole'),
    'userAccount': () => import('@/views/userCenter/userAccount'),
    'menuList': () => import('@/views/userCenter/menuList'),
}


// 根级菜单
const rootRouter = {
    name: 'index',
    path: '/',
    component: 'BasicLayouts',
    meta: {
        title: '首页'
    },
    children: []
}


export const renderAsyncRouter = (menuList) => {
    return new Promise(reslove => {
        const treeList = menuList
        const renderRouter = []
        const addRouter = []
        treeMap(treeList, addRouter, null)
        // rootRouter.redirect = rootRouter.children[0].path

        const asyncRouter = generator(addRouter)

        renderRouter.push(
            rootRouter,
            {
                hide: true,
                name: '404',
                path: '/:pathMatch(.*)*',
                component: () => import('@/views/Exception/404')
            },

        )
        renderRouter[0].children = asyncRouter
        renderRouter[0].redirect = asyncRouter[0].path
    
        reslove(renderRouter)
    })

}

export const generator = (routerMap, parent) => {
    return routerMap.map(item => {

        const currentRouter = {
            // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
            path: item.url,
            // 路由名称，建议唯一
            name: item.name,
            // 该路由对应页面的 组件 :方案1
            component: constantRouterComponents[item.component],
            // 该路由对应页面的 组件 :方案2 (动态加载)

            // component: (constantRouterComponents[item.component || item.key]) || (() => import(`@/views/${item.component}`)),
            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                title: item.title,
                icon: item.icon || undefined,

            }
        }
        item.redirect && (currentRouter.redirect = item.redirect)
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentRouter.children = generator(item.children, currentRouter)
        }
        return currentRouter
    })
}

/*

list 结构转 树型

*/

const treeMap = (menuTree, tree, partentId) => {

    menuTree.forEach(item => {
        if (item.parentId == partentId) {
            const child = {
                name: item.key,
                title: item.name,
                children: [],
                redirect: item.redirectUrl,
                component: item.component,
                url: item.url,
            }

            treeMap(menuTree, child.children, item._id)
            if (child.children.length == 0) {
                delete child.children
            }

            tree.push(child)
        }
    })
}

