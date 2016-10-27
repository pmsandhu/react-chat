import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from 'input.css'
import { sendMessage } from 'actions'

const Input = ({ dispatch, name, color }) => {
  let message
  return (
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault()
      if (!message.value) return
      dispatch(sendMessage(message.value, name, color))
      message.value = ''
    }}
    >
      <input className={styles.input} ref={(node) => { message = node }} placeholder="Type a message..." />
      <button className={styles.button} type="submit">SEND</button>
    </form>
  )
}

Input.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    name: state.name,
    color: state.color,
  }
}

export default connect(mapStateToProps)(Input)
