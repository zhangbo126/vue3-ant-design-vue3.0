

import { toRaw } from 'vue'
export const watchMix = (newValue, oldValue, columns, oldData) => {

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


    const attrInfo = {}
    let spaceLen = 0
    newValue.forEach((v, i) => {
        if (v.mixList.length) {
            attrInfo[`attr${i + 1}`] = toRaw(v.mixList)
            spaceLen++
        }
    })

    const { attr1, attr2, attr3, attr4 } = attrInfo

    const renderData = () => {
        let data = []
        if (spaceLen == 1) {
            attr1.forEach(t1 => {
                let res = {
                    mixName1: t1.mixName,
                }
                data.push(res)
            })
            return data
        }
        if (spaceLen == 2) {
            attr1.forEach(t1 => {
                attr2.forEach(t2 => {
                    let res = {
                        mixName1: t1.mixName,
                        mixName2: t2.mixName,
                    }
                    data.push(res)
                })

            })
            return data
        }
        if (spaceLen == 3) {
            attr1.forEach(t1 => {
                attr2.forEach(t2 => {
                    attr3.forEach(t3 => {
                        let res = {
                            mixName1: t1.mixName,
                            mixName2: t2.mixName,
                            mixName3: t3.mixName,
                        }
                        data.push(res)
                    })
                })

            })
            return data
        }
        if (spaceLen == 4) {
            attr1.forEach(t1 => {
                attr2.forEach(t2 => {
                    attr3.forEach(t3 => {
                        attr4.forEach(t4 => {
                            let res = {
                                mixName1: t1.mixName,
                                mixName2: t2.mixName,
                                mixName3: t3.mixName,
                                mixName4: t4.mixName,
                            }
                            data.push(res)
                        })
                    })
                })

            })
            return data
        }
    }

    let data = renderData()
    console.log(data,toRaw(oldData))
    return {
        column,
        data
    }
}


