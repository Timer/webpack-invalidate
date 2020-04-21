const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/* hack */
const injectPath = require.resolve("webpack/lib/HotModuleReplacement.runtime");
const overridePath = require.resolve("./lib/HotModuleReplacement.runtime");
require(overridePath);
require.cache[injectPath] = require.cache[overridePath];
/* hack */

module.exports = {
  entry: {
    app: "./parent.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
