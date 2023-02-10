import { BasicLayouts, LoginView, RouteView, BlankLayout } from '@/layouts'



/**
 *  @description meta 参数信息
 *   @param {String} title 路由标题, 用于显示面包屑, 页面标题 *推荐设置
 *   @param {String}  icon 路由在 menu 上显示的图标
 *   @param {Boolean}  keepAlive   该路由是否被缓存  默认 false 
 *   @param {Boolean}  hideTabs    该路由是否展示在 tabs 组件上  默认 false 
 *    
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
        hide: true,
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/Exception/404'),
    },

]

/*隐藏路由菜单*/
export const hideRouter = [
    {
        path: '/hide',
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
                meta: { title: '设置商品详情',hideTabs:true }
            },
        ]
    },
]



