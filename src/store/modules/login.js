
import VueCookies from 'vue-cookies'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getUserInfo ,logins} from '@/api/login'
const login = {
    state: {
        token: '',
        roles: [],

    },
    mutations: {
        SET_ACCESS_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            return new Promise((reslove, reject) => {
                // VueCookies.set(ACCESS_TOKEN, Math.floor(Math.random() * 199999))
                // reslove()
               
                // commit('SET_ACCESS_TOKEN', Math.floor(Math.random() * 199999))
                logins(userInfo).then(res=>{
                     
                    const result = res
                    VueCookies.set(ACCESS_TOKEN, result.token, 10 * 24 * 60 * 60 * 1000)                   
                    reslove(res)
                })
            })
        },
        GetUserInfo({ commit }) {

            return new Promise((reslove, reject) => {
                getUserInfo().then(res => {
                    commit('SET_ROLES', res.result)
                    reslove(res)
                })
                
            })
        },
        Logout() {
            return new Promise((reslove, reject) => {
                // VueCookies.remove(ACCESS_TOKEN)       
                // sessionStorage.clear()
                // localStorage.clear()
                // location.reload()
            })
        }
    }
}


export default login