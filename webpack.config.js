const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

let config = {
  mode: process.env.ENV,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};

if (process.env.ENV == "production") {
  config = merge(config, {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: "esbuild-loader",
              options: {
                target: "es2015",
              },
            },
          ],
        },
      ],
    },
  });
}

module.exports = config;
