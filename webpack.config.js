var path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  mode:'development',
  entry:  __dirname + "/src/index.js",     //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/dist",             //打包后的文件存放的地方
    filename: "bundle.js"                  //打包后输出文件的文件名
  },
  devtool: '#eval-source-map',
  devServer: {
    contentBase: "./dist",                 //本地服务器所加载的页面所在的目录
    historyApiFallback: true,              //不跳转
    inline: true,                          //实时刷新
    open:false,
  },
  module:{
    rules:[{
      test: /\.vue$/,
      loader: 'vue-loader',
      include: [
        path.resolve(__dirname, "src")
      ],
    },
    // 它会应用到普通的 `.css` 文件
    // 以及 `.vue` 文件中的 `<style>` 块
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
}