import { BasicLayouts, LoginView } from '@/layouts'

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
}

/**
 * 基础路由
 * @type { *[] }
 */

export const routerMap = [
    {
        path: '/loginview',
        component: LoginView,
        redirect: '/loginview/login',
        children: [
            {
                path: '/loginview/login',
                name: 'login',
                component: () => import('@/views/Login/Login'),
                meta: { title: '登录' }
            },
        ]
    },
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/Exception/404')
    },
    // {
    //     path: '*',
    //     redirect: '/404'
    // }
]


//需要登录访问的页面
export const LoginRouterMap = [
    {
        path: '/',
        component: BasicLayouts,
        redirect: '/form',
        children: [
            {
                path: '/form',
                name: 'Form',
                // component: () => import('@/views/FormList/FormList'),
                redirect: '/form/formlist',
                component: RouteView,
                meta: { title: 'form' },
                children: [
                    {
                        path: '/form/formlist',
                        name: 'FormList',
                        component: () => import('@/views/FormList/FormList'),
                        meta: { title: 'list' }
                    }
                ]
            },
        ]
    }
]


