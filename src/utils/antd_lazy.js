/* eslint-disable */
/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import {
    Button,
    Input,
    Steps,
    Form,
    Select,
    Row, Radio,
    DatePicker,
    Col, Icon,
    Checkbox,
    Switch,
    Layout,
    Space,
    Menu,
    Pagination,
    Calendar,
    InputNumber,
    Upload,
    Popover,
    Table,
    Tabs,
    Tooltip,
    Tree,
    Drawer,
    Modal,
    Popconfirm,
    Progress,
    Result,
    Spin,
    Card,
    notification,
    message,
} from 'ant-design-vue'

import * as antIcons from '@ant-design/icons-vue'
import { ZTable } from '@/components' //table组件二次封装
const ant = {
    install(Vue) {
        Vue.component('ZTable', ZTable)
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


