const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const shared = require('./shared');
const main = [
    'core-js',
    'whatwg-fetch',
    './src/index.tsx'
];
const vendor = shared.makeVendorEntry({ mainModules: main, modulesToExclude: ['semantic-ui-css'] })

module.exports = {
    context: process.cwd(), // to automatically find tsconfig.json
    entry: {
        main: main,
        vendor: vendor
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            memoryLimit: 4096,
            checkSyntacticErrors: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'staging')
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new ExtractTextPlugin({ filename: "[name].[contenthash].css", allChunks: true }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: [
                    { loader: 'ts-loader', options: { happyPackMode: true } }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(s?)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            query: {
                                modules: true,
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                                minimize: true,
                            },
                        },
                        {
                            loader: "resolve-url-loader" // resolves url for sass-loader
                        },
                        {
                            loader: "sass-loader" // compiles Sass to CSS
                        },
                    ]
                })
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: "images/[hash]-[name].[ext]"
                    }
                }]
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [
            new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })
        ]
    }
};
