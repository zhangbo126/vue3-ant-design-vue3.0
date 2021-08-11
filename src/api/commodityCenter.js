import request from '@/utils/request'


const api = {
    addClass: '/class/addClass',
    editClass: '/class/editClass',
    delClass: '/class/delClass',
    getClassList: '/class/getClassList',
    getPartentClass: '/class/getPartentClass',

}


 //商品中心图片上传
 export function imgUpload(data) {
    return request({
        url: '/upload/image',
        method: 'post',
        data
    })
} 


//获取分类列表
export function getClassList(data) {
    return request({
        url: api.getClassList,
        method: 'post',
        data
    })
}
//获取父级分类列表
export function getPartentClass() {
    return request({
        url: api.getPartentClass,
        method: 'post',
    })
}
//新增分类
export function addClass(data) {
    return request({
        url: api.addClass,
        method: 'post',
        data
    })
}
//编辑分类
export function editClass(data) {
    return request({
        url: api.editClass,
        method: 'post',
        data
    })
}
//删除分类
export function delClass(_id) {
    return request({
        url: api.delClass,
        method: 'post',
        data: {
            _id
        }
    })
}
