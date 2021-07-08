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

    return next()
    if (VueCookies.get(ACCESS_TOKEN)) {
        if (to.path == '/loginview/login') {
            next({ path: '/form/formlist' })
        } else {
            if (store.state.permission.addRouters.length == 0) {

                store.dispatch('GetUserInfo').then(user => {
                    const menuList = user.data.menuList
                    //生成动态路由
                    store.dispatch('GenerateRoutes', menuList).then((res) => {
                        const asyncRouter = res
                        asyncRouter.forEach(v => {
                            router.addRoute(v)
                        })
                        console.log(router.getRoutes())
                        next({ ...to, replace: true })
                    })
                }).catch(() => {
                    VueCookies.remove(ACCESS_TOKEN)
                    next({ path: '/not/notrole' })
                })
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