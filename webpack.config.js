const path = require('path');
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// var ExtractTextWebpack = require('extract-text-webpack-plugin')

module.exports = env => ({
    devtool: "inline-source-map",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "build/app.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: path.resolve(__dirname, "node_modules"),
                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }
        ],
    },
    // plugins: [
    //     new UglifyJsPlugin({
    //         include:  path.resolve(__dirname, "src"),
    //         exclude:  path.resolve(__dirname, "node_modules"),
    //     }),
    // ],
});
