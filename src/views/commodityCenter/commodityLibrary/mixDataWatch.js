

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
            dataIndex: `mixName${i + 1}`,
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
                    mixName1: t1.mixName,
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
                        mixName1: t1.mixName,
                        mixName2: t2.mixName,
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
                            mixName1: t1.mixName,
                            mixName2: t2.mixName,
                            mixName3: t3.mixName,
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
                                mixName1: t1.mixName,
                                mixName2: t2.mixName,
                                mixName3: t3.mixName,
                                mixName4: t4.mixName,
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
        v.designSketch = []
        toRaw(oldData).forEach(o => {
            if (v.mixKey1 == o.mixKey1 && v.mixKey2 == o.mixKey2 && v.mixKey3 == o.mixKey3 && v.mixKey4 == o.mixKey4) {
                v.price = o.price
                v.mixLength = o.mixLength
                v.mixWidth = o.mixWidth
                v.mixHeight = o.mixHeight
                v.designSketch = o.designSketch
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
        column[0].customRender = ({ text, i }) => {
            const obj = {
                children: text,
                props: {},
            }
            console.log(data[i-1])
            if(data[i-1] && data[i-1].mixName1 == data[i].mixName1){
                obj.props.rowSpan = 2;
            }
            return obj
        }
    }


    // console.log( toRaw(oldData))

    return {
        column,
        data
    }
}


