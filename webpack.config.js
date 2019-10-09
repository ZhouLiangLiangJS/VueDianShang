let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        path: path.join(__dirname, 'src/main.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: "production",
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html')
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.(htm|html)$/, use: ['raw-loader']},
            {test:/\.js$/,use:['babel-loader'],exclude:/node_modules/},
            {test:/\.vue$/,use:['vue-loader']},
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
            {test:/\.(png|jpg|gif|jpeg)$/,use:'url-loader'}
        ]
    },

    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

        }
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }
};