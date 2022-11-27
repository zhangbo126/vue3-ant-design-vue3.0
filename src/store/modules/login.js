
import VueCookies from 'vue-cookies'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getUserInfo, login } from '@/api/login'

const logins = {
    state: {
        userInfo: {},
        btnAuthList: [],//按钮权限列表
    },
    mutations: {
        //设置当前用户信息
        SET_USER_INFO: (state, result) => {
            state.userInfo = result.userInfo
        },
        //设置当前账号权限按钮
        SET_USER_BTN: (state, btnAuthList) => {
            state.btnAuthList = btnAuthList
        },
    },
    actions: {
        Login({ commit }, userInfo) {
            return new Promise((reslove, reject) => {
                login(userInfo).then(res => {
                    const result = res.data

                    if (res.code == 1) {
                        VueCookies.set(ACCESS_TOKEN, result.token, 10 * 24 * 60 * 60 * 1000)
                        reslove(res)
                        return
                    }
                    reject(result)
                })
            })
        },
        GetUserInfo({ commit, dispatch }) {
            return new Promise((reslove, reject) => {
                getUserInfo().then(res => {
                    if(!res.data){
                       return  dispatch('Logout')
                    }
                    commit('SET_USER_INFO', res.data)
                    commit('SET_USER_BTN', res.data.btnAuthList)                    
                    reslove(res)
                }).catch((err) => {
                })
            })
        },
        Logout() {
            return new Promise((reslove, reject) => {
                VueCookies.remove(ACCESS_TOKEN)
                sessionStorage.clear()
                localStorage.clear()
                location.reload()
            })
        }
    }
}


export default logins