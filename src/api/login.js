import request from '@/utils/request'

const api = {
  login: '/users/login',
  getUserInfo:'/users/getuserInfo'

}



export function login(data) {
  return request({
    url: api.login,
    method: 'post',
    data
  })
}
export function getUserInfo() {
  return request({
    url: api.getUserInfo,
    method: 'post',
  })
}





