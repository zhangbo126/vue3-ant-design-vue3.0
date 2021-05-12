import Mock from 'mockjs2'
import { builder, getBody } from '../util'


// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = ['zhang666', '123'] // admin, ant.design
const username = ['admin', 'super']
const login = (option) => {
    const options = getBody(option)
    if (!username.includes(options.username) || !password.includes(options.password)) {
        return builder({
            'msg': '账号或密码错误',
            'code': 1
        })
    }
    return builder({
        'token': '4291d7da9005377ec9aec4a71ea837f',
        'code': 0
    })
}

const userInfo = () => {
    const routerTree = [
        {
            path: '/formlist',
            redirect: '/formlist/advanceform',
            component: 'BasicLayouts',
            name: '表单中心',
            icon: 'BarChartOutlined',
            children: [
                {
                    name: 'AdvanceForm',
                    component: 'AdvanceForm',
                    path: '/formlist/advanceform',
                },
                {
                    name: '步骤表单',
                    component: 'BasicForm',
                    path: '/formlist/BasicForm',
                },
                {
                    name: 'Form',
                    component: 'Form',
                    path: '/formlist/form',

                },
                {
                    name: '其他表单',
                    component: 'RouteView',
                    path: '/formlist/StepForm',

                    children: [
                        {
                            path: '/formlist/stepform/other',
                            component: 'StepForm',
                            name: '三级菜单',
                        }
                    ]
                },
            ]
        },
        {
            path: '/',
            redirect: '/account/accountcenter',
            component: 'BasicLayouts',
            name: '账号管理',
            icon: 'TaobaoCircleOutlined',
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
        }, {
            path: '/result',
            redirect: '/result/ResultFail',
            component: 'BasicLayouts',
            name: '结构页',
            icon: 'RedditOutlined',
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


