import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Antd from 'ant-design-vue';

import '../src/assets/css/result.css'
import Antd from './utils/antd_lazy'
import Filters from './utils/filters'
import OverallMethod from "./core/overall";  //自定义封装全局方法
// import './mock'
import './permission'
const app = createApp(App)


app.use(Antd).use(Filters).use(OverallMethod).use(router).use(store).mount('#app')
