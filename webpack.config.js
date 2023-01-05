const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'build.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: '8080',
    open: true
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'web-example',
      template: path.resolve(__dirname, './template.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|tiff)$/,
        use: ['file-loader']
      }
    ]
  }
}
