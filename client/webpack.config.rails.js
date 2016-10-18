process = require('process')

const NODE_ENV = process.env.NDOE_ENV

const outputConfig = {
  output: {
    library: 'LooseLeaf',
    libraryTarget: 'umd',
    path: 'app/assets/javascripts/loose-leaf',
    filename: 'index.js'
  }
}

let config = undefined
if (NODE_ENV == 'prod') {
  config = require('./webpack.config.prod')
} else {
  config = require('./webpack.config.dev')
}

module.exports = Object.assign({}, config, outputConfig)
