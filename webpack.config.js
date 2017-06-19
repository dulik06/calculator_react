module.exports = {
  entry: "./app.js",   //shows the webpack where our app starts

  output: {
    filename: "bundle.js"  // where the webpack should store the output
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loaders: ["react-hot-loader", "babel-loader"]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
}
