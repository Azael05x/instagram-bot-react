const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// * Only necessary until https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/48 has been merged and released
// START 
const chalk = require("chalk");
const os = require("os");

function formatterForLineAndColumnUrlClicking(message, useColors) {
    const colors = new chalk.constructor({ enabled: useColors });
    const messageColor = message.isWarningSeverity() ? colors.bold.yellow : colors.bold.red;
    const fileAndNumberColor = colors.bold.cyan;
    const codeColor = colors.grey;

    return [
        messageColor(message.getSeverity().toUpperCase() + " in ") +
        fileAndNumberColor(message.getFile() + "(" + message.getLine() + "," + message.getCharacter() + ")") +
        messageColor(":"),
        codeColor(message.getFormattedCode() + ": ") + message.getContent()
    ].join(os.EOL);
}
// END

const shared = require("./shared");
const main = [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "core-js",
    "whatwg-fetch",
    "./src/index.tsx"
];
const vendor = shared.makeVendorEntry({ mainModules: main, modulesToExclude: ["semantic-ui-css"] })

module.exports = {
    context: process.cwd(), // to automatically find tsconfig.json
    devtool: "inline-source-map",
    entry: {
        main: main,
        vendor: vendor
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        devtoolLineToLine: true,
        filename: "bundle.js",
        sourceMapFilename: "bundle.js.map",
        publicPath: "/",
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerNotifierWebpackPlugin({ title: "TypeScript", excludeWarnings: false }),
        new ForkTsCheckerWebpackPlugin({
            tslint: true,
            checkSyntacticErrors: true,
            formatter: formatterForLineAndColumnUrlClicking,
            watch: ["./src"] // optional but improves performance (fewer stat calls)
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: "public/index.html",
            favicon: 'public/favicon.ico'
        }),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({ filename: "[name].[contenthash].css", allChunks: true }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: [
                    { loader: "ts-loader", options: { happyPackMode: true } }
                ],
                exclude: path.resolve(process.cwd(), "node_modules"),
                include: path.resolve(process.cwd(), "src"),
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
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [
            new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })
        ]
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        stats: "errors-only"
    }
};
