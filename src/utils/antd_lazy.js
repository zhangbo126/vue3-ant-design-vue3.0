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


const ant = {
    install(Vue) {
        Vue.component(Button.name, Button)
        Vue.component(Input.name, Input)
        Vue.component(Input.Password.name, Input.Password)
        Vue.component(Steps.name, Steps)
        Vue.component(Form.name, Form)
        Vue.component(Select.name, Select)
        Vue.component(Row.name, Row)
        Vue.component(Radio.name, Radio)
        Vue.component(DatePicker.name, DatePicker)
        Vue.component(Col.name, Col)
        Vue.component(Layout.name, Layout)
        Vue.component(Layout.Sider.name, Layout.Sider)
        Vue.component(Layout.Header.name, Layout.Header)
        Vue.component(Layout.Footer.name, Layout.Footer)
        Vue.component(Icon.name, Icon)
        Vue.component(Checkbox.name, Checkbox)
        Vue.component(Switch.name, Switch)
        Vue.component(Space.name, Space)
        Vue.component(Menu.name, Menu)
        Vue.component(Menu.Item.name, Menu.Item)
        Vue.component(Pagination.name, Pagination)
        Vue.component(Calendar.name, Calendar)
        Vue.component(InputNumber.name, InputNumber)
        Vue.component(Upload.name, Upload)
        Vue.component(Popover.name, Popover)
        Vue.component(Table.name, Table)
        Vue.component(Tabs.name, Tabs)
        Vue.component(Tooltip.name, Tooltip)
        Vue.component(Tree.name, Tree)
        Vue.component(Modal.name, Modal)
        Vue.component(Drawer.name, Drawer)
        Vue.component(Popconfirm.name, Popconfirm)
        Vue.component(Progress.name, Progress)
        Vue.component(Result.name, Result)
        Vue.component(Spin.name, Spin)
        Vue.component(Card.name, Card)
        Vue.component(Form.Item.name, Form.Item)

        Vue.config.globalProperties.$message = message
        Vue.config.globalProperties.$notification = notification
        Vue.config.globalProperties.$confirm = Modal.confirm
        Vue.config.productionTip = false
    }
}

export default ant


