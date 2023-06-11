import { Modal, notification, message, } from 'ant-design-vue'
import * as antIcons from '@ant-design/icons-vue'
import { ZTable, ZModal, ZTextTooltip, ZUpload } from '@/components' //table组件二次封装
const ant = {
    install(Vue) {
        Vue.component('ZTable', ZTable)
        Vue.component('ZTextTooltip', ZTextTooltip)
        Vue.component('ZUpload', ZUpload)
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


