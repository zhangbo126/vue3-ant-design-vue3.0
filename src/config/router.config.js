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
    {
        hide: true,
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/Exception/404'),
    },

]

/*隐藏路由菜单*/
export const hideRouter = [
    {
        path: '/home',
        component: RouteView,
        children: [
            {
                path: '/commoditycenter/commoditylibrary/addeditcommoditylibrary',
                component: () => import('@/views/commodityCenter/commodityLibrary/AddEditCommodityLibrary'),
                name: 'commodityLibraryDetail',
                meta: { title: '商品库新增/编辑' }
            },
            {
                path: '/commoditycenter/commoditylibrary/setgoodsdetail',
                component: () => import('@/views/commodityCenter/commodityLibrary/setGoodsDetail'),
                name: 'setGoodsDetail',
                meta: { title: '设置商品详情' }
            },
        ]
    },
]



