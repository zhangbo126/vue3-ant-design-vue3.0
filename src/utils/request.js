import axios from 'axios'
import { ACCESS_TOKEN } from '@/config/constant'
import { message } from 'ant-design-vue'
import VueCookies from 'vue-cookies'
import store from '@/store'
const request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 6000,
})


//请求错误处理
const errorHandler = (error) => {
    return message.error(error.message)
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
    const { code } = response.data
    if (code != 1) {
         message.warning(response.data.message)
         return Promise.reject(response.data)
    }
    //登录失效，异常处理
    if (code == 403) {
        store.dispatch('Logout').then(() => {
            setTimeout(() => {
                message.warning('登录异常')
            }, 1000)
        })
    }

    return response.data
}, errorHandler)


export default request