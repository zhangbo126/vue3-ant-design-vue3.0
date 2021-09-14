import request from '@/utils/request'


const api = {
    addClass: '/class/addClass',
    editClass: '/class/editClass',
    delClass: '/class/delClass',
    getClassList: '/class/getClassList',
    getPartentClass: '/class/getPartentClass',
    addBrand: '/brand/addBrand',
    editBrand: '/brand/editBrand',
    delBrand: '/brand/delBrand',
    getBrandList: '/brand/getBrandList',
    addGoods: '/goods/addGoods',
    editGoods: '/goods/editGoods',
    getGoodsList: '/goods/getGoodsList',
    getEditGoodsInfo: '/goods/getEditGoodsInfo',
    setGoodsDetails: '/goods/setGoodsDetails',
    getGoodsDetails: '/goods/getGoodsDetails',
}


//商品中心图片上传
export function imgUpload(data) {
    return request({
        url: '/upload/image',
        method: 'post',
        data
    })
}
//商品中心图片批量上传
export function imgBatchUpload(data) {
    return request({
        url: '/upload/batchimage',
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

//新增品牌
export function addBrand(data) {
    return request({
        url: api.addBrand,
        method: 'post',
        data
    })
}
//编辑品牌
export function editBrand(data) {
    return request({
        url: api.editBrand,
        method: 'post',
        data
    })
}

//删除品牌
export function delBrand(_id) {
    return request({
        url: api.delBrand,
        method: 'post',
        data: {
            _id
        }
    })
}
//获取品牌列表
export function getBrandList(data) {
    return request({
        url: api.getBrandList,
        method: 'post',
        data
    })
}


//新增商品
export function addGoods(data) {
    return request({
        url: api.addGoods,
        method: 'post',
        data
    })
}
//编辑商品
export function editGoods(data) {
    return request({
        url: api.editGoods,
        method: 'post',
        data
    })
}
//获取商品列表
export function getGoodsList(data) {
    return request({
        url: api.getGoodsList,
        method: 'post',
        data
    })
}


//编辑获取商品信息
export function getEditGoodsInfo(goodsId) {
    return request({
        url: api.getEditGoodsInfo,
        method: 'post',
        data: {
            goodsId
        }
    })
}
// 设置商品详情
export function setGoodsDetails(data) {
    return request({
        url: api.setGoodsDetails,
        method: 'post',
        data
    })
}
// 设置商品详情
export function getGoodsDetails(goodsId) {
    return request({
        url: api.getGoodsDetails,
        method: 'post',
        data: {
            goodsId
        }
    })
}
