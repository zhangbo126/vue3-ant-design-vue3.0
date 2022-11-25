import request from '@/utils/request'




const api = {
    addInformation: '/information/addInformation',
    stopActivity: '/information/stopActivity',
    getActivityList: '/information/getActivityList',
    delActivity: '/information/delActivity',

}


//图片上传
export function imgUpload(data) {
    return request({
        url: '/upload/image',
        method: 'post',
        data
    })
}

//新增活动
export const addInformation = (data) => {
    return request({
        url: api.addInformation,
        method: 'post',
        data
    })
}
//结束活动
export const stopActivity = (id) => {
    return request({
        url: api.stopActivity,
        method: 'post',
        data: {
            id
        }
    })
}

//删除活动
export const delActivity = (id) => {
    return request({
        url: api.delActivity,
        method: 'post',
        data: {
            id
        }
    })
}

//获取活动列表
export const getActivityList = (data) => {
    return request({
        url: api.getActivityList,
        method: 'post',
        data
    })
}

