import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style

NProgress.configure({ showSpinner: false })
const whiteList = ['login', 'NoRole'] //免登录白名单

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${domTitle}-${to.meta.title}`))
    //判断是否登录
    if (VueCookies.get(ACCESS_TOKEN)) {
        if (to.path == '/loginview/login') {
            next({ path: from.path || '/loginview/login' })
        } else {
            if (store.state.permission.addRouters.length == 0) {
                try {
                    //获取用户信息
                    const { data } = await store.dispatch('GetUserInfo')
                    const menuList = data.menuList
                    const { asyncRouter } = await store.dispatch('GenerateRoutes', menuList)
                    asyncRouter.forEach(v => {
                        router.addRoute(v)
                    })
                    // 请求带有 redirect 重定向时，登录自动重定向到该地址
                    const redirect = decodeURIComponent(from.query.redirect || to.path)
                    router.replace({ ...to, replace: true })
                } catch {
                    next({ path: '/loginview/login' })
                }
                next()
            } else {
                next()
            }
        }
    } else {
        //免登录菜单
        if (whiteList.includes(to.name)) {
            next()
        } else {
            next({ path: '/loginview/login', query: { redirect: to.fullPath } })
        }
    }
})



router.afterEach((to) => {
    NProgress.done()
})