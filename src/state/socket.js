import { v4 } from 'node-uuid'

const HOST = location.origin.replace(/^http/, 'ws')
let socket = null

export const listeners = (store) => {
  if (!socket) {
    socket = new WebSocket(`${HOST}/query?token=${v4()}`)
  }

  socket.onmessage = (message) => {
    if (typeof message === 'string') return
    const parsed = JSON.parse(message.data)
    store.dispatch(parsed)
  }
}

export const emitters = store => next => (action) => {
  const result = next(action)
  console.log(socket.readyState)
  socket.send(JSON.stringify(result))
  return result
}

