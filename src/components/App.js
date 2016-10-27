import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styles from 'shared.css'
import SetName from 'SetName'
import Header from 'Header'
import MessageList from 'MessageList'
import Input from 'Input'

class App extends Component {
  componentDidMount() {
    const dialog = findDOMNode(this.refs.dialog)
    dialog.showModal()
  }
  render() {
    return (
      <main className={styles.container}>
        <SetName ref="dialog" />
        <Header />
        <MessageList />
        <Input />
      </main>
    )
  }
}

export default App
