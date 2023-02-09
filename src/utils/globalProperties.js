import {session,local} from './storage'  //会话和本地缓存全局方法
import url from './config/routerPath' //全局静态路由
import { messageListener, messageSend } from './webScoket'; //webscoket 全局方法
const globalProperties = {
	install(Vue) {
		Vue.config.globalProperties.$session = session
		Vue.config.globalProperties.$local = local
		Vue.config.globalProperties.$urls = url
		Vue.config.globalProperties.$scoketEvent = {
			messageSend,
			messageListener,
		}
	}
}

export default {
	...globalProperties
}