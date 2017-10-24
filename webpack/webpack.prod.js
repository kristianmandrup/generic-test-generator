let common = require('./webpack.common')
const BabiliPlugin = require('babili-webpack-plugin')
const merge = require('webpack-merge')

let config = merge.smart(common, {
  output: {
    filename: 'testGenerator.min.js'
  },
  plugins: [
    new BabiliPlugin(),
  ]
})

module.exports = config
