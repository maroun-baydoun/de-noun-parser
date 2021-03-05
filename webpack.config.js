const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATHS = {
  src: resolve(__dirname, "src"),
  dist: resolve(__dirname, "dist"),
};

module.exports = {
  entry: {
    "de-noun-parser": resolve(PATHS.src, "de-noun-parser.ts"),
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /(\.ts)/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [PATHS.dist, resolve(__dirname, "types")],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
