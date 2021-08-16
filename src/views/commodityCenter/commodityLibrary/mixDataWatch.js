

import { toRaw } from 'vue'
export const watchMix = (newValue, oldValue, columns, oldData) => {

    /*动态处理表头*/
    columns = newValue.map((v, i) => {
        let map = {
            title: v.spaceName,
            dataIndex: `attr${i + 1}`,
            align: "center",
            width: 200,
        }
        return map
    })


    let attr = []
    newValue.forEach((v, i) => {
        if (v.mixList.length) {
            attr.push(toRaw(v.mixList))
        }
    })

    /*笛卡尔乘积处理 商品规格*/
    function cartesian(arr) {
        const result = arr.reduce((accArr, currentArr) => {
            let result = []
            currentArr.forEach(c => {
                if (accArr.length) {
                    accArr.forEach(a => {
                        result.push(a.concat(c))
                    })
                } else {
                    result.push([c])
                }
            })
            return result
        }, [])
        return result
    }

    const towList = cartesian(attr)

    const data = towList.map((v) => {

        let b = {}
        v[0] ? v[0] : v[0] = {}
        v[1] ? v[1] : v[1] = {}
        v[2] ? v[2] : v[2] = {}
        v[3] ? v[3] : v[3] = {}

        b.attr1 = v[0].mixName
        b.attr2 = v[1].mixName
        b.attr3 = v[2].mixName
        b.attr4 = v[3].mixName
        return b

    })




    return {
        columns,
        data
    }

}


