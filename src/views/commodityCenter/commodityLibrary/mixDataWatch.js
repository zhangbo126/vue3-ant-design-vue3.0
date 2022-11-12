

import { toRaw, ref } from 'vue'

/**
 * @param {[Array]} mixArr 源数据 （二维数组）
 * @return {Array}  skuData 笛卡尔积
 */

const dimensionSkuFlot = (mixArr) => {
    if (mixArr.length < 2) return mixArr[0] || [];
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
        let obj = {};
        v.forEach((v, i) => {
            obj["specValue" + (1 + i)] = v.specValue;
            obj["mixKey" + (1 + i)] = v.key;
        });
        return obj;
    });
};

/**
 * @param {[Array]} newValue  最新规格项
 * @return {Array}  oldData  上一次编辑值
 */

export const watchMix = (newValue, oldValue, columns, oldData) => {
    const attrInfo = {}
    let mixTowArr = []
    //过滤出有属性的值
    newValue = newValue.filter(v => {
        return v.mixList.length > 0
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
    newValue.forEach((v, i) => {
        attrInfo[`attr${i + 1}`] = toRaw(v.mixList)
        mixTowArr.push(toRaw(v.mixList))
    })

    const { attr1, attr2, attr3, attr4 } = attrInfo
    //sku笛卡尔积阶乘 数据格式处理
    let data = dimensionSkuFlot(mixTowArr)
    //对比上一次的数据 赋值已填写的内容
    data.forEach(v => {
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

    /*table列合并*/
    if (column.length == 1) {
        column[0].customCell = ({ text, index }) => {
            const obj = {
                children: text,
                props: {},
            }
            return obj
        }
    }

    if (column.length == 2) {
        column[0].customCell = ({ text, index, record }) => {
            const obj = {
                children: text,
                props: {
                    rowSpan: 0
                },
            }

            let prev = data[index - 1]  //上一项
            let next = data[index + 1]  //下一项
            let current = data[index] //当前项
            let rowSpanNum = data.length / attr1.length  //相同的值要被合并的数量
            let isRow
            const isRowFlag1 = attr2.length == 1
            const isRowFlag2 = attr2.length == 1 && attr1.length > 1
            if (isRowFlag1 || isRowFlag2) {
                isRow = true
            }

            obj.props.rowSpan = rowSpanMerge(rowSpanNum, 'specValue1', prev, next, current, isRow)
            return obj
        }


    }
    if (column.length == 3) {
        column[0].customCell = ({ text, index, record }) => {
            const obj = {
                children: text,
                props: {
                    rowSpan: 0
                },
            }

            let prev = data[index - 1]  //上一项
            let next = data[index + 1]  //下一项
            let current = data[index] //当前项
            let rowSpanNum = data.length / attr1.length  //相同的值要被合并的数量
            let isRow
            const isRowFlag1 = attr2.length > 1 || attr3.length > 1

            if (!isRowFlag1) {
                isRow = true
            }
            obj.props.rowSpan = rowSpanMerge(rowSpanNum, 'specValue1', prev, next, current, isRow)
            return obj
        }

        column[1].customCell = ({ text, index, record }) => {
            const obj = {
                children: text,
                props: {
                    rowSpan: 0
                },
            }
            let prev = data[index - 1]  //上一项
            let next = data[index + 1]  //下一项
            let current = data[index] //当前项
            let rowSpanNum = data.length / attr2.length / attr1.length  //相同的值要被合并的数量
            if (attr2.length == 1) {
                rowSpanNum = 0
            }
            let isRow = false
            const isRowFlag1 = attr1.length == 1 && attr2.length == 1 && attr3.length == 1
            const isRowFlag2 = attr1.length > 1 && (attr2.length == 1 && attr3.length == 1)
            const isRowFlag3 = attr2.length > 1 && (attr1.length == 1 && attr3.length == 1)

            if (isRowFlag1 || isRowFlag2 || isRowFlag3) {
                isRow = true
            }
            if (attr2.length == 1 || attr3.length == 1) {
                return {
                    children: text
                }
            }
            obj.props.rowSpan = rowSpanMerge(rowSpanNum, 'specValue2', prev, next, current, isRow)

            return obj
        }
    }


    /*
        rowSpanNum 合并数量
        specValue 操作列参数名
        prev  上一项
        next 下一项
        current 当前项
        len 当前规格数量
    */
    const rowSpanMerge = (rowSpanNum, specValue, prev, next, current, isRow) => {
        //判断只有一行数据时
        if (next && next[specValue] == current[specValue] && !prev) {
            return rowSpanNum
        }
        if ((next && next[specValue] == current[specValue] && prev && prev[specValue] != current[specValue])) {
            return rowSpanNum
        }
        if (isRow) {

            return 1
        }
        return 0
    }
    return {
        column,
        data
    }
}


