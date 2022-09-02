

const auth ={
	  install(Vue){
		Vue.directive('auth',(el,binding)=>{
             console.log(el)
		})
	  }
}

export default auth