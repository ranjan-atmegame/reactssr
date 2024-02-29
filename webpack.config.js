const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    mode: "production",
    entry: path.join(__dirname, "src", "client.js"),
    output: {
        path: path.resolve(__dirname, "src", "static", "js"),
        publicPath: "/",
        filename: "bundle.js",
        chunkFilename: '[name].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
        },
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
};