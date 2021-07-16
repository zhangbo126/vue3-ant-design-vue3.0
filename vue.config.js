








const vueConfig = {
    publicPath: './',

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

    devServer: {
        // development server port 8000
        hot: true, //热加载
        open: true,
        port: 9999,

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


}

module.exports = vueConfig