import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
NProgress.configure({ showSpinner: false })


router.beforeEach((to, from, next) => {
    NProgress.start()

    next()
})

router.afterEach((to) => {
    NProgress.done()
})