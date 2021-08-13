import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";
import '../src/assets/css/result.css'
import Antd_Lazy from './utils/antd_lazy'
import Filters from './utils/filters'
import OverallMethod from "./core/overall";  //自定义封装全局方法


import './permission'
const app = createApp(App)
app.use(Filters).use(OverallMethod).use(router).use(store).use(Antd).use(Antd_Lazy).mount('#app')
