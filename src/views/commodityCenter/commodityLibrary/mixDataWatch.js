

import { toRaw, ref } from 'vue'

/**
 * @param {[Array]} mixArr 源数据 （二维数组）
 * @return {Array}  skuData 笛卡尔积
 */

const dimensionSkuFlot = (mixArr) => {
    if (mixArr.length == 0) return []
    let skuData = [].reduce.call(mixArr, function (col, set) {
        let res = [];
        col.forEach((c) => {
            set.forEach((s) => {
                let t = [].concat(Array.isArray(c) ? c : [c]);
                t.push(s);
                res.push(t);
            });
        });
        return res;
    });
    return skuData.map((v) => {
        let map = Array.isArray(v) ? v : [v]
        let obj = {};
        map.forEach((v, i) => {
            obj["specValue" + (1 + i)] = v.specValue;
            obj["mixKey" + (1 + i)] = v.key;
        });
        return obj;
    });
};





/**
 * @param {[Array]} dataSource  源数据
 * @param {Array} keys   要合并的关键字
 */

const combineRow = (dataSource, keys) => {
    keys.forEach(key => {
        for (var i = 0; i < dataSource.length; i++) {
            const item = dataSource[i]
            let count = 1
            for (let j = i + 1; j < dataSource.length; j++) {
                // 如果是同一个值，往后递增
                if (item[key] === dataSource[j][key]) {
                    count++
                    // 往后相同的值都设为空单元格
                    dataSource[j][`${key}RowSpan`] = 0
                    // 只有同值第一个才设置合并的单元格数
                    item[`${key}RowSpan`] = count
                    // 所有都是为同一个值的情况
                    // 如果到了尾部，则循环结束
                    if (j === dataSource.length - 1) {
                        return
                    }
                } else {
                    // 指针跳转到下一个，从下一排开始
                    i = j - 1
                    count = 1
                    dataSource[j][`${key}RowSpan`] = 0
                    break
                }
            }
        }
    })
}




/**
 * @param {[Array]} newValue  最新规格项
 * @param {[Array]} oldData  上一次编辑值
 * @return {dataSource,column}  
 */

export const watchMix = (newValue, oldValue, columns, oldData) => {
    let mixTowArr = []
    //过滤出有属性的值
    newValue = newValue.filter(v => {
        return v.mixList.length > 0
    })
    newValue.forEach((v, i) => {
        mixTowArr.push(toRaw(v.mixList))
    })
    //sku笛卡尔积阶乘 数据格式处理
    let dataSource = dimensionSkuFlot(mixTowArr)
    //对比上一次的数据 赋值已填写的内容
    dataSource.forEach(v => {
        v.price = ''
        v.weight = ''
        v.skuName = ''
        v.designSketch = []
        v.goodsId = ''
        v.goodsType = 1
        toRaw(oldData).forEach(o => {
            const minKeyRule1 = v.mixKey1 == o.mixKey1 && v.mixKey2 == o.mixKey2 && v.mixKey3 == o.mixKey3 && v.mixKey4 == o.mixKey4
            const minKeyRule2 = v.specValue1 == o.specValue1 && v.specValue2 == o.specValue2 && v.specValue3 == o.specValue3 && v.specValue4 == o.specValue4
            const { price, weight, designSketch, skuName, goodsId, goodsType } = o
            if (minKeyRule1 || minKeyRule2) {
                Object.assign(v, {
                    price, weight, designSketch, skuName, goodsId, goodsType
                })
            }
        })
    })


    /*动态处理表头*/
    let column = []
    newValue.forEach((v, i) => {
        if (!v.mixList.length) {
            return
        }
        let map = {
            title: v.spaceName,
            dataIndex: `specValue${i + 1}`,
            align: "center",
            width: 200,
        }
        column.push(map)
    })

    /*table列合并*/
    if (column.length == 2) {
        //列合并前提条件
        if (dataSource.length > 2) {
            combineRow(dataSource, ['specValue1'])
        }
        column[0].customCell = (record, rowIndex, column) => {

            let rowSpan = record.specValue1RowSpan
            return {
                rowSpan
            }
        }

    }

    if (column.length == 3) {
        //列合并前提条件
        if (dataSource.length > 2) {
            combineRow(dataSource, ['specValue1', 'specValue2'])
        }
        column[0].customCell = (record, rowIndex, column) => {
            let rowSpan = record.specValue1RowSpan
            return {
                rowSpan
            }
        }

        column[1].customCell = (record, rowIndex, column) => {
            let rowSpan = record.specValue2RowSpan
            return {
                rowSpan
            }
        }
    }

    return {
        column,
        dataSource
    }
}


