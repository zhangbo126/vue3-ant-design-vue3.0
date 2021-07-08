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
    }

]


//需要登录访问的页面
export const LoginRouterMap = [

]




export const asyncRouter = [
    {
        path: '/account',
        redirect: '/account/accountcenter',
        component: BasicLayouts,
        name: 'AccountManage',
        children: [
            {
                name: 'AccountCenter',
                component: () => import('@/views/Account/AccountCenter'),
                path: '/account/accountcenter'
            },
            {
                name: 'AccountSettings',
                component: () => import('@/views/Account/AccountSettings'),
                path: '/account/accountsettings'
            },
            {
                name: 'BaseSettings',
                component: () => import('@/views/Account/BaseSettings'),
                path: '/account/basesettings'
            },
            {
                name: 'UserRole',
                component: () => import('@/views/userCenter/userRole'),
                path: '/usercenter/userrole'
            },
            {
                name: 'menuList',
                component: () => import('@/views/userCenter/menuList'),
                path: '/usercenter/menulist'
            },
        ]
    }
]