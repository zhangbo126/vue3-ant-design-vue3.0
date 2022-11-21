// eslint-disable-next-line

import { BasicLayouts, RouteView } from '@/layouts'
import { hideRouter } from '@/config/router.config.js'
// 前端路由表
const constantRouterComponents = {
    // 基础页面 layout 必须引入
    BasicLayouts: BasicLayouts,
    RouteView: RouteView,
    // 你需要动态引入的页面组件
    'userRole': () => import('@/views/userCenter/userRole'),
    'userAccount': () => import('@/views/userCenter/userAccount'),
    'menuList': () => import('@/views/userCenter/menuList'),
    'commodityBrand': () => import('@/views/commodityCenter/commodityBrand'),
    'commodityClass': () => import('@/views/commodityCenter/commodityClass'),
    'commodityLibrary': () => import('@/views/commodityCenter/commodityLibrary'),
    'informationList': () => import('@/views/informationCenter/informationList'),
    'Home': () => import('@/views/Home/Home'),
}


// 根级菜单
const rootRouter = {
    name: 'BasicLayouts',
    path: '/',
    component: BasicLayouts,
    meta: {
        title: '首页'
    },
    redirect: '/home/page'
}

export const renderAsyncRouter = (menuList) => {
    return new Promise(reslove => {
        const treeList = menuList
        const addRouter = []
        treeMap(treeList, addRouter, {})
        const renderRouter = generator(addRouter)
        const asyncRouter = []
        rootRouter.children = renderRouter.concat(hideRouter)
        asyncRouter.push(rootRouter)
        reslove({ asyncRouter, renderRouter })
    })

}



/** 
 处理树结构路由内容
 * @param {Array} routerMap 要处理的异步路由
 * @return  当前账号异步路由
*/

export const generator = (routerMap, parent) => {
    return routerMap.map(item => {
        const { url, name, partentName, component, title, icon } = item
        const currentRouter = {
            // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
            path: url,
            // 路由名称，建议唯一
            name,
            // 该路由对应页面的 组件 :方案1
            component: constantRouterComponents[component],
            // 该路由对应页面的 组件 :方案2 (动态加载)
            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                title,
                icon: icon || undefined,
                partentName,   //父级菜单名称 
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

/** 

list 结构转 树型
 * @param {Array} menuTree 菜单原数据
 * @param {Array} tree  菜单树级结构
 * @param {String} partent 父级菜单
 * @return  
*/

const treeMap = (menuTree, tree, partent) => {
    menuTree.forEach(item => {
        if (item.parentId == partent._id) {

            const child = {
                name: item.key,
                title: item.name,
                partentName: partent.key,
                children: [],
                redirect: item.redirectUrl,
                component: item.component,
                url: item.url,
                icon: item.icon
            }

            treeMap(menuTree, child.children, item)
            if (child.children.length == 0) {
                delete child.children
            }

            tree.push(child)
        }
    })
}

