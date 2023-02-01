
import store from '@/store'
import { toRaw, nextTick } from 'vue'

/**
   directiveAuth  权限按钮自定义指令
* @params {Vue}   vue实列操作对象
*/
const directiveAuth = (Vue) => {
	Vue.directive('auth', (el, binding) => {
		const permissions = toRaw(store.state.login.btnAuthList)
		//当前元素标识
		const { value } = binding
		if (value && value instanceof Array && value.length > 0) {
			const permissionFlag = value
			//判断标识是否匹配
			const hasPermissions = permissions.some(permission => {
				return permissionFlag.includes(permission)
			})
			//如果没有权限 则删除该元素
			if (!hasPermissions) {
				el.parentNode && el.parentNode.removeChild(el)
			}
		} else {
			throw new Error(`没有该按钮操作权限`)
		}
	})
}



/**
   directiveDragModal  
* @params {Vue}   vue实列操作对象
*/
const directiveDragModal = (Vue) => {
	Vue.directive('drag-modal', (el, binding, vnode) => {
		nextTick(() => {

		})
	})

}

const auth = {
	install(Vue) {
		directiveAuth(Vue)
		// directiveDragModal(Vue)
	}
}

export default auth