import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd  from './utils/antd_lazy'
import './permission'
const app  = createApp(App)

app.use(Antd).use(router).use(store).mount('#app')
