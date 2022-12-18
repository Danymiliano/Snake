const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    mode: 'development',
    devServer: {
        watchFiles: ['src/**/*'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: './src/index.html', to: 'index.html'}]
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
}