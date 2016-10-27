import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from 'messagelist.css'
import Message from 'Message'

class MessageList extends Component {
  componentDidUpdate() {
    const node = this.refs.container
    node.scrollTop = node.scrollHeight - node.offsetHeight
  }
  render() {
    const { chats } = this.props
    return (
      <div ref="container" className={styles.list}>
        {chats.map(item => <Message key={item.id} {...item} />)}
      </div>
    )
  }
}

MessageList.propTypes = {
  chats: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    chats: state.chats,
  }
}

export default connect(mapStateToProps)(MessageList)
