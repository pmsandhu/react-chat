import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'

const debug = _debug('app:base:_base')

const base = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  root: path.resolve(__dirname, '../../'),
  build: 'build',
  entry: 'entry',
  node_modules: 'node_modules',
  src: 'src',
  src_modules: [
    'src/components',
    'src/state',
    'src/styles',
  ],
  vendor: [
    'react',
  ],
}

base.module_dirs = [
  base.node_modules,
  base.src,
  ...base.src_modules,
]

base.globals = {
  NODE_ENV: base.env,
  PROCESS_ENV: JSON.stringify(base.env),
  DEV: base.env === 'development',
  PROD: base.env === 'production',
  DEBUG: base.env === 'development' && !argv.no_debug,
  DEBUG_NEW_WINDOW: !!argv.nw,
}

base.serverOptions = {
  contentBase: 'src',
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: '/',
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false,
  },
}

base.browsers = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
]

base.vendor =
  base.vendor.filter((dep) => {
    if (require('../../package.json').dependencies[dep]) {
      return true
    }
    debug(`Package "${dep}" was not found as an npm dependency in package.json`)
  })

base.paths = (() => {
  const basePath = (...args) => path.resolve.apply(path.resolve, [base.root, ...args])
  return {
    basePath,
    build: basePath.bind(null, base.build),
  }
})()

export default base
