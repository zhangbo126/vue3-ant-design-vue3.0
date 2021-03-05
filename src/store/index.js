
import { createStore } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import login from './modules/login'
import permission from './modules/async-router'
const store = createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {
        login,
        permission,
    }
})

export default store