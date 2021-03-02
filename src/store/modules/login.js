const login = {
    state: {
        name: 'LOGIN'
    },
    mutations: {
        MOUDLE_DEMO: (state, type) => {
            console.log(state, type)
        }
    },
    actions: {
        moudlesDemp({ commit }, obj) {
            commit('MOUDLE_DEMO', obj)
        }
    }
}


export default login