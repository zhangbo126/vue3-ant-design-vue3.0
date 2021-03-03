
import VueCookies from 'vue-cookies'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getInfo } from '@/api/login'
const login = {
    state: {
        token: ''
    },
    mutations: {
        SET_ACCESS_TOKEN: (state, token) => {
            state.token = token
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            return new Promise((reslove, reject) => {
                VueCookies.set(ACCESS_TOKEN, Math.floor(Math.random() * 199999))
                reslove()
                commit('SET_ACCESS_TOKEN', Math.floor(Math.random() * 199999))
            })
        },
        GetUserInfo({ commit }) {
            return new Promise((reslove, reject) => {
                getInfo().then(res => {
                    reslove(res)
                })
            })
        },
        Logout() {
            return new Promise((reslove, reject) => {
                VueCookies.remove(ACCESS_TOKEN)
                VueCookies.remove(REFRESHTOKEN)
                sessionStorage.clear()
                localStorage.clear()
                location.reload()
            })
        }
    }
}


export default login