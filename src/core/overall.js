/* 
   设置
   处理会话缓存 sessionStorage
   sessionName 缓存名称
   storageObj 缓存数据
*/

const set = (sessionName, storageObj) => {
    if (!sessionName) { return null }
    if (!storageObj) { return null }
    var obj = sessionStorage.setItem(sessionName, JSON.stringify(storageObj))
    return obj
}
/* 
   获取
   处理会话缓存 sessionStorage
   sessionName 缓存名称
  
*/
const get = (sessionName) => {
    if (!sessionName) { return null }
    var obj = JSON.parse(sessionStorage.getItem(sessionName))
    return obj
}

/*
 移除
   sessionName 缓存名称
*/

const remove = (sessionName) => {
    sessionStorage.removeItem(sessionName)
}


const sessionAction = {
    set,
    get,
    remove
}

const Storeage = {
    install(Vue) {
        Vue.config.globalProperties.$session = sessionAction
    }
}

export default {
    ...Storeage
}
