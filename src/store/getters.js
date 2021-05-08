


const getters = {
  
    roles: state => {  
      return  state.permission.routers
    },
    addRouters: state => state.permission.addRouters,

}



export default getters


