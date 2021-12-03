import axios from 'axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { message } from 'ant-design-vue'
import VueCookies from 'vue-cookies'
import store from '@/store/'
const request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 6000,
})





//请求错误处理
const errorHandler = (error) => {
    const status = error.response.status
    store.dispatch('Logout').then(() => {
        setTimeout(() => {
            message.warning('登录异常')
        }, 1000)
    })
}

//请求头同意处理
request.interceptors.request.use(config => {
    const token = VueCookies.get(ACCESS_TOKEN)
    if (token) {
        config.headers['authorization'] = token
    }
    return config
}, errorHandler)
//请求返回数据格式同意处理
request.interceptors.response.use((response) => {
    if (response.data.code == 0) {
        return message.warning(response.data.message)
    }
    return response.data
}, errorHandler)


export default request