import request from '@/utils/request'

const api = {
    getRoleList: '/role/getRoleList',
    getAddMenuList: '/role/addGetMenuTree',
    getEditMenuList: '/role/editGetMenuTree',
    addRole: '/role/addRole',
    eidtRole: '/role/editRole',
    removeRole: '/role/removeRole',
    getMenuTree: '/menu/getMenuTree',
    addMenuTree: '/menu/addMenu',
    getMenuList: '/menu/getMenuList',
    editMenuTree: '/menu/editMenu',
    removeMenuTree: '/menu/removeMenu',
    getAccountList: '/users/getAccountList',
    addAccount: '/users/addAccount',
    delAccount: '/users/delAccount',
    accountStatusSet: '/users/accountStatusSet',
    resultPassWord: '/users/resultPassWord',
    editPassword: '/users/editPassword',
    editPasswordTesting: '/users/editPasswordTesting',
    roleAssignment: '/users/roleAssignment',
}


//获取角色列表
export function getRoleList(data) {
    return request({
        url: api.getRoleList,
        method: 'post',
        data
    })
}

//新增角色
export function addRole(data) {
    return request({
        url: api.addRole,
        method: 'post',
        data
    })
}
//编辑角色
export function eidtRole(data) {
    return request({
        url: api.eidtRole,
        method: 'post',
        data
    })
}

//删除角色
export function removeRole(id) {
    return request({
        url: api.removeRole,
        method: 'post',
        data: {
            id
        }
    })
}

//新增时获取菜单
export function getAddMenuList() {
    return request({
        url: api.getAddMenuList,
        method: 'post',
    })
}

//编辑时获取菜单
export function getEditMenuList(id) {
    return request({
        url: api.getEditMenuList,
        method: 'post',
        data: {
            id
        }
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


//编辑菜单
export function editMenuTree(data) {
    return request({
        url: api.editMenuTree,
        method: 'post',
        data
    })
}
//删除菜单
export function removeMenuTree(id) {
    return request({
        url: api.removeMenuTree,
        method: 'post',
        data: {
            id
        }
    })
}


//获取账号列表
export function getAccountList() {
    return request({
        url: api.getAccountList,
        method: 'post',

    })
}

// 新增账号
export function addAccount(data) {
    return request({
        url: api.addAccount,
        method: 'post',
        data
    })
}
// 删除账户
export function delAccount(id) {
    return request({
        url: api.delAccount,
        method: 'post',
        data: {
            id
        }
    })
}
// 账号启用 / 禁用
export function accountStatusSet(data) {
    return request({
        url: api.accountStatusSet,
        method: 'post',
        data
    })
}
// 重置密码
export function resultPassWord(data) {
    return request({
        url: api.resultPassWord,
        method: 'post',
        data
    })
}
// 角色分配
export function roleAssignment(data) {
    return request({
        url: api.roleAssignment,
        method: 'post',
        data
    })
}


// 修改密码

export function editPassword(data) {
    return request({
        url: api.editPassword,
        method: 'post',
        data
    })
}

// 修改密码 验证
export function editPasswordTesting(passWord) {
    return request({
        url: api.editPasswordTesting,
        method: 'post',
        data: {
            passWord
        }
    })
}


