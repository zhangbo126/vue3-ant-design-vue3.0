

import { toRaw } from 'vue'
export const watchMix = (newValue, oldValue, columns, oldData) => {
    const attrInfo = {}
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
    })

    const { attr1, attr2, attr3, attr4 } = attrInfo

    const renderData = () => {
        let data = []
        if (newValue.length == 1) {
            attr1.forEach(t1 => {
                let res = {
                    specValue1: t1.specValue,
                    mixKey1: t1.key
                }
                data.push(res)
            })

            return data
        }
        if (newValue.length == 2) {
            attr1.forEach(t1 => {
                attr2.forEach(t2 => {
                    let res = {
                        specValue1: t1.specValue,
                        specValue2: t2.specValue,
                        mixKey1: t1.key,
                        mixKey2: t2.key,
                    }
                    data.push(res)
                })

            })
            return data
        }
        if (newValue.length == 3) {
            attr1.forEach(t1 => {
                attr2.forEach(t2 => {
                    attr3.forEach(t3 => {
                        let res = {
                            specValue1: t1.specValue,
                            specValue2: t2.specValue,
                            specValue3: t3.specValue,
                            mixKey1: t1.key,
                            mixKey2: t2.key,
                            mixKey3: t3.key,
                        }
                        data.push(res)
                    })
                })

            })
            return data
        }
        if (newValue.length == 4) {
            attr1.forEach(t1 => {
                attr2.forEach(t2 => {
                    attr3.forEach(t3 => {
                        attr4.forEach(t4 => {
                            let res = {
                                specValue1: t1.specValue,
                                specValue2: t2.specValue,
                                specValue3: t3.specValue,
                                specValue4: t4.specValue,
                                mixKey1: t1.key,
                                mixKey2: t2.key,
                                mixKey3: t3.key,
                                mixKey4: t4.key,
                            }
                            data.push(res)
                        })
                    })
                })

            })
            return data
        }

    }

    let data = renderData() || []
    //对比上一次的数据 赋值已填写的内容
    data.forEach(v => {
        v.price = ''
        v.mixLength = ''
        v.mixWidth = ''
        v.mixHeight = ''
        v.skuName=''
        v.designSketch = []
        toRaw(oldData).forEach(o => {
            if (v.mixKey1 == o.mixKey1 && v.mixKey2 == o.mixKey2 && v.mixKey3 == o.mixKey3 && v.mixKey4 == o.mixKey4) {
                v.price = o.price
                v.mixLength = o.mixLength
                v.mixWidth = o.mixWidth
                v.mixHeight = o.mixHeight
                v.designSketch = o.designSketch
                v.skuName = o.skuName
            }

        })
    })


    /*table列合并*/
    if (column.length == 1) {
        column[0].customRender = ({ text, index }) => {
            const obj = {
                children: text,
                props: {},
            }
            return obj
        }
    }

    if (column.length == 2) {
        column[0].customRender = ({ text, index, record }) => {
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
        column[0].customRender = ({ text, index, record }) => {
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

        column[1].customRender = ({ text, index, record }) => {
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


