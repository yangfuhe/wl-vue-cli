const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: resolve('dist'),
        // chunkFilename: '[name].[hash].js',
    },
    devServer: {
        hot: true,
        open: true,
        proxy: {
            "/api": {
                target: "http://localhost:8880"
            }
        }
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')

        },
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
    plugins: [
        new webpack.DefinePlugin({
            LOCAL: true,
            PRO: false,
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),

        // 以下两个配合react-hot-loader实现热加载
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
}