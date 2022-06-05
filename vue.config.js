module.exports = {
  configureWebpack: {
    output: {
      // filename: "[name].[hash:8].js",
      filename: "js/[name].[contenthash:8].js",
      publicPath: "/",
      chunkFilename: "js/[name].[contenthash:8].js",
    },
  },
};
