const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
//const HappyPack = require('happypack')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    //mode: 'production',
    entry: {
        main: './src/main.js',
    },
    output: {
        path: resolve('dist'),
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[id].[chunkhash].js'
    },
    // externals: {
    //     'vue': "Vue",
    //     'vue-router': 'VueRouter',
    //     'element-ui': 'ElementUI'
    // },
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        //'style-loader',
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1, minimize: true },
                        },
                        'postcss-loader',
                        'sass-loader',
                    ],
                }),
                // exclude: [/node_modules/]

            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        //'style-loader',
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
                })

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
        extensions: ['.js', '.vue', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
    },
    plugins: [
        new OptimizeCssPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            LOCAL: false,
            PRO: true,
        }),
        new UglifyJsPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new ExtractTextPlugin('static/css/[name].[hash:7].css')
    ],
}