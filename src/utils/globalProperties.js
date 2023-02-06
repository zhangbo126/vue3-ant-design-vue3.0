import session from "./session";  //会话缓存全局方法
import url from './config/routerPath' //全局静态路由
import { messageReceived, messageSend, onClose } from './webScoket'; //webscoket 全局方法
const globalProperties = {
	install(Vue) {
		Vue.config.globalProperties.$session = session
		Vue.config.globalProperties.$urls = url
		Vue.config.globalProperties.$scoketEvent = {
			messageSend,
			messageReceived,
			onClose,
			
		}
	}
}

export default {
	...globalProperties
}