import Mock from 'mockjs2'
import { builder } from '../util'


// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = ['zhang666', '123'] // admin, ant.design
const username = ['admin', 'super']
const login = (options) => {

    if (!username.includes(options.username) || !password.includes(options.password)) {
        return builder({
            'msg': '账号或密码错误',

        })
    }
    return builder({
        'token': '4291d7da9005377ec9aec4a71ea837f'

    })



}

const userInfo = () => {
    const routerTree = [
        {
            path: '/formlist',
            redirect: '/formlist/advanceform',
            component: 'BasicLayouts',
            name: '表单中心',
            children: [
                {
                    name: 'AdvanceForm',
                    component: 'AdvanceForm',
                    path: '/formlist/advanceform'
                },
                {
                    name: 'BasicForm',
                    component: 'BasicForm',
                    path: '/formlist/BasicForm'
                },
                {
                    name: 'Form',
                    component: 'Form',
                    path: '/formlist/form'
                },
                {
                    name: 'StepForm',
                    component: 'StepForm',
                    path: '/formlist/StepForm'
                },
            ]
        },
        {
            path: '/',
            redirect: '/account/accountcenter',
            component: 'BasicLayouts',
            name: '账号管理',
            children: [
                {
                    name: '账号中心',
                    component: 'AccountCenter',
                    path: '/account/accountcenter'
                },
                {
                    name: '账号设置',
                    component: 'AccountSettings',
                    path: '/account/accountsettings'
                },
                {
                    name: '其他设置',
                    component: 'BaseSettings',
                    path: '/account/basesettings'
                },
                {
                    name: '个性化设置',
                    component: 'SecuritySettings',
                    path: '/account/securitysettings'
                },
            ]
        },  {
            path: '/result',
            redirect: '/result/ResultFail',
            component: 'BasicLayouts',
            name: '结构页',
            children: [
                {
                    name: 'FormList',
                    component: 'ResultSuccess',
                    path: '/result/ResultSuccess'
                },
                {
                    name: 'ResultFail',
                    component: 'ResultFail',
                    path: '/result/ResultFail'
                },
            ]
        }
    ]
    return builder(routerTree)

}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/userinfo/, 'get', userInfo)


