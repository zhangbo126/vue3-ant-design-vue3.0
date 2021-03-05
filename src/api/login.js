import request from '@/utils/request'

const api = {
    getUserInfo: '/user/info',
    getCurrentUserNav:'/user/nav'
}


export function getUserInfo() {

    return request({
        url: api.getUserInfo,
        method: 'get',
    })
}


export function getCurrentUserNav () {
    return request({
      url: api.getCurrentUserNav,
      method: 'get'
    })
  }