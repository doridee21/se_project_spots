//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//
//module.exports = {
//  entry: {
//    main: "./src/index.js",
//  },
//  output: {
//    path: path.resolve(__dirname, "dist"),
//    filename: "main.js",
//    publicPath: "",
//  },
//
//  mode: "development",
//  devtool: "inline-source-map",
//  stats: "errors-only",
//  devServer: {
//    static: path.resolve(__dirname, "./dist"),
//    compress: true,
//    port: 8080,
//    open: true,
//    liveReload: true,
//    hot: false,
//  },
//  target: ["web", "es5"],
//  module: {
//    rules: [
//      {
//        test: /\.js$/,
//        loader: "babel-loader",
//        exclude: "/node_modules/",
//      },
//      {
//        test: /\.css$/,
//        use: [
//          MiniCssExtractPlugin.loader,
//          {
//            loader: "css-loader",
//          },
//        ],
//      },
//    ],
//  },
//  plugins: [
//    new HtmlWebpackPlugin({
//      template: "./src/index.html",
//    }),
//    new CleanWebpackPlugin(),
//    new MiniCssExtractPlugin(),
//  ],
//};

//Gemini
//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//
//module.exports = {
//  entry: {
//    main: "./src/index.js",
//  },
//  output: {
//    path: path.resolve(__dirname, "dist"),
//    filename: "main.js",
//    publicPath: "",
//  },
//
//  mode: "development",
//  devtool: "inline-source-map",
//  stats: "errors-only",
//  devServer: {
//    static: path.resolve(__dirname, "./dist"),
//    compress: true,
//    port: 8080,
//    open: true,
//    liveReload: true,
//    hot: false,
//  },
//  target: ["web", "es5"],
//  module: {
//    rules: [
//      {
//        test: /\.js$/,
//        exclude: /node_modules/,
//        use: {
//          loader: "babel-loader",
//          options: {
//            // Add this options object if it doesn't exist
//            // And within options, add your presets and sourceType
//            presets: ["@babel/preset-env"], // Make sure you have this preset installed
//            sourceType: "unambiguous", // <-- Add this line
//          },
//        },
//      },
//      {
//        test: /\.css$/,
//        use: [
//          MiniCssExtractPlugin.loader,
//          {
//            loader: "css-loader",
//          },
//        ],
//      },
//    ],
//  },
//  plugins: [
//    new HtmlWebpackPlugin({
//      template: "./src/index.html",
//    }),
//    new CleanWebpackPlugin(),
//    new MiniCssExtractPlugin(),
//  ],
//};

//Gemini updated code
//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//
//module.exports = {
//  entry: {
//    main: "./src/index.js",
//  },
//  output: {
//    path: path.resolve(__dirname, "dist"),
//    filename: "main.js",
//    publicPath: "",
//  },
//
//  mode: "development",
//  devtool: "inline-source-map",
//  stats: "errors-only",
//  devServer: {
//    static: path.resolve(__dirname, "./dist"),
//    compress: true,
//    port: 8080,
//    open: true,
//    liveReload: true,
//    hot: false,
//  },
//  target: ["web", "es5"],
//  module: {
//    rules: [
//      {
//        test: /\.js$/,
//        exclude: /node_modules/,
//        use: { loader: "babel-loader" }, // No need for 'use: { options: { ... } }' here anymore
//      },
//      {
//        test: /\.css$/,
//        use: [
//          MiniCssExtractPlugin.loader,
//          {
//            loader: "css-loader",
//          },
//        ],
//      },
//    ],
//  },
//  plugins: [
//    new HtmlWebpackPlugin({
//      template: "./src/index.html",
//    }),
//    new CleanWebpackPlugin(),
//    new MiniCssExtractPlugin(),
//  ],
//};

//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//
//module.exports = {
//  entry: {
//    main: "./src/index.js",
//  },
//  output: {
//    path: path.resolve(__dirname, "dist"),
//    filename: "main.js",
//    publicPath: "",
//  },
//
//  mode: "development",
//  devtool: "inline-source-map",
//  stats: "errors-only",
//  devServer: {
//    static: path.resolve(__dirname, "./dist"),
//    compress: true,
//    port: 8080,
//    open: true,
//    liveReload: true,
//    hot: false,
//  },
//  target: ["web", "es5"],
//  module: {
//    rules: [
//      {
//        test: /\.js$/,
//        loader: "babel-loader",
//        exclude: "/node_modules/",
//      },
//      {
//        test: /\.css$/,
//        use: [
//          MiniCssExtractPlugin.loader,
//          {
//            loader: "css-loader",
//          },
//        ],
//      },
//
//      // NEW
//      {
//        test: /\.(png|svg|jpg|jpeg|webp|gif|woff(2)?|eot|ttf|otf)$/,
//        type: "asset/resource",
//      },
//    ],
//  },
//  plugins: [
//    new HtmlWebpackPlugin({
//      template: "./src/index.html",
//    }),
//    new CleanWebpackPlugin(),
//    new MiniCssExtractPlugin(),
//  ],
//};

// New code: CSS Minification and Autoprefixing Lesson
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },

  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
    liveReload: true,
    hot: false,
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // Add an options object
              importLoaders: 1,
            },
          },
          "postcss-loader", // Add the postcss loader
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
