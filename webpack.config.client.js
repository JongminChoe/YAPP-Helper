const path = require('path')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nodeExternals  = require('webpack-node-externals')

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.tsx'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
        alias: {
            pages: path.resolve('src/component/pages')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.ts(x?)$/,
                use: [
                    "awesome-typescript-loader",
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",

                    },
                    {
                        loader: "sass-loader"
                    }     
                ]
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    plugins: [new LoadablePlugin(), new MiniCssExtractPlugin()],
    externals: ["@loadable/component", nodeExternals()]
};
