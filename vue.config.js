const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  devServer: {
    port: 8080
  },
  configureWebpack:{
    devtool: 'source-map',
    plugins: [
      new StyleLintPlugin({
        files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
      })
    ]
  }
}