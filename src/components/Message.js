import React, { PropTypes } from 'react'
import styles from 'message.css'

const Message = ({ id, date, name, color, message, clientLeft = null }) => {
  if (clientLeft) {
    return <div><span style={color} className={styles.left}>{message} @ {date}</span></div>
  }
  return (
    <div key={id}>
      <span className={styles.initial} style={color}>{name.slice(0, 1)}</span>
      <span className={styles.name}>{name}</span>
      <span className={styles.date}>{date}</span>
      <p className={styles.text}>{ message}</p>
    </div>
  )
}

Message.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
}

export default Message
