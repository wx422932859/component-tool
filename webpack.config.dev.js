const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'LY.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        libraryExport: 'default',
        library: {
            name: 'LY',
            type: 'umd'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: 'img/[hash:10].[ext]'
                }
            }
        ]
    },
    devServer: {
        open: {
            target: ['index.html']
        },
        static: {
            directory: path.join(__dirname, 'test')
        },
        port: 3000,
        hot: true,
        proxy: {}
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './test/index.html'
        })
    ]
};
