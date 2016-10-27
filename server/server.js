import http from 'http'
import express from 'express'
import ws from 'ws'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import base from './compile/base'
import webpackConfig from './compile/webpack.dev.config'
import connection from './socket/manager'

const compiler = webpack(webpackConfig)
const app = express()

const middleware = webpackMiddleware(compiler, base.serverOptions)
app.use(middleware)
app.use(webpackHotMiddleware(compiler))

const server = http.createServer(app).listen(base.port)
console.log('server listening on port: %s', base.port)

const wss = new ws.Server({ server })
wss.on('connection', connection)

export default wss
