const path = require('path');
const webpack = require('webpack');
const packageInfo = require('./package.json');
const moment = require('moment');
const markInfo = [
    `name: ${packageInfo.name}`,
    `package: ${moment().format('YYYY-MM-DD HH:mm:SS')}`,
    `version: ${packageInfo.version}`,
    `exports: LY`,
];

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'LY.js',
        path: path.resolve(__dirname, 'dist/'),
        publicPath: 'dist/',
        libraryExport: 'default',
        globalObject: 'this',
        library: {
            name: 'LY',
            type: 'umd',
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: 'img/[hash:10].[ext]',
                    esModule: false,
                },
            },
        ],
    },
    plugins: [new webpack.BannerPlugin(markInfo.join('\n'))],
};
