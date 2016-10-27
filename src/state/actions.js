import { v4 } from 'node-uuid'
import { SEND_MESSAGE, SET_NAME } from './constants'
import { date } from 'utils'

export function sendMessage(message, name, color) {
  const payload = { id: v4(), date: date(), message, name, color }
  return {
    type: SEND_MESSAGE,
    payload,
  }
}

export function setName(name) {
  return {
    type: SET_NAME,
    payload: name,
  }
}
