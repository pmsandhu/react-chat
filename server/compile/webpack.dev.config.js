import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import base from './base'

const paths = base.paths

const webpackConfig = {
  context: base.root,
  devtool: 'inline-source-map',
  resolve: {
    root: paths.basePath(base.src),
    modulesDirectories: base.module_dirs,
    extensions: ['', '.js', '.json'],
  },
  module: {},
}

webpackConfig.entry = {
  index: [
    'webpack-hot-middleware/client?reload=true',
    `${paths.basePath(base.entry)}/index.js`,
  ],
  vendor: base.vendor,
}

webpackConfig.output = {
  path: paths.basePath(base.build),
  publicPath: '/',
  filename: '[name].js',
  chunkFilename: '[name].js',
}

webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: 'body',
    template: `${paths.basePath(base.entry)}/index.html`,
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.IgnorePlugin(/webpack-stats\.json$/),
  new webpack.DefinePlugin(base.globals),
]

webpackConfig.module.loaders = [
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
  { test: /\.css$/,
    loaders: [
      'style?sourceMap',
      'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'postcss-loader'
    ]
  },
]

webpackConfig.postcss = [
  require('autoprefixer')({ browsers: base.browsers }),
]

export default webpackConfig
