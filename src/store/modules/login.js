
import VueCookies from 'vue-cookies'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getUserInfo, login } from '@/api/login'

const logins = {
    state: {
        userInfo: {}
    },
    mutations: {

        SET_USER_INFO: (state, result) => {
            state.userInfo = result.userInfo
    
        }
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
        GetUserInfo({ commit }) {
            return new Promise((reslove, reject) => {
                getUserInfo().then(res => {
                    if (res.code == 1) {
                        commit('SET_USER_INFO', res.data)
                        reslove(res)
                    }
                    if (res.code == -1) {
                        reject(-1)
                    }
                }).catch(() => {
                    reject()
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