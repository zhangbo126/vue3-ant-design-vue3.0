import { BasicLayouts, LoginView, RouteView } from '@/layouts'



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
    // {
    //     name: '404',
    //     path: '/:pathMatch(.*)*',
    //     component: () => import('@/views/Exception/404')
    // },

    // {
    //     path: '*',
    //     redirect: '/404'
    // }
]


// //需要登录访问的页面
// export const LoginRouterMap = [
//     {
//         path: '/',
//         component: BasicLayouts,
//         name: 'index',
//         redirect: '/form/formlist',
//         children: [
//             {
//                 path: '/form/formlist',
//                 name: 'FormList',
//                 component: () => import('@/views/FormList/FormList'),
//                 meta: { title: 'form' }
//             },
            
//         ]
//     }
// ]


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
                name: 'SecuritySettings',
                component: () => import('@/views/Account/SecuritySettings'),
                path: '/account/securitysettings'
            },
        ]
    }
]