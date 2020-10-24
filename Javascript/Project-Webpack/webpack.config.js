const path = require("path"); // using this to resolve the absolute path
const webpack = require("webpack"); // so that we can import plugins from webpack
const HtmlWebpackPlugin = require("html-webpack-plugin"); // plugins through node
const ExamplePlugin = require("./ExamplePlugin"); // import custom plugins

module.exports = {
  mode: "development",
  // webpack works different to gulp / gasp. Those guys concat all files into 1.
  // webpack starts at the "entry" file below and then builds a "dependency graph" from there, using "imports"
  entry: "./src/index.js", // the first piece of code that will kick off your app
  output: {
    filename: "main.js", // name of file
    path: path.resolve(__dirname, "dist"), // where to store it, needs to be an ABSOLUTE path
  },
  // loaders - basically node packages that webpack allows you to apply to diff types of source files
  // if the package is not npm-installed, will throw an error
  // the idea is to have as many loaders as possible -> to maintain everything as part of the dependency graph
  module: {
    rules: [
      {
        // when u come across a JS file >  perform certain transform on it (apply a "loader")
        test: /\.js$/,
        // use: "some-loader",
      },
      {
        // when u come across a CSS file > apply multiple loaders on top
        // note a chain is executed in REVERSE order - the order of style > css loaders should be maintained
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // applies src/styles.css
      },
      {
        test: /\.jpe?g$/,
        // loads an image from web, unless it's above a certain size then downloads it (10kb in this case)
        // use: [{ loader: "url-loader", options: { limit: 10000 } }],
        use: [
          {
            loader: "file-loader", // copies images from src to dist + hashes them
            options: { name: "[name].[ext]" }, // when it copies the image over, preserves the original name and ext, which is why we can target it just the same
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"], // replaces src = "image.png" with require('./image.png')
      },
    ],
  },
  // note that loaders are constrained to be able to perf only transformations on a single file, just before it's been added to dependcy graph
  // so if you wanted to create changes to multiple files / bundle css / minify your code, you'd use plugins
  plugins: [
    new ExamplePlugin(),
    // new UglifyJsPlugin(),
    new webpack.BannerPlugin("i am a doge-banner!"),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // builds dist/index.html from src/index.html
    }),
  ],
};
