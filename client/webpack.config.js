// `CheckerPlugin` is optional. Use it if you want async error reporting. 
// We need this plugin to detect a `--watch` mode. It may be removed later 
// after https://github.com/webpack/webpack/issues/3460 will be resolved. 
const { CheckerPlugin } = require('awesome-typescript-loader')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
const webpack = require('webpack');

module.exports = {

  // Currently we need to add '.ts' to the resolve.extensions array. 
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  // Source maps support ('inline-source-map' also works) 
  devtool: 'source-map',

  // Add the loader for .ts files. 
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader?{configFileName: "client/tsconfig.json"}'
      }
    ]
  },

  entry: {
    polyfills: "./client/src/polyfills.ts",
    main: "./client/src/main.ts"
  },
  output: {
    filename: './[name].js'
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }), new webpack.ContextReplacementPlugin(
      // if you have anymore problems tweet me at @gdi2290
      // The (\\|\/) piece accounts for path separators for Windows and MacOS
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes 
    )
  ]
};