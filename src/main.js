import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import VueUeditorWrap from 'vue-ueditor-wrap' //富文本编辑框
import "ant-design-vue/dist/antd.css";
import '@/style/index.less'
import GlobalComponent from '@/utils/globalComponent'  //全局组件
import GlobalProperties from "@/utils/globalProperties.js";  //自定义封装全局方法
import Directive from '@/utils/directive.js' //自定义全局指令
import './permission'
const app = createApp(App)
app.use(GlobalProperties)
app.use(store)
app.use(router)
app.use(Antd)
app.use(VueUeditorWrap)
app.use(GlobalComponent)
app.use(Directive)
app.mount('#app')
