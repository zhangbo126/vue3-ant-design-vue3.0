import axios from 'axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { message } from 'ant-design-vue'
import VueCookies from 'vue-cookies'

const request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 6000,
})
//请求错误处理
const errorHandler = (error) => {
    store.dispatch('Logout').then(() => {
        setTimeout(() => {
            message.warning('异常退出')
        }, 1000)
    })

}

//请求头同意处理
request.interceptors.request.use(config => {
    const token = VueCookies.get(ACCESS_TOKEN)
    if (token) {
        config.headers['Access-Token'] = token
    }
    return config
}, errorHandler)
//请求返回数据格式同意处理
request.interceptors.response.use((response) => {
    return response.data
}, errorHandler)


export default request