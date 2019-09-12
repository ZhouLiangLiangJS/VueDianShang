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
    mode: "development",
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
            {
                test:/\.(png|jpg|gif|jpeg)$/,
                use:'url-loader'
            }
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }
};