import session from "./session";  //会话缓存全局方法
import url from './config/routerPath' //全局静态路由


const globalProperties = {
	install(Vue) {
		Vue.config.globalProperties.$session = session
		Vue.config.globalProperties.$url = url
	}
}

export default {
	...globalProperties
}