import { combineReducers } from 'redux'
import { SEND_MESSAGE, RECEIVE_MESSAGE, MESSAGE_HISTORY, SET_NAME, RECEIVE_COLOR } from './constants'
import { transformArr } from 'utils'

function chats(state = [], action) {
  switch (action.type) {
    case MESSAGE_HISTORY:
      return transformArr(state, action.payload)
    case SEND_MESSAGE:
      return [...state, action.payload]
    case RECEIVE_MESSAGE:
      return [...state, action.payload]
    default:
      return state
  }
}

function name(state = 'DEFAULT', action) {
  switch (action.type) {
    case SET_NAME:
      return action.payload
    default:
      return state
  }
}

function color(state = { backgroundColor: '#4F5B66' }, action) {
  switch (action.type) {
    case RECEIVE_COLOR:
      return { ...state, backgroundColor: action.payload }
    default:
      return state
  }
}

const reducer = combineReducers({
  chats,
  name,
  color,
})

export default reducer

