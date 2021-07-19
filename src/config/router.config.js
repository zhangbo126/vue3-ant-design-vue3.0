import { BasicLayouts, LoginView, RouteView, BlankLayout } from '@/layouts'



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
        path: '/not',
        component: BlankLayout,
        redirect: '/not/notrole',
        children: [
            {
                path: '/not/notrole',
                component: () => import('@/views/Exception/NoRole'),
                name: 'NoRole',
            }

        ]
    },
    {
        path: '/home',
        component: BasicLayouts,
        redirect: '/home/page',
        children: [
            {
                path: '/home/page',
                component: () => import('@/views/Home/Home'),
                name: 'Home',
                meta: { title: '首页' }
            }

        ]
    },

]





