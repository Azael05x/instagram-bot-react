const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const ExtractTextWebpack = require('extract-text-webpack-plugin')

module.exports = env => {
    return {
        devtool: "inline-source-map",
        entry: "./src/index.tsx",
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "build/app.js"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json", ".css"],
        },
        node: {
            fs: "empty",
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
            ],
        },
        // plugins: [
        //     new UglifyJsPlugin({
        //         include:  path.resolve(__dirname, "src"),
        //         exclude:  path.resolve(__dirname, "node_modules"),
        //     }),
        // ],
    }
}