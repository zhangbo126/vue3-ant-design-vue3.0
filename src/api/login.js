import request from '@/utils/request'

const api = {
  getUserInfo: '/auth/userinfo',
  getCurrentUserNav: '/user/nav',
  login: '/auth/login',
  getUserInfoTree: 'api/v1/UserInfo/GetUserInfoTree',
  getRouterTree: 'api/v1/Module/GetSearchTreeData',
}


export function getUserInfo() {
  return request({
    url: api.getUserInfo,
    method: 'get',
  })
}



export function logins(data) {
  return request({
    url: api.login,
    method: 'post',
    data,

  })
}



export function getUserInfoTree() {
  return request({
    url: api.getUserInfoTree,
    method: 'post',
  })
}


export function getRouterTree() {
  return request({
    url: api.getRouterTree,
    method: 'post'
  })
}

export function getCurrentUserNav() {
  return request({
    url: api.getCurrentUserNav,
    method: 'get'
  })
}


export function requestDemo(data) {

  return request({
    url: 'api/v1/GoodsEdit/GetSearchPageData',
    method: 'post',
    data

  })
}

