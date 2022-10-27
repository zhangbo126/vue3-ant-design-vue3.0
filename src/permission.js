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
                store.dispatch('GetUserInfo').then(user => {
                    const menuList = user.data.menuList
                    //生成动态路由
                    store.dispatch('GenerateRoutes', menuList).then(async (res) => {
                        const asyncRouter = res.asyncRouter
                        asyncRouter.forEach(v => {
                            router.addRoute(v)
                        })
                        // 请求带有 redirect 重定向时，登录自动重定向到该地址
                        const redirect = decodeURIComponent(from.query.redirect || to.path)
                        if (to.path === redirect) {
                             router.replace({...to,replace:true})
                        } else {
                            next({ path: '/' })
                        }
                    })
                }).catch(() => {
                    //当前账号没有权限时
                    VueCookies.remove(ACCESS_TOKEN)
                    router.push('/not/notrole')
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