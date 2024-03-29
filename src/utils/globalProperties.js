import {session,local} from './storage'  //会话和本地缓存全局方法
import url from '@/config/routerPath' //全局静态路由
import { messageListener, messageSend } from './webScoket'; //webscoket 全局方法
import { drawAssetsImage } from '@/utils/utilityFunction.js' //获取本地图片方法
import mitt from 'mitt' //全局总事件方法
const globalProperties = {
	install(Vue) {
		Vue.config.globalProperties.$session = session
		Vue.config.globalProperties.$local = local
		Vue.config.globalProperties.$urls = url
		Vue.config.globalProperties.$drawAssetsImage = drawAssetsImage
		Vue.config.globalProperties.$bus = mitt()
		Vue.config.globalProperties.$scoketEvent = {
			messageSend,
			messageListener,
		}
	}
}

export default {
	...globalProperties
}