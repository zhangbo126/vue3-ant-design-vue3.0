


export const watchMix = (newValue, oldValue, columns) => {

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
    /*动态处理表数据*/
    const attrTree = {}
    renderMixTree(newValue, attrTree, 0)
    const data = []
    attrTreeFor(attrTree.children, data)

    console.log(data)

    return {
        columns
    }



}

//把规格项处理成 树层级结构
const renderMixTree = (attrList, attrTree, i) => {
    if (attrList[i]) {
        attrTree.children = attrList[i]
        renderMixTree(attrList, attrTree.children, i + 1)

    }
}

const attrTreeFor = (treeObj, data) => {
    let list = data
    treeObj.mixList.forEach(v => {
        list.push(v)
    })
    if (treeObj.children) {
        attrTreeFor(treeObj.children, list)
    }
    return data
}