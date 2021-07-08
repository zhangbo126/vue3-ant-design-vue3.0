const filters = {
    install(Vue) {
        Vue.config.globalProperties.$filters = {
            filterAsyn(val) {
                return '过滤后的内容' + val
            }
        }
    }
}
export default filters