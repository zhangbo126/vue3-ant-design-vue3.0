import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import VueUeditorWrap from 'vue-ueditor-wrap' //富文本编辑框
import "ant-design-vue/dist/antd.css";
import '../src/assets/css/result.css'
import Antd_Lazy from './utils/antd_lazy'
import GlobalProperties from "@/utils/globalProperties.js";  //自定义封装全局方法
import Auth from '@/utils/auth.js' //自定义全局指令
import './permission'
const app = createApp(App)
app.use(GlobalProperties).use(router).use(store).use(Antd).use(VueUeditorWrap).use(Antd_Lazy).use(Auth).mount('#app')
