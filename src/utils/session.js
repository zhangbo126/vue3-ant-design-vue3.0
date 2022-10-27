/** 
 * 设置 处理会话缓存 sessionStorage
 * @param {String} sessionName  key
 * @param {Object} sessionContent value 
 * @return {obj} 
*/
const set = (sessionName, sessionContent) => {
	if (!sessionName) { return null }
	if (!sessionContent) { return null }
	var obj = sessionStorage.setItem(sessionName, JSON.stringify(sessionContent))
	return obj
}



/** 
 * 获取处理会话缓存 sessionStorage
 * @param {String} sessionName  key
 * @return {obj} 
*/
const get = (sessionName) => {
	if (!sessionName) { return null }
	var obj = JSON.parse(sessionStorage.getItem(sessionName))
	return obj
}




/** 
 * 删除处理会话缓存 sessionStorage
 * @param {String} sessionName  key
 * @return {obj} 
*/
const remove = (sessionName) => {
	sessionStorage.removeItem(sessionName)
}


export default {
	set,
	get,
	remove
}