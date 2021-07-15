


const getters = {
  
    roles: state => {  
      return  state.permission.routers
    },
    addRouters: state => {
   
      return state.permission.addRouters
    },
    

}



export default getters


