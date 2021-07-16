


const path = require('path')


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
        '//cdn.jsdelivr.net/npm/vue@3.0.0/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@4.1.3/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
    ]
}

const vueConfig = {
 
    runtimeCompiler: true,
    css: {
        //设置Ant-Desint 主题
        loaderOptions: {
            less: {
                modifyVars: {
                    // less vars，customize ant design theme
                    // 'primary-color': '#1890ff',
                    // 'link-color': '#1890ff',
                    // 'border-radius-base': '4px'
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
        port: 9999,
        // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
        proxy: {
            '/api': {
                target: 'http://192.168.101.112:99/',
                // ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'http://192.168.101.112:9999/'
                }
            }
        }
    },
    productionSourceMap: false,
    lintOnSave: false,

}

module.exports = vueConfig