




const routerTree = [
    {
        path: '/account',
        redirect: '/account/accountcenter',
        component: import('@/layouts/BasicLayouts'),
        name: 'AccountManage',
        children: [
            {
                name: 'AccountCenter',
                component: () => import('@/views/Account/AccountCenter'),
                path: '/account/accountcenter'
            },
            {
                name: 'AccountSettings',
                component: () => import('@/views/Account/AccountSettings'),
                path: '/account/accountsettings'
            },
            {
                name: 'BaseSettings',
                component: () => import('@/views/Account/BaseSettings'),
                path: '/account/basesettings'
            },
            {
                name: 'SecuritySettings',
                component: () => import('@/views/Account/SecuritySettings'),
                path: '/account/securitysettings'
            },
        ]
    }
]

export default routerTree