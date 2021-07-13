import axios from 'axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { message } from 'ant-design-vue'
import VueCookies from 'vue-cookies'
import store from '@/store/'
const request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 6000,
})

request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
request.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
request.defaults.headers['Access-Control-Allow-Origin'] = '*'


//请求错误处理
const errorHandler = (error) => {
    console.log(error.response)
    const status = error.response.status
    if (status == 401) {

        store.dispatch('Logout').then(() => {
            setTimeout(() => {
                message.warning('授权登录过期')
            }, 1000)
        })
    }           


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