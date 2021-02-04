const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/index.js",
        notFound: "./src/404.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/dist/[name].js",
        publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: "file-loader",
                options: {
                    outputPath: "../../img",
                    name: "[name].[ext]",
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/views/index.html",
            inject: false,
            chunks: ["main"],
        }),
        new HtmlWebpackPlugin({
            filename: "404.html",
            template: "src/views/404.html",
            inject: false,
            chunks: ["notFound"],
        }),
        new MiniCssExtractPlugin({
            filename: "css/dist/[name].css",
        }),
        new OptimizeCssAssetsPlugin({}),
        new CopyPlugin({
            patterns: [
                {
                    from: "public",
                    to: ".",
                },
            ],
        }),
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
};
