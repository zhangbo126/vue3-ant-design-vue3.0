




const isProd = process.env.NODE_ENV === 'production'
const assetsCDN = {
    // webpack build externals
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios'
    },
    css: [],
    // https://unpkg.com/browse/vue@2.6.10/
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
    ]
}

const vueConfig = {

    css: {
        //设置Ant-Desint 主题
        loaderOptions: {
            less: {
                modifyVars: {
                    // less vars，customize ant design theme
                    'primary-color': '#F5222D',
                    'link-color': '#F5222D',
                    'border-radius-base': '2px'
                },
                // DO NOT REMOVE THIS LINE
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: {
        externals: isProd ? assetsCDN.externals : {}
    },
    devServer: {
        // development server port 8000
        hot: true, //热加载
        open: true,
        port: 9999
        // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
        // proxy: {
        //   '/api': {
        //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        //     ws: false,
        //     changeOrigin: true
        //   }
        // }
    },
    productionSourceMap: false,
    lintOnSave: false,

}

module.exports = vueConfig