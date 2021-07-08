import request from '@/utils/request'

const api = {
    getRoleList: '/role/getRoleList',
    getAddMenuList: '/role/addGetMenuTree',
    getMenuTree: '/menu/getMenuTree',
    addMenuTree: '/menu/addMenu',
    getMenuList: '/menu/getMenuList'
}


//获取角色列表
export function getRoleList(data) {
    return request({
        url: api.getRoleList,
        method: 'post',
        data
    })
}
//新增时获取菜单
export function getAddMenuList() {
    return request({
        url: api.getAddMenuList,
        method: 'post',
    })
}


//获取菜单列表 树型
export function getMenuTree(data) {
    return request({
        url: api.getMenuTree,
        method: 'post',
        data
    })
}
//获取菜单列表  list
export function getMenuList() {
    return request({
        url: api.getMenuList,
        method: 'post',

    })
}

//新增菜单
export function addMenuTree(data) {
    return request({
        url: api.addMenuTree,
        method: 'post',
        data
    })
}







