import url from 'url'
import wss from '../server'
import { colors, stringify } from './utils'

const chatMessages = []
const online = {}

function connection(ws) {
  const [, id] = url.parse(ws.upgradeReq.url, true).path.split('=')
  const { length } = chatMessages

  if (length)
    length > 15
      ? ws.send(stringify('MESSAGE_HISTORY', chatMessages.slice(length - 15, length)))
      : ws.send(stringify('MESSAGE_HISTORY', chatMessages))

  ws.on('message', message => {
    const action = JSON.parse(message)
    switch(action.type) {
      case 'SET_NAME':
        const color = colors.assign()
        online[id] = addToOnline(action, color, id)
        console.log(online)
        return ws.send(stringify('RECEIVE_COLOR', color))
      case 'SEND_MESSAGE':
        chatMessages.push(action.payload)
        return broadcast(id, stringify('RECEIVE_MESSAGE', action.payload))
      default:
    }
  })

  ws.on('close', () => {
    if (!Object.keys(online).length || !online[id]) return

    online[id].payload.date = new Date().toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })
    chatMessages.push(online[id].payload)
    broadcast(id, JSON.stringify(online[id]))
    delete online[id]
  })
}

const addToOnline = (action, color, id) => ({
  type: 'RECEIVE_MESSAGE',
  payload: {
    id,
    name: action.payload,
    message: `${action.payload} LEFT`,
    clientLeft: true,
    color: { backgroundColor: color },
    date: ''
  }
})

function broadcast(selfId, message) {
  wss.clients.forEach(val => {
    if (val.upgradeReq.url !== selfId) val.send(message)
  })
}

export default connection
