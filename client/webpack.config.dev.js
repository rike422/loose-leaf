const path = require('path')
const webpack = require('webpack')

const PATHS = {
  app: path.resolve(__dirname, './src')
}

module.exports = {
  entry: {
    index: 'src/loose-leaf/index.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  externals: {
    'react': 'React'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.js.flow'],
    modulesDirectories: [
      __dirname,
      '../node_modules',
      PATHS.app
    ],
    root: [path.resolve('src')]
  },

  module: {
    preLoaders: [
      {
        test: /\.(js|jsx|js\.flow)$/,
        loader: 'standard',
        exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve('src'),
          path.resolve('test')
        ]
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx|js\.flow)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel-loader'
        ]
      }
    ]
  }
}
