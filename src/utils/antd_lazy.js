/* eslint-disable */
/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import { Modal,notification,message, } from 'ant-design-vue'
import * as antIcons from '@ant-design/icons-vue'
import { ZTable, ZModal } from '@/components' //table组件二次封装
const ant = {
    install(Vue) {
        Vue.component('ZTable', ZTable)
        // Vue.component('ZModal', ZModal)
        Object.keys(antIcons).forEach(key => {
            Vue.component(key, antIcons[key])
        })
        Vue.config.globalProperties.$message = message
        Vue.config.globalProperties.$notification = notification
        Vue.config.globalProperties.$confirm = Modal.confirm
        Vue.config.globalProperties.$antIcons = antIcons
        Vue.config.productionTip = false
    }
}

export default ant


