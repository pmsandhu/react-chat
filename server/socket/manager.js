import url from 'url'
import { wss } from '../server'
import {colors, stringify, getTime} from './utils'

let store = []
let online = {}


function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true)
  const len = store.length
  if (len) {
    len > 15 ?
      ws.send(stringify('MESSAGE_HISTORY', store.slice(len - 15, len))) :
      ws.send(stringify('MESSAGE_HISTORY', store))
  }
  ws.on('message', message => {
    const action = JSON.parse(message)
    switch (action.type) {
      case 'SET_NAME':
        const color = colors.assign()
        online[ws.upgradeReq.url] = {
          type: 'RECEIVE_MESSAGE',
          payload: {
            id: ws.upgradeReq.url.split('=')[1],
            name: action.payload,
            message: `${action.payload} LEFT`,
            clientLeft: true,
            color: { backgroundColor: color, } }
          }
        return ws.send(stringify('RECEIVE_COLOR', color))

      case 'SEND_MESSAGE' :
        store.push(action.payload)
        return broadcast(ws.upgradeReq.url, stringify('RECEIVE_MESSAGE', action.payload))
    }
  })

  ws.on('close', () => {
    const id = location.path

    if (!Object.keys(online).length) return
    if (online[id] === undefined) return

    online[id].payload.date=getTime()
    store.push(online[id].payload)

    broadcast(id, JSON.stringify(online[id]))

    delete online[id]
  })
}

function broadcast (selfId, message) {
  wss.clients.forEach(ws=> {
    if (ws.upgradeReq.url !== selfId) {
      ws.send(message)
    }
  })
}

export default connection
