const publicInfo = {
    name: 'Ant-Design-Vue'
}

const publicMethod = {
    demoFun: () => {
        console.log('这是一个全局方法')
    }
}

const publicContent = {
    ...publicInfo,
    ...publicMethod
}

export default publicContent