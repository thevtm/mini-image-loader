const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.(png|jpe?g|tiff|webp)$/,
      use: [
        "file-loader",
        { loader: path.resolve(__dirname, "../dist/index.js") },
      ]
    }]
  }
};
