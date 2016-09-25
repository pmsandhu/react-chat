import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import './normalize.css'
import App from 'App'
import reducer from 'reducers'
import { emitters, listeners } from '../src/state/socket'

const middleware = process.env.NODE_ENV === 'production' ?
  [thunk, emitters] :
  [thunk, emitters, require('redux-logger')()]

const middleStore = applyMiddleware(...middleware)(createStore)
const store = middleStore(reducer)

listeners(store)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)

window.React = React

