import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
NProgress.configure({ showSpinner: false })

// const {proxy} = getCurrentInstance()



const whiteList = ['login'] //免登录白名单

router.beforeEach((to, from, next) => {
    NProgress.start()
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${domTitle}-${to.meta.title}`))

    if (VueCookies.get(ACCESS_TOKEN)) {

        if (to.path == '/loginview/login') {
            if (store.getters.roles.length == 0) {
                store.dispatch('GetUserInfo').then(res => {
                    console.log(res)
                })
            }
            next({ path: '/form/formlist' })
        }
        next()
    } else {
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