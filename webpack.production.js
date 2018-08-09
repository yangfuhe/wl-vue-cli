const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    //const HappyPack = require('happypack')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        // filename: '[name].bundle.js',
        // path: resolve('dist')
        path: resolve('dist'),
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[id].[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1, minimize: true },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1, minimize: true },
                    },
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: { javascriptEnabled: true },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            LOCAL: false,
            PRO: true,
        }),
        new UglifyJsPlugin({
            parallel: true
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        // new HappyPack({
        //     id: 'vue',
        //     loaders: [{
        //         loader: 'vue-loader',
        //     }],
        //     threads: 4,
        // }),
    ],
}