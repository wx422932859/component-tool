const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'LY.js',
        path: path.resolve(__dirname, 'dist'),
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
};
